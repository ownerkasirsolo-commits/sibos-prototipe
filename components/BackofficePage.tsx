
import React from 'react';
import { 
  LayoutDashboard, ShoppingCart, Users, Package, 
  DollarSign, Activity, RotateCcw, Utensils, ShoppingBag,
  ArrowRight, CheckCircle2, Store, TrendingUp,
  Wallet, FileBarChart, Plus, Search, ChefHat, Clock, AlertTriangle, Calendar
} from 'lucide-react';
import { UserRole, Page, BusinessCategory, HardwareModule, AppModule } from '../types';
import { GlassCard } from './ui/GlassCard';
import { useSibos } from '../contexts/SibosContext';
import { BackofficeLayout } from './BackofficeLayout';

interface BackofficePageProps {
  userRole: UserRole;
  businessCategory?: BusinessCategory;
  activeHardware?: HardwareModule[];
  activeModules?: AppModule[];
  onLogout: () => void;
  onNavigate: (page: Page) => void;
}

export const BackofficePage: React.FC<BackofficePageProps> = ({ 
    userRole, 
    activeHardware = [], 
    activeModules = [],
    onNavigate 
}) => {
  const { stats, transactions, resetSimulation, selectedOutlet, products, seedDatabase } = useSibos(); 

  // --- COMPONENT: F&B DASHBOARD ---
  const FnBDashboard = () => (
      <div className="space-y-6">
          {/* Quick Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-5 bg-gradient-to-br from-orange-900/40 to-slate-900 border border-orange-500/20 rounded-2xl relative overflow-hidden group">
                  <div className="absolute -right-4 -top-4 bg-orange-500/10 w-24 h-24 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all"></div>
                  <div className="flex justify-between items-start mb-2">
                      <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400"><Utensils size={20}/></div>
                      <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded font-bold">Open</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">0 Meja</div>
                  <div className="text-xs text-gray-400">Total Terisi</div>
              </div>
              
              <div className="p-5 bg-slate-900 border border-white/5 rounded-2xl">
                  <div className="flex justify-between items-start mb-2">
                      <div className="p-2 bg-sibos-orange/10 rounded-lg text-sibos-orange"><ChefHat size={20}/></div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">0 Order</div>
                  <div className="text-xs text-gray-400">Antrian Dapur</div>
              </div>

              <div className="p-5 bg-slate-900 border border-white/5 rounded-2xl">
                  <div className="flex justify-between items-start mb-2">
                      <div className="p-2 bg-green-500/10 rounded-lg text-green-400"><Wallet size={20}/></div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">Rp {stats.todayRevenue.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">Omzet Hari Ini</div>
              </div>

              <div className="p-5 bg-slate-900 border border-white/5 rounded-2xl">
                  <div className="flex justify-between items-start mb-2">
                      <div className="p-2 bg-red-500/10 rounded-lg text-red-400"><Calendar size={20}/></div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">0</div>
                  <div className="text-xs text-gray-400">Reservasi Masuk</div>
              </div>
          </div>

          {/* Quick Actions for Restaurant Owner */}
          <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Aksi Cepat Restoran</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button onClick={() => onNavigate('pos-app')} className="p-4 bg-slate-800 hover:bg-slate-700 rounded-xl border border-white/5 flex flex-col items-center gap-2 transition-all group">
                      <Plus size={24} className="text-sibos-orange group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-bold text-white">Order Baru</span>
                  </button>
                  <button onClick={() => onNavigate('kds-app')} className="p-4 bg-slate-800 hover:bg-slate-700 rounded-xl border border-white/5 flex flex-col items-center gap-2 transition-all group">
                      <ChefHat size={24} className="text-gray-400 group-hover:text-white transition-colors" />
                      <span className="text-sm font-bold text-white">Monitor Dapur</span>
                  </button>
                  <button onClick={() => onNavigate('irm-app')} className="p-4 bg-slate-800 hover:bg-slate-700 rounded-xl border border-white/5 flex flex-col items-center gap-2 transition-all group">
                      <Package size={24} className="text-gray-400 group-hover:text-white transition-colors" />
                      <span className="text-sm font-bold text-white">Cek Bahan Baku</span>
                  </button>
                  <button onClick={() => onNavigate('booking-app')} className="p-4 bg-slate-800 hover:bg-slate-700 rounded-xl border border-white/5 flex flex-col items-center gap-2 transition-all group">
                      <Calendar size={24} className="text-gray-400 group-hover:text-white transition-colors" />
                      <span className="text-sm font-bold text-white">Atur Reservasi</span>
                  </button>
              </div>
          </div>

          {/* Zero State Guide for F&B */}
          {products.length === 0 && (
              <div className="p-6 bg-orange-900/10 border border-orange-500/20 rounded-2xl flex items-start gap-4">
                  <div className="p-3 bg-orange-500/20 rounded-full text-orange-400 shrink-0"><CheckCircle2 size={24}/></div>
                  <div>
                      <h3 className="text-lg font-bold text-white mb-2">Setup Restoran Anda</h3>
                      <p className="text-gray-400 text-sm mb-4">Database masih kosong. Mari mulai dengan langkah-langkah berikut:</p>
                      <div className="flex gap-3">
                          <button onClick={() => onNavigate('irm-app')} className="px-4 py-2 bg-gradient-to-r from-sibos-orange to-red-600 hover:from-orange-500 hover:to-red-500 rounded-lg text-sm font-bold text-white shadow-lg">1. Input Menu</button>
                          <button onClick={() => onNavigate('booking-app')} className="px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-sm font-bold text-gray-300">2. Atur Meja</button>
                      </div>
                  </div>
              </div>
          )}
      </div>
  );

  // --- COMPONENT: RETAIL DASHBOARD ---
  const RetailDashboard = () => (
      <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 bg-gradient-to-br from-orange-900/40 to-slate-900 border border-orange-500/20 rounded-2xl relative overflow-hidden">
                   <div className="absolute -right-4 -top-4 bg-orange-500/10 w-24 h-24 rounded-full blur-2xl"></div>
                  <div className="flex justify-between items-start mb-2">
                      <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400"><ShoppingBag size={20}/></div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">Rp {stats.todayRevenue.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">Penjualan Hari Ini</div>
              </div>
              <div className="p-5 bg-slate-900 border border-white/5 rounded-2xl">
                  <div className="flex justify-between items-start mb-2">
                      <div className="p-2 bg-red-500/10 rounded-lg text-red-400"><AlertTriangle size={20}/></div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stats.lowStockCount} Item</div>
                  <div className="text-xs text-gray-400">Stok Menipis</div>
              </div>
              <div className="p-5 bg-slate-900 border border-white/5 rounded-2xl">
                  <div className="flex justify-between items-start mb-2">
                      <div className="p-2 bg-green-500/10 rounded-lg text-green-400"><Package size={20}/></div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{products.length} SKU</div>
                  <div className="text-xs text-gray-400">Total Produk</div>
              </div>
          </div>

          {/* Zero State Guide for Retail */}
          {products.length === 0 && (
              <div className="p-6 bg-slate-800 border border-white/10 rounded-2xl text-center">
                  <Package size={48} className="mx-auto text-gray-600 mb-4"/>
                  <h3 className="text-lg font-bold text-white mb-2">Toko Belum Ada Isi</h3>
                  <p className="text-gray-400 text-sm mb-6">Mulai dengan memasukkan stok barang dagangan Anda.</p>
                  <button onClick={() => onNavigate('irm-app')} className="px-6 py-3 bg-gradient-to-r from-sibos-orange to-red-600 hover:from-orange-500 hover:to-red-500 rounded-xl text-white font-bold shadow-lg">
                      + Tambah Produk
                  </button>
              </div>
          )}
      </div>
  );

  // --- COMPONENT: GENERIC DASHBOARD (Service, Manufacture, etc) ---
  const GenericDashboard = () => (
      <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 bg-gradient-to-br from-blue-900/40 to-slate-900 border border-blue-500/20 rounded-2xl">
                  <div className="flex justify-between items-start mb-2">
                      <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><Activity size={20}/></div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">Aktif</div>
                  <div className="text-xs text-gray-400">Status Operasional</div>
              </div>
              <div className="p-5 bg-slate-900 border border-white/5 rounded-2xl">
                  <div className="flex justify-between items-start mb-2">
                      <div className="p-2 bg-green-500/10 rounded-lg text-green-400"><Wallet size={20}/></div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">Rp {stats.todayRevenue.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">Pendapatan Hari Ini</div>
              </div>
              <div className="p-5 bg-slate-900 border border-white/5 rounded-2xl">
                  <div className="flex justify-between items-start mb-2">
                      <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><Users size={20}/></div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{transactions.length}</div>
                  <div className="text-xs text-gray-400">Total Transaksi</div>
              </div>
          </div>
          
          <div className="p-8 text-center bg-slate-800/50 border border-white/5 rounded-2xl">
              <Store size={48} className="mx-auto text-gray-600 mb-4"/>
              <h3 className="text-lg font-bold text-white mb-2">Selamat Datang di SIBOS</h3>
              <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
                  Dashboard spesifik untuk kategori <strong>{selectedOutlet.category?.toUpperCase()}</strong> sedang disiapkan. Sementara itu, Anda dapat menggunakan modul-modul di menu sebelah kiri.
              </p>
              <button onClick={() => onNavigate('pos-app')} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-bold shadow-lg">
                  Buka Aplikasi Kasir
              </button>
          </div>
      </div>
  );

  // --- RENDER MAIN ---
  return (
    <BackofficeLayout
        title="Dashboard"
        icon={<LayoutDashboard size={20} className="text-gray-400"/>}
        onNavigate={onNavigate}
        userRole={userRole}
        activeHardware={activeHardware}
        activeModules={activeModules}
    >
         <div className="p-4 md:p-8 max-w-[1600px] mx-auto pb-24">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm mb-1 uppercase tracking-widest font-bold">
                        <Store size={14} className="text-sibos-orange" /> <span>{selectedOutlet.category?.toUpperCase() || 'BISNIS'}</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white">
                        {selectedOutlet.name}
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={resetSimulation} className="p-2.5 rounded-xl bg-slate-800 border border-white/10 text-gray-400 hover:text-white hover:bg-white/5" title="Reset Data"><RotateCcw size={18}/></button>
                </div>
            </div>

            {/* Conditional Rendering based on Industry */}
            {selectedOutlet.category === 'fnb' ? (
                <FnBDashboard />
            ) : selectedOutlet.category === 'retail' || selectedOutlet.category === 'fashion' ? (
                <RetailDashboard />
            ) : (
                <GenericDashboard />
            )}

         </div>
    </BackofficeLayout>
  );
};
