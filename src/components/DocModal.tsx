import React, { useRef, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import type { DocEntry } from '@/types/notebook';

export interface DocModalProps {
  isOpen: boolean;
  docEntry: DocEntry | null;
  loading?: boolean;
  error?: string | null;
  onClose: () => void;
}

/**
 * Modal de documentation autonome pour afficher la doc d'un token
 * Utilisable sur n'importe quelle page (pas seulement Storytelling)
 */
export const DocModal: React.FC<DocModalProps> = ({
  isOpen,
  docEntry,
  loading = false,
  error = null,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  // Fermer en cliquant en dehors
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && e.target === modalRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {docEntry?.title || 'Documentation'}
            </h2>
            {docEntry?.version && (
              <p className="text-xs text-slate-500 mt-1">
                Version {docEntry.version}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Fermer"
          >
            <MdClose className="text-xl text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6">
          {loading && (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && docEntry && (
            <div className="space-y-6">
              {/* Content */}
              <div className="prose prose-sm max-w-none">
                <div
                  className="whitespace-pre-wrap text-slate-700 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: docEntry.content
                      .split('\n')
                      .map(line => {
                        // Traiter les titres markdown
                        if (line.startsWith('# ')) {
                          return `<h1 class="text-xl font-bold mt-4 mb-2 text-slate-900">${line.slice(2)}</h1>`;
                        }
                        if (line.startsWith('## ')) {
                          return `<h2 class="text-lg font-semibold mt-3 mb-2 text-slate-800">${line.slice(3)}</h2>`;
                        }
                        if (line.startsWith('### ')) {
                          return `<h3 class="text-base font-semibold mt-2 mb-1 text-slate-800">${line.slice(4)}</h3>`;
                        }
                        if (line.startsWith('- ')) {
                          return `<li class="ml-4 text-slate-700">${line.slice(2)}</li>`;
                        }
                        return `<p class="text-slate-700">${line || '&nbsp;'}</p>`;
                      })
                      .join(''),
                  }}
                />
              </div>

              {/* Examples */}
              {docEntry.examples && (
                <div className="border-t border-slate-200 pt-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    Exemples
                  </h3>
                  <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    {docEntry.examples}
                  </pre>
                </div>
              )}

              {/* Related */}
              {docEntry.related && docEntry.related.length > 0 && (
                <div className="border-t border-slate-200 pt-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    Voir aussi
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {docEntry.related.map(rel => (
                      <button
                        key={rel}
                        className="px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 rounded text-sm hover:bg-blue-100 transition-colors"
                      >
                        {rel}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {!loading && !error && !docEntry && (
            <div className="text-center py-12 text-slate-500">
              Aucune documentation disponible
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
