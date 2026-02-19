/**
 * Mapper les aliases et variantes de clés de documentation
 * Permet de faire correspondre "pd" à "pandas", "np" à "numpy", etc.
 */

const ALIAS_MAP: Record<string, string[]> = {
  'pandas': ['pd', 'pandas'],
  'numpy': ['np', 'numpy'],
  'matplotlib.pyplot': ['plt', 'matplotlib', 'matplotlib.pyplot'],
  'seaborn': ['sns', 'seaborn'],
  'sklearn': ['sklearn', 'from sklearn'],
};

// Création d'un index inverse : alias -> clé primaire
const REVERSE_ALIAS_MAP: Record<string, string> = {};
Object.entries(ALIAS_MAP).forEach(([primary, aliases]) => {
  aliases.forEach(alias => {
    REVERSE_ALIAS_MAP[alias] = primary;
  });
});

export function normalizeDocKey(input: string): string {
  // Nettoyer l'entrée
  let cleaned = input.trim();
  
  // Vérifier les aliases connus
  if (REVERSE_ALIAS_MAP[cleaned]) {
    return REVERSE_ALIAS_MAP[cleaned];
  }
  
  // Gérer les cas comme "numpy.array" → chercher "numpy" en doc
  const parts = cleaned.split('.');
  if (parts.length > 1) {
    const namespace = parts[0];
    if (REVERSE_ALIAS_MAP[namespace]) {
      return `${REVERSE_ALIAS_MAP[namespace]}.${parts.slice(1).join('.')}`;
    }
  }
  
  return cleaned;
}

/**
 * Récupère les variantes possibles d'une clé pour la recherche
 */
export function getDocKeyVariants(key: string): string[] {
  const variants = [key];
  
  // Ajouter les aliases
  Object.entries(ALIAS_MAP).forEach(([primary, aliases]) => {
    if (primary === key || aliases.includes(key)) {
      variants.push(...aliases);
    }
  });
  
  // Ajouter les versions avec points (pandas.read_csv → read_csv)
  const parts = key.split('.');
  if (parts.length > 1) {
    variants.push(parts[parts.length - 1]);
  }
  
  return [...new Set(variants)]; // Déduplication
}
