import React, { useMemo } from 'react';
import { MdCode } from 'react-icons/md';
import { CollapseToggle } from './CollapseToggle';
import { CodeCell } from './CodeCell';
import type { NotebookModel, NotebookSection, Token } from '@/types/notebook';

export interface CodePanelProps {
  notebook: NotebookModel;
  section: NotebookSection;
  collapsed?: boolean;
  onToggleCollapsed?: (collapsed: boolean) => void;
  onTokenClick?: (token: Token) => void;
  className?: string;
}

/**
 * Panneau affichant toutes les cellules de code d'une section
 * Avec possibilité de les rétracter
 */
export const CodePanel: React.FC<CodePanelProps> = ({
  notebook,
  section,
  collapsed = false,
  onToggleCollapsed,
  onTokenClick,
  className = '',
}) => {
  const codeCells = useMemo(() => {
    return notebook.cells
      .filter((cell) => cell.type === 'code' && section.cellIds.includes(cell.id))
      .sort((a, b) => a.index - b.index);
  }, [notebook.cells, section.cellIds]);

  return (
    <div className={`w-full space-y-4 ${className}`}>
      {/* Header avec toggle */}
      <div className="w-full flex items-center justify-between gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <div className="flex items-center gap-2">
          <MdCode className="text-lg text-slate-600" />
          <h3 className="font-semibold text-slate-900">Code source</h3>
          {codeCells.length > 0 && (
            <span className="text-xs text-slate-500">({codeCells.length} cellule{codeCells.length > 1 ? 's' : ''})</span>
          )}
        </div>
        <CollapseToggle
          collapsed={collapsed}
          onChange={onToggleCollapsed}
          label="Code"
        />
      </div>

      {/* Content */}
      {!collapsed && (
        <div className="w-full space-y-6">
          {codeCells.length > 0 ? (
            codeCells.map((cell, idx) => (
              <div key={cell.id} className="w-full p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 mb-3">Cellule {idx + 1}</div>
                <CodeCell
                  cell={cell}
                  onTokenClick={onTokenClick}
                />
              </div>
            ))
          ) : (
            <div className="w-full p-6 text-center bg-white rounded-lg border border-dashed border-slate-300">
              <p className="text-sm text-slate-600">Aucune cellule de code dans cette section</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
