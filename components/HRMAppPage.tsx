
import React, { useState } from 'react';
import { 
  Users, Clock, CalendarCheck, 
  Briefcase, UserPlus, Search, 
  Filter, MoreHorizontal, CheckCircle, LayoutDashboard, Key, ShieldCheck, Lock
} from 'lucide-react';
import { Page } from '../types';
import { GlassCard } from './ui/GlassCard';
import { BackofficeLayout } from './BackofficeLayout';

interface HRMAppPageProps {
  onNavigate: (page: Page) => void;
}

const mockEmployees = [
  { id: 1, name: 'Andi Saputra', role: 'Store Manager', dept: 'Operasional', status: 'Hadir', checkIn: '07:45', salary: 'Rp 6.500.000', userAccess: 'Admin' },
  { id: 2, name: 'Siti Nurhaliza', role: 'Kasir Utama', dept: 'Frontliner', status: 'Hadir', checkIn: '07:55', salary: 'Rp 4.200.000', userAccess: 'Cashier' },
  { id: 3, name: 'Budi Santoso', role: 'Staf Gudang', dept: 'Logistik', status: 'Izin', checkIn: '-', salary: 'Rp 3.800.000', userAccess: 'Staff' },
  { id: 4, name: 'Rina Wati', role: 'Barista', dept: 'Kitchen', status: 'Hadir', checkIn: '08:05', salary: 'Rp 3.500.000', userAccess: 'None' },
  { id: 5, name: 'Doni Pratama', role: 'Cleaning Service', dept: 'Umum', status: 'Sakit', checkIn: '-', salary: 'Rp 2.800.000', userAccess: 'None' },
];

const mockUsers = [
    { id: 1, username: 'andi.admin', emp: 'Andi Saputra', role: 'Admin', outlet: 'Semua', status: 'Active' },
    { id: 2, username: 'siti.kasir', emp: 'Siti Nurhaliza', role: 'Cashier', outlet: 'Kopi Senja', status: 'Active' },
    { id: 3, username: 'budi.gudang', emp: 'Budi Santoso', role: 'Staff', outlet: 'Senja Mart', status: 'Locked' },
];

