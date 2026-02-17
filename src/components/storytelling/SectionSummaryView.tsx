import React, { useMemo } from 'react';
import { MdWarningAmber } from 'react-icons/md';
import { Storyteller } from '@/components/Storyteller';
import { renderMarkdown } from '@/utils/markdownRenderer';
import type { NotebookModel, NotebookSection } from '@/types/notebook';

export interface SectionSummaryViewProps {
  notebook: NotebookModel;
  section: NotebookSection;
  fallbackMessage?: string;
  className?: string;
}

/**
 * Affiche le résumé d'une section
 * Si aucun markdown n'est trouvé, affiche un banner de fallback
 */
export const SectionSummaryView: React.FC<SectionSummaryViewProps> = ({
  notebook,
  section,
  fallbackMessage = 'Pas de résumé Markdown trouvé. Le mode code est activé.',
  className = '',
}) => {
  const hasMarkdown = useMemo(() => {
    return section.cellIds.some((cellId) => {
      const cell = notebook.cells.find((c) => c.id === cellId);
      return cell && cell.type === 'markdown';
    });
  }, [section, notebook.cells]);

  const codeCount = useMemo(() => {
    return section.cellIds.filter((cellId) => {
      const cell = notebook.cells.find((c) => c.id === cellId);
      return cell && cell.type === 'code';
    }).length;
  }, [section, notebook.cells]);

  return (
    <div className={`p-8 ${className}`}>
      {/* Header section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-1">{section.title}</h2>
        <p className="text-sm text-slate-500">
          {codeCount} cellule{codeCount > 1 ? 's' : ''} • Section {section.order + 1}
        </p>
      </div>

      {/* Fallback warning si pas de markdown */}
      {!hasMarkdown && (
        <div className="mb-6 flex items-start gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200">
          <MdWarningAmber className="text-lg text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-900">⚠️ {fallbackMessage}</p>
            <p className="text-xs text-amber-700 mt-1">
              Cette section ne contient pas de cellules Markdown. Seul le code est disponible ci-dessous.
            </p>
          </div>
        </div>
      )}

      {/* Summary text */}
      <div className="prose prose-sm max-w-none mb-8">
        <Storyteller
          title="Résumé"
          paragraph={section.summary}
          as="h3"
          variant="plain"
          size="md"
          tone={hasMarkdown ? 'default' : 'subtle'}
        />
      </div>

      {/* Markdown content dari cellules */}
      {hasMarkdown && (
        <div className="space-y-6">
          {section.cellIds.map((cellId) => {
            const cell = notebook.cells.find((c) => c.id === cellId);
            if (!cell || cell.type !== 'markdown') return null;

            return (
              <div
                key={cell.id}
                className="rounded-lg bg-white border border-slate-200 p-6 shadow-sm space-y-3"
              >
                <div className="text-slate-700 text-sm space-y-3">
                  {renderMarkdown(cell.content)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
