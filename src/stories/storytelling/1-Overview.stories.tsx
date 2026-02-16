import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Storytelling/Overview',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Storytelling - Notebook Workspace

Bienvenue dans la section **Storytelling** de Galileo !

## Scénario complet

Le module propose une expérience narrative complète de navigation de notebooks :

### 1. **Import**
L'utilisateur importe un notebook .ipynb

### 2. **Sections**
Le notebook s'affiche avec sa liste de sections dans la sidebar

### 3. **Interaction**
L'utilisateur clique sur une section pour voir son résumé

### 4. **Code**
Le code de la section apparaît avec option de rétraction

### 5. **Tokens**
Les fonctions/imports sont mises en évidence et cliquables

### 6. **Documentation**
Un clic sur token affiche la documentation associée

## Architecture

Explorez les composants dans les catégories suivantes :

- **NotebookWorkspaceLayout** : Structure 3-colonnes principale
- **SummarySidebar** : Barre latérale des sections
- **SectionSummaryView** : Contenu de la section
- **CodePanel** : Affichage du code
- **CodeCell** : Cellule de code individuelle
- **TokenChip** : Badge interactif par token
- **CollapseToggle** : Bouton rétraction
- **DocSidePanel** : Panneau documentation
- **SectionBadge** : Indicateur type section
- **NotebookWorkspacePage** : Page orchestratrice complète

## Utilisation rapide

\`\`\`tsx
import { NotebookWorkspacePage } from '@/storytelling';

export default function App() {
  return <NotebookWorkspacePage initialNotebookId="notebook-iris-1" />;
}
\`\`\`

## Data Flow

\`\`\`
Import Notebook
    ↓
Fetch NotebookModel + Sections
    ↓
Display SummarySidebar
    ↓
User Select Section
    ↓
Display SectionSummaryView + CodePanel
    ↓
User Click Token
    ↓
Fetch DocEntry
    ↓
Display DocSidePanel
\`\`\`

## Points clés

- ✅ Réutilise Storyteller + CodeViewer existants
- ✅ Types TypeScript complets
- ✅ Mocks données réalistes
- ✅ Responsive 3-colonnes
- ✅ Accessibilité + focus states
- ✅ Loading + Error states

## Ressources

- Voir les stories individuelles pour les variantes
- Consultez le README dans \`src/storytelling/\`
- Mock data disponible dans \`src/mocks/\`
        `,
      },
    },
  },
};

export default meta;

export const Overview: StoryObj = {
  render: () => (
    <div className="p-12 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">📚 Storytelling</h1>
          <p className="text-lg text-slate-600">
            Expérience narrative complète pour explorer des notebooks Jupyter
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: ' Import',
              description: 'Chargez un notebook .ipynb',
              color: 'blue',
            },
            {
              title: ' Sections',
              description: 'Explorez les sections résumées',
              color: 'purple',
            },
            {
              title: ' Code',
              description: 'Affichez et interagissez avec le code',
              color: 'green',
            },
            {
              title: ' Tokens',
              description: 'Cliquez sur fonctions/imports',
              color: 'amber',
            },
            {
              title: ' Docs',
              description: 'Consultez la documentation',
              color: 'red',
            },
            {
              title: ' Intégration',
              description: 'Workflow complet et fluide',
              color: 'indigo',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-lg bg-white border-2 border-${item.color}-200 shadow-sm`}
            >
              <h3 className={`font-bold text-${item.color}-900 mb-1`}>{item.title}</h3>
              <p className={`text-sm text-${item.color}-700`}>{item.description}</p>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-lg bg-blue-50 border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">🚀 Commencez</h3>
          <p className="text-sm text-blue-800 mb-3">
            Explorez les stories dans les catégories ci-dessous pour voir tous les composants en action !
          </p>
          <code className="text-xs bg-white p-2 rounded border border-blue-300 text-blue-900 block">
            import &#123; NotebookWorkspacePage &#125; from '@/storytelling';
          </code>
        </div>
      </div>
    </div>
  ),
};
