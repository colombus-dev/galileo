/**
 * Exports centralisés pour les services de notebook
 */

// Parser
export { parseJupyterNotebook, generateSectionsFromCells } from './notebookParser';
export type { RawNotebookJson } from './notebookParser';

// Token extraction
export { extractTokensFromCode } from './tokenExtractor';

// Token registry
export { tokenLibraryRegistry } from './tokenRegistry';
export type { TokenRegistryEntry } from './tokenRegistry';

// Processor
export {
  processImportedNotebook,
  hasDocumentation,
  getTokenDocumentation,
  cacheImportedNotebook,
  getCachedNotebook,
  clearImportCache,
} from './notebookProcessor';
export type { ProcessedImportData } from './notebookProcessor';

// Hook
export { useNotebookImport } from '../hooks/useNotebookImport';
export type { UseNotebookImportOptions, UseNotebookImportState } from '../hooks/useNotebookImport';

// Documentation
export { completeMockDocs, getDocumentation } from './completeDocsMock';
