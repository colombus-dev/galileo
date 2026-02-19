import type { NotebookModel, DocEntry } from '@/types/notebook';
import { mockDocs, mockDocNotFound } from './docs.mock';
import { mockNotebookIris, mockNotebookSimple } from './notebook.mock';
import { getDocumentation } from '@/services/completeDocsMock';

/**
 * Service API Mock pour simuler les appels réseau
 */

export interface UploadNotebookResponse {
  notebookId: string;
  status: 'success' | 'error';
  message?: string;
}

export interface FetchNotebookResponse {
  notebook: NotebookModel | null;
  status: 'success' | 'error';
  message?: string;
}

export interface FetchDocResponse {
  doc: DocEntry;
  status: 'success' | 'error';
  message?: string;
}

/**
 * Récupère la documentation pour une clé donnée
 * Cherche d'abord dans completeDocsMock, puis dans mockDocs
 * @param docKey Clé de doc (ex: 'pandas.read_csv')
 * @returns DocEntry ou entrée "not found"
 */
export function getTokenDocumentation(docKey: string): DocEntry | null {
  // Essayer d'abord les docs complets
  const completeDoc = getDocumentation(docKey);
  if (completeDoc) {
    return completeDoc;
  }

  // Fallback aux mocks
  return mockDocs[docKey] ?? null;
}

/**
 * Simule l'upload d'un notebook
 * @param file Fichier .ipynb
 * @returns notebookId généré
 */
export async function uploadNotebookMock(file: File): Promise<UploadNotebookResponse> {
  return new Promise((resolve) => {
    // Délai simulé (500-1500ms)
    const delay = Math.random() * 1000 + 500;
    setTimeout(() => {
      // Simule un succès (90%) ou erreur (10%)
      if (Math.random() > 0.1) {
        const notebookId = `notebook-${Date.now()}`;
        resolve({
          notebookId,
          status: 'success',
          message: `Notebook '${file.name}' importé avec succès`,
        });
      } else {
        resolve({
          notebookId: '',
          status: 'error',
          message: 'Échec de l\'importation du notebook. Vérifiez le format.',
        });
      }
    }, delay);
  });
}

/**
 * Simule la récupération d'un notebook
 * @param notebookId ID du notebook
 * @returns NotebookModel ou erreur
 */
export async function fetchNotebookMock(notebookId: string): Promise<FetchNotebookResponse> {
  return new Promise((resolve) => {
    // Délai simulé (300-800ms)
    const delay = Math.random() * 500 + 300;
    setTimeout(() => {
      const notebookMap: Record<string, NotebookModel> = {
        'notebook-iris-1': mockNotebookIris,
        'notebook-simple-1': mockNotebookSimple,
      };

      const notebook = notebookMap[notebookId];

      if (notebook) {
        resolve({
          notebook,
          status: 'success',
        });
      } else {
        resolve({
          notebook: null,
          status: 'error',
          message: `Notebook '${notebookId}' non trouvé`,
        });
      }
    }, delay);
  });
}

/**
 * Simule la récupération d'une documentation
 * @param docKey Clé de doc (ex: 'pandas.read_csv')
 * @returns DocEntry ou entrée "not found"
 */
export async function fetchDocMock(docKey: string): Promise<FetchDocResponse> {
  return new Promise((resolve) => {
    // Délai simulé (200-600ms)
    const delay = Math.random() * 400 + 200;
    setTimeout(() => {
      const doc = getTokenDocumentation(docKey) ?? mockDocNotFound;
      resolve({
        doc,
        status: 'success',
      });
    }, delay);
  });
}
