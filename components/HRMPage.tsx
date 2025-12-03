
import React from 'react';
import { 
  Users, Banknote, Clock, MapPin, CalendarCheck, 
  Briefcase, Smile, CheckCircle, ShieldCheck 
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

export const HRMPage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 animate-in fade-in duration-500">
      
      {/* HERO SECTION WITH ILLUSTRATION BACKGROUND */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
            alt="Team Collaboration" 
            className="w-full h-full object-cover opacity-30"
          />
          {/* Gradient Overlay to blend with theme */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-950/90 to-slate-950"></div>
        </div>
        
        {/* Noise & Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wider mb-8 shadow-[0_0_20px_rgba(16,185,129,0.2)] backdrop-blur-md">
            <Users size={14} />
            KEADILAN SDM
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
            Bangun Pasukan Loyal <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Bukan Sekadar Karyawan
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Transparansi gaji dan absensi adalah bentuk keadilan. Hilangkan rasa curiga antara Bos dan Tim. Ubah staff menjadi partner perjuangan dengan SIBOS HRM.
          </p>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-16 container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <GlassCard className="group hover:border-emerald-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Banknote size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Payroll Otomatis</h3>
            <p className="text-gray-400 text-sm">
              Hitung gaji pokok, tunjangan, lembur, dan potongan (BPJS/PPh21) dalam satu klik. Slip gaji terkirim otomatis ke WA/Email karyawan.
            </p>
          </GlassCard>

          <GlassCard className="group hover:border-emerald-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MapPin size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Absensi GPS & Selfie</h3>
            <p className="text-gray-400 text-sm">
              Cegah kecurangan titip absen. Karyawan absen via HP dengan validasi lokasi (Geofencing) dan deteksi wajah (Liveness Check).
            </p>
          </GlassCard>

          <GlassCard className="group hover:border-emerald-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <CalendarCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Manajemen Shift</h3>
            <p className="text-gray-400 text-sm">
              Atur jadwal rostering shift pagi/siang/malam dengan mudah. Tukar shift antar karyawan dapat dilakukan via aplikasi dengan persetujuan manajer.
            </p>
          </GlassCard>

          <GlassCard className="group hover:border-emerald-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Briefcase size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">KPI & Performa</h3>
            <p className="text-gray-400 text-sm">
              Pantau kinerja tim berdasarkan data nyata (Omzet penjualan per kasir, Kedisiplinan waktu, Tingkat komplain).
            </p>
          </GlassCard>

          <GlassCard className="group hover:border-emerald-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Clock size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Lembur & Cuti</h3>
            <p className="text-gray-400 text-sm">
              Pengajuan cuti, sakit, atau lembur dilakukan paperless via aplikasi. Kuota cuti terupdate otomatis (Real-time balance).
            </p>
          </GlassCard>

          <GlassCard className="group hover:border-emerald-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Akses & Keamanan</h3>
            <p className="text-gray-400 text-sm">
              Atur hak akses granular. Siapa yang boleh melihat laporan laba rugi, siapa yang hanya boleh melakukan penjualan.
            </p>
          </GlassCard>

        </div>
      </section>

      {/* Visual Workflow / Dashboard Mockup Concept */}
      <section className="py-20 bg-slate-900 border-y border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
           <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                 <h2 className="text-3xl font-bold text-white mb-6">Aplikasi Karyawan Mandiri (ESS)</h2>
                 <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                    SIBOS dilengkapi dengan Employee Self Service (ESS). Karyawan tidak perlu lagi bertanya ke HR "sisa cuti saya berapa?" atau "slip gaji bulan lalu mana?". Semua ada di genggaman.
                 </p>
                 
                 <div className="space-y-4">
                    {[
                       "Notifikasi jam masuk & pulang kerja",
                       "Lihat jadwal shift minggu depan",
                       "Download slip gaji (PDF Encrypted)",
                       "Pengajuan Kasbon & Reimbursement"
                    ].map((item, i) => (
                       <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                          <CheckCircle className="text-emerald-400" size={20} />
                          <span className="text-gray-300">{item}</span>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="lg:w-1/2 relative">
                 {/* Mockup Illustration */}
                 <div className="relative mx-auto w-64 h-[500px] bg-slate-950 rounded-[3rem] border-8 border-slate-800 shadow-2xl overflow-hidden z-10">
                    {/* Screen Content */}
                    <div className="absolute inset-0 bg-slate-900 flex flex-col">
                       {/* App Header */}
                       <div className="bg-emerald-600 p-6 pt-10 rounded-b-3xl">
                          <div className="flex justify-between items-center mb-4">
                             <div className="w-8 h-8 rounded-full bg-white/20"></div>
                             <div className="w-6 h-6 rounded bg-white/20"></div>
                          </div>
                          <div className="text-white text-xl font-bold">Halo, Budi!</div>
                          <div className="text-emerald-100 text-sm">Staff Gudang</div>
                       </div>
                       
                       {/* Quick Stats */}
                       <div className="grid grid-cols-2 gap-4 p-4 -mt-8">
                          <div className="bg-slate-800 p-3 rounded-xl border border-white/10 shadow-lg">
                             <div className="text-xs text-gray-400">Masuk</div>
                             <div className="text-white font-bold">07:55</div>
                          </div>
                          <div className="bg-slate-800 p-3 rounded-xl border border-white/10 shadow-lg">
                             <div className="text-xs text-gray-400">Pulang</div>
                             <div className="text-white font-bold">--:--</div>
                          </div>
                       </div>

                       {/* Menu Grid */}
                       <div className="p-4 grid grid-cols-3 gap-4">
                          {[1,2,3,4,5,6].map(i => (
                             <div key={i} className="aspect-square bg-white/5 rounded-xl flex flex-col items-center justify-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-emerald-500/20"></div>
                                <div className="w-12 h-2 bg-white/10 rounded"></div>
                             </div>
                          ))}
                       </div>

                       {/* Bottom Card */}
                       <div className="mt-auto m-4 p-4 bg-gradient-to-r from-emerald-900/50 to-teal-900/50 rounded-xl border border-emerald-500/20">
                          <div className="text-xs text-emerald-400 font-bold mb-1">PENGUMUMAN</div>
                          <div className="text-xs text-gray-300">Gathering Komunitas SIBOS diadakan tgl 20 Oktober.</div>
                       </div>
                    </div>
                 </div>

                 {/* Decorative Elements behind phone */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-emerald-500/20 rounded-full blur-[80px] -z-10"></div>
              </div>
           </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center container mx-auto px-6">
        <GlassCard className="max-w-4xl mx-auto p-12 relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-slate-900 z-0"></div>
           <div className="relative z-10">
              <Smile size={48} className="text-emerald-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-6">Tim Bahagia = Bisnis Maju</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                 Hilangkan gesekan akibat salah hitung gaji atau jadwal shift yang bentrok. Ciptakan lingkungan kerja yang transparan dan profesional dengan SIBOS HRM.
              </p>
              <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/50">
                  Digitalisasi HR Sekarang
              </button>
           </div>
        </GlassCard>
      </section>

    </div>
  );
};
