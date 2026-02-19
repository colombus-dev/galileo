/**
 * Types pour le scénario de Notebook Workspace Storytelling
 */

export interface Token {
  id: string;
  kind: 'function' | 'import' | 'symbol';
  name: string;
  lib: string;          // ex: 'pandas', 'sklearn'
  docKey: string;       // ex: 'pandas.read_csv'
  line?: number;
}

export interface NotebookCell {
  id: string;
  type: 'markdown' | 'code';
  content: string;
  index: number;
  description?: string;
  tokens?: Token[];     // si type === 'code'
}

export interface NotebookSection {
  id: string;
  title: string;
  summary: string;      // résumé texte
  cellIds: string[];    // références aux cellules
  order: number;
}

export interface NotebookModel {
  id: string;
  name: string;
  sections: NotebookSection[];
  cells: NotebookCell[];
  createdAt: string;
  createdBy: string;
  description?: string;
}

export interface DocEntry {
  docKey: string;
  title: string;
  version: string;
  content: string;
  libName: string;
  examples?: string | string[];
  related?: string[];
}
