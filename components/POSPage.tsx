
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
    <div className="pt-20 min-h-screen bg-slate-950">
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
        <div className="absolute top-10 right-10 w-[600px] h-[600px] bg-sibos-orange/10 rounded-full blur-[120px] -z-10"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sibos-orange text-xs font-bold tracking-wider mb-8 shadow-[0_0_15px_rgba(255,107,0,0.3)] backdrop-blur-md">
            <Monitor size={14} />
            BENTENG PERTAHANAN BISNIS
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-2xl">
            Mesin Perang <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sibos-orange to-red-500">
              Di Garis Depan
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Kasir bukan sekadar tempat mencatat uang, tapi benteng pertahanan terakhir. Kecepatan adalah kunci agar pelanggan tidak lari ke toko sebelah (kompetitor raksasa). SIBOS POS adalah senjata yang Anda butuhkan untuk memenangkan pertempuran harian di lantai toko.
          </p>
        </div>
      </section>

      {/* Industry Solutions (NEW SECTION) */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Solusi Spesifik Industri</h2>
            <p className="text-gray-400">Kami paham, setiap medan perang punya strategi yang berbeda.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GlassCard className="border-t-4 border-t-pink-500 group hover:bg-pink-900/10 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-pink-500/10 text-pink-500 flex items-center justify-center mb-4">
                    <Shirt size={24} />
                </div>
                <h3 className="font-bold text-white mb-2 group-hover:text-pink-400">Fashion & Butik</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Kelola stok dengan <strong>Matriks Varian</strong> (Warna & Ukuran). Cetak label barcode sendiri dan lacak stok per SKU unik.
                </p>
            </GlassCard>

            <GlassCard className="border-t-4 border-t-blue-500 group hover:bg-blue-900/10 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                    <Smartphone size={24} />
                </div>
                <h3 className="font-bold text-white mb-2 group-hover:text-blue-400">Elektronik & Gadget</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Wajib catat <strong>Serial Number (SN)</strong> atau IMEI saat penjualan untuk garansi. Lacak riwayat servis per unit barang.
                </p>
            </GlassCard>

            <GlassCard className="border-t-4 border-t-green-500 group hover:bg-green-900/10 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center mb-4">
                    <Wrench size={24} />
                </div>
                <h3 className="font-bold text-white mb-2 group-hover:text-green-400">Jasa & Bengkel</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Gabungkan Jasa + Sparepart dalam satu struk. Hitung otomatis <strong>Komisi Mekanik/Kapster</strong> per transaksi servis.
                </p>
            </GlassCard>

             <GlassCard className="border-t-4 border-t-purple-500 group hover:bg-purple-900/10 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4">
                    <Ticket size={24} />
                </div>
                <h3 className="font-bold text-white mb-2 group-hover:text-purple-400">Hiburan & Tiket</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Cetak tiket masuk dengan QR Code unik (Gate Access). Fitur <strong>Billing Timer</strong> untuk rental, warnet, atau karaoke.
                </p>
            </GlassCard>

            <GlassCard className="border-t-4 border-t-indigo-500 group hover:bg-indigo-900/10 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4">
                    <GraduationCap size={24} />
                </div>
                <h3 className="font-bold text-white mb-2 group-hover:text-indigo-400">Pendidikan & Kursus</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Manajemen tagihan berulang (SPP/Iuran). Database siswa dan riwayat pembayaran cicilan yang rapi.
                </p>
            </GlassCard>

            <GlassCard className="border-t-4 border-t-teal-500 group hover:bg-teal-900/10 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-teal-500/10 text-teal-500 flex items-center justify-center mb-4">
                    <Building2 size={24} />
                </div>
                <h3 className="font-bold text-white mb-2 group-hover:text-teal-400">Properti & Hotel</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Bukan jual barang, tapi sewa ruang. Fitur <strong>Booking Kalender</strong>, Check-in/Out, dan manajemen deposit tamu.
                </p>
            </GlassCard>

            <GlassCard className="border-t-4 border-t-emerald-500 group hover:bg-emerald-900/10 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
                    <Sprout size={24} />
                </div>
                <h3 className="font-bold text-white mb-2 group-hover:text-emerald-400">Agribisnis</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Penjualan curah (Ton/Kg) dengan penyesuaian harga harian. Lacak <strong>Batch Panen</strong> untuk kontrol kualitas.
                </p>
            </GlassCard>

            <GlassCard className="border-t-4 border-t-yellow-500 group hover:bg-yellow-900/10 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-yellow-500/10 text-yellow-500 flex items-center justify-center mb-4">
                    <Box size={24} />
                </div>
                <h3 className="font-bold text-white mb-2 group-hover:text-yellow-400">Grosir & Distributor</h3>
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
                <div className="w-12 h-12 rounded-lg bg-sibos-orange/10 text-sibos-orange flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calculator size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sibos-orange">Transaksi Desimal & Presisi</h3>
                <p className="text-gray-400 text-sm">
                Mendukung penjualan barang curah (kg, liter, meter) dengan input desimal. Cocok untuk toko bangunan, kain, atau bahan pokok.
                </p>
            </GlassCard>

            <GlassCard className="group hover:border-sibos-orange/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-sibos-orange/10 text-sibos-orange flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <PackageCheck size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sibos-orange">Multi Satuan & Konversi</h3>
                <p className="text-gray-400 text-sm">
                Jual dalam Pcs, Pack, Lusin, atau Karton. Stok otomatis terpotong sesuai rasio konversi yang Anda atur (Preset Satuan).
                </p>
            </GlassCard>

            <GlassCard className="group hover:border-sibos-orange/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-sibos-orange/10 text-sibos-orange flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Layers size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sibos-orange">Multi Varian & Harga</h3>
                <p className="text-gray-400 text-sm">
                Satu produk bisa punya banyak varian (Warna, Ukuran) dan level harga berbeda (Ecer, Grosir, Member, VIP).
                </p>
            </GlassCard>

            <GlassCard className="group hover:border-sibos-orange/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-sibos-orange/10 text-sibos-orange flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Settings size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sibos-orange">Produksi & Bahan Baku</h3>
                <p className="text-gray-400 text-sm">
                Fitur manufaktur ringan. Gabungkan beberapa bahan baku menjadi produk baru (Bundling) atau hitung HPP produksi FnB secara otomatis.
                </p>
            </GlassCard>

            <GlassCard className="group hover:border-sibos-orange/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-sibos-orange/10 text-sibos-orange flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ScanBarcode size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sibos-orange">Database Produk Global</h3>
                <p className="text-gray-400 text-sm">
                Tidak perlu input manual satu per satu. Tarik ribuan data produk pabrikan (barcode, nama, kategori) langsung dari server SIBOS.
                </p>
            </GlassCard>

            <GlassCard className="group hover:border-sibos-orange/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-sibos-orange/10 text-sibos-orange flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <DollarSign size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sibos-orange">Slot Iklan POS</h3>
                <p className="text-gray-400 text-sm">
                Dapatkan penghasilan tambahan! Layar POS Anda (customer display) bisa menampilkan iklan dari server pusat, bagi hasil untuk Anda.
                </p>
            </GlassCard>

            </div>
        </div>
      </section>

      {/* Connectivity */}
      <section className="py-20 container mx-auto px-6 text-center">
        <GlassCard className="inline-block p-8 border-sibos-orange/30 bg-gradient-to-br from-slate-900 to-orange-900/20">
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
