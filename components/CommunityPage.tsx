import React from 'react';
import { Users, Briefcase, TrendingUp, Code, Shield, HeartHandshake, Play, Activity } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { CommunityModel } from './CommunityModel';

export const CommunityPage: React.FC = () => {
  return (
    <div className="pt-20 animate-in fade-in duration-500">
      {/* Community Hero with Background Image */}
      <section className="relative py-32 overflow-hidden flex items-center justify-center min-h-[60vh]">
        <div className="absolute inset-0 -z-10">
           <img 
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop" 
            alt="Community Collaboration" 
            className="w-full h-full object-cover opacity-20"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/90 to-slate-950"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sibos-orange/10 border border-sibos-orange/30 text-sibos-orange text-sm font-bold tracking-wider mb-8 shadow-[0_0_20px_rgba(255,107,0,0.2)]">
            <Users size={14} />
            EKOSISTEM DIGITAL TERINTEGRASI
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight">
            Kuat Karena <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sibos-orange via-orange-400 to-yellow-500">
              Saling Menopang
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            Kami menghapus sekat antara "Bos Besar" dan "Mitra Kecil". Di SIBOS, setiap kontribusi dihargai, setiap peran memiliki panggungnya sendiri.
          </p>
        </div>
      </section>

      {/* Video / Manifesto Section */}
      <section className="py-12 -mt-20 relative z-20">
        <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto bg-slate-800 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group cursor-pointer aspect-video">
                <img 
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop" 
                    alt="Video Thumbnail" 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-sibos-orange rounded-full flex items-center justify-center pl-2 text-white shadow-[0_0_40px_rgba(255,107,0,0.6)] group-hover:scale-110 transition-transform duration-300">
                        <Play size={32} fill="white" />
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-white text-2xl font-bold">Manifesto Komunitas SIBOS 2025</h3>
                    <p className="text-gray-300">Lihat bagaimana kami mengubah cara bisnis software bekerja.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Reuse the Business Model Section */}
      <div className="bg-slate-950">
        <CommunityModel />
      </div>

      {/* Philosophy Section - Visualized */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-900 to-transparent opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                            <HeartHandshake size={32} className="text-sibos-orange" />
                        </div>
                        <h2 className="text-3xl font-bold text-white">Filosofi Keseimbangan</h2>
                    </div>
                    
                    <h3 className="text-xl text-gray-200 font-medium italic mb-6 border-l-4 border-sibos-orange pl-6 py-2">
                        "Semakin besar kapasitas klien yang dihandle, maka jumlah kliennya harus diperkecil."
                    </h3>
                    
                    <p className="text-gray-400 text-lg leading-relaxed mb-6">
                        Dalam bisnis konvensional, partner yang sukses akan menumpuk ribuan klien hingga pelayanan menjadi buruk (overload). Kami tidak melakukan itu.
                    </p>
                    <p className="text-gray-400 leading-relaxed mb-8">
                        Sistem SIBOS secara otomatis mengatur distribusi. Jika Partner A menangani klien "Kakap" (High Maintenance), sistem akan mengalihkan klien-klien kecil baru ke Partner B yang masih merintis.
                    </p>
                    
                    <ul className="space-y-4">
                        {[
                            "Pelayanan tetap premium dan personal",
                            "Distribusi pendapatan merata ke partner baru",
                            "Partner senior fokus kualitas, bukan sekadar kuantitas"
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-gray-300">
                                <Activity size={18} className="text-green-500" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Visual Diagram */}
                <div className="relative">
                    <GlassCard className="border-t-4 border-t-sibos-orange relative z-10 !bg-slate-900/80">
                        <div className="space-y-6">
                            {/* Scenario A */}
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 opacity-50">
                                <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center font-bold">X</div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">Model Lama (Serakah)</h4>
                                    <div className="text-xs text-gray-500 mt-1">1 Partner menangani 500+ klien. Layanan lambat, klien kecewa.</div>
                                </div>
                            </div>

                            {/* Arrow */}
                            <div className="flex justify-center text-gray-600">
                                <Activity size={24} />
                            </div>

                            {/* Scenario B (SIBOS) */}
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                                <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center font-bold">✓</div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">Model SIBOS (Berbagi)</h4>
                                    <div className="text-xs text-gray-400 mt-1">
                                        Partner A: 10 Klien Besar (Fokus)<br/>
                                        Partner B: 50 Klien Kecil (Tumbuh)<br/>
                                        <span className="text-sibos-orange">Hasil: Semua Bahagia.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                    
                    {/* Decorative Elements behind card */}
                    <div className="absolute top-10 -right-10 w-32 h-32 bg-sibos-orange/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
                </div>
            </div>
        </div>
      </section>

       {/* Roles Section */}
       <section className="py-24 relative bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Peran dalam Ekosistem</h2>
            <p className="text-gray-400">Siapapun Anda, ada tempat untuk berkontribusi di SIBOS.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Investor */}
            <GlassCard hoverEffect={true} className="border-t-4 border-t-green-500 h-full">
              <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-6">
                <TrendingUp size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Investor Komunitas</h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Menanamkan modal untuk pengembangan infrastruktur. Dibatasi kepemilikannya agar tidak ada dominasi satu pihak (Anti-Paus).
              </p>
              <ul className="text-sm text-gray-500 space-y-2 mt-auto">
                <li className="flex gap-2"><Shield size={14} /> Transparan & Terbuka</li>
                <li className="flex gap-2"><Shield size={14} /> Bagi Hasil Tahunan</li>
              </ul>
            </GlassCard>

            {/* Developer */}
            <GlassCard hoverEffect={true} className="border-t-4 border-t-blue-500 h-full">
              <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6">
                <Code size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Developer & Creator</h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Mengembangkan modul tambahan, plugin, atau tema. Setiap kali karya Anda digunakan user, Anda mendapatkan royalti.
              </p>
              <ul className="text-sm text-gray-500 space-y-2 mt-auto">
                <li className="flex gap-2"><Shield size={14} /> Royalti Berkelanjutan</li>
                <li className="flex gap-2"><Shield size={14} /> Open API Access</li>
              </ul>
            </GlassCard>

            {/* Partner */}
            <GlassCard hoverEffect={true} className="border-t-4 border-t-sibos-orange h-full">
              <div className="w-14 h-14 rounded-full bg-sibos-orange/10 flex items-center justify-center text-sibos-orange mb-6">
                <Briefcase size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Partner Wilayah</h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Ujung tombak pelayanan. Menangani maintenance klien di area lokal. Jumlah klien dibatasi agar pelayanan tetap premium.
              </p>
              <ul className="text-sm text-gray-500 space-y-2 mt-auto">
                <li className="flex gap-2"><Shield size={14} /> Pendapatan Maintenance</li>
                <li className="flex gap-2"><Shield size={14} /> Training Eksklusif</li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>
    </div>
  );
};