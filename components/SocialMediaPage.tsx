
import React from 'react';
import { 
  MessageCircle, Share2, Video, Heart, 
  Send, Users, Zap, TrendingUp, Globe,
  Instagram, Facebook, Twitter, Youtube, ArrowRight
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { Page } from '../types';

interface SocialMediaPageProps {
    onNavigate?: (page: Page) => void;
}

export const SocialMediaPage: React.FC<SocialMediaPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 animate-in fade-in duration-500">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950"></div>
        </div>
        
        {/* Animated Icons Background */}
        <div className="absolute top-20 left-20 text-pink-500 opacity-20 animate-pulse"><Instagram size={64} /></div>
        <div className="absolute bottom-20 right-20 text-blue-500 opacity-20 animate-pulse"><Facebook size={64} /></div>
        <div className="absolute top-1/3 right-1/4 text-red-500 opacity-20 animate-pulse"><Youtube size={64} /></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold tracking-wider mb-8 shadow-lg shadow-pink-900/20 backdrop-blur-md">
            <Share2 size={14} />
            SOCIAL COMMERCE REVOLUTION
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
            Dominasi Feed, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
              Kuasai Pasar.
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md mb-10">
            Media sosial bukan tempat main-main, tapi medan pertempuran brand awareness dan penjualan. Jangan biarkan komentar "Cek Harga Gan" hilang ditelan notifikasi. Ubah setiap interaksi menjadi transaksi.
          </p>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="py-20 container mx-auto px-6">
         <div className="grid md:grid-cols-3 gap-8">
            
            <GlassCard className="group hover:border-pink-500/50 transition-colors h-full">
               <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mb-6 shadow-lg shadow-pink-900/40 group-hover:scale-110 transition-transform">
                  <MessageCircle size={28} className="text-white" />
               </div>
               <h3 className="text-2xl font-bold text-white mb-3">Unified Inbox (Satu Pintu)</h3>
               <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Hentikan kegilaan berpindah-pindah aplikasi. Balas DM Instagram, Messenger, TikTok, dan WhatsApp dalam satu layar dashboard yang terintegrasi.
               </p>
               <div className="flex gap-2">
                  <div className="p-1.5 bg-white/10 rounded-lg"><Instagram size={14}/></div>
                  <div className="p-1.5 bg-white/10 rounded-lg"><Facebook size={14}/></div>
                  <div className="p-1.5 bg-white/10 rounded-lg"><MessageCircle size={14}/></div>
               </div>
            </GlassCard>

            <GlassCard className="group hover:border-purple-500/50 transition-colors h-full">
               <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mb-6 shadow-lg shadow-purple-900/40 group-hover:scale-110 transition-transform">
                  <Video size={28} className="text-white" />
               </div>
               <h3 className="text-2xl font-bold text-white mb-3">Live Shopping Tools</h3>
               <p className="text-gray-400 text-sm leading-relaxed">
                  Jualan saat Live Streaming tanpa admin pencatat manual. Komentar "Fix Produk A" otomatis ditangkap sistem dan menjadi invoice yang siap bayar.
               </p>
            </GlassCard>

            <GlassCard className="group hover:border-blue-500/50 transition-colors h-full">
               <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-900/40 group-hover:scale-110 transition-transform">
                  <Zap size={28} className="text-white" />
               </div>
               <h3 className="text-2xl font-bold text-white mb-3">Content Automation</h3>
               <p className="text-gray-400 text-sm leading-relaxed">
                  Jadwal posting otomatis ke semua platform. Gunakan AI Caption Generator SIBOS untuk membuat deskripsi yang memikat dan viral.
               </p>
            </GlassCard>

         </div>
      </section>

      {/* INTERACTIVE DEMO VISUAL */}
      <section className="py-24 bg-slate-900 border-y border-white/5 overflow-hidden">
         <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
               
               <div className="lg:w-1/2">
                  <h2 className="text-3xl font-bold text-white mb-6">Jangan Biarkan "Leads" Dingin</h2>
                  <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                     Kecepatan respon adalah kunci closing di media sosial. SIBOS Social memberikan notifikasi real-time dan fitur <strong>Quick Reply</strong> berbasis template untuk pertanyaan umum.
                  </p>
                  
                  <div className="space-y-4">
                     <div className="flex items-center gap-4 p-4 bg-slate-800 rounded-xl border border-white/5">
                        <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white"><Instagram size={20}/></div>
                        <div className="flex-1">
                           <div className="text-white font-bold text-sm">@pelanggan_setia</div>
                           <div className="text-gray-400 text-xs">Min, stok gamis warna sage masih ada?</div>
                        </div>
                        <button className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded">Balas Cepat</button>
                     </div>
                     
                     <div className="flex items-center gap-4 p-4 bg-slate-800 rounded-xl border border-white/5">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white"><Facebook size={20}/></div>
                        <div className="flex-1">
                           <div className="text-white font-bold text-sm">Budi Santoso</div>
                           <div className="text-gray-400 text-xs">Lokasi tokonya dimana ya gan?</div>
                        </div>
                        <button className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded">Kirim Map</button>
                     </div>
                  </div>
               </div>

               <div className="lg:w-1/2 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-3xl rounded-full"></div>
                  <GlassCard className="relative z-10 !bg-slate-950/80 border-pink-500/30">
                     <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                        <div className="font-bold text-white flex items-center gap-2">
                           <TrendingUp className="text-green-400" /> Konversi Sosmed
                        </div>
                        <div className="text-xs text-gray-400">7 Hari Terakhir</div>
                     </div>
                     
                     <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-4 bg-slate-900 rounded-lg">
                           <div className="text-xs text-gray-500 mb-1">Total Chat Masuk</div>
                           <div className="text-2xl font-bold text-white">1,204</div>
                        </div>
                        <div className="p-4 bg-slate-900 rounded-lg border border-green-500/20">
                           <div className="text-xs text-gray-500 mb-1">Closing Rate</div>
                           <div className="text-2xl font-bold text-green-400">28.5%</div>
                        </div>
                     </div>

                     <div className="h-40 flex items-end justify-between gap-2">
                        {[40, 60, 45, 80, 55, 90, 70].map((h, i) => (
                           <div key={i} className="w-full bg-gradient-to-t from-pink-900/50 to-pink-500 rounded-t-sm relative group" style={{height: `${h}%`}}>
                              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                 {h}
                              </div>
                           </div>
                        ))}
                     </div>
                  </GlassCard>
               </div>

            </div>
         </div>
      </section>

    </div>
  );
};
