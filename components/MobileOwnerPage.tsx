
import React, { useState } from 'react';
import { 
  PieChart, TrendingUp, DollarSign, 
  Wallet, ArrowUpRight, ArrowDownRight, Bell,
  Calendar, User, Store, Activity, MapPin
} from 'lucide-react';
import { Page, UserRole } from '../types';
import { useSibos } from '../contexts/SibosContext';

interface MobileOwnerPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  userRole: UserRole;
}

export const MobileOwnerPage: React.FC<MobileOwnerPageProps> = ({ onNavigate, onLogout, userRole }) => {
  const { stats, transactions, outlets } = useSibos();
  const [activeTab, setActiveTab] = useState('overview');

  // Helper to format currency compact (e.g. 1.5jt)
  const formatCompact = (num: number) => {
      if (num >= 1000000) return `Rp ${(num / 1000000).toFixed(1)} Juta`;
      if (num >= 1000) return `Rp ${(num / 1000).toFixed(1)} Rb`;
      return `Rp ${num}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sibos-orange to-red-600 p-0.5">
              <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center font-bold text-sibos-orange">AM</div>
           </div>
           <div>
              <div className="text-xs text-gray-400">Owner Dashboard</div>
              <div className="font-bold text-sm text-white">Amin Maghfuri</div>
           </div>
        </div>
        <button className="p-2 rounded-full bg-white/5 relative">
           <Bell size={20} />
           <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-slate-900"></div>
        </button>
      </div>

      <div className="p-6 space-y-6">
         
         {/* Net Profit Card */}
         <div className="bg-gradient-to-br from-orange-900/80 to-slate-900 rounded-3xl p-6 border border-orange-500/20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -z-10"></div>
            
            <div className="flex justify-between items-start mb-6">
               <div>
                  <div className="text-xs text-orange-200 font-bold uppercase tracking-wider mb-1 opacity-70">Omzet (Hari Ini)</div>
                  <div className="text-3xl font-bold text-white tracking-tight">{formatCompact(stats.todayRevenue)}</div>
               </div>
               <div className="p-2 bg-orange-500/20 rounded-full text-orange-400">
                  <Wallet size={24} />
               </div>
            </div>
            
            <div className="flex gap-4">
                <div className="flex-1 bg-slate-900/50 rounded-xl p-3 border border-white/5">
                    <div className="flex items-center gap-1 text-xs text-green-400 mb-1">
                        <ArrowUpRight size={12} /> {stats.todayTransactions}
                    </div>
                    <div className="text-[10px] text-gray-400">Transaksi</div>
                </div>
                <div className="flex-1 bg-slate-900/50 rounded-xl p-3 border border-white/5">
                    <div className="text-xs text-white font-bold mb-1">~43%</div>
                    <div className="text-[10px] text-gray-400">Est. Margin</div>
                </div>
            </div>
         </div>

         {/* Multi-Outlet Summary (DYNAMIC) */}
         <div>
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Performa Outlet ({outlets.length})</h3>
               <button className="text-xs text-sibos-orange font-bold">Detail</button>
            </div>
            
            <div className="space-y-3">
               {outlets.map(outlet => {
                   // Simulate random activity state for demo
                   const isActive = Math.random() > 0.3; 
                   const outletRevenue = isActive ? stats.todayRevenue * (Math.random() * 0.5 + 0.1) : 0;
                   const outletTrx = isActive ? Math.floor(stats.todayTransactions * (Math.random() * 0.5 + 0.1)) : 0;

                   return (
                       <div key={outlet.id} className={`bg-slate-900 p-4 rounded-2xl border border-white/5 flex items-center justify-between ${!isActive && 'opacity-60'}`}>
                          <div className="flex items-center gap-4 overflow-hidden">
                             <div className="p-3 bg-slate-800 rounded-xl shrink-0">
                                <Store size={20} className={isActive ? "text-sibos-orange" : "text-gray-500"} />
                             </div>
                             <div className="min-w-0">
                                <div className="font-bold text-sm truncate text-white">{outlet.name}</div>
                                <div className="text-[10px] text-gray-500 flex items-center gap-1 truncate">
                                    {outlet.category.toUpperCase()} • {isActive ? <span className="text-green-400">Online</span> : 'Offline'}
                                </div>
                             </div>
                          </div>
                          <div className="text-right shrink-0">
                             <div className="font-bold text-sm text-white">{formatCompact(outletRevenue)}</div>
                             <div className="text-[10px] text-gray-500">{outletTrx} Trx</div>
                          </div>
                       </div>
                   );
               })}
            </div>
         </div>

         {/* Live Transactions Stream */}
         <div>
             <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Transaksi Terakhir</h3>
             <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                 {transactions.slice(0, 5).map((tx, idx) => (
                     <div key={idx} className="bg-slate-900 p-3 rounded-xl border border-white/5 flex justify-between items-center">
                         <div>
                             <div className="text-sm font-bold text-white">{tx.id}</div>
                             <div className="text-[10px] text-gray-500">{new Date(tx.date).toLocaleTimeString()}</div>
                         </div>
                         <div className="text-right">
                             <div className="text-sm font-bold text-green-400">+ Rp {tx.total.toLocaleString()}</div>
                             <div className="text-[10px] text-gray-500">{tx.paymentMethod.toUpperCase()}</div>
                         </div>
                     </div>
                 ))}
                 {transactions.length === 0 && <div className="text-center text-gray-500 text-xs py-4">Belum ada data penjualan.</div>}
             </div>
         </div>

         {/* AI Insight */}
         <div className="p-4 bg-gradient-to-r from-orange-900/40 to-slate-900 border border-orange-500/20 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <div className="text-xs font-bold text-orange-400">AI EXECUTIVE SUMMARY</div>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
                "Tren penjualan hari ini positif. Outlet <strong>{outlets[0]?.name}</strong> menyumbang 40% total omzet. Pertimbangkan untuk menambah stok produk terlaris di sana."
            </p>
         </div>

      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-slate-900 border-t border-white/10 px-6 py-3 flex justify-between items-center z-40 pb-6">
         <button 
            onClick={() => setActiveTab('overview')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'overview' ? 'text-sibos-orange' : 'text-gray-500'}`}
         >
            <PieChart size={24} strokeWidth={activeTab === 'overview' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Bisnis</span>
         </button>
         <button 
            onClick={() => setActiveTab('finance')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'finance' ? 'text-sibos-orange' : 'text-gray-500'}`}
         >
            <DollarSign size={24} strokeWidth={activeTab === 'finance' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Keuangan</span>
         </button>
         <button 
            onClick={() => setActiveTab('growth')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'growth' ? 'text-sibos-orange' : 'text-gray-500'}`}
         >
            <TrendingUp size={24} strokeWidth={activeTab === 'growth' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Growth</span>
         </button>
         <button 
            onClick={onLogout}
            className={`flex flex-col items-center gap-1 text-red-500/70 hover:text-red-500`}
         >
            <User size={24} />
            <span className="text-[10px] font-medium">Profil</span>
         </button>
      </div>

    </div>
  );
};
