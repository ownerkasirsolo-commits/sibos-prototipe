
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, ChefHat, AlertTriangle, CheckCircle, Flame, Bell, RotateCcw, UtensilsCrossed, Bot, Sparkles } from 'lucide-react';
import { Page } from '../types';
import { useSibos } from '../contexts/SibosContext';

interface KitchenDisplayPageProps {
  onNavigate: (page: Page) => void;
}

export const KitchenDisplayPage: React.FC<KitchenDisplayPageProps> = ({ onNavigate }) => {
  const { activeOrders, updateOrderStatus } = useSibos(); // Use Global State
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
      const timer = setInterval(() => setCurrentTime(new Date()), 1000);
      return () => clearInterval(timer);
  }, []);

  const calculateDuration = (startTime: number) => {
      const diff = Math.floor((Date.now() - startTime) / 1000 / 60); // minutes
      return `${diff}m`;
  };

  // Filter only non-completed orders for KDS Wall
  const displayOrders = activeOrders.filter(o => o.status !== 'done');

  return (
    <div className="min-h-screen bg-black text-white font-sans p-4 relative">
       {/* Hidden Back Button */}
       <button onClick={() => onNavigate('backoffice')} className="absolute top-4 left-4 p-2 bg-white/5 rounded-full opacity-0 hover:opacity-100 transition-opacity z-50">
        <ArrowLeft size={16} />
      </button>

      {/* Header */}
      <div className="flex justify-between items-center mb-6 px-2">
          <div className="flex items-center gap-3">
              <ChefHat size={32} className="text-white" />
              <h1 className="text-2xl font-bold uppercase tracking-widest">Kitchen Monitor</h1>
          </div>
          <div className="flex gap-4 text-xl font-mono">
              <div className="text-white font-bold">{currentTime.toLocaleTimeString()}</div>
              <div className="text-blue-400 font-bold">TOTAL: {displayOrders.length}</div>
          </div>
      </div>

      {/* Grid Tickets */}
      <div className="grid grid-cols-4 gap-4">
          {displayOrders.length === 0 && (
               <div className="col-span-4 flex flex-col items-center justify-center h-96 text-gray-600">
                   <UtensilsCrossed size={64} className="mb-4 opacity-50" />
                   <h2 className="text-2xl font-bold">Semua Pesanan Selesai</h2>
                   <p>Siap menerima order baru.</p>
               </div>
          )}

          {displayOrders.map((order, idx) => (
              <div 
                key={order.id} 
                className={`flex flex-col h-96 rounded-xl overflow-hidden border-2 ${
                    order.status === 'cooking' ? 'border-orange-500 bg-slate-900' : 
                    'border-slate-700 bg-slate-900'
                }`}
              >
                  {/* Header */}
                  <div className={`p-4 flex justify-between items-center ${
                      order.status === 'cooking' ? 'bg-orange-600' : 
                      'bg-slate-800'
                  }`}>
                      <div>
                          <div className="font-black text-2xl text-white">{order.id}</div>
                          <div className="font-bold text-sm text-white/80">{order.table}</div>
                      </div>
                      <div className="text-right">
                          <div className="font-mono font-bold text-2xl">{calculateDuration(order.startTime)}</div>
                          {parseInt(calculateDuration(order.startTime)) > 15 && <AlertTriangle size={20} className="ml-auto mt-1 text-white animate-pulse" />}
                      </div>
                  </div>

                  {/* Items */}
                  <div className="flex-1 p-4 overflow-y-auto">
                      <ul className="space-y-4">
                          {order.items.map((item, i) => (
                              <li key={i} className="border-b border-white/10 pb-2 last:border-0">
                                  <div className="flex justify-between">
                                    <span className="font-bold text-xl leading-tight">{item.name}</span>
                                    <span className="font-bold text-xl bg-white/10 px-2 rounded">{item.qty}</span>
                                  </div>
                                  {item.note && <div className="text-sm text-red-400 italic mt-1">Note: {item.note}</div>}
                              </li>
                          ))}
                      </ul>
                  </div>

                  {/* Footer / Actions */}
                  <div className="p-2 bg-slate-950 border-t border-white/10">
                      {order.status === 'queue' ? (
                          <button 
                            onClick={() => updateOrderStatus(order.id, 'cooking')}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-500 font-bold rounded text-white"
                          >
                              START COOKING
                          </button>
                      ) : (
                          <button 
                            onClick={() => updateOrderStatus(order.id, 'done')}
                            className="w-full py-3 bg-green-600 hover:bg-green-500 font-bold rounded text-white"
                          >
                              MARK DONE
                          </button>
                      )}
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
};
