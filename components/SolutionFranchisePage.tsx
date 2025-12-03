
import React from 'react';
import { 
  Network, Shield, Users, Percent, 
  TrendingUp, AlertTriangle, Layers, 
  ArrowRight, CheckCircle2, Zap, Lock, Truck, ClipboardCheck
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { Page } from '../types';

interface SolutionFranchisePageProps {
    onNavigate?: (page: Page) => void;
}

export const SolutionFranchisePage: React.FC<SolutionFranchisePageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 animate-in fade-in duration-500">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559586616-361e18714958?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-wider mb-8 shadow-lg shadow-cyan-900/20 backdrop-blur-md">
            <Network size={14} />
            SISTEM MANAJEMEN FRANCHISE
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
            Duplikasi Kesuksesan. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">
              Proteksi Reputasi.
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md mb-10">
            Franchise bukan sekadar jual gerobak. Ini adalah tentang menjaga standar. Jangan biarkan "Mitra Nakal" menghancurkan nama besar yang Anda bangun bertahun-tahun dengan mengubah resep atau memanipulasi laporan omzet.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4">
             <button 
                onClick={() => onNavigate && onNavigate('backoffice')}
                className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-cyan-900/50 flex items-center justify-center gap-2"
             >
                <Zap size={20} /> Dashboard Franchisor
             </button>
             <button 
                onClick={() => onNavigate && onNavigate('accounting')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all border border-white/10 flex items-center justify-center gap-2"
             >
                <Percent size={20} /> Kalkulasi Royalti
             </button>
          </div>
        </div>
      </section>

      {/* PAIN POINTS & SOLUTION */}
      <section className="py-20 container mx-auto px-6">
         <div className="grid md:grid-cols-2 gap-16 items-center">
             <div>
                 <h2 className="text-3xl font-bold text-white mb-6">Mimpi Buruk Pemilik Brand</h2>
                 <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    Saat cabang masih 5, mudah dikontrol. Saat sudah 100? Mitra mulai "kreatif" demi keuntungan pribadi, dan brand Anda yang jadi korban.
                 </p>
                 <div className="space-y-4">
                     <div className="p-4 bg-slate-900 rounded-xl border border-white/5 flex gap-4">
                         <div className="mt-1 p-2 bg-red-500/10 rounded-lg text-red-400 h-fit"><AlertTriangle size={20} /></div>
                         <div>
                             <h4 className="text-white font-bold mb-1">Royalty Dispute (Bohong Omzet)</h4>
                             <p className="text-sm text-gray-400">Mitra pakai 2 mesin kasir. Satu untuk lapor ke pusat, satu untuk kantong sendiri. Royalti yang Anda terima tidak sesuai.</p>
                         </div>
                     </div>
                     <div className="p-4 bg-slate-900 rounded-xl border border-white/5 flex gap-4">
                         <div className="mt-1 p-2 bg-red-500/10 rounded-lg text-red-400 h-fit"><Lock size={20} /></div>
                         <div>
                             <h4 className="text-white font-bold mb-1">Bypass Bahan Baku</h4>
                             <p className="text-sm text-gray-400">Wajib beli bumbu di Pusat, tapi mitra diam-diam beli bahan murah di pasar. Rasa berubah, pelanggan kabur.</p>
                         </div>
                     </div>
                 </div>
             </div>
             
             <div className="relative">
                 <GlassCard className="border-t-4 border-t-cyan-500 relative z-10 !bg-slate-900 shadow-2xl">
                     <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <CheckCircle2 className="text-cyan-500"/> Solusi SIBOS Franchise
                     </h3>
                     <ul className="space-y-4">
                         {[
                             "Automated Royalty Invoice (Auto-Generate)",
                             "Supply Chain Lock (POS Terkunci Jika Stok Bahan Habis)",
                             "Centralized Menu Control (Mitra Tidak Bisa Ubah Harga)",
                             "Digital SOP Audit (Wajib Foto Kebersihan Tiap Shift)",
                             "CCTV Integration (Opsional)"
                         ].map((item, i) => (
                             <li key={i} className="flex items-center gap-3 text-gray-300 p-3 bg-white/5 rounded-lg border border-white/5">
                                 <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                 {item}
                             </li>
                         ))}
                     </ul>
                 </GlassCard>
                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-[80px] -z-10"></div>
             </div>
         </div>
      </section>

      {/* CORE FEATURES SHOWCASE */}
      <section className="py-20 bg-slate-900 border-y border-white/5">
          <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-white mb-4">Fitur Pengendali Mitra</h2>
                  <p className="text-gray-400">Teknologi untuk memastikan SOP dijalankan, walau Anda tidak di lokasi.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  {/* Royalty Automation */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-500 mb-6 group-hover:scale-110 transition-transform">
                          <Percent size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Royalti Otomatis</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          Sistem menghitung tagihan royalti (misal: 5% dari Omzet Kotor) setiap malam. Invoice otomatis terkirim ke email mitra.
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 p-3 flex flex-col justify-center gap-2">
                          <div className="flex justify-between text-xs text-gray-400">
                              <span>Omzet Mitra A</span>
                              <span className="text-white font-bold">Rp 10.000.000</span>
                          </div>
                          <div className="border-t border-white/10 pt-1 flex justify-between text-xs text-cyan-400 font-bold">
                              <span>Tagihan (5%)</span>
                              <span>Rp 500.000</span>
                          </div>
                      </div>
                  </div>

                  {/* Supply Chain Lock */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                          <Truck size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Supply Chain Lock</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          Ingin memastikan mitra beli bahan baku ke Anda? Kunci sistem POS jika stok bahan baku "habis" di sistem. Wajib RO (Repeat Order).
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 flex items-center justify-center gap-2">
                          <Lock size={16} className="text-red-500" />
                          <div className="text-xs font-bold text-red-400">POS Locked: Stok Bumbu Habis</div>
                      </div>
                  </div>

                  {/* SOP Audit */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-indigo-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500 mb-6 group-hover:scale-110 transition-transform">
                          <ClipboardCheck size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Audit Digital</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          Wajibkan mitra upload foto kebersihan, seragam karyawan, dan kondisi dapur sebelum buka toko. Pantau dari HP Anda.
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 p-3 flex gap-2 items-center">
                          <div className="w-12 h-16 bg-slate-800 rounded border border-white/10 flex items-center justify-center text-[8px] text-gray-500">FOTO</div>
                          <div className="flex-1">
                              <div className="text-xs text-green-400 font-bold mb-1">Cleanliness OK</div>
                              <div className="h-1 bg-slate-700 rounded-full w-full"><div className="h-1 bg-green-500 w-full rounded-full"></div></div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* CENTRAL KITCHEN INTEGRATION */}
      <section className="py-20 container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 bg-gradient-to-r from-blue-900/20 to-slate-900 rounded-3xl p-8 border border-blue-500/20">
              <div className="lg:w-1/2">
                  <h2 className="text-2xl font-bold text-white mb-4">Integrasi Central Kitchen</h2>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                      Kelola produksi bahan baku setengah jadi (WIP) di dapur pusat dan distribusikan ke seluruh outlet franchise. Pantau HPP produksi vs Harga Jual ke Mitra untuk maksimalkan margin.
                  </p>
                  <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-green-500"/> Manajemen Produksi Massal</li>
                      <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-green-500"/> Delivery Order & Invoicing Otomatis</li>
                      <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-green-500"/> Laporan Laba Penjualan Bahan Baku</li>
                  </ul>
              </div>
              <div className="lg:w-1/2 flex justify-center">
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/10 w-full max-w-sm backdrop-blur-sm">
                      <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
                          <span className="text-sm font-bold text-white">Order Masuk (Mitra)</span>
                          <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">5 Baru</span>
                      </div>
                      <div className="space-y-3">
                          <div className="flex justify-between text-xs text-gray-300 bg-slate-900 p-2 rounded">
                              <span>Mitra A (Bandung)</span>
                              <span>500 Pcs Patty</span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-300 bg-slate-900 p-2 rounded">
                              <span>Mitra B (Jogja)</span>
                              <span>200 Lt Saus</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center container mx-auto px-6">
        <GlassCard className="max-w-4xl mx-auto p-12 relative overflow-hidden bg-gradient-to-br from-slate-900 to-cyan-900/30 border-cyan-500/20">
           <div className="relative z-10">
              <Network size={48} className="text-cyan-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-6">Scale Up Tanpa Sakit Kepala</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                 Fokuslah pada pengembangan brand dan marketing. Biarkan sistem SIBOS menjaga kepatuhan mitra dan aliran royalti Anda.
              </p>
              <button 
                onClick={() => onNavigate && onNavigate('backoffice')}
                className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-cyan-900/50 flex items-center gap-2 mx-auto"
              >
                  Demo Sistem Franchise
                  <ArrowRight size={20} />
              </button>
           </div>
        </GlassCard>
      </section>

    </div>
  );
};