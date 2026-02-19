import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { NotebookWorkspacePage } from '@/pages/storytelling/NotebookWorkspacePage';

/**
 * Page exemple : Notebook Workspace Storytelling
 * 
 * Démontre le scénario complet :
 * 1. Import du notebook réel
 * 2. Détection automatique des sections via titres markdown
 * 3. Extraction des tokens documentables
 * 4. Affichage des sections résumées
 * 5. Sélection de section et affichage du code
 * 6. Clic sur tokens pour documentation
 */
export default function Storytelling() {
  const navigate = useNavigate();

  const handleImportSuccess = useCallback((notebookId: string) => {
    // Navigation vers le workspace après import
    navigate(`/storytelling/workspace?notebookId=${notebookId}`);
  }, [navigate]);

  return <NotebookWorkspacePage onImportSuccess={handleImportSuccess} />;
}
