
import React from 'react';
import { 
  Monitor, Smartphone, ScanBarcode, Scale, 
  Calculator, Layers, DollarSign, WifiOff, 
  Printer, ArrowRight, Settings, PackageCheck,
  Shirt, Wrench, Box, Ticket, GraduationCap, Building2, Sprout
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

export const POSPage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 animate-in fade-in duration-500">
      {/* IMPROVED HERO SECTION WITH IMAGE */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop" 
            alt="Modern POS System" 
            className="w-full h-full object-cover opacity-30"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-950/90 to-slate-950"></div>
        </div>
        
        {/* Pattern Overlays */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>

        {/* Decorative Blobs */}
        <div className="absolute top-10 right-10 w-[600px] h-[600px] bg-sibos-orange/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sibos-orange text-xs font-bold tracking-wider mb-8 shadow-[0_0_15px_rgba(255,107,0,0.3)] backdrop-blur-md">
            <Monitor size={14} />
            MODUL UTAMA SIBOS
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-2xl">
            Point of Sales <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sibos-orange to-red-500">
              Tanpa Batasan
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Bukan sekadar kasir biasa. SIBOS POS dirancang untuk menangani kompleksitas bisnis modern, dari warung kelontong, butik fashion, bengkel, hingga jaringan ritel multi-cabang.
          </p>
        </div>
      </section>

      {/* Industry Solutions (NEW SECTION) */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Solusi Spesifik Industri</h2>
            <p className="text-gray-400">Kami paham, setiap bisnis punya cara main yang berbeda.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GlassCard className="border-t-4 border-t-pink-500">
                <div className="w-12 h-12 rounded-lg bg-pink-500/10 text-pink-500 flex items-center justify-center mb-4">
                    <Shirt size={24} />
                </div>
                <h3 className="font-bold text-white mb-2">Fashion & Butik</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Kelola stok dengan <strong>Matriks Varian</strong> (Warna & Ukuran). Cetak label barcode sendiri dan lacak stok per SKU unik.
                </p>
            </GlassCard>

            <GlassCard className="border-t-4 border-t-blue-500">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                    <Smartphone size={24} />
                </div>
                <h3 className="font-bold text-white mb-2">Elektronik & Gadget</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Wajib catat <strong>Serial Number (SN)</strong> atau IMEI saat penjualan untuk garansi. Lacak riwayat servis per unit barang.
                </p>
            </GlassCard>

            <GlassCard className="border-t-4 border-t-green-500">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center mb-4">
                    <Wrench size={24} />
                </div>
                <h3 className="font-bold text-white mb-2">Jasa & Bengkel</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Gabungkan Jasa + Sparepart dalam satu struk. Hitung otomatis <strong>Komisi Mekanik/Kapster</strong> per transaksi servis.
                </p>
            </GlassCard>

             <GlassCard className="border-t-4 border-t-purple-500">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4">
                    <Ticket size={24} />
                </div>
                <h3 className="font-bold text-white mb-2">Hiburan & Tiket</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Cetak tiket masuk dengan QR Code unik (Gate Access). Fitur <strong>Billing Timer</strong> untuk rental, warnet, atau karaoke.
                </p>
            </GlassCard>

            <GlassCard className="border-t-4 border-t-indigo-500">
                <div className="w-12 h-12 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4">
                    <GraduationCap size={24} />
                </div>
                <h3 className="font-bold text-white mb-2">Pendidikan & Kursus</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Manajemen tagihan berulang (SPP/Iuran). Database siswa dan riwayat pembayaran cicilan yang rapi.
                </p>
            </GlassCard>

            <GlassCard className="border-t-4 border-t-teal-500">
                <div className="w-12 h-12 rounded-lg bg-teal-500/10 text-teal-500 flex items-center justify-center mb-4">
                    <Building2 size={24} />
                </div>
                <h3 className="font-bold text-white mb-2">Properti & Hotel</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Bukan jual barang, tapi sewa ruang. Fitur <strong>Booking Kalender</strong>, Check-in/Out, dan manajemen deposit tamu.
                </p>
            </GlassCard>

            <GlassCard className="border-t-4 border-t-emerald-500">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
                    <Sprout size={24} />
                </div>
                <h3 className="font-bold text-white mb-2">Agribisnis</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Penjualan curah (Ton/Kg) dengan penyesuaian harga harian. Lacak <strong>Batch Panen</strong> untuk kontrol kualitas.
                </p>
            </GlassCard>

            <GlassCard className="border-t-4 border-t-yellow-500">
                <div className="w-12 h-12 rounded-lg bg-yellow-500/10 text-yellow-500 flex items-center justify-center mb-4">
                    <Box size={24} />
                </div>
                <h3 className="font-bold text-white mb-2">Grosir & Distributor</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Sistem <strong>Multi-Level Harga</strong> (Ecer, Grosir 1, Grosir 2). Konversi satuan otomatis dari Dus ke Pcs saat pecah stok.
                </p>
            </GlassCard>
        </div>
      </section>

      {/* Core Capabilities Grid */}
      <section className="py-20 bg-slate-900 border-t border-white/5">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Fitur Inti SIBOS POS</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <GlassCard className="group hover:border-sibos-orange/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calculator size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Transaksi Desimal & Presisi</h3>
                <p className="text-gray-400 text-sm">
                Mendukung penjualan barang curah (kg, liter, meter) dengan input desimal. Cocok untuk toko bangunan, kain, atau bahan pokok.
                </p>
            </GlassCard>

            <GlassCard className="group hover:border-sibos-orange/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <PackageCheck size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Multi Satuan & Konversi</h3>
                <p className="text-gray-400 text-sm">
                Jual dalam Pcs, Pack, Lusin, atau Karton. Stok otomatis terpotong sesuai rasio konversi yang Anda atur (Preset Satuan).
                </p>
            </GlassCard>

            <GlassCard className="group hover:border-sibos-orange/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Layers size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Multi Varian & Harga</h3>
                <p className="text-gray-400 text-sm">
                Satu produk bisa punya banyak varian (Warna, Ukuran) dan level harga berbeda (Ecer, Grosir, Member, VIP).
                </p>
            </GlassCard>

            <GlassCard className="group hover:border-sibos-orange/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Settings size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Produksi & Bahan Baku</h3>
                <p className="text-gray-400 text-sm">
                Fitur manufaktur ringan. Gabungkan beberapa bahan baku menjadi produk baru (Bundling) atau hitung HPP produksi FnB secara otomatis.
                </p>
            </GlassCard>

            <GlassCard className="group hover:border-sibos-orange/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ScanBarcode size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Database Produk Global</h3>
                <p className="text-gray-400 text-sm">
                Tidak perlu input manual satu per satu. Tarik ribuan data produk pabrikan (barcode, nama, kategori) langsung dari server SIBOS.
                </p>
            </GlassCard>

            <GlassCard className="group hover:border-sibos-orange/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-yellow-500/10 text-yellow-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <DollarSign size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Slot Iklan POS</h3>
                <p className="text-gray-400 text-sm">
                Dapatkan penghasilan tambahan! Layar POS Anda (customer display) bisa menampilkan iklan dari server pusat, bagi hasil untuk Anda.
                </p>
            </GlassCard>

            </div>
        </div>
      </section>

      {/* Hardware & Platform Support */}
      <section className="py-20 bg-slate-900 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
             <div>
                <h2 className="text-3xl font-bold text-white mb-6">Fleksibilitas Perangkat Keras</h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  SIBOS POS tidak rewel soal perangkat. Kami mendukung berbagai ekosistem hardware untuk memastikan investasi Anda efisien.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4 text-gray-300">
                    <div className="p-2 bg-white/5 rounded-lg text-sibos-orange"><Scale size={20}/></div>
                    <div>
                      <strong className="text-white block">Timbangan Digital</strong>
                      <span className="text-sm">Baca berat otomatis ke sistem (Barcode Timbang/Kabel).</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-4 text-gray-300">
                    <div className="p-2 bg-white/5 rounded-lg text-sibos-orange"><Printer size={20}/></div>
                    <div>
                      <strong className="text-white block">Printer Barcode & Struk</strong>
                      <span className="text-sm">Kompatibel dengan ESC/POS thermal printer & label printer.</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-4 text-gray-300">
                    <div className="p-2 bg-white/5 rounded-lg text-sibos-orange"><Smartphone size={20}/></div>
                    <div>
                      <strong className="text-white block">Multi Platform</strong>
                      <span className="text-sm">Optimal di Android, iOS (iPhone SE+), Windows, Linux, & Web.</span>
                    </div>
                  </li>
                </ul>
             </div>
             
             <div className="relative">
                {/* Visual Representation of POS UI */}
                <div className="bg-slate-800 rounded-xl border-8 border-slate-700 shadow-2xl overflow-hidden aspect-video relative group">
                   <div className="absolute inset-0 bg-slate-900 flex">
                      {/* Sidebar */}
                      <div className="w-16 bg-slate-950 border-r border-white/5 flex flex-col items-center py-4 gap-4">
                         <div className="w-8 h-8 rounded bg-sibos-orange"></div>
                         <div className="w-8 h-8 rounded bg-white/10"></div>
                         <div className="w-8 h-8 rounded bg-white/10"></div>
                      </div>
                      {/* Main Content */}
                      <div className="flex-1 p-4">
                         <div className="h-8 w-1/3 bg-white/10 rounded mb-4"></div>
                         <div className="grid grid-cols-4 gap-3">
                            {[1,2,3,4,5,6,7,8].map(i => (
                               <div key={i} className="aspect-square bg-white/5 rounded-lg animate-pulse" style={{animationDelay: `${i*0.1}s`}}></div>
                            ))}
                         </div>
                      </div>
                      {/* Cart Panel */}
                      <div className="w-1/3 bg-slate-950 border-l border-white/5 p-4 flex flex-col">
                         <div className="h-6 w-1/2 bg-white/10 rounded mb-4"></div>
                         <div className="space-y-2 flex-1">
                             <div className="h-10 bg-white/5 rounded"></div>
                             <div className="h-10 bg-white/5 rounded"></div>
                         </div>
                         <div className="h-12 bg-sibos-orange rounded mt-4 flex items-center justify-center text-white font-bold text-xs">BAYAR</div>
                      </div>
                   </div>
                   
                   {/* Overlay Text */}
                   <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white font-bold border border-white px-4 py-2 rounded-full">Tampilan UI Modern</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Connectivity */}
      <section className="py-20 container mx-auto px-6 text-center">
        <GlassCard className="inline-block p-8 border-sibos-orange/30">
           <div className="flex flex-col md:flex-row items-center gap-8 text-left">
              <div className="p-4 bg-sibos-orange/20 rounded-full text-sibos-orange">
                 <WifiOff size={32} />
              </div>
              <div>
                 <h3 className="text-2xl font-bold text-white mb-2">Internet Mati? Tetap Jualan.</h3>
                 <p className="text-gray-400 max-w-xl">
                    SIBOS mendukung mode <strong>Offline First</strong> (khusus aplikasi Desktop/Mobile Native). Data akan tersimpan lokal dan sinkronisasi otomatis ke cloud saat internet kembali menyala.
                 </p>
              </div>
           </div>
        </GlassCard>
      </section>

    </div>
  );
};
