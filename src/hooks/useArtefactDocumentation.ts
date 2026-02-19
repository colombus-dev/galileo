import { useState, useCallback } from 'react';
import { completeMockDocs } from '@/services/completeDocsMock';
import { normalizeDocKey, getDocKeyVariants } from '@/utils/docKeyMapper';
import { fetchDocMock } from '@/mocks/mockApi';
import type { DocEntry } from '@/types/notebook';

export interface UseArtefactDocumentationState {
  isDocModalOpen: boolean;
  selectedDocKey: string | null;
  docEntry: DocEntry | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook pour gérer la documentation interactive dans les artefacts
 * Réutilisable dans tous les composants affichant du code
 */
export const useArtefactDocumentation = () => {
  const [state, setState] = useState<UseArtefactDocumentationState>({
    isDocModalOpen: false,
    selectedDocKey: null,
    docEntry: null,
    loading: false,
    error: null,
  });

  const handleDocKeyClick = useCallback(async (docKey: string) => {
    setState(prev => ({
      ...prev,
      isDocModalOpen: true,
      loading: true,
      error: null,
      selectedDocKey: docKey,
    }));

    try {
      const normalized = normalizeDocKey(docKey);
      const variants = getDocKeyVariants(normalized);
      
      let docEntry: DocEntry | undefined;
      for (const variant of variants) {
        if (completeMockDocs[variant]) {
          docEntry = completeMockDocs[variant];
          break;
        }
      }

      if (docEntry) {
        setState(prev => ({
          ...prev,
          loading: false,
          docEntry,
        }));
      } else {
        const response = await fetchDocMock(normalized);
        setState(prev => ({
          ...prev,
          loading: false,
          docEntry: response.doc,
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Erreur de chargement de la documentation',
      }));
      console.error(error);
    }
  }, []);

  const closeDocModal = useCallback(() => {
    setState(prev => ({
      ...prev,
      isDocModalOpen: false,
    }));
  }, []);

  return {
    ...state,
    handleDocKeyClick,
    closeDocModal,
  };
};
