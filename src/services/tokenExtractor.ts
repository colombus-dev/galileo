/**
 * Service pour extraire les tokens documentables depuis le code
 * Détecte les imports, les fonctions et les symboles utilisés
 */

import type { Token } from '@/types/notebook';
import { tokenLibraryRegistry } from './tokenRegistry';

/**
 * Extrait tous les tokens documentables d'un code Python
 */
export function extractTokensFromCode(code: string): Token[] {
  const tokens: Token[] = [];
  const seenDocKeys = new Set<string>(); // Éviter les doublons

  // 1. Extraire les imports
  const importTokens = extractImports(code);
  importTokens.forEach((token) => {
    if (!seenDocKeys.has(token.docKey)) {
      tokens.push(token);
      seenDocKeys.add(token.docKey);
    }
  });

  // 2. Extraire les fonctions et symboles utilisés
  const usageTokens = extractFunctionAndSymbolUsage(code);
  usageTokens.forEach((token) => {
    if (!seenDocKeys.has(token.docKey)) {
      tokens.push(token);
      seenDocKeys.add(token.docKey);
    }
  });

  return tokens;
}

/**
 * Extrait les imports du code
 * Gère: import X, from X import Y, import X as Z, etc.
 */
function extractImports(code: string): Token[] {
  const tokens: Token[] = [];

  // Pattern: import pandas, import pandas as pd, etc.
  const importPattern = /import\s+([\w.]+)(?:\s+as\s+\w+)?/g;
  let match;

  while ((match = importPattern.exec(code)) !== null) {
    const libName = match[1];
    const token = tokenLibraryRegistry[libName];

    if (token) {
      tokens.push({
        id: `token-${token.lib}-${token.name}`,
        kind: 'import',
        name: token.name,
        lib: token.lib,
        docKey: token.docKey,
      });
    }
  }

  // Pattern: from pandas import read_csv, from sklearn.datasets import load_iris, etc.
  const fromImportPattern = /from\s+([\w.]+)\s+import\s+([\w,\s*]+)/g;

  while ((match = fromImportPattern.exec(code)) !== null) {
    const modulePath = match[1];
    const imports = match[2];

    // Traiter chaque import
    imports.split(',').forEach((imp) => {
      const trimmed = imp.trim();
      if (trimmed === '*') return; // Ignorer les wildcard imports

      // Chercher dans la registry
      const fullPath = `${modulePath}.${trimmed}`;
      const token = tokenLibraryRegistry[fullPath] || tokenLibraryRegistry[trimmed];

      if (token) {
        tokens.push({
          id: `token-${token.lib}-${token.name}`,
          kind: 'import',
          name: token.name,
          lib: token.lib,
          docKey: token.docKey,
        });
      }
    });
  }

  return tokens;
}

/**
 * Extrait les fonctions et symboles utilisés dans le code
 * Cherche les patterns comme: pd.read_csv(), sklearn.svm.SVC(), df.drop(), etc.
 */
function extractFunctionAndSymbolUsage(code: string): Token[] {
  const tokens: Token[] = [];

  // Pattern: pd.read_csv(), np.array(), etc.
  // Gère les chaînes à alias court (pd pour pandas, np pour numpy, etc.)
  const aliasMapping: Record<string, string> = {
    pd: 'pandas',
    np: 'numpy',
    plt: 'matplotlib.pyplot',
    sns: 'seaborn',
    sklearn: 'sklearn',
  };

  // Pattern pour catch les appels de fonction/symboles: pd.method(), obj.method(), etc.
  const usagePattern = /(\w+)\.(\w+)(?:\.(\w+))?(?:\.(\w+))?\s*\(/g;

  let match;
  const seenDocKeys = new Set<string>();

  while ((match = usagePattern.exec(code)) !== null) {
    const [, varOrAlias, method1, method2, method3] = match;

    // Essayer de construire des chemins possibles
    const possiblePaths = [
      `${aliasMapping[varOrAlias] || varOrAlias}.${method1}.${method2}.${method3}`,
      `${aliasMapping[varOrAlias] || varOrAlias}.${method1}.${method2}`,
      `${aliasMapping[varOrAlias] || varOrAlias}.${method1}`,
      method1, // cas simple
    ].filter((p) => p && !p.endsWith('.'));

    for (const path of possiblePaths) {
      const token = tokenLibraryRegistry[path];
      if (token && !seenDocKeys.has(token.docKey)) {
        tokens.push({
          id: `token-${token.lib}-${token.name}`,
          kind: token.kind || 'function',
          name: token.name,
          lib: token.lib,
          docKey: token.docKey,
        });
        seenDocKeys.add(token.docKey);
        break; // Pas besoin de chercher plus
      }
    }
  }

  // Chercher également les symboles/classes instantiées (sans parenthèses)
  // Pattern: StandardScaler(), SVC(), etc.
  const classPattern = /(\w+)\s*\(/g;

  while ((match = classPattern.exec(code)) !== null) {
    const className = match[1];

    // Vérifier si c'est une classe connue
    const token = tokenLibraryRegistry[className];
    if (token && !seenDocKeys.has(token.docKey)) {
      tokens.push({
        id: `token-${token.lib}-${token.name}`,
        kind: token.kind || 'symbol',
        name: token.name,
        lib: token.lib,
        docKey: token.docKey,
      });
      seenDocKeys.add(token.docKey);
    }
  }

  return tokens;
}
