
import React from 'react';
import { 
  Shirt, Tag, Scissors, Layers, 
  ShoppingBag, TrendingUp, AlertTriangle, 
  ArrowRight, CheckCircle2, Zap, Package, 
  Printer, Grid, RefreshCw
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { Page } from '../types';

interface SolutionFashionPageProps {
    onNavigate?: (page: Page) => void;
}

export const SolutionFashionPage: React.FC<SolutionFashionPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 animate-in fade-in duration-500">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold tracking-wider mb-8 shadow-lg shadow-pink-900/20 backdrop-blur-md">
            <Shirt size={14} />
            BUTIK & FASHION SYSTEM
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
            Kuasai Tren, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400">
              Musnahkan Dead Stock.
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md mb-10">
            Dunia fashion bergerak cepat. Hari ini tren, besok jadi sampah. SIBOS membantu Anda mengelola ribuan SKU (warna & ukuran) agar stok selalu fresh dan cashflow tidak macet.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4">
             <button 
                onClick={() => onNavigate && onNavigate('pos')}
                className="px-8 py-4 bg-gradient-to-r from-sibos-orange to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-orange-900/50 flex items-center justify-center gap-2"
             >
                <Zap size={20} /> Lihat POS Fashion
             </button>
             <button 
                onClick={() => onNavigate && onNavigate('webstore')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all border border-white/10 flex items-center justify-center gap-2"
             >
                <ShoppingBag size={20} /> Website Butik
             </button>
          </div>
        </div>
      </section>

      {/* PAIN POINTS & SOLUTION */}
      <section className="py-20 container mx-auto px-6">
         <div className="grid md:grid-cols-2 gap-16 items-center">
             <div>
                 <h2 className="text-3xl font-bold text-white mb-6">Tantangan Bisnis Fashion</h2>
                 <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    Mengelola toko baju jauh lebih rumit dari toko kelontong karena variasi produk yang sangat banyak.
                 </p>
                 <div className="space-y-4">
                     <div className="p-4 bg-slate-900 rounded-xl border border-white/5 flex gap-4">
                         <div className="mt-1 p-2 bg-red-500/10 rounded-lg text-red-400 h-fit"><AlertTriangle size={20} /></div>
                         <div>
                             <h4 className="text-white font-bold mb-1">Mimpi Buruk SKU</h4>
                             <p className="text-sm text-gray-400">1 Model Baju x 5 Warna x 4 Ukuran = 20 SKU baru. Input manual satu per satu sangat menyiksa.</p>
                         </div>
                     </div>
                     <div className="p-4 bg-slate-900 rounded-xl border border-white/5 flex gap-4">
                         <div className="mt-1 p-2 bg-red-500/10 rounded-lg text-red-400 h-fit"><TrendingUp size={20} /></div>
                         <div>
                             <h4 className="text-white font-bold mb-1">Konsinyasi Ribet</h4>
                             <p className="text-sm text-gray-400">Susah memisahkan mana barang milik sendiri dan mana titipan desainer lain saat rekap laporan.</p>
                         </div>
                     </div>
                 </div>
             </div>
             
             <div className="relative">
                 <GlassCard className="border-t-4 border-t-pink-500 relative z-10 !bg-slate-900 shadow-2xl">
                     <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <CheckCircle2 className="text-pink-500"/> Solusi SIBOS Fashion
                     </h3>
                     <ul className="space-y-4">
                         {[
                             "Matriks Varian (Generate SKU Otomatis)",
                             "Desain & Cetak Label Barcode Sendiri",
                             "Laporan Konsinyasi Terpisah",
                             "Analisis Dead Stock (Slow Moving)",
                             "Loyalty Point untuk Fashionista"
                         ].map((item, i) => (
                             <li key={i} className="flex items-center gap-3 text-gray-300 p-3 bg-white/5 rounded-lg border border-white/5">
                                 <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                 {item}
                             </li>
                         ))}
                     </ul>
                 </GlassCard>
                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-500/20 rounded-full blur-[80px] -z-10"></div>
             </div>
         </div>
      </section>

      {/* CORE FEATURES SHOWCASE */}
      <section className="py-20 bg-slate-900 border-y border-white/5">
          <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-white mb-4">Fitur Wajib Butik & Distro</h2>
                  <p className="text-gray-400">Teknologi untuk memastikan setiap helai pakaian tercatat dan terjual.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  {/* Variant Matrix */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-pink-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center text-pink-500 mb-6 group-hover:scale-110 transition-transform">
                          <Grid size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Matriks Varian</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          Cukup input 1 nama produk, pilih variasi (Merah, Biru, S, M, L), sistem otomatis membuatkan puluhan SKU anak dalam hitungan detik.
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 p-3 flex flex-col justify-center gap-1">
                          <div className="flex gap-1 justify-center">
                              <div className="w-6 h-6 bg-red-500 rounded text-[8px] flex items-center justify-center text-white">S</div>
                              <div className="w-6 h-6 bg-red-500 rounded text-[8px] flex items-center justify-center text-white">M</div>
                              <div className="w-6 h-6 bg-red-500 rounded text-[8px] flex items-center justify-center text-white">L</div>
                          </div>
                          <div className="flex gap-1 justify-center">
                              <div className="w-6 h-6 bg-blue-500 rounded text-[8px] flex items-center justify-center text-white">S</div>
                              <div className="w-6 h-6 bg-blue-500 rounded text-[8px] flex items-center justify-center text-white">M</div>
                              <div className="w-6 h-6 bg-blue-500 rounded text-[8px] flex items-center justify-center text-white">L</div>
                          </div>
                      </div>
                  </div>

                  {/* Label Printing */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform">
                          <Printer size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Cetak Label / Hangtag</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          Tidak perlu software desain tambahan. Desain label harga dan barcode langsung di SIBOS, cetak ke printer label, lalu tempel di baju.
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 flex items-center justify-center">
                          <div className="bg-white px-4 py-2 rounded text-black font-mono text-xs border border-gray-300">
                              <div className="font-bold">Gamis Rayon</div>
                              <div className="flex justify-between mt-1"><span>Rp 150k</span> <span>||||||</span></div>
                          </div>
                      </div>
                  </div>

                  {/* Consignment */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-fuchsia-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-fuchsia-500/10 rounded-xl flex items-center justify-center text-fuchsia-500 mb-6 group-hover:scale-110 transition-transform">
                          <RefreshCw size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Manajemen Konsinyasi</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          Kelola barang titipan dengan mudah. Sistem otomatis memisahkan omzet toko dan hutang ke supplier saat periode settlement.
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 p-3 flex flex-col justify-center gap-2">
                          <div className="flex justify-between text-xs text-gray-400 border-b border-white/10 pb-1">
                              <span>Brand A</span>
                              <span className="text-green-400">Sold: 5</span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-400">
                              <span>Brand B</span>
                              <span className="text-green-400">Sold: 12</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center container mx-auto px-6">
        <GlassCard className="max-w-4xl mx-auto p-12 relative overflow-hidden bg-gradient-to-br from-slate-900 to-pink-900/30 border-pink-500/20">
           <div className="relative z-10">
              <Scissors size={48} className="text-pink-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-6">Upgrade Butik Anda Sekarang</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                 Tinggalkan pencatatan manual yang membuat pusing. Fokus pada kurasi fashion, biarkan SIBOS mengurus stok dan laporan.
              </p>
              <button 
                onClick={() => onNavigate && onNavigate('backoffice')}
                className="px-8 py-4 bg-gradient-to-r from-sibos-orange to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-orange-900/50 flex items-center gap-2 mx-auto"
              >
                  Mulai Gratis Sekarang
                  <ArrowRight size={20} />
              </button>
           </div>
        </GlassCard>
      </section>

    </div>
  );
};
