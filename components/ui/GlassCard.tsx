import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = false }) => {
  return (
    <div 
      className={`
        bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl
        ${hoverEffect ? 'transition-all duration-300 hover:bg-white/10 hover:border-sibos-orange/50 hover:-translate-y-1' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};