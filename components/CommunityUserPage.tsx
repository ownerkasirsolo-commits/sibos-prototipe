
import React from 'react';
import { Sparkles, ArrowRight, Lightbulb, CheckCircle, AlertTriangle, Sword, Unlock, Shield, Zap } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

export const CommunityUserPage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 animate-in fade-in duration-500">
      
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black"></div>
        {/* Animated Particles/Sparks */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-purple-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 right-20 w-3 h-3 bg-fuchsia-500 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold tracking-widest uppercase mb-6">
            <Sword size={12} />
            SENJATA RAKYAT KECIL
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Berhenti Jadi Kuli <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-300">
              Administrasi.
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light mb-12">
            Anda membangun bisnis untuk mengejar mimpi dan memberi nafkah keluarga, bukan untuk tenggelam dalam nota kusut dan stok opname yang tak pernah klop. SIBOS bukan sekadar alat; SIBOS adalah senjata untuk memerdekakan waktu Anda.
          </p>
          <div className="flex justify-center">
            <button className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold shadow-lg shadow-purple-900/40 flex items-center gap-2 transition-transform hover:-translate-y-1">
              Merdekakan Bisnis Anda
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* The Problem & Solution */}
      <section className="py-16 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
           <div>
              <h2 className="text-3xl font-bold text-white mb-6">Lawan Tirani "Upeti Digital"</h2>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed text-justify">
                Aplikasi kasir "Startup Unicorn" datang bak pahlawan, tapi lama-kelamaan bertingkah seperti preman pasar digital. Biaya langganan dinaikkan diam-diam, fitur penting dikunci satu per satu, dan data pelanggan Anda disandera.
              </p>
              <div className="p-6 bg-red-900/10 border-l-4 border-red-500 rounded-r-xl mb-8 hover:bg-red-900/20 transition-colors">
                 <div className="flex items-center gap-2 text-red-400 font-bold mb-3"><AlertTriangle size={20}/> Perangkap Korporat</div>
                 <p className="text-sm text-gray-300 italic leading-relaxed">
                    "Strategi 'Bakar Uang' mereka adalah jebakan. Mereka memberi harga murah di awal untuk mematikan pesaing lokal. Setelah Anda ketergantungan dan tidak punya pilihan, mereka mencekik leher Anda dengan biaya selangit. Itu adalah penjajahan gaya baru."
                 </p>
              </div>
              <p className="text-gray-300 leading-relaxed text-justify font-medium">
                SIBOS hadir untuk memutus rantai upeti ini. Kami memberikan teknologi kelas enterprise dengan harga "warung kopi". Karena teknologi canggih adalah <strong>hak asasi pengusaha</strong>, bukan hak istimewa konglomerat.
              </p>
           </div>
           
           <div className="relative">
               <div className="absolute inset-0 bg-purple-600/20 blur-[100px] rounded-full"></div>
               <GlassCard className="border-t-4 border-t-purple-500 relative z-10 bg-slate-900/90 shadow-2xl">
                  <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                      <Unlock className="text-purple-400"/> Pembebasan Ala SIBOS
                  </h3>
                  
                  <div className="space-y-6">
                      <div className="p-5 bg-slate-800/50 rounded-xl flex items-start gap-5 hover:bg-slate-800 transition-colors border border-white/5">
                          <div className="mt-1 p-2 bg-green-500/10 rounded-lg text-green-400">
                             <Zap size={20} />
                          </div>
                          <div>
                              <h4 className="text-white font-bold text-base mb-1">Otomatisasi Total</h4>
                              <p className="text-sm text-gray-400 leading-relaxed">Stok berkurang sendiri saat laku. Laporan laba rugi & neraca jadi sendiri saat Anda tidur. Pecat kalkulator Anda.</p>
                          </div>
                      </div>
                      
                      <div className="p-5 bg-slate-800/50 rounded-xl flex items-start gap-5 hover:bg-slate-800 transition-colors border border-white/5">
                          <div className="mt-1 p-2 bg-blue-500/10 rounded-lg text-blue-400">
                             <Shield size={20} />
                          </div>
                          <div>
                              <h4 className="text-white font-bold text-base mb-1">Omnichannel Tanpa Ribet</h4>
                              <p className="text-sm text-gray-400 leading-relaxed">Jualan di Tokopedia, Shopee, TikTok, dan Toko Fisik sekaligus. Stok sinkron otomatis. Satu layar untuk menguasai semua pasar.</p>
                          </div>
                      </div>
                      
                      <div className="p-5 bg-slate-800/50 rounded-xl flex items-start gap-5 hover:bg-slate-800 transition-colors border border-white/5">
                          <div className="mt-1 p-2 bg-purple-500/10 rounded-lg text-purple-400">
                             <Lightbulb size={20} />
                          </div>
                          <div>
                              <h4 className="text-white font-bold text-base mb-1">Anti-Boncos AI</h4>
                              <p className="text-sm text-gray-400 leading-relaxed">Asisten cerdas yang menegur Anda: "Bos, stok tepung mau basi 3 hari lagi, segera diskon!" atau "Besok hujan, jangan stok es batu banyak-banyak."</p>
                          </div>
                      </div>
                  </div>
               </GlassCard>
           </div>
        </div>
      </section>

      {/* Philosophy Closing */}
      <section className="py-24 bg-slate-900 border-t border-white/5">
          <div className="container mx-auto px-6 text-center max-w-5xl">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Ambil Kembali Waktu Anda</h2>
              <p className="text-gray-400 text-xl leading-relaxed mb-16 max-w-3xl mx-auto">
                  Waktu Anda terlalu berharga untuk dihabiskan menghitung stok beras atau merekap nota yang hilang di laci. Gunakan waktu itu untuk inovasi, untuk mencium kening anak Anda, atau untuk beribadah. Biarkan mesin SIBOS yang mengurus sisanya.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-16">
                  <div className="p-8 bg-white/5 rounded-3xl border border-white/5 hover:border-purple-500/30 transition-colors">
                      <div className="text-4xl font-black text-purple-400 mb-3">0%</div>
                      <div className="text-lg font-bold text-white mb-2">Stress Administrasi</div>
                      <div className="text-sm text-gray-400">Kepala dingin, hati tenang.</div>
                  </div>
                  <div className="p-8 bg-white/5 rounded-3xl border border-white/5 hover:border-purple-500/30 transition-colors">
                      <div className="text-4xl font-black text-purple-400 mb-3">100%</div>
                      <div className="text-lg font-bold text-white mb-2">Kontrol Bisnis</div>
                      <div className="text-sm text-gray-400">Data real-time di genggaman.</div>
                  </div>
                  <div className="p-8 bg-white/5 rounded-3xl border border-white/5 hover:border-purple-500/30 transition-colors">
                      <div className="text-4xl font-black text-purple-400 mb-3">24/7</div>
                      <div className="text-lg font-bold text-white mb-2">Sistem Bekerja</div>
                      <div className="text-sm text-gray-400">Bahkan saat Anda tertidur.</div>
                  </div>
              </div>
              
              <button className="px-12 py-5 bg-white text-slate-950 rounded-full font-black text-xl hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                  Mulai Revolusi Bisnis Anda
              </button>
          </div>
      </section>

    </div>
  );
};
