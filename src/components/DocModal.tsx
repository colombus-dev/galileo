import React, { useRef, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import type { DocEntry } from '@/types/notebook';

export interface DocModalProps {
  isOpen: boolean;
  docEntry: DocEntry | null;
  loading?: boolean;
  error?: string | null;
  onClose: () => void;
  showBackdrop?: boolean;
  sidePanel?: boolean;
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
  showBackdrop = true,
  sidePanel = false,
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
    if (showBackdrop && modalRef.current && e.target === modalRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  // Mode side panel : affiche comme une barre latérale glissante
  if (sidePanel) {
    return (
      <div
        className={`fixed inset-0 z-[10000] pointer-events-none transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Overlay léger pour séparation */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-5 backdrop-blur-sm pointer-events-auto cursor-default transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={onClose}
        />
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl overflow-y-auto pointer-events-auto transform transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50 sticky top-0 z-10">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-900">
                {docEntry?.title || 'Documentation'}
              </h2>
              <div className="flex items-center justify-between mt-2">
                <div>
                  {docEntry?.version && (
                    <p className="text-xs text-slate-500">
                      Version {docEntry.version}
                    </p>
                  )}
                </div>
                <p className="text-xs text-slate-400 ml-2 flex-shrink-0">
                  Appuyez sur <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-slate-700 font-mono">Esc</kbd>
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0 ml-2"
              aria-label="Fermer"
            >
              <MdClose className="text-xl text-slate-600" />
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
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
              <div className="space-y-8">
                {/* Content */}
                <div className="prose prose-sm max-w-none">
                  <div
                    className="whitespace-pre-wrap text-slate-700 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: docEntry.content
                        .split('\n')
                        .map(line => {
                          if (line.startsWith('# ')) {
                            return `<h1 class="text-xl font-bold mt-6 mb-3 text-slate-900">${line.slice(2)}</h1>`;
                          }
                          if (line.startsWith('## ')) {
                            return `<h2 class="text-lg font-semibold mt-5 mb-2 text-slate-800">${line.slice(3)}</h2>`;
                          }
                          if (line.startsWith('### ')) {
                            return `<h3 class="text-base font-semibold mt-4 mb-2 text-slate-800">${line.slice(4)}</h3>`;
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
                  <div className="border-t border-slate-200 pt-8">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      Exemples
                    </h3>
                    <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                      {docEntry.examples}
                    </pre>
                  </div>
                )}

                {/* Related */}
                {docEntry.related && docEntry.related.length > 0 && (
                  <div className="border-t border-slate-200 pt-8">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
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
  }

  // Mode modal standard (centré)
  return (
    <div
      ref={modalRef}
      onClick={handleBackdropClick}
      className={`fixed inset-0 flex items-center justify-center z-[10000] p-4 ${
        showBackdrop
          ? 'bg-black bg-opacity-85 backdrop-blur-lg'
          : 'bg-transparent pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col z-[10001] pointer-events-auto ring-1 ring-black ring-opacity-5">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {docEntry?.title || 'Documentation'}
            </h2>
            {docEntry?.version && (
              <p className="text-xs text-slate-500 mt-2">
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
        <div className="overflow-y-auto flex-1 p-8">
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
            <div className="space-y-8">
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
                          return `<h1 class="text-xl font-bold mt-6 mb-3 text-slate-900">${line.slice(2)}</h1>`;
                        }
                        if (line.startsWith('## ')) {
                          return `<h2 class="text-lg font-semibold mt-5 mb-2 text-slate-800">${line.slice(3)}</h2>`;
                        }
                        if (line.startsWith('### ')) {
                          return `<h3 class="text-base font-semibold mt-4 mb-2 text-slate-800">${line.slice(4)}</h3>`;
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
                <div className="border-t border-slate-200 pt-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    Exemples
                  </h3>
                  <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    {docEntry.examples}
                  </pre>
                </div>
              )}

              {/* Related */}
              {docEntry.related && docEntry.related.length > 0 && (
                <div className="border-t border-slate-200 pt-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
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
