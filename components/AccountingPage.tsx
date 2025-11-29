import React from 'react';
import { 
  PieChart, TrendingUp, FileText, Calculator, 
  RefreshCcw, Shield, DollarSign, BookOpen, 
  ArrowRight, CheckCircle2 
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

export const AccountingPage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 animate-in fade-in duration-500">
      
      {/* HERO SECTION WITH ILLUSTRATION BACKGROUND */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop" 
            alt="Financial Accounting" 
            className="w-full h-full object-cover opacity-20"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-950/90 to-slate-950"></div>
        </div>
        
        {/* Noise & Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wider mb-8 shadow-[0_0_20px_rgba(245,158,11,0.2)] backdrop-blur-md">
            <Calculator size={14} />
            INTEGRATED ACCOUNTING SYSTEM
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
            Lupakan Jurnal Manual, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
              Fokus pada Profit
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Setiap transaksi di Kasir, Gudang, atau Pembelian otomatis terjurnal ke dalam buku besar. SIBOS menyajikan Laporan Keuangan standar PSAK secara real-time.
          </p>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-16 container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <GlassCard className="group hover:border-amber-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BookOpen size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Auto-Journaling</h3>
            <p className="text-gray-400 text-sm">
              Tidak perlu mengerti Debit/Kredit. Sistem otomatis menjurnal penjualan, HPP, dan persediaan saat transaksi terjadi di POS.
            </p>
          </GlassCard>

          <GlassCard className="group hover:border-amber-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-yellow-500/10 text-yellow-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FileText size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Laporan Keuangan Lengkap</h3>
            <p className="text-gray-400 text-sm">
              Neraca (Balance Sheet), Laba Rugi (Profit & Loss), Arus Kas (Cash Flow), dan Perubahan Modal tersedia kapan saja.
            </p>
          </GlassCard>

          <GlassCard className="group hover:border-amber-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Analisis Biaya & HPP</h3>
            <p className="text-gray-400 text-sm">
              Hitung Harga Pokok Penjualan secara presisi (Metode Average). Ketahui margin keuntungan bersih per produk.
            </p>
          </GlassCard>

          <GlassCard className="group hover:border-amber-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <DollarSign size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Manajemen Hutang Piutang</h3>
            <p className="text-gray-400 text-sm">
              Pengingat jatuh tempo otomatis untuk tagihan supplier (AP) dan piutang pelanggan (AR). Kelola cashflow lebih sehat.
            </p>
          </GlassCard>

          <GlassCard className="group hover:border-amber-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <RefreshCcw size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Rekonsiliasi Bank</h3>
            <p className="text-gray-400 text-sm">
              Cocokkan catatan di sistem dengan mutasi rekening koran bank Anda. Deteksi selisih uang dengan cepat.
            </p>
          </GlassCard>

          <GlassCard className="group hover:border-amber-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Audit Trail & Closing</h3>
            <p className="text-gray-400 text-sm">
              Fitur Tutup Buku (Closing) bulanan/tahunan untuk mengunci data. Log aktivitas mencatat siapa yang mengedit jurnal.
            </p>
          </GlassCard>

        </div>
      </section>

      {/* Visual Workflow Section */}
      <section className="py-20 bg-slate-900 border-y border-white/5 relative">
        <div className="container mx-auto px-6">
           <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2 relative">
                 {/* Illustration of Flow */}
                 <div className="relative mx-auto w-full max-w-md aspect-square bg-slate-800 rounded-3xl border border-white/5 p-8 flex flex-col justify-between shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl -z-10"></div>
                    
                    {/* Top Nodes */}
                    <div className="flex justify-between">
                       <div className="text-center">
                          <div className="w-16 h-16 bg-sibos-orange/20 rounded-2xl flex items-center justify-center mb-2 mx-auto border border-sibos-orange/30">
                             <div className="font-bold text-sibos-orange">POS</div>
                          </div>
                          <div className="text-xs text-gray-400">Penjualan</div>
                       </div>
                       <div className="text-center">
                          <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center mb-2 mx-auto border border-cyan-500/30">
                             <div className="font-bold text-cyan-500">GUDANG</div>
                          </div>
                          <div className="text-xs text-gray-400">Stok Keluar</div>
                       </div>
                    </div>

                    {/* Funnel / Arrow */}
                    <div className="flex justify-center items-center my-4">
                       <div className="w-1 h-12 bg-gradient-to-b from-gray-700 to-amber-500"></div>
                    </div>

                    {/* Central Processing */}
                    <div className="bg-slate-900 border border-amber-500/50 p-6 rounded-xl text-center relative overflow-hidden">
                       <div className="absolute inset-0 bg-amber-500/5 animate-pulse"></div>
                       <h4 className="text-amber-400 font-bold mb-1 relative z-10">SIBOS CORE</h4>
                       <p className="text-xs text-gray-500 relative z-10">Processing Journals...</p>
                    </div>

                    {/* Funnel / Arrow */}
                    <div className="flex justify-center items-center my-4">
                       <div className="w-1 h-12 bg-gradient-to-b from-amber-500 to-green-500"></div>
                    </div>

                    {/* Bottom Result */}
                    <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-xl flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <PieChart size={24} className="text-green-400" />
                          <div className="text-left">
                             <div className="text-white font-bold text-sm">Laporan Keuangan</div>
                             <div className="text-xs text-green-400">Ready Real-time</div>
                          </div>
                       </div>
                       <CheckCircle2 size={20} className="text-green-500" />
                    </div>
                 </div>
              </div>

              <div className="lg:w-1/2">
                 <h2 className="text-3xl font-bold text-white mb-6">Mengapa Akuntansi Terintegrasi itu Penting?</h2>
                 <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                    Banyak bisnis gagal bukan karena tidak ada penjualan, tapi karena tidak tahu kemana uangnya pergi. Dengan SIBOS, akuntansi bukan lagi beban administrasi, tapi alat navigasi bisnis.
                 </p>
                 
                 <div className="space-y-6">
                    <div className="flex gap-4">
                       <div className="mt-1 p-2 bg-amber-500/10 rounded text-amber-400 h-fit"><RefreshCcw size={20} /></div>
                       <div>
                          <h4 className="text-white font-bold">Hemat Waktu Admin 70%</h4>
                          <p className="text-gray-400 text-sm mt-1">
                             Tidak perlu rekap ulang nota penjualan di akhir hari. Semua otomatis.
                          </p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <div className="mt-1 p-2 bg-red-500/10 rounded text-red-400 h-fit"><Shield size={20} /></div>
                       <div>
                          <h4 className="text-white font-bold">Cegah Kebocoran Uang</h4>
                          <p className="text-gray-400 text-sm mt-1">
                             Pantau selisih kas kasir vs sistem setiap shift berakhir.
                          </p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <div className="mt-1 p-2 bg-blue-500/10 rounded text-blue-400 h-fit"><FileText size={20} /></div>
                       <div>
                          <h4 className="text-white font-bold">Siap Lapor Pajak</h4>
                          <p className="text-gray-400 text-sm mt-1">
                             Data penjualan dan pembelian terekam rapi untuk kebutuhan pelaporan pajak.
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
        <GlassCard className="max-w-4xl mx-auto p-12 relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 border-amber-500/20">
           <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-6">Rapikan Keuangan Bisnis Anda Hari Ini</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                 Jangan menunggu sampai pembukuan berantakan. Mulai gunakan sistem yang mencatat setiap rupiah secara akurat dan transparan.
              </p>
              <button className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-amber-900/50 flex items-center gap-2 mx-auto">
                  Lihat Contoh Laporan
                  <ArrowRight size={20} />
              </button>
           </div>
        </GlassCard>
      </section>

    </div>
  );
};