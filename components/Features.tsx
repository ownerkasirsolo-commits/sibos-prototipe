
import React from 'react';
import { 
  Monitor, Smartphone, Store, Users, BarChart3, 
  Cpu, Layers, Globe, Printer, ShoppingBag, 
  Settings, Megaphone, Building2 
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { Feature } from '../types';

const featureList: Feature[] = [
  {
    title: 'Multi-Brand Ecosystem',
    description: 'Satu akun untuk kelola Restoran, Toko Baju, dan Bengkel sekaligus. Data terpisah per brand namun terpusat di satu dashboard owner.',
    icon: Building2
  },
  {
    title: 'POS Hybrid Canggih',
    description: 'Mode kasir fleksibel (Ritel/F&B). Mendukung multi-varian, multi-harga, dan transaksi desimal presisi.',
    icon: Monitor
  },
  {
    title: 'Omnichannel Real-time',
    description: 'Terhubung ke Marketplace, Media Sosial, dan Website Usaha. Stok sinkron otomatis di semua saluran penjualan.',
    icon: Globe
  },
  {
    title: 'AI Business Intelligence',
    description: 'Bukan sekadar grafik. AI kami memberi saran strategi: Kapan harus restock, produk apa yang harus dibundling, dan prediksi omzet.',
    icon: Cpu
  },
  {
    title: 'Manajemen Stok & Produksi',
    description: 'Lacak HPP bahan baku (resep), assembly produk bundling, dan transfer stok antar gudang/cabang tanpa selisih.',
    icon: Layers
  },
  {
    title: 'CRM & Membership Global',
    description: 'Poin member berlaku lintas cabang. Kenali pelanggan Anda di outlet manapun mereka berbelanja.',
    icon: Users
  },
  {
    title: 'Accounting Otomatis',
    description: 'Setiap transaksi POS langsung menjurnal Laporan Keuangan (Laba Rugi/Neraca) standar PSAK secara real-time.',
    icon: BarChart3
  },
  {
    title: 'Monetisasi Komunitas',
    description: 'Dapatkan penghasilan tambahan dengan mengaktifkan slot iklan komunitas di layar kedua (Customer Display) Anda.',
    icon: Megaphone
  }
];

export const Features: React.FC = () => {
  return (
    <section className="py-24 relative bg-slate-950" id="features">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-white">Satu Akun.</span> <span className="text-sibos-orange">Ribuan Kemungkinan.</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Lupakan batasan software lama. SIBOS dirancang agar Anda bisa menjalankan Coffee Shop di pagi hari, Butik di siang hari, dan Kost-kostan di malam hari—semua dalam satu genggaman.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureList.map((feature, idx) => (
            <GlassCard key={idx} hoverEffect={true} className="h-full group">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-sibos-orange/20 to-transparent border border-sibos-orange/30 flex items-center justify-center mb-4 text-sibos-orange group-hover:scale-110 transition-transform">
                <feature.icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-sibos-orange transition-colors">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </GlassCard>
          ))}
        </div>

        {/* Device Showcase Mockup Placeholder */}
        <div className="mt-24 p-10 bg-gradient-to-b from-slate-900 to-black rounded-3xl border border-white/10 relative overflow-hidden text-center shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 z-0"></div>
            
            <div className="relative z-10 max-w-4xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ringan. Cepat. Di Perangkat Apapun.</h3>
                <p className="text-gray-400 mb-12">
                    Kami mengoptimalkan kode SIBOS hingga ke level bit. Berjalan mulus di <strong>Smartphone Apapun (Entry-Level Android/iOS)</strong>, Tablet kasir, hingga PC Desktop spek rendah sekalipun. Tidak perlu hardware mahal.
                </p>

                <div className="flex justify-center items-end gap-4 md:gap-8 opacity-90">
                    {/* Mobile */}
                    <div className="w-12 md:w-16 h-20 md:h-28 bg-slate-800 rounded-lg border-2 border-slate-600 shadow-lg animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    {/* Tablet */}
                    <div className="w-24 md:w-32 h-32 md:h-48 bg-slate-800 rounded-xl border-2 border-slate-600 shadow-lg animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    {/* Desktop */}
                    <div className="w-40 md:w-64 h-28 md:h-40 bg-slate-800 rounded-xl border-b-8 border-x-4 border-t-4 border-slate-600 shadow-xl mb-4"></div>
                </div>
                
                <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs font-mono text-gray-500 uppercase tracking-widest">
                    <span>Android</span> • <span>iOS</span> • <span>Windows</span> • <span>Linux</span> • <span>MacOS</span> • <span>Web Browser</span>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};
