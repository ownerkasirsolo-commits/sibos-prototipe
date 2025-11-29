
import React from 'react';
import { 
  Globe, ShoppingBag, RefreshCw, BarChart3, 
  MessageCircle, Layers, ArrowRight, CheckCircle 
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

export const MarketplacePage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 animate-in fade-in duration-500">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950"></div>
        </div>
        
        {/* Animated Logos Background */}
        <div className="absolute top-10 left-10 opacity-20 animate-bounce" style={{animationDuration: '3s'}}>
            <div className="w-16 h-16 bg-green-500 rounded-xl"></div>
        </div>
        <div className="absolute top-20 right-20 opacity-20 animate-bounce" style={{animationDuration: '4s'}}>
            <div className="w-16 h-16 bg-orange-500 rounded-xl"></div>
        </div>
        <div className="absolute bottom-20 left-1/4 opacity-20 animate-bounce" style={{animationDuration: '5s'}}>
            <div className="w-16 h-16 bg-black border border-white/20 rounded-xl"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-wider mb-8 shadow-lg shadow-blue-900/20 backdrop-blur-md">
            <Globe size={14} />
            SIBOS OMNICHANNEL
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
            Jualan di Mana Saja,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-sibos-orange">
              Atur di Satu Tempat
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md mb-10">
            Tokopedia, Shopee, TikTok Shop, Lazada, hingga Website Toko sendiri. Semua pesanan dan stok tersinkronisasi otomatis dalam satu dashboard SIBOS.
          </p>
          <div className="flex justify-center gap-4">
             <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-bold">Tokopedia</span>
             </div>
             <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-bold">Shopee</span>
             </div>
             <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-sm font-bold">TikTok</span>
             </div>
          </div>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="py-20 container mx-auto px-6">
         <div className="grid md:grid-cols-3 gap-8">
            
            <GlassCard className="group hover:border-blue-500/50 transition-colors">
               <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <RefreshCw size={24} />
               </div>
               <h3 className="text-xl font-bold text-white mb-3">Sinkronisasi Stok Real-time</h3>
               <p className="text-gray-400 text-sm leading-relaxed">
                  Saat barang laku di Shopee, stok di Tokopedia dan Kasir Offline otomatis berkurang. Tidak ada lagi drama "batal pesanan" karena stok selisih.
               </p>
            </GlassCard>

            <GlassCard className="group hover:border-purple-500/50 transition-colors">
               <div className="w-12 h-12 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Layers size={24} />
               </div>
               <h3 className="text-xl font-bold text-white mb-3">Upload Produk Sekali Klik</h3>
               <p className="text-gray-400 text-sm leading-relaxed">
                  Input produk baru di SIBOS, lalu "Push" ke semua marketplace sekaligus. Hemat waktu admin hingga 90% daripada upload satu per satu.
               </p>
            </GlassCard>

            <GlassCard className="group hover:border-sibos-orange/50 transition-colors">
               <div className="w-12 h-12 rounded-lg bg-sibos-orange/10 text-sibos-orange flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MessageCircle size={24} />
               </div>
               <h3 className="text-xl font-bold text-white mb-3">Chat Terpusat</h3>
               <p className="text-gray-400 text-sm leading-relaxed">
                  Balas chat dari Shopee, Tokopedia, dan WhatsApp dalam satu layar. Tidak perlu buka-tutup banyak aplikasi di HP.
               </p>
            </GlassCard>

         </div>
      </section>

      {/* VISUALIZATION SECTION */}
      <section className="py-20 bg-slate-900 border-y border-white/5">
         <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
               <div className="lg:w-1/2">
                  <h2 className="text-3xl font-bold text-white mb-6">Sentralisasi Order & Laporan</h2>
                  <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                     Jangan pusing rekap penjualan manual dari berbagai channel. SIBOS menggabungkan semua data transaksi menjadi satu laporan keuangan yang rapi.
                  </p>
                  <ul className="space-y-4">
                     {[
                        "Cetak label pengiriman semua kurir dari satu tempat",
                        "Laporan laba rugi gabungan (Offline + Online)",
                        "Analisis produk terlaris per channel (Misal: Baju A laku di TikTok, Baju B laku di Shopee)",
                        "Integrasi stok gudang utama"
                     ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300">
                           <CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
                           <span>{item}</span>
                        </li>
                     ))}
                  </ul>
               </div>
               
               <div className="lg:w-1/2 relative">
                  {/* Abstract Dashboard UI */}
                  <div className="bg-slate-800 rounded-2xl border border-white/10 p-6 shadow-2xl relative z-10">
                     <div className="flex justify-between items-center mb-6">
                        <div className="text-white font-bold">Order Masuk (Live)</div>
                        <div className="text-xs text-green-400 animate-pulse">● Real-time</div>
                     </div>
                     <div className="space-y-3">
                        <div className="p-3 bg-slate-900 rounded-lg border border-white/5 flex items-center gap-4">
                           <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs">T</div>
                           <div className="flex-1">
                              <div className="text-white text-sm font-bold">INV/2025/TKP/001</div>
                              <div className="text-[10px] text-gray-500">Tokopedia • SiCepat</div>
                           </div>
                           <div className="text-green-400 text-xs font-bold">Baru</div>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-white/5 flex items-center gap-4">
                           <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs">S</div>
                           <div className="flex-1">
                              <div className="text-white text-sm font-bold">220911JKT09</div>
                              <div className="text-[10px] text-gray-500">Shopee • J&T</div>
                           </div>
                           <div className="text-blue-400 text-xs font-bold">Pack</div>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-white/5 flex items-center gap-4">
                           <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-xs border border-gray-500">T</div>
                           <div className="flex-1">
                              <div className="text-white text-sm font-bold">TT-8821-00</div>
                              <div className="text-[10px] text-gray-500">TikTok • JNE</div>
                           </div>
                           <div className="text-yellow-400 text-xs font-bold">Kirim</div>
                        </div>
                     </div>
                  </div>
                  
                  {/* Decoration */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-[80px] -z-10"></div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-[80px] -z-10"></div>
               </div>
            </div>
         </div>
      </section>

       {/* CTA */}
       <section className="py-20 text-center container mx-auto px-6">
        <GlassCard className="max-w-4xl mx-auto p-12 relative overflow-hidden bg-gradient-to-br from-slate-900 to-blue-900/30 border-blue-500/20">
           <div className="relative z-10">
              <ShoppingBag size={48} className="text-blue-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-6">Siap Ekspansi ke Online?</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                 Kelola ribuan pesanan dari berbagai marketplace tanpa takut stok berantakan. Aktifkan modul Omnichannel SIBOS sekarang.
              </p>
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-900/50 flex items-center gap-2 mx-auto">
                  Mulai Integrasi
                  <ArrowRight size={20} />
              </button>
           </div>
        </GlassCard>
      </section>

    </div>
  );
};