
import React, { useState, useEffect } from 'react';
import { 
  Home, ShoppingCart, User, Bell, MapPin, 
  Camera, Clock, Calendar, LogOut, ChevronRight,
  Package, DollarSign
} from 'lucide-react';
import { Page, UserRole } from '../types';
import { useSibos } from '../contexts/SibosContext';

interface MobileStaffPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  userRole: UserRole;
}

export const MobileStaffPage: React.FC<MobileStaffPageProps> = ({ onNavigate, onLogout, userRole }) => {
  const { transactions, selectedOutlet } = useSibos();
  const [activeTab, setActiveTab] = useState('home');
  const [isClockedIn, setIsClockedIn] = useState(false);
  
  // Calculate personal performance (Simulated using 'Kasir 1')
  const myTransactions = transactions.filter(t => t.staff === 'Kasir 1' && new Date(t.date).toDateString() === new Date().toDateString());
  const myRevenue = myTransactions.reduce((acc, t) => acc + t.total, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 p-0.5">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" alt="Profile" className="w-full h-full rounded-full object-cover border-2 border-slate-900" />
           </div>
           <div>
              <div className="text-xs text-gray-400">Selamat Pagi,</div>
              <div className="font-bold text-sm">Andi Saputra</div>
           </div>
        </div>
        <button className="p-2 rounded-full bg-white/5 relative">
           <Bell size={20} />
           <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-slate-900"></div>
        </button>
      </div>

      <div className="p-6 space-y-6">
         
         {/* Attendance Card */}
         <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-white/5 shadow-xl relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                     <MapPin size={12} className="text-red-400" /> {selectedOutlet.location || selectedOutlet.name}
                  </div>
                  <div className="text-2xl font-bold font-mono">{new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</div>
                  <div className="text-xs text-gray-500">{new Date().toDateString()}</div>
               </div>
               <div className={`px-3 py-1 rounded-full text-xs font-bold border ${isClockedIn ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-gray-700/50 text-gray-400 border-gray-600'}`}>
                  {isClockedIn ? 'Clocked In' : 'Not Present'}
               </div>
            </div>

            {!isClockedIn ? (
               <button 
                 onClick={() => setIsClockedIn(true)}
                 className="w-full py-3 bg-sibos-orange active:bg-orange-600 rounded-xl font-bold text-white shadow-lg shadow-orange-900/40 flex items-center justify-center gap-2 transition-transform active:scale-95"
               >
                  <Camera size={18} />
                  Absen Masuk (Selfie)
               </button>
            ) : (
               <button 
                 onClick={() => setIsClockedIn(false)}
                 className="w-full py-3 bg-slate-700 active:bg-slate-600 rounded-xl font-bold text-white border border-white/10 flex items-center justify-center gap-2 transition-transform active:scale-95"
               >
                  <LogOut size={18} />
                  Absen Pulang
               </button>
            )}
         </div>

         {/* Quick Actions Grid */}
         <div>
            <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Aplikasi Utama</h3>
            <div className="grid grid-cols-2 gap-4">
               <button 
                 onClick={() => onNavigate('pos-app')}
                 className="bg-slate-800 p-4 rounded-2xl border border-white/5 flex flex-col items-center gap-3 active:scale-95 transition-transform hover:bg-slate-700"
               >
                  <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-500">
                     <ShoppingCart size={24} />
                  </div>
                  <span className="font-bold text-sm">Buka Kasir</span>
               </button>

               <button 
                 onClick={() => onNavigate('irm-app')}
                 className="bg-slate-800 p-4 rounded-2xl border border-white/5 flex flex-col items-center gap-3 active:scale-95 transition-transform hover:bg-slate-700"
               >
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-500">
                     <Package size={24} />
                  </div>
                  <span className="font-bold text-sm">Cek Stok</span>
               </button>
            </div>
         </div>

         {/* Shift Performance */}
         <div>
             <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Shift Anda (Hari Ini)</h3>
             <div className="bg-slate-900 rounded-2xl border border-white/5 p-4 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500/10 rounded-lg text-green-400"><DollarSign size={18} /></div>
                      <div>
                         <div className="text-xs text-gray-500">Omzet Pribadi</div>
                         <div className="font-bold">Rp {myRevenue.toLocaleString()}</div>
                      </div>
                   </div>
                   <ChevronRight size={16} className="text-gray-600" />
                </div>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><ShoppingCart size={18} /></div>
                      <div>
                         <div className="text-xs text-gray-500">Transaksi</div>
                         <div className="font-bold">{myTransactions.length} Struk</div>
                      </div>
                   </div>
                   <ChevronRight size={16} className="text-gray-600" />
                </div>
             </div>
         </div>

      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-slate-900 border-t border-white/10 px-6 py-3 flex justify-between items-center z-40 pb-6">
         <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-sibos-orange' : 'text-gray-500'}`}
         >
            <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Beranda</span>
         </button>
         <button 
            onClick={() => setActiveTab('schedule')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'schedule' ? 'text-sibos-orange' : 'text-gray-500'}`}
         >
            <Calendar size={24} strokeWidth={activeTab === 'schedule' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Jadwal</span>
         </button>
         <button 
            onClick={() => setActiveTab('history')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'history' ? 'text-sibos-orange' : 'text-gray-500'}`}
         >
            <Clock size={24} strokeWidth={activeTab === 'history' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Riwayat</span>
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
