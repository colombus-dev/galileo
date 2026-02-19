/**
 * Documentation complète pour tous les tokens documentables
 * Mocks complets pour les documentations des librairies
 */

import type { DocEntry } from '@/types/notebook';

export const completeMockDocs: Record<string, DocEntry> = {
  // ============ PANDAS ============
  'pandas': {
    docKey: 'pandas',
    title: 'Pandas - Data Analysis Library',
    version: '2.1.3',
    libName: 'pandas',
    content: `# Pandas - Data Manipulation & Analysis

Pandas est une librairie Python open-source pour la manipulation et l'analyse de données.

## Caractéristiques principales

- **DataFrame** : Structure tabulaire 2D avec colonnes nommées et indexage flexible
- **Series** : Structure 1D pour manipuler des colonnes isolées
- **Groupby** : Opérations d'agrégation et transformation en groupe
- **Merge/Join** : Fusion entre plusieurs DataFrames
- **Time series** : Manipulation de données temporelles avec indexage temporel

## Cas d'usage

Pandas est particulièrement utile pour :
- Nettoyage et préparation de données (data cleaning)
- Exploration exploratoire (EDA)
- Transformation de formats (CSV, Excel, JSON, SQL, etc.)
- Fusion et agrégation de données
- Détection d'anomalies`,
    examples: `import pandas as pd

# Lire un CSV
df = pd.read_csv("data.csv")

# Manipulation basique
df.head(10)
df.describe()`,
  },
  'pandas.read_csv': {
    docKey: 'pandas.read_csv',
    title: 'pandas.read_csv()',
    version: '2.1.3',
    libName: 'pandas',
    content: `# pd.read_csv() - Lire des fichiers CSV

Charge un fichier CSV dans un DataFrame pandas.

## Paramètres principaux

- **filepath_or_buffer** : Chemin du fichier ou URL
- **sep** : Délimiteur (défaut: ',')
- **header** : Ligne à utiliser comme noms (défaut: 0)
- **dtype** : Types des colonnes
- **skiprows** : Nombre de lignes à ignorer
- **nrows** : Nombre de lignes à lire`,
    examples: `df = pd.read_csv("iris.csv")
df = pd.read_csv("data.csv", sep=';', encoding='utf-8')
df = pd.read_csv("large.csv", nrows=1000)`,
  },
  'pandas.DataFrame': {
    docKey: 'pandas.DataFrame',
    title: 'pandas.DataFrame',
    version: '2.1.3',
    libName: 'pandas',
    content: `# DataFrame - Structure tabulaire principale

Un DataFrame est une structure 2D composée de lignes et colonnes, similaire à un tableur.

## Attributs principaux

- **shape** : Dimensions (lignes, colonnes)
- **columns** : Noms des colonnes
- **index** : Indices des lignes
- **dtypes** : Types de données

## Méthodes courantes

- **head()** : Voir les premières lignes
- **tail()** : Voir les dernières lignes
- **describe()** : Statistiques descriptives
- **info()** : Informations sur les colonnes`,
    examples: `df.shape  # (100, 5)
df.head()
df.describe()
df.info()`,
  },
  'pandas.DataFrame.drop': {
    docKey: 'pandas.DataFrame.drop',
    title: 'DataFrame.drop()',
    version: '2.1.3',
    libName: 'pandas',
    content: `# DataFrame.drop() - Supprimer lignes/colonnes

Supprime des lignes ou colonnes du DataFrame.

## Paramètres

- **labels** : Indices ou noms à supprimer
- **axis** : 0 pour lignes, 1 pour colonnes
- **inplace** : Modifier le DataFrame original`,
    examples: `df.drop('column_name', axis=1)
df.drop([0, 1, 2], axis=0)
df.drop(columns=['col1', 'col2'])`,
  },
  'pandas.Series': {
    docKey: 'pandas.Series',
    title: 'pandas.Series',
    version: '2.1.3',
    libName: 'pandas',
    content: `# Series - Structure 1D

Une Series est une structure 1D composée d'index et de valeurs.`,
    examples: `s = pd.Series([1, 2, 3], index=['a', 'b', 'c'])
df['column_name']  # Accéder à une colonne`,
  },
  'pandas.concat': {
    docKey: 'pandas.concat',
    title: 'pandas.concat()',
    version: '2.1.3',
    libName: 'pandas',
    content: `# concat() - Concaténer DataFrames

Combine plusieurs DataFrames verticalement ou horizontalement.`,
    examples: `pd.concat([df1, df2])
pd.concat([df1, df2], axis=1)`,
  },
  'pandas.merge': {
    docKey: 'pandas.merge',
    title: 'pandas.merge()',
    version: '2.1.3',
    libName: 'pandas',
    content: `# merge() - Fusionner DataFrames

Fusionne deux DataFrames basé sur des clés communes (JOIN).`,
    examples: `pd.merge(df1, df2, on='key')
pd.merge(df1, df2, left_on='key1', right_on='key2')`,
  },

  // ============ NUMPY ============
  'numpy': {
    docKey: 'numpy',
    title: 'NumPy - Numerical Computing',
    version: '1.24.3',
    libName: 'numpy',
    content: `# NumPy - Calcul numérique

NumPy est la librairie fondamentale pour le calcul scientifique en Python.

## Caractéristiques

- **ndarray** : Structure de tableau n-dimensionnel
- **Opérations vectorisées** : Opérations rapides sur tableaux
- **Algèbre linéaire** : Operations matricielles`,
    examples: `import numpy as np

arr = np.array([1, 2, 3])
matrix = np.array([[1, 2], [3, 4]])`,
  },
  'numpy.array': {
    docKey: 'numpy.array',
    title: 'numpy.array()',
    version: '1.24.3',
    libName: 'numpy',
    content: `# array() - Créer un ndarray

Crée un tableau NumPy à partir d'une liste ou tuple.`,
    examples: `np.array([1, 2, 3])
np.array([[1, 2], [3, 4]])`,
  },
  'numpy.unique': {
    docKey: 'numpy.unique',
    title: 'numpy.unique()',
    version: '1.24.3',
    libName: 'numpy',
    content: `# unique() - Valeurs uniques

Retourne les valeurs uniques d'un tableau.`,
    examples: `np.unique([1, 2, 2, 3])  # [1, 2, 3]`,
  },
  'numpy.zeros': {
    docKey: 'numpy.zeros',
    title: 'numpy.zeros()',
    version: '1.24.3',
    libName: 'numpy',
    content: `# zeros() - Créer tableau de zéros`,
    examples: `np.zeros((3, 3))`,
  },
  'numpy.ones': {
    docKey: 'numpy.ones',
    title: 'numpy.ones()',
    version: '1.24.3',
    libName: 'numpy',
    content: `# ones() - Créer tableau de uns`,
    examples: `np.ones((2, 2))`,
  },

  // ============ SCIKIT-LEARN ============
  'sklearn': {
    docKey: 'sklearn',
    title: 'Scikit-learn - Machine Learning',
    version: '1.3.0',
    libName: 'sklearn',
    content: `# Scikit-learn - Machine Learning Library

Scikit-learn est la librairie standard pour le machine learning en Python.

## Modules principaux

- **datasets** : Chargement de datasets
- **preprocessing** : Normalisation et scaling
- **model_selection** : Train/test split et cross-validation
- **ensemble** : Modèles d'ensemble (Random Forest, etc.)
- **metrics** : Métriques d'évaluation
- **svm** : Support Vector Machines`,
    examples: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC`,
  },
  'sklearn.datasets.load_iris': {
    docKey: 'sklearn.datasets.load_iris',
    title: 'sklearn.datasets.load_iris()',
    version: '1.3.0',
    libName: 'sklearn',
    content: `# load_iris() - Dataset Iris

Charge le célèbre dataset Iris avec 150 fleurs.

## Contenu

- **X** : 4 features morphologiques
- **y** : 3 classes (espèces)
- **feature_names** : Noms des features
- **target_names** : Noms des classes`,
    examples: `iris = load_iris()
X = iris.data
y = iris.target`,
  },
  'sklearn.datasets.load_digits': {
    docKey: 'sklearn.datasets.load_digits',
    title: 'sklearn.datasets.load_digits()',
    version: '1.3.0',
    libName: 'sklearn',
    content: `# load_digits() - Dataset Handwritten Digits

Charge le dataset de chiffres manuscrits (8x8 images).`,
    examples: `digits = load_digits()
X = digits.data`,
  },
  'sklearn.model_selection.train_test_split': {
    docKey: 'sklearn.model_selection.train_test_split',
    title: 'sklearn.model_selection.train_test_split()',
    version: '1.3.0',
    libName: 'sklearn',
    content: `# train_test_split() - Split train/test

Divise les données en ensembles d'entraînement et de test.

## Paramètres

- **test_size** : Proportion du test (0.2 par défaut)
- **random_state** : Seed pour reproductibilité
- **stratify** : Stratification pour preservez les proportions de classes`,
    examples: `X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)`,
  },
  'sklearn.preprocessing.StandardScaler': {
    docKey: 'sklearn.preprocessing.StandardScaler',
    title: 'sklearn.preprocessing.StandardScaler',
    version: '1.3.0',
    libName: 'sklearn',
    content: `# StandardScaler - Normalisation Z-score

Normalise les features en (X - mean) / std.

## Processus

1. Fit : Calcule mean et std sur les données
2. Transform : Applique la normalisation
3. Fit_transform : Combine fit + transform`,
    examples: `scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)`,
  },
  'sklearn.preprocessing.MinMaxScaler': {
    docKey: 'sklearn.preprocessing.MinMaxScaler',
    title: 'sklearn.preprocessing.MinMaxScaler',
    version: '1.3.0',
    libName: 'sklearn',
    content: `# MinMaxScaler - Normalisation Min-Max

