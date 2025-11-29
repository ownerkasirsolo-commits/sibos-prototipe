
import React from 'react';
import { 
  LayoutDashboard, ShoppingCart, Users, Package, 
  DollarSign, Activity, RotateCcw
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
  const { stats, transactions, resetSimulation, selectedOutlet } = useSibos(); 

  // Role-based content helper
  const getRoleBadge = () => {
    switch(userRole) {
        case 'owner': return { label: 'Owner' };
        case 'admin': return { label: 'Administrator' };
        case 'supervisor': return { label: 'Supervisor' };
        default: return { label: 'Staff' };
    }
  };

  const roleInfo = getRoleBadge();

  return (
    <BackofficeLayout
        title="Dashboard"
        icon={<LayoutDashboard size={20} className="text-blue-500"/>}
        onNavigate={onNavigate}
        userRole={userRole}
        activeHardware={activeHardware}
        activeModules={activeModules}
        actions={
            <button 
                onClick={resetSimulation}
                title="Reset Simulasi Data"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-900/30 text-red-400 hover:bg-red-900/50 border border-red-500/30 text-xs font-bold"
            >
                <RotateCcw size={14} /> Reset Data
            </button>
        }
    >
         <div className="p-6 md:p-8">
            
            {/* Role-Based Welcome Banner */}
            <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-sibos-orange/20 to-slate-900 border border-sibos-orange/20 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Halo, {roleInfo.label}! 👋</h1>
                    <p className="text-gray-400">
                        Outlet Aktif: <span className="font-bold text-white">{selectedOutlet.name}</span>.
                    </p>
                </div>
                <div className="flex gap-3">
                    {userRole === 'staff' || userRole === 'owner' ? (
                        <button 
                            onClick={() => onNavigate('pos-app')}
                            className="px-4 py-2 bg-sibos-orange hover:bg-orange-600 rounded-lg text-white text-sm font-bold shadow-lg shadow-orange-900/40"
                        >
                            Buka Mesin Kasir
                        </button>
                    ) : null}
                </div>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <GlassCard className="!p-5">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 rounded-lg bg-white/5 text-green-500">
                            <DollarSign size={20} />
                        </div>
                        <div className="text-xs font-bold px-2 py-1 rounded-full bg-white/5 text-green-400">Live</div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">Rp {stats.todayRevenue.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Total Penjualan Hari Ini</div>
                </GlassCard>

                <GlassCard className="!p-5">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 rounded-lg bg-white/5 text-blue-500">
                            <ShoppingCart size={20} />
                        </div>
                        <div className="text-xs font-bold px-2 py-1 rounded-full bg-white/5 text-blue-400">Active</div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stats.todayTransactions} Order</div>
                    <div className="text-xs text-gray-500">Jumlah Transaksi</div>
                </GlassCard>

                <GlassCard className="!p-5">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 rounded-lg bg-white/5 text-purple-500">
                            <Users size={20} />
                        </div>
                        <div className="text-xs font-bold px-2 py-1 rounded-full bg-white/5 text-purple-400">+2%</div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">18 Orang</div>
                    <div className="text-xs text-gray-500">Pelanggan Baru</div>
                </GlassCard>

                <GlassCard className="!p-5">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 rounded-lg bg-white/5 text-red-500">
                            <Package size={20} />
                        </div>
                        <div className={`text-xs font-bold px-2 py-1 rounded-full bg-white/5 ${stats.lowStockCount > 0 ? 'text-red-400' : 'text-gray-400'}`}>
                            {stats.lowStockCount > 0 ? 'Alert' : 'Aman'}
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stats.lowStockCount} Item</div>
                    <div className="text-xs text-gray-500">Stok Menipis</div>
                </GlassCard>
            </div>

            {/* CONTENT SPLIT */}
            <div className="grid lg:grid-cols-3 gap-8">
                
                {/* Main Activity Chart Area (Dummy) */}
                <div className="lg:col-span-2 space-y-8">
                    <GlassCard className="h-96 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <Activity size={18} className="text-sibos-orange" />
                                Grafik Penjualan (Live)
                            </h3>
                            <select className="bg-black/30 text-white text-xs border border-white/10 rounded px-2 py-1">
                                <option>Hari Ini</option>
                                <option>Minggu Ini</option>
                                <option>Bulan Ini</option>
                            </select>
                        </div>
                        
                        {/* Fake Chart Visualization */}
                        <div className="flex-1 flex items-end gap-2 px-4 pb-4">
                            {[40, 65, 30, 80, 55, 90, 45, 70, 60, 85, 95, 50].map((h, idx) => (
                                <div key={idx} className="flex-1 flex flex-col gap-2 group cursor-pointer">
                                    <div 
                                        className="w-full bg-sibos-orange/20 rounded-t-sm relative group-hover:bg-sibos-orange transition-colors"
                                        style={{ height: `${h}%` }}
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-1 rounded opacity-0 group-hover:opacity-100">
                                            {h * 100}k
                                        </div>
                                    </div>
                                    <div className="text-[10px] text-gray-500 text-center">{idx * 2}am</div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>

                {/* Right Widgets */}
                <div className="space-y-6">
                    {/* Recent Transactions (DYNAMIC) */}
                    <GlassCard>
                        <h3 className="font-bold text-white mb-4 text-sm">Transaksi Terakhir</h3>
                        <div className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar pr-1">
                            {transactions.slice(0, 6).map((tx, idx) => (
                                <div key={idx} className="flex justify-between items-center pb-3 border-b border-white/5 last:border-0 last:pb-0">
                                    <div>
                                        <div className="text-white text-sm font-medium">{tx.items[0].name} {tx.items.length > 1 && `+ ${tx.items.length - 1} lainnya`}</div>
                                        <div className="text-xs text-gray-500">{tx.id} • {new Date(tx.date).toLocaleTimeString()}</div>
                                    </div>
                                    <div className="text-sibos-orange text-sm font-bold">Rp {tx.total.toLocaleString()}</div>
                                </div>
                            ))}
                            {transactions.length === 0 && (
                                <div className="text-center text-gray-500 text-xs italic py-4">Belum ada transaksi</div>
                            )}
                        </div>
                    </GlassCard>

                    {/* AI Insight Widget */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-900/40 to-slate-900 border border-violet-500/20">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></div>
                            <span className="text-xs font-bold text-violet-400 uppercase tracking-wider">AI Insight</span>
                        </div>
                        <p className="text-sm text-gray-200 leading-relaxed mb-4">
                            "Penjualan Kopi meningkat 20% karena hujan. Pertimbangkan untuk restock biji kopi Arabika besok pagi."
                        </p>
                        <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-white border border-white/10 transition-colors">
                            Lihat Analisis Lengkap
                        </button>
                    </div>

                </div>

            </div>
         </div>
    </BackofficeLayout>
  );
};
