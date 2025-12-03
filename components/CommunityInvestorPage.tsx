
import React from 'react';
import { TrendingUp, Shield, Users, PieChart, ArrowRight, AlertTriangle, Scale, Lock, Anchor } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

export const CommunityInvestorPage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 animate-in fade-in duration-500">
      
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold tracking-widest uppercase mb-6">
            <TrendingUp size={12} />
            GERAKAN KEDAULATAN EKONOMI
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Kami Menolak <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
              Didikte Modal Asing.
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light mb-12">
            SIBOS bukanlah startup "Unicorn" plastik yang dibakar uangnya hanya untuk mematikan pasar lalu dijual ke pemodal asing (Exit Strategy). SIBOS adalah aset abadi komunitas. Kami membangun benteng ekonomi, bukan sekadar aplikasi kasir. Ini adalah perlawanan terhadap hegemoni kapitalisme digital yang menghisap darah UMKM melalui biaya layanan yang mencekik.
          </p>
          <div className="flex justify-center">
            <button className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold shadow-lg shadow-green-900/40 flex items-center gap-2 transition-transform hover:scale-105">
              Bergabung Dalam Barisan
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-16 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
           <div>
              <h2 className="text-3xl font-bold text-white mb-6">Doktrin "Guardian Share"</h2>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed text-justify">
                Sejarah mencatat banyak startup idealis yang hancur setelah foundernya kehilangan kendali saham (dilusi). Saat Venture Capital (VC) raksasa masuk dan menguasai mayoritas suara, misi sosial akan langsung dibuang demi mengejar profit jangka pendek. Tarif dinaikkan, fitur gratis dihapus, dan user diperas.
              </p>
              <div className="p-5 bg-blue-900/20 border-l-4 border-blue-500 rounded-r-xl mb-8">
                 <div className="flex items-center gap-2 text-blue-400 font-bold mb-2"><Anchor size={20}/> The Iron Dome Strategy</div>
                 <p className="text-sm text-gray-300 italic leading-relaxed">
                    "Agar kapal ini tidak dibajak penumpang gelap di tengah samudra, Nahkoda harus memegang kemudi penuh. Founder & Core Team wajib memegang kendali mayoritas mutlak (67%) sebagai <strong>Hak Veto</strong>. Ini bukan tentang keserakahan kepemilikan, tapi tentang <strong>Proteksi Visi</strong> agar SIBOS selamanya berjalan di rel ekonomi kerakyatan dan haram dijual ke pihak asing."
                 </p>
              </div>
              <p className="text-gray-300 leading-relaxed text-justify">
                Dengan struktur ini, Founder bertindak sebagai <em>Guardian</em> (Penjaga). Meskipun ditawar Triliunan Rupiah, jika itu merugikan komunitas, Founder memiliki kuasa mutlak untuk berkata: <strong>TIDAK.</strong>
              </p>
           </div>
           
           <div className="relative">
               <GlassCard className="border-green-500/30 bg-slate-900/80">
                  <div className="flex items-center justify-between mb-8">
                      <div>
                         <div className="text-gray-400 text-xs uppercase tracking-widest font-bold">Struktur Kedaulatan</div>
                         <div className="text-3xl font-bold text-white mt-1">Distribusi Saham</div>
                         <div className="text-[10px] text-green-400 mt-1 flex items-center gap-1"><Lock size={10}/> Anti-Takeover Protection Active</div>
                      </div>
                      <Shield size={48} className="text-green-500" />
                  </div>
                  <div className="space-y-6">
                      {/* Founder */}
                      <div>
                          <div className="flex justify-between text-sm text-gray-300 mb-1 font-bold">
                             <span>Founder (Guardian of Vision)</span>
                             <span className="text-orange-500">47%</span>
                          </div>
                          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                              <div className="bg-orange-500 h-3 rounded-full w-[47%] shadow-[0_0_15px_rgba(249,115,22,0.6)]"></div>
                          </div>
                          <p className="text-[10px] text-gray-500 mt-1">Pemegang hak veto mutlak. Penjaga ideologi & arah masa depan.</p>
                      </div>

                      {/* Core Team */}
                      <div>
                          <div className="flex justify-between text-sm text-gray-300 mb-1 font-bold">
                             <span>Core Team (5-7 Orang Kunci)</span>
                             <span className="text-blue-400">20%</span>
                          </div>
                          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                              <div className="bg-blue-500 h-3 rounded-full w-[20%] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                          </div>
                          <p className="text-[10px] text-gray-500 mt-1">Eksekutor teknis & operasional harian. Garda terdepan inovasi.</p>
                      </div>

                      {/* Investor */}
                      <div>
                          <div className="flex justify-between text-sm text-gray-300 mb-1 font-bold">
                             <span>Investor Komunitas (Crowd)</span>
                             <span className="text-green-400">23%</span>
                          </div>
                          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                              <div className="bg-green-500 h-3 rounded-full w-[23%] shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                          </div>
                          <p className="text-[10px] text-gray-500 mt-1">Masyarakat umum, user, & supporter yang menikmati dividen.</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                          {/* Partner */}
                          <div>
                              <div className="flex justify-between text-sm text-gray-300 mb-1 font-bold">
                                 <span>Partner Regional</span>
                                 <span className="text-purple-400">5%</span>
                              </div>
                              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                  <div className="bg-purple-500 h-2 rounded-full w-[100%]"></div>
                              </div>
                              <p className="text-[10px] text-gray-500 mt-1">Apresiasi pejuang lapangan.</p>
                          </div>
                          {/* Reserve */}
                          <div>
                              <div className="flex justify-between text-sm text-gray-300 mb-1 font-bold">
                                 <span>Cadangan (Reserve)</span>
                                 <span className="text-slate-400">5%</span>
                              </div>
                              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                  <div className="bg-slate-400 h-2 rounded-full w-[100%]"></div>
                              </div>
                              <p className="text-[10px] text-gray-500 mt-1">Dana darurat & stabilitas.</p>
                          </div>
                      </div>
                  </div>
               </GlassCard>
           </div>
        </div>
      </section>

    </div>
  );
};
