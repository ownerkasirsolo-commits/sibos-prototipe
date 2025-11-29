
import React from 'react';
import { 
  Globe, MessageCircle, 
  Megaphone, BarChart, Link as LinkIcon, Smartphone,
  MapPin, Settings, FileBarChart, ShoppingBag, Video,
  Facebook, Instagram, Twitter, Youtube, Image, Utensils
} from 'lucide-react';
import { Page } from '../types';
import { GlassCard } from './ui/GlassCard';
import { BackofficeLayout } from './BackofficeLayout';

interface MarketingAppPageProps {
  onNavigate: (page: Page) => void;
}

// Data Structure for Integrations
const integrationCategories = [
  {
    title: 'Marketplace & E-Commerce',
    items: [
      { name: 'Tokopedia', code: 'TKP', color: 'bg-green-500', status: 'Terhubung', icon: null },
      { name: 'Shopee', code: 'SHP', color: 'bg-orange-500', status: 'Terhubung', icon: null },
      { name: 'Lazada', code: 'LZD', color: 'bg-blue-600', status: 'Tidak Terhubung', icon: ShoppingBag },
      { name: 'Bukalapak', code: 'BKL', color: 'bg-red-600', status: 'Tidak Terhubung', icon: ShoppingBag },
    ]
  },
  {
    title: 'Social Media',
    items: [
      { name: 'Instagram', code: 'IG', color: 'bg-pink-600', status: 'Terhubung', icon: Instagram },
      { name: 'Facebook', code: 'FB', color: 'bg-blue-700', status: 'Terhubung', icon: Facebook },
      { name: 'TikTok', code: 'TT', color: 'bg-black', status: 'Terhubung', icon: Video },
      { name: 'Twitter / X', code: 'X', color: 'bg-slate-700', status: 'Tidak Terhubung', icon: Twitter },
      { name: 'YouTube', code: 'YT', color: 'bg-red-600', status: 'Tidak Terhubung', icon: Youtube },
      { name: 'Pinterest', code: 'PIN', color: 'bg-red-500', status: 'Tidak Terhubung', icon: Image },
    ]
  },
  {
    title: 'Food Delivery',
    items: [
      { name: 'GoFood', code: 'GO', color: 'bg-green-600', status: 'Terhubung', icon: Utensils },
      { name: 'GrabFood', code: 'GRB', color: 'bg-green-500', status: 'Terhubung', icon: Utensils },
    ]
  },
  {
    title: 'Communication & Maps',
    items: [
      { name: 'WhatsApp API', code: 'WA', color: 'bg-green-500', status: 'Online', icon: MessageCircle },
      { name: 'Google Business', code: 'GMB', color: 'bg-blue-500', status: 'Verified', icon: MapPin },
    ]
  }
];

