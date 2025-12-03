
import React from 'react';
import { 
  DollarSign, TrendingUp, TrendingDown, 
  FileText, PieChart, Download, Calendar, Settings
} from 'lucide-react';
import { Page, HardwareModule, AppModule } from '../types';
import { GlassCard } from './ui/GlassCard';
import { useSibos } from '../contexts/SibosContext';
import { BackofficeLayout } from './BackofficeLayout';

interface AccountingAppPageProps {
  onNavigate: (page: Page) => void;
  activeHardware?: HardwareModule[];
  activeModules?: AppModule[];
}

export const AccountingAppPage: React.FC<AccountingAppPageProps> = ({ onNavigate, activeHardware, activeModules }) => {
  const { journals } = useSibos();

  const totalIncome = journals
    .filter(j => j.type === 'sales' && j.credit > 0 && j.account === 'Pendapatan Penjualan')
    .reduce((acc, j) => acc + j.credit, 0);

  const totalExpense = 8500000; 
  const netProfit = totalIncome - totalExpense;
  const margin = totalIncome > 0 ? ((netProfit / totalIncome) * 100).toFixed(1) : '0';

  return (
    <BackofficeLayout
        title="Keuangan"
        icon={<DollarSign className="text-amber-500" size={20} />}
        onNavigate={onNavigate}
        activeHardware={activeHardware}
        activeModules={activeModules}
        currentPage="accounting-app"
    >
      <div className="container mx-auto px-4 py-6 max-w-7xl pb-24">
        
        {/* Simplified Actions Bar */}
        <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
            <div>
                <h2 className="text-xl font-bold text-white">Laba Rugi (Live)</h2>
                <p className="text-sm text-gray-400">Ringkasan kesehatan finansial bisnis Anda.</p>
            </div>
            <div className="flex gap-2">
                <button className="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white bg-slate-900 transition-colors">
                    <Download size={20} />
                </button>
                <button className="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white bg-slate-900 transition-colors">
                    <Settings size={20} />
                </button>
            </div>
        </div>

        {/* P&L Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-in fade-in">
           <GlassCard className="!p-6 bg-gradient-to-br from-green-900/20 to-slate-900 border-green-500/20">
              <div className="flex items-center gap-2 text-green-400 mb-2">
                 <TrendingUp size={20} />
                 <span className="font-bold">Income</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">Rp {totalIncome.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Pemasukan Kotor</div>
           </GlassCard>

           <GlassCard className="!p-6 bg-gradient-to-br from-red-900/20 to-slate-900 border-red-500/20">
              <div className="flex items-center gap-2 text-red-400 mb-2">
                 <TrendingDown size={20} />
                 <span className="font-bold">Expense</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">Rp {totalExpense.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Pengeluaran & Ops</div>
           </GlassCard>

           <GlassCard className="!p-6 bg-gradient-to-br from-amber-900/20 to-slate-900 border-amber-500/20">
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                 <PieChart size={20} />
                 <span className="font-bold">Net Profit</span>
              </div>
              <div className={`text-3xl font-bold mb-1 ${netProfit >= 0 ? 'text-white' : 'text-red-400'}`}>
                  Rp {netProfit.toLocaleString()}
              </div>
              <div className="text-xs text-gray-400">Margin: {margin}%</div>
           </GlassCard>
        </div>

        {/* Recent Journals */}
        <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-lg">
            <div className="px-6 py-4 border-b border-white/5 font-bold text-white flex justify-between">
                <span>Jurnal Transaksi</span>
                <span className="text-xs text-gray-500 uppercase">Real-time</span>
            </div>
            <div className="divide-y divide-white/5 max-h-96 overflow-y-auto custom-scrollbar">
                {journals.map((j, i) => (
                    <div key={i} className="px-6 py-3 flex justify-between items-center hover:bg-white/5">
                        <div>
                            <div className="text-sm text-white font-medium">{j.description}</div>
                            <div className="text-xs text-gray-500 flex gap-2">
                                <span>{new Date(j.date).toLocaleTimeString()}</span>
                                <span className="text-amber-500/70">{j.account}</span>
                            </div>
                        </div>
                        <div className={`font-mono text-sm font-bold ${j.credit > 0 ? 'text-green-400' : 'text-gray-300'}`}>
                            {j.credit > 0 ? `+ Rp ${j.credit.toLocaleString()}` : `- Rp ${j.debit.toLocaleString()}`}
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </BackofficeLayout>
  );
};
