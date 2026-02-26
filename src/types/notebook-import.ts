/**
 * Types pour le système d'import de notebooks
 */

export interface NotebookFile {
  name: string;
  content: string;
  type: 'notebook' | 'pyproject';
}

export interface ParsedNotebook {
  name: string;
  cells: {
    id: string;
    type: 'code' | 'markdown';
    content: string;
    index: number;
  }[];
  metadata?: {
    kernelspec?: {
      display_name: string;
      language: string;
      name: string;
    };
    language_info?: {
      name: string;
      version: string;
    };
  };
}

export interface PyProjectDependencies {
  pythonVersion: string;
  dependencies: Array<{
    name: string;
    version: string;
  }>;
  devDependencies: Array<{
    name: string;
    version: string;
  }>;
}

export interface ImportedNotebook {
  id: string;
  notebookFile: NotebookFile;
  pyprojectFile: NotebookFile | null;
  parsedNotebook: ParsedNotebook;
  dependencies: PyProjectDependencies | null;
  importedAt: string;
  folderPath: string;
}