Scale les features entre 0 et 1.`,
    examples: `scaler = MinMaxScaler()
X_scaled = scaler.fit_transform(X)`,
  },
  'sklearn.svm.SVC': {
    docKey: 'sklearn.svm.SVC',
    title: 'sklearn.svm.SVC',
    version: '1.3.0',
    libName: 'sklearn',
    content: `# SVC - Support Vector Classifier

Classifieur basé sur les Support Vector Machines.

## Paramètres

- **kernel** : 'linear', 'rbf', 'poly', 'sigmoid'
- **C** : Paramètre de régularisation
- **gamma** : Coefficient pour noyau RBF`,
    examples: `model = SVC(kernel='rbf', C=1.0)
model.fit(X_train, y_train)
predictions = model.predict(X_test)`,
  },
  'sklearn.ensemble.RandomForestClassifier': {
    docKey: 'sklearn.ensemble.RandomForestClassifier',
    title: 'sklearn.ensemble.RandomForestClassifier',
    version: '1.3.0',
    libName: 'sklearn',
    content: `# RandomForestClassifier - Ensemble method

Classifieur basé sur une forêt aléatoire d'arbres de décision.`,
    examples: `model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)`,
  },
  'sklearn.metrics.accuracy_score': {
    docKey: 'sklearn.metrics.accuracy_score',
    title: 'sklearn.metrics.accuracy_score()',
    version: '1.3.0',
    libName: 'sklearn',
    content: `# accuracy_score() - Exactitude

Calcule le pourcentage de prédictions correctes.

## Formule

accuracy = (correct predictions) / (total predictions)`,
    examples: `accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.2%}")`,
  },
  'sklearn.metrics.confusion_matrix': {
    docKey: 'sklearn.metrics.confusion_matrix',
    title: 'sklearn.metrics.confusion_matrix()',
    version: '1.3.0',
    libName: 'sklearn',
    content: `# confusion_matrix() - Matrice de confusion

Affiche les vrais/faux positifs et vrais/faux négatifs.`,
    examples: `cm = confusion_matrix(y_test, y_pred)`,
  },
  'sklearn.metrics.classification_report': {
    docKey: 'sklearn.metrics.classification_report',
    title: 'sklearn.metrics.classification_report()',
    version: '1.3.0',
    libName: 'sklearn',
    content: `# classification_report() - Rapport de classification

Affiche precision, recall, f1-score pour chaque classe.`,
    examples: `print(classification_report(y_test, y_pred))`,
  },
  'sklearn.metrics.f1_score': {
    docKey: 'sklearn.metrics.f1_score',
    title: 'sklearn.metrics.f1_score()',
    version: '1.3.0',
    libName: 'sklearn',
    content: `# f1_score() - Score F1

Moyenne harmonique entre precision et recall.`,
    examples: `f1 = f1_score(y_test, y_pred, average='weighted')`,
  },

  // ============ MATPLOTLIB ============
  'matplotlib': {
    docKey: 'matplotlib',
    title: 'Matplotlib - Visualization',
    version: '3.7.1',
    libName: 'matplotlib',
    content: `# Matplotlib - Visualization Library

Matplotlib est la librairie standard pour créer des graphiques en Python.`,
    examples: `import matplotlib.pyplot as plt

plt.plot([1, 2, 3], [1, 2, 3])
plt.show()`,
  },
  'matplotlib.pyplot': {
    docKey: 'matplotlib.pyplot',
    title: 'matplotlib.pyplot',
    version: '3.7.1',
    libName: 'matplotlib',
    content: `# pyplot - Interface MATLAB-like

Module pyplot pour créer des graphiques facilement.`,
    examples: `import matplotlib.pyplot as plt`,
  },
  'matplotlib.pyplot.figure': {
    docKey: 'matplotlib.pyplot.figure',
    title: 'matplotlib.pyplot.figure()',
    version: '3.7.1',
    libName: 'matplotlib',
    content: `# figure() - Créer une figure

Crée une nouvelle figure pour le graphique.`,
    examples: `fig = plt.figure(figsize=(10, 6))`,
  },
  'matplotlib.pyplot.plot': {
    docKey: 'matplotlib.pyplot.plot',
    title: 'matplotlib.pyplot.plot()',
    version: '3.7.1',
    libName: 'matplotlib',
    content: `# plot() - Tracer une ligne

Trace une ligne 2D.`,
    examples: `plt.plot([1, 2, 3], [1, 4, 9])`,
  },
  'matplotlib.pyplot.show': {
    docKey: 'matplotlib.pyplot.show',
    title: 'matplotlib.pyplot.show()',
    version: '3.7.1',
    libName: 'matplotlib',
    content: `# show() - Afficher la figure

Affiche la figure.`,
    examples: `plt.show()`,
  },
  'matplotlib.pyplot.scatter': {
    docKey: 'matplotlib.pyplot.scatter',
    title: 'matplotlib.pyplot.scatter()',
    version: '3.7.1',
    libName: 'matplotlib',
    content: `# scatter() - Scatter plot

Crée un nuage de points.`,
    examples: `plt.scatter(X[:, 0], X[:, 1], c=y)`,
  },

  // ============ SEABORN ============
  'seaborn': {
    docKey: 'seaborn',
    title: 'Seaborn - Statistical Visualization',
    version: '0.12.2',
    libName: 'seaborn',
    content: `# Seaborn - Statistical Data Visualization

Seaborn est construite sur Matplotlib pour créer des visualisations statistiques attrayantes.`,
    examples: `import seaborn as sns

sns.heatmap(data)
plt.show()`,
  },
  'seaborn.heatmap': {
    docKey: 'seaborn.heatmap',
    title: 'seaborn.heatmap()',
    version: '0.12.2',
    libName: 'seaborn',
    content: `# heatmap() - Heatmap visualization

Visualise une matrice comme une heatmap avec couleurs.

## Paramètres

- **data** : Matrice 2D
- **cmap** : Colormap
- **annot** : Afficher les valeurs`,
    examples: `sns.heatmap(confusion_matrix)
sns.heatmap(data, cmap='coolwarm', annot=True)`,
  },
  'seaborn.scatterplot': {
    docKey: 'seaborn.scatterplot',
    title: 'seaborn.scatterplot()',
    version: '0.12.2',
    libName: 'seaborn',
    content: `# scatterplot() - Scatter plot amélioré

Scatter plot avec support des groupes et couleurs.`,
    examples: `sns.scatterplot(x='col1', y='col2', hue='target', data=df)`,
  },
  'seaborn.boxplot': {
    docKey: 'seaborn.boxplot',
    title: 'seaborn.boxplot()',
    version: '0.12.2',
    libName: 'seaborn',
    content: `# boxplot() - Box plot

Visualise la distribution des données avec quartiles.`,
    examples: `sns.boxplot(data=df, x='category', y='value')`,
  },
  'seaborn.barplot': {
    docKey: 'seaborn.barplot',
    title: 'seaborn.barplot()',
    version: '0.12.2',
    libName: 'seaborn',
    content: `# barplot() - Bar plot

Crée un graphique en barres avec estimations.`,
    examples: `sns.barplot(data=df, x='category', y='value')`,
  },

  // ============ JUPYTER/IPYTHON ============
  'jupyter': {
    docKey: 'jupyter',
    title: 'Jupyter - Interactive Computing',
    version: '1.0.0',
    libName: 'jupyter',
    content: `# Jupyter - Interactive Computing

Jupyter fournit l'environnement notebook pour le calcul interactif.`,
    examples: `# Les cellules sont exécutées de manière interactive`,
  },
  'IPython.display': {
    docKey: 'IPython.display',
    title: 'IPython.display',
    version: '8.14.0',
    libName: 'IPython',
    content: `# IPython.display - Rich output`,
    examples: `from IPython.display import display, HTML`,
  },
  'IPython.display.display': {
    docKey: 'IPython.display.display',
    title: 'display()',
    version: '8.14.0',
    libName: 'IPython',
    content: `# display() - Afficher un objet

Affiche un objet de manière riche dans Jupyter.`,
    examples: `display(df)`,
  },
};

/**
 * Fonction helper pour obtenir la documentation d'un token
 */
export function getDocumentation(docKey: string): DocEntry | undefined {
  return completeMockDocs[docKey];
}
