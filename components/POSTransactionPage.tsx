
import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutGrid, List, Search, Trash2, 
  Plus, Minus, ArrowLeft, 
  CreditCard, User, X, 
  Printer, Archive, 
  Delete,
  Receipt, CreditCard as CardIcon, QrCode,
  CheckCircle2, ShoppingBag, Banknote,
  Utensils, Lock, LogOut, Info
} from 'lucide-react';
import { Page, Product, CartItem } from '../types';
import { useSibos } from '../contexts/SibosContext';

interface POSTransactionPageProps {
  onNavigate: (page: Page) => void;
}

export const POSTransactionPage: React.FC<POSTransactionPageProps> = ({ onNavigate }) => {
  const { products, processTransaction, updateLiveCart, selectedOutlet, activeShift, openShift, closeShift } = useSibos();
  const isFnb = selectedOutlet.category === 'fnb';
  
  // --- STATE ---
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [memberSearchQuery, setMemberSearchQuery] = useState('');
  const [paymentAmount, setPaymentAmount] = useState<string>('');
  const [transactionType, setTransactionType] = useState<'tunai' | 'hutang'>('tunai');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Shift Management State
  const [startCashInput, setStartCashInput] = useState('');
  const [closingCashInput, setClosingCashInput] = useState('');
  const [showClosingModal, setShowClosingModal] = useState(false);
  
  // F&B Specific State
  const [orderType, setOrderType] = useState<'dine_in' | 'take_away'>('dine_in');
  
  // MOBILE SPECIFIC STATE
  const [mobileTab, setMobileTab] = useState<'catalog' | 'cart' | 'pay'>('catalog');

  // Helper for ID Currency Formatting
  const fmt = (num: number) => new Intl.NumberFormat('id-ID').format(num);

  // Helper for Input Formatting (Live Typing)
  const handleCurrencyInput = (value: string, setter: (val: string) => void) => {
      // Remove non-numeric chars
      const raw = value.replace(/\D/g, '');
      if (!raw) {
          setter('');
          return;
      }
      // Format as 1.000.000
      const formatted = new Intl.NumberFormat('id-ID').format(parseInt(raw));
      setter(formatted);
  };

  // --- LOGIC ---

  // Auto-adapt layout based on category
  useEffect(() => {
      if (isFnb) {
          setViewMode('grid');
      } else {
          setViewMode('list'); // Default Retail
      }
  }, [isFnb]);

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
          setMobileTab('catalog'); // Return to catalog on mobile
      }, 2000);
  };

  // Shift Handlers
  const handleOpenShift = () => {
      const amount = parseInt(startCashInput.replace(/\./g, '')) || 0;
      openShift(amount);
  };

  const handleCloseShift = () => {
      const amount = parseInt(closingCashInput.replace(/\./g, '')) || 0;
      closeShift(amount);
      setShowClosingModal(false);
      onNavigate('backoffice'); // Redirect to dashboard after closing
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const taxTotal = cart.reduce((acc, item) => acc + ((item.tax || 0) / 100 * item.price * item.qty), 0);
  const total = subtotal + taxTotal;
  // Handle formatted input parsing
  const receivedRaw = paymentAmount.replace(/\./g, ''); 
  const received = parseInt(receivedRaw) || 0;
  const change = received - total;
  const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
  
  // Payment Logic
  const handleNumPad = (val: string) => {
      let currentRaw = paymentAmount.replace(/\./g, '');
      
      if (val === 'C') {
          setPaymentAmount('');
      } else if (val === 'BACK') {
          currentRaw = currentRaw.slice(0, -1);
          setPaymentAmount(currentRaw ? parseInt(currentRaw).toLocaleString('id-ID') : '');
      } else if (val === '000' || val === '00') {
          if (currentRaw) {
              const newVal = currentRaw + val;
              setPaymentAmount(parseInt(newVal).toLocaleString('id-ID'));
          }
      } else {
          const newVal = currentRaw + val;
          setPaymentAmount(parseInt(newVal).toLocaleString('id-ID'));
      }
  };

  const categories = useMemo(() => {
      const cats = new Set(products.map(p => p.category || 'Lainnya'));
      return ['All', ...Array.from(cats)];
  }, [products]);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(productSearchQuery.toLowerCase()) || 
                          p.barcode.includes(productSearchQuery) ||
                          p.sku.includes(productSearchQuery);
    const matchesCategory = activeCategory === 'All' || (p.category || 'Lainnya') === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-screen bg-black text-white font-sans flex flex-col md:flex-row overflow-hidden select-none relative">
      
      {/* --- SHIFT MODALS --- */}
      
      {/* 1. Open Shift Modal (Blocking) */}
      {!activeShift && (
          <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
              <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl text-center">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-900/50">
                      <Lock size={40} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Buka Kasir (Shift Baru)</h2>
                  <p className="text-gray-400 mb-6 text-sm">Masukkan modal awal (uang tunai) di laci kasir.</p>
                  
                  <input 
                      type="text" 
                      placeholder="Rp 0"
                      value={startCashInput}
                      onChange={e => handleCurrencyInput(e.target.value, setStartCashInput)}
                      className="w-full bg-black border border-white/20 rounded-xl p-4 text-center text-2xl font-bold text-white mb-6 focus:border-blue-500 outline-none"
                      autoFocus
                  />
                  
                  <div className="flex gap-3">
                      <button onClick={() => onNavigate('backoffice')} className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-gray-300 rounded-xl font-bold">Batal</button>
                      <button onClick={handleOpenShift} className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg">Buka Shift</button>
                  </div>
              </div>
          </div>
      )}

      {/* 2. Close Shift Modal */}
      {showClosingModal && activeShift && (
          <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
              <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-white">Tutup Shift & Setoran</h2>
                      <button onClick={() => setShowClosingModal(false)}><X size={24} className="text-gray-500"/></button>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-sm text-gray-400 border-b border-white/5 pb-2">
                          <span>Waktu Mulai</span>
                          <span>{new Date(activeShift.startTime).toLocaleTimeString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Modal Awal</span>
                          <span className="font-bold text-white">Rp {fmt(activeShift.startCash)}</span>
                      </div>
                      <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-500/20 text-xs text-blue-300">
                          <Info size={14} className="inline mr-1" />
                          Total penjualan tunai akan dihitung otomatis oleh sistem.
                      </div>
                  </div>

                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Hitung Uang Fisik (Laci)</label>
                  <input 
                      type="text" 
                      placeholder="Rp 0"
                      value={closingCashInput}
                      onChange={e => handleCurrencyInput(e.target.value, setClosingCashInput)}
                      className="w-full bg-black border border-white/20 rounded-xl p-4 text-right text-xl font-bold text-white mb-6 focus:border-red-500 outline-none"
                      autoFocus
                  />
                  
                  <button onClick={handleCloseShift} className="w-full py-4 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2">
                      <LogOut size={20} /> Konfirmasi Tutup Shift
                  </button>
              </div>
          </div>
      )}

      {/* Success Modal Overlay */}
      {showSuccessModal && (
          <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in">
              <div className="bg-slate-900 border border-green-500/50 p-8 rounded-3xl text-center shadow-2xl transform scale-110">
                  <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                      <CheckCircle2 size={64} className="text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">Transaksi Berhasil!</h2>
                  <p className="text-gray-400">Stok telah dikurangi & Jurnal tercatat.</p>
                  <div className="mt-6 text-xl font-mono text-green-400 font-bold">
                      Kembalian: Rp {fmt(change)}
                  </div>
              </div>
          </div>
      )}

      {/* =====================================================================================
          COLUMN 1: CATALOG / CART INPUT (Desktop: 50%, Mobile: Full if Tab=Catalog)
          ===================================================================================== */}
      <div className={`
          flex-col bg-slate-950 md:border-r md:border-white/10 w-full md:w-[50%] h-full
          ${mobileTab === 'catalog' ? 'flex' : 'hidden md:flex'}
      `}>
          
          {/* Header: Search & Toggles */}
          <div className="h-16 flex items-center gap-3 px-3 md:px-4 border-b border-white/10 bg-slate-900 shrink-0">
              <button onClick={() => onNavigate('backoffice')} className="h-10 w-10 flex items-center justify-center bg-slate-800 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors border border-white/5">
                  <ArrowLeft size={20} />
              </button>
              
              <div className="flex-1 flex gap-2 md:gap-3">
                  {/* Member Search (Hidden on small mobile) */}
                  <div className="relative flex-[0.4] hidden sm:block">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                      <input 
                          type="text" 
                          value={memberSearchQuery}
                          onChange={(e) => setMemberSearchQuery(e.target.value)}
                          placeholder="Member..."
                          className="w-full h-10 bg-slate-800 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-sm text-white focus:border-sibos-orange outline-none placeholder-gray-600"
                      />
                  </div>
                  {/* Product Search */}
                  <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                      <input 
                          type="text" 
                          value={productSearchQuery}
                          onChange={(e) => setProductSearchQuery(e.target.value)}
                          placeholder={isFnb ? "Cari Menu..." : "Scan / Cari Produk..."}
                          className="w-full h-10 bg-slate-800 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-sm text-white focus:border-sibos-orange outline-none placeholder-gray-600"
                          autoFocus={!isFnb}
                      />
                  </div>
              </div>

              {/* View Toggle (Only show if NOT F&B - F&B is grid only) */}
              {!isFnb && (
                  <div className="flex bg-slate-800 p-1 rounded-xl border border-white/10 h-10 items-center">
                      <button 
                          onClick={() => setViewMode('list')}
                          className={`h-full w-10 rounded-lg flex items-center justify-center transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                      >
                          <List size={18} />
                      </button>
                      <button 
                          onClick={() => setViewMode('grid')}
                          className={`h-full w-10 rounded-lg flex items-center justify-center transition-colors ${viewMode === 'grid' ? 'bg-orange-500 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                      >
                          <LayoutGrid size={18} />
                      </button>
                  </div>
              )}
          </div>

          {/* Category Filter Pills */}
          <div className="px-3 py-2 border-b border-white/5 overflow-x-auto no-scrollbar bg-slate-950 shrink-0">
              <div className="flex gap-2">
                  {categories.map(cat => (
                      <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`
                              px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border
                              ${activeCategory === cat 
                                  ? 'bg-white text-slate-900 border-white shadow-lg' 
                                  : 'bg-slate-900 text-gray-400 border-white/10 hover:text-white hover:bg-white/5'}
                          `}
                      >
                          {cat === 'All' ? 'Semua' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </button>
                  ))}
              </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-3 bg-slate-950 relative custom-scrollbar pb-24 md:pb-3">
              <div className={`animate-in slide-in-from-bottom-2 duration-300 ${viewMode === 'list' ? "space-y-2" : "grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2"}`}>
                  {filteredProducts.map(product => {
                      const inCart = cart.find(c => c.id === product.id);
                      
                      if (viewMode === 'list') {
                          return (
                              <div key={product.id} onClick={() => addToCart(product)} className="flex items-center p-3 bg-slate-900 border border-white/5 rounded-xl hover:border-blue-500/50 transition-colors cursor-pointer group min-h-[70px]">
                                  {/* List Item Content */}
                                  <div className="w-12 h-12 bg-white/5 rounded-lg mr-3 overflow-hidden flex-shrink-0">
                                      <img src={product.image} className="w-full h-full object-cover"/>
                                  </div>
                                  <div className="flex-1">
                                      <div className="font-bold text-white text-sm md:text-base leading-tight">{product.name}</div>
                                      <div className="text-xs text-gray-500">{product.sku}</div>
                                  </div>
                                  <div className="text-right">
                                      <div className="font-bold text-orange-500">Rp {fmt(product.price)}</div>
                                      {inCart && <div className="text-xs text-green-400 font-bold bg-green-500/10 px-2 py-0.5 rounded mt-1">{inCart.qty} di Keranjang</div>}
                                  </div>
                              </div>
                          );
                      } else {
                          // COMPACT GRID CARD FOR F&B
                          return (
                              <div key={product.id} onClick={() => addToCart(product)} className="bg-slate-900 border border-white/10 rounded-lg overflow-hidden relative group shadow hover:border-sibos-orange/50 transition-all cursor-pointer active:scale-95">
                                  {/* Compact Grid Item Content */}
                                  <div className="aspect-square bg-slate-800 relative">
                                      <img src={product.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" loading="lazy" />
                                      {inCart && (
                                          <div className="absolute top-1 right-1 bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold shadow-lg border border-white/20">
                                              {inCart.qty}
                                          </div>
                                      )}
                                  </div>
                                  <div className="p-2">
                                      <div className="text-xs font-bold text-white line-clamp-2 leading-tight h-8 mb-1">{product.name}</div>
                                      <div className="text-xs font-bold text-orange-500 truncate">Rp {fmt(product.price)}</div>
                                  </div>
                              </div>
                          );
                      }
                  })}
              </div>
              
              {filteredProducts.length === 0 && (
                  <div className="text-center py-10 text-gray-500 flex flex-col items-center">
                      <ShoppingBag size={48} className="opacity-20 mb-4" />
                      <p>{isFnb ? "Menu tidak ditemukan." : "Produk tidak ditemukan."}</p>
                  </div>
              )}
          </div>

          {/* Footer: Actions (Desktop Only) */}
          <div className="hidden md:flex h-16 bg-slate-900 border-t border-white/10 items-center gap-3 px-4 overflow-x-auto no-scrollbar shrink-0">
              <button className="flex items-center justify-center gap-2 px-4 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold text-gray-300 border border-white/5">
                  <Archive size={16} /> Buka Laci
              </button>
              <button className="flex items-center justify-center gap-2 px-4 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold text-gray-300 border border-white/5">
                  <Printer size={16} /> Reprint
              </button>
              {/* SHIFT CLOSE BUTTON */}
              <button 
                onClick={() => setShowClosingModal(true)}
                className="flex items-center justify-center gap-2 px-4 h-10 bg-red-900/20 hover:bg-red-900/40 text-red-400 rounded-lg text-xs font-bold border border-red-500/20 ml-auto"
              >
                  <LogOut size={16} /> Tutup Shift
              </button>
          </div>
      </div>

      {/* =====================================================================================
          COLUMN 2: CART / LIVE NOTA (Desktop: 20%, Mobile: Full if Tab=Cart)
          ===================================================================================== */}
      <div className={`
          flex-col md:border-r md:border-white/10 bg-white text-slate-900 relative w-full md:w-[20%] h-full
          ${mobileTab === 'cart' ? 'flex' : 'hidden md:flex'}
      `}>
          {/* Mobile Header for Cart */}
          <div className="md:hidden h-16 bg-slate-100 border-b border-slate-300 flex items-center justify-between px-4 text-slate-900">
              <h2 className="font-bold text-lg">Keranjang Belanja</h2>
              <button onClick={() => setCart([])} className="text-red-500 text-xs font-bold">Kosongkan</button>
          </div>

          <div className="flex-1 flex flex-col p-3 overflow-hidden font-mono text-xs relative bg-white">
              {/* Paper Texture Effect */}
              <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-gray-300 to-white opacity-30 pointer-events-none"></div>
              
              {/* Receipt Header (Desktop Only Visual) */}
              <div className="text-center mb-4 border-b-2 border-dashed border-slate-300 pb-3 mt-1 hidden md:block">
                  <h2 className="font-bold text-base uppercase mb-1">Nota Sementara</h2>
                  <p className="text-[10px] text-gray-400">{new Date().toLocaleString()}</p>
              </div>

              {/* Order Type Toggle (F&B Only) - More Prominent */}
              {isFnb && (
                  <div className="flex p-1 bg-slate-200 rounded-lg mb-3 text-xs font-bold border border-slate-300 shadow-inner">
                     <button 
                        onClick={() => setOrderType('dine_in')}
                        className={`flex-1 py-2 rounded-md flex items-center justify-center gap-1 transition-all ${orderType === 'dine_in' ? 'bg-white text-orange-600 shadow ring-1 ring-black/5' : 'text-gray-500'}`}
                     >
                        <Utensils size={14} /> Dine In
                     </button>
                     <button 
                        onClick={() => setOrderType('take_away')}
                        className={`flex-1 py-2 rounded-md flex items-center justify-center gap-1 transition-all ${orderType === 'take_away' ? 'bg-white text-blue-600 shadow ring-1 ring-black/5' : 'text-gray-500'}`}
                     >
                        <ShoppingBag size={14} /> Take Away
                     </button>
                  </div>
              )}

              {/* Live Items */}
              <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-2 pb-24 md:pb-0">
                  {cart.length === 0 ? (
                      <div className="text-center text-gray-400 mt-10 italic text-sm flex flex-col items-center">
                          <Receipt size={32} className="mb-2 opacity-20" />
                          <p>Belum ada item</p>
                      </div>
                  ) : (
                      cart.map((item, idx) => (
                          <div key={idx} className="flex flex-col border-b border-dotted border-gray-300 pb-2 last:border-0">
                              <div className="font-bold text-slate-800 text-sm mb-1 line-clamp-1">{item.name}</div>
                              <div className="flex justify-between items-center text-slate-600 text-sm">
                                  <div className="flex items-center gap-2">
                                      <button onClick={() => updateQty(item.id, -1)} className="w-5 h-5 rounded bg-slate-200 flex items-center justify-center hover:bg-slate-300 text-xs"><Minus size={10}/></button>
                                      <span className="font-bold w-4 text-center">{item.qty}</span>
                                      <button onClick={() => updateQty(item.id, 1)} className="w-5 h-5 rounded bg-slate-200 flex items-center justify-center hover:bg-slate-300 text-xs"><Plus size={10}/></button>
                                  </div>
                                  <span className="font-medium text-xs">{fmt(item.price * item.qty)}</span>
                              </div>
                          </div>
                      ))
                  )}
              </div>
          </div>

          {/* Bottom Calculations */}
          <div className="bg-slate-100 p-4 border-t-2 border-slate-300 text-slate-800 text-sm space-y-1 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] z-10 relative mb-16 md:mb-0">
              <div className="flex justify-between text-xs">
                  <span>Subtotal</span>
                  <span className="font-bold">{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                  <span>Pajak</span>
                  <span>{fmt(taxTotal)}</span>
              </div>
              <div className="flex justify-between text-lg font-black pt-2 border-t-2 border-dashed border-slate-300 mt-2">
                  <span>TOTAL</span>
                  <span className="text-xl text-blue-600">{fmt(total)}</span>
              </div>
              {/* Mobile Pay Button inside Cart */}
              <button 
                onClick={() => setMobileTab('pay')}
                className="md:hidden w-full py-3 bg-blue-600 text-white font-bold rounded-xl mt-3 shadow-lg active:scale-95 transition-transform"
                disabled={cart.length === 0}
              >
                  Lanjut Pembayaran
              </button>
          </div>
      </div>

      {/* =====================================================================================
          COLUMN 3: PAYMENT COCKPIT (Desktop: 30%, Mobile: Full if Tab=Pay)
          ===================================================================================== */}
      <div className={`
          flex-col bg-slate-900 w-full md:w-[30%] h-full
          ${mobileTab === 'pay' ? 'flex' : 'hidden md:flex'}
      `}>
          
          {/* Mobile Back Button from Pay */}
          <div className="md:hidden h-16 bg-slate-950 flex items-center px-4 border-b border-white/10">
              <button onClick={() => setMobileTab('cart')} className="flex items-center gap-2 text-white font-bold">
                  <ArrowLeft size={20} /> Kembali ke Keranjang
              </button>
          </div>

          {/* Customer Info */}
          <div className="h-20 px-4 border-b border-white/5 flex items-center justify-between shrink-0 bg-slate-900">
              <div>
                  <div className="text-[10px] uppercase font-bold text-gray-500 mb-1">
                      {isFnb ? "Meja / Pelanggan" : "Pelanggan"}
                  </div>
                  <div className="flex items-center gap-3 text-white font-bold text-lg">
                      {isFnb ? (
                          <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-orange-500"><Utensils size={16} /></div>
                      ) : (
                          <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center"><User size={16} /></div>
                      )}
                      <span className="truncate max-w-[150px]">{memberSearchQuery || (isFnb ? 'Meja 1' : 'Umum')}</span>
                  </div>
              </div>
              <span className="text-[10px] bg-green-500/20 text-green-400 px-3 py-1 rounded-lg font-bold border border-green-500/20">Member</span>
          </div>

          {/* Transaction Type - CONDITIONAL RENDERING FOR DEBT */}
          <div className="flex p-3 bg-slate-950 border-b border-white/5 gap-3 shrink-0">
              <button 
                onClick={() => setTransactionType('tunai')}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all border-2 flex items-center justify-center gap-2 ${transactionType === 'tunai' ? 'bg-white text-black border-white shadow-lg' : 'bg-slate-900 border-white/10 text-gray-500 hover:text-white'}`}
              >
                  TUNAI
              </button>
              
              {/* Only show debt button if allowed in settings */}
              {selectedOutlet.allowDebt && (
                  <button 
                    onClick={() => setTransactionType('hutang')}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all border-2 flex items-center justify-center gap-2 ${transactionType === 'hutang' ? 'bg-red-600 text-white border-red-600 shadow-lg' : 'bg-slate-900 border-white/10 text-gray-500 hover:text-white'}`}
                  >
                      HUTANG
                  </button>
              )}
          </div>

          {/* Display Numbers */}
          <div className="p-4 bg-slate-900 flex flex-col justify-center shrink-0 border-b border-white/5">
              <div className="text-right mb-4">
                  <div className="text-[10px] text-gray-500 mb-1 uppercase tracking-wider font-bold">Total Tagihan</div>
                  <div className="text-5xl font-black text-white tracking-tight">
                      {fmt(total)}
                  </div>
              </div>

              <div className="flex justify-end gap-4 bg-slate-950 p-3 rounded-xl border border-white/5">
                  <div className="text-right flex-1 border-r border-white/10 pr-4">
                      <div className="text-[10px] text-gray-500 mb-1 uppercase font-bold">Uang Diterima</div>
                      <div className="text-xl font-bold text-blue-400">
                          {paymentAmount ? fmt(parseInt(paymentAmount.replace(/\./g, ''))) : '0'}
                      </div>
                  </div>
                  <div className="text-right flex-1">
                      <div className="text-[10px] text-gray-500 mb-1 uppercase font-bold">Kembalian</div>
                      <div className={`text-xl font-bold ${change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {fmt(change)}
                      </div>
                  </div>
              </div>
          </div>

          {/* Main Numpad Area - FILLS REMAINING SPACE */}
          <div className="flex-1 bg-slate-950 p-3 flex flex-col gap-3 min-h-0 mb-16 md:mb-0">
              
              {/* Quick Cash Row */}
              <div className="grid grid-cols-4 gap-2 h-12 shrink-0">
                  <button onClick={() => setPaymentAmount('20.000')} className="bg-slate-800 rounded-lg text-sm font-bold text-gray-300 border border-white/5">20k</button>
                  <button onClick={() => setPaymentAmount('50.000')} className="bg-slate-800 rounded-lg text-sm font-bold text-gray-300 border border-white/5">50k</button>
                  <button onClick={() => setPaymentAmount('100.000')} className="bg-slate-800 rounded-lg text-sm font-bold text-gray-300 border border-white/5">100k</button>
                  <button onClick={() => setPaymentAmount(fmt(total))} className="bg-blue-600/20 border-2 border-blue-500/50 rounded-lg text-blue-400 text-xs font-bold">UANG PAS</button>
              </div>

              <div className="flex flex-1 gap-2 min-h-0">
                  {/* Numpad */}
                  <div className="flex-[2.5] grid grid-cols-3 gap-2 h-full">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                          <button key={n} onClick={() => handleNumPad(n.toString())} className="bg-slate-800 rounded-xl text-2xl font-bold text-white active:scale-95 border border-white/5 shadow-lg hover:bg-slate-700">
                              {n}
                          </button>
                      ))}
                      
                      <button onClick={() => handleNumPad('00')} className="bg-slate-800 rounded-xl text-lg font-bold text-white active:scale-95 border border-white/5 hover:bg-slate-700">00</button>
                      <button onClick={() => handleNumPad('0')} className="bg-slate-800 rounded-xl text-2xl font-bold text-white active:scale-95 border border-white/5 hover:bg-slate-700">0</button>
                      <button onClick={() => handleNumPad('BACK')} className="bg-slate-800 rounded-xl flex items-center justify-center text-gray-400 active:scale-95 border border-white/5 hover:bg-slate-700">
                          <Delete size={24} />
                      </button>
                  </div>

                  {/* Right Actions */}
                  <div className="flex-1 flex flex-col gap-2 h-full">
                      <div className="flex-1 flex flex-col gap-2">
                        <button className="flex-1 bg-slate-800 border border-white/10 rounded-xl flex flex-col items-center justify-center gap-1 text-white font-bold active:scale-95 hover:bg-slate-700">
                            <CardIcon size={20} className="text-blue-400" /> <span className="text-[10px]">KARTU</span>
                        </button>
                        <button className="flex-1 bg-slate-800 border border-white/10 rounded-xl flex flex-col items-center justify-center gap-1 text-white font-bold active:scale-95 hover:bg-slate-700">
                            <QrCode size={20} className="text-green-400" /> <span className="text-[10px]">QRIS</span>
                        </button>
                      </div>
                      
                      <button 
                        onClick={handlePayment}
                        disabled={cart.length === 0}
                        className="flex-[1.5] bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-xl shadow-xl shadow-green-900/40 disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center justify-center gap-1 transition-all active:scale-95 border-b-4 border-green-800 active:border-b-0 active:translate-y-1"
                      >
                          <span>BAYAR</span>
                      </button>
                  </div>
              </div>
          </div>
      </div>

      {/* =====================================================================================
          MOBILE BOTTOM NAVIGATION (Sticky)
          ===================================================================================== */}
      <div className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-slate-900 border-t border-white/10 flex z-50">
          <button 
            onClick={() => setMobileTab('catalog')}
            className={`flex-1 flex flex-col items-center justify-center gap-1 ${mobileTab === 'catalog' ? 'text-sibos-orange' : 'text-gray-500'}`}
          >
              <LayoutGrid size={20} />
              <span className="text-[10px] font-bold">Katalog</span>
          </button>
          <button 
            onClick={() => setMobileTab('cart')}
            className={`flex-1 flex flex-col items-center justify-center gap-1 relative ${mobileTab === 'cart' ? 'text-blue-500' : 'text-gray-500'}`}
          >
              <div className="relative">
                  <ShoppingBag size={20} />
                  {totalQty > 0 && (
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[8px] font-bold text-white border-2 border-slate-900">
                          {totalQty}
                      </div>
                  )}
              </div>
              <span className="text-[10px] font-bold">Keranjang</span>
          </button>
          <button 
            onClick={() => setMobileTab('pay')}
            className={`flex-1 flex flex-col items-center justify-center gap-1 ${mobileTab === 'pay' ? 'text-green-500' : 'text-gray-500'}`}
          >
              <Banknote size={20} />
              <span className="text-[10px] font-bold">Bayar</span>
          </button>
      </div>

    </div>
  );
};
