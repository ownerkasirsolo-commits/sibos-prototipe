
import React from 'react';
import { 
  Wrench, Calendar, Scissors, UserCheck, 
  TrendingUp, AlertTriangle, Layers, 
  ArrowRight, CheckCircle2, Zap, History, Receipt
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { Page } from '../types';

interface SolutionServicePageProps {
    onNavigate?: (page: Page) => void;
}

export const SolutionServicePage: React.FC<SolutionServicePageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 animate-in fade-in duration-500">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092921461-eab62e97a782?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold tracking-wider mb-8 shadow-lg shadow-green-900/20 backdrop-blur-md">
            <Wrench size={14} />
            JASA & PERAWATAN PROFESIONAL
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
            Ubah Keahlian <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400">
              Jadi Kekayaan.
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md mb-10">
            Hentikan jadwal berantakan dan komisi yang salah hitung. Baik Anda bengkel, salon, atau klinik, SIBOS membantu Anda menjual waktu dan skill dengan presisi tinggi.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4">
             <button 
                onClick={() => onNavigate && onNavigate('booking-app')}
                className="px-8 py-4 bg-gradient-to-r from-sibos-orange to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-orange-900/50 flex items-center justify-center gap-2"
             >
                <Calendar size={20} /> Lihat Sistem Booking
             </button>
             <button 
                onClick={() => onNavigate && onNavigate('crm')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all border border-white/10 flex items-center justify-center gap-2"
             >
                <UserCheck size={20} /> Manajemen Member
             </button>
          </div>
        </div>
      </section>

      {/* PAIN POINTS & SOLUTION */}
      <section className="py-20 container mx-auto px-6">
         <div className="grid md:grid-cols-2 gap-16 items-center">
             <div>
                 <h2 className="text-3xl font-bold text-white mb-6">Tantangan Bisnis Jasa</h2>
                 <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    Menjual jasa lebih rumit daripada barang. Waktu yang hilang tidak bisa distok ulang. Pelanggan yang kecewa tidak akan kembali.
                 </p>
                 <div className="space-y-4">
                     <div className="p-4 bg-slate-900 rounded-xl border border-white/5 flex gap-4">
                         <div className="mt-1 p-2 bg-red-500/10 rounded-lg text-red-400 h-fit"><AlertTriangle size={20} /></div>
                         <div>
                             <h4 className="text-white font-bold mb-1">No-Show & Jadwal Bentrok</h4>
                             <p className="text-sm text-gray-400">Pelanggan booking tapi tidak datang, atau dua orang datang di jam yang sama. Kacau.</p>
                         </div>
                     </div>
                     <div className="p-4 bg-slate-900 rounded-xl border border-white/5 flex gap-4">
                         <div className="mt-1 p-2 bg-red-500/10 rounded-lg text-red-400 h-fit"><TrendingUp size={20} /></div>
                         <div>
                             <h4 className="text-white font-bold mb-1">Salah Hitung Komisi</h4>
                             <p className="text-sm text-gray-400">Mekanik atau terapis sering komplain karena hitungan bagi hasil tidak transparan.</p>
                         </div>
                     </div>
                 </div>
             </div>
             
             <div className="relative">
                 <GlassCard className="border-t-4 border-t-green-500 relative z-10 !bg-slate-900 shadow-2xl">
                     <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <CheckCircle2 className="text-green-500"/> Solusi SIBOS Service
                     </h3>
                     <ul className="space-y-4">
                         {[
                             "Kalender Booking Anti-Bentrok",
                             "Estimasi Biaya & Cetak Work Order",
                             "Rekam Jejak Servis (Service History)",
                             "Hitung Komisi Karyawan Otomatis",
                             "Pengingat Servis Berkala via WA"
                         ].map((item, i) => (
                             <li key={i} className="flex items-center gap-3 text-gray-300 p-3 bg-white/5 rounded-lg border border-white/5">
                                 <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                                 {item}
                             </li>
                         ))}
                     </ul>
                 </GlassCard>
                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-500/20 rounded-full blur-[80px] -z-10"></div>
             </div>
         </div>
      </section>

      {/* CORE FEATURES SHOWCASE */}
      <section className="py-20 bg-slate-900 border-y border-white/5">
          <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-white mb-4">Fitur Andalan Usaha Jasa</h2>
                  <p className="text-gray-400">Cocok untuk Bengkel, Barbershop, Salon Kecantikan, Klinik, hingga Laundry.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  {/* Booking */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-teal-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-500 mb-6 group-hover:scale-110 transition-transform">
                          <Calendar size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Sistem Booking Pintar</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          Atur slot waktu per staf atau ruangan. Hindari double booking. Kirim notifikasi konfirmasi otomatis ke pelanggan.
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 p-3 flex flex-col gap-2">
                          <div className="flex justify-between items-center text-xs text-gray-400">
                              <span>10:00</span>
                              <span className="text-green-400">Booked (Rina)</span>
                          </div>
                          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500 w-[80%]"></div>
                          </div>
                      </div>
                  </div>

                  {/* Commission */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-green-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 mb-6 group-hover:scale-110 transition-transform">
                          <UserCheck size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Manajemen Komisi</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          Setiap servis selesai, komisi mekanik/kapster langsung terhitung. Bisa persentase (%) atau nominal tetap (Rp). Transparan dan adil.
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 flex items-center justify-center">
                          <div className="text-center">
                              <div className="text-xs text-gray-500">Total Insentif Hari Ini</div>
                              <div className="text-green-400 font-bold text-lg">Rp 150.000</div>
                          </div>
                      </div>
                  </div>

                  {/* History */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-colors group">
                      <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-500 mb-6 group-hover:scale-110 transition-transform">
                          <History size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Rekam Jejak (History)</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          Lihat riwayat servis kendaraan atau perawatan wajah pelanggan. "Kapan terakhir ganti oli?" atau "Warna cat rambut apa yang dipakai bulan lalu?"
                      </p>
                      <div className="h-24 bg-slate-900 rounded-lg border border-white/5 p-3 overflow-hidden">
                          <div className="space-y-2 text-[10px] text-gray-400">
                              <div className="flex justify-between border-b border-white/5 pb-1"><span>12/10</span> <span>Ganti Oli</span></div>
                              <div className="flex justify-between border-b border-white/5 pb-1"><span>15/09</span> <span>Tune Up</span></div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* ESTIMATION & INVOICE */}
      <section className="py-20 container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 bg-gradient-to-r from-teal-900/20 to-slate-900 rounded-3xl p-8 border border-teal-500/20">
              <div className="lg:w-1/2">
                  <h2 className="text-2xl font-bold text-white mb-4">Transparansi Biaya di Depan</h2>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                      Jangan buat pelanggan kaget dengan tagihan akhir. Cetak <strong>Estimasi Biaya</strong> sebelum pengerjaan dimulai. Pelanggan setuju, baru kerjakan. Hindari sengketa di kasir.
                  </p>
                  <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-green-500"/> Cetak Estimasi Profesional</li>
                      <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-green-500"/> Konversi Estimasi ke Invoice Instan</li>
                      <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-green-500"/> Catat Sparepart Terpakai</li>
                  </ul>
              </div>
              <div className="lg:w-1/2 flex justify-center">
                  <div className="bg-white p-6 rounded-2xl shadow-2xl w-64 rotate-3">
                      <div className="border-b-2 border-dashed border-gray-300 pb-4 mb-4">
                          <div className="text-center font-bold text-slate-900 text-lg mb-1">ESTIMASI BIAYA</div>
                          <div className="text-center text-xs text-gray-500">Bengkel Maju Jaya</div>
                      </div>
                      <div className="space-y-2 text-sm text-gray-700 mb-4">
                          <div className="flex justify-between"><span>Jasa Servis</span> <span>50.000</span></div>
                          <div className="flex justify-between"><span>Oli Mesin</span> <span>65.000</span></div>
                          <div className="flex justify-between"><span>Kampas Rem</span> <span>45.000</span></div>
                      </div>
                      <div className="border-t-2 border-gray-900 pt-2 flex justify-between font-bold text-slate-900">
                          <span>TOTAL</span>
                          <span>160.000</span>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center container mx-auto px-6">
        <GlassCard className="max-w-4xl mx-auto p-12 relative overflow-hidden bg-gradient-to-br from-slate-900 to-green-900/30 border-green-500/20">
           <div className="relative z-10">
              <Scissors size={48} className="text-green-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-6">Profesionalkan Jasa Anda</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                 Tingkatkan kepercayaan pelanggan dengan sistem manajemen yang rapi. Jadwal teratur, stok terkontrol, pelanggan puas.
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
