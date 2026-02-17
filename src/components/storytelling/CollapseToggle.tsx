import React from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

export interface CollapseToggleProps {
  collapsed?: boolean;
  onChange?: (collapsed: boolean) => void;
  label?: string;
  className?: string;
}

/**
 * Bouton pour basculer l'état rétracté/étendu
 */
export const CollapseToggle: React.FC<CollapseToggleProps> = ({
  collapsed = false,
  onChange,
  label = 'Code',
  className = '',
}) => {
  return (
    <button
      onClick={() => onChange?.(!collapsed)}
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-colors
        bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900
        border border-slate-200 hover:border-slate-300
        ${className}`}
      aria-expanded={!collapsed}
      title={collapsed ? `Afficher ${label}` : `Masquer ${label}`}
    >
      <span>{collapsed ? 'Afficher' : 'Masquer'}</span>
      {collapsed ? (
        <MdExpandMore className="text-lg" />
      ) : (
        <MdExpandLess className="text-lg" />
      )}
    </button>
  );
};
