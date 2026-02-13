export interface Artifact {
  id: string;
  type: 'dataset' | 'model' | 'visualization' | 'metric';
  name: string;
  cellIndex: number;
  description: string;
  previewUrls?: string[];
  previewMimeType?: string;
  previewMimeTypes?: string[];
  metadata?: {
    accuracy?: number;
    samples?: number;
    features?: number;
    modelType?: string;
    metric?: string;
    value?: number;
    datasetName?: string;
    targetName?: string;
    classCount?: number;
    classLabels?: string[];
    classes?: number;

		/** Optionnel: distribution des classes (pour rendre la carte "Distribution classes") */
		classDistribution?: Array<{ label: string; count: number }>;
  };
  inputs?: string[];
  className?: string;
}

export interface CodeCell {
  index: number;
  code: string;
  description: string;
}

export interface NotebookContextProblem {
  /** Ex: "Classification multi-classes" */
  taskTypeLabel: string;
  /** Ex: "Médecine", "Histoire", "Botanique" */
  domainLabel: string;
  description: string;
}

export interface NotebookContextData {
  inputLabel: string;
  inputDetail: string;
  outputLabel: string;
  outputDetail: string;
  /** "Équilibrées" | "Déséquilibrées" | "Inconnu" */
  classBalanceLabel?: string;
  /** Petit texte d'aide sur l'interprétation de l'accuracy */
  classBalanceHint?: string;
}

export interface NotebookContextMethodology {
  algorithmLabel: string;
  trainTestSplitLabel: string;
  validationLabel: string;
  evaluatedOnLabel: string;
}

export interface NotebookContext {
  problem: NotebookContextProblem;
  data: NotebookContextData;
  methodology: NotebookContextMethodology;
  libraries: string[];

	codeQuality?: {
		executionTimeSeconds?: number;
	};
}

export interface NotebookPedagogicalValidationCheckpoint {
  id: string;
  /** Catégorie (5 grandes sections) */
	category: "data" | "preprocessing" | "split" | "modeling" | "evaluation";
  title: string;
  description: string;
  status: "success" | "warning" | "error";
  detail?: string;
}

export interface NotebookPedagogicalValidation {
  checkpoints: NotebookPedagogicalValidationCheckpoint[];
  initialCheckedCheckpointIds?: string[];
  initialComment?: string;
}

export interface NotebookData {
  id: string;
  student: string;
  title: string;
  artifacts: Artifact[];
  cells: CodeCell[];
  context?: NotebookContext;
	pedagogicalValidation?: NotebookPedagogicalValidation;
  issues?: string[];
}

