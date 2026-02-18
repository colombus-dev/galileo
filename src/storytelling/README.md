# 📚 Storytelling - Notebook Workspace

## Vue d'ensemble

Le module Storytelling offre une expérience complète de navigation et d'interaction avec des notebooks Jupyter. Le scénario guide l'utilisateur à travers 6 étapes :

1. **Import** du notebook
2. **Affichage des sections résumées**
3. **Interaction avec sections**
4. **Affichage du code**
5. **Mise en évidence des tokens cliquables**
6. **Affichage de la documentation**

## Structure

```
src/
├── components/storytelling/          # Composants UI
│   ├── NotebookWorkspaceLayout.tsx   # Layout 3-colonnes
│   ├── SummarySidebar.tsx             # Sidebar sections
│   ├── SectionSummaryView.tsx         # Contenu section
│   ├── CodePanel.tsx                  # Affichage code
│   ├── CodeCell.tsx                   # Cellule code
│   ├── TokenChip.tsx                  # Token interactif ✨
│   ├── CollapseToggle.tsx             # Bouton rétraction
│   ├── DocSidePanel.tsx               # Panneau doc
│   ├── SectionBadge.tsx               # Indicateur section
│   └── index.ts                       # Exports
│
├── pages/storytelling/                # Pages
│   └── NotebookWorkspacePage.tsx      # Page principale orchestratrice
│
├── types/
│   └── notebook.ts                    # Types partagés
│
├── mocks/
│   ├── notebook.mock.ts               # Données mock notebooks
│   ├── docs.mock.ts                   # Documentation mock
│   └── mockApi.ts                     # Service API simulé
│
├── stories/storytelling/              # Stories Storybook
│   ├── NotebookWorkspaceLayout.stories.tsx
│   ├── SummarySidebar.stories.tsx
│   ├── SectionSummaryView.stories.tsx
│   ├── CodePanel.stories.tsx
│   ├── CodeCell.stories.tsx
│   ├── TokenChip.stories.tsx
│   ├── CollapseToggle.stories.tsx
│   ├── DocSidePanel.stories.tsx
│   ├── SectionBadge.stories.tsx
│   └── NotebookWorkspacePage.stories.tsx
│
└── storytelling/
    └── index.ts                       # Barrel export
```

## Utilisation

### Import de la page complète

```tsx
import { NotebookWorkspacePage } from '@/pages/storytelling/NotebookWorkspacePage';

export function App() {
  return <NotebookWorkspacePage initialNotebookId="notebook-iris-1" />;
}
```

### Import de composants individuels

```tsx
import {
  SummarySidebar,
  CodePanel,
  TokenChip,
  DocSidePanel,
} from '@/components/storytelling';
```

### Import via barrel export

```tsx
import {
  NotebookWorkspacePage,
  SummarySidebar,
  TokenChip,
  mockNotebookIris,
  fetchDocMock,
} from '@/storytelling';
```

## Composants clés

### 🎨 NotebookWorkspaceLayout
Structure 3-colonnes responsive (sidebar | main | docPanel)

### 📌 SummarySidebar
Liste des sections avec sélection active et indicateurs

### 📖 SectionSummaryView
Affichage du résumé de section avec fallback mode code

### 💻 CodePanel
Conteneur des cellules de code avec toggle rétraction

### 🔧 CodeCell
Cellule de code avec syntax highlighting + tokens cliquables

### ✨ TokenChip
Badge interactif par librairie (pandas, sklearn, seaborn, etc.)

**Fonctionnalités** :
- Color-coding automatique par lib
- Icônes selon le kind (import/function/symbol)
- Hover effects
- Cliquable pour ouvrir la doc

### 📚 DocSidePanel
Panneau latéral pour affichage de documentation

**États** :
- Loading (skeleton)
- Error (message d'erreur)
- Data (titre + version + content + examples)
- Empty (placeholder)

### 🏗️ NotebookWorkspaceLayout
Layout responsive 3-colonnes avec sidebars indépendants

### 🎭 NotebookWorkspacePage
Page orchestratrice de tout le scénario

## Types

```typescript
// Token cliquable
interface Token {
  id: string;
  kind: 'function' | 'import' | 'symbol';
  name: string;
  lib: string;
  docKey: string;
}

// Cellule du notebook
interface NotebookCell {
  id: string;
  type: 'markdown' | 'code';
  content: string;
  index: number;
  description?: string;
  tokens?: Token[];
}

// Section du notebook
interface NotebookSection {
  id: string;
  title: string;
  summary: string;
  cellIds: string[];
  order: number;
}

// Modèle complet
interface NotebookModel {
  id: string;
  name: string;
  sections: NotebookSection[];
  cells: NotebookCell[];
  createdAt: string;
  createdBy: string;
}

// Documentation
interface DocEntry {
  docKey: string;
  title: string;
  version: string;
  content: string;
  libName: string;
  examples?: string;
}
```

## Mock Data

### Notebooks disponibles

- `mockNotebookIris` : Classification d'iris avec 4 sections complètes
- `mockNotebookSimple` : Exemple simple sans markdown

### Documentation

Docs pré-chargées pour :
- `pandas`, `pandas.read_csv`
- `sklearn.model_selection.train_test_split`
- `sklearn.svm.SVC`
- `sklearn.metrics.accuracy_score`
- `seaborn.heatmap`

### API Mock

```typescript
// Upload notebook
await uploadNotebookMock(file) // -> { notebookId, status }

// Fetch notebook
await fetchNotebookMock(notebookId) // -> { notebook, status }

// Fetch doc
await fetchDocMock(docKey) // -> { doc, status }
```

## Storybook

Lancez Storybook pour explorer tous les composants :

```bash
npm run storybook
```

Naviguez vers **Storytelling** pour voir :
- Tous les composants individuels
- États (loading, error, empty, data)
- Variantes et interactions
- Responsive views

## Points clés d'implémentation

✅ **Réutilisation** :
- `Storyteller` pour narratif flexible
- `CodeViewer` pour syntax highlighting
- Architecture modulaire

✅ **Accessibilité** :
- TokenChip : ARIA labels + focus states
- CollapseToggle : button semantique
- Couleurs contrastées

✅ **Responsive** :
- Layout 3-colonnes → stacking mobile
- Sidebars scrollables indépendantes
- Proportion flexible

✅ **Performance** :
- Mocks légers
- Lazy loading possible
- State management minimal

## Flux utilisateur complet

```
1. Importer notebook
   ↓
2. Notebook chargé → SummarySidebar affiche sections
   ↓
3. Cliquer section → SectionSummaryView + CodePanel
   ↓
4. Cliquer token → DocSidePanel loading...
   ↓
5. Doc affichée (title + version + content)
   ↓
6. Cliquer autre token → Doc swap
   ↓
7. Cliquer "Fermer" doc ou toggle code → UI update
```

## Exemple d'intégration

```tsx
import { NotebookWorkspacePage } from '@/storytelling';

function Dashboard() {
  return (
    <div className="h-screen">
      <NotebookWorkspacePage initialNotebookId="notebook-iris-1" />
    </div>
  );
}
```

## Développement futur

- [ ] Recherche dans sections
- [ ] Export du notebook enrichi
- [ ] Support multiple notebooks en tabs
- [ ] Annotations utilisateur
- [ ] Intégration backend réelle
- [ ] Highlight des tokens dans le code
- [ ] Téléchargement de la doc

---

Pour plus d'infos, consultez les stories Storybook ! 🚀
