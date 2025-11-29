
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Clock, CheckCircle, ChefHat, 
  Flame, Bell, RotateCcw, Bot, Sparkles,
  UtensilsCrossed
} from 'lucide-react';
import { Page } from '../types';
import { useSibos } from '../contexts/SibosContext';

interface KDSAppPageProps {
  onNavigate: (page: Page) => void;
}

export const KDSAppPage: React.FC<KDSAppPageProps> = ({ onNavigate }) => {
  const { activeOrders, updateOrderStatus } = useSibos();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
      const timer = setInterval(() => setCurrentTime(new Date()), 1000);
      return () => clearInterval(timer);
  }, []);

  const calculateDuration = (startTime: number) => {
      const diff = Math.floor((Date.now() - startTime) / 1000 / 60); // minutes
      return `${diff}m`;
  };

  const sortedOrders = [...activeOrders].sort((a, b) => {
      // Sort: Cooking first, then Queue, then Done. Within that, by time.
      const statusPriority = { 'cooking': 0, 'queue': 1, 'done': 2 };
      if (statusPriority[a.status] !== statusPriority[b.status]) {
          return statusPriority[a.status] - statusPriority[b.status];
      }
      return b.startTime - a.startTime; // Newest first for demo
  });

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-white animate-in fade-in duration-300 relative">
      <header className="h-16 bg-slate-900 border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('backoffice')}
            className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <ChefHat className="text-orange-500" size={24} />
            <h1 className="font-bold text-lg">Kitchen Display System (KDS)</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-800 rounded-lg border border-white/5">
                <div className={`w-3 h-3 rounded-full ${activeOrders.length > 0 ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
                <span className="text-sm font-bold text-gray-300">{activeOrders.length > 0 ? 'Orders Active' : 'Standby'}</span>
            </div>
            <div className="text-xl font-bold font-mono">{currentTime.toLocaleTimeString()}</div>
        </div>
      </header>

      <main className="p-6 overflow-x-auto">
         <div className="flex gap-4 min-w-max">
            
            {sortedOrders.length === 0 && (
                <div className="w-full flex flex-col items-center justify-center pt-20 text-gray-600">
                    <UtensilsCrossed size={64} className="mb-4 opacity-50" />
                    <h2 className="text-2xl font-bold">Dapur Kosong</h2>
                    <p>Belum ada pesanan masuk dari POS.</p>
                </div>
            )}

            {sortedOrders.map((order) => (
                <div 
                    key={order.id} 
                    className={`
                        w-80 flex-shrink-0 rounded-xl overflow-hidden border-2 shadow-xl transition-all duration-300
                        ${order.status === 'cooking' ? 'border-orange-500/50 bg-slate-900' : 
                          order.status === 'done' ? 'border-slate-800 bg-slate-900/50 opacity-60' : 
                          'border-slate-700 bg-slate-900'}
                    `}
                >
                    {/* Ticket Header */}
                    <div className={`px-4 py-3 flex justify-between items-center ${
                        order.status === 'cooking' ? 'bg-orange-900/40' : 
                        order.status === 'done' ? 'bg-green-900/20' :
                        'bg-slate-800'
                    }`}>
                        <div>
                            <div className="font-bold text-lg text-white">{order.id}</div>
                            <div className="text-xs text-gray-300">{order.table}</div>
                        </div>
                        <div className="text-right">
                             <div className="font-mono font-bold text-lg text-green-400">
                                {calculateDuration(order.startTime)}
                             </div>
                             <div className="text-[10px] text-gray-500">{order.time}</div>
                        </div>
                    </div>

                    {/* Items List */}
                    {order.status !== 'done' ? (
                        <div className="p-4 space-y-4 min-h-[200px]">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="border-b border-white/5 last:border-0 pb-2 last:pb-0">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="font-bold text-lg text-white leading-tight">{item.name}</div>
                                            {item.note && <div className="text-xs text-red-400 italic mt-1 font-bold">Note: {item.note}</div>}
                                        </div>
                                        <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center font-bold text-lg border border-white/10">
                                            {item.qty}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-4 flex items-center justify-center h-48">
                             <div className="text-center">
                                <CheckCircle size={48} className="text-green-500/50 mx-auto mb-2" />
                                <div className="text-sm text-gray-500">Order Completed</div>
                             </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="p-2 grid grid-cols-2 gap-2 bg-slate-950 border-t border-white/10">
                         {order.status === 'queue' && (
                            <button 
                                onClick={() => updateOrderStatus(order.id, 'cooking')}
                                className="col-span-2 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-colors"
                            >
                                <Flame size={18} /> MULAI MASAK
                            </button>
                         )}
                         
                         {order.status === 'cooking' && (
                            <>
                                <button className="py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg border border-white/10">
                                    <Bell size={18} className="mx-auto" />
                                </button>
                                <button 
                                    onClick={() => updateOrderStatus(order.id, 'done')}
                                    className="py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-colors"
                                >
                                    <CheckCircle size={18} /> SELESAI
                                </button>
                            </>
                         )}

                         {order.status === 'done' && (
                            <button 
                                onClick={() => updateOrderStatus(order.id, 'cooking')}
                                className="col-span-2 py-2 bg-slate-800 text-gray-400 hover:text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2"
                            >
                                <RotateCcw size={14} /> Recall / Undo
                            </button>
                         )}
                    </div>
                </div>
            ))}

         </div>
      </main>

      {/* AI Assistant Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
           <button className="group flex items-center gap-2 px-4 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-full font-bold shadow-lg shadow-violet-900/50 transition-all hover:scale-105 active:scale-95">
             <Bot size={24} className="group-hover:animate-bounce" />
             <span className="hidden md:inline">Kitchen AI</span>
             <Sparkles size={16} className="text-violet-200 animate-pulse" />
           </button>
      </div>
    </div>
  );
};
