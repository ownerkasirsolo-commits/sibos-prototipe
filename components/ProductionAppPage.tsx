
import React from 'react';
import { 
  Factory, Box, Layers, ClipboardList, 
  Cog, AlertTriangle, ArrowRight, Settings, Plus
} from 'lucide-react';
import { Page, HardwareModule, AppModule } from '../types';
import { GlassCard } from './ui/GlassCard';
import { BackofficeLayout } from './BackofficeLayout';

interface ProductionAppPageProps {
  onNavigate: (page: Page) => void;
  activeHardware?: HardwareModule[];
  activeModules?: AppModule[];
}

export const ProductionAppPage: React.FC<ProductionAppPageProps> = ({ onNavigate, activeHardware, activeModules }) => {
  return (
    <BackofficeLayout
        title="Produksi"
        icon={<Factory className="text-indigo-500" size={20} />}
        onNavigate={onNavigate}
        activeHardware={activeHardware}
        activeModules={activeModules}
        currentPage="production-app"
    >
      <div className="container mx-auto px-4 py-6 max-w-7xl pb-24">
        
        {/* Top Controls */}
        <div className="flex justify-between items-center mb-6 gap-4 border-b border-white/10 pb-4">
             {/* Tab Switcher (Simulated) */}
             <div className="flex bg-slate-900/50 p-1 rounded-lg border border-white/10 overflow-hidden">
                <button className="px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 bg-white/10 text-white shadow-sm">
                    <ClipboardList size={16} className="text-indigo-400" /> 
                    <span className="hidden sm:inline">SPK (Work Order)</span>
                </button>
                <button className="px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 text-gray-400 hover:text-white hover:bg-white/5">
                    <Settings size={16} /> 
                    <span className="hidden sm:inline">Resep / BOM</span>
                </button>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                <button 
                    title="Buat SPK Baru"
                    className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-sibos-orange to-red-600 hover:from-orange-500 hover:to-red-500 rounded-lg shadow-lg shadow-orange-900/40 text-white transition-all active:scale-95"
                >
                    <Plus size={24} strokeWidth={3} />
                </button>
            </div>
        </div>

        {/* Narrative */}
        <div className="mb-6 animate-in fade-in slide-in-from-left-4">
            <h2 className="text-xl font-bold text-white">Lantai Produksi</h2>
            <p className="text-sm text-gray-400">Monitoring status produksi dan penggunaan bahan baku.</p>
        </div>

        {/* Production Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-in fade-in">
           <GlassCard className="!p-6 bg-gradient-to-br from-indigo-900/20 to-slate-900 border-indigo-500/20">
              <div className="flex items-center gap-2 text-indigo-400 mb-2">
                 <Cog size={20} className="animate-spin-slow" />
                 <span className="font-bold">Work In Progress (WIP)</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">12 Batch</div>
              <div className="text-xs text-gray-400">Sedang diproses</div>
           </GlassCard>

           <GlassCard className="!p-6 bg-gradient-to-br from-cyan-900/20 to-slate-900 border-cyan-500/20">
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                 <Box size={20} />
                 <span className="font-bold">Barang Jadi</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">1,500 Unit</div>
              <div className="text-xs text-gray-400">Siap transfer gudang</div>
           </GlassCard>

           <GlassCard className="!p-6 bg-gradient-to-br from-red-900/20 to-slate-900 border-red-500/20">
              <div className="flex items-center gap-2 text-red-400 mb-2">
                 <AlertTriangle size={20} />
                 <span className="font-bold">Bahan Kurang</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">3 Item</div>
              <div className="text-xs text-gray-400">Menghambat produksi</div>
           </GlassCard>
        </div>

        {/* Active Production Line */}
        <div className="space-y-4 animate-in slide-in-from-bottom-4">
            {/* Production Card */}
            <div className="bg-slate-900 border border-white/10 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><Factory size={120}/></div>
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                    <div>
                        <div className="flex items-center gap-3">
                            <h3 className="text-lg font-bold text-white">WO-2025-001: Roti Tawar Gandum</h3>
                            <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 text-xs font-bold rounded border border-indigo-500/20">In Progress</span>
                        </div>
                        <div className="text-sm text-gray-400 mt-1">Target: 500 Pcs • Deadline: Besok, 10:00 AM</div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-white">65%</div>
                        <div className="text-xs text-gray-500">Selesai</div>
                    </div>
                </div>

                {/* Pipeline Visualization */}
                <div className="relative pt-4 pb-8 z-10">
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
                            <div className="text-xs font-bold text-gray-500">Packing</div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 border-t border-white/5 pt-4 z-10 relative">
                    <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-lg border border-white/10">Lihat BOM</button>
                    <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-lg flex items-center gap-2 shadow-lg">
                        Update <ArrowRight size={16} />
                    </button>
                </div>
            </div>

        </div>
      </div>
    </BackofficeLayout>
  );
};
