import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  collapsed?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', collapsed = false }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Hex Prism Mark with Royal Purple & Bright Orange */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center shrink-0`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#6941C6] via-[#855AE3] to-[#FF8243] rounded-xl rotate-6 opacity-95 shadow-md shadow-[#6941C6]/30 group-hover:rotate-12 transition-transform" />
        <div className="absolute inset-0.5 bg-[#402568] rounded-[10px] flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-gradient-to-br from-[#FF8243] to-[#FFB085] rounded-sm" />
        </div>
      </div>

      {!collapsed && (
        <div className="flex items-baseline tracking-tight">
          <span className={`font-display font-extrabold text-white ${textSizes[size]}`}>
            Nexus<span className="text-[#FF8243] font-bold">Talent</span>
          </span>
          <span className="w-1.5 h-1.5 bg-[#FF8243] rounded-full ml-1" />
        </div>
      )}
    </div>
  );
};
