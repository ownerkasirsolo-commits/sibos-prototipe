
import React from 'react';
import { 
  DollarSign, TrendingUp, TrendingDown, 
  FileText, PieChart, Download, Calendar, Settings
} from 'lucide-react';
import { Page } from '../types';
import { GlassCard } from './ui/GlassCard';
import { useSibos } from '../contexts/SibosContext';
import { BackofficeLayout } from './BackofficeLayout';

interface AccountingAppPageProps {
  onNavigate: (page: Page) => void;
}

export const AccountingAppPage: React.FC<AccountingAppPageProps> = ({ onNavigate }) => {
  const { journals } = useSibos();

  // Calculate Real-time Financials
  const totalIncome = journals
    .filter(j => j.type === 'sales' && j.credit > 0 && j.account === 'Pendapatan Penjualan')
    .reduce((acc, j) => acc + j.credit, 0);

  const fixedExpense = 8500000; 
  const totalExpense = fixedExpense; 
  
  const netProfit = totalIncome - totalExpense;
  const margin = totalIncome > 0 ? ((netProfit / totalIncome) * 100).toFixed(1) : '0';

  return (
    <BackofficeLayout
        title="Keuangan & Akuntansi"
        icon={<DollarSign className="text-amber-500" size={20} />}
        onNavigate={onNavigate}
        actions={
            <>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-white/10 hover:bg-slate-700 rounded-lg text-sm transition-colors text-gray-300">
                    <Settings size={16} /> Pengaturan
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-white/10 hover:bg-slate-700 rounded-lg text-sm transition-colors">
                    <Download size={16} /> Export Laporan
                </button>
            </>
        }
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl pb-24">
        {/* P&L Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <GlassCard className="!p-6 bg-gradient-to-br from-green-900/20 to-slate-900 border-green-500/20">
              <div className="flex items-center gap-2 text-green-400 mb-2">
                 <TrendingUp size={20} />
                 <span className="font-bold">Pemasukan (Income)</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">Rp {totalIncome.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Bulan Ini (Live)</div>
           </GlassCard>

           <GlassCard className="!p-6 bg-gradient-to-br from-red-900/20 to-slate-900 border-red-500/20">
              <div className="flex items-center gap-2 text-red-400 mb-2">
                 <TrendingDown size={20} />
                 <span className="font-bold">Pengeluaran (Expense)</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">Rp {totalExpense.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Ops + Fixed Cost (Est)</div>
           </GlassCard>

           <GlassCard className="!p-6 bg-gradient-to-br from-amber-900/20 to-slate-900 border-amber-500/20">
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                 <PieChart size={20} />
                 <span className="font-bold">Laba Bersih (Net Profit)</span>
              </div>
              <div className={`text-3xl font-bold mb-1 ${netProfit >= 0 ? 'text-white' : 'text-red-400'}`}>
                  Rp {netProfit.toLocaleString()}
              </div>
              <div className="text-xs text-gray-400">Margin: {margin}%</div>
           </GlassCard>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
           {/* Chart Placeholder */}
           <div className="lg:col-span-2 space-y-6">
              <GlassCard className="h-80 flex flex-col justify-center items-center bg-slate-900/50">
                 <div className="text-gray-500 text-sm mb-4">Grafik Arus Kas (Cashflow)</div>
                 {totalIncome > 0 ? (
                     <div className="flex items-end gap-3 h-48 w-full px-8">
                        {/* Simple visualization based on mock trend + real income */}
                        {[0.4, 0.6, 0.45, 0.7, 0.5, 0.8, 0.65, 0.9, 0.55, 0.75, 0.6, 0.95, 0.8, 0.6, 1].map((h, i) => (
                           <div key={i} className="flex-1 bg-amber-500/20 rounded-t hover:bg-amber-500 transition-colors relative group" style={{height: `${h * 100}%`}}>
                              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] px-1 rounded opacity-0 group-hover:opacity-100">
                                 Day {i+1}
                              </div>
                           </div>
                        ))}
                     </div>
                 ) : (
                     <div className="text-gray-600 text-sm italic">Belum ada transaksi masuk. Silakan lakukan penjualan di POS.</div>
                 )}
              </GlassCard>

              {/* Recent Journals (REAL DATA) */}
              <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
                 <div className="px-6 py-4 border-b border-white/5 font-bold text-white flex justify-between">
                    <span>Jurnal Transaksi Terakhir</span>
                    <button className="text-amber-500 text-xs">Lihat Semua</button>
                 </div>
                 <div className="divide-y divide-white/5 max-h-80 overflow-y-auto custom-scrollbar">
                    {journals.slice(0, 10).map((j, i) => (
                       <div key={i} className="px-6 py-3 flex justify-between items-center hover:bg-white/5">
                          <div>
                             <div className="text-sm text-white font-medium">{j.description}</div>
                             <div className="text-xs text-gray-500 flex gap-2">
                                 <span>{new Date(j.date).toLocaleTimeString()}</span>
                                 <span className="text-amber-500/70">{j.account}</span>
                             </div>
                          </div>
                          <div className={`font-mono text-sm font-bold ${j.credit > 0 ? 'text-green-400' : 'text-gray-300'}`}>
                             {j.credit > 0 ? `(K) Rp ${j.credit.toLocaleString()}` : `(D) Rp ${j.debit.toLocaleString()}`}
                          </div>
                       </div>
                    ))}
                    {journals.length === 0 && (
                        <div className="px-6 py-8 text-center text-gray-500 text-sm italic">
                            Belum ada jurnal tercatat.
                        </div>
                    )}
                 </div>
              </div>
           </div>

           {/* Quick Actions Sidebar */}
           <div className="space-y-4">
              <h3 className="font-bold text-gray-400 text-sm uppercase tracking-wider">Aksi Cepat</h3>
              <button className="w-full p-4 bg-slate-900 border border-white/10 rounded-xl hover:border-amber-500 hover:bg-slate-800 transition-all text-left flex items-center gap-3 group">
                 <div className="p-2 bg-amber-500/20 text-amber-500 rounded-lg group-hover:bg-amber-500 group-hover:text-white transition-colors"><FileText size={20} /></div>
                 <div>
                    <div className="text-white font-bold text-sm">Catat Pengeluaran</div>
                    <div className="text-xs text-gray-500">Biaya Ops, Gaji, dll</div>
                 </div>
              </button>
              <button className="w-full p-4 bg-slate-900 border border-white/10 rounded-xl hover:border-amber-500 hover:bg-slate-800 transition-all text-left flex items-center gap-3 group">
                 <div className="p-2 bg-amber-500/20 text-amber-500 rounded-lg group-hover:bg-amber-500 group-hover:text-white transition-colors"><DollarSign size={20} /></div>
                 <div>
                    <div className="text-white font-bold text-sm">Hutang Piutang</div>
                    <div className="text-xs text-gray-500">Tagihan Supplier</div>
                 </div>
              </button>
              <button className="w-full p-4 bg-slate-900 border border-white/10 rounded-xl hover:border-amber-500 hover:bg-slate-800 transition-all text-left flex items-center gap-3 group">
                 <div className="p-2 bg-amber-500/20 text-amber-500 rounded-lg group-hover:bg-amber-500 group-hover:text-white transition-colors"><Calendar size={20} /></div>
                 <div>
                    <div className="text-white font-bold text-sm">Tutup Buku (Closing)</div>
                    <div className="text-xs text-gray-500">Akhir Shift / Bulan</div>
                 </div>
              </button>
           </div>
        </div>
      </div>
    </BackofficeLayout>
  );
};
