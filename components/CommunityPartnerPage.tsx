
import React from 'react';
import { Handshake, Target, Users, Scale, ShieldCheck, MapPin, Gavel, HeartHandshake, PieChart, Activity } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

export const CommunityPartnerPage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 animate-in fade-in duration-500">
      
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521791136064-7985c1d100a8?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-20 grayscale"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold tracking-widest uppercase mb-6">
            <MapPin size={12} />
            PENJAGA EKONOMI LOKAL
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Tumbuh Bersama, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Bukan Memangsa.
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light mb-12">
            Kami tidak mencari salesman yang hanya mengejar target angka. Kami mencari <strong>Partner Wilayah</strong> yang siap mendampingi UMKM. Di SIBOS, kesuksesan Anda tidak diukur dari seberapa banyak klien yang Anda "tangkap", tapi seberapa baik Anda merawat mereka.
          </p>
        </div>
      </section>

      {/* The Problem & Solution */}
      <section className="py-16 container mx-auto px-6">
         <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div>
                 <h2 className="text-3xl font-bold text-white mb-6">Filosofi "Kapasitas vs Kuantitas"</h2>
                 <p className="text-gray-400 text-lg mb-8 leading-relaxed text-justify">
                    Sistem agency lama memaksa Anda mencari klien sebanyak-banyaknya tanpa peduli kualitas layanan. Akibatnya? Klien terlantar saat ada masalah teknis karena Anda sibuk mencari mangsa baru.
                 </p>
                 <div className="space-y-6">
                     <div className="flex gap-4 p-4 bg-slate-900 rounded-xl border border-white/5 hover:border-orange-500/30 transition-colors">
                         <div className="mt-1 p-2 bg-orange-500/10 rounded text-orange-400 h-fit"><Activity size={20} /></div>
                         <div>
                             <h4 className="text-white font-bold mb-1">Beban Kapasitas (Weight)</h4>
                             <p className="text-gray-400 text-sm leading-relaxed">
                                 Menangani 1 Klien Restoran Besar (Enterprise) butuh fokus setara dengan menangani 20 Warung Kecil. Di SIBOS, jika Anda memegang klien besar, jatah jumlah klien Anda otomatis dikurangi.
                             </p>
                         </div>
                     </div>
                     <div className="flex gap-4 p-4 bg-slate-900 rounded-xl border border-white/5 hover:border-orange-500/30 transition-colors">
                         <div className="mt-1 p-2 bg-blue-500/10 rounded text-blue-400 h-fit"><HeartHandshake size={20} /></div>
                         <div>
                             <h4 className="text-white font-bold mb-1">Distribusi ke Bawah</h4>
                             <p className="text-gray-400 text-sm leading-relaxed">
                                 Saat kapasitas Anda penuh, klien baru yang lebih kecil akan dialihkan sistem ke Partner Junior di wilayah Anda. Anda fokus menjaga kualitas, junior mendapatkan peluang tumbuh.
                             </p>
                         </div>
                     </div>
                 </div>
             </div>

             <div className="relative">
                 <GlassCard className="border-t-4 border-t-sibos-orange relative z-10 bg-slate-900 shadow-2xl">
                     <div className="absolute top-0 right-0 p-6 opacity-10">
                        <Scale size={100} className="text-sibos-orange"/>
                     </div>
                     <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                        <ShieldCheck className="text-sibos-orange"/> Mekanisme Keadilan
                     </h3>
                     
                     <div className="space-y-4 relative z-10">
                         <div className="p-4 bg-slate-800 rounded-lg border border-white/5">
                             <div className="flex justify-between text-sm mb-2 text-gray-300">
                                 <span>Kapasitas Partner A (Senior)</span>
                                 <span className="text-orange-400 font-bold">Penuh (100%)</span>
                             </div>
                             <div className="w-full bg-slate-700 h-2 rounded-full mb-3 overflow-hidden">
                                 <div className="bg-orange-500 h-2 rounded-full w-full"></div>
                             </div>
                             <p className="text-xs text-gray-500">Menangani: 5 Restoran Chain + 2 Pabrik.</p>
                         </div>

                         <div className="flex justify-center text-gray-600">
                             <div className="bg-white/5 p-2 rounded-full"><Users size={16}/></div>
                         </div>

                         <div className="p-4 bg-slate-800 rounded-lg border border-white/5">
                             <div className="flex justify-between text-sm mb-2 text-gray-300">
                                 <span>Partner B (Junior)</span>
                                 <span className="text-green-400 font-bold">Open (Menerima Limpahan)</span>
                             </div>
                             <div className="w-full bg-slate-700 h-2 rounded-full mb-3 overflow-hidden">
                                 <div className="bg-green-500 h-2 rounded-full w-[30%]"></div>
                             </div>
                             <p className="text-xs text-gray-500">Menerima limpahan 15 UMKM baru dari wilayah Partner A.</p>
                         </div>
                     </div>
                 </GlassCard>
                 <div className="absolute -bottom-5 -left-5 w-40 h-40 bg-orange-500/20 rounded-full blur-[80px] -z-10"></div>
             </div>
         </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-slate-900 border-t border-white/5">
          <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-16">Hak & Kewajiban <span className="text-sibos-orange">Proporsional</span></h2>
              <div className="grid md:grid-cols-3 gap-8">
                  <GlassCard hoverEffect={true} className="h-full flex flex-col justify-center py-12 border-t-4 border-t-green-500">
                      <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-6">
                          <Handshake size={32} />
                      </div>
                      <div className="text-lg font-bold text-white mb-2">Biaya Jasa (Setup & Training)</div>
                      <div className="text-4xl font-black text-green-400 mb-4">100%</div>
                      <p className="text-gray-400 text-sm leading-relaxed px-4">
                        Uang keringat Anda saat instalasi, training staff, dan input menu awal adalah hak mutlak Anda. SIBOS tidak memotong sepeserpun.
                      </p>
                  </GlassCard>
                  
                  <GlassCard hoverEffect={true} className="h-full flex flex-col justify-center border-orange-500/30 bg-orange-500/5 transform md:-translate-y-4 shadow-2xl relative overflow-hidden">
                      <div className="w-16 h-16 mx-auto bg-orange-500/20 rounded-full flex items-center justify-center text-orange-500 mb-6">
                          <PieChart size={32} />
                      </div>
                      <div className="text-lg font-bold text-white mb-2">Biaya Maintenance Bulanan</div>
                      <div className="text-4xl font-black text-orange-400 mb-4">Sharing</div>
                      <p className="text-gray-300 text-sm leading-relaxed px-4 font-medium">
                        Biaya langganan/maintenance dibagi secara proporsional. Sebagian besar untuk Anda sebagai penjaga klien, sebagian kecil untuk SIBOS guna pengembangan sistem pusat.
                      </p>
                  </GlassCard>
                  
                  <GlassCard hoverEffect={true} className="h-full flex flex-col justify-center py-12 border-t-4 border-t-blue-500">
                      <div className="w-16 h-16 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center text-blue-500 mb-6">
                          <ShieldCheck size={32} />
                      </div>
                      <div className="text-lg font-bold text-white mb-2">Proteksi Wilayah</div>
                      <div className="text-4xl font-black text-blue-400 mb-4">Aktif</div>
                      <p className="text-gray-400 text-sm leading-relaxed px-4">
                        Kami tidak akan menunjuk partner baru di wilayah yang sudah ter-handle dengan baik (kecuali kapasitas overload). Wilayah Anda adalah sawah ladang Anda.
                      </p>
                  </GlassCard>
              </div>
              
              <div className="mt-20">
                  <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                      Apakah Anda siap menjaga ekonomi lokal dengan integritas dan keadilan?
                  </p>
                  <button className="px-12 py-5 bg-gradient-to-r from-sibos-orange to-red-600 text-white rounded-full font-bold text-xl hover:scale-105 active:scale-95 transition-all shadow-[0_10px_60px_rgba(234,88,12,0.5)]">
                      Ajukan Diri Sebagai Partner
                  </button>
              </div>
          </div>
      </section>

    </div>
  );
};