export const HRMAppPage: React.FC<HRMAppPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'employees' | 'access'>('dashboard');

  return (
    <BackofficeLayout
        title="HRM & Payroll"
        icon={<Users className="text-emerald-500" size={20} />}
        onNavigate={onNavigate}
        actions={
            <>
                {/* Tabs Switcher in Header */}
                <div className="flex bg-slate-800 p-1 rounded-lg border border-white/10 mr-4">
                    <button 
                        onClick={() => setActiveTab('dashboard')}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-2 ${activeTab === 'dashboard' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        <LayoutDashboard size={14} /> Dash
                    </button>
                    <button 
                        onClick={() => setActiveTab('employees')}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-2 ${activeTab === 'employees' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        <Users size={14} /> Karyawan
                    </button>
                    <button 
                        onClick={() => setActiveTab('access')}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-2 ${activeTab === 'access' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        <Key size={14} /> Akses
                    </button>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm font-bold shadow-lg shadow-emerald-900/40">
                    <UserPlus size={16} /> Tambah
                </button>
            </>
        }
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl pb-24">
        
        {/* === DASHBOARD VIEW === */}
        {activeTab === 'dashboard' && (
            <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <GlassCard className="!p-4 bg-slate-900/50">
                        <div className="flex justify-between items-start mb-2">
                            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><Users size={20} /></div>
                        </div>
                        <div className="text-2xl font-bold text-white">24</div>
                        <div className="text-xs text-gray-400">Total Karyawan</div>
                    </GlassCard>
                    
                    <GlassCard className="!p-4 bg-slate-900/50">
                        <div className="flex justify-between items-start mb-2">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Clock size={20} /></div>
                        </div>
                        <div className="text-2xl font-bold text-white">21</div>
                        <div className="text-xs text-gray-400">Hadir Hari Ini</div>
                    </GlassCard>

                    <GlassCard className="!p-4 bg-slate-900/50">
                        <div className="flex justify-between items-start mb-2">
                            <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-400"><CalendarCheck size={20} /></div>
                        </div>
                        <div className="text-2xl font-bold text-white">3</div>
                        <div className="text-xs text-gray-400">Cuti / Izin / Sakit</div>
                    </GlassCard>

                    <GlassCard className="!p-4 bg-slate-900/50">
                        <div className="flex justify-between items-start mb-2">
                            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><Briefcase size={20} /></div>
                        </div>
                        <div className="text-2xl font-bold text-white">25 Okt</div>
                        <div className="text-xs text-gray-400">Jadwal Gajian (H-5)</div>
                    </GlassCard>
                </div>
            </>
        )}

        {/* === EMPLOYEE DATA VIEW === */}
        {activeTab === 'employees' && (
            <>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input type="text" placeholder="Cari Karyawan..." className="w-full bg-slate-900 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:border-emerald-500 outline-none" />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <button className="flex-1 md:flex-none px-4 py-2 bg-slate-900 border border-white/10 rounded-lg text-gray-400 hover:text-white flex items-center justify-center gap-2 text-sm">
                            <Filter size={16} /> Filter Departemen
                        </button>
                    </div>
                </div>

                <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-xl">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-950 text-gray-400 uppercase font-bold text-xs">
                            <tr>
                                <th className="px-6 py-4">Nama & Posisi</th>
                                <th className="px-6 py-4">Departemen</th>
                                <th className="px-6 py-4">Status Absensi</th>
                                <th className="px-6 py-4">Jam Masuk</th>
                                <th className="px-6 py-4 text-right">Gaji Pokok</th>
                                <th className="px-6 py-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {mockEmployees.map((emp) => (
                                <tr key={emp.id} className="hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-white">{emp.name}</div>
                                        <div className="text-xs text-emerald-400">{emp.role}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-300">{emp.dept}</td>
                                    <td className="px-6 py-4">
                                        {emp.status === 'Hadir' && <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-bold border border-green-500/20"><CheckCircle size={10} /> Hadir</span>}
                                        {emp.status === 'Izin' && <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-bold border border-yellow-500/20">Izin</span>}
                                        {emp.status === 'Sakit' && <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-bold border border-red-500/20">Sakit</span>}
                                    </td>
                                    <td className="px-6 py-4 text-white font-mono">{emp.checkIn}</td>
                                    <td className="px-6 py-4 text-right text-gray-400">{emp.salary}</td>
                                    <td className="px-6 py-4 text-center">
                                        <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        )}

        {/* === USER ACCESS VIEW === */}
        {activeTab === 'access' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 border border-white/10 rounded-2xl flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-bold text-white mb-1">Manajemen Akses Sistem</h2>
                        <p className="text-sm text-gray-400">Buat akun login untuk karyawan agar bisa mengakses POS atau Backoffice.</p>
                    </div>
                    <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-sm shadow-lg flex items-center gap-2">
                        <Key size={16} /> Buat User Login
                    </button>
                </div>

                <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-xl">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-950 text-gray-400 uppercase font-bold text-xs">
                            <tr>
                                <th className="px-6 py-4">Username</th>
                                <th className="px-6 py-4">Nama Karyawan</th>
                                <th className="px-6 py-4">Role / Jabatan</th>
                                <th className="px-6 py-4">Akses Outlet</th>
                                <th className="px-6 py-4 text-center">Status Akun</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {mockUsers.map((u) => (
                                <tr key={u.id} className="hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-blue-300 font-bold">@{u.username}</td>
                                    <td className="px-6 py-4 text-white">{u.emp}</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-xs text-gray-300">{u.role}</span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">{u.outlet}</td>
                                    <td className="px-6 py-4 text-center">
                                        {u.status === 'Active' ? (
                                            <span className="text-green-400 text-xs font-bold flex items-center justify-center gap-1"><ShieldCheck size={12} /> Aktif</span>
                                        ) : (
                                            <span className="text-red-400 text-xs font-bold flex items-center justify-center gap-1"><Lock size={12} /> Terkunci</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-xs font-bold text-blue-400 hover:text-white mr-3">Reset Password</button>
                                        <button className="text-xs text-gray-500 hover:text-white">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

      </div>
    </BackofficeLayout>
  );
};
