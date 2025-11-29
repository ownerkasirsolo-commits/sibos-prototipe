
import React from 'react';
import { Handshake, Map, Target, Users, CheckCircle, Scale } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

export const CommunityPartnerPage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 animate-in fade-in duration-500">
      
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521791136064-7985c1d100a8?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold tracking-widest uppercase mb-6">
            <Handshake size={12} />
            PARTNER WILAYAH
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Jadilah Ujung Tombak <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Perubahan di Kota Anda.
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light mb-12">
            Bukan sekadar sales. Partner adalah konsultan yang mendampingi UMKM bertransformasi digital. Kami mencari pejuang lapangan, bukan sekadar penjual lisensi.
          </p>
        </div>
      </section>

      {/* The Problem & Solution */}
      <section className="py-16 container mx-auto px-6">
         <div className="grid lg:grid-cols-2 gap-16">
             <div>
                 <h2 className="text-3xl font-bold text-white mb-6">Mengapa Model Agency Lama Gagal?</h2>
                 <div className="space-y-6">
                     <div className="flex gap-4">
                         <div className="mt-1 p-2 bg-red-500/10 rounded text-red-400 h-fit"><Target size={20} /></div>
                         <div>
                             <h4 className="text-white font-bold mb-1">Target Tak Masuk Akal</h4>
                             <p className="text-gray-400 text-sm">Principal memaksa target penjualan tinggi tanpa memikirkan kapasitas support. Akibatnya, klien diterlantarkan setelah beli.</p>
                         </div>
                     </div>
                     <div className="flex gap-4">
                         <div className="mt-1 p-2 bg-red-500/10 rounded text-red-400 h-fit"><Users size={20} /></div>
                         <div>
                             <h4 className="text-white font-bold mb-1">Serakah & Monopoli</h4>
                             <p className="text-gray-400 text-sm">Satu partner menguasai satu provinsi. Partner kecil tidak diberi ruang tumbuh. Pelayanan menjadi lambat dan birokratis.</p>
                         </div>
                     </div>
                 </div>
             </div>

             <div className="relative">
                 <GlassCard className="border-t-4 border-t-sibos-orange relative z-10 bg-slate-900">
                     <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><Scale className="text-sibos-orange"/> Solusi SIBOS</h3>
                     <p className="text-gray-300 mb-6 leading-relaxed">
                         Kami menerapkan sistem <strong>Distribusi Klien Otomatis</strong>. Kapasitas partner dibatasi demi menjaga kualitas layanan.
                     </p>
                     <div className="space-y-3">
                         <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
                             <CheckCircle size={18} className="text-green-500" />
                             <span className="text-sm text-gray-300">Maksimal 50 Klien Aktif per Partner</span>
                         </div>
                         <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
                             <CheckCircle size={18} className="text-green-500" />
                             <span className="text-sm text-gray-300">Klien ke-51 dialihkan ke Partner Baru (Junior)</span>
                         </div>
                         <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
                             <CheckCircle size={18} className="text-green-500" />
                             <span className="text-sm text-gray-300">Partner Senior dapat % Mentoring Fee</span>
                         </div>
                     </div>
                 </GlassCard>
                 <div className="absolute -top-5 -right-5 w-20 h-20 bg-sibos-orange/20 rounded-full blur-xl -z-10"></div>
             </div>
         </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-slate-900 border-t border-white/5">
          <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold text-white mb-12">Hak & Kewajiban</h2>
              <div className="grid md:grid-cols-3 gap-8">
                  <GlassCard hoverEffect={true}>
                      <div className="text-4xl font-bold text-white mb-2">40%</div>
                      <div className="text-xs text-gray-400 uppercase tracking-widest mb-4">Sharing Revenue</div>
                      <p className="text-sm text-gray-500">Dari biaya langganan bulanan klien yang Anda handle. Passive income selama klien aktif.</p>
                  </GlassCard>
                  <GlassCard hoverEffect={true}>
                      <div className="text-4xl font-bold text-white mb-2">100%</div>
                      <div className="text-xs text-gray-400 uppercase tracking-widest mb-4">Biaya Setup</div>
                      <p className="text-sm text-gray-500">Jasa training, instalasi hardware, dan input menu awal sepenuhnya milik Anda.</p>
                  </GlassCard>
                  <GlassCard hoverEffect={true}>
                      <div className="text-4xl font-bold text-white mb-2">0</div>
                      <div className="text-xs text-gray-400 uppercase tracking-widest mb-4">Biaya Franchise</div>
                      <p className="text-sm text-gray-500">Tidak ada biaya join. Cukup komitmen waktu dan lulus sertifikasi teknis SIBOS.</p>
                  </GlassCard>
              </div>
              <button className="mt-12 px-10 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl">
                  Daftar Sertifikasi Partner
              </button>
          </div>
      </section>

    </div>
  );
};
