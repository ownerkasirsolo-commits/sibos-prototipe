
import React from 'react';
import { 
  Network, Map, RefreshCw, BarChart3, 
  TrendingUp, AlertTriangle, Layers, 
  ArrowRight, CheckCircle2, Zap, Globe, Package, Share2
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { Page } from '../types';

interface SolutionMultiOutletPageProps {
    onNavigate?: (page: Page) => void;
}

export const SolutionMultiOutletPage: React.FC<SolutionMultiOutletPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 animate-in fade-in duration-500">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=2064&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-wider mb-8 shadow-lg shadow-cyan-900/20 backdrop-blur-md">
            <Network size={14} />
            MULTI-OUTLET & CHAIN STORE
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
            Satu Otak, Ribuan Tangan. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">
              Kendalikan Kerajaan Anda.
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md mb-10">
            Hentikan anarki data antar cabang. SIBOS menyatukan denyut nadi bisnis Anda dalam satu dashboard yang tersinkronisasi secara real-time. Kelola 100 cabang semudah mengelola 1 warung.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4">
             <button 
                onClick={() => onNavigate && onNavigate('backoffice')}
                className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-cyan-900/50 flex items-center justify-center gap-2"
             >
                <Globe size={20} /> Lihat Dashboard Pusat
             </button>
             <button 
                onClick={() => onNavigate && onNavigate('irm')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all border border-white/10 flex items-center justify-center gap-2"
             >
                <Share2 size={20} /> Transfer Stok Antar Cabang
             </button>
          </div>
        </div>
      </section>

      {/* PAIN POINTS & SOLUTION */}
      <section className="py-20 container mx-auto px-6">
         <div className="grid md:grid-cols-2 gap-16 items-center">
             <div>
                 <h2 className="text-3xl font-bold text-white mb-6">Mimpi Buruk Ekspansi Cabang</h2>
                 <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    Membuka cabang baru seharusnya melipatgandakan omzet, bukan melipatgandakan masalah. Tanpa sistem terpusat, Anda akan kehilangan kendali.
                 </p>
                 <div className="space-y-4">
                     <div className="p-4 bg-slate-900 rounded-xl border border-white/5 flex gap-4">
                         <div className="mt-1 p-2 bg-red-500/10 rounded-lg text-red-400 h-fit"><AlertTriangle size={20} /></div>
                         <div>
                             <h4 className="text-white font-bold mb-1">Stok Hantu (Ghost Stock)</h4>
                             <p className="text-sm text-gray-400">Pusat kirim 100 barang, cabang bilang terima 90. 10 hilang di jalan tanpa jejak. Siapa yang salah?</p>
                         </div>
                     </div>
                     <div className="p-4 bg-slate-900 rounded-xl border border-white/5 flex gap-4">
                         <div className="mt-1 p-2 bg-red-500/10 rounded-lg text-red-400 h-fit"><TrendingUp size={20} /></div>
                         <div>
                             <h4 className="text-white font-bold mb-1">Buta Data Cabang</h4>
                             <p className="text-sm text-gray-400">Harus menunggu rekap WA dari tiap manajer toko tiap malam hanya untuk tahu omzet hari ini. Lambat!</p>
                         </div>
                     </div>
                 </div>
             </div>
             
             <div className="relative">
                 <GlassCard className="border-t-4 border-t-cyan-500 relative z-10 !bg-slate-900 shadow-2xl">
                     <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <CheckCircle2 className="text-cyan-500"/> Solusi SIBOS Multi-Outlet
                     </h3>
                     <ul className="space-y-4">
                         {[
                             "Centralized Inventory (Stok Global Real-time)",
                             "Digital Delivery Order (Surat Jalan Digital)",
                             "Dynamic Regional Pricing (Harga Beda per Kota)",
                             "Consolidated Reporting (Laporan Gabungan)",
                             "Master Data Product (Input Sekali, Sebar ke Semua)"
                         ].map((item, i) => (
                             <li key={i} className="flex items-center gap-3 text-gray-300 p-3 bg-white/5 rounded-lg border border-white/5">
                                 <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                 {item}
                             </li>
                         ))}
                     </ul>
                 </GlassCard>
                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-[80px] -z-10"></div>
             </div>
         </div>
      </section>

      {/* CORE FEATURES SHOWCASE */}
      <section className="py-20 bg-slate-900 border-y border-white/5">
          <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-white mb-4">Fitur Wajib Chain Store</h2>
                  <p className="text-gray-400">Teknologi sinkronisasi yang menjaga semua cabang tetap dalam satu komando.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  {/* Stock Transfer */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-500 mb-6 group-hover:scale-110 transition-transform">
                          <Share2 size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Mutasi Antar Cabang</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          Cabang A kehabisan stok? Tarik dari Cabang B. Sistem mencatat barang <em>In Transit</em> sehingga tidak ada stok ganda atau hilang.
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 p-3 flex items-center gap-2">
                          <div className="w-8 h-8 rounded bg-slate-800 border border-white/10 flex items-center justify-center text-xs">A</div>
                          <div className="flex-1 h-1 bg-slate-800 rounded relative">
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-500 rounded-full animate-ping"></div>
                          </div>
                          <div className="w-8 h-8 rounded bg-slate-800 border border-white/10 flex items-center justify-center text-xs">B</div>
                      </div>
                  </div>

                  {/* Regional Pricing */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                          <Map size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Harga Regional</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          Biaya logistik ke Papua beda dengan Jakarta. Atur harga jual berbeda untuk setiap wilayah atau zona outlet dari pusat.
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 p-3 flex flex-col justify-center gap-2">
                          <div className="flex justify-between text-xs text-gray-400 border-b border-white/10 pb-1">
                              <span>Zona Jawa</span>
                              <span className="text-white font-bold">Rp 10.000</span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-400">
                              <span>Zona Luar Jawa</span>
                              <span className="text-white font-bold">Rp 12.500</span>
                          </div>
                      </div>
                  </div>

                  {/* Consolidated Report */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-indigo-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500 mb-6 group-hover:scale-110 transition-transform">
                          <BarChart3 size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Laporan Konsolidasi</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          Lihat performa seluruh kerajaan bisnis dalam satu layar. Bandingkan omzet antar cabang (Ranking) untuk memacu kompetisi sehat.
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 flex items-end justify-center gap-2 p-3">
                          <div className="w-4 bg-slate-700 h-[40%] rounded-t"></div>
                          <div className="w-4 bg-slate-700 h-[60%] rounded-t"></div>
                          <div className="w-4 bg-indigo-500 h-[80%] rounded-t shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                          <div className="w-4 bg-slate-700 h-[50%] rounded-t"></div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center container mx-auto px-6">
        <GlassCard className="max-w-4xl mx-auto p-12 relative overflow-hidden bg-gradient-to-br from-slate-900 to-cyan-900/30 border-cyan-500/20">
           <div className="relative z-10">
              <Network size={48} className="text-cyan-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-6">Satukan Cabang Anda Sekarang</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                 Jangan biarkan ekspansi menjadi bumerang. Kelola pertumbuhan bisnis dengan sistem yang tersinkronisasi dan skalabel.
              </p>
              <button 
                onClick={() => onNavigate && onNavigate('backoffice')}
                className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-cyan-900/50 flex items-center gap-2 mx-auto"
              >
                  Coba Dashboard Multi-Outlet
                  <ArrowRight size={20} />
              </button>
           </div>
        </GlassCard>
      </section>

    </div>
  );
};
