import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { NavBar } from '@/components/NavBar';
import { NotebookWorkspaceLayout } from '@/components/storytelling/NotebookWorkspaceLayout';
import { SummarySidebar } from '@/components/storytelling/SummarySidebar';
import { SectionSummaryView } from '@/components/storytelling/SectionSummaryView';
import { CodePanel } from '@/components/storytelling/CodePanel';
import { DocSidePanel } from '@/components/storytelling/DocSidePanel';
import { fetchNotebookMock, fetchDocMock, getTokenDocumentation } from '@/mocks/mockApi';
import { completeMockDocs } from '@/services/completeDocsMock';
import { normalizeDocKey, getDocKeyVariants } from '@/utils/docKeyMapper';
import type { NotebookModel, Token, DocEntry } from '@/types/notebook';

export interface StorytellingWorkspaceProps {
  initialNotebook?: NotebookModel | null;
  initialNotebookId?: string;
  logoUrl?: string;
  onBackToImport?: () => void;
}

/**
 * Page workspace du storytelling
 * Affiche le notebook importé avec :
 * - Sélection de section
 * - Affichage du code
 * - Interaction avec tokens
 * - Affichage de la documentation
 */
export const StorytellingWorkspace: React.FC<StorytellingWorkspaceProps> = ({
  initialNotebook = null,
  initialNotebookId = 'notebook-iris-1',
  logoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwt1HL9fRcwfyF4lzGkCREKMmUv7OVyYGftYlNCNxNuENKpOCJZNxywAsv3fYra7N7uUP1&s=10",
  onBackToImport,
}) => {
  const navigate = useNavigate();

  // État notebook
  const [notebook, setNotebook] = useState<NotebookModel | null>(initialNotebook);

  // État section active
  const [activeSectionId, setActiveSectionId] = useState<string | undefined>(undefined);

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

  // Charge le notebook au montage
  useEffect(() => {
    // Si initialNotebook est fourni, l'utiliser directement
    if (initialNotebook) {
      setNotebook(initialNotebook);
      setActiveSectionId(undefined);
      return;
    }

    // Sinon, charger depuis les mocks (fallback)
    const loadNotebook = async () => {
      try {
        const response = await fetchNotebookMock(initialNotebookId);
        if (response.status === 'success' && response.notebook) {
          setNotebook(response.notebook);
          setActiveSectionId(undefined);
        }
      } catch (error) {
        console.error(error);
      }
    };

    void loadNotebook();
  }, [initialNotebook, initialNotebookId]);

  const handleBackToImport = useCallback(() => {
    // Retour à l'import - utilise le callback si disponible, sinon navigue
    if (onBackToImport) {
      onBackToImport();
    } else {
      navigate('/storytelling');
    }
  }, [navigate, onBackToImport]);

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
      // Essayer d'obtenir la documentation depuis nos services
      const doc = getTokenDocumentation(token.docKey);
      if (doc) {
        setDocState((prev) => ({
          ...prev,
          loading: false,
          docEntry: doc,
        }));
      } else {
        // Fallback aux mocks si pas trouvé
        const response = await fetchDocMock(token.docKey);
        setDocState((prev) => ({
          ...prev,
          loading: false,
          docEntry: response.doc,
        }));
      }
    } catch (error) {
      setDocState((prev) => ({
        ...prev,
        loading: false,
        error: 'Erreur de chargement de la documentation',
      }));
      console.error(error);
    }
  }, []);

  const handleDocKeyClick = useCallback(async (docKey: string) => {
    setDocState((prev) => ({
      ...prev,
      isOpen: true,
      loading: true,
      error: null,
      selectedToken: null,
    }));

    try {
      // Normaliser la clé pour chercher dans la doc
      const normalized = normalizeDocKey(docKey);
      const variants = getDocKeyVariants(normalized);
      
      // Chercher dans completeMockDocs
      let docEntry: DocEntry | undefined;
      for (const variant of variants) {
        if (completeMockDocs[variant]) {
          docEntry = completeMockDocs[variant];
          break;
        }
      }

      if (docEntry) {
        setDocState((prev) => ({
          ...prev,
          loading: false,
          docEntry,
        }));
      } else {
        // Fallback aux mocks API
        const response = await fetchDocMock(normalized);
        setDocState((prev) => ({
          ...prev,
          loading: false,
          docEntry: response.doc,
        }));
      }
    } catch (error) {
      setDocState((prev) => ({
        ...prev,
        loading: false,
        error: 'Erreur de chargement de la documentation',
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

  const activeSection = notebook?.sections.find((s) => s.id === activeSectionId);

  // État : Notebook en cours de chargement
  if (!notebook) {
    return (
      <>
        <NavBar
          logoUrl={logoUrl}
          title="Galileo - Workspace"
        >
          <button
            onClick={handleBackToImport}
            className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 transition"
          >
            ← Retour à l'import
          </button>
        </NavBar>
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center">
            <p className="text-slate-600 mb-2">Chargement du notebook...</p>
          </div>
        </div>
      </>
    );
  }

  // État : Notebook chargé - Affiche le workspace
  return (
    <>
      <NavBar
        logoUrl={logoUrl}
        title="Galileo - Storytelling"
      >
        <button
          type="button"
          onClick={handleBackToImport}
          className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 transition"
        >
          ← Retour à l'import
        </button>
		<button
			type="button"
			onClick={() => navigate('/storytelling')}
			className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
		>
			Storytelling
		</button>
		<button
			type="button"
			onClick={() => navigate('/artefact')}
			className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
		>
			Artefact
		</button>
		<button
			type="button"
			onClick={() => navigate('/patterns')}
			className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
		>
			Patterns
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
            <div className="w-full space-y-8 p-6">
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
                onDocKeyClick={handleDocKeyClick}
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
