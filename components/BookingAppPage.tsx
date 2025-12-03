
import React, { useState } from 'react';
import { 
  Calendar, Clock, User, CheckCircle, 
  XCircle, Filter, Plus, MoreHorizontal, MapPin,
  Settings, LayoutGrid, List, FileBarChart, Check, X
} from 'lucide-react';
import { Page, HardwareModule, AppModule } from '../types';
import { GlassCard } from './ui/GlassCard';
import { BackofficeLayout } from './BackofficeLayout';
import { useSibos } from '../contexts/SibosContext';

interface BookingAppPageProps {
  onNavigate: (page: Page) => void;
  activeHardware?: HardwareModule[];
  activeModules?: AppModule[];
}

const mockBookings = [
  { id: 'BK-001', customer: 'Siti Aminah', service: 'Potong Rambut & Styling', resource: 'Kapster Rina', time: '10:00 - 11:00', status: 'Confirmed', type: 'Jasa' },
  { id: 'BK-002', customer: 'Budi Santoso', service: 'Servis Ringan Mobil', resource: 'Bay 1 (Mekanik Dodi)', time: '11:30 - 12:30', status: 'In-Progress', type: 'Bengkel' },
  { id: 'BK-003', customer: 'PT Maju Jaya', service: 'Meeting Room A', resource: 'Ruang VIP', time: '13:00 - 15:00', status: 'Pending', type: 'Ruangan' },
  { id: 'BK-004', customer: 'Dewi Sartika', service: 'Check-in Kamar 101', resource: 'Deluxe Room', time: '14:00 (2 Malam)', status: 'Confirmed', type: 'Hotel' },
];

