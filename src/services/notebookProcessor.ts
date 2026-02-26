/**
 * Service orchestrateur pour traiter les fichiers importés
 * Convertit les fichiers bruts en NotebookModel avec tous les tokens
 */

import type { NotebookModel } from '@/types/notebook';
import { parseJupyterNotebook, type RawNotebookJson } from './notebookParser';
import { getDocumentation } from './completeDocsMock';

export interface ProcessedImportData {
  notebookModel: NotebookModel;
  originalFile: File;
  pyprojectFile: File | null;
}

/**
 * Traite les fichiers importés (notebook + optionnel pyproject)
 * Retourne un NotebookModel complètement traité avec sections et tokens
 */
export async function processImportedNotebook(
  notebookFile: File,
  pyprojectFile: File | null,
  createdBy: string = 'Imported'
): Promise<ProcessedImportData> {
  // 1. Lire et parser le notebook
  const notebookContent = await notebookFile.text();
  let rawNotebook: RawNotebookJson;

  try {
    rawNotebook = JSON.parse(notebookContent);
  } catch (error) {
    throw new Error(
      `Impossible de parser le notebook: ${error instanceof Error ? error.message : 'JSON invalide'}`
    );
  }

  // 2. Convertir en NotebookModel
  const notebookModel = parseJupyterNotebook(
    rawNotebook,
    notebookFile.name,
    createdBy
  );

  return {
    notebookModel,
    originalFile: notebookFile,
    pyprojectFile,
  };
}

/**
 * Vérifie si une documentation existe pour un token
 */
export function hasDocumentation(docKey: string): boolean {
  return !!getDocumentation(docKey);
}

/**
 * Récupère la documentation complète pour un token
 */
export function getTokenDocumentation(docKey: string) {
  return getDocumentation(docKey);
}

/**
 * Stocke les données importées (pour utilisation ultérieure)
 * Peut être amélioré pour persister dans localStorage ou IndexedDB
 */
const importCache = new Map<string, ProcessedImportData>();

export function cacheImportedNotebook(
  id: string,
  data: ProcessedImportData
): void {
  importCache.set(id, data);
}

export function getCachedNotebook(id: string): ProcessedImportData | undefined {
  return importCache.get(id);
}

export function clearImportCache(): void {
  importCache.clear();
}
