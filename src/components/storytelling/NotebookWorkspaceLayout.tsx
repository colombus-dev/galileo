import React from 'react';

export interface NotebookWorkspaceLayoutProps {
  sidebar: React.ReactNode;
  main: React.ReactNode;
  docPanel?: React.ReactNode;
  className?: string;
}

/**
 * Layout 3-colonnes responsive pour le workspace du notebook
 * - Sidebar à gauche (sections)
 * - Contenu principal au centre (résumé + code)
 * - Panneau doc à droite (optionnel)
 */
export const NotebookWorkspaceLayout: React.FC<NotebookWorkspaceLayoutProps> = ({
  sidebar,
  main,
  docPanel,
  className = '',
}) => {
  return (
    <div className={`flex flex-1 h-[calc(100vh-80px)] w-full overflow-hidden bg-slate-50 ${className}`}>
      {/* Sidebar gauche */}
      <aside className="w-80 border-r border-slate-200 bg-white overflow-y-auto shadow-sm">
        {sidebar}
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 w-full overflow-y-auto">
        <div className="w-full h-full">
          {main}
        </div>
      </main>

      {/* Panneau doc à droite (optionnel) */}
      {docPanel && (
        <aside className="w-96 border-l border-slate-200 bg-white overflow-y-auto shadow-sm">
          {docPanel}
        </aside>
      )}
    </div>
  );
};
