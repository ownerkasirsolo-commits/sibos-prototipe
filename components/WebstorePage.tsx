
import React from 'react';
import { 
  Laptop, ShoppingCart, Globe, Rocket, 
  CreditCard, Layout, Zap, Package, 
  Smartphone, UserCheck, ArrowRight
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { Page } from '../types';

interface WebstorePageProps {
    onNavigate?: (page: Page) => void;
}

export const WebstorePage: React.FC<WebstorePageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 animate-in fade-in duration-500">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950"></div>
        </div>
        
        {/* Abstract Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-wider mb-8 shadow-lg shadow-cyan-900/20 backdrop-blur-md">
            <Globe size={14} />
            WEBSITE TOKO ONLINE
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
            Jangan Numpang <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">
              Lapak Terus.
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md mb-10">
            Marketplace adalah "kolam piranha" di mana Anda dipaksa perang harga. Bangun istana brand Anda sendiri. Dengan SIBOS Webstore, Anda punya rumah digital yang elegan, terpercaya, dan 100% kendali di tangan Anda.
          </p>
          
          <div className="flex justify-center gap-4">
             <div className="p-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="h-2 w-32 bg-white/20 rounded"></div>
             </div>
          </div>
        </div>
      </section>

      {/* PROBLEM & SOLUTION */}
      <section className="py-20 container mx-auto px-6">
         <div className="grid md:grid-cols-2 gap-16 items-center">
             <div>
                 <h2 className="text-3xl font-bold text-white mb-6">Kenapa Marketplace Saja Tidak Cukup?</h2>
                 <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                    Di marketplace, loyalitas pelanggan adalah kepada platform, bukan kepada Anda. Mereka mudah berpaling hanya karena selisih harga Rp 500 perak.
                 </p>
                 <ul className="space-y-4">
                     <li className="flex items-start gap-3">
                         <div className="mt-1 p-1 bg-red-500/10 rounded text-red-400"><Layout size={16}/></div>
                         <div className="text-gray-300 text-sm"><strong className="text-white block">Branding Terbatas</strong> Tampilan toko Anda seragam dengan jutaan toko lain.</div>
                     </li>
                     <li className="flex items-start gap-3">
                         <div className="mt-1 p-1 bg-red-500/10 rounded text-red-400"><CreditCard size={16}/></div>
                         <div className="text-gray-300 text-sm"><strong className="text-white block">Potongan Admin Besar</strong> Margin keuntungan Anda tergerus biaya layanan platform.</div>
                     </li>
                 </ul>
             </div>
             
             <div className="relative">
                 <GlassCard className="border-t-4 border-t-cyan-500 relative z-10 !bg-slate-900 shadow-2xl">
                     <div className="absolute top-0 right-0 p-6 opacity-10"><Rocket size={80} className="text-cyan-500"/></div>
                     <h3 className="text-2xl font-bold text-white mb-6">Keunggulan SIBOS Webstore</h3>
                     
                     <div className="grid gap-4">
                         <div className="flex items-center gap-4 p-4 bg-slate-800 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-colors">
                             <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400"><Zap size={24}/></div>
                             <div>
                                 <h4 className="font-bold text-white">Setup Instan (No-Code)</h4>
                                 <p className="text-xs text-gray-400">Pilih tema, upload logo, jadi dalam 5 menit.</p>
                             </div>
                         </div>
                         <div className="flex items-center gap-4 p-4 bg-slate-800 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-colors">
                             <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Package size={24}/></div>
                             <div>
                                 <h4 className="font-bold text-white">Stok Terintegrasi POS</h4>
                                 <p className="text-xs text-gray-400">Barang laku di toko fisik, stok di web otomatis berkurang.</p>
                             </div>
                         </div>
                         <div className="flex items-center gap-4 p-4 bg-slate-800 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-colors">
                             <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><UserCheck size={24}/></div>
                             <div>
                                 <h4 className="font-bold text-white">Login Member (CRM)</h4>
                                 <p className="text-xs text-gray-400">Pelanggan bisa cek poin loyalty & riwayat belanja.</p>
                             </div>
                         </div>
                     </div>
                 </GlassCard>
             </div>
         </div>
      </section>

      {/* MOCKUP SHOWCASE */}
      <section className="py-20 bg-slate-900 border-y border-white/5">
          <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold text-white mb-16">Tampilan Profesional di Semua Layar</h2>
              
              <div className="relative max-w-5xl mx-auto flex justify-center items-end">
                  {/* Laptop Mockup */}
                  <div className="w-[700px] h-[400px] bg-slate-800 rounded-t-2xl border-t-8 border-x-8 border-slate-700 shadow-2xl relative z-10 overflow-hidden">
                      <div className="bg-slate-900 h-8 flex items-center px-4 gap-2 border-b border-white/5">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <div className="flex-1 bg-slate-800 h-5 rounded mx-4"></div>
                      </div>
                      <div className="p-6 bg-slate-950 h-full relative">
                          {/* Fake Website Content */}
                          <div className="flex justify-between items-center mb-8">
                              <div className="w-24 h-8 bg-white/10 rounded"></div>
                              <div className="flex gap-4">
                                  <div className="w-16 h-4 bg-white/10 rounded"></div>
                                  <div className="w-16 h-4 bg-white/10 rounded"></div>
                                  <div className="w-16 h-4 bg-white/10 rounded"></div>
                              </div>
                          </div>
                          <div className="h-48 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-xl mb-6 flex items-center px-8 border border-white/5">
                              <div className="space-y-3">
                                  <div className="w-48 h-6 bg-white/10 rounded"></div>
                                  <div className="w-32 h-4 bg-white/5 rounded"></div>
                                  <div className="w-24 h-8 bg-cyan-600 rounded mt-4"></div>
                              </div>
                          </div>
                          <div className="grid grid-cols-4 gap-4">
                              {[1,2,3,4].map(i => (
                                  <div key={i} className="aspect-square bg-white/5 rounded-lg border border-white/5"></div>
                              ))}
                          </div>
                      </div>
                  </div>

                  {/* Phone Mockup */}
                  <div className="w-[180px] h-[350px] bg-slate-800 rounded-3xl border-8 border-slate-700 shadow-2xl absolute -right-4 -bottom-10 z-20 overflow-hidden transform rotate-[-5deg]">
                      <div className="bg-slate-950 h-full p-3 flex flex-col">
                          <div className="w-full h-32 bg-white/5 rounded-xl mb-3"></div>
                          <div className="grid grid-cols-2 gap-2">
                              <div className="aspect-square bg-white/5 rounded-lg"></div>
                              <div className="aspect-square bg-white/5 rounded-lg"></div>
                              <div className="aspect-square bg-white/5 rounded-lg"></div>
                              <div className="aspect-square bg-white/5 rounded-lg"></div>
                          </div>
                          <div className="mt-auto h-12 bg-cyan-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                              Checkout
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* ECOSYSTEM INTEGRATION */}
      <section className="py-20 container mx-auto px-6">
          <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Terhubung ke Jantung Bisnis</h2>
              <p className="text-gray-400">Webstore SIBOS bukan pulau terpencil. Ia adalah bagian dari benua bisnis Anda.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
              <div 
                className="p-6 bg-slate-900 border border-white/10 rounded-2xl hover:border-cyan-500/50 transition-colors cursor-pointer group"
                onClick={() => onNavigate && onNavigate('irm')}
              >
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                      <Package size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Sync Stok Gudang</h3>
                  <p className="text-sm text-gray-400">
                      Stok di webstore mengambil data real-time dari modul <strong>IRM (Inventory)</strong>. Tidak ada lagi overselling.
                  </p>
                  <div className="mt-4 text-xs text-cyan-500 flex items-center gap-1 font-bold">
                      Lihat IRM <ArrowRight size={12}/>
                  </div>
              </div>

              <div 
                className="p-6 bg-slate-900 border border-white/10 rounded-2xl hover:border-pink-500/50 transition-colors cursor-pointer group"
                onClick={() => onNavigate && onNavigate('crm')}
              >
                  <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center text-pink-400 mb-4 group-hover:scale-110 transition-transform">
                      <UserCheck size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Member Loyalty</h3>
                  <p className="text-sm text-gray-400">
                      Pelanggan mendapat poin belanja di web yang sama dengan saat belanja di toko fisik via modul <strong>CRM</strong>.
                  </p>
                  <div className="mt-4 text-xs text-pink-500 flex items-center gap-1 font-bold">
                      Lihat CRM <ArrowRight size={12}/>
                  </div>
              </div>

              <div 
                className="p-6 bg-slate-900 border border-white/10 rounded-2xl hover:border-blue-500/50 transition-colors cursor-pointer group"
                onClick={() => onNavigate && onNavigate('marketplace')}
              >
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                      <Globe size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Omnichannel</h3>
                  <p className="text-sm text-gray-400">
                      Kelola pesanan webstore berdampingan dengan pesanan Tokopedia & Shopee di modul <strong>Marketplace</strong>.
                  </p>
                  <div className="mt-4 text-xs text-blue-500 flex items-center gap-1 font-bold">
                      Lihat Marketplace <ArrowRight size={12}/>
                  </div>
              </div>
          </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center container mx-auto px-6">
        <GlassCard className="max-w-4xl mx-auto p-12 relative overflow-hidden bg-gradient-to-br from-slate-900 to-cyan-900/30 border-cyan-500/20">
           <div className="relative z-10">
              <Laptop size={48} className="text-cyan-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-6">Klaim Domain Anda Sekarang</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                 Jangan biarkan kompetitor mengambil nama brand Anda. Mulai berjualan online dengan identitas Anda sendiri.
              </p>
              <button className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-cyan-900/50 flex items-center gap-2 mx-auto">
                  Buat Website Toko (Trial Gratis)
                  <ArrowRight size={20} />
              </button>
           </div>
        </GlassCard>
      </section>

    </div>
  );
};
