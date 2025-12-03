
import React from 'react';
import { 
  Building2, Briefcase, PieChart, Globe, 
  Layers, Users, ArrowRight, CheckCircle2, 
  Zap, Share2, Wallet
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { Page } from '../types';

interface SolutionMultiBusinessPageProps {
    onNavigate?: (page: Page) => void;
}

export const SolutionMultiBusinessPage: React.FC<SolutionMultiBusinessPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 animate-in fade-in duration-500">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wider mb-8 shadow-lg shadow-amber-900/20 backdrop-blur-md">
            <Building2 size={14} />
            HOLDING COMPANY SYSTEM
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
            Satu Akun, Banyak Kerajaan. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400">
              Bangun Imperium Anda.
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md mb-10">
            Hapus batasan <em>software</em> konvensional yang hanya mendukung satu jenis usaha. SIBOS adalah <em>Operating System</em> untuk Holding Company Anda. Kelola Laundry, Coffee Shop, dan Toko Baju sekaligus dalam satu komando.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4">
             <button 
                onClick={() => onNavigate && onNavigate('backoffice')}
                className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-amber-900/50 flex items-center justify-center gap-2"
             >
                <Briefcase size={20} /> Dashboard Holding
             </button>
             <button 
                onClick={() => onNavigate && onNavigate('crm')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all border border-white/10 flex items-center justify-center gap-2"
             >
                <Users size={20} /> Cross-Business CRM
             </button>
          </div>
        </div>
      </section>

      {/* PAIN POINTS & SOLUTION */}
      <section className="py-20 container mx-auto px-6">
         <div className="grid md:grid-cols-2 gap-16 items-center">
             <div>
                 <h2 className="text-3xl font-bold text-white mb-6">Derita Pengusaha "Serba Bisa"</h2>
                 <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    Punya banyak jenis bisnis itu keren, tapi mengelolanya adalah mimpi buruk jika sistemnya terpisah-pisah.
                 </p>
                 <div className="space-y-4">
                     <div className="p-4 bg-slate-900 rounded-xl border border-white/5 flex gap-4">
                         <div className="mt-1 p-2 bg-red-500/10 rounded-lg text-red-400 h-fit"><Layers size={20} /></div>
                         <div>
                             <h4 className="text-white font-bold mb-1">Aplikasi Terpisah-pisah</h4>
                             <p className="text-sm text-gray-400">Pagi login aplikasi Resto, Siang login aplikasi Laundry, Sore login aplikasi Toko. Password lupa, data berantakan.</p>
                         </div>
                     </div>
                     <div className="p-4 bg-slate-900 rounded-xl border border-white/5 flex gap-4">
                         <div className="mt-1 p-2 bg-red-500/10 rounded-lg text-red-400 h-fit"><PieChart size={20} /></div>
                         <div>
                             <h4 className="text-white font-bold mb-1">Laporan Keuangan Pusing</h4>
                             <p className="text-sm text-gray-400">Berapa total keuntungan saya bulan ini? Harus buka Excel lagi untuk menggabungkan laporan dari 3 bisnis berbeda.</p>
                         </div>
                     </div>
                 </div>
             </div>
             
             <div className="relative">
                 <GlassCard className="border-t-4 border-t-amber-500 relative z-10 !bg-slate-900 shadow-2xl">
                     <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <CheckCircle2 className="text-amber-500"/> Solusi SIBOS Multi-Bisnis
                     </h3>
                     <ul className="space-y-4">
                         {[
                             "Single Sign-On (Satu Akun untuk Semua Bisnis)",
                             "Laporan Laba Rugi Konsolidasi (Holding)",
                             "Transfer Saldo & Aset Antar Unit Bisnis",
                             "Manajemen SDM Terpusat (Rotasi Karyawan)",
                             "Universal Loyalty Point (Berlaku Lintas Brand)"
                         ].map((item, i) => (
                             <li key={i} className="flex items-center gap-3 text-gray-300 p-3 bg-white/5 rounded-lg border border-white/5">
                                 <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                 {item}
                             </li>
                         ))}
                     </ul>
                 </GlassCard>
                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500/20 rounded-full blur-[80px] -z-10"></div>
             </div>
         </div>
      </section>

      {/* CORE FEATURES SHOWCASE */}
      <section className="py-20 bg-slate-900 border-y border-white/5">
          <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-white mb-4">Ekosistem Tanpa Sekat</h2>
                  <p className="text-gray-400">Hubungkan titik-titik bisnis Anda menjadi satu kekuatan besar.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  {/* Holding Dashboard */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-amber-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-transform">
                          <Briefcase size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Holding Dashboard</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          Lihat performa "Kopi Senja" (F&B) berdampingan dengan "Senja Laundry" (Jasa) dalam satu grafik. Analisis mana 'Sapi Perah' dan mana beban.
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 p-3 flex flex-col justify-center gap-2">
                          <div className="flex justify-between text-xs text-gray-400 border-b border-white/10 pb-1">
                              <span>Kopi Senja</span>
                              <span className="text-green-400">+15%</span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-400">
                              <span>Senja Laundry</span>
                              <span className="text-green-400">+8%</span>
                          </div>
                      </div>
                  </div>

                  {/* Shared Wallet */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-yellow-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500 mb-6 group-hover:scale-110 transition-transform">
                          <Wallet size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Kas Terintegrasi</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          Kekurangan modal di Toko Baju? Suntik dana langsung dari profit Restoran. Tercatat sebagai "Pinjaman Antar Perusahaan" secara otomatis di Akuntansi.
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 flex items-center justify-center gap-3">
                          <div className="w-8 h-8 rounded bg-slate-800 border border-white/10 flex items-center justify-center text-xs font-bold text-orange-400">Resto</div>
                          <div className="h-0.5 flex-1 bg-slate-700 relative">
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-500 rounded-full animate-ping"></div>
                          </div>
                          <div className="w-8 h-8 rounded bg-slate-800 border border-white/10 flex items-center justify-center text-xs font-bold text-blue-400">Toko</div>
                      </div>
                  </div>

                  {/* Cross Loyalty */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-orange-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                          <Users size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Ekosistem Member</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          "Beli kopi 10x, gratis cuci baju 1kg". Cross-selling antar unit bisnis Anda untuk meningkatkan loyalitas pelanggan di semua lini.
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 flex items-center justify-center">
                          <div className="text-center">
                              <div className="text-xs text-gray-500">Saldo Poin Pelanggan</div>
                              <div className="text-orange-400 font-bold text-lg">500 Poin</div>
                              <div className="text-[10px] text-gray-600">Berlaku di Semua Cabang</div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center container mx-auto px-6">
        <GlassCard className="max-w-4xl mx-auto p-12 relative overflow-hidden bg-gradient-to-br from-slate-900 to-amber-900/30 border-amber-500/20">
           <div className="relative z-10">
              <Globe size={48} className="text-amber-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-6">Satu Sistem, Kendali Penuh</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                 Jangan biarkan kompleksitas menghambat ambisi Anda. Kelola konglomerasi bisnis Anda dengan mudah dan efisien bersama SIBOS.
              </p>
              <button 
                onClick={() => onNavigate && onNavigate('backoffice')}
                className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-amber-900/50 flex items-center gap-2 mx-auto"
              >
                  Mulai Bangun Imperium
                  <ArrowRight size={20} />
              </button>
           </div>
        </GlassCard>
      </section>

    </div>
  );
};
