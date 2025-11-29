
import React from 'react';
import { ArrowLeft, Clock, CheckCircle } from 'lucide-react';
import { Page } from '../types';
import { useSibos } from '../contexts/SibosContext';

interface QueueDisplayPageProps {
  onNavigate: (page: Page) => void;
}

export const QueueDisplayPage: React.FC<QueueDisplayPageProps> = ({ onNavigate }) => {
  const { activeOrders } = useSibos(); // Use Global State

  // Filter orders based on status
  const preparing = activeOrders.filter(o => o.status === 'queue' || o.status === 'cooking');
  const serving = activeOrders.filter(o => o.status === 'done').reverse(); // Show newest done first

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col overflow-hidden relative">
      {/* Hidden Back Button */}
      <button onClick={() => onNavigate('backoffice')} className="absolute top-4 left-4 p-2 bg-white/5 rounded-full opacity-0 hover:opacity-100 transition-opacity z-50">
        <ArrowLeft size={16} />
      </button>

      {/* Header */}
      <header className="h-24 bg-slate-900 border-b border-white/10 flex items-center justify-between px-12">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-sibos-orange rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">S</div>
            <h1 className="text-3xl font-bold text-white">Status Pesanan</h1>
         </div>
         <div className="text-right">
             <div className="text-4xl font-bold text-white font-mono">{new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</div>
             <div className="text-gray-400">Mohon Menunggu Pesanan Anda</div>
         </div>
      </header>

      <main className="flex-1 flex">
         
         {/* LEFT: PREPARING (Yellow) */}
         <div className="w-1/2 border-r border-white/10 flex flex-col">
             <div className="h-20 bg-yellow-500/10 border-b border-yellow-500/20 flex items-center justify-center gap-4">
                 <Clock size={32} className="text-yellow-500" />
                 <h2 className="text-3xl font-bold text-yellow-500 uppercase tracking-widest">Sedang Disiapkan</h2>
             </div>
             
             <div className="p-8 grid grid-cols-2 gap-6 content-start">
                 {preparing.map((order, idx) => (
                     <div key={idx} className="bg-slate-900 border border-white/10 rounded-2xl py-6 flex items-center justify-center shadow-lg animate-in fade-in">
                         <span className="text-5xl font-bold text-gray-300">{order.id}</span>
                     </div>
                 ))}
                 {preparing.length === 0 && <div className="col-span-2 text-center text-gray-600 italic mt-10">Tidak ada antrian</div>}
             </div>
         </div>

         {/* RIGHT: READY / SERVING (Green) */}
         <div className="w-1/2 flex flex-col bg-slate-900/50">
             <div className="h-20 bg-green-500/10 border-b border-green-500/20 flex items-center justify-center gap-4">
                 <CheckCircle size={32} className="text-green-500" />
                 <h2 className="text-3xl font-bold text-green-500 uppercase tracking-widest">Siap Diambil</h2>
             </div>

             <div className="p-8 flex flex-col gap-6">
                 {serving.length > 0 ? (
                     <>
                        {/* Latest Ready (Big) */}
                        <div className="bg-green-600 rounded-3xl py-12 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(22,163,74,0.4)] animate-pulse">
                            <span className="text-2xl font-bold text-green-100 uppercase mb-2">Panggilan Terakhir</span>
                            <span className="text-8xl font-extrabold text-white">{serving[0].id}</span>
                        </div>

                        {/* Other Ready */}
                        <div className="grid grid-cols-2 gap-6 mt-4">
                            {serving.slice(1).map((order, idx) => (
                                <div key={idx} className="bg-slate-800 border border-green-500/30 rounded-2xl py-8 flex items-center justify-center shadow-lg">
                                    <span className="text-6xl font-bold text-white">{order.id}</span>
                                </div>
                            ))}
                        </div>
                     </>
                 ) : (
                     <div className="text-center text-gray-600 italic mt-10">Belum ada pesanan selesai</div>
                 )}
             </div>
         </div>

      </main>

      {/* Footer Marquee */}
      <div className="h-12 bg-slate-900 border-t border-white/10 flex items-center overflow-hidden">
          <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] text-lg text-gray-400 font-medium">
              Mohon simpan struk pesanan Anda sampai dipanggil • Silakan ambil pesanan di counter pengambilan • Terima kasih telah berbelanja!
          </div>
      </div>
    </div>
  );
};
