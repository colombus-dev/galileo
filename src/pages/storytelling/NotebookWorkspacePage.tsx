import React, { useCallback } from 'react';
import { NavBar } from '@/components/NavBar';
import { NotebookImporter } from '@/components/NotebookImporter';

export interface NotebookWorkspacePageProps {
  logoUrl?: string;
  onImportSuccess?: () => void;
}

/**
 * Page d'import du notebook pour le storytelling
 * Permet à l'utilisateur de :
 * - Importer un notebook .ipynb
 * - Importer une configuration pyproject.toml
 * - Déclencher le callback onImportSuccess après import réussi
 */
export const NotebookWorkspacePage: React.FC<NotebookWorkspacePageProps> = ({
  logoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwt1HL9fRcwfyF4lzGkCREKMmUv7OVyYGftYlNCNxNuENKpOCJZNxywAsv3fYra7N7uUP1&s=10",
  onImportSuccess,
}) => {
  const handleImportNotebook = useCallback(async (_payload: any) => {
    // Simule l'import : on charge le mock notebook iris
    console.log('Import triggered, import successful!');
    // Déclenche le callback pour la navigation
    onImportSuccess?.();
  }, [onImportSuccess]);

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
          label="Importer un notebook"
          helperText="Sélectionnez un fichier .ipynb pour commencer. Pour la démo, un notebook Iris sera chargé."
          onImport={handleImportNotebook}
          showPreview={true}
        />
      </div>
    </>
  );
};
