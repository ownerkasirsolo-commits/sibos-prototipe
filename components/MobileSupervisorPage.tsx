
import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, CheckSquare, BarChart2, 
  TrendingUp, AlertTriangle, ArrowRight, MoreHorizontal,
  ThumbsUp, X, Bell, MapPin, Camera, LogOut
} from 'lucide-react';
import { Page, UserRole } from '../types';
import { useSibos } from '../contexts/SibosContext';

interface MobileSupervisorPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  userRole: UserRole;
}

export const MobileSupervisorPage: React.FC<MobileSupervisorPageProps> = ({ onNavigate, onLogout, userRole }) => {
  const { selectedOutlet } = useSibos();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isClockedIn, setIsClockedIn] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <div>
           <div className="text-xs text-gray-400">Supervisor Area</div>
           <div className="font-bold text-lg text-white">Dashboard Kontrol</div>
        </div>
        <div className="flex gap-3">
           <button className="p-2 rounded-full bg-white/5 relative">
              <Bell size={20} />
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-slate-900 animate-pulse"></div>
           </button>
           <button onClick={onLogout} className="p-2 rounded-full bg-white/5">
              <div className="w-5 h-5 rounded-full bg-gray-400"></div>
           </button>
        </div>
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

         {/* Live Sales Card */}
         <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-2xl p-5 border border-blue-500/20 shadow-xl">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <div className="text-xs text-blue-300 font-bold uppercase tracking-wider mb-1">Total Omzet Hari Ini</div>
                  <div className="text-3xl font-bold text-white">Rp 14.5jt</div>
               </div>
               <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                  <TrendingUp size={20} />
               </div>
            </div>
            
            {/* Mini Chart Visualization */}
            <div className="flex items-end gap-1 h-16 w-full opacity-80">
               {[40, 60, 30, 70, 50, 80, 60, 90, 40, 60].map((h, i) => (
                  <div key={i} className="flex-1 bg-blue-500 rounded-t-sm" style={{height: `${h}%`}}></div>
               ))}
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 mt-2">
               <span>08:00</span>
               <span>14:00 (Live)</span>
            </div>
         </div>

         {/* Approval Queue */}
         <div>
            <div className="flex justify-between items-center mb-3">
               <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Butuh Persetujuan (3)</h3>
               <button className="text-xs text-sibos-orange font-bold">Lihat Semua</button>
            </div>
            
            <div className="space-y-3">
               {/* Item 1 */}
               <div className="bg-slate-900 p-4 rounded-xl border border-white/5 flex gap-4">
                  <div className="mt-1 p-2 bg-red-500/10 rounded-lg text-red-400 h-fit">
                     <AlertTriangle size={18} />
                  </div>
                  <div className="flex-1">
                     <div className="flex justify-between items-start">
                        <div className="font-bold text-sm">Void Transaksi #992</div>
                        <span className="text-[10px] text-gray-500">2m ago</span>
                     </div>
                     <p className="text-xs text-gray-400 mt-1 mb-3">Kasir: Andi • Alasan: Salah input menu</p>
                     <div className="flex gap-2">
                        <button className="flex-1 py-1.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg text-xs font-bold flex items-center justify-center gap-1">
                           <ThumbsUp size={12} /> Approve
                        </button>
                        <button className="flex-1 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-xs font-bold flex items-center justify-center gap-1">
                           <X size={12} /> Reject
                        </button>
                     </div>
                  </div>
               </div>
               
               {/* Item 2 */}
               <div className="bg-slate-900 p-4 rounded-xl border border-white/5 flex gap-4">
                  <div className="mt-1 p-2 bg-yellow-500/10 rounded-lg text-yellow-400 h-fit">
                     <AlertTriangle size={18} />
                  </div>
                  <div className="flex-1">
                     <div className="flex justify-between items-start">
                        <div className="font-bold text-sm">Diskon Manual 20%</div>
                        <span className="text-[10px] text-gray-500">15m ago</span>
                     </div>
                     <p className="text-xs text-gray-400 mt-1 mb-3">Kasir: Rina • Untuk: Teman Owner</p>
                     <div className="flex gap-2">
                        <button className="flex-1 py-1.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg text-xs font-bold flex items-center justify-center gap-1">
                           <ThumbsUp size={12} /> Approve
                        </button>
                        <button className="flex-1 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-xs font-bold flex items-center justify-center gap-1">
                           <X size={12} /> Reject
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Staff Monitoring */}
         <div>
             <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Status Karyawan</h3>
             <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800 p-3 rounded-xl border border-white/5 flex items-center gap-3">
                   <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold">AS</div>
                   <div>
                      <div className="text-xs font-bold">Andi S.</div>
                      <div className="text-[10px] text-green-400">Online • Kasir 1</div>
                   </div>
                </div>
                <div className="bg-slate-800 p-3 rounded-xl border border-white/5 flex items-center gap-3">
                   <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold">RN</div>
                   <div>
                      <div className="text-xs font-bold">Rina N.</div>
                      <div className="text-[10px] text-green-400">Online • Bar</div>
                   </div>
                </div>
                 <div className="bg-slate-800 p-3 rounded-xl border border-white/5 flex items-center gap-3 opacity-50">
                   <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-xs font-bold">BS</div>
                   <div>
                      <div className="text-xs font-bold">Budi S.</div>
                      <div className="text-[10px] text-gray-400">Off Shift</div>
                   </div>
                </div>
             </div>
         </div>

      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-slate-900 border-t border-white/10 px-6 py-3 flex justify-between items-center z-40 pb-6">
         <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-blue-500' : 'text-gray-500'}`}
         >
            <LayoutDashboard size={24} strokeWidth={activeTab === 'dashboard' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Dash</span>
         </button>
         <button 
            onClick={() => setActiveTab('team')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'team' ? 'text-blue-500' : 'text-gray-500'}`}
         >
            <Users size={24} strokeWidth={activeTab === 'team' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Tim</span>
         </button>
         <button 
            onClick={() => setActiveTab('report')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'report' ? 'text-blue-500' : 'text-gray-500'}`}
         >
            <BarChart2 size={24} strokeWidth={activeTab === 'report' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Laporan</span>
         </button>
         <button 
            onClick={() => setActiveTab('tasks')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'tasks' ? 'text-blue-500' : 'text-gray-500'}`}
         >
            <CheckSquare size={24} strokeWidth={activeTab === 'tasks' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Tugas</span>
         </button>
      </div>

    </div>
  );
};
