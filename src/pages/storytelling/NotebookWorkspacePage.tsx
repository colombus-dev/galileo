import React, { useCallback, useState } from 'react';
import { NavBar } from '@/components/NavBar';
import { NotebookImporter } from '@/components/NotebookImporter';
import { useNotebookImport } from '@/hooks/useNotebookImport';

export interface NotebookWorkspacePageProps {
  logoUrl?: string;
  onImportSuccess?: (notebookId: string) => void;
}

/**
 * Page d'import du notebook pour le storytelling
 * Permet à l'utilisateur de :
 * - Importer un notebook .ipynb réel
 * - Importer une configuration pyproject.toml (optionnel)
 * - Traiter les fichiers et générer sections + tokens
 * - Déclencher le callback onImportSuccess après import réussi
 */
export const NotebookWorkspacePage: React.FC<NotebookWorkspacePageProps> = ({
  logoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwt1HL9fRcwfyF4lzGkCREKMmUv7OVyYGftYlNCNxNuENKpOCJZNxywAsv3fYra7N7uUP1&s=10",
  onImportSuccess,
}) => {
  const [importError, setImportError] = useState<string | null>(null);
  const { importNotebook, loading } = useNotebookImport({
    onSuccess: (notebook) => {
      console.log('✅ Notebook importé et traité:', notebook);
      setImportError(null);
      // Passer l'ID du notebook au callback
      onImportSuccess?.(notebook.id);
    },
    onError: (error) => {
      console.error('❌ Erreur lors de l\'import:', error);
      setImportError(error.message);
    },
  });

  const handleImportNotebook = useCallback(
    async (payload: {
      notebookFile: File;
      notebook: any;
      pyprojectFile: File | null;
      dependencies: any;
    }) => {
      console.log('📥 Import triggered - Traitement du fichier réel...');
      await importNotebook(payload.notebookFile, payload.pyprojectFile);
    },
    [importNotebook]
  );

  return (
    <>
      <NavBar
        logoUrl={logoUrl}
        title="Galileo - Import Notebook"
      >
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          <a href="/artefact">Artefact</a>
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          <a href="/patterns">Patterns</a>
        </button>
      </NavBar>
      <div className="w-full h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 to-slate-100">
        <NotebookImporter
          label="Importer un notebook Jupyter (.ipynb)"
          helperText="Glisse-dépose un notebook .ipynb ou clique pour parcourir. Les sections sont détectées automatiquement à partir des titres markdown."
          onImport={handleImportNotebook}
          showPreview={true}
          disabled={loading}
        />
        {importError && (
          <div className="fixed bottom-4 right-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-lg">
            ❌ {importError}
          </div>
        )}
        {loading && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <p className="text-slate-600">Traitement du notebook...</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
