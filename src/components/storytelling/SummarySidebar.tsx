import React, { useMemo } from 'react';
import { MdBook, MdCode } from 'react-icons/md';
import type { NotebookModel } from '@/types/notebook';

export interface SummarySidebarProps {
  notebook: NotebookModel;
  activeSection?: string;
  onSelectSection?: (sectionId: string) => void;
  className?: string;
}

/**
 * Barre latérale affichant la liste des sections du notebook
 * Permet la sélection et affiche l'état actif
 */
export const SummarySidebar: React.FC<SummarySidebarProps> = ({
  notebook,
  activeSection,
  onSelectSection,
  className = '',
}) => {
  const sortedSections = useMemo(
    () => [...notebook.sections].sort((a, b) => a.order - b.order),
    [notebook.sections]
  );

  const getMarkdownCellCount = (sectionId: string) => {
    const section = notebook.sections.find((s) => s.id === sectionId);
    if (!section) return 0;
    return notebook.cells.filter((c) => section.cellIds.includes(c.id) && c.type === 'markdown')
      .length;
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-2">
          <MdBook className="text-xl text-slate-600" />
          <h2 className="text-lg font-bold text-slate-900">{notebook.name}</h2>
        </div>
        {notebook.description && (
          <p className="text-xs text-slate-500 line-clamp-2">{notebook.description}</p>
        )}
      </div>

      {/* Sections list */}
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-2">
          {sortedSections.map((section) => {
            const isActive = activeSection === section.id;
            const markdownCount = getMarkdownCellCount(section.id);

            return (
              <li key={section.id}>
                <button
                  onClick={() => onSelectSection?.(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 border border-blue-200 shadow-sm'
                      : 'hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-sm font-medium truncate ${
                          isActive ? 'text-blue-900' : 'text-slate-900'
                        }`}
                      >
                        {section.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-1">
                        {section.cellIds.length} cellules
                      </p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {markdownCount > 0 ? (
                        <div
                          title={`${markdownCount} markdown`}
                          className="flex items-center gap-1 px-2 py-1 rounded bg-green-50 border border-green-200"
                        >
                          <span className="text-xs font-medium text-green-700">✓</span>
                        </div>
                      ) : (
                        <div
                          title="Code only"
                          className="flex items-center gap-1 px-2 py-1 rounded bg-amber-50 border border-amber-200"
                        >
                          <MdCode className="text-xs text-amber-600" />
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer meta */}
      <div className="border-t border-slate-200 p-4 text-xs text-slate-500">
        <div>Créé par: {notebook.createdBy}</div>
        <div className="text-slate-400">
          {new Date(notebook.createdAt).toLocaleDateString('fr-FR')}
        </div>
      </div>
    </div>
  );
};
