
import React from 'react';
import { 
  ShoppingBag, ScanBarcode, Box, Scale, 
  Tags, TrendingUp, AlertTriangle, Layers, 
  ArrowRight, CheckCircle2, Zap, Package
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { Page } from '../types';

interface SolutionRetailPageProps {
    onNavigate?: (page: Page) => void;
}

export const SolutionRetailPage: React.FC<SolutionRetailPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 animate-in fade-in duration-500">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-wider mb-8 shadow-lg shadow-blue-900/20 backdrop-blur-md">
            <ShoppingBag size={14} />
            RITEL & GROSIR MODERN
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
            Lawan Raksasa Ritel. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400">
              Warung Anda, Aturan Anda.
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md mb-10">
            Jangan biarkan toko kelontong Anda tergerus oleh jaringan minimarket asing. SIBOS memberikan teknologi inventory dan kasir sekelas enterprise agar Anda bisa bersaing head-to-head.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4">
             <button 
                onClick={() => onNavigate && onNavigate('pos')}
                className="px-8 py-4 bg-gradient-to-r from-sibos-orange to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-orange-900/50 flex items-center justify-center gap-2"
             >
                <Zap size={20} /> Lihat POS Retail
             </button>
             <button 
                onClick={() => onNavigate && onNavigate('irm')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all border border-white/10 flex items-center justify-center gap-2"
             >
                <Package size={20} /> Manajemen Gudang
             </button>
          </div>
        </div>
      </section>

      {/* PAIN POINTS & SOLUTION */}
      <section className="py-20 container mx-auto px-6">
         <div className="grid md:grid-cols-2 gap-16 items-center">
             <div>
                 <h2 className="text-3xl font-bold text-white mb-6">Masalah Klasik Toko Ritel</h2>
                 <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    Margin ritel itu tipis. Sedikit saja kebocoran stok atau salah harga, keuntungan sebulan bisa lenyap.
                 </p>
                 <div className="space-y-4">
                     <div className="p-4 bg-slate-900 rounded-xl border border-white/5 flex gap-4">
                         <div className="mt-1 p-2 bg-red-500/10 rounded-lg text-red-400 h-fit"><AlertTriangle size={20} /></div>
                         <div>
                             <h4 className="text-white font-bold mb-1">Stok Selisih = Uang Hilang</h4>
                             <p className="text-sm text-gray-400">Barang fisik habis tapi di catatan masih ada? Itu tanda pencurian atau admin lalai.</p>
                         </div>
                     </div>
                     <div className="p-4 bg-slate-900 rounded-xl border border-white/5 flex gap-4">
                         <div className="mt-1 p-2 bg-red-500/10 rounded-lg text-red-400 h-fit"><TrendingUp size={20} /></div>
                         <div>
                             <h4 className="text-white font-bold mb-1">Salah Harga Grosir</h4>
                             <p className="text-sm text-gray-400">Kasir bingung memberi harga saat pelanggan beli 1 pcs vs beli 1 dus. Akibatnya rugi.</p>
                         </div>
                     </div>
                 </div>
             </div>
             
             <div className="relative">
                 <GlassCard className="border-t-4 border-t-blue-500 relative z-10 !bg-slate-900 shadow-2xl">
                     <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <CheckCircle2 className="text-blue-500"/> Solusi SIBOS Ritel
                     </h3>
                     <ul className="space-y-4">
                         {[
                             "Barcode Scanning Super Cepat",
                             "Multi-Satuan (Pcs, Lusin, Dus)",
                             "Harga Bertingkat (Grosir 1, Grosir 2, Ecer)",
                             "Stok Opname Pakai HP (Tanpa Alat Mahal)",
                             "Cetak Label Rak & Barcode Sendiri"
                         ].map((item, i) => (
                             <li key={i} className="flex items-center gap-3 text-gray-300 p-3 bg-white/5 rounded-lg border border-white/5">
                                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
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
                  <h2 className="text-3xl font-bold text-white mb-4">Fitur Wajib Juragan Grosir</h2>
                  <p className="text-gray-400">Didesain khusus untuk menangani ribuan SKU dan transaksi volume tinggi.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  {/* Multi Unit */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                          <Box size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Multi Satuan Otomatis</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          Stok tercatat dalam satuan terkecil (Pcs). Saat kasir scan barcode Dus, sistem otomatis memotong stok sebanyak isi dus (misal: 24 Pcs).
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 flex items-center justify-center">
                          <div className="text-center">
                              <div className="text-xs text-gray-500">Scan Dus</div>
                              <div className="text-blue-400 font-bold text-lg">- 24 Pcs</div>
                          </div>
                      </div>
                  </div>

                  {/* Tiered Pricing */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-green-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 mb-6 group-hover:scale-110 transition-transform">
                          <Tags size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Harga Bertingkat</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          Set aturan: "Beli 1 @Rp 5.000, Beli >10 @Rp 4.500". Kasir tidak perlu menghitung manual atau menghafal harga grosir.
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 p-3 flex flex-col justify-center gap-2">
                          <div className="flex justify-between text-xs text-gray-400 border-b border-white/10 pb-1">
                              <span>Qty 1-9</span>
                              <span className="text-white font-bold">Rp 5.000</span>
                          </div>
                          <div className="flex justify-between text-xs text-green-400 font-bold">
                              <span>Qty 10+</span>
                              <span>Rp 4.500</span>
                          </div>
                      </div>
                  </div>

                  {/* Stock Opname */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                          <ScanBarcode size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Stok Opname Harian</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          Lakukan cek stok sebagian (Partial Audit) setiap hari menggunakan kamera HP karyawan. Temukan selisih sebelum menjadi masalah besar.
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 flex items-center justify-center gap-3">
                          <div className="p-2 bg-white/5 rounded"><ScanBarcode size={20}/></div>
                          <ArrowRight size={16} className="text-gray-600"/>
                          <div className="text-xs font-bold text-green-400">Valid</div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* SCALE & HARDWARE */}
      <section className="py-20 container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 bg-gradient-to-r from-blue-900/20 to-slate-900 rounded-3xl p-8 border border-blue-500/20">
              <div className="lg:w-1/2">
                  <h2 className="text-2xl font-bold text-white mb-4">Dukungan Hardware Lengkap</h2>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                      Toko ritel butuh kecepatan. SIBOS kompatibel dengan berbagai alat perang kasir tanpa perlu instalasi driver yang rumit.
                  </p>
                  <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-green-500"/> Barcode Scanner (USB/Bluetooth)</li>
                      <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-green-500"/> Printer Struk & Label</li>
                      <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-green-500"/> Timbangan Digital (Barcode Scale)</li>
                      <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-green-500"/> Laci Uang (Cash Drawer)</li>
                  </ul>
              </div>
              <div className="lg:w-1/2 flex justify-center">
                  <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col items-center">
                          <ScanBarcode size={40} className="text-blue-400 mb-2"/>
                          <span className="text-xs font-bold text-gray-400">Scanner</span>
                      </div>
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col items-center">
                          <Scale size={40} className="text-blue-400 mb-2"/>
                          <span className="text-xs font-bold text-gray-400">Timbangan</span>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center container mx-auto px-6">
        <GlassCard className="max-w-4xl mx-auto p-12 relative overflow-hidden bg-gradient-to-br from-slate-900 to-blue-900/30 border-blue-500/20">
           <div className="relative z-10">
              <ShoppingBag size={48} className="text-blue-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-6">Rapikan Toko Anda Hari Ini</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                 Tinggalkan buku catatan dan kalkulator. Beralih ke sistem modern yang membantu Anda tidur lebih nyenyak karena stok dan uang aman.
              </p>
              <button 
                onClick={() => onNavigate && onNavigate('backoffice')}
                className="px-8 py-4 bg-gradient-to-r from-sibos-orange to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-orange-900/50 flex items-center gap-2 mx-auto"
              >
                  Coba Gratis Sekarang
                  <ArrowRight size={20} />
              </button>
           </div>
        </GlassCard>
      </section>

    </div>
  );
};
