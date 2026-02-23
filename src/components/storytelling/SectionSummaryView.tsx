import React, { useMemo, useState } from 'react';
import { MdWarningAmber, MdArticle, MdClose } from 'react-icons/md';
import type { NotebookModel, NotebookSection } from '@/types/notebook';

export interface SectionSummaryViewProps {
  notebook: NotebookModel;
  section: NotebookSection;
  fallbackMessage?: string;
  className?: string;
}

/**
 * Affiche uniquement le résumé/informations du notebook
 * Pas d'affichage des cellules markdown individuelles
 * Permet l'expansion pour voir le texte complet
 */
export const SectionSummaryView: React.FC<SectionSummaryViewProps> = ({
  notebook,
  section,
  fallbackMessage = 'Pas de résumé disponible.',
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
    <div className={`w-full ${className}`}>
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
              Cette section ne contient pas de cellules Markdown.
            </p>
          </div>
        </div>
      )}

      {/* Summary section with expansion */}
      <div className="space-y-3">
        <h3 className="font-semibold text-slate-900">Informations du notebook (Markdown)</h3>

        {/* Summary text */}
        <div
          className={`text-slate-700 transition-all duration-200 overflow-hidden ${
            isExpanded ? 'max-h-none' : 'max-h-32'
          }`}
        >
          <p className="m-0 whitespace-pre-wrap text-sm leading-relaxed">{section.summary}</p>
        </div>

        {/* Expand toggle button */}
        {section.summary && section.summary.length > 200 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-sm font-medium transition-colors"
          >
            {isExpanded ? (
              <>
                <MdClose className="text-lg" />
                Voir moins
              </>
            ) : (
              <>
                <MdArticle className="text-lg" />
                Voir plus
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
