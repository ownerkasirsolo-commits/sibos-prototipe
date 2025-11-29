
import React, { useState } from 'react';
import { 
  Calendar, Clock, User, CheckCircle, 
  XCircle, Filter, Plus, MoreHorizontal, MapPin,
  Settings, LayoutGrid, List, FileBarChart
} from 'lucide-react';
import { Page } from '../types';
import { GlassCard } from './ui/GlassCard';
import { BackofficeLayout } from './BackofficeLayout';

interface BookingAppPageProps {
  onNavigate: (page: Page) => void;
}

const mockBookings = [
  { id: 'BK-001', customer: 'Siti Aminah', service: 'Potong Rambut & Styling', resource: 'Kapster Rina', time: '10:00 - 11:00', status: 'Confirmed', type: 'Jasa' },
  { id: 'BK-002', customer: 'Budi Santoso', service: 'Servis Ringan Mobil', resource: 'Bay 1 (Mekanik Dodi)', time: '11:30 - 12:30', status: 'In-Progress', type: 'Bengkel' },
  { id: 'BK-003', customer: 'PT Maju Jaya', service: 'Meeting Room A', resource: 'Ruang VIP', time: '13:00 - 15:00', status: 'Pending', type: 'Ruangan' },
  { id: 'BK-004', customer: 'Dewi Sartika', service: 'Check-in Kamar 101', resource: 'Deluxe Room', time: '14:00 (2 Malam)', status: 'Confirmed', type: 'Hotel' },
];

export const BookingAppPage: React.FC<BookingAppPageProps> = ({ onNavigate }) => {
  const [view, setView] = useState<'calendar' | 'list'>('list');

  return (
    <BackofficeLayout
        title="Booking & Reservasi"
        icon={<Calendar className="text-teal-500" size={20} />}
        onNavigate={onNavigate}
        actions={
            <>
                <button className="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-white/10 hover:bg-slate-700 rounded-lg text-sm text-gray-300 transition-colors">
                    <FileBarChart size={16} /> <span className="hidden sm:inline">Laporan</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-white/10 hover:bg-slate-700 rounded-lg text-sm text-gray-300 transition-colors">
                    <Settings size={16} /> <span className="hidden sm:inline">Config</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-bold shadow-lg shadow-teal-900/40">
                    <Plus size={16} /> Buat Booking
                </button>
            </>
        }
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl pb-24">
        
        {/* Resource Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
           <GlassCard className="!p-4 bg-slate-900/50">
             <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-teal-500/10 rounded-lg text-teal-400"><Calendar size={20} /></div>
             </div>
             <div className="text-2xl font-bold text-white">12</div>
             <div className="text-xs text-gray-400">Booking Hari Ini</div>
           </GlassCard>
           
           <GlassCard className="!p-4 bg-slate-900/50">
             <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Clock size={20} /></div>
             </div>
             <div className="text-2xl font-bold text-white">4</div>
             <div className="text-xs text-gray-400">Sedang Berlangsung</div>
           </GlassCard>

           <GlassCard className="!p-4 bg-slate-900/50">
             <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-green-500/10 rounded-lg text-green-400"><CheckCircle size={20} /></div>
             </div>
             <div className="text-2xl font-bold text-white">8</div>
             <div className="text-xs text-gray-400">Selesai / Checked Out</div>
           </GlassCard>

           <GlassCard className="!p-4 bg-slate-900/50">
             <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-red-500/10 rounded-lg text-red-400"><XCircle size={20} /></div>
             </div>
             <div className="text-2xl font-bold text-white">1</div>
             <div className="text-xs text-gray-400">No Show / Cancel</div>
           </GlassCard>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex gap-2 bg-slate-900 p-1 rounded-lg border border-white/5">
                <button 
                    onClick={() => setView('list')}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${view === 'list' ? 'bg-teal-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    <List size={16} /> List
                </button>
                <button 
                    onClick={() => setView('calendar')}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${view === 'calendar' ? 'bg-teal-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    <LayoutGrid size={16} /> Calendar
                </button>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-gray-400 hover:text-white flex items-center justify-center gap-2 text-sm">
                    <Filter size={16} /> Filter Resource
                </button>
                <button className="flex-1 md:flex-none px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-gray-400 hover:text-white flex items-center justify-center gap-2 text-sm">
                    <MapPin size={16} /> Pilih Cabang
                </button>
            </div>
        </div>

        {/* Main Content Area */}
        {view === 'list' ? (
             <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-950 text-gray-400 uppercase font-bold text-xs">
                            <tr>
                                <th className="px-6 py-4">ID & Waktu</th>
                                <th className="px-6 py-4">Pelanggan</th>
                                <th className="px-6 py-4">Layanan / Item</th>
                                <th className="px-6 py-4">Resource (Staf/Ruang)</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {mockBookings.map((book) => (
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
                        </tbody>
                    </table>
                </div>
            </div>
        ) : (
            <div className="bg-slate-900 border border-white/10 rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px]">
                <Calendar size={64} className="text-slate-700 mb-4" />
                <h3 className="text-xl font-bold text-gray-400">Tampilan Kalender</h3>
                <p className="text-gray-500">Fitur drag-and-drop kalender tersedia di versi Desktop Full.</p>
            </div>
        )}

      </div>
    </BackofficeLayout>
  );
};
