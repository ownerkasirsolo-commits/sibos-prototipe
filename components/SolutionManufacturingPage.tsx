
import React from 'react';
import { 
  Factory, Cog, ClipboardList, Layers, 
  TrendingUp, AlertTriangle, ArrowRight, CheckCircle2, 
  Zap, Package, Box, RefreshCw, BarChart3
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { Page } from '../types';

interface SolutionManufacturingPageProps {
    onNavigate?: (page: Page) => void;
}

export const SolutionManufacturingPage: React.FC<SolutionManufacturingPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 animate-in fade-in duration-500">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold tracking-wider mb-8 shadow-lg shadow-indigo-900/20 backdrop-blur-md">
            <Factory size={14} />
            MANUFAKTUR & PRODUKSI
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
            Revolusi Lantai Produksi. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400">
              Hentikan Pemborosan.
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md mb-10">
            Ubah pabrik yang kacau menjadi mesin presisi. Pantau pergerakan bahan baku, Work In Progress (WIP), hingga barang jadi secara real-time. Ketahui biaya produksi (HPP) hingga ke perak terakhir.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4">
             <button 
                onClick={() => onNavigate && onNavigate('production-app')}
                className="px-8 py-4 bg-gradient-to-r from-sibos-orange to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-orange-900/50 flex items-center justify-center gap-2"
             >
                <Zap size={20} /> Lihat Sistem Produksi
             </button>
             <button 
                onClick={() => onNavigate && onNavigate('accounting')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all border border-white/10 flex items-center justify-center gap-2"
             >
                <BarChart3 size={20} /> Cek HPP Otomatis
             </button>
          </div>
        </div>
      </section>

      {/* PAIN POINTS & SOLUTION */}
      <section className="py-20 container mx-auto px-6">
         <div className="grid md:grid-cols-2 gap-16 items-center">
             <div>
                 <h2 className="text-3xl font-bold text-white mb-6">Mimpi Buruk Pabrik & UKM</h2>
                 <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    Produksi jalan terus, tapi uangnya tidak ada? Itu tanda ada kebocoran di lantai produksi yang tidak Anda sadari.
                 </p>
                 <div className="space-y-4">
                     <div className="p-4 bg-slate-900 rounded-xl border border-white/5 flex gap-4">
                         <div className="mt-1 p-2 bg-red-500/10 rounded-lg text-red-400 h-fit"><AlertTriangle size={20} /></div>
                         <div>
                             <h4 className="text-white font-bold mb-1">Misteri HPP (Harga Pokok)</h4>
                             <p className="text-sm text-gray-400">Jual barang 100rb, untung atau rugi? Tidak tahu, karena biaya bahan + listrik + tenaga kerja tidak pernah dihitung akurat.</p>
                         </div>
                     </div>
                     <div className="p-4 bg-slate-900 rounded-xl border border-white/5 flex gap-4">
                         <div className="mt-1 p-2 bg-red-500/10 rounded-lg text-red-400 h-fit"><TrendingUp size={20} /></div>
                         <div>
                             <h4 className="text-white font-bold mb-1">Bahan Baku Bocor</h4>
                             <p className="text-sm text-gray-400">Beli kain 100 meter, cuma jadi 40 baju. Sisanya kemana? Potongan sisa (waste) atau dicuri?</p>
                         </div>
                     </div>
                 </div>
             </div>
             
             <div className="relative">
                 <GlassCard className="border-t-4 border-t-indigo-500 relative z-10 !bg-slate-900 shadow-2xl">
                     <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <CheckCircle2 className="text-indigo-500"/> Solusi SIBOS Manufaktur
                     </h3>
                     <ul className="space-y-4">
                         {[
                             "Bill of Materials (Resep Produksi Bertingkat)",
                             "Work Order Digital (SPK Tanpa Kertas)",
                             "Pelacakan WIP (Barang Setengah Jadi)",
                             "Kalkulasi HPP Otomatis per Batch",
                             "Manajemen Limbah (Waste Management)"
                         ].map((item, i) => (
                             <li key={i} className="flex items-center gap-3 text-gray-300 p-3 bg-white/5 rounded-lg border border-white/5">
                                 <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                                 {item}
                             </li>
                         ))}
                     </ul>
                 </GlassCard>
                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-[80px] -z-10"></div>
             </div>
         </div>
      </section>

      {/* CORE FEATURES SHOWCASE */}
      <section className="py-20 bg-slate-900 border-y border-white/5">
          <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-white mb-4">Fitur Kelas Pabrik, Harga UKM</h2>
                  <p className="text-gray-400">Cocok untuk Pabrik Roti, Konveksi, Furniture, hingga Perakitan Elektronik.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  {/* BOM */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-indigo-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500 mb-6 group-hover:scale-110 transition-transform">
                          <Layers size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Bill of Materials (BOM)</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          Definisikan resep produk anda. "Meja Makan" = 4 Kaki Kayu + 1 Papan Jati + 0.5 Liter Pernis + 2 Jam Tenaga Tukang.
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 flex flex-col justify-center p-3 gap-1">
                          <div className="flex justify-between text-xs text-gray-400"><span>Kayu</span> <span>4 btg</span></div>
                          <div className="flex justify-between text-xs text-gray-400"><span>Paku</span> <span>20 pcs</span></div>
                          <div className="border-t border-white/10 pt-1 mt-1 flex justify-between text-xs text-white font-bold"><span>Total HPP</span> <span>Rp 450k</span></div>
                      </div>
                  </div>

                  {/* Work Order */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-violet-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center text-violet-500 mb-6 group-hover:scale-110 transition-transform">
                          <ClipboardList size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Work Order (SPK)</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          Buat Surat Perintah Kerja digital. Lacak status produksi dari "Queued", "Cutting", "Sewing", hingga "Finished Goods" secara real-time.
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 p-3 flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-[10px] font-bold text-white">QC</div>
                          <div className="h-1 flex-1 bg-slate-800 rounded overflow-hidden">
                              <div className="h-full bg-green-500 w-[80%]"></div>
                          </div>
                          <div className="text-xs text-gray-400">80%</div>
                      </div>
                  </div>

                  {/* Batch Tracking */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform">
                          <RefreshCw size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Manajemen Batch</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          Lacak hasil produksi per batch. Jika ada komplain pelanggan, Anda bisa telusuri bahan baku mana yang cacat dan siapa yang mengerjakannya.
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 flex items-center justify-center">
                          <div className="text-center">
                              <div className="text-xs text-gray-500">Batch #22019</div>
                              <div className="text-purple-400 font-bold text-lg">Lolos QC</div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* COSTING VISUAL */}
      <section className="py-20 container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 bg-gradient-to-r from-indigo-900/20 to-slate-900 rounded-3xl p-8 border border-indigo-500/20">
              <div className="lg:w-1/2">
                  <h2 className="text-2xl font-bold text-white mb-4">HPP Akurat = Profit Sehat</h2>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                      Berhenti menebak harga jual. SIBOS menghitung HPP (Harga Pokok Produksi) dengan presisi mikroskopik, memperhitungkan bahan baku, tenaga kerja, hingga biaya overhead (listrik/sewa).
                  </p>
                  <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-green-500"/> Material Cost (Bahan Baku)</li>
                      <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-green-500"/> Labor Cost (Upah Borongan/Harian)</li>
                      <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-green-500"/> Overhead Cost (Listrik, Penyusutan)</li>
                  </ul>
              </div>
              <div className="lg:w-1/2 flex justify-center">
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/10 w-64 backdrop-blur-sm relative">
                      <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">PROFIT +30%</div>
                      <div className="space-y-2 mb-4">
                          <div className="h-4 w-3/4 bg-white/10 rounded"></div>
                          <div className="h-4 w-1/2 bg-white/10 rounded"></div>
                      </div>
                      <div className="h-32 bg-indigo-500/20 rounded-xl flex items-end justify-center p-4 gap-2 border border-indigo-500/30">
                          <div className="w-8 bg-indigo-500 h-[40%] rounded-t"></div>
                          <div className="w-8 bg-violet-500 h-[60%] rounded-t"></div>
                          <div className="w-8 bg-purple-500 h-[80%] rounded-t"></div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center container mx-auto px-6">
        <GlassCard className="max-w-4xl mx-auto p-12 relative overflow-hidden bg-gradient-to-br from-slate-900 to-indigo-900/30 border-indigo-500/20">
           <div className="relative z-10">
              <Cog size={48} className="text-indigo-400 mx-auto mb-6 animate-spin-slow" />
              <h2 className="text-3xl font-bold text-white mb-6">Otomatisasi Pabrik Anda</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                 Tinggalkan pencatatan manual di papan tulis. Beralih ke sistem manufaktur digital yang membuat produksi lebih cepat, murah, dan terkontrol.
              </p>
              <button 
                onClick={() => onNavigate && onNavigate('backoffice')}
                className="px-8 py-4 bg-gradient-to-r from-sibos-orange to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-orange-900/50 flex items-center gap-2 mx-auto"
              >
                  Mulai Manufaktur Digital
                  <ArrowRight size={20} />
              </button>
           </div>
        </GlassCard>
      </section>

    </div>
  );
};
