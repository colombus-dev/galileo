import React, { useState, useCallback, useEffect } from 'react';
import { NavBar } from '@/components/NavBar';
import { NotebookWorkspaceLayout } from '@/components/storytelling/NotebookWorkspaceLayout';
import { SummarySidebar } from '@/components/storytelling/SummarySidebar';
import { SectionSummaryView } from '@/components/storytelling/SectionSummaryView';
import { CodePanel } from '@/components/storytelling/CodePanel';
import { DocSidePanel } from '@/components/storytelling/DocSidePanel';
import { NotebookImporter } from '@/components/NotebookImporter';
import { fetchNotebookMock, fetchDocMock } from '@/mocks/mockApi';
import type { NotebookModel, Token, DocEntry } from '@/types/notebook';

export interface NotebookWorkspacePageProps {
  initialNotebookId?: string;
  logoUrl?: string;
}

/**
 * Page orchestratrice du scénario complet de notebook workspace
 * Gère :
 * - Import du notebook
 * - Sélection de section
 * - Affichage du code
 * - Interaction avec tokens
 * - Affichage de la documentation
 */
export const NotebookWorkspacePage: React.FC<NotebookWorkspacePageProps> = ({
  initialNotebookId,
  logoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwt1HL9fRcwfyF4lzGkCREKMmUv7OVyYGftYlNCNxNuENKpOCJZNxywAsv3fYra7N7uUP1&s=10",
}) => {
  // État notebook
  const [notebook, setNotebook] = useState<NotebookModel | null>(null);
  const [notebookLoading, setNotebookLoading] = useState(false);
  const [notebookError, setNotebookError] = useState<string | null>(null);

  // État section active
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  // État code panel
  const [codeCollapsed, setCodeCollapsed] = useState(false);

  // État doc panel
  const [docState, setDocState] = useState<{
    isOpen: boolean;
    loading: boolean;
    error: string | null;
    docEntry: DocEntry | null;
    selectedToken: Token | null;
  }>({
    isOpen: false,
    loading: false,
    error: null,
    docEntry: null,
    selectedToken: null,
  });

  // Charge le notebook initial si fourni
  useEffect(() => {
    if (initialNotebookId) {
      handleLoadNotebook(initialNotebookId);
    }
  }, [initialNotebookId]);

  // Initialise la première section quand un notebook est chargé
  useEffect(() => {
    if (notebook && !activeSectionId && notebook.sections.length > 0) {
      setActiveSectionId(notebook.sections[0].id);
    }
  }, [notebook, activeSectionId]);

  const handleLoadNotebook = useCallback(async (notebookId: string) => {
    setNotebookLoading(true);
    setNotebookError(null);

    try {
      const response = await fetchNotebookMock(notebookId);
      if (response.status === 'success' && response.notebook) {
        setNotebook(response.notebook);
        setActiveSectionId(null);
        setDocState((prev) => ({ ...prev, isOpen: false }));
      } else {
        setNotebookError(response.message || 'Erreur de chargement du notebook');
      }
    } catch (error) {
      setNotebookError('Erreur lors du chargement du notebook');
      console.error(error);
    } finally {
      setNotebookLoading(false);
    }
  }, []);

  const handleImportNotebook = useCallback(async (_payload: any) => {
    // Simule l'import : on charge le mock notebook iris
    console.log('Import triggered, loading notebook...');
    await handleLoadNotebook('notebook-iris-1');
  }, [handleLoadNotebook]);

  const handleSelectSection = useCallback((sectionId: string) => {
    setActiveSectionId(sectionId);
    setCodeCollapsed(false);
  }, []);

  const handleTokenClick = useCallback(async (token: Token) => {
    setDocState((prev) => ({
      ...prev,
      isOpen: true,
      loading: true,
      error: null,
      selectedToken: token,
    }));

    try {
      const response = await fetchDocMock(token.docKey);
      setDocState((prev) => ({
        ...prev,
        loading: false,
        docEntry: response.doc,
      }));
    } catch (error) {
      setDocState((prev) => ({
        ...prev,
        loading: false,
        error: 'Erreur lors du chargement de la documentation',
      }));
      console.error(error);
    }
  }, []);

  const handleCloseDoc = useCallback(() => {
    setDocState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  const activeSection = notebook
    ?.sections.find((s) => s.id === activeSectionId);

  // État : Avant import
  if (!notebook) {
    return (
      <>
        <NavBar
          logoUrl={logoUrl}
          title="Galileo - Storytelling"
        >
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            <a href="/storytelling">Storytelling</a>
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            <a href="/artefact">Artefact</a>
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            <a href="/patterns">Patterns</a>
          </button>
        </NavBar>
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="w-full max-w-md px-4">
            <NotebookImporter
              label="Importer un notebook"
              helperText="Sélectionnez un fichier .ipynb pour commencer. Pour la démo, un notebook Iris sera chargé."
              onConfirm={handleImportNotebook}
              showPreview={true}
            />
            {notebookError && (
              <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-800">{notebookError}</p>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  // État : Notebook chargé
  return (
    <>
      <NavBar
        logoUrl={logoUrl}
        title="Galileo - Storytelling"
      >
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          <a href="/storytelling">Storytelling</a>
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          <a href="/artefact">Artefact</a>
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          <a href="/patterns">Patterns</a>
        </button>
      </NavBar>
      <NotebookWorkspaceLayout
        sidebar={
          <SummarySidebar
            notebook={notebook}
            activeSection={activeSectionId}
            onSelectSection={handleSelectSection}
          />
        }
        main={
          activeSection ? (
            <div className="space-y-8">
              <SectionSummaryView
                notebook={notebook}
                section={activeSection}
              />
              <CodePanel
                notebook={notebook}
                section={activeSection}
                collapsed={codeCollapsed}
                onToggleCollapsed={setCodeCollapsed}
                onTokenClick={handleTokenClick}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-slate-600">Sélectionnez une section</p>
            </div>
          )
        }
        docPanel={
          docState.isOpen && (
            <DocSidePanel
              docEntry={docState.docEntry}
              loading={docState.loading}
              error={docState.error}
              onClose={handleCloseDoc}
            />
          )
        }
      />
    </>
  );
};