export const mockNotebooks: NotebookData[] = [
  {
    id: 'notebook-1',
    student: 'Laura Dupont',
    title: 'Classification de fleurs Iris',
    pedagogicalValidation: {
      checkpoints: [
        {
          id: 'cp-standardscaler',
				category: 'preprocessing',
          title: 'Normalisation StandardScaler',
          description:
            'Données normalisées avec succès. Moyenne ≈ 0, écart-type ≈ 1 pour toutes les features.',
          status: 'success',
        },
        {
          id: 'cp-stratified-split',
				category: 'split',
          title: 'Vérification split stratifié',
          description:
            'Distribution des classes identique entre train (40/40/40) et test (10/10/10).',
          status: 'success',
        },
        {
          id: 'cp-post-train-eval',
				category: 'evaluation',
          title: 'Validation post-entraînement',
          description:
            "Accuracy sur train: 100%, sur test: 96% → pas de sur-ajustement détecté.",
          status: 'success',
        },
      ],
      initialCheckedCheckpointIds: [],
      initialComment: '',
    },
    context: {
      problem: {
        taskTypeLabel: 'Classification multi-classes',
        domainLabel: 'Botanique',
        description:
          "Identifier automatiquement l'espèce d'une fleur d'Iris à partir de mesures morphologiques. Le notebook compare des classes distinctes (Setosa, Versicolor, Virginica) et vise une bonne généralisation sur des données jamais vues.",
      },
      data: {
        inputLabel: 'Entrée',
        inputDetail: 'Mesures morphologiques (longueur/largeur sépales et pétales) — 150 × 4',
        outputLabel: 'Sortie',
        outputDetail: "Espèce d'Iris — Multi-classes (3): Setosa, Versicolor, Virginica",
        classBalanceLabel: 'Équilibrées',
        classBalanceHint:
          "Les classes étant équilibrées, l'accuracy est généralement un indicateur fiable (à compléter idéalement par une matrice de confusion).",
      },
      methodology: {
        algorithmLabel: 'RandomForestClassifier',
        trainTestSplitLabel: '80/20 (stratifié)',
        validationLabel: 'Non',
        evaluatedOnLabel: 'Test',
      },
      libraries: ['scikit-learn', 'pandas', 'matplotlib', 'seaborn'],
      codeQuality: {
        executionTimeSeconds: 12,
      },
    },
    artifacts: [
      {
        id: 'art-1',
        type: 'dataset',
        name: 'Données brutes',
        cellIndex: 0,
        description: 'Chargement du dataset Iris',
        metadata: {
          datasetName: 'Iris',
          targetName: 'Espèce d\'Iris',
          classCount: 3,
          classLabels: ['Setosa', 'Versicolor', 'Virginica'],
          samples: 150,
          features: 4,
				classDistribution: [
					{ label: 'Setosa', count: 50 },
					{ label: 'Versicolor', count: 50 },
					{ label: 'Virginica', count: 50 },
				],
        },
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
    pedagogicalValidation: {
      checkpoints: [
        {
          id: 'cp-scaler',
				category: 'preprocessing',
          title: 'Normalisation des features',
          description:
            "Vérifier que les features sont normalisées (si nécessaire) et que la normalisation est fit sur train puis appliquée à test.",
          status: 'warning',
          detail: 'Le notebook indique un split sans normalisation (à justifier selon le modèle).',
        },
        {
          id: 'cp-stratified-split',
				category: 'split',
          title: 'Split train/test défini',
          description:
            "Le notebook doit définir un split train/test clair (idéalement stratifié en classification).",
          status: 'warning',
          detail: 'Le contexte indique un split manquant (trainTestSplitLabel = —).',
        },
        {
          id: 'cp-eval-on-test',
				category: 'evaluation',
          title: 'Évaluation sur test set',
          description:
            "La métrique de performance doit être calculée sur le test set (ou via validation), pas sur les données d'entraînement.",
          status: 'error',
          detail: "Le contexte indique une évaluation sur Train : risque de score surestimé.",
        },
      ],
      initialCheckedCheckpointIds: [],
      initialComment: '',
    },
    context: {
      problem: {
        taskTypeLabel: 'Classification multi-classes',
        domainLabel: 'Botanique',
        description:
          "Prédire l'espèce d'Iris à partir de mesures morphologiques. Ce notebook illustre une approche plus simple (sans normalisation) et met en évidence le risque d'évaluer un modèle sur les mêmes données que l'entraînement.",
      },
      data: {
        inputLabel: 'Entrée',
        inputDetail: 'Mesures morphologiques — 150 × 4',
        outputLabel: 'Sortie',
        outputDetail: "Espèce d'Iris — Multi-classes (3)",
        classBalanceLabel: 'Équilibrées',
        classBalanceHint:
          "Si les classes sont équilibrées, l'accuracy reste pertinente. Si elles ne le sont pas, préfère des métriques comme F1-macro, balanced accuracy ou AUC.",
      },
      methodology: {
        algorithmLabel: 'DecisionTreeClassifier',
        trainTestSplitLabel: '—',
        validationLabel: 'Non',
        evaluatedOnLabel: 'Train',
      },
      libraries: ['scikit-learn', 'pandas'],
      codeQuality: {
        executionTimeSeconds: 8,
      },
    },
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