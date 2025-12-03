
import React, { useState } from 'react';
import { 
  ClipboardList, Users, CheckSquare, FileText, 
  Briefcase, Bell, Settings, User, CreditCard,
  AlertCircle, MapPin, Camera, LogOut
} from 'lucide-react';
import { Page, UserRole } from '../types';
import { useSibos } from '../contexts/SibosContext';

interface MobileAdminPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  userRole: UserRole;
}

export const MobileAdminPage: React.FC<MobileAdminPageProps> = ({ onNavigate, onLogout, userRole }) => {
  const { selectedOutlet } = useSibos();
  const [activeTab, setActiveTab] = useState('tasks');
  const [isClockedIn, setIsClockedIn] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <div>
           <div className="text-xs text-orange-400 font-bold uppercase tracking-wider">Admin Panel</div>
           <div className="font-bold text-lg text-white">Operasional</div>
        </div>
        <div className="flex gap-3">
           <button className="p-2 rounded-full bg-white/5 relative">
              <Bell size={20} />
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-slate-900"></div>
           </button>
           <button onClick={onLogout} className="p-2 rounded-full bg-white/5 text-gray-400">
              <User size={20} />
           </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
         
         {/* Attendance Card */}
         <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-white/5 shadow-xl relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                     <MapPin size={12} className="text-orange-400" /> {selectedOutlet.location || selectedOutlet.name}
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
                 className="w-full py-3 bg-sibos-orange hover:bg-orange-500 rounded-xl font-bold text-white shadow-lg shadow-orange-900/40 flex items-center justify-center gap-2 transition-transform active:scale-95"
               >
                  <Camera size={18} />
                  Absen Masuk
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

         {/* Pending Actions Summary */}
         <div className="bg-slate-900 rounded-2xl p-5 border border-white/5 flex gap-4">
             <div className="flex-1 text-center border-r border-white/5">
                <div className="text-2xl font-bold text-white">5</div>
                <div className="text-[10px] text-gray-500 uppercase mt-1">Pending PO</div>
             </div>
             <div className="flex-1 text-center border-r border-white/5">
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-[10px] text-gray-500 uppercase mt-1">Cuti Staff</div>
             </div>
             <div className="flex-1 text-center">
                <div className="text-2xl font-bold text-white">2</div>
                <div className="text-[10px] text-gray-500 uppercase mt-1">Dispute</div>
             </div>
         </div>

         {/* Task List */}
         <div>
            <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Tugas Prioritas</h3>
            <div className="space-y-3">
               
               {/* Task Item */}
               <div className="bg-slate-900 p-4 rounded-xl border border-white/5 flex items-start gap-4">
                  <div className="mt-1 p-2 bg-blue-500/10 rounded-lg text-blue-400">
                     <FileText size={18} />
                  </div>
                  <div className="flex-1">
                     <div className="flex justify-between items-center mb-1">
                        <div className="font-bold text-sm">Approve Purchase Order</div>
                        <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded">Urgent</span>
                     </div>
                     <p className="text-xs text-gray-400 mb-3">PO #4402 - Supplier Kopi Utama (Rp 5.2jt)</p>
                     <button className="w-full py-2 bg-blue-600 rounded-lg text-xs font-bold text-white">Review & Approve</button>
                  </div>
               </div>

               {/* Task Item */}
               <div className="bg-slate-900 p-4 rounded-xl border border-white/5 flex items-start gap-4">
                  <div className="mt-1 p-2 bg-purple-500/10 rounded-lg text-purple-400">
                     <Briefcase size={18} />
                  </div>
                  <div className="flex-1">
                     <div className="flex justify-between items-center mb-1">
                        <div className="font-bold text-sm">Rekap Gaji Oktober</div>
                        <span className="text-[10px] text-gray-500">Due: 2 Days</span>
                     </div>
                     <p className="text-xs text-gray-400 mb-3">24 Karyawan belum divalidasi.</p>
                     <button className="w-full py-2 bg-slate-800 border border-white/10 hover:bg-slate-700 rounded-lg text-xs font-bold text-gray-300">Proses Payroll</button>
                  </div>
               </div>

               {/* Task Item */}
               <div className="bg-slate-900 p-4 rounded-xl border border-white/5 flex items-start gap-4 opacity-70">
                  <div className="mt-1 p-2 bg-green-500/10 rounded-lg text-green-400">
                     <CreditCard size={18} />
                  </div>
                  <div className="flex-1">
                     <div className="flex justify-between items-center mb-1">
                        <div className="font-bold text-sm">Bayar Tagihan Internet</div>
                        <span className="text-[10px] text-green-400">Paid</span>
                     </div>
                     <p className="text-xs text-gray-400">IndiHome - Rp 550.000</p>
                  </div>
               </div>

            </div>
         </div>

         {/* System Status */}
         <div className="p-4 bg-slate-900 border border-white/5 rounded-xl">
             <div className="flex items-center gap-2 mb-3">
                 <Settings size={16} className="text-gray-400" />
                 <span className="text-sm font-bold text-white">System Health</span>
             </div>
             <div className="space-y-3">
                 <div>
                     <div className="flex justify-between text-xs text-gray-400 mb-1">
                         <span>API Connection</span>
                         <span className="text-green-400">Stable (99ms)</span>
                     </div>
                     <div className="w-full h-1.5 bg-slate-700 rounded-full"><div className="w-full h-1.5 bg-green-500 rounded-full"></div></div>
                 </div>
                 <div>
                     <div className="flex justify-between text-xs text-gray-400 mb-1">
                         <span>Database Sync</span>
                         <span className="text-blue-400">Syncing...</span>
                     </div>
                     <div className="w-full h-1.5 bg-slate-700 rounded-full"><div className="w-[80%] h-1.5 bg-blue-500 rounded-full animate-pulse"></div></div>
                 </div>
             </div>
         </div>

      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-slate-900 border-t border-white/10 px-6 py-3 flex justify-between items-center z-40 pb-6">
         <button 
            onClick={() => setActiveTab('tasks')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'tasks' ? 'text-sibos-orange' : 'text-gray-500'}`}
         >
            <CheckSquare size={24} strokeWidth={activeTab === 'tasks' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">To-Do</span>
         </button>
         <button 
            onClick={() => setActiveTab('hr')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'hr' ? 'text-sibos-orange' : 'text-gray-500'}`}
         >
            <Users size={24} strokeWidth={activeTab === 'hr' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">HR</span>
         </button>
         <button 
            onClick={() => setActiveTab('finance')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'finance' ? 'text-sibos-orange' : 'text-gray-500'}`}
         >
            <CreditCard size={24} strokeWidth={activeTab === 'finance' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Finance</span>
         </button>
         <button 
            onClick={() => setActiveTab('reports')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'reports' ? 'text-sibos-orange' : 'text-gray-500'}`}
         >
            <ClipboardList size={24} strokeWidth={activeTab === 'reports' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Log</span>
         </button>
      </div>

    </div>
  );
};
