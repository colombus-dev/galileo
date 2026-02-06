export interface Artifact {
  id: string;
  type: 'dataset' | 'model' | 'visualization' | 'metric';
  name: string;
  cellIndex: number;
  description: string;
  // URLs d'images/SVG représentant la visualisation (ou la carte de métrique)
  // Ex: ['/mock/confusion-matrix.svg']
  previewUrls?: string[];
  metadata?: {
    accuracy?: number;
    samples?: number;
    features?: number;
    modelType?: string;
    metric?: string;
    value?: number;
  };
  inputs?: string[];
  className?: string;
}

export interface CodeCell {
  index: number;
  code: string;
  description: string;
}

export interface NotebookData {
  id: string;
  student: string;
  title: string;
  artifacts: Artifact[];
  cells: CodeCell[];
  issues?: string[];
}

export const mockNotebooks: NotebookData[] = [
  {
    id: 'notebook-1',
    student: 'Laura Dupont',
    title: 'Classification de fleurs Iris',
    artifacts: [
      {
        id: 'art-1',
        type: 'dataset',
        name: 'Données brutes',
        cellIndex: 0,
        description: 'Chargement du dataset Iris',
        metadata: { samples: 150, features: 4 },
        className: 'df'
      },
      {
        id: 'art-2',
        type: 'visualization',
        name: 'Distribution des features',
        cellIndex: 1,
        description: 'Visualisation de la distribution des variables',
        previewUrls: ['/mock/distribution.svg'],
        inputs: ['art-1']
      },
      {
        id: 'art-3',
        type: 'dataset',
        name: 'Données nettoyées',
        cellIndex: 2,
        description: 'Normalisation et split train/test (80/20)',
        metadata: { samples: 120, features: 4 },
        inputs: ['art-1'],
        className: 'X_train, X_test, y_train, y_test'
      },
      {
        id: 'art-4',
        type: 'model',
        name: 'Random Forest',
        cellIndex: 3,
        description: 'Entraînement du modèle Random Forest',
        metadata: { modelType: 'RandomForestClassifier' },
        inputs: ['art-3'],
        className: 'model'
      },
      {
        id: 'art-5',
        type: 'metric',
        name: 'Accuracy',
        cellIndex: 4,
        description: 'Évaluation sur le test set',
        previewUrls: ['/mock/metric-accuracy.svg'],
        metadata: { metric: 'accuracy', value: 0.96 },
        inputs: ['art-4', 'art-3'],
        className: 'accuracy'
      },
      {
        id: 'art-6',
        type: 'visualization',
        name: 'Confusion Matrix',
        cellIndex: 4,
        description: 'Matrice de confusion sur les prédictions',
        previewUrls: ['/mock/confusion-matrix.svg'],
        inputs: ['art-4', 'art-3'],
        className: 'cm'
      },
      {
        id: 'art-7',
        type: 'visualization',
        name: 'Feature Importance',
        cellIndex: 5,
        description: 'Importance des features du modèle',
        previewUrls: ['/mock/feature-importance.svg'],
        inputs: ['art-4'],
        className: 'importances'
      }
    ],
    cells: [
      {
        index: 0,
        code: `import pandas as pd
from sklearn.datasets import load_iris

# Chargement des données
iris = load_iris()
df = pd.DataFrame(iris.data, columns=iris.feature_names)
df['target'] = iris.target

print(f"Dataset chargé: {df.shape[0]} échantillons, {df.shape[1]-1} features")`,
        description: 'Chargement du dataset Iris'
      },
      {
        index: 1,
        code: `import matplotlib.pyplot as plt
import seaborn as sns

# Visualisation de la distribution
fig, axes = plt.subplots(2, 2, figsize=(12, 10))
for idx, col in enumerate(df.columns[:-1]):
    ax = axes[idx//2, idx%2]
    sns.histplot(data=df, x=col, hue='target', ax=ax, kde=True)
    ax.set_title(f'Distribution de {col}')
plt.tight_layout()
plt.show()`,
        description: 'Analyse exploratoire des données'
      },
      {
        index: 2,
        code: `from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Préparation des données
X = df.drop('target', axis=1)
y = df['target']

# Normalisation
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Split train/test
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42, stratify=y
)

print(f"Train: {X_train.shape[0]} échantillons")
print(f"Test: {X_test.shape[0]} échantillons")`,
        description: 'Préparation et split des données'
      },
      {
        index: 3,
        code: `from sklearn.ensemble import RandomForestClassifier

# Entraînement du modèle
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

print("Modèle entraîné avec succès")`,
        description: 'Entraînement du modèle Random Forest'
      },
      {
        index: 4,
        code: `from sklearn.metrics import accuracy_score, confusion_matrix
import seaborn as sns

# Prédictions
y_pred = model.predict(X_test)

# Métriques
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.2f}")

# Confusion Matrix
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
plt.title('Confusion Matrix')
plt.ylabel('Vraie classe')
plt.xlabel('Classe prédite')
plt.show()`,
        description: 'Évaluation du modèle'
      },
      {
        index: 5,
        code: `# Feature importance
importances = model.feature_importances_
feature_names = iris.feature_names

plt.figure(figsize=(10, 6))
plt.barh(feature_names, importances)
plt.xlabel('Importance')
plt.title('Importance des features')
plt.tight_layout()
plt.show()`,
        description: 'Analyse de l\'importance des features'
      }
    ],
    issues: []
  },
  {
    id: 'notebook-2',
    student: 'Lucas Martin',
    title: 'Classification de fleurs Iris',
    artifacts: [
      {
        id: 'art-2-1',
        type: 'dataset',
        name: 'Données brutes',
        cellIndex: 0,
        description: 'Chargement du dataset Iris',
        metadata: { samples: 150, features: 4 },
        className: 'df'
      },
      {
        id: 'art-2-2',
        type: 'dataset',
        name: 'Données nettoyées',
        cellIndex: 1,
        description: 'Split train/test sans normalisation',
        metadata: { samples: 150, features: 4 },
        inputs: ['art-2-1'],
        className: 'X_train, X_test, y_train, y_test'
      },
      {
        id: 'art-2-3',
        type: 'model',
        name: 'Decision Tree',
        cellIndex: 2,
        description: 'Entraînement d\'un arbre de décision',
        metadata: { modelType: 'DecisionTreeClassifier' },
        inputs: ['art-2-2'],
        className: 'model'
      },
      {
        id: 'art-2-4',
        type: 'metric',
        name: 'Accuracy',
        cellIndex: 3,
        description: 'Évaluation sur les mêmes données que l\'entraînement',
        previewUrls: ['/mock/metric-accuracy.svg'],
        metadata: { metric: 'accuracy', value: 0.99 },
        inputs: ['art-2-3', 'art-2-2'],
        className: 'accuracy'
      },
      {
        id: 'art-2-5',
        type: 'visualization',
        name: 'Graphique de précision',
        cellIndex: 3,
        description: 'Visualisation de la précision',
        previewUrls: ['/mock/chart-generic.svg'],
        inputs: ['art-2-4'],
        className: 'accuracy'
      },
      {
        id: 'art-2-6',
        type: 'visualization',
        name: 'Diagramme à barres',
        cellIndex: 4,
        description: 'Analyse supplémentaire',
        previewUrls: ['/mock/chart-generic.svg'],
        inputs: ['art-2-2'],
        className: 'X'
      },
      {
        id: 'art-2-7',
        type: 'visualization',
        name: 'Scatter plot',
        cellIndex: 5,
        description: 'Autre visualisation',
        previewUrls: ['/mock/chart-generic.svg'],
        inputs: ['art-2-1'],
        className: 'df'
      }
    ],
    cells: [
      {
        index: 0,
        code: `import pandas as pd
from sklearn.datasets import load_iris

iris = load_iris()
df = pd.DataFrame(iris.data, columns=iris.feature_names)
df['target'] = iris.target`,
        description: 'Chargement des données'
      },
      {
        index: 1,
        code: `from sklearn.model_selection import train_test_split

X = df.drop('target', axis=1)
y = df['target']

# Attention: pas de normalisation ici
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)`,
        description: 'Split des données sans normalisation'
      },
      {
        index: 2,
        code: `from sklearn.tree import DecisionTreeClassifier

model = DecisionTreeClassifier(random_state=42)
model.fit(X_train, y_train)`,
        description: 'Entraînement du modèle'
      },
      {
        index: 3,
        code: `from sklearn.metrics import accuracy_score
import matplotlib.pyplot as plt

# PROBLÈME: Évaluation sur les données d'entraînement
y_pred = model.predict(X_train)  # Devrait être X_test
accuracy = accuracy_score(y_train, y_pred)

print(f"Accuracy: {accuracy:.2f}")

plt.figure(figsize=(8, 4))
plt.bar(['Accuracy'], [accuracy])
plt.ylim([0, 1])
plt.show()`,
        description: 'Évaluation (sur train set - erreur!)'
      },
      {
        index: 4,
        code: `# Visualisation supplémentaire
plt.figure(figsize=(10, 6))
plt.bar(range(len(X.columns)), [0.2, 0.3, 0.4, 0.1])
plt.xticks(range(len(X.columns)), X.columns, rotation=45)
plt.title('Analyse arbitraire')
plt.show()`,
        description: 'Visualisation non justifiée'
      },
      {
        index: 5,
        code: `# Encore une visualisation
plt.figure(figsize=(8, 6))
plt.scatter(df.iloc[:, 0], df.iloc[:, 1], c=df['target'])
plt.xlabel(df.columns[0])
plt.ylabel(df.columns[1])
plt.show()`,
        description: 'Autre visualisation'
      }
    ],
    issues: [
      'Absence de normalisation des données',
      'Évaluation sur le training set au lieu du test set (overfitting)',
      'Visualisations multiples sans justification analytique'
    ]
  },
  {
    id: 'notebook-3',
    student: 'Sophie Rousseau',
    title: 'Classification de fleurs Iris',
    artifacts: [
      {
        id: 'art-3-1',
        type: 'dataset',
        name: 'Données brutes',
        cellIndex: 0,
        description: 'Chargement du dataset',
        metadata: { samples: 150, features: 4 },
        className: 'df'
      },
      {
        id: 'art-3-2',
        type: 'visualization',
        name: 'Pairplot',
        cellIndex: 1,
        description: 'Visualisation des relations entre features',
        previewUrls: ['/mock/chart-generic.svg'],
        inputs: ['art-3-1'],
        className: 'df'
      },
      {
        id: 'art-3-3',
        type: 'dataset',
        name: 'Feature selection',
        cellIndex: 2,
        description: 'Sélection des 3 meilleures features',
        metadata: { samples: 120, features: 3 },
        inputs: ['art-3-1'],
        className: 'X_selected'
      },
      {
        id: 'art-3-4',
        type: 'dataset',
        name: 'Données normalisées',
        cellIndex: 3,
        description: 'Normalisation et split train/test',
        metadata: { samples: 120, features: 3 },
        inputs: ['art-3-3'],
        className: 'X_train, X_test, y_train, y_test'
      },
      {
        id: 'art-3-5',
        type: 'model',
        name: 'SVM',
        cellIndex: 4,
        description: 'Support Vector Machine',
        metadata: { modelType: 'SVC' },
        inputs: ['art-3-4'],
        className: 'model'
      },
      {
        id: 'art-3-6',
        type: 'metric',
        name: 'Cross-validation',
        cellIndex: 5,
        description: 'Validation croisée (5-fold)',
        previewUrls: ['/mock/metric-accuracy.svg'],
        metadata: { metric: 'cv_score', value: 0.95 },
        inputs: ['art-3-5', 'art-3-4'],
        className: 'cv_scores'
      },
      {
        id: 'art-3-7',
        type: 'metric',
        name: 'Test Accuracy',
        cellIndex: 6,
        description: 'Score final sur test set',
        previewUrls: ['/mock/metric-accuracy.svg'],
        metadata: { metric: 'accuracy', value: 0.97 },
        inputs: ['art-3-5', 'art-3-4'],
        className: 'accuracy'
      },
      {
        id: 'art-3-8',
        type: 'visualization',
        name: 'Confusion Matrix',
        cellIndex: 6,
        description: 'Matrice de confusion',
        previewUrls: ['/mock/confusion-matrix.svg'],
        inputs: ['art-3-5', 'art-3-4'],
        className: 'cm'
      }
    ],
    cells: [
      {
        index: 0,
        code: `import pandas as pd
from sklearn.datasets import load_iris

iris = load_iris()
df = pd.DataFrame(iris.data, columns=iris.feature_names)
df['target'] = iris.target`,
        description: 'Chargement du dataset'
      },
      {
        index: 1,
        code: `import seaborn as sns
import matplotlib.pyplot as plt

sns.pairplot(df, hue='target', diag_kind='kde')
plt.show()`,
        description: 'Visualisation exploratoire'
      },
      {
        index: 2,
        code: `from sklearn.feature_selection import SelectKBest, f_classif

X = df.drop('target', axis=1)
y = df['target']

# Sélection des 3 meilleures features
selector = SelectKBest(f_classif, k=3)
X_selected = selector.fit_transform(X, y)

selected_features = X.columns[selector.get_support()].tolist()
print(f"Features sélectionnées: {selected_features}")`,
        description: 'Feature selection'
      },
      {
        index: 3,
        code: `from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_selected)

X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42, stratify=y
)`,
        description: 'Normalisation et split'
      },
      {
        index: 4,
        code: `from sklearn.svm import SVC

model = SVC(kernel='rbf', random_state=42)
model.fit(X_train, y_train)`,
        description: 'Entraînement SVM'
      },
      {
        index: 5,
        code: `from sklearn.model_selection import cross_val_score

# Validation croisée
cv_scores = cross_val_score(model, X_train, y_train, cv=5)
print(f"CV Score moyen: {cv_scores.mean():.2f} (+/- {cv_scores.std():.2f})")`,
        description: 'Validation croisée'
      },
      {
        index: 6,
        code: `from sklearn.metrics import accuracy_score, confusion_matrix
import seaborn as sns

y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print(f"Test Accuracy: {accuracy:.2f}")

cm = confusion_matrix(y_test, y_pred)
sns.heatmap(cm, annot=True, fmt='d', cmap='Greens')
plt.title('Confusion Matrix')
plt.show()`,
        description: 'Évaluation finale'
      }
    ],
    issues: []
  }
];