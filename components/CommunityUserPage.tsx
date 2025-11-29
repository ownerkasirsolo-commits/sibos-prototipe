
import React from 'react';
import { Sparkles, ShoppingBag, ArrowRight, Lightbulb, Users, CheckCircle, AlertTriangle } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

export const CommunityUserPage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 animate-in fade-in duration-500">
      
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold tracking-widest uppercase mb-6">
            <Sparkles size={12} />
            SOLUSI UNTUK UMKM
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Bukan Lagi Kuli <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-300">
              Administrasi.
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light mb-12">
            Kami tahu betapa rumitnya menjalankan bisnis kecil. Lupakan rekap manual, stok berantakan, dan laporan keuangan yang bikin pusing. SIBOS membebaskan Anda.
          </p>
          <div className="flex justify-center">
            <button className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold shadow-lg shadow-purple-900/40 flex items-center gap-2">
              Rasakan Perbedaannya
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* The Problem & Solution */}
      <section className="py-16 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
           <div>
              <h2 className="text-3xl font-bold text-white mb-6">Tirani Software Lama</h2>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                Anda dipaksa membeli fitur yang tidak dibutuhkan, membayar biaya langganan yang terus naik, dan terjebak dengan vendor yang sulit dihubungi. Ini bukan membantu, ini menjebak.
              </p>
              <div className="p-4 bg-red-900/20 border-l-4 border-red-500 rounded-r-xl mb-6">
                 <div className="flex items-center gap-2 text-red-400 font-bold mb-1"><AlertTriangle size={16}/> Masalah Umum</div>
                 <p className="text-sm text-gray-400">"Biaya mahal, fitur rumit, data terpisah, support lambat."</p>
              </div>
              <p className="text-gray-300 leading-relaxed">
                SIBOS adalah jawaban dari jeritan UMKM. Kami membangun solusi yang benar-benar Anda butuhkan, bukan yang ingin kami jual.
              </p>
           </div>
           <div className="relative">
               <GlassCard className="border-t-4 border-t-sibos-orange relative z-10 bg-slate-900">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><Lightbulb className="text-sibos-orange"/> Solusi SIBOS</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                      Kami fokus pada inti bisnis Anda. Dengan modul yang terintegrasi dan dukungan AI, Anda bisa fokus pada pertumbuhan, bukan kerumitan.
                  </p>
                  <div className="space-y-3">
                      <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
                          <CheckCircle size={18} className="text-green-500" />
                          <span className="text-sm text-gray-300">POS Fleksibel (Retail & F&B)</span>
                      </div>
                      <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
                          <CheckCircle size={18} className="text-green-500" />
                          <span className="text-sm text-gray-300">Stok & Akuntansi Otomatis</span>
                      </div>
                      <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
                          <CheckCircle size={18} className="text-green-500" />
                          <span className="text-sm text-gray-300">Manajemen Karyawan (HRM)</span>
                      </div>
                  </div>
               </GlassCard>
               <div className="absolute -top-5 -right-5 w-20 h-20 bg-sibos-orange/20 rounded-full blur-xl -z-10"></div>
           </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-slate-900 border-t border-white/5">
          <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold text-white mb-12">Manfaat Langsung untuk Bisnis Anda</h2>
              <div className="grid md:grid-cols-3 gap-8">
                  <GlassCard hoverEffect={true}>
                      <div className="text-4xl font-bold text-white mb-2">Simple</div>
                      <div className="text-xs text-gray-400 uppercase tracking-widest mb-4">Mudah Digunakan</div>
                      <p className="text-sm text-gray-500">Antarmuka intuitif, bahkan untuk yang awam teknologi sekalipun. Siap pakai dalam hitungan menit.</p>
                  </GlassCard>
                  <GlassCard hoverEffect={true}>
                      <div className="text-4xl font-bold text-white mb-2">Powerful</div>
                      <div className="text-xs text-gray-400 uppercase tracking-widest mb-4">Fitur Terintegrasi</div>
                      <p className="text-sm text-gray-500">POS, Stok, Akuntansi, CRM, HRM, AI. Semua data saling terhubung dan otomatis.</p>
                  </GlassCard>
                  <GlassCard hoverEffect={true}>
                      <div className="text-4xl font-bold text-white mb-2">Support</div>
                      <div className="text-xs text-gray-400 uppercase tracking-widest mb-4">Dukungan Komunitas</div>
                      <p className="text-sm text-gray-500">Anda tidak sendirian. Ratusan partner wilayah siap membantu di kota Anda.</p>
                  </GlassCard>
              </div>
              <button className="mt-12 px-10 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl">
                  Mulai Gunakan SIBOS Gratis
              </button>
          </div>
      </section>

    </div>
  );
};
