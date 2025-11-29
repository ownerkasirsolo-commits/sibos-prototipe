
import React from 'react';
import { TrendingUp, Shield, Users, PieChart, ArrowRight, AlertTriangle } from 'lucide-react';
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
            INVESTASI MIKRO TERBUKA
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Bukan Untuk <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
              Naga & Paus.
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light mb-12">
            Kami menolak didikte oleh modal raksasa. SIBOS dimiliki oleh ribuan investor kecil yang percaya pada visi keadilan digital.
          </p>
          <div className="flex justify-center">
            <button className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold shadow-lg shadow-green-900/40 flex items-center gap-2">
              Lihat Prospektus
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-16 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
           <div>
              <h2 className="text-3xl font-bold text-white mb-6">Manifesto Anti-Monopoli</h2>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                Di dunia startup konvensional, investor besar (VC) menyuntikkan dana triliunan dengan satu tujuan: <strong>Dominasi Pasar & Exit Strategy</strong>. Mereka memaksa founder untuk membakar uang, mematikan kompetisi, lalu menaikkan harga gila-gilaan.
              </p>
              <div className="p-4 bg-red-900/20 border-l-4 border-red-500 rounded-r-xl mb-6">
                 <div className="flex items-center gap-2 text-red-400 font-bold mb-1"><AlertTriangle size={16}/> Bahaya Modal Raksasa</div>
                 <p className="text-sm text-gray-400">"Saat satu orang memegang 51% saham, suara ribuan pengguna tidak lagi terdengar."</p>
              </div>
              <p className="text-gray-300 leading-relaxed">
                SIBOS membatasi kepemilikan saham individu maksimal <strong>0.5%</strong>. Kami memastikan suara komunitas adalah hukum tertinggi.
              </p>
           </div>
           <div className="relative">
               <GlassCard className="border-green-500/30">
                  <div className="flex items-center justify-between mb-8">
                      <div>
                         <div className="text-gray-400 text-sm">Total Valuasi Komunitas</div>
                         <div className="text-3xl font-bold text-white">Rp 500 Miliar</div>
                      </div>
                      <PieChart size={48} className="text-green-500" />
                  </div>
                  <div className="space-y-4">
                      <div>
                          <div className="flex justify-between text-sm text-gray-300 mb-1">
                             <span>Investor Retail (45%)</span>
                             <span>2.500 Orang</span>
                          </div>
                          <div className="w-full bg-slate-800 h-2 rounded-full"><div className="bg-green-500 h-2 rounded-full w-[45%]"></div></div>
                      </div>
                      <div>
                          <div className="flex justify-between text-sm text-gray-300 mb-1">
                             <span>Developer & Partner (35%)</span>
                             <span>800 Orang</span>
                          </div>
                          <div className="w-full bg-slate-800 h-2 rounded-full"><div className="bg-blue-500 h-2 rounded-full w-[35%]"></div></div>
                      </div>
                      <div>
                          <div className="flex justify-between text-sm text-gray-300 mb-1">
                             <span>Founder Team (20%)</span>
                             <span>Dibatasi</span>
                          </div>
                          <div className="w-full bg-slate-800 h-2 rounded-full"><div className="bg-orange-500 h-2 rounded-full w-[20%]"></div></div>
                      </div>
                  </div>
               </GlassCard>
           </div>
        </div>
      </section>

    </div>
  );
};
