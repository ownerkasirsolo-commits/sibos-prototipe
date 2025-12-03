
import React from 'react';
import { Check } from 'lucide-react';
import { PricingTier } from '../types';
import { GlassCard } from './ui/GlassCard';

const tiers: PricingTier[] = [
  {
    name: "Freemium",
    price: "Rp 0",
    features: ["Fitur POS Dasar", "1 Outlet", "1 User", "Laporan Harian", "Database Produk Standar"],
    recommended: false
  },
  {
    name: "Premium",
    price: "Mulai Rp 150rb",
    features: ["Semua Fitur POS", "Multi Outlet & User", "Laporan Keuangan Lengkap", "Manajemen Stok & Produksi", "CRM & Loyalty", "Dukungan Hardware"],
    recommended: true
  },
  {
    name: "Dedicated",
    price: "Custom",
    features: ["Private Server", "White Label (Opsional)", "Custom Modul", "Prioritas Support 24/7", "API Access", "Training On-Site"],
    recommended: false
  }
];

export const Pricing: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950" id="pricing">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Pilih Skema Anda</h2>
          <p className="text-gray-400">Fleksibel sesuai pertumbuhan bisnis Anda.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, idx) => (
            <GlassCard key={idx} className={`relative flex flex-col ${tier.recommended ? 'border-sibos-orange bg-sibos-orange/10 scale-105 shadow-2xl shadow-orange-900/20 z-10' : 'hover:border-white/20'}`}>
              {tier.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-sibos-orange to-red-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                  Paling Laris
                </div>
              )}
              <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
              <div className="text-3xl font-bold text-sibos-orange mb-6">{tier.price}</div>
              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-sm text-gray-300">
                    <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-bold transition-all ${
                tier.recommended 
                  ? 'bg-gradient-to-r from-sibos-orange to-red-600 hover:from-orange-500 hover:to-red-500 text-white shadow-lg shadow-orange-900/40 transform hover:-translate-y-1' 
                  : 'bg-white/10 hover:bg-white/20 text-white hover:text-sibos-orange'
              }`}>
                Pilih Paket
              </button>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
