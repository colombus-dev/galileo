# Extension Documentation Interactive - CodeViewer

## Vue d'ensemble

Cette extension permet aux utilisateurs de cliquer directement sur les termes documentés dans le code Python pour accéder à leur documentation.

## Fonctionnalités

### 1. **Détection automatique des tokens documentés**
   - Détecte les imports (pandas, numpy, sklearn, matplotlib, seaborn)
   - Détecte les aliases (pd, np, plt, sns)
   - Détecte les méthodes documentées (read_csv, fillna, groupby, etc.)
   - Détecte les classes (DataFrame, StandardScaler, etc.)

### 2. **Affichage visuel discret**
   - Highlight bleu semi-transparent au survol
   - Bordure pointillée bleue pour indiquer l'interactivité
   - Badge "Voir plus" qui apparaît au survol
   - Shadows subtiles pour la profondeur

### 3. **Deux modes d'affichage**

#### Mode Storytelling (DocSidePanel)
- Ouvre la documentation dans le panneau latéral existant
- Intégration avec `StorytellingWorkspace`
- Lié aux tokens cliquables du code

#### Mode Standalone (DocModal)
- Ouvre un modal autonome par-dessus le contenu
- Peut être fermé avec Escape ou en cliquant en dehors
- Utilisable sur n'importe quelle page

## Architecture

### Composants

#### `CodeViewer`
- **Props optionnelles** : `enableDocLinks`, `onDocKeyClick`
- Utilise SyntaxHighlighter de Prism (rendu inchangé)
- Ajoute des event listeners après le rendu
- Détecte les tokens via regex patterns

#### `DocModal`
- Modal autonome pour afficher la documentation
- Fermeture via Escape, clic en dehors
- Gestion du scroll (overflow hidden sur body)

#### `InteractiveCodeViewer`
- Wrapper pour CodeViewer + DocModal
- Facilite l'utilisation sur les pages autres que Storytelling
- État local via `useCodeDocumentation` hook

### Hooks

#### `useCodeDocumentation`
- Gère la sélection du token et le chargement de la doc
- Cherche d'abord dans `completeMockDocs`
- Fallback sur l'API mockée si nécessaire
- Normalise les clés (aliases → principales)

### Utilitaires

#### `docKeyMapper`
- `normalizeDocKey()` : Convertit aliases vers clés principales
- `getDocKeyVariants()` : Génère toutes les variantes possibles
- Gère les cas comme `np.array` → cherche `numpy`

## Configuration

### Activation dans CodeViewer
```tsx
<CodeViewer
  code={pythonCode}
  enableDocLinks={true}
  onDocKeyClick={handleDocKeyClick}
/>
```

### Activation dans CodeCell (Storytelling)
```tsx
<CodeCell
  cell={cell}
  onDocKeyClick={handleDocKeyClick}
/>
```

### Utilisation sur une autre page
```tsx
function MyPage() {
  return (
    <InteractiveCodeViewer
      code={pythonCode}
      enableDocLinks={true}
    />
  );
}
```

## Mapping d'Aliases

```
pandas → pd, pandas
numpy → np, numpy
matplotlib.pyplot → plt, matplotlib
seaborn → sns, seaborn
```

## Documentation Disponible

### Librairies principales
- `pandas` / `pd`
- `numpy` / `np`
- `matplotlib.pyplot` / `plt`
- `seaborn` / `sns`

### Méthodes et fonctions
- `read_csv`, `DataFrame`, `Series`, `fillna`, `groupby`, `drop`, etc.
- `array`, `zeros`, `ones`, `unique`, `inf`
- `StandardScaler`, `Pipeline`, `SVC`, `RandomForestClassifier`
- `train_test_split`, `accuracy_score`, `confusion_matrix`

### Ajouter une nouvelle documentation

1. Ajouter l'entrée dans `completeMockDocs` :
```typescript
'ma_fonction': {
  docKey: 'ma_fonction',
  title: 'Ma Fonction',
  version: '1.0.0',
  libName: 'ma_librairie',
  content: '# Documentation complète...',
  examples: 'exemple de code',
  related: ['fonction_associée'],
}
```

2. Ajouter des aliases si nécessaire dans `docKeyMapper.ts`

## Limitations actuelles

- Regex patterns peuvent ne pas capturer tous les cas d'usage (f-strings, multiline)
- Badge positioning peut déborder sur petits écrans
- Aucune fuzzy matching pour les typos
- Pas de cache des documentations (rechargement à chaque clic)

## Améliorations futures

- Cache des documentations
- Breadcrumb navigation dans les docs
- Syntaxe highlighting pour les blocs de code dans le modal
- Fuzzy search pour les typos
- Keyboard shortcuts (Escape, navigation avec flèches)
- Copy code button dans les exemples
