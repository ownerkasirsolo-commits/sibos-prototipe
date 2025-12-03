
import React from 'react';
import { 
  PieChart, TrendingUp, FileText, Calculator, 
  RefreshCcw, Shield, DollarSign, BookOpen, 
  ArrowRight, CheckCircle2 
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

export const AccountingPage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 animate-in fade-in duration-500">
      
      {/* HERO SECTION WITH ILLUSTRATION BACKGROUND */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop" 
            alt="Financial Accounting" 
            className="w-full h-full object-cover opacity-20"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-950/90 to-slate-950"></div>
        </div>
        
        {/* Noise & Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wider mb-8 shadow-[0_0_20px_rgba(245,158,11,0.2)] backdrop-blur-md">
            <Calculator size={14} />
            SERUM KEBENARAN FINANSIAL
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
            Kebenaran Finansial <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
              Tanpa Kompromi
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Tanpa data akurat, bisnis Anda buta. Akuntansi SIBOS adalah "Serum Kebenaran" yang menelanjangi kondisi bisnis apa adanya—pahit atau manis, agar Anda tidak tertidur dalam ilusi profit semu.
          </p>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-16 container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <GlassCard className="group hover:border-amber-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BookOpen size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Auto-Journaling</h3>
            <p className="text-gray-400 text-sm">
              Tidak perlu mengerti Debit/Kredit. Sistem otomatis menjurnal penjualan, HPP, dan persediaan saat transaksi terjadi di POS.
            </p>
          </GlassCard>

          <GlassCard className="group hover:border-amber-500/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-yellow-500/10 text-yellow-400 flex items-center justify-center mb-