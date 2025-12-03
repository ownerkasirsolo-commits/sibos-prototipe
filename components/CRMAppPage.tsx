
import React, { useState } from 'react';
import { 
  Users, Trophy, Gift, Search, 
  MessageCircle, UserPlus, Filter,
  FileBarChart, Settings, Check, ChevronDown, Clock, ShoppingBag,
  Crown, Star, ToggleLeft, ToggleRight, Plus
} from 'lucide-react';
import { Page, HardwareModule, AppModule } from '../types';
import { GlassCard } from './ui/GlassCard';
import { BackofficeLayout } from './BackofficeLayout';
import { useSibos } from '../contexts/SibosContext';

interface CRMAppPageProps {
  onNavigate: (page: Page) => void;
  activeHardware?: HardwareModule[];
  activeModules?: AppModule[];
}

const mockCustomers = [
  { id: 1, name: 'Budi Santoso', tier: 'Gold', points: 1250, phone: '08123456789', lastVisit: 'Hari ini', totalSpend: 'Rp 5.400.000' },
  { id: 2, name: 'Siti Aminah', tier: 'Platinum', points: 5400, phone: '08129876543', lastVisit: '2 hari lalu', totalSpend: 'Rp 12.800.000' },
  { id: 3, name: 'Joko Anwar', tier: 'Silver', points: 450, phone: '08133344455', lastVisit: '1 minggu lalu', totalSpend: 'Rp 850.000' },
  { id: 4, name: 'Rina Nose', tier: 'Gold', points: 1100, phone: '08155566677', lastVisit: 'Kemarin', totalSpend: 'Rp 4.200.000' },
  { id: 5, name: 'Dedi Corbuzier', tier: 'Silver', points: 120, phone: '08199988877', lastVisit: '1 bulan lalu', totalSpend: 'Rp 300.000' },
];

