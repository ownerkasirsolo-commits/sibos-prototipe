
import React, { useState, useEffect } from 'react';
import { ShoppingCart, QrCode, TicketPercent, ArrowLeft } from 'lucide-react';
import { Page } from '../types';
import { useSibos } from '../contexts/SibosContext';

interface CustomerDisplayPageProps {
  onNavigate: (page: Page) => void;
}

const slides = [
    { id: 1, type: 'promo', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop', title: 'Paket Hemat Siang', desc: 'Diskon 20% untuk semua menu nasi.' },
    { id: 2, type: 'ads', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop', title: 'Kopi Gula Aren Baru', desc: 'Rasakan kenikmatan biji kopi pilihan.' },
    { id: 3, type: 'info', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop', title: 'Member Get Member', desc: 'Ajak teman, dapatkan poin ganda!' },
];

export const CustomerDisplayPage: React.FC<CustomerDisplayPageProps> = ({ onNavigate }) => {
  const { liveCart, selectedOutlet } = useSibos(); // Use Shared Live Cart
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const subtotal = liveCart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const tax = subtotal * 0.11;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex overflow-hidden">
      
      {/* LEFT SIDE: ORDER SUMMARY (40%) */}
      <div className="w-[40%] flex flex-col border-r border-white/10 bg-slate-900 relative">
         {/* Hidden Back Button for Demo Purpose */}
         <button onClick={() => onNavigate('backoffice')} className="absolute top-4 left-4 p-2 bg-white/5 rounded-full opacity-0 hover:opacity-100 transition-opacity z-50">
            <ArrowLeft size={16} />
         </button>

         {/* Header */}
         <div className="h-24 flex items-center px-8 border-b border-white/10 bg-slate-950">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-sibos-orange to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">S</div>
                <div>
                    <h1 className="font-bold text-xl text-white">{selectedOutlet.name || 'Kopi Senja Utama'}</h1>
                    <p className="text-sm text-gray-400">Selamat Datang!</p>
                </div>
            </div>
         </div>

         {/* Cart List */}
         <div className="flex-1 overflow-y-auto p-8 space-y-4 custom-scrollbar">
            {liveCart.length > 0 ? liveCart.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start p-4 rounded-2xl bg-white/5 border border-white/5 animate-in slide-in-from-left duration-500">
                    <div>
                        <div className="font-bold text-lg text-white">{item.name}</div>
                        <div className="text-sm text-gray-400">{item.qty} x Rp {item.price.toLocaleString()}</div>
                    </div>
                    <div className="font-bold text-lg text-white">
                        Rp {(item.price * item.qty).toLocaleString()}
                    </div>
                </div>
            )) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-50">
                    <ShoppingCart size={64} className="mb-4" />
                    <p className="text-lg font-medium">Menunggu pesanan...</p>
                </div>
            )}
         </div>

         {/* Totals & Payment */}
         <div className="bg-slate-950 p-8 border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-20">
             <div className="space-y-2 mb-6">
                 <div className="flex justify-between text-gray-400 text-lg">
                     <span>Subtotal</span>
                     <span>Rp {subtotal.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-gray-400 text-lg">
                     <span>Pajak (11%)</span>
                     <span>Rp {tax.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-white font-bold text-4xl pt-4 border-t border-white/10 mt-2">
                     <span>Total</span>
                     <span className="text-sibos-orange">Rp {total.toLocaleString()}</span>
                 </div>
             </div>

             {/* QRIS Area */}
             <div className="bg-white rounded-2xl p-6 flex items-center gap-6">
                 <div className="bg-slate-100 p-2 rounded-xl">
                    <QrCode size={100} className="text-black" />
                 </div>
                 <div className="flex-1 text-black">
                     <h3 className="font-bold text-xl mb-1">Scan untuk Bayar</h3>
                     <p className="text-sm text-gray-600 mb-2">Mendukung semua e-wallet & m-banking.</p>
                     <div className="flex gap-2">
                        <div className="h-6 w-10 bg-blue-600 rounded"></div>
                        <div className="h-6 w-10 bg-green-500 rounded"></div>
                        <div className="h-6 w-10 bg-orange-500 rounded"></div>
                     </div>
                 </div>
             </div>
         </div>
      </div>

      {/* RIGHT SIDE: ADS CAROUSEL (60%) */}
      <div className="flex-1 relative overflow-hidden bg-black">
         {slides.map((slide, idx) => (
             <div 
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
             >
                 <img src={slide.image} alt={slide.title} className="w-full h-full object-cover opacity-60" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                 
                 <div className="absolute bottom-20 left-12 max-w-2xl">
                     <span className="inline-block px-4 py-1.5 rounded-full bg-sibos-orange text-white font-bold text-sm mb-4 shadow-lg uppercase tracking-wider">
                        {slide.type === 'promo' ? <><TicketPercent size={16} className="inline mr-2"/> PROMO SPESIAL</> : 'REKOMENDASI'}
                     </span>
                     <h2 className="text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-2xl">{slide.title}</h2>
                     <p className="text-2xl text-gray-200 drop-shadow-md">{slide.desc}</p>
                 </div>
             </div>
         ))}

         {/* Slide Indicators */}
         <div className="absolute bottom-8 right-12 flex gap-3 z-20">
             {slides.map((_, idx) => (
                 <div 
                    key={idx} 
                    className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-12 bg-sibos-orange' : 'w-2 bg-white/30'}`}
                 ></div>
             ))}
         </div>
      </div>

    </div>
  );
};
