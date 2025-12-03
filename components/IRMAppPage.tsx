
import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Plus, Package, 
  Trash2, ArrowDownLeft, ArrowUpRight,
  Edit3, Warehouse, ScrollText, Info, Lock, X, Camera, Utensils,
  History, FileText
} from 'lucide-react';
import { Page, HardwareModule, AppModule, Product, RecipeItem, ModifierGroup, ProductType, UserRole, WasteRecord } from '../types';
import { useSibos } from '../contexts/SibosContext';
import { BackofficeLayout } from './BackofficeLayout';

interface IRMAppPageProps {
  onNavigate: (page: Page) => void;
  activeHardware?: HardwareModule[];
  activeModules?: AppModule[];
  userRole?: UserRole;
}

export const IRMAppPage: React.FC<IRMAppPageProps> = ({ onNavigate, activeHardware, activeModules, userRole }) => {
  const { 
    products, addProduct, selectedOutlet, searchQuery, recordWaste, journals
  } = useSibos(); // Use Global Search Query
  
  const isFnb = selectedOutlet.category === 'fnb';
  const isOwner = userRole === 'owner';

  // --- STATES ---
  const [activeTab, setActiveTab] = useState<'stock' | 'audit'>('stock');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All'); 
  const [productTypeFilter, setProductTypeFilter] = useState<'all' | 'menu' | 'ingredient'>('all'); 
  const [expandedProductId, setExpandedProductId] = useState<number | null>(null);

  // WASTE MODAL STATE
  const [showWasteModal, setShowWasteModal] = useState(false);
  const [selectedProductForWaste, setSelectedProductForWaste] = useState<Product | null>(null);
  const [wasteQty, setWasteQty] = useState<number>(1);
  const [wasteReason, setWasteReason] = useState<WasteRecord['reason']>('Expired');

  // ADD PRODUCT STATES
  const [showAddModal, setShowAddModal] = useState(false);
  const [addProductTab, setAddProductTab] = useState<'info' | 'recipe' | 'modifiers'>('info');
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
      name: '', category: 'Makanan', price: 0, stock: 0, minStock: 5, unit: 'Pcs', sku: '', barcode: '',
      type: 'menu', printerTarget: 'kitchen', recipe: [], modifiers: []
  });
  
  // Recipe Builder State
  const [recipeSearch, setRecipeSearch] = useState('');
  const availableIngredients = products.filter(p => p.type === 'ingredient' || p.type === 'goods');

  // --- FILTERS ---
  const categories = useMemo(() => {
      const cats = new Set(products.map(p => p.category || 'Lainnya'));
      return ['All', ...Array.from(cats)];
  }, [products]);

  const filteredItems = products.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategoryFilter === 'All' || (item.category || 'Lainnya') === selectedCategoryFilter;
    const matchesType = productTypeFilter === 'all' || item.type === productTypeFilter;
    return matchesSearch && matchesCategory && matchesType;
  });

  // Dummy mutation logs for display if journals are empty or not relevant
  const stockMutations = [
      { id: 'MT-001', date: '2023-10-25 10:00', type: 'IN', item: 'Beras Pandan Wangi', qty: 50, unit: 'kg', ref: 'PO-992', staff: 'Budi' },
      { id: 'MT-002', date: '2023-10-25 14:30', type: 'OUT', item: 'Telur Ayam', qty: 5, unit: 'butir', ref: 'Waste', staff: 'Siti' },
      { id: 'MT-003', date: '2023-10-26 09:15', type: 'ADJ', item: 'Kopi Kapal Api', qty: -2, unit: 'sachet', ref: 'Stock Opname', staff: 'Andi' },
  ];

  const toggleProductDetail = (id: number) => {
      setExpandedProductId(prev => prev === id ? null : id);
  };

  // --- HANDLERS ---
  const handleAddProduct = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newProduct.name) return;
      
      const isIngredient = newProduct.type === 'ingredient';
      const cost = isIngredient ? newProduct.price : (newProduct.recipe?.reduce((sum, item) => sum + (item.costPerUnit * item.qty), 0) || 0);

      const productToAdd: Product = {
          id: Date.now(),
          name: newProduct.name,
          category: newProduct.category || 'Umum',
          price: Number(newProduct.price),
          stock: isIngredient ? Number(newProduct.stock) : null,
          minStock: Number(newProduct.minStock) || 0,
          unit: newProduct.unit || 'Pcs',
          sku: newProduct.sku || (isIngredient ? `ING-${Date.now()}` : `MNU-${Date.now()}`),
          barcode: newProduct.barcode || String(Date.now()),
          image: newProduct.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=200&auto=format&fit=crop',
          type: newProduct.type as ProductType,
          printerTarget: newProduct.printerTarget,
          recipe: newProduct.recipe,
          modifiers: newProduct.modifiers,
          cost: cost
      };
      
      addProduct(productToAdd);
      setShowAddModal(false);
      // Reset form
      setNewProduct({
          name: '', category: 'Makanan', price: 0, stock: 0, minStock: 5, unit: 'Pcs', sku: '', barcode: '',
          type: 'menu', printerTarget: 'kitchen', recipe: [], modifiers: []
      });
      setAddProductTab('info');
  };

  const handleAddIngredientToRecipe = (ingredient: Product) => {
      if (!newProduct.recipe) return;
      const exists = newProduct.recipe.find(r => r.ingredientId === ingredient.id);
      if (exists) return;

      const newRecipeItem: RecipeItem = {
          ingredientId: ingredient.id,
          ingredientName: ingredient.name,
          qty: 1,
          unit: ingredient.unit || 'Pcs',
          costPerUnit: ingredient.cost || (ingredient.price * 0.7) // Fallback estimate if cost not set
      };

      setNewProduct({ ...newProduct, recipe: [...newProduct.recipe, newRecipeItem] });
  };

  const updateRecipeQty = (ingredientId: number, qty: number) => {
      if (!newProduct.recipe) return;
      const updatedRecipe = newProduct.recipe.map(item => 
          item.ingredientId === ingredientId ? { ...item, qty } : item
      );
      setNewProduct({ ...newProduct, recipe: updatedRecipe });
  };

  const removeRecipeItem = (ingredientId: number) => {
      if (!newProduct.recipe) return;
      setNewProduct({ ...newProduct, recipe: newProduct.recipe.filter(item => item.ingredientId !== ingredientId) });
  };

  const handleSubmitWaste = () => {
      if (selectedProductForWaste) {
          recordWaste(selectedProductForWaste.id, wasteQty, wasteReason);
          setShowWasteModal(false);
          setSelectedProductForWaste(null);
      }
  };

  return (
    <BackofficeLayout
        title="Inventori"
        icon={<Warehouse size={20} className="text-cyan-400" />}
        onNavigate={onNavigate}
        activeHardware={activeHardware}
        activeModules={activeModules}
        currentPage="irm-app"
    >
      <div className="container mx-auto px-4 py-6 max-w-7xl h-full flex flex-col">
        
        {/* Top Controls */}
        <div className="flex justify-between items-center mb-6 gap-4 border-b border-white/10 pb-4">
             {/* Tab Switcher */}
             <div className="flex bg-slate-900/50 p-1 rounded-lg border border-white/10 overflow-hidden">
                <button 
                    onClick={() => setActiveTab('stock')}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'stock' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                    <Package size={16} className={activeTab === 'stock' ? 'text-cyan-400' : ''} /> 
                    <span className="hidden sm:inline">{isFnb ? 'Menu & Bahan' : 'Produk'}</span>
                </button>
                <button 
                    onClick={() => setActiveTab('audit')}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'audit' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                    <History size={16} className={activeTab === 'audit' ? 'text-cyan-400' : ''} /> 
                    <span className="hidden sm:inline">Mutasi</span>
                </button>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                {/* Category Filter Pills */}
                <div className="hidden md:flex gap-2 overflow-x-auto no-scrollbar max-w-[300px]">
                    {categories.slice(0, 3).map(cat => (
                        <button key={cat} onClick={() => setSelectedCategoryFilter(cat)} className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${selectedCategoryFilter === cat ? 'bg-cyan-600/20 border-cyan-500 text-cyan-400' : 'bg-slate-900 border-white/10 text-gray-400'}`}>{cat}</button>
                    ))}
                </div>

                <button 
                    title="Tambah Item Baru"
                    onClick={() => setShowAddModal(true)}
                    className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-sibos-orange to-red-600 hover:from-orange-500 hover:to-red-500 rounded-lg shadow-lg shadow-orange-900/40 text-white transition-all active:scale-95"
                >
                    <Plus size={24} strokeWidth={3} />
                </button>
            </div>
        </div>

        {/* Narrative & Content */}
        {activeTab === 'stock' && (
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 pb-24 animate-in fade-in slide-in-from-left-4">
                <div className="mb-4">
                    <h2 className="text-xl font-bold text-white">Daftar Stok</h2>
                    <p className="text-sm text-gray-400">Kelola ketersediaan barang jual dan bahan baku.</p>
                </div>

                <div className="space-y-2">
                    {filteredItems.map(item => {
                        const isMenu = item.type === 'menu';
                        const statusColor = !isMenu && (item.stock || 0) <= (item.minStock || 0) ? 'text-red-500' : 'text-green-500';
                        const isExpandedProduct = expandedProductId === item.id;

                        return (
                            <div 
                                key={item.id} 
                                className={`rounded-xl border transition-all duration-200 overflow-hidden ${isExpandedProduct ? 'bg-slate-900 border-cyan-500/50 shadow-lg' : 'bg-slate-950 border-white/5 hover:border-white/20'}`}
                            >
                                <div onClick={() => toggleProductDetail(item.id)} className="p-4 flex items-center gap-4 cursor-pointer">
                                    <div className="w-12 h-12 bg-slate-800 rounded-lg flex-shrink-0 overflow-hidden border border-white/5 relative">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        {isMenu ? <div className="absolute bottom-0 right-0 bg-orange-500 text-white text-[8px] px-1 font-bold">MENU</div> : <div className="absolute bottom-0 right-0 bg-blue-500 text-white text-[8px] px-1 font-bold">STOK</div>}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className={`font-bold text-sm truncate transition-colors ${isExpandedProduct ? 'text-cyan-400' : 'text-white'}`}>{item.name}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] px-1.5 py-0.5 bg-white/5 rounded text-gray-400">{item.category}</span>
                                            <span className="text-xs text-gray-500">{item.unit}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-lg font-bold ${statusColor}`}>{isMenu ? '∞' : item.stock}</div>
                                    </div>
                                </div>

                                {isExpandedProduct && (
                                    <div className="border-t border-white/5 bg-slate-900/50 p-4 animate-in slide-in-from-top-2">
                                        {/* Actions */}
                                        <div className="flex gap-2 justify-end">
                                            {!isMenu && (
                                                <button onClick={() => { setSelectedProductForWaste(item); setShowWasteModal(true); }} className="px-3 py-1.5 bg-red-500/10 text-red-400 text-xs font-bold rounded border border-red-500/20 flex items-center gap-1">
                                                    <Trash2 size={12}/> Waste
                                                </button>
                                            )}
                                            <button className="px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded border border-white/10 flex items-center gap-1">
                                                <Edit3 size={12}/> Edit
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        )}

        {activeTab === 'audit' && (
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 pb-24 animate-in fade-in slide-in-from-right-4">
                <div className="mb-4">
                    <h2 className="text-xl font-bold text-white">Log Mutasi Stok</h2>
                    <p className="text-sm text-gray-400">Riwayat keluar masuk barang.</p>
                </div>

                <div className="space-y-3">
                    {stockMutations.map((log) => (
                        <div key={log.id} className="bg-slate-900 border border-white/5 rounded-xl p-4 flex justify-between items-center hover:border-cyan-500/30 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs ${log.type === 'IN' ? 'bg-green-500/10 text-green-400' : log.type === 'OUT' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                                    {log.type}
                                </div>
                                <div>
                                    <div className="font-bold text-white text-sm">{log.item}</div>
                                    <div className="text-xs text-gray-500">{log.ref} • Oleh: {log.staff}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className={`font-bold ${log.qty > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {log.qty > 0 ? '+' : ''}{log.qty} {log.unit}
                                </div>
                                <div className="text-[10px] text-gray-500">{log.date}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* --- MODALS --- */}
        {showWasteModal && selectedProductForWaste && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in">
                <div className="bg-slate-900 border border-red-500/30 rounded-2xl w-full max-w-md p-6 shadow-2xl">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Trash2 size={24} className="text-red-500"/> Catat Limbah (Waste)
                    </h3>
                    <div className="mb-4 text-sm text-gray-400">
                        Mengurangi stok untuk produk: <strong className="text-white block mt-1 text-lg">{selectedProductForWaste.name}</strong>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Jumlah (Qty)</label>
                            <div className="flex items-center gap-3">
                                <button onClick={() => setWasteQty(Math.max(1, wasteQty - 1))} className="w-10 h-10 rounded-lg bg-slate-800 text-white font-bold hover:bg-slate-700">-</button>
                                <input 
                                    type="number" 
                                    value={wasteQty} 
                                    onChange={e => setWasteQty(Number(e.target.value))}
                                    className="flex-1 bg-slate-950 border border-white/10 rounded-lg p-2 text-center text-white font-bold"
                                />
                                <button onClick={() => setWasteQty(wasteQty + 1)} className="w-10 h-10 rounded-lg bg-slate-800 text-white font-bold hover:bg-slate-700">+</button>
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Alasan</label>
                            <select 
                                value={wasteReason} 
                                onChange={e => setWasteReason(e.target.value as any)}
                                className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 outline-none"
                            >
                                <option value="Expired">Kadaluarsa (Expired)</option>
                                <option value="Damaged">Rusak / Pecah</option>
                                <option value="Lost">Hilang</option>
                                <option value="Internal Use">Konsumsi Staff / Tester</option>
                                <option value="Other">Lainnya</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-8">
                        <button onClick={() => setShowWasteModal(false)} className="flex-1 py-3 bg-slate-800 rounded-xl font-bold text-gray-300 hover:bg-slate-700">Batal</button>
                        <button onClick={handleSubmitWaste} className="flex-1 py-3 bg-red-600 hover:bg-red-500 rounded-xl font-bold text-white shadow-lg">Konfirmasi</button>
                    </div>
                </div>
            </div>
        )}

        {showAddModal && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
                <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl h-[85vh] flex flex-col shadow-2xl">
                    <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 shrink-0">
                        <h2 className="text-xl font-bold text-white">Tambah Item Baru</h2>
                        <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-white/10 rounded-full text-gray-400"><X size={20}/></button>
                    </div>
                    
                    {/* Category Toggle */}
                    {isFnb && (
                        <div className="px-6 py-4 bg-slate-950 border-b border-white/5 shrink-0">
                            <div className="flex p-1 bg-slate-800 rounded-lg">
                                <button 
                                    onClick={() => setNewProduct({...newProduct, type: 'menu'})}
                                    className={`flex-1 py-2 rounded-md text-sm font-bold flex items-center justify-center gap-2 transition-all ${newProduct.type === 'menu' ? 'bg-orange-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                                >
                                    <Utensils size={16} /> Menu Jual
                                </button>
                                <button 
                                    onClick={() => setNewProduct({...newProduct, type: 'ingredient'})}
                                    className={`flex-1 py-2 rounded-md text-sm font-bold flex items-center justify-center gap-2 transition-all ${newProduct.type === 'ingredient' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                                >
                                    <Package size={16} /> Bahan Baku
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Tab Navigation for Menu */}
                    {newProduct.type === 'menu' && (
                        <div className="px-6 pt-2 shrink-0 border-b border-white/5">
                            <div className="flex gap-4">
                                {['info', 'recipe'].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setAddProductTab(tab as any)}
                                        className={`pb-3 text-sm font-bold border-b-2 transition-colors ${addProductTab === tab ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-gray-500 hover:text-white'}`}
                                    >
                                        {tab === 'info' ? 'Info Dasar' : 'Resep'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Form Content */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                        {(addProductTab === 'info' || newProduct.type === 'ingredient') && (
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-24 h-24 bg-slate-800 rounded-xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-gray-500 hover:border-cyan-500 hover:text-cyan-500 cursor-pointer transition-colors shrink-0">
                                        <Camera size={24} />
                                        <span className="text-[10px] mt-1">Upload</span>
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Item</label>
                                            <input type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-white focus:border-cyan-500 outline-none" placeholder={newProduct.type === 'menu' ? "Contoh: Nasi Goreng Spesial" : "Contoh: Telur Ayam"} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Kategori</label>
                                                <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-white focus:border-cyan-500 outline-none">
                                                    <option value="Makanan">Makanan</option>
                                                    <option value="Minuman">Minuman</option>
                                                    <option value="Snack">Snack</option>
                                                    <option value="Bahan Baku">Bahan Baku</option>
                                                </select>
                                            </div>
                                            {newProduct.type === 'menu' && (
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Printer Target</label>
                                                    <select value={newProduct.printerTarget} onChange={e => setNewProduct({...newProduct, printerTarget: e.target.value as any})} className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-white focus:border-cyan-500 outline-none">
                                                        <option value="kitchen">Dapur (Makanan)</option>
                                                        <option value="bar">Bar (Minuman)</option>
                                                        <option value="cashier">Kasir Saja</option>
                                                    </select>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                    {newProduct.type === 'menu' ? (
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Harga Jual (Rp)</label>
                                            <input type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})} className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-white focus:border-cyan-500 outline-none font-bold text-lg" />
                                        </div>
                                    ) : (
                                        <>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Estimasi Harga Beli (HPP)</label>
                                                <input type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})} className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-white focus:border-cyan-500 outline-none" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Stok Awal</label>
                                                <input type="number" value={newProduct.stock || ''} onChange={e => setNewProduct({...newProduct, stock: parseFloat(e.target.value)})} className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-white focus:border-cyan-500 outline-none" />
                                            </div>
                                        </>
                                    )}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Satuan</label>
                                        <input type="text" value={newProduct.unit} onChange={e => setNewProduct({...newProduct, unit: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-white focus:border-cyan-500 outline-none" placeholder={newProduct.type === 'menu' ? 'Porsi' : 'Kg / Liter / Pcs'} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {addProductTab === 'recipe' && newProduct.type === 'menu' && (
                             <div className="space-y-4">
                                <div className="p-3 bg-blue-900/20 border border-blue-500/20 rounded-lg text-xs text-gray-300 flex gap-2">
                                    <Info size={16} className="text-blue-400 shrink-0"/>
                                    Saat menu ini terjual, stok bahan di bawah ini akan otomatis berkurang.
                                </div>
                                {isOwner ? (
                                    <div className="relative">
                                        <input type="text" placeholder="Cari bahan baku..." value={recipeSearch} onChange={e => setRecipeSearch(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-lg py-2 pl-3 pr-10 text-sm text-white focus:border-cyan-500 outline-none"/>
                                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={16}/>
                                        {recipeSearch && (
                                            <div className="absolute top-full left-0 w-full bg-slate-900 border border-white/10 rounded-lg mt-1 max-h-40 overflow-y-auto z-10 shadow-xl">
                                                {availableIngredients.filter(i => i.name.toLowerCase().includes(recipeSearch.toLowerCase())).map(ing => (
                                                    <button key={ing.id} onClick={() => { handleAddIngredientToRecipe(ing); setRecipeSearch(''); }} className="w-full text-left px-3 py-2 hover:bg-white/10 text-sm text-gray-300 border-b border-white/5 last:border-0 flex justify-between">
                                                        <span>{ing.name}</span><span className="text-xs text-gray-500">{ing.stock} {ing.unit}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="p-3 bg-red-900/20 border border-red-500/20 rounded-lg text-xs text-red-300 flex gap-2 items-center"><Lock size={14} /> Hanya Owner yang dapat mengedit resep.</div>
                                )}

                                <div className="space-y-2">
                                    {newProduct.recipe?.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-3 bg-slate-950 border border-white/10 rounded-lg">
                                            <div className="flex-1">
                                                <div className="text-sm font-bold text-white">{item.ingredientName}</div>
                                                <div className="text-[10px] text-gray-500">Estimasi Cost: Rp {item.costPerUnit.toLocaleString()} / {item.unit}</div>
                                            </div>
                                            {isOwner && (
                                                <div className="flex items-center gap-2 bg-slate-900 rounded border border-white/5 px-2 py-1">
                                                    <input type="number" value={item.qty} onChange={(e) => updateRecipeQty(item.ingredientId, parseFloat(e.target.value))} className="w-12 bg-transparent text-right text-white font-bold outline-none text-sm"/>
                                                    <span className="text-xs text-gray-500">{item.unit}</span>
                                                </div>
                                            )}
                                            {isOwner && <button onClick={() => removeRecipeItem(item.ingredientId)} className="p-2 text-red-400 hover:bg-white/5 rounded"><Trash2 size={16}/></button>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-6 border-t border-white/10 flex gap-3 bg-slate-900 shrink-0 mt-auto">
                        <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 bg-slate-800 rounded-xl text-white font-bold hover:bg-slate-700 transition-colors">Batal</button>
                        <button onClick={handleAddProduct} className="flex-1 py-3 bg-cyan-600 rounded-xl text-white font-bold hover:bg-cyan-500 transition-colors shadow-lg">Simpan</button>
                    </div>
                </div>
            </div>
        )}

      </div>
    </BackofficeLayout>
  );
};
