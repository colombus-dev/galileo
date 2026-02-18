import { useNavigate } from 'react-router-dom';
import { StorytellingWorkspace } from '@/pages/storytelling/StorytellingWorkspace';

/**
 * Page wrapper pour la route /storytelling/workspace
 * Enveloppe StorytellingWorkspace dans un contexte Router valide
 */
export default function StorytellingWorkspacePage() {
  const navigate = useNavigate();

  const handleBackToImport = () => {
    navigate('/storytelling');
  };

  return <StorytellingWorkspace onBackToImport={handleBackToImport} />;
}
