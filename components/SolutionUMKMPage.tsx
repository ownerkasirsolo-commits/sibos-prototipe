
import React from 'react';
import { 
  Store, Smartphone, WifiOff, BookOpen, 
  TrendingUp, AlertTriangle, ArrowRight, CheckCircle2, 
  Zap, Package, ShoppingCart
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { Page } from '../types';

interface SolutionUMKMPageProps {
    onNavigate?: (page: Page) => void;
}

export const SolutionUMKMPage: React.FC<SolutionUMKMPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 animate-in fade-in duration-500">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596767672528-9c4c700344b4?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wider mb-8 shadow-lg shadow-emerald-900/20 backdrop-blur-md">
            <Store size={14} />
            SAHABAT UMKM INDONESIA
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
            Dari Gerobak Menjadi Raksasa. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              Mimpi Anda Valid.
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md mb-10">
            Jangan mau selamanya kecil. Mulai rapikan bisnis Anda dengan teknologi yang kami sederhanakan. Tidak perlu komputer mahal, cukup HP Android di tangan Anda.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4">
             <button 
                onClick={() => onNavigate && onNavigate('pos')}
                className="px-8 py-4 bg-gradient-to-r from-sibos-orange to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-orange-900/50 flex items-center justify-center gap-2"
             >
                <Smartphone size={20} /> Download Aplikasi (Gratis)
             </button>
             <button 
                onClick={() => onNavigate && onNavigate('community-user')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all border border-white/10 flex items-center justify-center gap-2"
             >
                <BookOpen size={20} /> Belajar Bisnis
             </button>
          </div>
        </div>
      </section>

      {/* PAIN POINTS & SOLUTION */}
      <section className="py-20 container mx-auto px-6">
         <div className="grid md:grid-cols-2 gap-16 items-center">
             <div>
                 <h2 className="text-3xl font-bold text-white mb-6">Penyakit Lama Warung Kecil</h2>
                 <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    Banyak usaha kecil gulung tikar bukan karena tidak laku, tapi karena manajemen yang berantakan dan uang yang tercampur.
                 </p>
                 <div className="space-y-4">
                     <div className="p-4 bg-slate-900 rounded-xl border border-white/5 flex gap-4">
                         <div className="mt-1 p-2 bg-red-500/10 rounded-lg text-red-400 h-fit"><AlertTriangle size={20} /></div>
                         <div>
                             <h4 className="text-white font-bold mb-1">Buku Kas Lecek & Hilang</h4>
                             <p className="text-sm text-gray-400">Mencatat hutang tetangga di buku tulis? Kena air, hilang, atau lupa taruh. Uang pun melayang.</p>
                         </div>
                     </div>
                     <div className="p-4 bg-slate-900 rounded-xl border border-white/5 flex gap-4">
                         <div className="mt-1 p-2 bg-red-500/10 rounded-lg text-red-400 h-fit"><TrendingUp size={20} /></div>
                         <div>
                             <h4 className="text-white font-bold mb-1">Dompet Campur Aduk</h4>
                             <p className="text-sm text-gray-400">Uang modal dipakai belanja sayur rumah. Akhirnya modal habis, tidak bisa kulakan lagi.</p>
                         </div>
                     </div>
                 </div>
             </div>
             
             <div className="relative">
                 <GlassCard className="border-t-4 border-t-emerald-500 relative z-10 !bg-slate-900 shadow-2xl">
                     <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <CheckCircle2 className="text-emerald-500"/> Solusi SIBOS UMKM
                     </h3>
                     <ul className="space-y-4">
                         {[
                             "Aplikasi Ringan (Hemat Memori HP)",
                             "Mode Offline (Hemat Kuota Internet)",
                             "Catat Kasbon / Hutang Pelanggan",
                             "Laporan Harian (Omzet vs Modal)",
                             "Cetak Struk Pakai Printer Bluetooth Murah"
                         ].map((item, i) => (
                             <li key={i} className="flex items-center gap-3 text-gray-300 p-3 bg-white/5 rounded-lg border border-white/5">
                                 <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                                 {item}
                             </li>
                         ))}
                     </ul>
                 </GlassCard>
                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-[80px] -z-10"></div>
             </div>
         </div>
      </section>

      {/* CORE FEATURES SHOWCASE */}
      <section className="py-20 bg-slate-900 border-y border-white/5">
          <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-white mb-4">Fitur Canggih yang Disederhanakan</h2>
                  <p className="text-gray-400">Kami menyembunyikan kerumitan di belakang layar. Anda cukup tekan tombol-tombol besar.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  {/* Smartphone First */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-emerald-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                          <Smartphone size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Cukup Pakai HP</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          Tidak perlu beli komputer kasir jutaan rupiah. Gunakan HP Android yang Anda miliki sekarang. Bisa dipakai sambil keliling atau jaga warung.
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 flex items-center justify-center">
                          <div className="w-16 h-24 bg-black border-2 border-gray-700 rounded-lg flex flex-col items-center pt-2">
                              <div className="w-8 h-1 bg-gray-700 rounded-full mb-2"></div>
                              <div className="w-12 h-16 bg-emerald-900/50 rounded flex items-center justify-center text-[8px] text-emerald-400">SIBOS</div>
                          </div>
                      </div>
                  </div>

                  {/* Kasir Lite */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-teal-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-500 mb-6 group-hover:scale-110 transition-transform">
                          <Zap size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Mode Kasir Lite</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          Tampilan super simpel. Tombol produk besar-besar. Ada kalkulator uang kembalian. Anti-pusing untuk yang baru belajar teknologi.
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 p-2 grid grid-cols-2 gap-2">
                          <div className="bg