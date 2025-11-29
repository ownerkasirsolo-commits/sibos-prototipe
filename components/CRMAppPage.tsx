
import React from 'react';
import { 
  Users, Trophy, Gift, Search, 
  MessageCircle, UserPlus, Filter,
  FileBarChart, Settings
} from 'lucide-react';
import { Page } from '../types';
import { GlassCard } from './ui/GlassCard';
import { BackofficeLayout } from './BackofficeLayout';

interface CRMAppPageProps {
  onNavigate: (page: Page) => void;
}

const mockCustomers = [
  { id: 1, name: 'Budi Santoso', tier: 'Gold', points: 1250, phone: '08123456789', lastVisit: 'Hari ini', totalSpend: 'Rp 5.400.000' },
  { id: 2, name: 'Siti Aminah', tier: 'Platinum', points: 5400, phone: '08129876543', lastVisit: '2 hari lalu', totalSpend: 'Rp 12.800.000' },
  { id: 3, name: 'Joko Anwar', tier: 'Silver', points: 450, phone: '08133344455', lastVisit: '1 minggu lalu', totalSpend: 'Rp 850.000' },
  { id: 4, name: 'Rina Nose', tier: 'Gold', points: 1100, phone: '08155566677', lastVisit: 'Kemarin', totalSpend: 'Rp 4.200.000' },
  { id: 5, name: 'Dedi Corbuzier', tier: 'Silver', points: 120, phone: '08199988877', lastVisit: '1 bulan lalu', totalSpend: 'Rp 300.000' },
];

export const CRMAppPage: React.FC<CRMAppPageProps> = ({ onNavigate }) => {
  return (
    <BackofficeLayout
        title="CRM & Membership"
        icon={<Users className="text-pink-500" size={20} />}
        onNavigate={onNavigate}
        actions={
            <>
                <button className="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-white/10 hover:bg-slate-700 rounded-lg text-sm text-gray-300 transition-colors">
                    <FileBarChart size={16} /> <span className="hidden sm:inline">Laporan</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-white/10 hover:bg-slate-700 rounded-lg text-sm text-gray-300 transition-colors">
                    <Settings size={16} /> <span className="hidden sm:inline">Pengaturan</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-500 rounded-lg text-sm font-bold shadow-lg shadow-pink-900/40">
                    <UserPlus size={16} /> Member Baru
                </button>
            </>
        }
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl pb-24">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
           <GlassCard className="!p-4 bg-slate-900/50">
             <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-pink-500/10 rounded-lg text-pink-400"><Users size={20} /></div>
             </div>
             <div className="text-2xl font-bold text-white">1,245</div>
             <div className="text-xs text-gray-400">Total Member Aktif</div>
           </GlassCard>
           <GlassCard className="!p-4 bg-slate-900/50">
             <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-400"><Trophy size={20} /></div>
             </div>
             <div className="text-2xl font-bold text-white">85</div>
             <div className="text-xs text-gray-400">Member Platinum</div>
           </GlassCard>
           <GlassCard className="!p-4 bg-slate-900/50">
             <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><Gift size={20} /></div>
             </div>
             <div className="text-2xl font-bold text-white">45.000</div>
             <div className="text-xs text-gray-400">Poin Beredar</div>
           </GlassCard>
           <GlassCard className="!p-4 bg-slate-900/50">
             <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-green-500/10 rounded-lg text-green-400"><MessageCircle size={20} /></div>
             </div>
             <div className="text-2xl font-bold text-white">98%</div>
             <div className="text-xs text-gray-400">Response Rate WA</div>
           </GlassCard>
        </div>

        {/* Tools & Search */}
        <div className="flex justify-between items-center mb-6">
           <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input type="text" placeholder="Cari Nama / No HP..." className="w-full bg-slate-900 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:border-pink-500 outline-none" />
           </div>
           <div className="flex gap-2">
              <button className="px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-gray-400 hover:text-white flex items-center gap-2 text-sm">
                 <Filter size={16} /> Filter Tier
              </button>
              <button 
                onClick={() => onNavigate('marketing-app')}
                className="px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-gray-400 hover:text-white flex items-center gap-2 text-sm"
              >
                 <MessageCircle size={16} /> Broadcast WA
              </button>
           </div>
        </div>

        {/* Table */}
        <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-xl">
           <table className="w-full text-sm text-left">
              <thead className="bg-slate-950 text-gray-400 uppercase font-bold text-xs">
                 <tr>
                    <th className="px-6 py-4">Nama Pelanggan</th>
                    <th className="px-6 py-4">Level (Tier)</th>
                    <th className="px-6 py-4">Total Poin</th>
                    <th className="px-6 py-4">Total Belanja (LTV)</th>
                    <th className="px-6 py-4">Kunjungan Terakhir</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                 {mockCustomers.map((cust) => (
                    <tr key={cust.id} className="hover:bg-slate-800/50 transition-colors">
                       <td className="px-6 py-4">
                          <div className="font-bold text-white">{cust.name}</div>
                          <div className="text-xs text-gray-500">{cust.phone}</div>
                       </td>
                       <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold border ${
                             cust.tier === 'Platinum' ? 'bg-slate-200/10 text-white border-slate-200/20' : 
                             cust.tier === 'Gold' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                             'bg-gray-500/10 text-gray-400 border-gray-500/20'
                          }`}>
                             {cust.tier}
                          </span>
                       </td>
                       <td className="px-6 py-4 font-mono text-pink-400 font-bold">{cust.points}</td>
                       <td className="px-6 py-4 text-white">{cust.totalSpend}</td>
                       <td className="px-6 py-4 text-gray-400">{cust.lastVisit}</td>
                       <td className="px-6 py-4 text-right">
                          <button className="text-pink-400 hover:text-pink-300 text-xs font-bold mr-3">Detail</button>
                          <button className="text-gray-400 hover:text-white text-xs">History</button>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </BackofficeLayout>
  );
};
