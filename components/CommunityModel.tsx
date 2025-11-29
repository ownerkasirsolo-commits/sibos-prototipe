
import React from 'react';
import { Network, HandHeart, TrendingUp, ShieldCheck, Scale } from 'lucide-react';

export const CommunityModel: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-black"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-4 py-1 rounded-full border border-sibos-orange/30 text-sibos-orange text-sm font-semibold mb-6 bg-sibos-orange/5">
              Manifesto SIBOS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Melawan Tirani <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sibos-orange to-yellow-500">
                Modal Raksasa
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 text-justify leading-relaxed">
              Sistem ekonomi digital saat ini rusak. "Paus Besar" (Investor Raksasa) membakar uang untuk mematikan kompetisi, lalu memonopoli pasar. SIBOS adalah antitesis dari keserakahan itu.
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-5">
                <div className="mt-1 p-3 bg-slate-800 rounded-xl border border-white/10 h-fit">
                  <Scale className="text-sibos-orange" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-2">Distribusi Keadilan</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Sistem kami melarang penumpukan klien. Jika Partner A sudah sukses menangani 50 klien besar, sistem akan memaksa dia berbagi. Klien ke-51 akan diberikan ke Partner B yang baru merintis. Rejeki harus mengalir, tidak boleh menggenap.
                  </p>
                </div>
              </div>

               <div className="flex gap-5">
                <div className="mt-1 p-3 bg-slate-800 rounded-xl border border-white/10 h-fit">
                  <ShieldCheck className="text-blue-500" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-2">Anti-Monopoli Investasi</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Kami membatasi porsi kepemilikan saham. Tidak boleh ada satu orang pun yang memiliki suara mayoritas mutlak. SIBOS adalah milik komunitas, dijaga oleh komunitas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Visual representation of the network */}
            <div className="aspect-square bg-gradient-to-br from-white/5 to-transparent rounded-full border border-white/10 p-8 flex items-center justify-center relative animate-spin-slow">
               <div className="absolute inset-0 border border-dashed border-white/10 rounded-full animate-[spin_30s_linear_infinite]"></div>
               <div className="absolute inset-12 border border-white/5 rounded-full"></div>
               
               {/* Central Node */}
               <div className="w-32 h-32 bg-gradient-to-br from-sibos-orange to-red-600 rounded-full flex flex-col items-center justify-center shadow-[0_0_80px_rgba(234,88,12,0.4)] z-20 relative border-4 border-slate-900">
                 <span className="font-black text-white text-xl">SIBOS</span>
                 <span className="text-[10px] text-white/80 font-bold uppercase tracking-widest">Core</span>
               </div>

               {/* Satellite Nodes */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 w-20 h-20 bg-slate-900 border-2 border-green-500 rounded-full flex flex-col items-center justify-center text-center z-20 shadow-lg shadow-green-900/20">
                   <span className="text-xs font-bold text-green-400">Partner</span>
                   <span className="text-[9px] text-gray-500">Wilayah A</span>
               </div>
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 w-20 h-20 bg-slate-900 border-2 border-blue-500 rounded-full flex flex-col items-center justify-center text-center z-20 shadow-lg shadow-blue-900/20">
                   <span className="text-xs font-bold text-blue-400">Developer</span>
                   <span className="text-[9px] text-gray-500">Plugin</span>
               </div>
               <div className="absolute left-0 top-1/2 -translate-x-8 -translate-y-1/2 w-20 h-20 bg-slate-900 border-2 border-purple-500 rounded-full flex flex-col items-center justify-center text-center z-20 shadow-lg shadow-purple-900/20">
                   <span className="text-xs font-bold text-purple-400">Investor</span>
                   <span className="text-[9px] text-gray-500">Mikro</span>
               </div>
               <div className="absolute right-0 top-1/2 translate-x-8 -translate-y-1/2 w-20 h-20 bg-slate-900 border-2 border-yellow-500 rounded-full flex flex-col items-center justify-center text-center z-20 shadow-lg shadow-yellow-900/20">
                   <span className="text-xs font-bold text-yellow-400">UMKM</span>
                   <span className="text-[9px] text-gray-500">User</span>
               </div>
            </div>
            <div className="text-center mt-12">
              <p className="text-lg font-serif italic text-gray-400">"Dari Anggota, Oleh Anggota, Untuk Anggota"</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
