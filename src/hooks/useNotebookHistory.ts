import { useCallback, useEffect, useState } from "react";

export interface StoredNotebook {
  id: string;
  name: string;
  timestamp: number;
  notebook: Record<string, unknown>;
  pyprojectContent?: string;
  dependencies?: any;
}

const STORAGE_KEY = "galileo_notebook_history";
const CURRENT_KEY = "galileo_current_notebook";
const MAX_NOTEBOOKS = 10;

function normalizeImportedNotebookId(filename: string): string {
  const trimmed = filename.trim();
  const base = trimmed.split(/[/\\]/).pop() ?? trimmed;
  const lowered = base.toLowerCase();
  return lowered.endsWith(".ipynb") ? lowered : `${lowered}.ipynb`;
}

export function useNotebookHistory() {
  const [notebooks, setNotebooks] = useState<StoredNotebook[]>([]);
  const [currentNotebook, setCurrentNotebook] = useState<StoredNotebook | null>(
    null
  );
  const [isLoaded, setIsLoaded] = useState(false);

  // Charger l'historique au montage
  useEffect(() => {
    const loadHistory = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const current = localStorage.getItem(CURRENT_KEY);

        if (stored) {
          const parsed = JSON.parse(stored) as StoredNotebook[];
          setNotebooks(parsed);
        }

        if (current) {
          const parsed = JSON.parse(current) as StoredNotebook;
          setCurrentNotebook(parsed);
        }
      } catch (error) {
        console.error("Erreur chargement notebook history:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadHistory();
  }, []);

  const addNotebook = useCallback(
    (notebook: Record<string, unknown>, filename: string, dependencies?: any) => {
      const newEntry: StoredNotebook = {
        id: normalizeImportedNotebookId(filename),
        name: filename,
        timestamp: Date.now(),
        notebook,
        dependencies,
      };

      setNotebooks((prev) => {
        const updated = [newEntry, ...prev.filter((nb) => nb.id !== newEntry.id)].slice(0, MAX_NOTEBOOKS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });

      setCurrentNotebook(newEntry);
      localStorage.setItem(CURRENT_KEY, JSON.stringify(newEntry));

      return newEntry;
    },
    []
  );

  const setCurrentFromHistory = useCallback((id: string) => {
    const found = notebooks.find((nb) => nb.id === id);
    if (found) {
      setCurrentNotebook(found);
      localStorage.setItem(CURRENT_KEY, JSON.stringify(found));
      return found;
    }
    return null;
  }, [notebooks]);

  const removeNotebook = useCallback((id: string) => {
    setNotebooks((prev) => {
      const updated = prev.filter((nb) => nb.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    if (currentNotebook?.id === id) {
      setCurrentNotebook(null);
      localStorage.removeItem(CURRENT_KEY);
    }
  }, [currentNotebook?.id]);

  const clearHistory = useCallback(() => {
    setNotebooks([]);
    setCurrentNotebook(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(CURRENT_KEY);
  }, []);

  const resetCurrent = useCallback(() => {
    setCurrentNotebook(null);
    localStorage.removeItem(CURRENT_KEY);
  }, []);

  return {
    notebooks,
    currentNotebook,
    isLoaded,
    addNotebook,
    setCurrentFromHistory,
    removeNotebook,
    clearHistory,
    resetCurrent,
  };
}
