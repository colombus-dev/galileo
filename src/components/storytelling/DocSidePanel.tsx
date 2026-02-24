import React, { useEffect } from 'react';
import { MdClose, MdError } from 'react-icons/md';
import { renderMarkdown } from '@/utils/markdownRenderer';
import type { DocEntry } from '@/types/notebook';

export interface DocSidePanelProps {
  docEntry: DocEntry | null;
  loading?: boolean;
  error?: string | null;
  onClose?: () => void;
  className?: string;
}

/**
 * Panneau latéral affichant la documentation d'un token
 * Gère les états : loading, error, empty, data
 */
export const DocSidePanel: React.FC<DocSidePanelProps> = ({
  docEntry,
  loading = false,
  error = null,
  onClose,
  className = '',
}) => {
  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    if (onClose) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);
  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between gap-2 p-4 border-b border-slate-200 flex-shrink-0">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-slate-900 truncate">Documentation</h2>
          {onClose && (
            <p className="text-xs text-slate-400 mt-1">
              Appuyez sur <kbd className="px-1 py-0.5 bg-slate-200 rounded text-slate-700 font-mono text-xs">Esc</kbd>
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0"
          title="Fermer"
          aria-label="Fermer la documentation"
        >
          <MdClose className="text-lg text-slate-600" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          /* Loading state */
          <div className="p-6 space-y-4">
            <div className="h-8 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 bg-slate-200 rounded w-1/3 animate-pulse" />
            <div className="space-y-2 mt-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-3 bg-slate-200 rounded animate-pulse" />
              ))}
            </div>
          </div>
        ) : error ? (
          /* Error state */
          <div className="p-6">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
              <MdError className="text-lg text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-red-900">Erreur</p>
                <p className="text-sm text-red-800 mt-1">{error}</p>
              </div>
            </div>
          </div>
        ) : docEntry ? (
          /* Data state */
          <div className="p-6 space-y-6">
            {/* Title */}
            <div>
              <h3 className="text-xl font-bold text-slate-900">{docEntry.title}</h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-block px-2.5 py-1 text-xs font-medium text-white bg-slate-700 rounded-full">
                  v{docEntry.version}
                </span>
                <span className="text-sm text-slate-600">{docEntry.libName}</span>
              </div>
            </div>

            {/* Content - Markdown rendered */}
            <div className="space-y-2">{renderMarkdown(docEntry.content)}</div>

            {/* Examples */}
            {docEntry.examples && (
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Exemples</h4>
                <pre className="p-3 bg-slate-900 text-green-400 rounded-lg text-xs overflow-x-auto">
                  <code>{docEntry.examples}</code>
                </pre>
              </div>
            )}
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <div className="text-4xl mb-3">📚</div>
            <p className="text-sm text-slate-600">
              Sélectionnez un token pour afficher la documentation
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
