import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { StorytellingWorkspace } from '@/pages/storytelling/StorytellingWorkspace';
import { getCachedNotebook } from '@/services/notebookProcessor';
import type { NotebookModel } from '@/types/notebook';

/**
 * Page wrapper pour la route /storytelling/workspace
 * Enveloppe StorytellingWorkspace dans un contexte Router valide
 * Récupère les données du notebook importé depuis le cache
 */
export default function StorytellingWorkspacePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [notebook, setNotebook] = useState<NotebookModel | null>(null);
  const [loading, setLoading] = useState(true);

  const notebookId = searchParams.get('notebookId');

  useEffect(() => {
    if (notebookId) {
      // Récupérer le notebook du cache
      const cached = getCachedNotebook(notebookId);
      if (cached) {
        setNotebook(cached.notebookModel);
      }
    }
    setLoading(false);
  }, [notebookId]);

  const handleBackToImport = () => {
    navigate('/storytelling');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-slate-600">Chargement...</p>
      </div>
    );
  }

  if (!notebook && notebookId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">❌ Notebook non trouvé en cache</p>
          <button
            onClick={handleBackToImport}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retour à l'import
          </button>
        </div>
      </div>
    );
  }

  return (
    <StorytellingWorkspace
      initialNotebook={notebook}
      onBackToImport={handleBackToImport}
    />
  );
}