export const CRMAppPage: React.FC<CRMAppPageProps> = ({ onNavigate, activeHardware, activeModules }) => {
  const { promotions, togglePromotion, searchQuery } = useSibos(); // Use global Search Query
  const [activeTab, setActiveTab] = useState<'dashboard' | 'rewards'>('dashboard');
  const [showFilter, setShowFilter] = useState(false);
  const [activeTier, setActiveTier] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Use global search query instead of local
  const filteredCustomers = mockCustomers.filter(c => {
      const matchSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.phone.includes(searchQuery);
      const matchTier = activeTier === 'All' ? true : c.tier === activeTier;
      return matchSearch && matchTier;
  });

  const toggleExpand = (id: number) => {
      setExpandedId(expandedId === id ? null : id);
  };

  // Filter Member Promos
  const memberPromos = promotions.filter(p => p.scope === 'member_only');

  return (
    <BackofficeLayout
        title="CRM"
        icon={<Users className="text-sibos-orange" size={20} />} 
        onNavigate={onNavigate}
        activeHardware={activeHardware}
        activeModules={activeModules}
        currentPage="crm-app"
    >
      <div className="container mx-auto px-4 py-6 max-w-7xl pb-24">
        
        {/* Top Controls: Tabs & Actions */}
        <div className="flex justify-between items-center mb-6 gap-4 border-b border-white/10 pb-4">
             {/* Tab Switcher */}
             <div className="flex bg-slate-900/50 p-1 rounded-lg border border-white/10 overflow-hidden">
                <button 
                    onClick={() => setActiveTab('dashboard')}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'dashboard' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                    <Users size={16} className={activeTab === 'dashboard' ? 'text-sibos-orange' : ''} /> 
                    <span className="hidden sm:inline">Pelanggan</span>
                </button>
                <button 
                    onClick={() => setActiveTab('rewards')}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'rewards' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                    <Crown size={16} className={activeTab === 'rewards' ? 'text-sibos-orange' : ''} /> 
                    <span className="hidden sm:inline">Promo</span>
                </button>
            </div>

            {/* Actions: Filter & Add (Icon Only) */}
            <div className="flex gap-2">
                <div className="relative">
                    <button 
                        onClick={() => setShowFilter(!showFilter)}
                        title={`Filter Tier: ${activeTier}`}
                        className={`w-10 h-10 border rounded-lg flex items-center justify-center transition-colors ${activeTier !== 'All' ? 'bg-slate-800 border-sibos-orange text-sibos-orange' : 'bg-slate-900 border-white/10 text-gray-400 hover:text-white'}`}
                    >
                        <Filter size={20} /> 
                    </button>

                    {showFilter && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setShowFilter(false)}></div>
                            <div className="absolute top-full right-0 mt-2 w-40 bg-slate-900 border border-white/10 rounded-xl shadow-2xl z-20 overflow-hidden animate-in fade-in zoom-in-95">
                                <div className="px-4 py-3 border-b border-white/5 text-xs font-bold text-gray-500 uppercase">Filter Level</div>
                                {['All', 'Silver', 'Gold', 'Platinum'].map(tier => (
                                    <button
                                        key={tier}
                                        onClick={() => {
                                            setActiveTier(tier);
                                            setShowFilter(false);
                                        }}
                                        className="w-full text-left px-4 py-3 text-sm hover:bg-white/5 flex items-center justify-between text-gray-300 hover:text-white"
                                    >
                                        {tier === 'All' ? 'Semua' : tier}
                                        {activeTier === tier && <Check size={14} className="text-sibos-orange" />}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Primary Action Button - Icon Only (+) */}
                <button 
                    title={activeTab === 'dashboard' ? "Tambah Member Baru" : "Tambah Promo Baru"}
                    className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-sibos-orange to-red-600 hover:from-orange-500 hover:to-red-500 rounded-lg shadow-lg shadow-orange-900/40 text-white transition-all active:scale-95"
                >
                    <Plus size={24} strokeWidth={3} />
                </button>
            </div>
        </div>

        {/* === CUSTOMERS / DASHBOARD VIEW === */}
        {activeTab === 'dashboard' && (
            <div className="animate-in fade-in slide-in-from-left-4">
                {/* Narrative Header */}
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-white">Data Pelanggan</h2>
                    <p className="text-sm text-gray-400">Database member dan riwayat interaksi belanja.</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <GlassCard className="!p-4 bg-slate-900/50 border-white/5">
                        <div className="flex justify-between items-start mb-2">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Users size={20} /></div>
                        </div>
                        <div className="text-2xl font-bold text-white">1,245</div>
                        <div className="text-xs text-gray-400">Total Member</div>
                    </GlassCard>
                    <GlassCard className="!p-4 bg-slate-900/50 border-white/5">
                        <div className="flex justify-between items-start mb-2">
                            <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-400"><Trophy size={20} /></div>
                        </div>
                        <div className="text-2xl font-bold text-white">85</div>
                        <div className="text-xs text-gray-400">Member Gold+</div>
                    </GlassCard>
                    {/* ... other stats ... */}
                </div>

                {/* Customer List */}
                <div className="space-y-3">
                    {filteredCustomers.map((cust) => {
                        const isExpanded = expandedId === cust.id;
                        return (
                            <div key={cust.id} className={`bg-slate-900 border transition-all duration-300 rounded-xl overflow-hidden ${isExpanded ? 'border-sibos-orange/50 ring-1 ring-orange-500/20' : 'border-white/5 hover:border-white/20'}`}>
                                <div onClick={() => toggleExpand(cust.id)} className="p-4 flex items-center justify-between cursor-pointer group">
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${cust.tier === 'Platinum' ? 'bg-slate-200 text-slate-800' : cust.tier === 'Gold' ? 'bg-yellow-500 text-yellow-900' : 'bg-slate-700 text-gray-300'}`}>
                                            {cust.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold text-white text-sm">{cust.name}</h4>
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${cust.tier === 'Platinum' ? 'bg-slate-200/10 text-white border-slate-200/20' : cust.tier === 'Gold' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>{cust.tier}</span>
                                            </div>
                                            <div className="text-xs text-gray-500">{cust.phone}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="hidden md:block text-right">
                                            <div className="text-xs text-gray-400 uppercase font-bold">Poin</div>
                                            <div className="text-sibos-orange font-mono font-bold">{cust.points}</div>
                                        </div>
                                        <ChevronDown size={18} className={`text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                                    </div>
                                </div>
                                {/* Details Panel */}
                                {isExpanded && (
                                    <div className="border-t border-white/5 bg-slate-950/50 p-4 animate-in slide-in-from-top-2">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                            <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                                <div className="text-[10px] text-gray-500 uppercase font-bold mb-1 flex items-center gap-1"><Gift size={12}/> Sisa Poin</div>
                                                <div className="text-white font-bold">{cust.points}</div>
                                            </div>
                                            <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                                <div className="text-[10px] text-gray-500 uppercase font-bold mb-1 flex items-center gap-1"><ShoppingBag size={12}/> Total Belanja</div>
                                                <div className="text-white font-bold">{cust.totalSpend}</div>
                                            </div>
                                            <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                                <div className="text-[10px] text-gray-500 uppercase font-bold mb-1 flex items-center gap-1"><Clock size={12}/> Kunjungan Terakhir</div>
                                                <div className="text-white font-bold">{cust.lastVisit}</div>
                                            </div>
                                            <div className="flex flex-col justify-end gap-2">
                                                <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded border border-white/10">Lihat Detail</button>
                                                <button className="w-full py-2 bg-green-600 hover:bg-green-500 text-white text-xs font-bold rounded flex items-center justify-center gap-1"><MessageCircle size={14}/> Chat WA</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    {filteredCustomers.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            Member tidak ditemukan.
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* === LOYALTY & REWARDS VIEW === */}
        {activeTab === 'rewards' && (
            <div className="animate-in fade-in slide-in-from-right-4">
                 <div className="mb-6">
                    <h2 className="text-xl font-bold text-white">Benefit & Promo</h2>
                    <p className="text-sm text-gray-400">Aturan diskon khusus berdasarkan tingkatan member.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {memberPromos.map(promo => (
                         <div key={promo.id} className={`p-5 rounded-xl border transition-all relative overflow-hidden ${promo.active ? 'bg-slate-900 border-sibos-orange/30' : 'bg-slate-950 border-white/5 opacity-70'}`}>
                             {/* Status Bar */}
                             <div className={`absolute top-0 left-0 w-1 h-full ${promo.active ? 'bg-sibos-orange' : 'bg-gray-600'}`}></div>

                             <div className="flex justify-between items-start mb-3 pl-2">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-orange-500/10 text-sibos-orange">
                                        {promo.name.includes('Birthday') ? <Gift size={20}/> : <Crown size={20}/>}
                                    </div>
                                    {promo.targetTier && (
                                        <div className="flex gap-1">
                                            {promo.targetTier.map(t => (
                                                <span key={t} className="px-2 py-0.5 rounded text-[10px] bg-white/10 border border-white/10 text-white uppercase font-bold">{t}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <button onClick={() => togglePromotion(promo.id)} className={`transition-colors ${promo.active ? 'text-sibos-orange' : 'text-gray-600'}`}>
                                    {promo.active ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                                </button>
                             </div>

                             <div className="pl-2">
                                <h3 className="font-bold text-white text-lg mb-1">{promo.name}</h3>
                                <p className="text-xs text-gray-400 mb-4">{promo.description}</p>
                                
                                <div className="flex items-center gap-2">
                                    <Star size={12} className="text-yellow-500" />
                                    <span className="text-xs font-bold text-white">
                                        {promo.type === 'percentage' ? `Diskon ${promo.value}%` : `Potongan Rp ${promo.value.toLocaleString()}`}
                                    </span>
                                </div>
                             </div>
                         </div>
                    ))}
                </div>
            </div>
        )}

      </div>
    </BackofficeLayout>
  );
};
