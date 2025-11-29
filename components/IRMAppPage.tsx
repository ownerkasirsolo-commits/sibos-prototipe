
import React, { useState } from 'react';
import { 
  Search, Filter, Plus, Package, 
  AlertTriangle, ArrowDownLeft, 
  History, MoreHorizontal, Warehouse, ShoppingCart,
  FileSpreadsheet, FileBarChart, Settings
} from 'lucide-react';
import { Page } from '../types';
import { GlassCard } from './ui/GlassCard';
import { useSibos } from '../contexts/SibosContext';
import { BackofficeLayout } from './BackofficeLayout';

interface IRMAppPageProps {
  onNavigate: (page: Page) => void;
}

export const IRMAppPage: React.FC<IRMAppPageProps> = ({ onNavigate }) => {
  const { products, stats } = useSibos(); // Use Global State
  const [activeTab, setActiveTab] = useState<'all' | 'alert' | 'in' | 'out'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = products.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'alert') {
        return matchesSearch && (item.stock !== null && item.minStock !== undefined && item.stock <= item.minStock);
    }
    
    return matchesSearch;
  });

  return (
    <BackofficeLayout
        title="Manajemen Inventori"
        icon={<Warehouse size={20} className="text-cyan-400" />}
        onNavigate={onNavigate}
        actions={
            <>
                <button className="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-white/10 hover:bg-slate-700 rounded-lg text-sm text-gray-300 transition-colors">
                    <FileBarChart size={16} /> <span className="hidden sm:inline">Laporan</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-white/10 hover:bg-slate-700 rounded-lg text-sm text-gray-300 transition-colors">
                    <Settings size={16} /> <span className="hidden sm:inline">Pengaturan</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-bold shadow-lg shadow-cyan-900/50 transition-colors">
                    <Plus size={16} />
                    Stok Masuk
                </button>
            </>
        }
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl pb-24">
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <GlassCard className="!p-4 bg-slate-900/50">
             <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Package size={20} /></div>
                <span className="text-xs text-green-400 font-bold">+12 Item</span>
             </div>
             <div className="text-2xl font-bold text-white">{products.length}</div>
             <div className="text-xs text-gray-400">Total SKU Aktif</div>
          </GlassCard>
          
          <GlassCard className="!p-4 bg-slate-900/50">
             <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-red-500/10 rounded-lg text-red-400"><AlertTriangle size={20} /></div>
                <span className="text-xs text-red-400 font-bold">Action Needed</span>
             </div>
             <div className="text-2xl font-bold text-white">{stats.lowStockCount}</div>
             <div className="text-xs text-gray-400">Stok Menipis / Kosong</div>
          </GlassCard>

          <GlassCard className="!p-4 bg-slate-900/50">
             <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-green-500/10 rounded-lg text-green-400"><ArrowDownLeft size={20} /></div>
                <span className="text-xs text-gray-400">Hari Ini</span>
             </div>
             <div className="text-2xl font-bold text-white">24</div>
             <div className="text-xs text-gray-400">PO Masuk (Inbound)</div>
          </GlassCard>

          <GlassCard className="!p-4 bg-slate-900/50">
             <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400"><History size={20} /></div>
                <span className="text-xs text-gray-400">Total Aset</span>
             </div>
             <div className="text-2xl font-bold text-white">
                 Rp {(products.reduce((acc, p) => acc + (p.price * (p.stock || 0)), 0) / 1000000).toFixed(1)}jt
             </div>
             <div className="text-xs text-gray-400">Valuasi Stok Sekarang</div>
          </GlassCard>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          
          {/* Tabs */}
          <div className="flex bg-slate-900 p-1 rounded-lg border border-white/5">
             {[
               { id: 'all', label: 'Semua Stok' },
               { id: 'alert', label: 'Low Stock' },
               { id: 'in', label: 'Riwayat Masuk' },
               { id: 'out', label: 'Riwayat Keluar' }
             ].map(tab => (
               <button 
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id as any)}
                 className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-cyan-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
               >
                 {tab.label}
               </button>
             ))}
          </div>

          {/* Search & Filter */}
          <div className="flex gap-2 w-full md:w-auto">
             <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input 
                  type="text" 
                  placeholder="Cari SKU atau Nama Barang..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:border-cyan-500 outline-none"
                />
             </div>
             <button className="p-2 bg-slate-900 border border-white/10 rounded-lg text-gray-400 hover:text-white">
                <Filter size={18} />
             </button>
             <button className="p-2 bg-slate-900 border border-white/10 rounded-lg text-green-400 hover:text-green-300" title="Export Excel">
                <FileSpreadsheet size={18} />
             </button>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-xl">
           <div className="overflow-x-auto">
             <table className="w-full text-sm text-left">
               <thead className="bg-slate-950 text-gray-400 uppercase font-bold text-xs">
                 <tr>
                   <th className="px-6 py-4">SKU / Nama Produk</th>
                   <th className="px-6 py-4">Kategori</th>
                   <th className="px-6 py-4 text-center">Stok Fisik</th>
                   <th className="px-6 py-4 text-right">Nilai Aset</th>
                   <th className="px-6 py-4 text-center">Status</th>
                   <th className="px-6 py-4 text-right">Aksi</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                 {filteredItems.map((item) => (
                   <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                     <td className="px-6 py-4">
                        <div className="font-bold text-white">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.sku}</div>
                     </td>
                     <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded bg-white/5 border border-white/5 text-xs text-gray-300">
                          {item.category.toUpperCase()}
                        </span>
                     </td>
                     <td className="px-6 py-4 text-center">
                        <div className="font-bold text-white">{item.stock} <span className="text-xs font-normal text-gray-500">{item.unit}</span></div>
                        {item.minStock && item.stock! <= item.minStock && (
                            <div className="text-[10px] text-red-400 mt-1">Min: {item.minStock}</div>
                        )}
                     </td>
                     <td className="px-6 py-4 text-right text-gray-300">
                        Rp {(item.price * (item.stock || 0)).toLocaleString()}
                     </td>
                     <td className="px-6 py-4 text-center">
                        {item.stock! > (item.minStock || 0) && <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-bold border border-green-500/20">Aman</span>}
                        {item.stock! <= (item.minStock || 0) && item.stock! > 0 && <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold border border-amber-500/20">Menipis</span>}
                        {item.stock === 0 && <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-bold border border-red-500/20">Kosong</span>}
                     </td>
                     <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors">
                           <MoreHorizontal size={16} />
                        </button>
                     </td>
                   </tr>
                 ))}
                 {filteredItems.length === 0 && (
                   <tr>
                     <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                       <Package size={48} className="mx-auto mb-4 opacity-20" />
                       <p>Tidak ada data stok ditemukan.</p>
                     </td>
                   </tr>
                 )}
               </tbody>
             </table>
           </div>
           
           <div className="px-6 py-4 border-t border-white/5 bg-slate-950 flex justify-between items-center text-xs text-gray-500">
              <div>Menampilkan {filteredItems.length} dari {products.length} data</div>
              <div className="flex gap-2">
                 <button className="px-3 py-1 bg-white/5 rounded hover:bg-white/10">Prev</button>
                 <button className="px-3 py-1 bg-white/5 rounded hover:bg-white/10">Next</button>
              </div>
           </div>
        </div>
      </div>
    </BackofficeLayout>
  );
};
