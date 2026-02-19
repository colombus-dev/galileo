/**
 * Hook React custom pour gérer l'import de notebooks
 * Traite les fichiers et génère un NotebookModel utilisable
 */

import { useCallback, useState } from 'react';
import type { NotebookModel } from '@/types/notebook';
import { processImportedNotebook, cacheImportedNotebook } from '@/services/notebookProcessor';

export interface UseNotebookImportOptions {
  onSuccess?: (notebook: NotebookModel) => void;
  onError?: (error: Error) => void;
}

export interface UseNotebookImportState {
  notebook: NotebookModel | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Hook pour importer et traiter un notebook
 */
export function useNotebookImport(
  options: UseNotebookImportOptions = {}
): UseNotebookImportState & {
  importNotebook: (notebookFile: File, pyprojectFile?: File | null) => Promise<void>;
  reset: () => void;
} {
  const [state, setState] = useState<UseNotebookImportState>({
    notebook: null,
    loading: false,
    error: null,
  });

  const importNotebook = useCallback(
    async (notebookFile: File, pyprojectFile: File | null = null) => {
      setState({
        notebook: null,
        loading: true,
        error: null,
      });

      try {
        const result = await processImportedNotebook(
          notebookFile,
          pyprojectFile,
          'User Import'
        );

        // Cache les données
        cacheImportedNotebook(result.notebookModel.id, result);

        setState({
          notebook: result.notebookModel,
          loading: false,
          error: null,
        });

        options.onSuccess?.(result.notebookModel);
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));

        setState({
          notebook: null,
          loading: false,
          error: err,
        });

        options.onError?.(err);
      }
    },
    [options]
  );

  const reset = useCallback(() => {
    setState({
      notebook: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    importNotebook,
    reset,
  };
}
