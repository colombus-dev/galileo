import React, { useMemo, useState } from 'react';
import { MdCode, MdToggleOn, MdToggleOff } from 'react-icons/md';
import { CollapseToggle } from './CollapseToggle';
import { CodeCell } from './CodeCell';
import { CodeViewer } from '@/components/artefacts/CodeViewer';
import type { NotebookModel, NotebookSection, Token } from '@/types/notebook';

export interface CodePanelProps {
  notebook: NotebookModel;
  section: NotebookSection;
  collapsed?: boolean;
  onToggleCollapsed?: (collapsed: boolean) => void;
  onTokenClick?: (token: Token) => void;
  onDocKeyClick?: (docKey: string) => void;
  className?: string;
}

/**
 * Panneau affichant toutes les cellules de code d'une section
 * Avec possibilité de les rétracter et de basculer entre vue cellule et vue bloc
 */
export const CodePanel: React.FC<CodePanelProps> = ({
  notebook,
  section,
  collapsed = false,
  onToggleCollapsed,
  onTokenClick,
  onDocKeyClick,
  className = '',
}) => {
  const [unifiedView, setUnifiedView] = useState(false);

  const codeCells = useMemo(() => {
    return notebook.cells
      .filter((cell) => cell.type === 'code' && section.cellIds.includes(cell.id))
      .sort((a, b) => a.index - b.index);
  }, [notebook.cells, section.cellIds]);

  const unifiedCode = useMemo(() => {
    return codeCells.map((cell) => cell.content).join('\n\n');
  }, [codeCells]);

  return (
    <div className={`w-full space-y-4 ${className}`}>
      {/* Header avec toggles */}
      <div className="w-full flex items-center justify-between gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <div className="flex items-center gap-2">
          <MdCode className="text-lg text-slate-600" />
          <h3 className="font-semibold text-slate-900">Code source</h3>
          {codeCells.length > 0 && (
            <span className="text-xs text-slate-500">({codeCells.length} cellule{codeCells.length > 1 ? 's' : ''})</span>
          )}
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2">
          {codeCells.length > 0 && (
            <label className="flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-slate-100 transition-colors">
              <input
                type="checkbox"
                checked={unifiedView}
                onChange={(e) => setUnifiedView(e.target.checked)}
                className="sr-only"
              />
              {unifiedView ? (
                <>
                  <MdToggleOn className="text-xl text-blue-600" />
                  <span className="text-xs font-medium text-blue-700">Vue en bloc</span>
                </>
              ) : (
                <>
                  <MdToggleOff className="text-xl text-slate-400" />
                  <span className="text-xs font-medium text-slate-600">Vue en cellule</span>
                </>
              )}
            </label>
          )}
          <CollapseToggle
            collapsed={collapsed}
            onChange={onToggleCollapsed}
            label="Code"
          />
        </div>
      </div>

      {/* Content */}
      {!collapsed && (
        <div className="w-full space-y-6">
          {codeCells.length > 0 ? (
            unifiedView ? (
              <CodeViewer
                code={unifiedCode}
                language="python"
                className="max-w-none w-full"
                showLineNumbers={true}
                enableDocLinks={true}
                onDocKeyClick={onDocKeyClick}
              />
            ) : (
              codeCells.map((cell, idx) => (
                <div key={cell.id} className="w-full p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                  <div className="text-xs text-slate-500 mb-3">Cellule {idx + 1}</div>
                  <CodeCell
                    cell={cell}
                    onTokenClick={onTokenClick}
                    onDocKeyClick={onDocKeyClick}
                  />
                </div>
              ))
            )
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
