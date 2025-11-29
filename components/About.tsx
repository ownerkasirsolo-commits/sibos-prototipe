
import React from 'react';
import { Briefcase, Code2, CloudOff, Users, Rocket, Sparkles, MapPin, ArrowRight, HeartCrack, Hammer } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { Page } from '../types';

interface AboutProps {
    onNavigate: (page: Page) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 animate-in fade-in duration-500">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop" 
            alt="Perjuangan Tim" 
            className="w-full h-full object-cover opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-bold tracking-widest uppercase mb-6">
                <Sparkles size={12} className="text-sibos-orange" />
                Sebuah Catatan Perjalanan
            </div>
            <h1 className="text-5xl md:text-8xl font-extrabold text-white mb-8 leading-tight drop-shadow-2xl">
              Dari Garasi Kecil,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-white to-gray-500">
                Melawan Raksasa.
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed italic border-l-4 border-sibos-orange pl-8 py-2 text-left md:text-center md:border-l-0 md:pl-0">
              "Kami tidak punya modal triliunan. Yang kami punya hanya keyakinan bahwa teknologi harusnya membebaskan, bukan menjajah."
            </p>
        </div>
      </section>

      <section id="timeline" className="py-24 relative overflow-hidden bg-slate-950">
        <div className="container mx-auto px-6 relative z-10">
          
