
import React, { useState } from 'react';
import { 
  Users, Clock, CalendarCheck, 
  Briefcase, UserPlus, Search, 
  Key, CheckCircle, LayoutDashboard, ChevronDown, Banknote, Plus, X,
  User, Shield
} from 'lucide-react';
import { Page, HardwareModule, AppModule } from '../types';
import { GlassCard } from './ui/GlassCard';
import { BackofficeLayout } from './BackofficeLayout';
import { useSibos } from '../contexts/SibosContext';

interface HRMAppPageProps {
  onNavigate: (page: Page) => void;
  activeHardware?: HardwareModule[];
  activeModules?: AppModule[];
}

const mockEmployees = [
  { id: 1, name: 'Andi Saputra', role: 'Store Manager', dept: 'Operasional', status: 'Hadir', checkIn: '07:45', salary: 'Rp 6.500.000', userAccess: 'Admin' },
  { id: 2, name: 'Siti Nurhaliza', role: 'Kasir Utama', dept: 'Frontliner', status: 'Hadir', checkIn: '07:55', salary: 'Rp 4.200.000', userAccess: 'Cashier' },
  { id: 3, name: 'Budi Santoso', role: 'Staf Gudang', dept: 'Logistik', status: 'Izin', checkIn: '-', salary: 'Rp 3.800.000', userAccess: 'Staff' },
];

export const HRMAppPage: React.FC<HRMAppPageProps> = ({ onNavigate, activeHardware, activeModules }) => {
  const { searchQuery } = useSibos(); // Global Search
  const [activeTab, setActiveTab] = useState<'dashboard' | 'employees' | 'access'>('dashboard');
  const [expandedEmpId, setExpandedEmpId] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredEmployees = mockEmployees.filter(e => {
      const matchSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) || e.role.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSearch;
  });

  const toggleEmp = (id: number) => {
      setExpandedEmpId(expandedEmpId === id ? null : id);
  };

  return (
    <BackofficeLayout
        title="HRM"
        icon={<Users className="text-emerald-500" size={20} />}
        onNavigate={onNavigate}
        activeHardware={activeHardware}
        activeModules={activeModules}
        currentPage="hrm-app"
    >
      <div className="container mx-auto px-4 py-6 max-w-7xl pb-24">
        
        {/* Top Controls */}
        <div className="flex justify-between items-center mb-6 gap-4 border-b border-white/10 pb-4">
             <div className="flex bg-slate-900/50 p-1 rounded-lg border border-white/10 overflow-hidden">
                <button 
                    onClick={() => setActiveTab('dashboard')}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'dashboard' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                    <LayoutDashboard size={16} className={activeTab === 'dashboard' ? 'text-emerald-400' : ''} /> 
                    <span className="hidden sm:inline">Dash</span>
                </button>
                <button 
                    onClick={() => setActiveTab('employees')}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'employees' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                    <Users size={16} className={activeTab === 'employees' ? 'text-emerald-400' : ''} /> 
                    <span className="hidden sm:inline">Karyawan</span>
                </button>
                <button 
                    onClick={() => setActiveTab('access')}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'access' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                    <Key size={16} className={activeTab === 'access' ? 'text-emerald-400' : ''} /> 
                    <span className="hidden sm:inline">Akses</span>
                </button>
            </div>

            <div className="flex gap-2">
                <button 
                    onClick={() => setShowAddModal(true)}
                    title="Tambah Karyawan Baru"
                    className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-sibos-orange to-red-600 hover:from-orange-500 hover:to-red-500 rounded-lg shadow-lg shadow-orange-900/40 text-white transition-all active:scale-95"
                >
                    <Plus size={24} strokeWidth={3} />
                </button>
            </div>
        </div>

        {/* Content */}
        {activeTab === 'dashboard' && (
            <div className="animate-in fade-in slide-in-from-left-4">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-white">Ringkasan HR</h2>
                    <p className="text-sm text-gray-400">Status kehadiran dan performa tim hari ini.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <GlassCard className="!p-6 bg-slate-900/50">
                        <div className="flex justify-between items-start mb-2">
                            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><Clock size={20} /></div>
                        </div>
                        <div className="text-2xl font-bold text-white">21 / 24</div>
                        <div className="text-xs text-gray-400">Hadir Hari Ini</div>
                    </GlassCard>
                    <GlassCard className="!p-6 bg-slate-900/50">
                        <div className="flex justify-between items-start mb-2">
                            <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-400"><CalendarCheck size={20} /></div>
                        </div>
                        <div className="text-2xl font-bold text-white">3</div>
                        <div className="text-xs text-gray-400">Izin / Cuti</div>
                    </GlassCard>
                </div>
            </div>
        )}

        {activeTab === 'employees' && (
            <div className="space-y-3 animate-in slide-in-from-bottom-2">
                {filteredEmployees.map((emp) => (
                    <div key={emp.id} className="bg-slate-900 border border-white/5 rounded-xl overflow-hidden hover:border-emerald-500/30 transition-colors">
                        <div onClick={() => toggleEmp(emp.id)} className="p-4 flex items-center justify-between cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-gray-400">{emp.name.charAt(0)}</div>
                                <div>
                                    <h4 className="font-bold text-white text-sm">{emp.name}</h4>
                                    <div className="text-xs text-emerald-400">{emp.role}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-bold border border-green-500/20"><CheckCircle size={10} /> {emp.status}</span>
                                <ChevronDown size={18} className="text-gray-500" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {activeTab === 'access' && (
            <div className="space-y-3 animate-in slide-in-from-right-4">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-white">Hak Akses Sistem</h2>
                    <p className="text-sm text-gray-400">Kelola siapa yang bisa login dan fitur apa yang terbuka.</p>
                </div>
                {filteredEmployees.map((emp) => (
                    <div key={emp.id} className="bg-slate-900 border border-white/5 rounded-xl p-4 flex justify-between items-center hover:border-blue-500/30 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400"><Shield size={20} /></div>
                            <div>
                                <h4 className="font-bold text-white text-sm">{emp.name}</h4>
                                <div className="text-xs text-gray-500 flex items-center gap-1">Role: <span className="text-blue-400 font-bold">{emp.userAccess}</span></div>
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-xs font-bold text-gray-300 hover:text-white hover:bg-slate-700">
                            Edit Role
                        </button>
                    </div>
                ))}
            </div>
        )}

        {/* ADD EMPLOYEE MODAL */}
        {showAddModal && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
                <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">Tambah Karyawan</h2>
                        <button onClick={() => setShowAddModal(false)}><X size={20} className="text-gray-500 hover:text-white"/></button>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Nama Lengkap</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 text-gray-500" size={16}/>
                                <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-lg py-2.5 pl-10 pr-3 text-white focus:border-emerald-500 outline-none" />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Jabatan</label>
                            <select className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-emerald-500 outline-none">
                                <option>Staff</option>
                                <option>Kasir</option>
                                <option>Supervisor</option>
                                <option>Manager</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Gaji Pokok</label>
                            <div className="relative">
                                <Banknote className="absolute left-3 top-3 text-gray-500" size={16}/>
                                <input type="number" className="w-full bg-slate-950 border border-white/10 rounded-lg py-2.5 pl-10 pr-3 text-white focus:border-emerald-500 outline-none" placeholder="Rp 0" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 flex gap-3">
                        <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 bg-slate-800 rounded-xl font-bold text-gray-300">Batal</button>
                        <button className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold text-white shadow-lg">Simpan</button>
                    </div>
                </div>
            </div>
        )}

      </div>
    </BackofficeLayout>
  );
};
