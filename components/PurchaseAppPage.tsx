
import React, { useState } from 'react';
import { 
  ShoppingBag, FileText, Users, Truck, Plus, 
  Search, CheckCircle, Clock, 
  ArrowRight, MoreHorizontal, ChevronDown, Phone, Mail, MapPin, Edit3, Trash2, X,
  TrendingUp, AlertCircle
} from 'lucide-react';
import { Page, HardwareModule, AppModule, PurchaseOrder, Supplier, Product, PurchaseOrderItem, POStatus } from '../types';
import { GlassCard } from './ui/GlassCard';
import { useSibos } from '../contexts/SibosContext';
import { BackofficeLayout } from './BackofficeLayout';

interface PurchaseAppPageProps {
  onNavigate: (page: Page) => void;
  activeHardware?: HardwareModule[];
  activeModules?: AppModule[];
}

export const PurchaseAppPage: React.FC<PurchaseAppPageProps> = ({ onNavigate, activeHardware, activeModules }) => {
  const { suppliers, purchaseOrders, products, addPurchaseOrder, searchQuery } = useSibos(); // Use global search
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'suppliers'>('dashboard');
  const [showCreatePO, setShowCreatePO] = useState(false);

  // Filter Logic
  const filteredOrders = purchaseOrders.filter(po => 
      po.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      po.supplierName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSuppliers = suppliers.filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mock Suppliers if empty (for demo)
  const displaySuppliers = suppliers.length > 0 ? filteredSuppliers : [
      { id: 1, name: 'PT. Distribusi Utama', contactPerson: 'Budi', phone: '0812345678', email: 'sales@distutama.com', address: 'Jakarta' },
      { id: 2, name: 'CV. Sumber Pangan', contactPerson: 'Sari', phone: '0819876543', email: 'sari@sumberpangan.id', address: 'Surabaya' },
      { id: 3, name: 'UD. Sayur Segar', contactPerson: 'Pak Joko', phone: '08133344455', email: '-', address: 'Bandung' },
  ];

  return (
    <BackofficeLayout
        title="Pembelian"
        icon={<ShoppingBag className="text-purple-400" size={20} />}
        onNavigate={onNavigate}
        activeHardware={activeHardware}
        activeModules={activeModules}
        currentPage="purchase-app"
    >
      <div className="container mx-auto px-4 py-6 max-w-7xl h-full flex flex-col">
        
        {/* Top Controls */}
        <div className="flex justify-between items-center mb-6 gap-4 border-b border-white/10 pb-4">
             <div className="flex bg-slate-900/50 p-1 rounded-lg border border-white/10 overflow-hidden">
                <button 
                    onClick={() => setActiveTab('dashboard')}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'dashboard' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                    <FileText size={16} className={activeTab === 'dashboard' ? 'text-purple-400' : ''} /> 
                    <span className="hidden sm:inline">Dash</span>
                </button>
                <button 
                    onClick={() => setActiveTab('orders')}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'orders' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                    <ShoppingBag size={16} className={activeTab === 'orders' ? 'text-purple-400' : ''} /> 
                    <span className="hidden sm:inline">PO</span>
                </button>
                <button 
                    onClick={() => setActiveTab('suppliers')}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'suppliers' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                    <Users size={16} className={activeTab === 'suppliers' ? 'text-purple-400' : ''} /> 
                    <span className="hidden sm:inline">Mitra</span>
                </button>
            </div>

            <div className="flex gap-2">
                <button 
                    title="Buat PO Baru"
                    onClick={() => setShowCreatePO(true)}
                    className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-sibos-orange to-red-600 hover:from-orange-500 hover:to-red-500 rounded-lg shadow-lg shadow-orange-900/40 text-white transition-all active:scale-95"
                >
                    <Plus size={24} strokeWidth={3} />
                </button>
            </div>
        </div>

        {/* Content: Dashboard */}
        {activeTab === 'dashboard' && (
            <div className="animate-in fade-in slide-in-from-left-4">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-white">Ringkasan Pembelian</h2>
                    <p className="text-sm text-gray-400">Analisis pengeluaran belanja modal usaha.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <GlassCard className="!p-6 bg-gradient-to-br from-purple-900/20 to-slate-900 border-purple-500/20">
                        <div className="flex items-center gap-2 text-purple-400 mb-2">
                            <TrendingUp size={20} />
                            <span className="font-bold">Total Belanja (Bulan Ini)</span>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">Rp 12.500.000</div>
                        <div className="text-xs text-gray-400">Naik 5% dari bulan lalu</div>
                    </GlassCard>

                    <GlassCard className="!p-6 bg-slate-900 border-white/10">
                        <div className="flex items-center gap-2 text-yellow-400 mb-2">
                            <Clock size={20} />
                            <span className="font-bold">PO Pending</span>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">3 Order</div>
                        <div className="text-xs text-gray-400">Menunggu pengiriman supplier</div>
                    </GlassCard>

                    <GlassCard className="!p-6 bg-slate-900 border-white/10">
                        <div className="flex items-center gap-2 text-red-400 mb-2">
                            <AlertCircle size={20} />
                            <span className="font-bold">Jatuh Tempo</span>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">Rp 4.200.000</div>
                        <div className="text-xs text-gray-400">Hutang ke supplier</div>
                    </GlassCard>
                </div>
            </div>
        )}

        {/* Content: Orders */}
        {activeTab === 'orders' && (
            <div className="animate-in fade-in slide-in-from-left-4">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-white">Purchase Order</h2>
                    <p className="text-sm text-gray-400">Riwayat dan status pesanan ke supplier.</p>
                </div>

                <div className="space-y-3 pb-24">
                    {filteredOrders.length > 0 ? filteredOrders.map(po => (
                        <div key={po.id} className="bg-slate-900 border border-white/5 rounded-xl p-4 flex justify-between items-center hover:border-purple-500/30 transition-colors">
                            <div>
                                <div className="font-bold text-white flex items-center gap-2">
                                    {po.id} 
                                    <span className={`text-[10px] px-2 py-0.5 rounded border uppercase ${po.status === 'received' ? 'text-green-400 bg-green-500/10 border-green-500/20' : 'text-blue-400 bg-blue-500/10 border-blue-500/20'}`}>{po.status}</span>
                                </div>
                                <div className="text-xs text-gray-400 mt-1">{po.supplierName} • {new Date(po.date).toLocaleDateString()}</div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-white">Rp {po.total.toLocaleString()}</div>
                                <div className="text-xs text-gray-500">{po.items.length} Item</div>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-12 bg-slate-900/50 rounded-xl border border-white/5">
                            <ShoppingBag size={48} className="mx-auto text-gray-600 mb-4" />
                            <p className="text-gray-400">Belum ada Purchase Order.</p>
                            <button onClick={() => setShowCreatePO(true)} className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white text-sm font-bold">Buat PO Baru</button>
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* Content: Suppliers */}
        {activeTab === 'suppliers' && (
            <div className="animate-in fade-in slide-in-from-left-4">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-white">Mitra Supplier</h2>
                    <p className="text-sm text-gray-400">Database pemasok barang dan kontak.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-24">
                    {displaySuppliers.map((s) => (
                        <div key={s.id} className="bg-slate-900 border border-white/5 rounded-xl p-5 hover:border-purple-500/30 transition-colors group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold">{s.name.charAt(0)}</div>
                                    <div>
                                        <h4 className="font-bold text-white">{s.name}</h4>
                                        <p className="text-xs text-gray-400">{s.address}</p>
                                    </div>
                                </div>
                                <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 group-hover:text-white"><MoreHorizontal size={16}/></button>
                            </div>
                            <div className="space-y-2 text-sm text-gray-300">
                                <div className="flex items-center gap-2"><Users size={14} className="text-gray-500"/> {s.contactPerson}</div>
                                <div className="flex items-center gap-2"><Phone size={14} className="text-gray-500"/> {s.phone}</div>
                                <div className="flex items-center gap-2"><Mail size={14} className="text-gray-500"/> {s.email}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* CREATE PO MODAL */}
        {showCreatePO && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
                <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl h-[80vh] flex flex-col shadow-2xl">
                    <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 shrink-0">
                        <h2 className="text-xl font-bold text-white">Buat Purchase Order</h2>
                        <button onClick={() => setShowCreatePO(false)}><X size={20} className="text-gray-500 hover:text-white"/></button>
                    </div>
                    <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                        <div className="space-y-6">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Pilih Supplier</label>
                                <select className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 outline-none">
                                    <option>Pilih Mitra...</option>
                                    {displaySuppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                </select>
                            </div>
                            
                            <div className="p-4 bg-white/5 rounded-xl border border-white/5 border-dashed flex flex-col items-center justify-center text-gray-500 gap-2 min-h-[200px]">
                                <ShoppingBag size={32} className="opacity-20" />
                                <p className="text-sm">Keranjang PO Kosong</p>
                                <button className="px-4 py-2 bg-slate-800 rounded-lg text-xs font-bold text-white hover:bg-slate-700 border border-white/10">+ Tambah Barang</button>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 border-t border-white/10 flex gap-3 bg-slate-900 shrink-0 mt-auto">
                        <button onClick={() => setShowCreatePO(false)} className="flex-1 py-3 bg-slate-800 rounded-xl text-white font-bold hover:bg-slate-700 transition-colors">Batal</button>
                        <button className="flex-1 py-3 bg-purple-600 rounded-xl text-white font-bold hover:bg-purple-500 transition-colors shadow-lg">Kirim PO</button>
                    </div>
                </div>
            </div>
        )}

      </div>
    </BackofficeLayout>
  );
};
