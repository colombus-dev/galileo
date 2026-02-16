import type { NotebookModel, NotebookCell, NotebookSection, Token } from '@/types/notebook';

const mockTokens: Token[] = [
  // pandas tokens
  {
    id: 'token-pandas',
    kind: 'import',
    name: 'pandas',
    lib: 'pandas',
    docKey: 'pandas',
  },
  {
    id: 'token-pd-read-csv',
    kind: 'function',
    name: 'read_csv',
    lib: 'pandas',
    docKey: 'pandas.read_csv',
  },
  {
    id: 'token-pd-dataframe',
    kind: 'symbol',
    name: 'DataFrame',
    lib: 'pandas',
    docKey: 'pandas.DataFrame',
  },
  {
    id: 'token-pd-drop',
    kind: 'function',
    name: 'drop',
    lib: 'pandas',
    docKey: 'pandas.DataFrame.drop',
  },
  // sklearn tokens
  {
    id: 'token-sklearn-train-test-split',
    kind: 'function',
    name: 'train_test_split',
    lib: 'sklearn',
    docKey: 'sklearn.model_selection.train_test_split',
  },
  {
    id: 'token-sklearn-standardscaler',
    kind: 'symbol',
    name: 'StandardScaler',
    lib: 'sklearn',
    docKey: 'sklearn.preprocessing.StandardScaler',
  },
  {
    id: 'token-sklearn-svc',
    kind: 'symbol',
    name: 'SVC',
    lib: 'sklearn',
    docKey: 'sklearn.svm.SVC',
  },
  {
    id: 'token-sklearn-accuracy-score',
    kind: 'function',
    name: 'accuracy_score',
    lib: 'sklearn',
    docKey: 'sklearn.metrics.accuracy_score',
  },
  {
    id: 'token-sklearn-confusion-matrix',
    kind: 'function',
    name: 'confusion_matrix',
    lib: 'sklearn',
    docKey: 'sklearn.metrics.confusion_matrix',
  },
  // seaborn tokens
  {
    id: 'token-seaborn-heatmap',
    kind: 'function',
    name: 'heatmap',
    lib: 'seaborn',
    docKey: 'seaborn.heatmap',
  },
  // matplotlib tokens
  {
    id: 'token-matplotlib-pyplot',
    kind: 'import',
    name: 'matplotlib.pyplot',
    lib: 'matplotlib',
    docKey: 'matplotlib.pyplot',
  },
  {
    id: 'token-matplotlib-figure',
    kind: 'function',
    name: 'figure',
    lib: 'matplotlib',
    docKey: 'matplotlib.pyplot.figure',
  },
  // sklearn.datasets
  {
    id: 'token-sklearn-load-iris',
    kind: 'function',
    name: 'load_iris',
    lib: 'sklearn',
    docKey: 'sklearn.datasets.load_iris',
  },
  // numpy
  {
    id: 'token-numpy',
    kind: 'import',
    name: 'numpy',
    lib: 'numpy',
    docKey: 'numpy',
  },
];

