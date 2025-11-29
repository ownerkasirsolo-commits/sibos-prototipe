
import React from 'react';
import { PlayCircle, ArrowRight, Flame } from 'lucide-react';
import { Page } from '../types';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const handleScrollToFeatures = () => {
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-sibos-orange/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[0%] left-[-10%] w-[600px] h-[600px] bg-red-900/20 rounded-full blur-[120px]"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold tracking-widest uppercase mb-8 shadow-[0_0_20px_rgba(220,38,38,0.3)] backdrop-blur-md animate-in slide-in-from-top-4 duration-700">
            <Flame size={12} className="fill-red-500 animate-pulse" />
            REVOLUSI DIGITAL ARUS BAWAH
          </div>
          
          <h1 className="text-5xl md:text-8xl font-extrabold text-white mb-8 leading-tight tracking-tight drop-shadow-2xl">
            Runtuhkan Dominasi. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sibos-orange via-red-500 to-purple-600">
              Rebut Kedaulatan.
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
            Di dunia di mana raksasa teknologi memakan yang kecil, SIBOS hadir sebagai perisai. Kami bukan startup yang membakar uang investor untuk mematikan pasar. Kami adalah gerakan. Dari garasi di Solo, untuk kemakmuran ekonomi rakyat.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => onNavigate('community')}
              className="px-10 py-5 bg-gradient-to-r from-sibos-orange to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_10px_40px_rgba(234,88,12,0.4)] hover:shadow-[0_20px_60px_rgba(234,88,12,0.6)] hover:-translate-y-1 flex items-center gap-3 group"
            >
              Gabung Pergerakan
              <ArrowRight className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
            </button>
            <button 
              onClick={handleScrollToFeatures}
              className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-bold text-lg transition-all backdrop-blur-sm flex items-center gap-3 hover:border-white/30"
            >
              <PlayCircle size={24} />
              Pelajari Sistem
            </button>
          </div>

          <div className="mt-20 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-12 text-center opacity-80">
            {[
              { label: 'Platform', val: 'Universal' },
              { label: 'Kepemilikan', val: 'Komunitas' },
              { label: 'Misi', val: 'Keadilan' },
              { label: 'Status', val: 'Independen' }
            ].map((stat, i) => (
              <div key={i} className="transform hover:scale-110 transition-transform duration-300 cursor-default">
                <div className="text-3xl font-black text-white mb-1">{stat.val}</div>
                <div className="text-xs text-gray-500 uppercase tracking-[0.2em] font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
