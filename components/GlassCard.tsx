import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`backdrop-blur-xl bg-white/70 dark:bg-slate-900/60 border border-white/20 dark:border-white/10 shadow-xl dark:shadow-black/20 rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;