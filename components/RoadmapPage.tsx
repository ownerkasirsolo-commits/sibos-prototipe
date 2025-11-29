import React from 'react';
import { Rocket, Globe, Cpu, Users, Radio, CheckCircle2, CircleDashed } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

export const RoadmapPage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 animate-in fade-in duration-500">
      <section className="relative py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-sibos-orange/10 rounded-full blur-[120px]"></div>
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6 shadow-lg">
                <Radio size={12} className="animate-pulse" />
                Strategic Plan
             </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Peta Jalan <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Masa Depan SIBOS
              </span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Kami tidak hanya membangun aplikasi untuk hari ini. Ini adalah rencana kami untuk mendominasi teknologi ritel berbasis komunitas hingga tahun-tahun mendatang.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Center Line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-white/5 md:-translate-x-1/2 rounded-full"></div>

            <div className="space-y-16">
              
              {/* Phase 1: Rebirth */}
              <div className="relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center group">
                <div className="md:w-1/2 md:pr-16 md:text-right pl-20 md:pl-0">
                  <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded text-xs font-bold mb-2 border border-green-500/20">SELESAI</span>
                  <h3 className="text-2xl font-bold text-white mb-2">Q3 2025: Konsolidasi</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Pembentukan ulang tim inti PT Mesin Kasir Solo. Finalisasi konsep bisnis komunitas (Anti-Paus). Pembersihan kode lama (Refactoring) dan migrasi ke arsitektur Cloud modern.
                  </p>
                </div>
                
                <div className="absolute left-[12px] md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-green-500 border-4 border-slate-900 shadow-[0_0_20px_rgba(34,197,94,0.5)] z-20 flex items-center justify-center">
                    <CheckCircle2 size={16} className="text-black" />
                </div>

                <div className="hidden md:block md:w-1/2 pl-16">
                   <div className="h-px w-20 bg-gradient-to-r from-green-500/50 to-transparent"></div>
                </div>
              </div>

              {/* Phase 2: Community Beta */}
              <div className="relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center group">
                <div className="hidden md:block md:w-1/2 pr-16 text-right">
                   <div className="h-px w-20 bg-gradient-to-l from-sibos-orange/50 to-transparent ml-auto"></div>
                </div>

                <div className="absolute left-[12px] md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-sibos-orange border-4 border-slate-900 shadow-[0_0_20px_rgba(255,107,0,0.5)] z-20 flex items-center justify-center animate-pulse">
                    <CircleDashed size={16} className="text-white animate-spin-slow" />
                </div>

                <div className="md:w-1/2 md:pl-16 pl-20">
                  <span className="inline-block px-3 py-1 bg-sibos-orange/20 text-sibos-orange rounded text-xs font-bold mb-2 border border-sibos-orange/20 animate-pulse">SEKARANG</span>
                  <h3 className="text-2xl font-bold text-white mb-2">Q4 2025: The Rebirth</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Peluncuran versi Beta terbatas untuk komunitas internal. Perekrutan 100 Partner wilayah pertama. Integrasi awal modul Accounting dan AI Assistant v1.0.
                  </p>
                  <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/5 flex gap-4 items-center">
                    <Users size={24} className="text-sibos-orange" />
                    <div className="text-xs text-gray-400">Target: 500 User Aktif & 50 Partner</div>
                  </div>
                </div>
              </div>

              {/* Phase 3: Grand Launch */}
              <div className="relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center group">
                <div className="md:w-1/2 md:pr-16 md:text-right pl-20 md:pl-0">
                  <span className="inline-block px-3 py-1 bg-white/10 text-gray-300 rounded text-xs font-bold mb-2 border border-white/10">UPCOMING</span>
                  <h3 className="text-2xl font-bold text-white mb-2">Q1 - Q2 2026: Grand Launch</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Rilis publik SIBOS versi 1.0 Stable. Peluncuran aplikasi mobile native (iOS & Android). Pembukaan marketplace plugin bagi developer pihak ketiga.
                  </p>
                </div>
                
                <div className="absolute left-[12px] md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-slate-800 border-4 border-slate-900 border-t-white shadow-lg z-20 flex items-center justify-center">
                    <Rocket size={14} className="text-white" />
                </div>

                <div className="hidden md:block md:w-1/2 pl-16">
                    <GlassCard className="p-4 !bg-blue-900/10 border-blue-500/20">
                        <div className="text-xs font-bold text-blue-400 mb-1">FITUR UNGGULAN</div>
                        <div className="text-sm text-gray-300">Marketplace Integration (Tokopedia/Shopee/TikTok)</div>
                    </GlassCard>
                </div>
              </div>

               {/* Phase 4: Intelligence Era */}
               <div className="relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center group">
                <div className="hidden md:block md:w-1/2 pr-16">
                    <GlassCard className="p-4 !bg-purple-900/10 border-purple-500/20 ml-auto">
                        <div className="text-xs font-bold text-purple-400 mb-1">TEKNOLOGI</div>
                        <div className="text-sm text-gray-300">Predictive AI & Auto-Restock System</div>
                    </GlassCard>
                </div>

                <div className="absolute left-[12px] md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-slate-800 border-4 border-slate-900 border-t-purple-500 shadow-lg z-20 flex items-center justify-center">
                    <Cpu size={14} className="text-purple-400" />
                </div>

                <div className="md:w-1/2 md:pl-16 pl-20">
                  <span className="inline-block px-3 py-1 bg-white/10 text-gray-300 rounded text-xs font-bold mb-2 border border-white/10">Q3 2026</span>
                  <h3 className="text-2xl font-bold text-white mb-2">Q3 - Q4 2026: Era Kecerdasan</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Implementasi penuh AI Assistant v2.0. Sistem mampu memprediksi tren pasar dan melakukan order bahan baku otomatis ke supplier terhubung. Pendirian 10 Training Center fisik di kota besar.
                  </p>
                </div>
              </div>

               {/* Phase 5: Global */}
               <div className="relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center group">
                <div className="md:w-1/2 md:pr-16 md:text-right pl-20 md:pl-0">
                  <span className="inline-block px-3 py-1 bg-white/10 text-gray-300 rounded text-xs font-bold mb-2 border border-white/10">2027+</span>
                  <h3 className="text-2xl font-bold text-white mb-2">2027: Ekspansi Global</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Dukungan multi-bahasa & multi-currency penuh untuk pasar Asia Tenggara. Ekosistem supply chain lintas negara. SIBOS menjadi standar baru aplikasi komunitas dunia.
                  </p>
                </div>
                
                <div className="absolute left-[12px] md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-slate-800 border-4 border-slate-900 border-t-cyan-500 shadow-lg z-20 flex items-center justify-center">
                    <Globe size={14} className="text-cyan-400" />
                </div>

                <div className="hidden md:block md:w-1/2 pl-16">
                   <div className="h-px w-20 bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
};