export const BookingAppPage: React.FC<BookingAppPageProps> = ({ onNavigate, activeHardware, activeModules }) => {
  const { searchQuery } = useSibos();
  const [view, setView] = useState<'calendar' | 'list'>('list');
  const [showFilter, setShowFilter] = useState(false);
  const [activeStatus, setActiveStatus] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredBookings = mockBookings.filter(b => {
      const matchSearch = b.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = activeStatus === 'All' ? true : b.status === activeStatus;
      return matchSearch && matchStatus;
  });

  return (
    <BackofficeLayout
        title="Reservasi"
        icon={<Calendar className="text-teal-500" size={20} />}
        onNavigate={onNavigate}
        activeHardware={activeHardware}
        activeModules={activeModules}
        currentPage="booking-app"
    >
      <div className="container mx-auto px-4 py-6 max-w-7xl pb-24">
        
        {/* Top Controls: Tabs & Actions */}
        <div className="flex justify-between items-center mb-6 gap-4 border-b border-white/10 pb-4">
             {/* Tab Switcher */}
             <div className="flex bg-slate-900/50 p-1 rounded-lg border border-white/10 overflow-hidden">
                <button 
                    onClick={() => setView('list')}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${view === 'list' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                    <List size={16} className={view === 'list' ? 'text-teal-400' : ''} /> 
                    <span className="hidden sm:inline">List</span>
                </button>
                <button 
                    onClick={() => setView('calendar')}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${view === 'calendar' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                    <LayoutGrid size={16} className={view === 'calendar' ? 'text-teal-400' : ''} /> 
                    <span className="hidden sm:inline">Kalender</span>
                </button>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                <div className="relative">
                    <button 
                        onClick={() => setShowFilter(!showFilter)}
                        title={`Filter Status: ${activeStatus}`}
                        className={`w-10 h-10 border rounded-lg flex items-center justify-center transition-colors ${activeStatus !== 'All' ? 'bg-slate-800 border-teal-500 text-teal-400' : 'bg-slate-900 border-white/10 text-gray-400 hover:text-white'}`}
                    >
                        <Filter size={20} /> 
                    </button>

                    {showFilter && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setShowFilter(false)}></div>
                            <div className="absolute top-full right-0 mt-2 w-48 bg-slate-900 border border-white/10 rounded-xl shadow-2xl z-20 overflow-hidden animate-in fade-in zoom-in-95">
                                <div className="px-4 py-3 border-b border-white/5 text-xs font-bold text-gray-500 uppercase">Filter Status</div>
                                {['All', 'Pending', 'Confirmed', 'In-Progress'].map(status => (
                                    <button
                                        key={status}
                                        onClick={() => {
                                            setActiveStatus(status);
                                            setShowFilter(false);
                                        }}
                                        className="w-full text-left px-4 py-3 text-sm hover:bg-white/5 flex items-center justify-between text-gray-300 hover:text-white"
                                    >
                                        {status === 'All' ? 'Semua Status' : status}
                                        {activeStatus === status && <Check size={14} className="text-teal-400" />}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <button 
                    onClick={() => setShowAddModal(true)}
                    title="Buat Booking Baru"
                    className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-sibos-orange to-red-600 hover:from-orange-500 hover:to-red-500 rounded-lg shadow-lg shadow-orange-900/40 text-white transition-all active:scale-95"
                >
                    <Plus size={24} strokeWidth={3} />
                </button>
            </div>
        </div>

        {/* Narrative & Stats */}
        {view === 'list' && (
            <div className="animate-in fade-in slide-in-from-left-4">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-white">Jadwal & Antrian</h2>
                    <p className="text-sm text-gray-400">Pantau slot waktu dan ketersediaan resource.</p>
                </div>

                {/* Resource Status */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <GlassCard className="!p-4 bg-slate-900/50 border-white/5">
                        <div className="flex justify-between items-start mb-2">
                            <div className="p-2 bg-teal-500/10 rounded-lg text-teal-400"><Calendar size={20} /></div>
                        </div>
                        <div className="text-2xl font-bold text-white">12</div>
                        <div className="text-xs text-gray-400">Booking Hari Ini</div>
                    </GlassCard>
                    <GlassCard className="!p-4 bg-slate-900/50 border-white/5">
                        <div className="flex justify-between items-start mb-2">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Clock size={20} /></div>
                        </div>
                        <div className="text-2xl font-bold text-white">4</div>
                        <div className="text-xs text-gray-400">Sedang Berlangsung</div>
                    </GlassCard>
                    <GlassCard className="!p-4 bg-slate-900/50 border-white/5">
                        <div className="flex justify-between items-start mb-2">
                            <div className="p-2 bg-green-500/10 rounded-lg text-green-400"><CheckCircle size={20} /></div>
                        </div>
                        <div className="text-2xl font-bold text-white">8</div>
                        <div className="text-xs text-gray-400">Selesai</div>
                    </GlassCard>
                    <GlassCard className="!p-4 bg-slate-900/50 border-white/5">
                        <div className="flex justify-between items-start mb-2">
                            <div className="p-2 bg-red-500/10 rounded-lg text-red-400"><XCircle size={20} /></div>
                        </div>
                        <div className="text-2xl font-bold text-white">1</div>
                        <div className="text-xs text-gray-400">Batal / No Show</div>
                    </GlassCard>
                </div>

                {/* Main Content Area */}
                <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-950 text-gray-400 uppercase font-bold text-xs">
                                <tr>
                                    <th className="px-6 py-4">Waktu</th>
                                    <th className="px-6 py-4">Pelanggan</th>
                                    <th className="px-6 py-4">Layanan</th>
                                    <th className="px-6 py-4">Resource</th>
                                    <th className="px-6 py-4 text-center">Status</th>
                                    <th className="px-6 py-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredBookings.map((book) => (
                                    <tr key={book.id} className="hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-white">{book.time}</div>
                                            <div className="text-xs text-teal-400">{book.id}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs"><User size={12}/></div>
                                                <span>{book.customer}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-gray-300">{book.service}</div>
                                            <div className="text-xs text-gray-500 bg-white/5 px-1.5 py-0.5 rounded w-fit mt-1">{book.type}</div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">{book.resource}</td>
                                        <td className="px-6 py-4 text-center">
                                            {book.status === 'Confirmed' && <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-bold border border-green-500/20">Confirmed</span>}
                                            {book.status === 'In-Progress' && <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold border border-blue-500/20 animate-pulse">On Going</span>}
                                            {book.status === 'Pending' && <span className="inline-flex items-center px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-bold border border-yellow-500/20">Pending</span>}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                                                <MoreHorizontal size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredBookings.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                            Tidak ada booking ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )}

        {view === 'calendar' && (
            <div className="bg-slate-900 border border-white/10 rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px] animate-in fade-in">
                <Calendar size={64} className="text-slate-700 mb-4" />
                <h3 className="text-xl font-bold text-gray-400">Tampilan Kalender</h3>
                <p className="text-gray-500">Fitur drag-and-drop kalender tersedia di versi Desktop Full.</p>
            </div>
        )}

        {/* ADD MODAL */}
        {showAddModal && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
                <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg p-6 shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">Buat Booking Baru</h2>
                        <button onClick={() => setShowAddModal(false)}><X size={20} className="text-gray-500 hover:text-white"/></button>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Nama Pelanggan</label>
                            <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-teal-500 outline-none" placeholder="Cari member..." />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Tanggal</label>
                                <input type="date" className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-teal-500 outline-none" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Jam</label>
                                <input type="time" className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-teal-500 outline-none" />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Layanan / Service</label>
                            <select className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-teal-500 outline-none">
                                <option>Pilih Layanan...</option>
                                <option>Potong Rambut</option>
                                <option>Servis AC</option>
                                <option>Sewa Ruang Meeting</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-8 flex gap-3">
                        <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 bg-slate-800 rounded-xl font-bold text-gray-300">Batal</button>
                        <button className="flex-1 py-3 bg-teal-600 hover:bg-teal-500 rounded-xl font-bold text-white shadow-lg">Simpan</button>
                    </div>
                </div>
            </div>
        )}

      </div>
    </BackofficeLayout>
  );
};
