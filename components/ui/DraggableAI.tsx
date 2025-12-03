
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Bot, Sparkles, X, Send } from 'lucide-react';

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Modal Content rendered via Portal
  const modalContent = (
    <div className="fixed inset-0 z-[99999] flex flex-col justify-end md:justify-start items-center md:items-end font-sans pointer-events-none">
        {/* Backdrop - allows closing when clicking outside */}
        <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto transition-opacity duration-300" 
            onClick={() => setIsOpen(false)}
        />

        {/* Modal Window Container */}
        <div className="pointer-events-auto w-full sm:w-[400px] h-[85vh] md:h-[600px] md:mt-20 md:mr-6 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-t-3xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden relative z-10 animate-in slide-in-from-bottom-10 fade-in zoom-in-95 duration-300 ring-1 ring-white/10">
            
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-violet-900/50 to-slate-900 border-b border-white/10 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center shadow-lg shadow-violet-900/50 relative">
                        <Bot size={20} className="text-white" />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-slate-900 rounded-full"></span>
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-sm">Boy (AI Assistant)</h3>
                        <div className="flex items-center gap-1.5">
                            <span className="text-[10px] text-gray-400">Online • SIBOS Intelligence</span>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={() => setIsOpen(false)} 
                    className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/50 custom-scrollbar">
                {/* Welcome Message */}
                <div className="flex gap-3">
                    <div className="w-8 h-8 bg-violet-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot size={16} className="text-violet-400" />
                    </div>
                    <div className="bg-white/10 rounded-2xl rounded-tl-none p-3 text-sm text-gray-200 max-w-[85%] leading-relaxed border border-white/5">
                        Halo! Saya <strong>Boy</strong>, asisten bisnis cerdas Anda. Ada yang bisa saya bantu hari ini?
                        <br/><br/>
                        Coba tanya:
                        <ul className="list-disc pl-4 mt-2 space-y-1 text-xs text-gray-400">
                            <li>"Berapa omzet hari ini?"</li>
                            <li>"Barang apa yang stoknya menipis?"</li>
                            <li>"Buatkan strategi promo minggu ini."</li>
                        </ul>
                    </div>
                </div>
                
                {/* Example User Message (Static for demo) */}
                {/* 
                <div className="flex gap-3 flex-row-reverse">
                    <div className="bg-violet-600 text-white rounded-2xl rounded-tr-none p-3 text-sm max-w-[85%]">
                        Cek laporan penjualan kemarin dong.
                    </div>
                </div>
                */}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-slate-900 shrink-0 pb-6 md:pb-4">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Tanya Boy..." 
                        className="w-full bg-slate-800 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:border-violet-500 outline-none placeholder-gray-500 transition-colors shadow-inner"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-white transition-colors shadow-lg">
                        <Send size={16} />
                    </button>
                </div>
                <div className="text-[10px] text-center text-gray-600 mt-3 flex items-center justify-center gap-1 opacity-70">
                    <Sparkles size={10} /> Powered by SIBOS Intelligence
                </div>
            </div>
        </div>
    </div>
  );

  return (
    <>
      {/* Trigger Button in Header */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-full hover:bg-white/5 transition-colors relative group ${isOpen ? 'text-sibos-orange bg-white/5' : 'text-gray-400 hover:text-sibos-orange'}`}
        title="AI Assistant"
      >
        <Bot size={20} />
        {/* Sparkle Badge */}
        {!isOpen && <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-green-400 rounded-full animate-pulse border border-slate-900"></div>}
      </button>

      {/* Render Modal via Portal at Body Level */}
      {mounted && isOpen && createPortal(modalContent, document.body)}
    </>
  );
};
