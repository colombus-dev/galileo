import { useState, useCallback } from 'react';
import { completeMockDocs } from '@/services/completeDocsMock';
import { normalizeDocKey, getDocKeyVariants } from '@/utils/docKeyMapper';
import { fetchDocMock } from '@/mocks/mockApi';
import type { DocEntry } from '@/types/notebook';

export interface UseCodeDocumentationState {
  isDocModalOpen: boolean;
  selectedDocKey: string | null;
  docEntry: DocEntry | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook pour gérer la documentation des tokens dans CodeViewer
 * Utilise un modal autonome pour afficher la doc
 */
export const useCodeDocumentation = () => {
  const [state, setState] = useState<UseCodeDocumentationState>({
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
      // Normaliser la clé
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
        setState(prev => ({
          ...prev,
          loading: false,
          docEntry,
        }));
      } else {
        // Fallback API
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
