
import React from 'react';
import { Code, Terminal, Share2, DollarSign, Box, Cpu, GitBranch, Handshake, Users } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

export const CommunityDeveloperPage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 animate-in fade-in duration-500">
      
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6">
            <Code size={12} />
            KOLABORASI TEKNOLOGI
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Kontribusi Kode Anda, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Membangun Kedaulatan.
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light mb-12">
            Jangan cuma jadi konsumen teknologi. Di SIBOS, setiap baris kode yang Anda kontribusikan adalah pilar yang menegakkan kedaulatan digital UMKM.
          </p>
        </div>
      </section>

      {/* Core Contributions */}
      <section className="py-16 container mx-auto px-6">
         <div className="grid md:grid-cols-3 gap-8">
             <GlassCard className="group hover:border-blue-500/50 transition-colors">
                 <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                     <GitBranch size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2">Kontribusi Core System</h3>
                 <p className="text-gray-400 text-sm">
                     Perkuat fondasi SIBOS. Bangun fitur-fitur fundamental, perbaiki arsitektur, dan optimalkan performa inti aplikasi.
                 </p>
             </GlassCard>

             <GlassCard className="group hover:border-purple-500/50 transition-colors">
                 <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                     <Box size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2">Modul & Integrasi Internal</h3>
                 <p className="text-gray-400 text-sm">
                     Kembangkan modul-modul spesifik (misal: CRM, HRM, Produksi) atau bangun jembatan integrasi ke layanan eksternal (Marketplace, Payment Gateway) langsung di dalam ekosistem SIBOS.
                 </p>
             </GlassCard>

             <GlassCard className="group hover:border-green-500/50 transition-colors">
                 <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center text-green-400 mb-4 group-hover:scale-110 transition-transform">
                     <Handshake size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2">Bagi Hasil Ekosistem</h3>
                 <p className="text-gray-400 text-sm">
                     Sebagai kontributor aktif dan berdedikasi, Anda berhak atas bagi hasil keuntungan ekosistem SIBOS secara tahunan, sejalan dengan visi keadilan kami.
                 </p>
             </GlassCard>
         </div>
      </section>

      {/* Philosophy & Impact Section */}
      <section className="py-20 bg-slate-900 border-y border-white/5">
          <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                  <h2 className="text-3xl font-bold text-white mb-6">Membangun Fondasi yang Kuat Bersama</h2>
                  <p className="text-gray-400 text-lg leading-relaxed mb-8">
                      Kami tidak mencari "karyawan". Kami mencari pahlawan keyboard. Individu yang percaya bahwa teknologi harusnya inklusif, bukan eksklusif. Setiap baris kode Anda adalah batu bata untuk istana digital UMKM.
                  </p>
                  <p className="text-gray-400 text-lg leading-relaxed mb-8">
                      Bayangkan Anda mengoptimalkan algoritma inventori, membuat kalkulasi HPP lebih efisien, atau merancang struktur database baru. Setiap kontribusi langsung memperkuat inti SIBOS, berkontribusi pada pertumbuhan ribuan UMKM.
                  </p>
                  <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold border border-white/10 transition-colors">
                      Pelajari Dokumentasi Teknis
                  </button>
              </div>
              <div className="lg:w-1/2">
                  <div className="bg-slate-950 rounded-xl border border-white/10 p-6 font-mono text-xs md:text-sm text-gray-300 shadow-2xl relative overflow-hidden">
                      <div className="flex gap-2 mb-4 border-b border-white/5 pb-4">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="space-y-2">
                          <p><span className="text-purple-400">const</span> updateInventory = (<span className="text-blue-400">itemId</span>, <span className="text-blue-400">qtyChange</span>) =&gt; &#123;</p>
                          <p className="pl-4"><span className="text-blue-400">if</span> (qtyChange &lt; <span className="text-orange-400">0</span>) &#123;</p>
                          <p className="pl-8 text-gray-500">// Logika validasi stok</p>
                          <p className="pl-4">&#125;</p>
                          <p className="pl-4">commitToCoreDatabase(itemId, qtyChange);</p>
                          <p className="pl-4">triggerAnalyticsEngine(itemId);</p>
                          <p>&#125;;</p>
                          <p className="mt-4"><span className="text-green-400">// Setiap kontribusi memperkuat ekosistem</span></p>
                          {/* Fix: Render the object literal as a string to avoid JSX comma operator error */}
                          <p><span className="text-yellow-400">export default</span> {'{ Users, Code }'};</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

    </div>
  );
};
