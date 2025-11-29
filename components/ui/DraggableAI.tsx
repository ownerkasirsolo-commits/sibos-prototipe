
import React, { useState, useEffect, useRef } from 'react';
import { Bot, Sparkles, X, Send, GripVertical, MessageSquare } from 'lucide-react';

export const DraggableAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle Idle State (Dimming)
  const resetIdleTimer = () => {
    setIsIdle(false);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
        if (!isOpen) setIsIdle(true);
    }, 3000);
  };

  useEffect(() => {
    resetIdleTimer();
    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('click', resetIdleTimer);
    return () => {
        window.removeEventListener('mousemove', resetIdleTimer);
        window.removeEventListener('click', resetIdleTimer);
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [isOpen]);

  // Drag Logic
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isOpen) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Boundaries
      const maxX = window.innerWidth - 60;
      const maxY = window.innerHeight - 60;
      
      setPosition({
        x: Math.max(10, Math.min(newX, maxX)),
        y: Math.max(10, Math.min(newY, maxY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <>
      {/* Floating Button */}
      <div 
        ref={buttonRef}
        onMouseDown={handleMouseDown}
        onClick={(e) => {
            if (!isDragging) setIsOpen(true);
        }}
        style={{ 
            left: position.x, 
            top: position.y,
            opacity: isIdle && !isOpen ? 0.5 : 1,
            transform: isIdle && !isOpen ? 'scale(0.8) translateX(50%)' : 'scale(1)'
        }}
        className={`fixed z-[100] cursor-pointer transition-all duration-300 ease-out ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      >
        <div className={`
            w-14 h-14 rounded-full flex items-center justify-center shadow-2xl border border-white/20 backdrop-blur-md relative
            ${isOpen ? 'bg-transparent pointer-events-none' : 'bg-gradient-to-br from-violet-600 to-indigo-600 hover:scale-110'}
        `}>
            {!isOpen && (
                <>
                    <Bot size={28} className="text-white" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse"></div>
                    {/* Handle Grip Visual */}
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 text-white/20">
                        <GripVertical size={16} />
                    </div>
                </>
            )}
        </div>
      </div>

      {/* Chat Interface (Fixed Position when Open) */}
      {isOpen && (
        <div className="fixed inset-0 z-[101] flex items-end sm:items-center justify-center sm:justify-end p-4 sm:p-6 pointer-events-none">
            <div className="bg-slate-900/95 backdrop-blur-xl border border-violet-500/30 w-full sm:w-[400px] h-[600px] rounded-3xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto animate-in slide-in-from-bottom-10 zoom-in-95 duration-300">
                
                {/* Header */}
                <div className="p-4 bg-gradient-to-r from-violet-900/50 to-slate-900 border-b border-white/10 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center shadow-lg shadow-violet-900/50">
                            <Bot size={20} className="text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-sm">SIBOS Assistant</h3>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                <span className="text-[10px] text-violet-200">Online • AI Powered</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Chat Area */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-black/20">
                    <div className="flex gap-3">
                        <div className="w-8 h-8 bg-violet-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <Bot size={16} className="text-violet-400" />
                        </div>
                        <div className="bg-white/10 rounded-2xl rounded-tl-none p-3 text-sm text-gray-200 max-w-[85%]">
                            Halo! Saya asisten bisnis Anda. Ada yang bisa saya bantu hari ini?
                            <br/><br/>
                            Coba tanya:
                            <ul className="list-disc pl-4 mt-2 space-y-1 text-xs text-gray-400">
                                <li>"Berapa omzet hari ini?"</li>
                                <li>"Barang apa yang stoknya menipis?"</li>
                                <li>"Buatkan strategi promo minggu ini."</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-white/10 bg-slate-900">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Ketik pertanyaan..." 
                            className="w-full bg-slate-800 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:border-violet-500 outline-none placeholder-gray-500"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-white transition-colors">
                            <Send size={16} />
                        </button>
                    </div>
                    <div className="text-[10px] text-center text-gray-600 mt-2 flex items-center justify-center gap-1">
                        <Sparkles size={10} /> Powered by SIBOS Intelligence
                    </div>
                </div>
            </div>
        </div>
      )}
    </>
  );
};
