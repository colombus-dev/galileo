import React, { useMemo } from 'react';
import type { Token } from '@/types/notebook';

const libColors: Record<string, { bg: string; text: string; border: string }> = {
  pandas: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  sklearn: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  seaborn: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  numpy: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  matplotlib: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
};

const kindIcons: Record<string, string> = {
  function: '🔧',
  import: '📦',
  symbol: '🏷️',
};

function getTokenColor(lib: string) {
  return libColors[lib] || { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' };
}

export interface TokenChipProps {
  token: Token;
  onClick?: () => void;
  variant?: 'default' | 'highlighted' | 'secondary';
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * Badge interactif pour un token (fonction, import, symbole)
 * Color-coded par librairie
 */
export const TokenChip: React.FC<TokenChipProps> = ({
  token,
  onClick,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const colors = useMemo(() => getTokenColor(token.lib), [token.lib]);
  const icon = useMemo(() => kindIcons[token.kind] || '•', [token.kind]);

  const sizeClasses =
    size === 'sm'
      ? 'px-2.5 py-1 text-xs'
      : 'px-3 py-2 text-sm';

  const variantClasses =
    variant === 'highlighted'
      ? `${colors.bg} ${colors.text} border-2 ${colors.border} font-semibold`
      : variant === 'secondary'
        ? 'bg-slate-100 text-slate-700 border border-slate-300'
        : `${colors.bg} ${colors.text} border ${colors.border}`;

  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5 rounded-full
        transition-all duration-200
        ${sizeClasses}
        ${variantClasses}
        ${onClick ? 'cursor-pointer hover:shadow-md hover:scale-105' : 'cursor-default'}
        ${className}
      `}
      title={`${token.lib}.${token.name}`}
    >
      <span>{icon}</span>
      <span className="font-medium truncate">{token.name}</span>
      <span className="text-xs opacity-75">{token.lib}</span>
    </button>
  );
};
