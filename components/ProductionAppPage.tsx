
import React from 'react';
import { 
  Factory, Box, Layers, ClipboardList, 
  Cog, AlertTriangle, ArrowRight, Settings
} from 'lucide-react';
import { Page } from '../types';
import { GlassCard } from './ui/GlassCard';
import { BackofficeLayout } from './BackofficeLayout';

interface ProductionAppPageProps {
  onNavigate: (page: Page) => void;
}

export const ProductionAppPage: React.FC<ProductionAppPageProps> = ({ onNavigate }) => {
  return (
    <BackofficeLayout
        title="Manufaktur & Produksi"
        icon={<Factory className="text-indigo-500" size={20} />}
        onNavigate={onNavigate}
        actions={
            <>
                <button className="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-white/10 hover:bg-slate-700 rounded-lg text-sm text-gray-300 transition-colors">
                    <Settings size={16} /> <span className="hidden sm:inline">Resep / BOM</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-bold shadow-lg shadow-indigo-900/40">
                    <ClipboardList size={16} /> Buat SPK
                </button>
            </>
        }
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl pb-24">
        
        {/* Production Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <GlassCard className="!p-6 bg-gradient-to-br from-indigo-900/20 to-slate-900 border-indigo-500/20">
              <div className="flex items-center gap-2 text-indigo-400 mb-2">
                 <Cog size={20} className="animate-spin-slow" />
                 <span className="font-bold">Work In Progress (WIP)</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">12 Batch</div>
              <div className="text-xs text-gray-400">Sedang diproses di lantai produksi</div>
           </GlassCard>

           <GlassCard className="!p-6 bg-gradient-to-br from-cyan-900/20 to-slate-900 border-cyan-500/20">
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                 <Box size={20} />
                 <span className="font-bold">Finished Goods</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">1,500 Unit</div>
              <div className="text-xs text-gray-400">Siap kirim ke gudang utama</div>
           </GlassCard>

           <GlassCard className="!p-6 bg-gradient-to-br from-red-900/20 to-slate-900 border-red-500/20">
              <div className="flex items-center gap-2 text-red-400 mb-2">
                 <AlertTriangle size={20} />
                 <span className="font-bold">Bahan Baku Kurang</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">3 Item</div>
              <div className="text-xs text-gray-400">Menghambat 2 Work Order</div>
           </GlassCard>
        </div>

        {/* Active Production Line */}
        <h2 className="text-xl font-bold text-white mb-4">Lini Produksi Aktif</h2>
        <div className="space-y-4">
            
            {/* Production Card */}
            <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <div className="flex items-center gap-3">
                            <h3 className="text-lg font-bold text-white">WO-2025-001: Roti Tawar Gandum</h3>
                            <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 text-xs font-bold rounded border border-indigo-500/20">In Progress</span>
                        </div>
                        <div className="text-sm text-gray-400 mt-1">Target: 500 Pcs • Deadline: Besok, 10:00 AM</div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-white">65%</div>
                        <div className="text-xs text-gray-500">Completion</div>
                    </div>
                </div>

                {/* Pipeline Visualization */}
                <div className="relative pt-4 pb-8">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 z-0"></div>
                    <div className="absolute top-1/2 left-0 w-[65%] h-1 bg-indigo-500 -translate-y-1/2 z-0"></div>

                    <div className="relative z-10 flex justify-between">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white border-4 border-slate-900">
                                <Layers size={14} />
                            </div>
                            <div className="text-xs font-bold text-indigo-400">Mixing</div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white border-4 border-slate-900">
                                <Cog size={14} />
                            </div>
                            <div className="text-xs font-bold text-indigo-400">Molding</div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-indigo-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] animate-pulse">
                                <Box size={18} className="text-indigo-400" />
                            </div>
                            <div className="text-xs font-bold text-white bg-slate-800 px-2 py-0.5 rounded">Baking</div>
                        </div>

                        {/* Step 4 */}
                        <div className="flex flex-col items-center gap-2 opacity-50">
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-gray-500 border-4 border-slate-900">
                                <ClipboardList size={14} />
                            </div>
                            <div className="text-xs font-bold text-gray-500">QC & Pack</div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 border-t border-white/5 pt-4">
                    <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-lg border border-white/10">Lihat BOM (Resep)</button>
                    <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-lg flex items-center gap-2">
                        Update Progress <ArrowRight size={16} />
                    </button>
                </div>
            </div>

        </div>
      </div>
    </BackofficeLayout>
  );
};
