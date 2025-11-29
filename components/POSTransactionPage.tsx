
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutGrid, List, Search, Trash2, 
  Plus, Minus, ArrowLeft, ScanBarcode, 
  CreditCard, User, X, 
  Printer, Archive, ChevronDown,
  RotateCcw, Tag, Delete, Percent,
  Receipt, CreditCard as CardIcon, QrCode,
  MoreHorizontal, CheckCircle2
} from 'lucide-react';
import { Page, Product, CartItem } from '../types';
import { useSibos } from '../contexts/SibosContext';

interface POSTransactionPageProps {
  onNavigate: (page: Page) => void;
}

export const POSTransactionPage: React.FC<POSTransactionPageProps> = ({ onNavigate }) => {
  const { products, processTransaction, updateLiveCart } = useSibos(); // Use Global State
  
  // --- STATE ---
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [memberSearchQuery, setMemberSearchQuery] = useState('');
  const [paymentAmount, setPaymentAmount] = useState<string>('');
  const [transactionType, setTransactionType] = useState<'tunai' | 'hutang'>('tunai');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // --- LOGIC ---

  // Sync local cart to global liveCart for Customer Display
  useEffect(() => {
      updateLiveCart(cart);
  }, [cart, updateLiveCart]);

  const addToCart = (product: Product) => {
    // Check stock
    if (product.stock !== null && product.stock <= 0) {
        alert('Stok habis!');
        return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        // Prevent adding more than stock
        if (product.stock !== null && existing.qty >= product.stock) return prev;
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1, discount: 0 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    const product = products.find(p => p.id === id);
    
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.qty + delta);
        
        // Stock Check
        if (delta > 0 && product?.stock !== null && newQty > product!.stock!) {
            return item;
        }

        if (newQty === 0) return item; // Handle remove separately or allow 0
        return { ...item, qty: newQty };
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handlePayment = () => {
      processTransaction(cart, transactionType as any);
      setShowSuccessModal(true);
      
      // Reset after 2 seconds
      setTimeout(() => {
          setShowSuccessModal(false);
          setCart([]);
          setPaymentAmount('');
      }, 2000);
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const taxTotal = cart.reduce((acc, item) => acc + ((item.tax || 0) / 100 * item.price * item.qty), 0);
  const total = subtotal + taxTotal;
  const received = parseInt(paymentAmount) || 0;
  const change = received - total;
  
  // Payment Logic
  const handleNumPad = (val: string) => {
      if (val === 'C') {
          setPaymentAmount('');
      } else if (val === 'BACK') {
          setPaymentAmount(prev => prev.slice(0, -1));
      } else if (val === '000') {
          setPaymentAmount(prev => prev + '000');
      } else if (val === '00') {
          setPaymentAmount(prev => prev + '00');
      } else {
          setPaymentAmount(prev => prev + val);
      }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(productSearchQuery.toLowerCase()) || 
    p.barcode.includes(productSearchQuery) ||
    p.sku.includes(productSearchQuery)
  );

  return (
    <div className="h-screen bg-black text-white font-sans flex overflow-hidden select-none relative">
      
      {/* Success Modal Overlay */}
      {showSuccessModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in">
              <div className="bg-slate-900 border border-green-500/50 p-8 rounded-3xl text-center shadow-2xl transform scale-110">
                  <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                      <CheckCircle2 size={64} className="text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">Transaksi Berhasil!</h2>
                  <p className="text-gray-400">Stok telah dikurangi & Jurnal tercatat.</p>
                  <div className="mt-6 text-xl font-mono text-green-400 font-bold">
                      Kembalian: Rp {change.toLocaleString()}
                  </div>
              </div>
          </div>
      )}

      {/* =====================================================================================
          COLUMN 1: CATALOG / CART INPUT (50%)
          ===================================================================================== */}
      <div className="w-[50%] flex flex-col border-r border-white/10 bg-slate-950">
          
          {/* Header: Search & Toggles */}
          <div className="h-20 flex items-center gap-3 px-4 border-b border-white/10 bg-slate-900 shrink-0">
              <button onClick={() => onNavigate('backoffice')} className="h-12 w-12 flex items-center justify-center bg-slate-800 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors border border-white/5">
                  <ArrowLeft size={24} />
              </button>
              
              <div className="flex-1 flex gap-3">
                  {/* Member Search */}
                  <div className="relative flex-[0.4]">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                      <input 
                          type="text" 
                          value={memberSearchQuery}
                          onChange={(e) => setMemberSearchQuery(e.target.value)}
                          placeholder="Cari Member..."
                          className="w-full h-12 bg-slate-800 border border-white/10 rounded-xl py-2 pl-10 pr-3 text-base text-white focus:border-sibos-orange outline-none placeholder-gray-600"
                      />
                  </div>
                  {/* Product Search */}
                  <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                      <input 
                          type="text" 
                          value={productSearchQuery}
                          onChange={(e) => setProductSearchQuery(e.target.value)}
                          placeholder="Scan Barcode / Cari Produk..."
                          className="w-full h-12 bg-slate-800 border border-white/10 rounded-xl py-2 pl-10 pr-3 text-base text-white focus:border-sibos-orange outline-none placeholder-gray-600"
                      />
                  </div>
              </div>

              {/* View Toggle */}
              <div className="flex bg-slate-800 p-1 rounded-xl border border-white/10 h-12 items-center">
                  <button 
                      onClick={() => setViewMode('list')}
                      className={`h-10 w-12 rounded-lg flex items-center justify-center transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                  >
                      <List size={24} />
                  </button>
                  <button 
                      onClick={() => setViewMode('grid')}
                      className={`h-10 w-12 rounded-lg flex items-center justify-center transition-colors ${viewMode === 'grid' ? 'bg-orange-500 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                  >
                      <LayoutGrid size={24} />
                  </button>
              </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-3 bg-slate-950 relative custom-scrollbar">
              
              {/* MODE: LIST (Big Cart Style) */}
              {viewMode === 'list' && (
                  <div className="space-y-2">
                      {/* Header Row */}
                      <div className="flex text-xs font-bold text-gray-500 px-4 py-2 uppercase">
                          <div className="flex-1">Produk (Keranjang)</div>
                          <div className="w-32 text-right">Harga</div>
                          <div className="w-40 text-center">Qty</div>
                          <div className="w-32 text-right">Total</div>
                          <div className="w-12"></div>
                      </div>

                      {/* Existing Cart Items First */}
                      {cart.map((item) => (
                          <div key={item.id} className="flex items-center p-2 bg-slate-900 border border-white/5 rounded-2xl hover:border-blue-500/50 transition-colors group min-h-[90px]">
                              <div className="flex-1 pl-2">
                                  <div className="font-bold text-white text-lg leading-tight">{item.name}</div>
                                  <div className="flex items-center gap-2 mt-1.5">
                                      <span className="text-xs bg-white/10 text-gray-300 px-2 py-0.5 rounded">{item.sku}</span>
                                      {item.unit && <span className="text-xs text-gray-500">{item.unit}</span>}
                                  </div>
                              </div>
                              
                              <div className="w-32 text-right">
                                  <div className="text-lg font-medium text-gray-300">{item.price.toLocaleString()}</div>
                                  {item.tax && <div className="text-[10px] text-orange-400">+Pajak</div>}
                              </div>

                              <div className="w-40 flex justify-center px-2">
                                  <div className="flex items-center bg-slate-800 rounded-xl border border-white/10 p-1 gap-1 w-full justify-between">
                                      <button 
                                        onClick={() => updateQty(item.id, -1)} 
                                        className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 active:text-white active:bg-white/20 transition-colors"
                                      >
                                        <Minus size={20}/>
                                      </button>
                                      <div className="flex-1 text-center font-bold text-white text-xl">{item.qty}</div>
                                      <button 
                                        onClick={() => updateQty(item.id, 1)} 
                                        className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 active:text-white active:bg-white/20 transition-colors"
                                      >
                                        <Plus size={20}/>
                                      </button>
                                  </div>
                              </div>

                              <div className="w-32 text-right font-bold text-white text-lg">
                                  {(item.price * item.qty).toLocaleString()}
                              </div>

                              <div className="w-12 flex justify-center">
                                  <button 
                                    onClick={() => removeFromCart(item.id)} 
                                    className="h-12 w-12 flex items-center justify-center rounded-xl text-gray-600 hover:text-white hover:bg-red-500/20 transition-colors"
                                  >
                                    <Trash2 size={24}/>
                                  </button>
                              </div>
                          </div>
                      ))}

                      {/* If searching, show catalog items to add */}
                      {productSearchQuery && filteredProducts.filter(p => !cart.some(c => c.id === p.id)).map(product => (
                          <div key={product.id} onClick={() => addToCart(product)} className="flex items-center p-4 bg-slate-900/50 border border-dashed border-white/10 rounded-2xl hover:bg-slate-800 cursor-pointer opacity-70 hover:opacity-100 min-h-[80px]">
                              <div className="w-14 h-14 bg-white/5 rounded-lg mr-4 overflow-hidden"><img src={product.image} className="w-full h-full object-cover"/></div>
                              <div className="flex-1">
                                <div className="text-lg font-medium text-gray-300">{product.name}</div>
                                <div className="text-sm text-gray-500">{product.price.toLocaleString()}</div>
                              </div>
                              <div className="text-sm text-green-400 font-bold flex items-center gap-1 bg-green-500/10 px-4 py-2 rounded-lg border border-green-500/20">
                                <Plus size={18}/> Tambah
                              </div>
                          </div>
                      ))}
                  </div>
              )}

              {/* MODE: GRID (Card Style) */}
              {viewMode === 'grid' && (
                  <div className="grid grid-cols-3 xl:grid-cols-4 gap-3 p-1">
                      {filteredProducts.map(product => {
                          const inCart = cart.find(c => c.id === product.id);
                          return (
                              <div key={product.id} className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden relative group shadow-lg">
                                  <div className="aspect-[4/3] bg-slate-800 relative">
                                      <img src={product.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                      <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md font-bold backdrop-blur-sm border border-white/10">
                                          {product.stock}
                                      </div>
                                  </div>
                                  <div className="p-3">
                                      <div className="text-sm font-bold text-white line-clamp-2 mb-1 h-10 leading-tight">{product.name}</div>
                                      <div className="text-sm font-bold text-orange-500">Rp {product.price.toLocaleString()}</div>
                                  </div>
                                  
                                  {/* Overlay Control */}
                                  {inCart ? (
                                      <div className="absolute bottom-0 left-0 w-full bg-slate-900/95 backdrop-blur p-2 border-t border-white/10 flex items-center justify-between gap-2 animate-in slide-in-from-bottom-2">
                                          <button onClick={() => updateQty(product.id, -1)} className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg hover:bg-white/20 active:bg-white/30 border border-white/5"><Minus size={20}/></button>
                                          <span className="font-bold text-xl">{inCart.qty}</span>
                                          <button onClick={() => updateQty(product.id, 1)} className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg hover:bg-white/20 active:bg-white/30 border border-white/5"><Plus size={20}/></button>
                                      </div>
                                  ) : (
                                      <button onClick={() => addToCart(product)} className="absolute inset-0 z-10 bg-transparent"></button>
                                  )}
                              </div>
                          );
                      })}
                  </div>
              )}
          </div>

          {/* Footer: Rare Actions */}
          <div className="h-20 bg-slate-900 border-t border-white/10 flex items-center gap-3 px-4 overflow-x-auto no-scrollbar shrink-0">
              <button className="flex items-center justify-center gap-2 px-6 h-12 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-bold text-gray-300 whitespace-nowrap border border-white/5 active:scale-95 transition-transform">
                  <Archive size={20} /> Buka Laci
              </button>
              <button className="flex items-center justify-center gap-2 px-6 h-12 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-bold text-gray-300 whitespace-nowrap border border-white/5 active:scale-95 transition-transform">
                  <Printer size={20} /> Reprint
              </button>
              <button className="flex items-center justify-center gap-2 px-6 h-12 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-bold text-gray-300 whitespace-nowrap border border-white/5 active:scale-95 transition-transform">
                  <RotateCcw size={20} /> Retur
              </button>
              <button className="flex items-center justify-center gap-2 px-6 h-12 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-bold text-gray-300 whitespace-nowrap border border-white/5 active:scale-95 transition-transform">
                  <Tag size={20} /> Diskon Global
              </button>
              <button className="flex items-center justify-center gap-2 px-6 h-12 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-bold text-gray-300 whitespace-nowrap border border-white/5 active:scale-95 transition-transform">
                  <MoreHorizontal size={20} /> Lainnya
              </button>
          </div>
      </div>

      {/* =====================================================================================
          COLUMN 2: LIVE NOTA (20%)
          ===================================================================================== */}
      <div className="w-[20%] flex flex-col border-r border-white/10 bg-white text-slate-900 relative">
          <div className="flex-1 flex flex-col p-4 overflow-hidden font-mono text-xs relative">
              {/* Paper Texture Effect */}
              <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-gray-300 to-white opacity-30 pointer-events-none"></div>
              
              {/* Receipt Header */}
              <div className="text-center mb-6 border-b-2 border-dashed border-slate-300 pb-4 mt-2">
                  <h2 className="font-bold text-lg uppercase mb-1">Kopi Senja Utama</h2>
                  <p className="text-xs text-gray-500">Jl. Slamet Riyadi No. 45, Solo</p>
                  <p className="text-xs text-gray-500">Telp: 0812-3456-7890</p>
                  <p className="text-[10px] text-gray-400 mt-2">{new Date().toLocaleString()}</p>
              </div>

              {/* Live Items */}
              <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-3">
                  {cart.length === 0 ? (
                      <div className="text-center text-gray-400 mt-10 italic text-sm">
                          <Receipt size={48} className="mx-auto mb-2 opacity-20" />
                          Belum ada item
                      </div>
                  ) : (
                      cart.map((item, idx) => (
                          <div key={idx} className="flex flex-col border-b border-dotted border-gray-300 pb-2 last:border-0">
                              <div className="font-bold text-slate-800 text-sm mb-1">{item.name}</div>
                              <div className="flex justify-between text-slate-600 text-sm">
                                  <span>{item.qty} x {item.price.toLocaleString()}</span>
                                  <span className="font-medium">{(item.price * item.qty).toLocaleString()}</span>
                              </div>
                          </div>
                      ))
                  )}
              </div>
          </div>

          {/* Bottom Calculations */}
          <div className="bg-slate-100 p-5 border-t-2 border-slate-300 text-slate-800 text-sm space-y-2 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] z-10 relative">
              {/* Zigzag top border visual */}
              <div className="absolute -top-2 left-0 w-full h-2 bg-[linear-gradient(45deg,transparent_33.333%,#f1f5f9_33.333%,#f1f5f9_66.667%,transparent_66.667%),linear-gradient(-45deg,transparent_33.333%,#f1f5f9_33.333%,#f1f5f9_66.667%,transparent_66.667%)] bg-[size:10px_20px]"></div>

              <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold">{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                  <span>Pajak (Inc)</span>
                  <span>{taxTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                  <span>Diskon</span>
                  <span>0</span>
              </div>
              <div className="flex justify-between text-xl font-black pt-3 border-t-2 border-dashed border-slate-300 mt-2">
                  <span>TOTAL</span>
                  <span className="text-2xl">{total.toLocaleString()}</span>
              </div>
          </div>
      </div>

      {/* =====================================================================================
          COLUMN 3: PAYMENT COCKPIT (30%) - TOUCH OPTIMIZED
          ===================================================================================== */}
      <div className="w-[30%] flex flex-col bg-slate-900">
          
          {/* Customer Info - Taller */}
          <div className="h-24 px-6 border-b border-white/5 flex items-center justify-between shrink-0 bg-slate-900">
              <div>
                  <div className="text-xs uppercase font-bold text-gray-500 mb-1">Pelanggan</div>
                  <div className="flex items-center gap-3 text-white font-bold text-xl">
                      <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center"><User size={20} /></div>
                      {memberSearchQuery || 'Pelanggan Umum'}
                  </div>
              </div>
              <span className="text-sm bg-green-500/20 text-green-400 px-4 py-2 rounded-lg font-bold border border-green-500/20">Member</span>
          </div>

          {/* Transaction Type - Taller Toggles */}
          <div className="flex p-4 bg-slate-950 border-b border-white/5 gap-4 shrink-0">
              <button 
                onClick={() => setTransactionType('tunai')}
                className={`flex-1 py-4 rounded-2xl text-base font-bold transition-all border-2 flex items-center justify-center gap-2 ${transactionType === 'tunai' ? 'bg-white text-black border-white shadow-lg' : 'bg-slate-900 border-white/10 text-gray-500 hover:text-white hover:border-white/30'}`}
              >
                  TUNAI
              </button>
              <button 
                onClick={() => setTransactionType('hutang')}
                className={`flex-1 py-4 rounded-2xl text-base font-bold transition-all border-2 flex items-center justify-center gap-2 ${transactionType === 'hutang' ? 'bg-red-600 text-white border-red-600 shadow-lg' : 'bg-slate-900 border-white/10 text-gray-500 hover:text-white hover:border-white/30'}`}
              >
                  HUTANG / BON
              </button>
          </div>

          {/* Display Numbers - Compact but Readable */}
          <div className="p-6 bg-slate-900 flex flex-col justify-center shrink-0 border-b border-white/5">
              <div className="text-right mb-4">
                  <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-bold">Total Tagihan</div>
                  <div className="text-6xl font-black text-white tracking-tight">
                      {total.toLocaleString()}
                  </div>
              </div>

              <div className="flex justify-end gap-8 bg-slate-950 p-4 rounded-xl border border-white/5">
                  <div className="text-right flex-1 border-r border-white/10 pr-4">
                      <div className="text-[10px] text-gray-500 mb-1 uppercase font-bold">Uang Diterima</div>
                      <div className="text-2xl font-bold text-blue-400">
                          {paymentAmount ? parseInt(paymentAmount).toLocaleString() : '0'}
                      </div>
                  </div>
                  <div className="text-right flex-1">
                      <div className="text-[10px] text-gray-500 mb-1 uppercase font-bold">Kembalian</div>
                      <div className={`text-2xl font-bold ${change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {change.toLocaleString()}
                      </div>
                  </div>
              </div>
          </div>

          {/* Main Numpad Area - FILLS REMAINING SPACE */}
          <div className="flex-1 bg-slate-950 p-4 flex flex-col gap-3 min-h-0">
              
              {/* Quick Cash Row - Fixed Height */}
              <div className="grid grid-cols-4 gap-3 h-16 shrink-0">
                  <button onClick={() => setPaymentAmount('20000')} className="bg-slate-800 rounded-xl text-base font-bold text-gray-300 hover:text-white hover:bg-slate-700 border border-white/5">20k</button>
                  <button onClick={() => setPaymentAmount('50000')} className="bg-slate-800 rounded-xl text-base font-bold text-gray-300 hover:text-white hover:bg-slate-700 border border-white/5">50k</button>
                  <button onClick={() => setPaymentAmount('100000')} className="bg-slate-800 rounded-xl text-base font-bold text-gray-300 hover:text-white hover:bg-slate-700 border border-white/5">100k</button>
                  <button onClick={() => setPaymentAmount(total.toString())} className="bg-blue-600/20 border-2 border-blue-500/50 rounded-xl text-blue-400 text-base font-bold hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors">UANG PAS</button>
              </div>

              <div className="flex flex-1 gap-3 min-h-0">
                  {/* Numpad (Left 70%) */}
                  <div className="flex-[2.5] grid grid-cols-3 gap-3 h-full">
                      {[1, 2, 3].map(n => (
                          <button key={n} onClick={() => handleNumPad(n.toString())} className="bg-slate-800 rounded-2xl text-3xl font-bold text-white hover:bg-slate-700 active:scale-95 transition-transform border border-white/5 shadow-lg">
                              {n}
                          </button>
                      ))}
                      {[4, 5, 6].map(n => (
                          <button key={n} onClick={() => handleNumPad(n.toString())} className="bg-slate-800 rounded-2xl text-3xl font-bold text-white hover:bg-slate-700 active:scale-95 transition-transform border border-white/5 shadow-lg">
                              {n}
                          </button>
                      ))}
                      {[7, 8, 9].map(n => (
                          <button key={n} onClick={() => handleNumPad(n.toString())} className="bg-slate-800 rounded-2xl text-3xl font-bold text-white hover:bg-slate-700 active:scale-95 transition-transform border border-white/5 shadow-lg">
                              {n}
                          </button>
                      ))}
                      
                      <button onClick={() => handleNumPad('00')} className="bg-slate-800 rounded-2xl text-2xl font-bold text-white hover:bg-slate-700 active:scale-95 border border-white/5">00</button>
                      <button onClick={() => handleNumPad('0')} className="bg-slate-800 rounded-2xl text-3xl font-bold text-white hover:bg-slate-700 active:scale-95 border border-white/5">0</button>
                      <button onClick={() => handleNumPad('BACK')} className="bg-slate-800 rounded-2xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-slate-700 active:scale-95 border border-white/5">
                          <Delete size={32} />
                      </button>
                  </div>

                  {/* Right Actions (Right 30%) */}
                  <div className="flex-1 flex flex-col gap-3 h-full">
                      <div className="flex-1 flex flex-col gap-3">
                        <button className="flex-1 bg-slate-800 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-1 text-white font-bold hover:bg-slate-700 active:scale-95 transition-transform">
                            <CardIcon size={28} className="text-blue-400" /> <span className="text-xs">KARTU</span>
                        </button>
                        <button className="flex-1 bg-slate-800 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-1 text-white font-bold hover:bg-slate-700 active:scale-95 transition-transform">
                            <QrCode size={28} className="text-green-400" /> <span className="text-xs">QRIS</span>
                        </button>
                      </div>
                      
                      <button 
                        onClick={handlePayment}
                        disabled={cart.length === 0}
                        className="flex-[1.5] bg-green-600 hover:bg-green-500 text-white rounded-2xl font-bold text-2xl shadow-xl shadow-green-900/40 disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center justify-center gap-1 transition-all active:scale-95 border-b-4 border-green-800 active:border-b-0 active:translate-y-1"
                      >
                          <span>BAYAR</span>
                      </button>
                  </div>
              </div>
          </div>

      </div>

    </div>
  );
};