          <div className="relative max-w-5xl mx-auto">
            {/* Vertical Timeline Line */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>

            <div className="space-y-32">
              
              {/* 2015: The Beginning */}
              <div className="relative flex flex-col md:flex-row gap-8 items-center group">
                <div className="md:w-1/2 md:text-right order-2 md:order-1 pl-12 md:pl-0 md:pr-16">
                  <div className="text-sibos-orange font-bold text-xl mb-2">2015</div>
                  <h3 className="text-3xl font-bold text-white mb-4">Era Keringat & Kabel</h3>
                  <p className="text-gray-400 leading-relaxed text-lg mb-4">
                    PT Mesin Kasir Solo tidak lahir di gedung kaca. Kami lahir di jalanan. Menjual hardware kasir dari toko ke toko, merakit kabel di lantai gudang yang panas.
                  </p>
                  <p className="text-gray-500 text-sm">
                    Kami melihat langsung bagaimana pemilik toko ditipu oleh vendor software mahal yang fiturnya tidak sesuai kebutuhan. Dari sana, api kemarahan itu mulai menyala.
                  </p>
                </div>
                
                <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-slate-900 border-2 border-sibos-orange flex items-center justify-center text-sibos-orange z-10 order-1 shadow-[0_0_30px_rgba(255,107,0,0.4)]">
                  <Hammer size={20} />
                </div>

                <div className="hidden md:block md:w-1/2 order-3 pl-16">
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl rotate-2 opacity-60 hover:opacity-100 transition-opacity duration-500">
                    <img src="https://images.unsplash.com/photo-1581092921461-eab62e97a782?q=80&w=800&auto=format&fit=crop" alt="Hard Work" className="w-full h-64 object-cover grayscale" />
                  </div>
                </div>
              </div>

              {/* 2021: The Creation */}
              <div className="relative flex flex-col md:flex-row gap-8 items-center group">
                <div className="hidden md:block md:w-1/2 order-1 pr-16">
                   <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl -rotate-2 opacity-60 hover:opacity-100 transition-opacity duration-500">
                    <img src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=800&auto=format&fit=crop" alt="Coding SIBOS" className="w-full h-64 object-cover grayscale" />
                  </div>
                </div>

                <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-slate-900 border-2 border-blue-500 flex items-center justify-center text-blue-500 z-10 order-1">
                  <Code2 size={20} />
                </div>

                <div className="md:w-1/2 order-2 pl-12 md:pl-16">
                  <div className="text-blue-500 font-bold text-xl mb-2">2021</div>
                  <h3 className="text-3xl font-bold text-white mb-4">Kelahiran SIBOS v1</h3>
                  <p className="text-gray-400 leading-relaxed text-lg mb-4">
                    Muak dengan software 'asal jadi', kami memutuskan membangun sendiri. <b>SIBOS</b> (Smart Integrated Back Office System) lahir.
                  </p>
                  <p className="text-gray-500 text-sm">
                    Bukan dibuat oleh programmer yang duduk di AC, tapi oleh praktisi yang paham betapa frustasinya kasir saat sistem error di jam sibuk.
                  </p>
                </div>
              </div>

              {/* 2022-2024: The Fall */}
              <div className="relative flex flex-col md:flex-row gap-8 items-center group">
                <div className="md:w-1/2 md:text-right order-2 md:order-1 pl-12 md:pl-0 md:pr-16">
                  <div className="text-gray-500 font-bold text-xl mb-2">2022 - 2024</div>
                  <h3 className="text-3xl font-bold text-gray-400 mb-4">Kematian Suri</h3>
                  <p className="text-gray-500 leading-relaxed italic text-lg">
                    "Pandemi bukan hanya membunuh manusia, tapi juga mimpi kami."
                  </p>
                  <p className="text-gray-600 text-sm mt-4">
                    Klien berguguran satu per satu. Modal pengembangan habis. Kami terpaksa merumahkan tim. SIBOS menjadi kode mati di dalam hardisk tua. Kami nyaris menyerah.
                  </p>
                </div>
                
                <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-slate-900 border-2 border-gray-700 flex items-center justify-center text-gray-500 z-10 order-1">
                  <HeartCrack size={20} />
                </div>

                <div className="hidden md:block md:w-1/2 order-3 pl-16">
                   <div className="relative rounded-2xl overflow-hidden border border-white/5 shadow-lg grayscale opacity-20">
                    <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop" alt="Empty Office" className="w-full h-64 object-cover" />
                  </div>
                </div>
              </div>

              {/* Oct 2025: The Rebirth */}
              <div className="relative flex flex-col md:flex-row gap-8 items-center group">
                <div className="hidden md:block md:w-1/2 order-1 pr-16">
                   <div className="relative rounded-2xl overflow-hidden border border-sibos-orange/50 shadow-[0_0_100px_rgba(255,107,0,0.3)]">
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop" alt="Community Meeting" className="w-full h-64 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                        <div className="text-white font-bold text-lg">Wajah Baru, Semangat Baru</div>
                    </div>
                  </div>
                </div>

                <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-sibos-orange text-white flex items-center justify-center shadow-[0_0_50px_rgba(255,107,0,0.8)] animate-pulse z-10 border-4 border-slate-900">
                  <Users size={32} />
                </div>
                
                <GlassCard className="md:w-1/2 order-2 ml-12 md:ml-16 !p-8 border-sibos-orange/30 bg-sibos-orange/5 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Rocket size={120} />
                   </div>
                  <div className="inline-block px-3 py-1 bg-sibos-orange text-white text-xs rounded mb-4 font-bold shadow-lg">OKTOBER 2025</div>
                  <h3 className="text-4xl font-bold text-white mb-4">Kebangkitan</h3>
                  <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                    Kami menyadari satu hal: <b>SIBOS terlalu besar untuk dipikul sendiri, dan terlalu berharga untuk dimatikan.</b>
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    Kami mengubah total model bisnis. Bukan lagi perusahaan tertutup, tapi <b>Ekosistem Komunitas</b>. 
                  </p>
                  <div className="p-4 bg-black/30 rounded-xl border-l-4 border-sibos-orange text-gray-300 text-sm italic">
                      "Jika satu orang gagal, dia jatuh. Jika komunitas gagal, mereka saling menopang."
                  </div>
                </GlassCard>
              </div>

            </div>
          </div>
          
          {/* Closing Statement */}
          <div className="mt-40 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-8">Visi 2026: Mengambil Kembali Hak Kita</h2>
            <p className="text-gray-400 leading-relaxed mb-12 text-xl">
              Kami sedang bersiap untuk peluncuran akbar. Ini bukan sekadar rilis aplikasi. Ini adalah deklarasi bahwa teknologi canggih adalah hak milik rakyat, bukan hanya milik korporasi raksasa.
            </p>
            <div className="flex justify-center">
                <button 
                  onClick={() => onNavigate('roadmap')}
                  className="px-10 py-4 bg-white text-slate-900 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                >
                    Lihat Peta Perjuangan Kami
                    <ArrowRight size={20} />
                </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
