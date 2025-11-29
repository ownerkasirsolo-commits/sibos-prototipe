import React from 'react';
import { 
  Heart, Users, Trophy, Gift, MessageCircle, 
  BarChart2, Smartphone, UserPlus, Crown,
  Repeat, ArrowRight
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

export const CRMPage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 animate-in fade-in duration-500">
      
      {/* IMPROVED HERO SECTION WITH IMAGE */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2064&auto=format&fit=crop" 
            alt="Customer Relationship" 
            className="w-full h-full object-cover opacity-30"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-950/90 to-slate-950"></div>
        </div>
        
        {/* Pattern Overlays */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>

        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sibos-orange/10 rounded-full blur-[120px] -z-10"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-pink-400 text-xs font-bold tracking-wider mb-8 shadow-lg shadow-pink-900/20 backdrop-blur-md">
            <Heart size={14} className="animate-pulse" />
            CUSTOMER RELATIONSHIP MANAGEMENT
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
            Ubah Pembeli Jadi <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-sibos-orange">
              Pelanggan Setia
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Biaya mencari pelanggan baru 5x lebih mahal daripada merawat yang lama. SIBOS CRM membantu Anda mengenal, memahami, dan memanjakan pelanggan agar terus kembali.
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16 container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Membership Tiers */}
          <GlassCard className="col-span-1 md:col-span-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
               <Crown size={180} />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-6">
                <Trophy size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Multi-Tier Membership</h3>
              <p className="text-gray-400 mb-8 max-w-lg leading-relaxed">
                Buat pelanggan merasa spesial dengan tingkatan keanggotaan. Atur syarat kenaikan level otomatis berdasarkan total belanja.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                 <div className="p-4 rounded-lg bg-slate-800 border border-slate-700 text-center">
                    <div className="text-gray-400 text-xs font-bold mb-1">SILVER</div>
                    <div className="text-white font-bold">Diskon 2%</div>
                 </div>
                 <div className="p-4 rounded-lg bg-yellow-900/20 border border-yellow-700/50 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-yellow-500/5"></div>
                    <div className="text-yellow-500 text-xs font-bold mb-1 relative z-10">GOLD</div>
                    <div className="text-white font-bold relative z-10">Diskon 5%</div>
                 </div>
                 <div className="p-4 rounded-lg bg-slate-200/10 border border-white/20 text-center relative overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                    <div className="text-white text-xs font-bold mb-1 relative z-10">PLATINUM</div>
                    <div className="text-white font-bold relative z-10">Diskon 10%</div>
                 </div>
              </div>
            </div>
          </GlassCard>

          {/* Points & Rewards */}
          <GlassCard className="group hover:border-pink-500/30 transition-colors">
            <div className="w-14 h-14 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6">
              <Gift size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Poin & Hadiah</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Setiap transaksi menghasilkan poin. Pelanggan bisa menukarkan poin dengan produk, voucher belanja, atau potongan harga langsung di kasir.
            </p>
            <ul className="space-y-3">
               <li className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  Konfigurasi nilai poin fleksibel
               </li>
               <li className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  Masa berlaku poin (Expiry)
               </li>
               <li className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  Katalog penukaran hadiah
               </li>
            </ul>
          </GlassCard>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
           <GlassCard className="group hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
                 <Users size={20} />
              </div>
              <h4 className="font-bold text-white mb-2">Database Lengkap</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                 Simpan data profil, ulang tahun, alamat, hingga preferensi merek favorit pelanggan secara detail.
              </p>
           </GlassCard>

           <GlassCard className="group hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center mb-4">
                 <MessageCircle size={20} />
              </div>
              <h4 className="font-bold text-white mb-2">Broadcast WA</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                 Kirim ucapan ulang tahun otomatis atau info promo ke WhatsApp pelanggan langsung dari sistem.
              </p>
           </GlassCard>

           <GlassCard className="group hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-lg bg-sibos-orange/10 text-sibos-orange flex items-center justify-center mb-4">
                 <BarChart2 size={20} />
              </div>
              <h4 className="font-bold text-white mb-2">Analisis Perilaku</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                 Ketahui siapa pelanggan yang "hilang" (jarang datang) dan produk apa yang berhenti mereka beli.
              </p>
           </GlassCard>

           <GlassCard className="group hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4">
                 <Smartphone size={20} />
              </div>
              <h4 className="font-bold text-white mb-2">Member App</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                 (Add-on) Aplikasi khusus pelanggan untuk cek poin, klaim voucher, dan belanja online.
              </p>
           </GlassCard>
        </div>
      </section>

      {/* Customer Journey Simulation */}
      <section className="py-20 bg-slate-900 border-y border-white/5">
         <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Siklus Retensi Pelanggan SIBOS</h2>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-4 relative">
               {/* Step 1 */}
               <div className="w-64 p-6 bg-slate-800 rounded-2xl border border-white/5 text-center relative z-10">
                  <div className="w-16 h-16 mx-auto bg-slate-700 rounded-full flex items-center justify-center mb-4 border-4 border-slate-800 shadow-xl">
                     <UserPlus size={24} className="text-white" />
                  </div>
                  <h4 className="font-bold text-white mb-2">1. Akuisisi</h4>
                  <p className="text-xs text-gray-400">Kasir input data pelanggan saat transaksi pertama. Cepat & mudah.</p>
               </div>

               <ArrowRight size={24} className="text-gray-600 rotate-90 md:rotate-0" />

               {/* Step 2 */}
               <div className="w-64 p-6 bg-slate-800 rounded-2xl border border-white/5 text-center relative z-10">
                  <div className="w-16 h-16 mx-auto bg-slate-700 rounded-full flex items-center justify-center mb-4 border-4 border-slate-800 shadow-xl">
                     <Gift size={24} className="text-white" />
                  </div>
                  <h4 className="font-bold text-white mb-2">2. Apresiasi</h4>
                  <p className="text-xs text-gray-400">Pelanggan dapat poin. Sistem mengirim WA ucapan terima kasih otomatis.</p>
               </div>

               <ArrowRight size={24} className="text-gray-600 rotate-90 md:rotate-0" />

               {/* Step 3 */}
               <div className="w-64 p-6 bg-slate-800 rounded-2xl border border-white/5 text-center relative z-10">
                  <div className="w-16 h-16 mx-auto bg-slate-700 rounded-full flex items-center justify-center mb-4 border-4 border-slate-800 shadow-xl">
                     <Repeat size={24} className="text-white" />
                  </div>
                  <h4 className="font-bold text-white mb-2">3. Retensi</h4>
                  <p className="text-xs text-gray-400">Sistem mendeteksi pola belanja. Memberi promo personal agar belanja lagi.</p>
               </div>
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
         <div className="container mx-auto px-6">
            <GlassCard className="max-w-3xl mx-auto p-10 !bg-gradient-to-br !from-pink-900/30 !to-slate-900 border-pink-500/20">
               <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Mulai Bangun Database Pelanggan Sekarang</h2>
               <p className="text-gray-400 mb-8">
                  Jangan biarkan pelanggan datang dan pergi tanpa jejak. Kelola aset terbesar bisnis Anda dengan SIBOS CRM.
               </p>
               <button className="px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-pink-900/40">
                  Coba Demo CRM Gratis
               </button>
            </GlassCard>
         </div>
      </section>

    </div>
  );
};