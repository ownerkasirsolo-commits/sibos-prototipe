
import React from 'react';
import { Code, Terminal, Database, GitMerge, Shield, Server, Cpu, Layers } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

export const CommunityDeveloperPage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 animate-in fade-in duration-500">
      
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6">
            <Terminal size={12} />
            CORE SYSTEM ARCHITECT
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Bangun Jantungnya, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Bukan Sekadar Kulitnya.
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light mb-12">
            Di fase awal ini, SIBOS tidak mencari pembuat plugin atau tema. Kami memanggil para *engineer* terbaik untuk membangun **Infrastruktur Utama**. Kita tidak sedang menempelkan stiker pada mobil orang lain, kita sedang merakit mesinnya dari nol agar tahan banting digunakan jutaan UMKM.
          </p>
        </div>
      </section>

      {/* Core Contributions */}
      <section className="py-16 container mx-auto px-6">
         <div className="grid md:grid-cols-3 gap-8">
             <GlassCard className="group hover:border-blue-500/50 transition-colors h-full flex flex-col">
                 <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-900/20">
                     <Server size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-4">Core Optimization</h3>
                 <p className="text-gray-400 text-sm leading-relaxed text-justify mb-4">
                     Tugas Anda adalah memastikan kode inti SIBOS berjalan efisien di infrastruktur minimal. Optimasi query database, manajemen memori, dan arsitektur backend yang *scalable*. Ini adalah pekerjaan sunyi yang dampaknya dirasakan jutaan user.
                 </p>
                 <p className="text-gray-500 text-xs mt-auto italic border-l-2 border-blue-500 pl-3">
                     "Memastikan kasir tidak lag saat ribuan transaksi terjadi bersamaan."
                 </p>
             </GlassCard>

             <GlassCard className="group hover:border-purple-500/50 transition-colors h-full flex flex-col">
                 <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-purple-900/20">
                     <Layers size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-4">Fitur Native</h3>
                 <p className="text-gray-400 text-sm leading-relaxed text-justify mb-4">
                     Jangan buat plugin terpisah. Bangun fitur tersebut langsung ke dalam jantung SIBOS. Entah itu modul Manufaktur, HRM, atau Akuntansi. Kode Anda akan menjadi standar yang digunakan oleh seluruh ekosistem, bukan opsional.
                 </p>
                 <p className="text-gray-500 text-xs mt-auto italic border-l-2 border-purple-500 pl-3">
                     "Membangun fitur yang menjadi DNA dari sistem itu sendiri."
                 </p>
             </GlassCard>

             <GlassCard className="group hover:border-green-500/50 transition-colors h-full flex flex-col">
                 <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center text-green-400 mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-green-900/20">
                     <GitMerge size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-4">Bounty & Insentif</h3>
                 <p className="text-gray-400 text-sm leading-relaxed text-justify mb-4">
                     Setiap *Pull Request* yang diterima, setiap *Bug Fix* yang valid, dan setiap modul yang diintegrasikan akan dihargai. Kami memiliki skema insentif khusus bagi para kontributor yang membangun pondasi rumah bersama ini.
                 </p>
                 <p className="text-gray-500 text-xs mt-auto italic border-l-2 border-green-500 pl-3">
                     "Kode Anda adalah investasi saham intelektual di masa depan SIBOS."
                 </p>
             </GlassCard>
         </div>
      </section>

      {/* Philosophy & Impact Section */}
      <section className="py-20 bg-slate-900 border-y border-white/5">
          <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                  <div className="inline-flex items-center gap-2 text-blue-400 font-bold mb-6 tracking-wide text-sm">
                      <Shield size={16} /> GUARDIANS OF THE CODE
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                      Satu Repositori, <br/> <span className="text-blue-500">Satu Visi Besar.</span>
                  </h2>
                  <p className="text-gray-400 text-lg leading-relaxed mb-6 text-justify">
                      Program plugin pihak ketiga adalah masa depan. Saat ini, fokus kita adalah <strong>Konsolidasi</strong>. Kita butuh fondasi beton yang kuat sebelum membangun gedung pencakar langit di atasnya.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed mb-10 text-justify font-medium">
                      Developer di ekosistem SIBOS saat ini adalah "Core Team Extended". Anda memiliki akses untuk mempengaruhi arah teknis platform. Kode yang Anda tulis hari ini akan menjadi tulang punggung ekonomi digital kerakyatan di masa depan.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold border border-white/10 transition-all flex items-center gap-3 group">
                        <Code size={18} className="text-blue-400 group-hover:text-white transition-colors"/>
                        Lihat Roadmap Teknis
                    </button>
                    <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-900/40 transition-all">
                        Kontribusi Sekarang
                    </button>
                  </div>
              </div>
              
              <div className="lg:w-1/2 w-full">
                  <div className="bg-slate-950 rounded-2xl border border-white/10 p-8 font-mono text-xs md:text-sm text-gray-300 shadow-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                          <Database size={180} />
                      </div>
                      
                      {/* Code Snippet Visual */}
                      <div className="flex gap-2 mb-6 border-b border-white/5 pb-4">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="space-y-4 relative z-10">
                          <p className="text-gray-500 italic">// Core Infrastructure: Priority High</p>
                          <p>
                              <span className="text-purple-400">class</span> <span className="text-yellow-300">SibosCore</span> <span className="text-purple-400">extends</span> <span className="text-yellow-300">EconomicEngine</span> &#123;
                          </p>
                          <div className="pl-6 space-y-2 border-l border-white/10">
                              <p><span className="text-blue-400">constructor</span>() &#123;</p>
                              <p>&nbsp;&nbsp;<span className="text-cyan-400">this</span>.security = <span className="text-orange-400">"Military Grade"</span>;</p>
                              <p>&nbsp;&nbsp;<span className="text-cyan-400">this</span>.scalability = <span className="text-orange-400">"Infinite"</span>;</p>
                              <p>&nbsp;&nbsp;<span className="text-cyan-400">this</span>.mission = <span className="text-green-300">"Empower UMKM"</span>;</p>
                              <p>&#125;</p>
                              <p>&nbsp;</p>
                              <p><span className="text-blue-400">async</span> buildFoundation() &#123;</p>
                              <p>&nbsp;&nbsp;<span className="text-gray-500">// Your code goes here...</span></p>
                              <p>&nbsp;&nbsp;<span className="text-purple-400">await</span> deployToCommunity();</p>
                              <p>&#125;</p>
                          </div>
                          <p>&#125;</p>
                          
                          <div className="mt-6 pt-4 border-t border-dashed border-white/10 text-center">
                              <span className="inline-block px-3 py-1 bg-blue-900/30 text-blue-400 rounded text-[10px] font-bold uppercase tracking-wider">
                                  Status: Recruiting Core Builders
                              </span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

    </div>
  );
};
