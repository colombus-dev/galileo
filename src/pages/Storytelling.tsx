import { useNavigate } from 'react-router-dom';
import { NotebookWorkspacePage } from '@/pages/storytelling/NotebookWorkspacePage';

/**
 * Page exemple : Notebook Workspace Storytelling
 * 
 * Démontre le scénario complet :
 * 1. Import du notebook
 * 2. Affichage des sections résumées
 * 3. Sélection de section
 * 4. Affichage du code
 * 5. Clic sur tokens
 * 6. Affichage de la documentation
 */
export default function Storytelling() {
  const navigate = useNavigate();

  const handleImportSuccess = () => {
    // Navigation vers le workspace après import
    navigate('/storytelling/workspace');
  };

  return <NotebookWorkspacePage onImportSuccess={handleImportSuccess} />;
}
