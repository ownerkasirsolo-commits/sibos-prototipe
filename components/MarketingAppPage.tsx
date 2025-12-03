
import React, { useState } from 'react';
import { 
  Globe, TicketPercent, Plus, Settings
} from 'lucide-react';
import { Page, HardwareModule, AppModule } from '../types';
import { BackofficeLayout } from './BackofficeLayout';
import { useSibos } from '../contexts/SibosContext';

interface MarketingAppPageProps {
  onNavigate: (page: Page) => void;
  activeHardware?: HardwareModule[];
  activeModules?: AppModule[];
}

export const MarketingAppPage: React.FC<MarketingAppPageProps> = ({ onNavigate, activeHardware, activeModules }) => {
  const { promotions } = useSibos();
  const [activeTab, setActiveTab] = useState<'channels' | 'promos'>('channels');

  return (
    <BackofficeLayout
        title="Marketing"
        icon={<Globe className="text-blue-500" size={20} />}
        onNavigate={onNavigate}
        activeHardware={activeHardware}
        activeModules={activeModules}
        currentPage="marketing-app"
    >
      <div className="container mx-auto px-4 py-6 max-w-7xl pb-24">
        
        {/* Top Controls */}
        <div className="flex justify-between items-center mb-6 gap-4 border-b border-white/10 pb-4">
             <div className="flex bg-slate-900/50 p-1 rounded-lg border border-white/10 overflow-hidden">
                <button 
                    onClick={() => setActiveTab('channels')}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'channels' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                    <Globe size={16} className={activeTab === 'channels' ? 'text-blue-400' : ''} /> 
                    <span className="hidden sm:inline">Channel</span>
                </button>
                <button 
                    onClick={() => setActiveTab('promos')}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'promos' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                    <TicketPercent size={16} className={activeTab === 'promos' ? 'text-blue-400' : ''} /> 
                    <span className="hidden sm:inline">Promo Umum</span>
                </button>
            </div>

            <div className="flex gap-2">
                <button className="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white bg-slate-900 transition-colors">
                    <Settings size={20} />
                </button>
            </div>
        </div>

        {/* Content Placeholder for brevity, structure updated */}
        {activeTab === 'channels' && (
            <div className="animate-in fade-in">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-white">Omnichannel</h2>
                    <p className="text-sm text-gray-400">Integrasi marketplace dan media sosial.</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                    {['Tokopedia', 'Shopee', 'TikTok Shop'].map((channel) => (
                        <div key={channel} className="bg-slate-900 border border-white/5 rounded-xl p-5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center font-bold text-gray-400">{channel[0]}</div>
                                <div>
                                    <div className="font-bold text-white">{channel}</div>
                                    <div className="text-xs text-gray-500">Not Connected</div>
                                </div>
                            </div>
                            <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg">Connect</button>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {activeTab === 'promos' && (
             <div className="animate-in fade-in">
                <div className="mb-6 flex justify-between items-end">
                    <div>
                        <h2 className="text-xl font-bold text-white">Promo Umum</h2>
                        <p className="text-sm text-gray-400">Diskon dan kampanye untuk semua pelanggan.</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg">
                        <Plus size={16} /> Buat Promo
                    </button>
                </div>

                <div className="space-y-3">
                    {promotions.filter(p => p.scope === 'general').map((promo) => (
                        <div key={promo.id} className="bg-slate-900 border border-white/5 rounded-xl p-4 flex justify-between items-center hover:border-blue-500/30 transition-colors">
                            <div>
                                <div className="font-bold text-white flex items-center gap-2">
                                    {promo.name}
                                    {promo.active ? <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded">Aktif</span> : <span className="text-[10px] bg-gray-700 text-gray-400 px-2 py-0.5 rounded">Non-Aktif</span>}
                                </div>
                                <div className="text-xs text-gray-400 mt-1">{promo.description}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-blue-400 font-bold">{promo.type === 'percentage' ? `${promo.value}%` : `Rp ${promo.value.toLocaleString()}`}</div>
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