const mockCells: NotebookCell[] = [
  {
    id: 'cell-0',
    type: 'markdown',
    index: 0,
    content: `# Classification Iris - ML Pipeline Complète

Cet exemple classique de machine learning utilise le dataset Iris pour démontrer une pipeline complète :

- Chargement : Import du dataset avec pandas
- Preprocessing : Normalisation et stratified split  
- Modélisation : Entraînement d'une SVM
- Évaluation : Métriques et visualisation

## Objectif

Prédire la classe d'iris à partir de 4 features morphologiques avec une précision maximale.`,
    description: 'Introduction et objectif',
  },
  {
    id: 'cell-1',
    type: 'code',
    index: 1,
    content: `import pandas as pd
import numpy as np
from sklearn.datasets import load_iris

# Chargement du dataset classique
iris = load_iris()
df = pd.DataFrame(iris.data, columns=iris.feature_names)
df['target'] = iris.target

print(f"Dataset shape: {df.shape}")
print(f"Features: {list(iris.feature_names)}")
print(f"Classes: {np.unique(iris.target)}")
print("\\nPremières lignes:")
print(df.head())`,
    description: 'Chargement et exploration des données',
    tokens: [mockTokens[1], mockTokens[12], mockTokens[0], mockTokens[2]],
  },
  {
    id: 'cell-2',
    type: 'markdown',
    index: 2,
    content: `## Étape 1 : Préparation des données

### Séparation X/y
Les features (X) et targets (y) doivent être séparées avant la modélisation.

### Train/Test Split
Nous utilisons un stratified split pour maintenir la distribution des classes (important avec données déséquilibrées).

### Normalisation
La StandardScaler centre et réduit les features - essentiel pour les modèles sensibles à l'échelle comme SVM.`,
    description: 'Étape de préparation',
  },
  {
    id: 'cell-3',
    type: 'code',
    index: 3,
    content: `from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Séparation features / target
X = df.drop('target', axis=1)
y = df['target']

# Train/test split avec stratification
X_train, X_test, y_train, y_test = train_test_split(
    X, y, 
    test_size=0.2, 
    random_state=42, 
    stratify=y  # Maintient la distribution des classes
)

# Normalisation avec StandardScaler
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print(f"Train set: {X_train_scaled.shape}")
print(f"Test set: {X_test_scaled.shape}")
print(f"\\nDistribution train: {np.bincount(y_train)}")
print(f"Distribution test: {np.bincount(y_test)}")`,
    description: 'Séparation, split et normalisation',
    tokens: [mockTokens[4], mockTokens[5], mockTokens[3], mockTokens[12]],
  },
  {
    id: 'cell-4',
    type: 'markdown',
    index: 4,
    content: `## Étape 2 : Modélisation

### Choix de SVM (Support Vector Machine)
La SVM est excellente pour la classification multi-classe car elle :
- Maximise la marge entre les classes
- Gère les données de haute dimension
- Offre plusieurs kernels (linéaire, RBF, polynomial)

### Hyperparamètres
- kernel='rbf' : Kernel RBF pour décision boundaries non-linéaires
- C=1.0 : Paramètre de régularisation (défaut)
- gamma='scale' : Coefficient pour le kernel RBF`,
    description: 'Choix du modèle et hyperparamètres',
  },
  {
    id: 'cell-5',
    type: 'code',
    index: 5,
    content: `from sklearn.svm import SVC

# Création et entraînement du modèle SVM
model = SVC(kernel='rbf', C=1.0, gamma='scale', random_state=42)
model.fit(X_train_scaled, y_train)

# Prédictions sur le test set
y_pred = model.predict(X_test_scaled)

print(f"Modèle entraîné avec succès")
print(f"Support vectors: {len(model.support_vectors_)}")
print(f"\\nPrédictions (10 premières): {y_pred[:10]}")
print(f"Vraies valeurs (10 premières): {y_test.values[:10]}")`,
    description: 'Entraînement du modèle SVM',
    tokens: [mockTokens[6]],
  },
  {
    id: 'cell-6',
    type: 'markdown',
    index: 6,
    content: `## Étape 3 : Évaluation du modèle

### Métriques principales
- Accuracy : Pourcentage de prédictions correctes
- Matrice de confusion : Détail des vrais/faux positifs par classe

### Visualisation
La heatmap permet de voir rapidement les patterns d'erreur : quelles classes sont confondues entre elles.`,
    description: 'Évaluation et visualisation',
  },
  {
    id: 'cell-7',
    type: 'code',
    index: 7,
    content: `from sklearn.metrics import accuracy_score, confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt

# Calcul des métriques
accuracy = accuracy_score(y_test, y_pred)
cm = confusion_matrix(y_test, y_pred)

print(f"Accuracy: {accuracy:.4f} ({accuracy*100:.2f}%)")
print(f"\\nMatrice de confusion:\\n{cm}")

# Visualisation
fig = plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
            xticklabels=iris.target_names, 
            yticklabels=iris.target_names)
plt.title('Matrice de Confusion - SVM Iris Classification')
plt.ylabel('Vraie classe')
plt.xlabel('Classe prédite')
plt.tight_layout()
plt.show()

print(f"\\n✓ Modèle performant avec {accuracy*100:.1f}% de précision")`,
    description: 'Calcul accuracy et matrice de confusion',
    tokens: [mockTokens[7], mockTokens[8], mockTokens[9], mockTokens[10], mockTokens[11]],
  },
];

const mockSections: NotebookSection[] = [
  {
    id: 'section-0',
    title: 'Introduction',
    summary:
      'Bienvenue dans cet exemple de classification Iris. Nous allons explorer une pipeline complète de ML.',
    cellIds: ['cell-0', 'cell-1'],
    order: 0,
  },
  {
    id: 'section-1',
    title: 'Préparation des données',
    summary:
      'Nous préparons les données en effectuant un split train/test et une normalisation avec StandardScaler.',
    cellIds: ['cell-2', 'cell-3'],
    order: 1,
  },
  {
    id: 'section-2',
    title: 'Modélisation',
    summary: 'Entraînement d\'une SVM avec kernel RBF pour la classification multi-classe.',
    cellIds: ['cell-4', 'cell-5'],
    order: 2,
  },
  {
    id: 'section-3',
    title: 'Évaluation',
    summary: 'Calcul des métriques (accuracy) et visualisation avec matrice de confusion.',
    cellIds: ['cell-6', 'cell-7'],
    order: 3,
  },
];

export const mockNotebookIris: NotebookModel = {
  id: 'notebook-iris-1',
  name: 'Classification Iris - ML Pipeline',
  description: 'Un exemple complet de machine learning avec sklearn et pandas',
  sections: mockSections,
  cells: mockCells,
  createdAt: '2026-02-16T10:00:00Z',
  createdBy: 'Alice Dupont',
};

export const mockNotebookSimple: NotebookModel = {
  id: 'notebook-simple-1',
  name: 'EDA Simple',
  description: 'Exploration de données basique',
  sections: [
    {
      id: 'section-simple-0',
      title: 'Aperçu',
      summary: 'Chargement et aperçu des données',
      cellIds: ['cell-simple-0', 'cell-simple-1'],
      order: 0,
    },
  ],
  cells: [
    {
      id: 'cell-simple-0',
      type: 'markdown',
      index: 0,
      content: '# Exploration Simple\n\nDonnées basiques',
    },
    {
      id: 'cell-simple-1',
      type: 'code',
      index: 1,
      content: 'import pandas as pd\ndf = pd.read_csv("data.csv")\nprint(df.info())',
      tokens: [mockTokens[0], mockTokens[1]],
    },
  ],
  createdAt: '2026-02-16T09:00:00Z',
  createdBy: 'Bob Martin',
};