export const MarketingAppPage: React.FC<MarketingAppPageProps> = ({ onNavigate }) => {
  return (
    <BackofficeLayout
        title="Omnichannel & Pemasaran"
        icon={<Globe className="text-blue-500" size={20} />}
        onNavigate={onNavigate}
        actions={
            <>
                <button className="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-white/10 hover:bg-slate-700 rounded-lg text-sm text-gray-300 transition-colors">
                    <FileBarChart size={16} /> <span className="hidden sm:inline">Laporan</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-white/10 hover:bg-slate-700 rounded-lg text-sm text-gray-300 transition-colors">
                    <Settings size={16} /> <span className="hidden sm:inline">Pengaturan</span>
                </button>
            </>
        }
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl pb-24">
        <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Main Content: Integrations */}
            <div className="lg:col-span-2 space-y-8">
                
                {integrationCategories.map((category, idx) => (
                  <div key={idx}>
                    <h2 className="text-lg font-bold text-white mb-4 pl-1 border-l-4 border-sibos-orange">{category.title}</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {category.items.map((item, itemIdx) => (
                        <GlassCard key={itemIdx} className="!p-0 overflow-hidden border-white/5 hover:border-sibos-orange/30 transition-colors group">
                          <div className={`p-4 bg-gradient-to-r from-slate-900 to-slate-900 flex justify-between items-center relative overflow-hidden`}>
                              <div className={`absolute left-0 top-0 bottom-0 w-1 ${item.status.includes('Tidak') ? 'bg-gray-600' : 'bg-green-500'}`}></div>
                              <div className="flex items-center gap-3 relative z-10">
                                  <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg`}>
                                    {item.icon ? <item.icon size={20} /> : item.code}
                                  </div>
                                  <div>
                                      <div className="font-bold text-white text-sm">{item.name}</div>
                                      <div className={`text-[10px] flex items-center gap-1 ${item.status.includes('Tidak') ? 'text-gray-500' : 'text-green-400'}`}>
                                        <LinkIcon size={10} /> {item.status}
                                      </div>
                                  </div>
                              </div>
                              <div className="text-right">
                                  <button className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                                    item.status.includes('Tidak') 
                                      ? 'bg-white/5 hover:bg-white/10 text-gray-400' 
                                      : 'bg-green-500/10 text-green-400'
                                  }`}>
                                    {item.status.includes('Tidak') ? 'Connect' : 'Manage'}
                                  </button>
                              </div>
                          </div>
                        </GlassCard>
                      ))}
                    </div>
                  </div>
                ))}

                <h2 className="text-xl font-bold text-white mb-4 pt-6">Alat Pemasaran</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <button className="p-6 bg-slate-900 border border-white/10 rounded-xl hover:border-blue-500 hover:bg-slate-800 transition-all text-left flex items-start gap-4 group">
                        <div className="p-3 bg-blue-500/20 text-blue-500 rounded-xl group-hover:scale-110 transition-transform"><Megaphone size={24} /></div>
                        <div>
                            <div className="font-bold text-white mb-1">Buat Kampanye Iklan</div>
                            <div className="text-xs text-gray-400">Pasang iklan di layar POS jaringan SIBOS atau media sosial.</div>
                        </div>
                    </button>
                    <button className="p-6 bg-slate-900 border border-white/10 rounded-xl hover:border-purple-500 hover:bg-slate-800 transition-all text-left flex items-start gap-4 group">
                        <div className="p-3 bg-purple-500/20 text-purple-500 rounded-xl group-hover:scale-110 transition-transform"><Smartphone size={24} /></div>
                        <div>
                            <div className="font-bold text-white mb-1">Website Toko Online</div>
                            <div className="text-xs text-gray-400">Kelola katalog produk di website toko anda (sibos.shop/namatoko).</div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
                <GlassCard className="bg-slate-900/50">
                    <h3 className="font-bold text-white mb-4 flex items-center gap-2"><BarChart size={18} /> Performa Channel</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-xs mb-1 text-gray-400">
                                <span>Offline (POS)</span>
                                <span>55%</span>
                            </div>
                            <div className="w-full bg-slate-700 h-2 rounded-full"><div className="bg-sibos-orange h-2 rounded-full w-[55%]"></div></div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-1 text-gray-400">
                                <span>Marketplace</span>
                                <span>20%</span>
                            </div>
                            <div className="w-full bg-slate-700 h-2 rounded-full"><div className="bg-blue-500 h-2 rounded-full w-[20%]"></div></div>
                        </div>
                         <div>
                            <div className="flex justify-between text-xs mb-1 text-gray-400">
                                <span>Food Delivery</span>
                                <span>15%</span>
                            </div>
                            <div className="w-full bg-slate-700 h-2 rounded-full"><div className="bg-green-500 h-2 rounded-full w-[15%]"></div></div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-1 text-gray-400">
                                <span>Webstore / WA</span>
                                <span>10%</span>
                            </div>
                            <div className="w-full bg-slate-700 h-2 rounded-full"><div className="bg-purple-500 h-2 rounded-full w-[10%]"></div></div>
                        </div>
                    </div>
                </GlassCard>

                <div className="p-4 bg-gradient-to-br from-blue-900/40 to-slate-900 border border-blue-500/20 rounded-xl">
                    <div className="text-sm font-bold text-blue-400 mb-2">Tips Pemasaran AI</div>
                    <p className="text-xs text-gray-300 leading-relaxed mb-4">
                        "Produk 'Keripik Tempe' banyak dilihat di Tokopedia tapi konversi rendah. Coba update foto produk atau berikan diskon bundling."
                    </p>
                    <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded">Terapkan Rekomendasi</button>
                </div>
            </div>
        </div>
      </div>
    </BackofficeLayout>
  );
};
