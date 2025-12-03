
import React from 'react';
import { 
  BrainCircuit, Bot, Sparkles, Zap, LineChart, 
  MessageSquare, Search, Fingerprint, ArrowRight,
  Cpu
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

export const AIPage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 animate-in fade-in duration-500">
      
      {/* HERO SECTION WITH ILLUSTRATION BACKGROUND */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065&auto=format&fit=crop" 
            alt="Artificial Intelligence" 
            className="w-full h-full object-cover opacity-30"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-950/90 to-slate-950"></div>
        </div>
        
        {/* Noise & Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>

        {/* Floating Particles/Glows */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-violet-600/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-fuchsia-600/20 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-bold tracking-wider mb-8 shadow-[0_0_20px_rgba(139,92,246,0.3)] backdrop-blur-md">
            <BrainCircuit size={14} className="animate-pulse" />
            THE EQUALIZER
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
            Demokratisasi <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-white">
              Kecerdasan Super
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Teknologi prediksi canggih tidak boleh hanya dimiliki Amazon atau Google. Kami mencuri api Prometheus ini dan memberikannya kepada pedagang pasar agar bisa bersaing setara.
          </p>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-16 container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <GlassCard className="group hover:border-violet-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-violet-500/10 text-violet-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <LineChart size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Prediksi Penjualan (Forecasting)</h3>
            <p className="text-gray-400 text-sm">
              Algoritma Machine Learning menganalisis data historis untuk memprediksi omzet bulan depan, bahkan hari apa toko akan ramai.
            </p>
          </GlassCard>

          <GlassCard className="group hover:border-violet-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-fuchsia-500/10 text-fuchsia-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Smart Restock</h3>
            <p className="text-gray-400 text-sm">
              Sistem menyarankan kapan harus belanja bahan baku. "Stok Gula aman untuk 3 hari lagi, tapi pesan sekarang karena supplier X butuh 2 hari kirim."
            </p>
          </GlassCard>

          <GlassCard className="group hover:border-violet-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Bot size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Chatbot Pelanggan 24/7</h3>
            <p className="text-gray-400 text-sm">
              Bot cerdas yang bisa menjawab "Apakah menu X tersedia?" atau "Cek status pesanan saya" melalui WhatsApp tanpa campur tangan admin.
            </p>
          </GlassCard>

          <GlassCard className="group hover:border-violet-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Sparkles size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Rekomendasi Menu (Bundling)</h3>
            <p className="text-gray-400 text-sm">
              AI menemukan pola tersembunyi. "Pelanggan yang beli Kopi Susu 80% juga membeli Roti Bakar." Sistem menyarankan paket bundling otomatis.
            </p>
          </GlassCard>

          <GlassCard className="group hover:border-violet-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Content Generator</h3>
            <p className="text-gray-400 text-sm">
              Bingung bikin caption Instagram? AI SIBOS bisa membuatkan deskripsi produk yang menarik dan copywriting promosi dalam hitungan detik.
            </p>
          </GlassCard>

          <GlassCard className="group hover:border-violet-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Fingerprint size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Fraud Detection</h3>
            <p className="text-gray-400 text-sm">
              Mendeteksi anomali transaksi kasir. Misal: Terlalu banyak void/pembatalan di jam tertentu, atau diskon manual yang tidak wajar.
            </p>
          </GlassCard>

        </div>
      </section>

      {/* Interactive / Demo Section Concept */}
      <section className="py-20 bg-slate-900 border-y border-white/5 relative">
        <div className="container mx-auto px-6">
           <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                 <h2 className="text-3xl font-bold text-white mb-6">Asisten Pribadi untuk CEO</h2>
                 <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                    Bayangkan memiliki konsultan bisnis lulusan Harvard yang bekerja 24 jam sehari untuk Anda. SIBOS AI membaca jutaan baris data transaksi Anda dan mengubahnya menjadi kalimat manusiawi.
                 </p>
                 
                 <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-xl border-l-4 border-violet-500">
                        <div className="text-xs text-violet-400 font-bold mb-1">PERTANYAAN ANDA</div>
                        <div className="text-white">"Gimana performa penjualan minggu ini?"</div>
                    </div>
                    
                    <div className="flex justify-center">
                        <ArrowRight className="rotate-90 text-gray-600" />
                    </div>

                    <div className="p-4 bg-violet-900/20 rounded-xl border border-violet-500/20 relative">
                        <div className="absolute -top-3 -right-3 w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                            <Sparkles size={16} className="text-white" />
                        </div>
                        <div className="text-xs text-violet-400 font-bold mb-1">JAWABAN SIBOS AI</div>
                        <div className="text-gray-200 text-sm leading-relaxed">
                            "Omzet turun <strong>5%</strong> dibanding minggu lalu, terutama di kategori Minuman Dingin karena cuaca hujan. <br/><br/>
                            <strong>Saran:</strong> Buat promo 'Beli 1 Gratis 1' untuk stok Susu Segar yang akan expired 3 hari lagi."
                        </div>
                    </div>
                 </div>
              </div>

              <div className="lg:w-1/2 relative">
                 {/* Illustration of Neural Network Processing */}
                 <div className="relative aspect-square max-w-md mx-auto">
                    <div className="absolute inset-0 bg-violet-500/5 rounded-full blur-3xl animate-pulse"></div>
                    
                    {/* Central Brain */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-slate-900 rounded-full border-2 border-violet-500 shadow-[0_0_30px_rgba(139,92,246,0.5)] flex items-center justify-center z-20">
                        <Cpu size={64} className="text-violet-400" />
                    </div>

                    {/* Orbiting Data Points */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-slate-800 px-4 py-2 rounded-lg border border-white/10 text-xs text-gray-300 shadow-xl z-10 animate-[bounce_3s_infinite]">
                        Data Penjualan
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 bg-slate-800 px-4 py-2 rounded-lg border border-white/10 text-xs text-gray-300 shadow-xl z-10 animate-[bounce_4s_infinite]">
                        Data Cuaca
                    </div>
                    <div className="absolute left-0 top-1/2 -translate-x-4 bg-slate-800 px-4 py-2 rounded-lg border border-white/10 text-xs text-gray-300 shadow-xl z-10 animate-[bounce_3.5s_infinite]">
                        Tren Sosmed
                    </div>
                    <div className="absolute right-0 top-1/2 translate-x-4 bg-slate-800 px-4 py-2 rounded-lg border border-white/10 text-xs text-gray-300 shadow-xl z-10 animate-[bounce_4.5s_infinite]">
                        Stok Gudang
                    </div>

                    {/* Connecting Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                        <line x1="50%" y1="50%" x2="50%" y2="10%" stroke="#8b5cf6" strokeWidth="2" />
                        <line x1="50%" y1="50%" x2="50%" y2="90%" stroke="#8b5cf6" strokeWidth="2" />
                        <line x1="50%" y1="50%" x2="10%" y2="50%" stroke="#8b5cf6" strokeWidth="2" />
                        <line x1="50%" y1="50%" x2="90%" y2="50%" stroke="#8b5cf6" strokeWidth="2" />
                    </svg>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center container mx-auto px-6">
        <GlassCard className="max-w-4xl mx-auto p-12 relative overflow-hidden bg-gradient-to-br from-slate-900 to-violet-950/30 border-violet-500/20">
           <div className="relative z-10">
              <div className="w-16 h-16 bg-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-violet-900/50">
                  <BrainCircuit size={32} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">Siap Mengadopsi Masa Depan?</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                 Teknologi AI bukan lagi fiksi ilmiah. Ini adalah alat kompetitif yang sudah tersedia di SIBOS untuk membantu bisnis Anda melesat lebih cepat.
              </p>
              <button className="px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-violet-900/50 flex items-center gap-2 mx-auto">
                  Pelajari Lebih Lanjut
                  <ArrowRight size={20} />
              </button>
           </div>
        </GlassCard>
      </section>

    </div>
  );
};
