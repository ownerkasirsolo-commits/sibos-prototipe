
import React from 'react';
import { 
  Pill, Stethoscope, Activity, FileText, 
  ScanLine, TrendingUp, AlertTriangle, Layers, 
  ArrowRight, CheckCircle2, Zap, Package, 
  ClipboardCheck, FlaskConical
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { Page } from '../types';

interface SolutionPharmacyPageProps {
    onNavigate?: (page: Page) => void;
}

export const SolutionPharmacyPage: React.FC<SolutionPharmacyPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 animate-in fade-in duration-500">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold tracking-wider mb-8 shadow-lg shadow-red-900/20 backdrop-blur-md">
            <Stethoscope size={14} />
            FARMASI & APOTEK
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
            Kesehatan Tidak Boleh <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-pink-400">
              Salah Hitung.
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md mb-10">
            Obat kadaluarsa adalah musuh terbesar apotek. SIBOS menghadirkan sistem pelacakan batch dan expiry date otomatis, memastikan keselamatan pasien dan profit bisnis Anda terjaga.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4">
             <button 
                onClick={() => onNavigate && onNavigate('pos')}
                className="px-8 py-4 bg-gradient-to-r from-sibos-orange to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-orange-900/50 flex items-center justify-center gap-2"
             >
                <Zap size={20} /> Lihat POS Apotek
             </button>
             <button 
                onClick={() => onNavigate && onNavigate('irm')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all border border-white/10 flex items-center justify-center gap-2"
             >
                <ScanLine size={20} /> Cek Stok Batch
             </button>
          </div>
        </div>
      </section>

      {/* PAIN POINTS & SOLUTION */}
      <section className="py-20 container mx-auto px-6">
         <div className="grid md:grid-cols-2 gap-16 items-center">
             <div>
                 <h2 className="text-3xl font-bold text-white mb-6">Mimpi Buruk Pengelola Apotek</h2>
                 <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    Kesalahan kecil di apotek bisa berakibat fatal bagi pasien dan reputasi bisnis. Administrasi manual sudah tidak relevan.
                 </p>
                 <div className="space-y-4">
                     <div className="p-4 bg-slate-900 rounded-xl border border-white/5 flex gap-4">
                         <div className="mt-1 p-2 bg-red-500/10 rounded-lg text-red-400 h-fit"><AlertTriangle size={20} /></div>
                         <div>
                             <h4 className="text-white font-bold mb-1">Obat Expired (ED) Menumpuk</h4>
                             <p className="text-sm text-gray-400">Barang masuk gudang, lupa dicek ED-nya. Tahu-tahu sudah basi dan harus dibuang. Rugi jutaan.</p>
                         </div>
                     </div>
                     <div className="p-4 bg-slate-900 rounded-xl border border-white/5 flex gap-4">
                         <div className="mt-1 p-2 bg-red-500/10 rounded-lg text-red-400 h-fit"><Activity size={20} /></div>
                         <div>
                             <h4 className="text-white font-bold mb-1">Pusing Hitung HPP Racikan</h4>
                             <p className="text-sm text-gray-400">Dokter minta puyer kombinasi 3 obat. Berapa HPP-nya? Berapa jasa apotekernya? Hitung manual rawan salah.</p>
                         </div>
                     </div>
                 </div>
             </div>
             
             <div className="relative">
                 <GlassCard className="border-t-4 border-t-red-500 relative z-10 !bg-slate-900 shadow-2xl">
                     <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <CheckCircle2 className="text-red-500"/> Solusi SIBOS Farmasi
                     </h3>
                     <ul className="space-y-4">
                         {[
                             "FEFO (First Expired, First Out) Otomatis",
                             "Notifikasi Obat Hampir ED (H-90, H-30)",
                             "Manajemen Resep Dokter & Racikan",
                             "Kartu Stok Digital per Batch Number",
                             "Konversi Satuan (Box -> Strip -> Tablet)"
                         ].map((item, i) => (
                             <li key={i} className="flex items-center gap-3 text-gray-300 p-3 bg-white/5 rounded-lg border border-white/5">
                                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                 {item}
                             </li>
                         ))}
                     </ul>
                 </GlassCard>
                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-500/20 rounded-full blur-[80px] -z-10"></div>
             </div>
         </div>
      </section>

      {/* CORE FEATURES SHOWCASE */}
      <section className="py-20 bg-slate-900 border-y border-white/5">
          <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-white mb-4">Fitur Spesialis Medis</h2>
                  <p className="text-gray-400">Dirancang sesuai standar operasional apotek (GPP) dan regulasi BPOM.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  {/* Batch Tracking */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-red-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform">
                          <ScanLine size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Batch & Expiry Date</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          Saat penerimaan barang, input No. Batch & ED. Saat penjualan, sistem otomatis memotong stok dari batch yang paling cepat kadaluarsa (FEFO).
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 flex flex-col justify-center p-3 gap-2">
                          <div className="flex justify-between text-xs text-green-400 border-b border-white/10 pb-1">
                              <span>Batch A (ED Jun 25)</span>
                              <span>Prioritas</span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                              <span>Batch B (ED Des 25)</span>
                              <span>Hold</span>
                          </div>
                      </div>
                  </div>

                  {/* Compounding / Racikan */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                          <FlaskConical size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Kalkulator Racikan</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          Input komposisi resep (Paracetamol 1/2 tab + CTM 1 tab). Sistem otomatis menghitung HPP, menambahkan biaya Embalase & Jasa Profesi.
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 flex items-center justify-center">
                          <div className="text-center">
                              <div className="text-xs text-gray-500">Total Harga Resep</div>
                              <div className="text-blue-400 font-bold text-lg">Rp 45.500</div>
                          </div>
                      </div>
                  </div>

                  {/* Stock Card */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-green-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 mb-6 group-hover:scale-110 transition-transform">
                          <ClipboardCheck size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Kartu Stok Digital</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          Lacak pergerakan setiap butir obat. Siapa yang jual, siapa yang terima, jam berapa. Siap untuk audit BPOM kapan saja tanpa bongkar gudang.
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 p-3 overflow-hidden">
                          <div className="space-y-2 text-[10px] text-gray-400">
                              <div className="flex justify-between border-b border-white/5 pb-1"><span>IN</span> <span>PT Anugrah (10 Box)</span></div>
                              <div className="flex justify-between border-b border-white/5 pb-1"><span>OUT</span> <span>Resep #992 (3 Strip)</span></div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* UNIT CONVERSION VISUAL */}
      <section className="py-20 container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 bg-gradient-to-r from-red-900/20 to-slate-900 rounded-3xl p-8 border border-red-500/20">
              <div className="lg:w-1/2">
                  <h2 className="text-2xl font-bold text-white mb-4">Multi-Satuan yang Fleksibel</h2>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                      Beli dari PBF dalam satuan <strong>Box Besar</strong>, jual ke pasien dalam satuan <strong>Strip</strong> atau bahkan <strong>Tablet</strong> eceran. Stok otomatis terkonversi tanpa selisih.
                  </p>
                  <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-green-500"/> Otomatis pecah stok (Breakdown)</li>
                      <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-green-500"/> Harga jual berbeda tiap satuan</li>
                      <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-green-500"/> Laporan stok dalam satuan terkecil</li>
                  </ul>
              </div>
              <div className="lg:w-1/2 flex justify-center items-center gap-4">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                      <Package size={32} className="text-red-400 mx-auto mb-2"/>
                      <div className="text-xs font-bold text-white">1 BOX</div>
                  </div>
                  <ArrowRight className="text-gray-500" />
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                      <Layers size={32} className="text-red-400 mx-auto mb-2"/>
                      <div className="text-xs font-bold text-white">10 STRIP</div>
                  </div>
                  <ArrowRight className="text-gray-500" />
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                      <Pill size={32} className="text-red-400 mx-auto mb-2"/>
                      <div className="text-xs font-bold text-white">100 TAB</div>
                  </div>
              </div>
          </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center container mx-auto px-6">
        <GlassCard className="max-w-4xl mx-auto p-12 relative overflow-hidden bg-gradient-to-br from-slate-900 to-red-900/30 border-red-500/20">
           <div className="relative z-10">
              <Pill size={48} className="text-red-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-6">Amankan Stok Obat Anda</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                 Tidur nyenyak tanpa takut didatangi audit atau rugi karena obat expired. SIBOS Farmasi menjaga aset Anda 24/7.
              </p>
              <button 
                onClick={() => onNavigate && onNavigate('backoffice')}
                className="px-8 py-4 bg-gradient-to-r from-sibos-orange to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-orange-900/50 flex items-center gap-2 mx-auto"
              >
                  Mulai Gratis Sekarang
                  <ArrowRight size={20} />
              </button>
           </div>
        </GlassCard>
      </section>

    </div>
  );
};
