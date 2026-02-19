/**
 * Service pour parser les notebooks Jupyter importés
 * Convertit le format .ipynb au format NotebookModel
 */

import type { NotebookModel, NotebookCell, NotebookSection } from '@/types/notebook';
import { extractTokensFromCode } from './tokenExtractor';

export interface RawNotebookJson {
  cells: Array<{
    cell_type: 'code' | 'markdown' | 'raw';
    source: string[] | string;
    metadata?: Record<string, unknown>;
    outputs?: unknown[];
  }>;
  metadata?: {
    kernelspec?: {
      display_name: string;
      language: string;
      name: string;
    };
    language_info?: {
      name: string;
      version: string;
      mimetype?: string;
    };
  };
  nbformat?: number;
  nbformat_minor?: number;
}

/**
 * Parse un notebook Jupyter JSON en NotebookModel
 */
export function parseJupyterNotebook(
  rawNotebook: RawNotebookJson,
  filename: string,
  createdBy: string = 'Imported'
): NotebookModel {
  // Convertir les cellules
  const cells: NotebookCell[] = rawNotebook.cells
    .filter((cell) => cell.cell_type !== 'raw') // Ignorer les cellules raw
    .map((cell, index) => {
      const content =
        typeof cell.source === 'string'
          ? cell.source
          : cell.source.join('');

      const id = `cell-${index}`;
      const type = cell.cell_type as 'markdown' | 'code';

      const notebookCell: NotebookCell = {
        id,
        type,
        content,
        index,
        description: extractCellDescription(type, content),
      };

      // Extraire les tokens si c'est du code
      if (type === 'code') {
        notebookCell.tokens = extractTokensFromCode(content);
      }

      return notebookCell;
    });

  // Générer les sections automatiquement
  const sections = generateSectionsFromCells(cells);

  const model: NotebookModel = {
    id: `notebook-${Date.now()}`,
    name: filename.replace(/\.ipynb$/, ''),
    cells,
    sections,
    createdAt: new Date().toISOString(),
    createdBy,
    description: extractNotebookDescription(cells),
  };

  return model;
}

/**
 * Génère les sections à partir des cellules
 * Détecte les titres markdown comme délimiteurs de sections
 */
export function generateSectionsFromCells(
  cells: NotebookCell[]
): NotebookSection[] {
  const sections: NotebookSection[] = [];
  let currentSectionTitle = 'Introduction';
  let currentSectionStart = 0;
  let sectionOrder = 0;

  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];

    // Chercher les titres markdown (# ou ##)
    if (cell.type === 'markdown') {
      const titleMatch = cell.content.match(/^#+\s+(.+)/m);
      if (titleMatch) {
        // Créer une section avec les cellules précédentes si elle existe
        if (i > currentSectionStart || sectionOrder === 0) {
          const cellIds = cells
            .slice(currentSectionStart, i)
            .map((c) => c.id);

          if (cellIds.length > 0 || sectionOrder === 0) {
            const summary = extractSectionSummary(
              cells.slice(currentSectionStart, i)
            );

            sections.push({
              id: `section-${sectionOrder}`,
              title: currentSectionTitle,
              summary,
              cellIds,
              order: sectionOrder,
            });

            sectionOrder++;
          }
        }

        // Démarrer une nouvelle section
        currentSectionTitle = titleMatch[1];
        currentSectionStart = i;
      }
    }
  }

  // Ajouter la dernière section
  if (currentSectionStart < cells.length) {
    const cellIds = cells.slice(currentSectionStart).map((c) => c.id);
    const summary = extractSectionSummary(
      cells.slice(currentSectionStart)
    );

    sections.push({
      id: `section-${sectionOrder}`,
      title: currentSectionTitle,
      summary,
      cellIds,
      order: sectionOrder,
    });
  }

  return sections;
}

/**
 * Extrait un résumé d'une section en combinant les cellules markdown
 */
function extractSectionSummary(cells: NotebookCell[]): string {
  const markdownCells = cells.filter((c) => c.type === 'markdown');

  if (markdownCells.length === 0) {
    // Si pas de markdown, utiliser la première cellule de code comme description
    const codeCell = cells.find((c) => c.type === 'code');
    if (codeCell && codeCell.description) {
      return codeCell.description;
    }
    return 'Cellules de code';
  }

  // Combiner le contenu des cellules markdown
  return markdownCells
    .map((c) => {
      // Nettoyer les titres et formatage markdown
      return c.content
        .replace(/^#+\s+/gm, '')
        .replace(/\[(.+?)\]\(.+?\)/g, '$1')
        .replace(/\*\*(.+?)\*\*/g, '$1')
        .replace(/`(.+?)`/g, '$1')
        .trim();
    })
    .join('\n\n')
    .substring(0, 300); // Limiter à 300 caractères
}

/**
 * Extrait une description générale du notebook
 */
function extractNotebookDescription(cells: NotebookCell[]): string {
  // Chercher la première cellule markdown avec un titre principal (#)
  const titleCell = cells.find(
    (c) => c.type === 'markdown' && c.content.match(/^#\s+(.+)/m)
  );

  if (titleCell) {
    return titleCell.content.substring(0, 200);
  }

  return 'Notebook importé';
}

/**
 * Extrait une description d'une cellule
 */
function extractCellDescription(type: 'markdown' | 'code', content: string): string {
  if (type === 'markdown') {
    // Pour markdown, extraire la première ligne
    const firstLine = content.split('\n')[0];
    return firstLine.replace(/^#+\s+/, '').substring(0, 100);
  }

  // Pour code, extraire le premier commentaire
  const commentMatch = content.match(/#\s+(.+)/);
  if (commentMatch) {
    return commentMatch[1].substring(0, 100);
  }

  // Sinon, utiliser la première ligne de code
  const firstLine = content
    .split('\n')
    .find((line) => line.trim() && !line.trim().startsWith('#'));
  return firstLine?.substring(0, 100) || 'Code';
}
