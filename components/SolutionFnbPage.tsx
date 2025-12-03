
import React from 'react';
import { 
  Utensils, ChefHat, Clock, ClipboardList, 
  QrCode, TrendingUp, AlertTriangle, Layers, 
  ArrowRight, CheckCircle2, Zap
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { Page } from '../types';

interface SolutionFnbPageProps {
    onNavigate?: (page: Page) => void;
}

export const SolutionFnbPage: React.FC<SolutionFnbPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 animate-in fade-in duration-500">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold tracking-wider mb-8 shadow-lg shadow-orange-900/20 backdrop-blur-md">
            <Utensils size={14} />
            SOLUSI KHUSUS KULINER
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
            Restoran Ramai, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-amber-500">
              Dapur Santai.
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md mb-10">
            Dapur bukan tempat untuk berteriak atau menebak pesanan. SIBOS F&B mengubah kekacauan menjadi harmoni—dari meja pelanggan hingga stok bahan baku di gudang.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4">
             <button 
                onClick={() => onNavigate && onNavigate('pos')}
                className="px-8 py-4 bg-gradient-to-r from-sibos-orange to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-orange-900/50 flex items-center justify-center gap-2"
             >
                <Zap size={20} /> Lihat Fitur POS Resto
             </button>
             <button 
                onClick={() => onNavigate && onNavigate('kds-app')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all border border-white/10 flex items-center justify-center gap-2"
             >
                <ChefHat size={20} /> Demo Kitchen Display
             </button>
          </div>
        </div>
      </section>

      {/* PAIN POINTS & SOLUTION */}
      <section className="py-20 container mx-auto px-6">
         <div className="grid md:grid-cols-2 gap-16 items-center">
             <div>
                 <h2 className="text-3xl font-bold text-white mb-6">Masalah Klasik Restoran</h2>
                 <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    Banyak bisnis F&B tutup bukan karena masakannya tidak enak, tapi karena operasional yang berantakan dan kebocoran HPP.
                 </p>
                 <div className="space-y-4">
                     <div className="p-4 bg-slate-900 rounded-xl border border-white/5 flex gap-4">
                         <div className="mt-1 p-2 bg-red-500/10 rounded-lg text-red-400 h-fit"><AlertTriangle size={20} /></div>
                         <div>
                             <h4 className="text-white font-bold mb-1">Pesanan Selip & Salah Masak</h4>
                             <p className="text-sm text-gray-400">Kertas bon hilang di dapur, waiter salah tulis menu, pelanggan marah.</p>
                         </div>
                     </div>
                     <div className="p-4 bg-slate-900 rounded-xl border border-white/5 flex gap-4">
                         <div className="mt-1 p-2 bg-red-500/10 rounded-lg text-red-400 h-fit"><TrendingUp size={20} /></div>
                         <div>
                             <h4 className="text-white font-bold mb-1">HPP & Stok Tidak Akurat</h4>
                             <p className="text-sm text-gray-400">Jual Nasi Goreng banyak, tapi untungnya kemana? Bahan baku sering hilang tanpa jejak.</p>
                         </div>
                     </div>
                 </div>
             </div>
             
             <div className="relative">
                 <GlassCard className="border-t-4 border-t-orange-500 relative z-10 !bg-slate-900 shadow-2xl">
                     <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <CheckCircle2 className="text-orange-500"/> Solusi SIBOS F&B
                     </h3>
                     <ul className="space-y-4">
                         {[
                             "Manajemen Meja Visual (Table Layout)",
                             "Kitchen Display System (Paperless)",
                             "Resep & BOM (Pengurangan Bahan Baku Otomatis)",
                             "Split Bill & Gabung Meja",
                             "Varian Menu (Pedas, Tidak Pedas, Extra Topping)"
                         ].map((item, i) => (
                             <li key={i} className="flex items-center gap-3 text-gray-300 p-3 bg-white/5 rounded-lg border border-white/5">
                                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                 {item}
                             </li>
                         ))}
                     </ul>
                 </GlassCard>
                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500/20 rounded-full blur-[80px] -z-10"></div>
             </div>
         </div>
      </section>

      {/* CORE FEATURES SHOWCASE */}
      <section className="py-20 bg-slate-900 border-y border-white/5">
          <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-white mb-4">Fitur Wajib untuk Kuliner Modern</h2>
                  <p className="text-gray-400">Teknologi yang biasanya hanya dimiliki franchise raksasa, kini ada di tangan Anda.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  {/* Table Management */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-orange-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                          <Layers size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Manajemen Meja</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          Atur denah meja sesuai layout restoran Anda. Lihat status meja secara real-time: Kosong, Terisi, atau Sudah Reservasi.
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 relative overflow-hidden flex items-center justify-center gap-4">
                          <div className="w-10 h-10 border-2 border-green-500 rounded flex items-center justify-center text-xs text-green-500 font-bold">1</div>
                          <div className="w-10 h-10 bg-red-500/20 border-2 border-red-500 rounded flex items-center justify-center text-xs text-red-500 font-bold">2</div>
                          <div className="w-10 h-10 border-2 border-yellow-500 rounded flex items-center justify-center text-xs text-yellow-500 font-bold">3</div>
                      </div>
                  </div>

                  {/* KDS */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                          <ChefHat size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Kitchen Display (KDS)</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          Lupakan printer dapur yang berisik. Pesanan langsung muncul di layar tablet koki. Urutkan berdasarkan waktu masuk atau prioritas.
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 flex flex-col p-2 gap-2">
                          <div className="bg-blue-900/30 border-l-2 border-blue-500 p-1.5 rounded">
                              <div className="h-1.5 w-12 bg-blue-500 rounded mb-1"></div>
                              <div className="h-1 w-20 bg-white/20 rounded"></div>
                          </div>
                          <div className="bg-green-900/30 border-l-2 border-green-500 p-1.5 rounded opacity-60">
                              <div className="h-1.5 w-12 bg-green-500 rounded mb-1"></div>
                              <div className="h-1 w-20 bg-white/20 rounded"></div>
                          </div>
                      </div>
                  </div>

                  {/* Recipe & BOM */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                          <ClipboardList size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Resep & Bahan Baku</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          1 Porsi Nasi Goreng otomatis mengurangi: 150gr Beras, 1 Telur, 10ml Minyak. Stok bahan baku selalu akurat tanpa hitung manual.
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 flex items-center justify-center">
                          <div className="text-center">
                              <div className="text-xs text-gray-500">Auto Deduct</div>
                              <div className="text-purple-400 font-bold text-lg">- 150 gr</div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* QR ORDER SECTION */}
      <section className="py-20 container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 bg-gradient-to-r from-orange-900/20 to-slate-900 rounded-3xl p-8 border border-orange-500/20">
              <div className="lg:w-1/2">
                  <h2 className="text-2xl font-bold text-white mb-4">Pelanggan Pesan Sendiri (Self Order)</h2>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                      Kurangi beban waiter saat jam sibuk. Tempel QR Code di meja, pelanggan scan, pesan, dan bayar langsung dari HP mereka. Pesanan langsung masuk ke KDS dapur.
                  </p>
                  <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-green-500"/> Tidak perlu antri kasir</li>
                      <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-green-500"/> Mengurangi salah catat pesanan</li>
                      <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-green-500"/> Data pelanggan (CRM) otomatis tersimpan</li>
                  </ul>
              </div>
              <div className="lg:w-1/2 flex justify-center">
                  <div className="bg-white p-4 rounded-2xl shadow-2xl">
                      <QrCode size={200} className="text-slate-900" />
                      <div className="text-center mt-2 font-bold text-slate-900 text-sm">Scan untuk Menu</div>
                  </div>
              </div>
          </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center container mx-auto px-6">
        <GlassCard className="max-w-4xl mx-auto p-12 relative overflow-hidden bg-gradient-to-br from-slate-900 to-orange-900/30 border-orange-500/20">
           <div className="relative z-10">
              <Clock size={48} className="text-orange-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-6">Waktunya Upgrade Restoran Anda</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                 Tinggalkan cara lama yang membuat pusing. Beralih ke SIBOS F&B sekarang dan rasakan kemudahan mengelola bisnis kuliner yang sesungguhnya.
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
