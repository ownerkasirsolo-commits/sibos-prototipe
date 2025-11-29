import React from 'react';
import { 
  Box, Warehouse, ClipboardList, Truck, 
  History, AlertTriangle, ScanLine, ArrowRightLeft,
  PieChart
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

export const IRMPage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 animate-in fade-in duration-500">
      
      {/* IMPROVED HERO SECTION WITH IMAGE */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop" 
            alt="Warehouse Management" 
            className="w-full h-full object-cover opacity-30"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-950/90 to-slate-950"></div>
        </div>
        
        {/* Pattern Overlays */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>

        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] -z-10"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-bold tracking-wider mb-8 shadow-lg shadow-cyan-900/20 backdrop-blur-md">
            <Warehouse size={14} className="animate-pulse" />
            INVENTORY RELATIONSHIP MANAGEMENT
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
            Kontrol Stok Tanpa <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Celah & Kebocoran
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Stok adalah uang yang mengendap. SIBOS IRM membantu Anda melacak setiap barang yang masuk dan keluar secara real-time, multi-gudang, dan akurat.
          </p>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-16 container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <GlassCard className="group hover:border-cyan-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Warehouse size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Multi Gudang & Cabang</h3>
            <p className="text-gray-400 text-sm">
              Kelola stok di gudang pusat, toko cabang, hingga gudang titipan (konsinyasi) dalam satu dashboard terpusat.
            </p>
          </GlassCard>

          <GlassCard className="group hover:border-cyan-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ClipboardList size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Stock Opname Digital</h3>
            <p className="text-gray-400 text-sm">
              Ucapkan selamat tinggal pada kertas. Lakukan stok opname menggunakan HP/Tablet, scan barcode, dan lihat selisih stok secara langsung.
            </p>
          </GlassCard>

          <GlassCard className="group hover:border-cyan-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ArrowRightLeft size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Mutasi & Transfer</h3>
            <p className="text-gray-400 text-sm">
              Pemindahan stok antar cabang tercatat rapi dengan status: <em>Pending, In-Transit, Received</em>. Mencegah barang hilang di jalan.
            </p>
          </GlassCard>

          <GlassCard className="group hover:border-cyan-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Low Stock Alert</h3>
            <p className="text-gray-400 text-sm">
              Notifikasi otomatis ketika stok menipis di bawah batas minimum. Bisa langsung buat PO (Purchase Order) ke supplier.
            </p>
          </GlassCard>

          <GlassCard className="group hover:border-cyan-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-yellow-500/10 text-yellow-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <History size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Kartu Stok & Riwayat</h3>
            <p className="text-gray-400 text-sm">
              Audit trail lengkap. Ketahui siapa yang mengubah stok, kapan, dan alasannya (Penjualan, Retur, Rusak, atau Penyesuaian).
            </p>
          </GlassCard>

          <GlassCard className="group hover:border-cyan-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ScanLine size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Batch & Expired Date</h3>
            <p className="text-gray-400 text-sm">
              Krusial untuk Farmasi & F&B. Lacak tanggal kedaluwarsa per batch barang masuk. Sistem akan memprioritaskan stok lama keluar dulu (FEFO).
            </p>
          </GlassCard>

        </div>
      </section>

      {/* Visual Workflow Section */}
      <section className="py-20 bg-slate-900 border-y border-white/5">
        <div className="container mx-auto px-6">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                 {/* Illustration of Inventory Flow */}
                 <div className="relative aspect-square max-w-md mx-auto">
                    {/* Central Hub */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-900/50 rounded-full border border-cyan-500/50 flex items-center justify-center z-10 animate-pulse">
                        <Warehouse size={40} className="text-cyan-400" />
                    </div>
                    
                    {/* Orbiting Elements */}
                    <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 bg-slate-800 p-3 rounded-lg border border-white/10 shadow-lg">
                            <Truck size={20} className="text-green-400" />
                        </div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 bg-slate-800 p-3 rounded-lg border border-white/10 shadow-lg">
                            <Box size={20} className="text-yellow-400" />
                        </div>
                        <div className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 bg-slate-800 p-3 rounded-lg border border-white/10 shadow-lg">
                            <ArrowRightLeft size={20} className="text-blue-400" />
                        </div>
                        <div className="absolute right-0 top-1/2 translate-x-4 -translate-y-1/2 bg-slate-800 p-3 rounded-lg border border-white/10 shadow-lg">
                            <PieChart size={20} className="text-purple-400" />
                        </div>
                    </div>

                    {/* Connecting Rings */}
                    <div className="absolute inset-8 border border-dashed border-white/10 rounded-full"></div>
                    <div className="absolute inset-24 border border-white/5 rounded-full"></div>
                 </div>
              </div>

              <div>
                 <h2 className="text-3xl font-bold text-white mb-6">Alur Logistik Cerdas</h2>
                 <p className="text-gray-400 mb-8 text-lg">
                    IRM SIBOS tidak hanya mencatat jumlah, tapi mengoptimalkan pergerakan barang.
                 </p>
                 <div className="space-y-6">
                    <div className="flex gap-4">
                       <div className="mt-1 p-2 bg-green-500/10 rounded text-green-400 h-fit"><Truck size={20} /></div>
                       <div>
                          <h4 className="text-white font-bold">Penerimaan Barang (Inbound)</h4>
                          <p className="text-gray-400 text-sm mt-1">
                             Cocokkan PO dengan barang fisik yang datang. Tolak otomatis jika jumlah berlebih atau kondisi rusak.
                          </p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <div className="mt-1 p-2 bg-blue-500/10 rounded text-blue-400 h-fit"><Box size={20} /></div>
                       <div>
                          <h4 className="text-white font-bold">Manajemen Rak (Bin Location)</h4>
                          <p className="text-gray-400 text-sm mt-1">
                             Petakan lokasi barang hingga ke nomor rak dan baris. Mempercepat proses pengambilan barang (picking) oleh staf gudang.
                          </p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <div className="mt-1 p-2 bg-purple-500/10 rounded text-purple-400 h-fit"><PieChart size={20} /></div>
                       <div>
                          <h4 className="text-white font-bold">Analisis Perputaran (Turnover)</h4>
                          <p className="text-gray-400 text-sm mt-1">
                             Identifikasi <em>Slow Moving</em> dan <em>Dead Stock</em>. Ambil keputusan diskon sebelum barang menjadi sampah.
                          </p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center container mx-auto px-6">
        <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 rounded-3xl p-12 border border-cyan-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Warehouse size={300} />
            </div>
            <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Stop Kehilangan Aset Anda</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8 relative z-10">
                Data SIBOS menunjukkan: Bisnis yang menggunakan sistem IRM mengurangi kerugian akibat stok hilang/rusak hingga 85% dalam 3 bulan pertama.
            </p>
            <button className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-cyan-900/50 relative z-10">
                Konsultasi Manajemen Stok
            </button>
        </div>
      </section>

    </div>
  );
};