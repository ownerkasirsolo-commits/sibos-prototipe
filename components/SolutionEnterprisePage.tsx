
import React from 'react';
import { 
  Building2, Network, ShieldCheck, Activity, 
  BarChart3, Globe, Lock, ArrowRight, CheckCircle2, 
  Zap, Database, FileCheck
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { Page } from '../types';

interface SolutionEnterprisePageProps {
    onNavigate?: (page: Page) => void;
}

export const SolutionEnterprisePage: React.FC<SolutionEnterprisePageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 animate-in fade-in duration-500">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-wider mb-8 shadow-lg shadow-blue-900/20 backdrop-blur-md">
            <Building2 size={14} />
            ENTERPRISE SCALE
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
            Kendali Mutlak. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500">
              Skala Tak Terbatas.
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md mb-10">
            Bisnis besar bukan tentang seberapa banyak cabang, tapi seberapa cepat Anda tahu jika satu baut longgar. Hancurkan <em>data silo</em>. Satukan kerajaan bisnis Anda dalam satu komando.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4">
             <button 
                onClick={() => onNavigate && onNavigate('backoffice')}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-900/50 flex items-center justify-center gap-2"
             >
                <Activity size={20} /> Lihat HQ Dashboard
             </button>
             <button 
                onClick={() => onNavigate && onNavigate('accounting')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all border border-white/10 flex items-center justify-center gap-2"
             >
                <BarChart3 size={20} /> Konsolidasi Keuangan
             </button>
          </div>
        </div>
      </section>

      {/* PAIN POINTS & SOLUTION */}
      <section className="py-20 container mx-auto px-6">
         <div className="grid md:grid-cols-2 gap-16 items-center">
             <div>
                 <h2 className="text-3xl font-bold text-white mb-6">Tantangan Raksasa Bisnis</h2>
                 <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    Semakin besar kapal, semakin sulit berbelok. Birokrasi yang lambat dan data yang terfragmentasi adalah resep kehancuran.
                 </p>
                 <div className="space-y-4">
                     <div className="p-4 bg-slate-900 rounded-xl border border-white/5 flex gap-4">
                         <div className="mt-1 p-2 bg-red-500/10 rounded-lg text-red-400 h-fit"><Database size={20} /></div>
                         <div>
                             <h4 className="text-white font-bold mb-1">Data Silo (Terpisah-pisah)</h4>
                             <p className="text-sm text-gray-400">Cabang A pakai Excel, Cabang B pakai software lain. Head office buta kondisi lapangan.</p>
                         </div>
                     </div>
                     <div className="p-4 bg-slate-900 rounded-xl border border-white/5 flex gap-4">
                         <div className="mt-1 p-2 bg-red-500/10 rounded-lg text-red-400 h-fit"><ShieldCheck size={20} /></div>
                         <div>
                             <h4 className="text-white font-bold mb-1">Fraud Masif & Sistemik</h4>
                             <p className="text-sm text-gray-400">Kecurangan kecil di 100 cabang, jika dikalikan setahun, bisa membeli sebuah pabrik baru.</p>
                         </div>
                     </div>
                 </div>
             </div>
             
             <div className="relative">
                 <GlassCard className="border-t-4 border-t-blue-500 relative z-10 !bg-slate-900 shadow-2xl">
                     <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <CheckCircle2 className="text-blue-500"/> Solusi SIBOS Enterprise
                     </h3>
                     <ul className="space-y-4">
                         {[
                             "HQ Dashboard (Pantau 100+ Cabang Real-time)",
                             "Multi-Level Approval (PO, Diskon, Void)",
                             "Konsolidasi Laporan Keuangan Otomatis",
                             "Audit Trail Lengkap (Siapa melakukan apa)",
                             "Open API untuk Integrasi ERP (SAP/Oracle)"
                         ].map((item, i) => (
                             <li key={i} className="flex items-center gap-3 text-gray-300 p-3 bg-white/5 rounded-lg border border-white/5">
                                 <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                 {item}
                             </li>
                         ))}
                     </ul>
                 </GlassCard>
                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-[80px] -z-10"></div>
             </div>
         </div>
      </section>

      {/* CORE FEATURES SHOWCASE */}
      <section className="py-20 bg-slate-900 border-y border-white/5">
          <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-white mb-4">Fitur Kelas Korporasi</h2>
                  <p className="text-gray-400">Dibangun untuk menangani jutaan transaksi tanpa *downtime*.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  {/* Approval Workflow */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                          <FileCheck size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Multi-Level Approval</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          Set aturan ketat. PO > 10 Juta butuh ACC Manajer Area. PO > 100 Juta butuh ACC Direktur. Tidak ada uang keluar tanpa izin.
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 flex flex-col justify-center p-3 gap-2">
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-black text-[8px]">✓</div>
                              <span>Manager Approved</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-white font-bold">
                              <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center text-black text-[8px]">?</div>
                              <span>Director Review...</span>
                          </div>
                      </div>
                  </div>

                  {/* API Integration */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-indigo-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500 mb-6 group-hover:scale-110 transition-transform">
                          <Network size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Integrasi ERP & API</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          SIBOS bukan pulau terpencil. Tarik data penjualan ke SAP, Oracle, atau Jurnal.id secara otomatis via Open API kami.
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 flex items-center justify-center gap-3">
                          <div className="px-3 py-1 bg-white/5 rounded border border-white/10 text-xs font-bold text-white">SIBOS</div>
                          <div className="h-0.5 w-8 bg-indigo-500 relative">
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-indigo-400 rounded-full animate-ping"></div>
                          </div>
                          <div className="px-3 py-1 bg-white/5 rounded border border-white/10 text-xs font-bold text-white">SAP</div>
                      </div>
                  </div>

                  {/* Audit Log */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-violet-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center text-violet-500 mb-6 group-hover:scale-110 transition-transform">
                          <Lock size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Audit Trail Forensik</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          Siapa yang menghapus transaksi #INV-992? Siapa yang mengubah harga jual jam 2 pagi? SIBOS mencatat IP Address, User, dan Waktu detil.
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 p-3 overflow-hidden font-mono text-[10px] text-gray-500">
                          <div className="mb-1">2025-10-20 14:02: User 'Andi' Edited Stock</div>
                          <div className="mb-1">2025-10-20 14:05: User 'Budi' Deleted TX</div>
                          <div className="text-red-400 font-bold">WARNING: Unusual Activity</div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* SCALE VISUAL */}
      <section className="py-20 container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 bg-gradient-to-r from-blue-900/20 to-slate-900 rounded-3xl p-8 border border-blue-500/20">
              <div className="lg:w-1/2">
                  <h2 className="text-2xl font-bold text-white mb-4">Centralized Command Center</h2>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                      Lupakan laporan via WhatsApp yang berantakan. Pantau omzet 100 cabang dalam satu layar. Lakukan perubahan harga pusat yang langsung terupdate di seluruh Indonesia dalam hitungan detik.
                  </p>
                  <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-green-500"/> Push Update Harga Massal</li>
                      <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-green-500"/> Transfer Stok Antar Gudang</li>
                      <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-green-500"/> Laporan Laba Rugi Konsolidasi</li>
                  </ul>
              </div>
              <div className="lg:w-1/2 flex justify-center">
                  <div className="relative">
                      <Globe size={200} className="text-slate-800 opacity-50" />
                      <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
                      </div>
                      <div className="absolute top-10 left-10 w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <div className="absolute bottom-10 right-20 w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <div className="absolute top-20 right-10 w-2 h-2 bg-indigo-500 rounded-full"></div>
                  </div>
              </div>
          </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center container mx-auto px-6">
        <GlassCard className="max-w-4xl mx-auto p-12 relative overflow-hidden bg-gradient-to-br from-slate-900 to-blue-900/30 border-blue-500/20">
           <div className="relative z-10">
              <Building2 size={48} className="text-blue-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-6">Siap untuk Scale Up?</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                 Infrastruktur SIBOS siap menangani jutaan transaksi Anda. Fokus pada ekspansi, biarkan kami menjaga benteng operasional Anda.
              </p>
              <button 
                onClick={() => onNavigate && onNavigate('backoffice')}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-900/50 flex items-center gap-2 mx-auto"
              >
                  Jadwalkan Demo Enterprise
                  <ArrowRight size={20} />
              </button>
           </div>
        </GlassCard>
      </section>

    </div>
  );
};
