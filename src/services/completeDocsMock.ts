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
  // ============ ALIASES ============
  'pd': {
    docKey: 'pd',
    title: 'Pandas (alias: pd)',
    version: '2.1.3',
    libName: 'pandas',
    content: `# Pandas - Data Manipulation & Analysis (alias: pd)

Alias pour accéder à pandas: import pandas as pd

Pandas est une librairie Python open-source pour la manipulation et l'analyse de données.

## Caractéristiques principales

- **DataFrame** : Structure tabulaire 2D avec colonnes nommées et indexage flexible
- **Series** : Structure 1D pour manipuler des colonnes isolées
- **Groupby** : Opérations d'agrégation et transformation en groupe
- **Merge/Join** : Fusion entre plusieurs DataFrames`,
    examples: `import pandas as pd

df = pd.read_csv("data.csv")
df.head()`,
  },
  'np': {
    docKey: 'np',
    title: 'NumPy (alias: np)',
    version: '1.24.3',
    libName: 'numpy',
    content: `# NumPy - Numerical Computing (alias: np)

Alias pour accéder à numpy: import numpy as np

NumPy est la librairie fondamentale pour le calcul scientifique en Python.

## Caractéristiques principales

- **ndarray** : Tableaux multidimensionnels efficients
- **Opérations mathématiques** : Opérations vectorisées
- **Algèbre linéaire** : Décompositions matricielles
- **Nombres aléatoires** : Générateurs pseudo-aléatoires`,
    examples: `import numpy as np

arr = np.array([1, 2, 3])
np.mean(arr)`,
  },
  'plt': {
    docKey: 'plt',
    title: 'Matplotlib.pyplot (alias: plt)',
    version: '3.7.1',
    libName: 'matplotlib',
    content: `# Matplotlib.pyplot - Visualization (alias: plt)

Alias pour matplotlib.pyplot: import matplotlib.pyplot as plt

Pyplot est l'interface MATLAB-like pour la visualisation avec Matplotlib.

## Fonctionnalités

- **figure()** : Crée une nouvelle figure
- **plot()** : Trace des lignes et des marqueurs
- **scatter()** : Nuage de points
- **show()** : Affiche la figure`,
    examples: `import matplotlib.pyplot as plt

plt.figure()
plt.plot([1, 2, 3])
plt.show()`,
  },
  'sns': {
    docKey: 'sns',
    title: 'Seaborn (alias: sns)',
    version: '0.12.2',
    libName: 'seaborn',
    content: `# Seaborn - Statistical Visualization (alias: sns)

Alias pour seaborn: import seaborn as sns

Seaborn est basée sur matplotlib et fournit une interface pour tracer des graphiques statistiques.

## Fonctionnalités

- **heatmap()** : Heatmaps avec annotation
- **scatterplot()** : Nuages de points avec hue
- **boxplot()** : Boîtes à moustaches
- **barplot()** : Diagrammes en barres statistiques`,
    examples: `import seaborn as sns

sns.scatterplot(data=df, x="x", y="y")
sns.heatmap(data=df, annot=True)`,
  },
  // ============ PANDAS METHODS - MANQUANTS DU NOTEBOOK ============
  'fillna': {
    docKey: 'fillna',
    title: 'DataFrame.fillna() - Remplir les valeurs manquantes',
    version: '2.1.3',
    libName: 'pandas',
    content: `# fillna() - Imputer les valeurs manquantes

Remplace les NaN par des valeurs spécifiées.

## Exemple

\`\`\`python
df['Age'].fillna(df['Age'].median(), inplace=True)
df.fillna(method='ffill')  # Forward fill
df.fillna(value=0)
\`\`\``,
    examples: `df['Age'].fillna(df['Age'].median())
df.fillna(0)
df.fillna(method='ffill')`,
  },
  'groupby': {
    docKey: 'groupby',
    title: 'DataFrame.groupby() - Grouper et agréger',
    version: '2.1.3',
    libName: 'pandas',
    content: `# groupby() - Grouper par catégorie

Groupe les données par colonne(s) et applique une fonction d'agrégation.

## Exemple

\`\`\`python
df.groupby('Sex')['Survived'].mean()
df.groupby(['Sex', 'Pclass'])['Survived'].sum()
df.groupby('Category').agg({'Amount': 'sum', 'Count': 'mean'})
\`\`\``,
    examples: `df.groupby('Sex')['Survived'].mean()
df.groupby(['Sex', 'Pclass']).sum()
train_df.groupby('Embarked').size()`,
  },
  'head': {
    docKey: 'head',
    title: 'DataFrame.head() - Afficher les premières lignes',
    version: '2.1.3',
    libName: 'pandas',
    content: `# head() - Premiers enregistrements

Retourne les n premières lignes du DataFrame (défaut: 5).

## Exemple

\`\`\`python
df.head()      # Premiers 5
df.head(10)    # Premiers 10
df.head(1)     # Premier
\`\`\``,
    examples: `df.head()
train_df.head(5)
test_data.head()`,
  },
  'describe': {
    docKey: 'describe',
    title: 'DataFrame.describe() - Statistiques descriptives',
    version: '2.1.3',
    libName: 'pandas',
    content: `# describe() - Résumé statistique

Calcule les statistiques (count, mean, std, min, max, quartiles).

## Exemple

\`\`\`python
df.describe()
df.describe(include='all')
\`\`\``,
    examples: `df.describe()
train_df.describe()
df[['Age', 'Fare']].describe()`,
  },
  'value_counts': {
    docKey: 'value_counts',
    title: 'Series.value_counts() - Compter les occurrences',
    version: '2.1.3',
    libName: 'pandas',
    content: `# value_counts() - Compteur d'occurrences

Compte les occurrences uniques avec support du normalisé.

## Exemple

\`\`\`python
df['Survived'].value_counts()
df['Survived'].value_counts(normalize=True)  # Proportions
\`\`\``,
    examples: `df['Survived'].value_counts()
df['Sex'].value_counts(normalize=True)
train_df['Embarked'].value_counts()`,
  },
  'isnull': {
    docKey: 'isnull',
    title: 'DataFrame.isnull() - Détecter NaN',
    version: '2.1.3',
    libName: 'pandas',
    content: `# isnull() - Détecte les valeurs manquantes

Retourne un DataFrame booléen indiquant les NaN.

## Exemple

\`\`\`python
df.isnull()          # DataFrame booléen
df.isnull().sum()    # Compte par colonne
df.isnull().any()    # Existe-t-il des NaN ?
\`\`\``,
    examples: `df.isnull().sum()
train_df.isnull()
df['Age'].isnull().sum()`,
  },
  'shape': {
    docKey: 'shape',
    title: 'DataFrame.shape - Dimensions',
    version: '2.1.3',
    libName: 'pandas',
    content: `# shape - Dimensions du DataFrame

Retourne un tuple (nombre de lignes, nombre de colonnes).

## Exemple

\`\`\`python
df.shape           # (891, 12)
df.shape[0]        # Nombre de lignes
df.shape[1]        # Nombre de colonnes
\`\`\``,
    examples: `df.shape
train_df.shape
print(df.shape[0], df.shape[1])`,
  },
  'info': {
    docKey: 'info',
    title: 'DataFrame.info() - Informations du DataFrame',
    version: '2.1.3',
    libName: 'pandas',
    content: `# info() - Affiche les infos du DataFrame

Montre le nombre de colonnes, types, mémoire utilisée, valeurs non-nulles.

## Exemple

\`\`\`python
df.info()
\`\`\``,
    examples: `df.info()
train_df.info()`,
  },
  'replace': {
    docKey: 'replace',
    title: 'DataFrame.replace() - Remplacer des valeurs',
    version: '2.1.3',
    libName: 'pandas',
    content: `# replace() - Remplacer des valeurs

Remplace les valeurs spécifiées par d'autres.

## Exemple

\`\`\`python
df.replace([np.inf, -np.inf], np.nan)
df.replace({'Old': 'New'})
\`\`\``,
    examples: `df.replace([np.inf, -np.inf], np.nan)
df.replace(to_replace, value)`,
  },
  'get_dummies': {
    docKey: 'get_dummies',
    title: 'pandas.get_dummies() - One-hot encoding',
    version: '2.1.3',
    libName: 'pandas',
    content: `# get_dummies() - Encodage one-hot

Convertit les variables catégoriques en variables indicatrices.

## Exemple

\`\`\`python
pd.get_dummies(df, columns=['Sex', 'Embarked'], drop_first=True)
\`\`\``,
    examples: `pd.get_dummies(df, columns=['Sex'])
df = pd.get_dummies(df, columns=['Sex', 'Embarked'], drop_first=True)`,
  },
  'reindex': {
    docKey: 'reindex',
    title: 'DataFrame.reindex() - Réindexer',
    version: '2.1.3',
    libName: 'pandas',
    content: `# reindex() - Réindexer les colonnes

Aligne les colonnes du DataFrame sur une liste de colonnes.

## Exemple

\`\`\`python
df.reindex(columns=X.columns, fill_value=0)
\`\`\``,
    examples: `df.reindex(columns=reference_columns)
test_df.reindex(columns=X.columns, fill_value=0)`,
  },
  'median': {
    docKey: 'median',
    title: 'Series.median() - Médiane',
    version: '2.1.3',
    libName: 'pandas',
    content: `# median() - Calculer la médiane

Retourne la médiane (50e percentile).

## Exemple

\`\`\`python
df['Age'].median()
df.median()
\`\`\``,
    examples: `df['Age'].median()
train_df['Fare'].median()`,
  },
  'mode': {
    docKey: 'mode',
    title: 'Series.mode() - Mode (valeur la plus fréquente)',
    version: '2.1.3',
    libName: 'pandas',
    content: `# mode() - Valeur la plus fréquente

Retourne le mode (valeur qui apparaît le plus souvent).

## Exemple

\`\`\`python
df['Sex'].mode()[0]
\`\`\``,
    examples: `df['Embarked'].mode()[0]
df['Cabin'].mode()`,
  },
  'transform': {
    docKey: 'transform',
    title: 'GroupBy.transform() - Appliquer une fonction',
    version: '2.1.3',
    libName: 'pandas',
    content: `# transform() - Appliquer une fonction à chaque groupe

Applique une fonction et retourne un objet de même shape.

## Exemple

\`\`\`python
df['Age'] = df.groupby(['Sex', 'Pclass'])['Age'].transform(lambda x: x.fillna(x.median()))
\`\`\``,
    examples: `df.groupby('Sex')['Age'].transform(lambda x: x.fillna(x.median()))`,
  },
  'astype': {
    docKey: 'astype',
    title: 'DataFrame.astype() - Convertir type',
    version: '2.1.3',
    libName: 'pandas',
    content: `# astype() - Convertir les types

Convertit les types de données.

## Exemple

\`\`\`python
df['column'].astype(int)
df.astype({'col1': int, 'col2': float})
\`\`\``,
    examples: `df['PassengerId'].astype(int)
df.astype(float)`,
  },
  // ============ NUMPY METHODS ============
  'bincount': {
    docKey: 'bincount',
    title: 'numpy.bincount() - Compter occurrences',
    version: '1.24.3',
    libName: 'numpy',
    content: `# bincount() - Compte les occurrences d'entiers

Compte le nombre de fois que chaque entier apparaît.

## Exemple

\`\`\`python
np.bincount([0, 1, 1, 1, 2, 2])  # [1, 3, 2]
\`\`\``,
    examples: `np.bincount(y)
np.bincount(train_df['Survived'])`,
  },
  'sum': {
    docKey: 'sum',
    title: 'numpy.sum() - Somme',
    version: '1.24.3',
    libName: 'numpy',
    content: `# sum() - Calcule la somme

Retourne la somme des éléments du tableau.

## Exemple

\`\`\`python
np.sum([1, 2, 3])     # 6
arr.sum()
\`\`\``,
    examples: `np.sum(arr)
np.isnull(df).sum()`,
  },
  'mean': {
    docKey: 'mean',
    title: 'numpy.mean() / Series.mean() - Moyenne',
    version: '1.24.3',
    libName: 'numpy',
    content: `# mean() - Moyenne arithmétique

Calcule la moyenne.

## Exemple

\`\`\`python
np.mean([1, 2, 3, 4])
df['Age'].mean()
\`\`\``,
    examples: `np.mean(arr)
df['Age'].mean()`,
  },
  'std': {
    docKey: 'std',
    title: 'numpy.std() / Series.std() - Écart-type',
    version: '1.24.3',
    libName: 'numpy',
    content: `# std() - Écart-type

Calcule l'écart-type (standard deviation).

## Exemple

\`\`\`python
np.std(arr)
df['Age'].std()
\`\`\``,
    examples: `np.std(arr)
df.std()`,
  },
  // ============ SKLEARN ADDITIONAL ============
  'fit': {
    docKey: 'fit',
    title: 'Model.fit() - Entraîner le modèle',
    version: '1.3.2',
    libName: 'sklearn',
    content: `# fit() - Entraîner un modèle

Entraîne le modèle sur les données d'entraînement.

## Exemple

\`\`\`python
model.fit(X_train, y_train)
pipeline.fit(X_train, y_train)
\`\`\``,
    examples: `model.fit(X_train, y_train)
rf.fit(X_train, y_train)`,
  },
  'predict': {
    docKey: 'predict',
    title: 'Model.predict() - Faire des prédictions',
    version: '1.3.2',
    libName: 'sklearn',
    content: `# predict() - Prédictions

Fait des prédictions sur de nouvelles données.

## Exemple

\`\`\`python
y_pred = model.predict(X_test)
predictions = pipeline.predict(X_new)
\`\`\``,
    examples: `y_pred = model.predict(X_test)
rf_pred = rf.predict(X_val)`,
  },
  'feature_importances_': {
    docKey: 'feature_importances_',
    title: 'RandomForest.feature_importances_ - Importance des features',
    version: '1.3.2',
    libName: 'sklearn',
    content: `# feature_importances_ - Importance de chaque feature

Retourne l'importance relative de chaque feature.

## Exemple

\`\`\`python
importance = model.feature_importances_
importances = pd.Series(rf.feature_importances_, index=X_train.columns)
\`\`\``,
    examples: `rf.feature_importances_
importances = pd.Series(rf.feature_importances_, index=X.columns)`,
  },
  'fit_transform': {
    docKey: 'fit_transform',
    title: 'Transformer.fit_transform() - Fit et transform',
    version: '1.3.2',
    libName: 'sklearn',
    content: `# fit_transform() - Entraîner et transformer

Entraîne le transformateur et applique la transformation.

## Exemple

\`\`\`python
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)  # Seulement transform !
\`\`\``,
    examples: `X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)`,
  },
  'Series': {
    docKey: 'Series',
    title: 'pandas.Series - Structure 1D',
    version: '2.1.3',
    libName: 'pandas',
    content: `# Series - Objet 1D avec index

Une Series est une structure de données 1D avec un index.

## Exemple

\`\`\`python
s = pd.Series([1, 2, 3], index=['a', 'b', 'c'])
feature_importance = pd.Series(rf.feature_importances_, index=X.columns)
\`\`\``,
    examples: `pd.Series(rf.feature_importances_, index=X_train.columns)`,
  },
  // ============ PANDAS ADDITIONAL ============
  'isna': {
    docKey: 'isna',
    title: 'DataFrame.isna() / Series.isna() - Vérifier NaN',
    version: '2.1.3',
    libName: 'pandas',
    content: `# isna() - Détecte les valeurs manquantes

Alias pour isnull(). Retourne un booléen pour chaque élément.

## Exemple

\`\`\`python
df.isna()
df['Age'].isna().sum()
train_df.isna().sum()
\`\`\``,
    examples: `train_df.isna().sum()
df.isna()
test_df.isna().sum()`,
  },
  'copy': {
    docKey: 'copy',
    title: 'DataFrame.copy() - Copie profonde',
    version: '2.1.3',
    libName: 'pandas',
    content: `# copy() - Crée une copie indépendante

Crée une copie complète du DataFrame pour éviter les modifications en cascade.

## Exemple

\`\`\`python
df_copy = df.copy()
test_df = test_data.copy()
\`\`\``,
    examples: `test_df = test_data.copy()
df_copy = df.copy()`,
  },
  'sort_values': {
    docKey: 'sort_values',
    title: 'DataFrame.sort_values() - Trier les données',
    version: '2.1.3',
    libName: 'pandas',
    content: `# sort_values() - Trie par colonne

Trie le DataFrame selon une ou plusieurs colonnes.

## Paramètres

- **by** : Colonne(s) à trier
- **ascending** : Ordre ascendant (True) ou descendant (False)
- **inplace** : Modifie sur place si True

## Exemple

\`\`\`python
df.sort_values('Age', ascending=False)
df.sort_values(by=['Sex', 'Age'])
\`\`\``,
    examples: `df.sort_values('Age')
feature_importance.sort_values(ascending=False)`,
  },
  // ============ NUMPY ADDITIONAL ============
  'inf': {
    docKey: 'inf',
    title: 'numpy.inf - Infini',
    version: '1.24.3',
    libName: 'numpy',
    content: `# np.inf - Représente l'infini

Constante représentant l'infini positif en virgule flottante.

## Exemple

\`\`\`python
np.inf
float('inf')
-np.inf
\`\`\``,
    examples: `np.inf, -np.inf
test_df = test_df.replace([np.inf, -np.inf], np.nan)`,
  },
  'nan': {
    docKey: 'nan',
    title: 'numpy.nan - Pas un nombre (NaN)',
    version: '1.24.3',
    libName: 'numpy',
    content: `# np.nan - Valeur manquante

Représente une valeur non numérique ou manquante.

## Exemple

\`\`\`python
np.nan
pd.isna(np.nan)  # True
df = df.fillna(np.nan)
\`\`\``,
    examples: `np.nan
train_df = train_df.replace([np.inf, -np.inf], np.nan)`,
  },
  // ============ SKLEARN MODELS ============
  'LogisticRegression': {
    docKey: 'LogisticRegression',
    title: 'sklearn.linear_model.LogisticRegression',
    version: '1.3.2',
    libName: 'sklearn',
    content: `# LogisticRegression - Classification binaire/multi-classe

Modèle de régression logistique pour la classification supervisée.

## Paramètres

- **max_iter** : Nombre maximum d'itérations
- **random_state** : Seed pour la reproductibilité
- **C** : Inverse de la force de régularisation

## Exemple

\`\`\`python
from sklearn.linear_model import LogisticRegression

model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
\`\`\``,
    examples: `LogisticRegression(max_iter=1000)
pipeline = Pipeline([('model', LogisticRegression(max_iter=1000))])`,
  },
  'RandomForestClassifier': {
    docKey: 'RandomForestClassifier',
    title: 'sklearn.ensemble.RandomForestClassifier',
    version: '1.3.2',
    libName: 'sklearn',
    content: `# RandomForestClassifier - Ensemble tree-based

Classificateur basé sur une forêt d'arbres de décision aléatoires.

## Paramètres

- **n_estimators** : Nombre d'arbres (défaut: 100)
- **random_state** : Seed pour la reproductibilité
- **max_depth** : Profondeur maximale des arbres
- **min_samples_split** : Minimum de samples pour splitter

## Exemple

\`\`\`python
from sklearn.ensemble import RandomForestClassifier

rf = RandomForestClassifier(n_estimators=500, random_state=25)
rf.fit(X_train, y_train)
rf_pred = rf.predict(X_val)
\`\`\``,
    examples: `RandomForestClassifier(n_estimators=500, random_state=25)
rf = RandomForestClassifier(n_estimators=500, random_state=25)`,
  },
  'StandardScaler': {
    docKey: 'StandardScaler',
    title: 'sklearn.preprocessing.StandardScaler',
    version: '1.3.2',
    libName: 'sklearn',
    content: `# StandardScaler - Normaliser les features

Transforme les features en standardisant (moyenne=0, écart-type=1).

## Exemple

\`\`\`python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)  # Important: fit_transform seulement sur train
\`\`\``,
    examples: `StandardScaler()
scaler = StandardScaler()`,
  },
  'Pipeline': {
    docKey: 'Pipeline',
    title: 'sklearn.pipeline.Pipeline',
    version: '1.3.2',
    libName: 'sklearn',
    content: `# Pipeline - Enchaîner transformations et modèle

Pipeline automatise la séquence de transformations et de modélisation.

## Exemple

\`\`\`python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model', LogisticRegression(max_iter=1000))
])
pipeline.fit(X_train, y_train)
\`\`\``,
    examples: `Pipeline([('scaler', StandardScaler()), ('model', LogisticRegression())])
pipeline = Pipeline([('scaler', StandardScaler()), ('model', LogisticRegression(max_iter=1000))])`,
  },
  'train_test_split': {
    docKey: 'train_test_split',
    title: 'sklearn.model_selection.train_test_split',
    version: '1.3.2',
    libName: 'sklearn',
    content: `# train_test_split - Diviser données train/test

Divise les données en ensembles d'entraînement et de test.

## Paramètres

- **test_size** : Proportion du test set (défaut: 0.25)
- **random_state** : Seed pour la reproductibilité
- **stratify** : Stratifier selon une variable (important pour les données déséquilibrées)

## Exemple

\`\`\`python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
\`\`\``,
    examples: `train_test_split(X, y, test_size=0.2, stratify=y, random_state=25)
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, stratify=y, random_state=25)`,
  },
  'accuracy_score': {
    docKey: 'accuracy_score',
    title: 'sklearn.metrics.accuracy_score',
    version: '1.3.2',
    libName: 'sklearn',
    content: `# accuracy_score - Accuracy de classification

Calcule la précision globale d'un modèle de classification.

## Exemple

\`\`\`python
from sklearn.metrics import accuracy_score

accuracy = accuracy_score(y_true, y_pred)
print("Accuracy:", accuracy_score(y_val, y_pred))
\`\`\``,
    examples: `accuracy_score(y_val, y_pred)
print("Accuracy:", accuracy_score(y_val, y_pred))`,
  },
  'classification_report': {
    docKey: 'classification_report',
    title: 'sklearn.metrics.classification_report',
    version: '1.3.2',
    libName: 'sklearn',
    content: `# classification_report - Rapport détaillé

Retourne un rapport texte avec precision, recall, f1-score pour chaque classe.

## Exemple

\`\`\`python
from sklearn.metrics import classification_report

print(classification_report(y_true, y_pred))
\`\`\``,
    examples: `classification_report(y_val, y_pred)
print(classification_report(y_val, y_pred))`,
  },
  // ============ SEABORN ============
  'sns.heatmap': {
    docKey: 'sns.heatmap',
    title: 'seaborn.heatmap() - Carte de chaleur',
    version: '0.13.0',
    libName: 'seaborn',
    content: `# sns.heatmap() - Visualiser matrice sous forme de couleurs

Crée une carte de chaleur annotée pour visualiser des données matricielles.

## Paramètres

- **data** : Données 2D (DataFrame ou array)
- **annot** : Afficher les valeurs (True/False)
- **cmap** : Palette de couleurs
- **cbar** : Afficher la barre de couleur (True/False)
- **fmt** : Format des annotations

## Exemple

\`\`\`python
sns.heatmap(df.corr(), annot=True)
sns.heatmap(train_df.isna(), cbar=False)
\`\`\``,
    examples: `sns.heatmap(train_df.isna(), cbar=False)
sns.heatmap(df.corr(), annot=True, cmap='coolwarm')`,
  },
  'sns.histplot': {
    docKey: 'sns.histplot',
    title: 'seaborn.histplot() - Histogramme',
    version: '0.13.0',
    libName: 'seaborn',
    content: `# sns.histplot() - Visualiser distribution univariée

Crée un histogramme avec kde (kernel density estimation) optionnel.

## Paramètres

- **data** : DataFrame ou données
- **x** ou **y** : Colonne à visualiser
- **bins** : Nombre de bins (défaut: auto)
- **hue** : Colonne pour grouper par couleur
- **kde** : Ajouter une courbe de densité

## Exemple

\`\`\`python
sns.histplot(train_df['Age'], bins=30)
sns.histplot(data=train_df, x='Age', hue='Survived', kde=True)
\`\`\``,
    examples: `sns.histplot(train_df['Age'], bins=30)
sns.histplot(data=train_df, x='Age', hue='Survived', hue_order=[0, 1], bins=30, kde=True)`,
  },
  'sns.countplot': {
    docKey: 'sns.countplot',
    title: 'seaborn.countplot() - Comptage catégorique',
    version: '0.13.0',
    libName: 'seaborn',
    content: `# sns.countplot() - Compter les catégories

Crée un diagramme en barres montrant le nombre d'observations par catégorie.

## Exemple

\`\`\`python
sns.countplot(x='Sex', data=df)
sns.countplot(x='Embarked', data=train_df)
\`\`\``,
    examples: `sns.countplot(x='Embarked', data=train_df)
sns.countplot(x='Sex', data=train_df)`,
  },
  'sns.boxplot': {
    docKey: 'sns.boxplot',
    title: 'seaborn.boxplot() - Boîte à moustaches',
    version: '0.13.0',
    libName: 'seaborn',
    content: `# sns.boxplot() - Visualiser distribution par boîte

Affiche min, Q1, médiane, Q3, max et outliers.

## Paramètres

- **data** : DataFrame
- **x** / **y** : Variables à visualiser
- **hue** : Grouper par couleur
- **palette** : Couleurs
- **dodge** : Éviter le chevauchement

## Exemple

\`\`\`python
sns.boxplot(data=df, x='Survived', y='Age')
sns.boxplot(x='Pclass', y='Age', hue='Survived', data=train_df)
\`\`\``,
    examples: `sns.boxplot(data=train_df, x='Survived', y='Age', hue='Survived', palette=['red', 'green'], dodge=False)
sns.boxplot(x='Pclass', y='Age', hue='Survived', data=train_df)`,
  },
  'sns.barplot': {
    docKey: 'sns.barplot',
    title: 'seaborn.barplot() - Diagramme en barres',
    version: '0.13.0',
    libName: 'seaborn',
    content: `# sns.barplot() - Barplot avec estimation

Crée un diagramme en barres avec intervalles de confiance.

## Exemple

\`\`\`python
sns.barplot(x='Sex', y='Survived', data=df)
sns.barplot(x='Pclass', y='Survived', hue='Sex', data=train_df)
\`\`\``,
    examples: `sns.barplot(x='Sex', y='Survived', data=train_df)
sns.barplot(x='Pclass', y='Survived', hue='Sex', data=train_df)`,
  },
  // ============ MATPLOTLIB ============
  'plt.bar': {
    docKey: 'plt.bar',
    title: 'matplotlib.pyplot.bar() - Diagramme en barres',
    version: '3.8.1',
    libName: 'matplotlib',
    content: `# plt.bar() - Créer un diagramme en barres

Crée un diagramme en barres avec hauteurs spécifiées.

## Exemple

\`\`\`python
plt.bar(['A', 'B', 'C'], [1, 2, 3])
plt.bar(['Died', 'Survived'], counts, color=['red', 'green'])
\`\`\``,
    examples: `plt.bar(['Died', 'Survived'], counts, color=['red', 'green'])`,
  },
  'plt.xlabel': {
    docKey: 'plt.xlabel',
    title: 'matplotlib.pyplot.xlabel()',
    version: '3.8.1',
    libName: 'matplotlib',
    content: `# plt.xlabel() - Label de l'axe X

Défini le texte du label pour l'axe X.

## Exemple

\`\`\`python
plt.xlabel('Survival Status')
plt.ylabel('Passenger Count')
\`\`\``,
    examples: `plt.xlabel('Survival Status')
plt.xlabel('Age')`,
  },
  'plt.ylabel': {
    docKey: 'plt.ylabel',
    title: 'matplotlib.pyplot.ylabel()',
    version: '3.8.1',
    libName: 'matplotlib',
    content: `# plt.ylabel() - Label de l'axe Y

Défini le texte du label pour l'axe Y.

## Exemple

\`\`\`python
plt.ylabel('Passenger Count')
plt.ylabel('Fare')
\`\`\``,
    examples: `plt.ylabel('Passenger Count')
plt.ylabel('Age')`,
  },
  'plt.title': {
    docKey: 'plt.title',
    title: 'matplotlib.pyplot.title()',
    version: '3.8.1',
    libName: 'matplotlib',
    content: `# plt.title() - Titre du graphique

Défini le titre du graphique actuel.

## Exemple

\`\`\`python
plt.title('Survival Distribution')
plt.title('Age by Class and Survival (Females)')
\`\`\``,
    examples: `plt.title('Survival Distribution')
plt.title('Age Distribution by Survival Status')`,
  },
  'plt.show': {
    docKey: 'plt.show',
    title: 'matplotlib.pyplot.show()',
    version: '3.8.1',
    libName: 'matplotlib',
    content: `# plt.show() - Afficher le graphique

Affiche la figure et ses axes.

## Exemple

\`\`\`python
plt.plot([1, 2, 3])
plt.show()
\`\`\``,
    examples: `plt.show()`,
  },
  'plt.figure': {
    docKey: 'plt.figure',
    title: 'matplotlib.pyplot.figure()',
    version: '3.8.1',
    libName: 'matplotlib',
    content: `# plt.figure() - Créer une nouvelle figure

Crée une nouvelle figure avec les dimensions spécifiées.

## Paramètres

- **figsize** : Tuple (largeur, hauteur) en pouces
- **dpi** : Résolution en points par pouce
- **facecolor** : Couleur de fond

## Exemple

\`\`\`python
plt.figure(figsize=(10, 6))
plt.figure(figsize=(8, 4))
\`\`\``,
    examples: `plt.figure(figsize=(6, 4))
plt.figure(figsize=(8, 4))`,
  },
  'plt.yscale': {
    docKey: 'plt.yscale',
    title: 'matplotlib.pyplot.yscale()',
    version: '3.8.1',
    libName: 'matplotlib',
    content: `# plt.yscale() - Échelle de l'axe Y

Définit l'échelle de l'axe Y (linear, log, symlog, logit).

## Exemple

\`\`\`python
plt.yscale('log')
plt.yscale('linear')
\`\`\``,
    examples: `plt.yscale('log')`,
  },
  // ============ PYTHON BUILTINS ============
  'print': {
    docKey: 'print',
    title: 'print() - Afficher dans la console',
    version: '3.9+',
    libName: 'builtin',
    content: `# print() - Affiche des objets

Affiche les objets dans la sortie standard.

## Exemple

\`\`\`python
print("Hello")
print("Accuracy:", accuracy_score(y_val, y_pred))
\`\`\``,
    examples: `print("Accuracy:", accuracy_score(y_val, y_pred))
print(os.path.join(dirname, filename))`,
  },
  'len': {
    docKey: 'len',
    title: 'len() - Longueur d\'une séquence',
    version: '3.9+',
    libName: 'builtin',
    content: `# len() - Retourne la longueur

Retourne le nombre d'éléments dans une séquence.

## Exemple

\`\`\`python
len([1, 2, 3])  # 3
len(df)  # Nombre de lignes
\`\`\``,
    examples: `len(df)
len(X_train)`,
  },
  'enumerate': {
    docKey: 'enumerate',
    title: 'enumerate() - Énumérer avec index',
    version: '3.9+',
    libName: 'builtin',
    content: `# enumerate() - Index et élément

Retourne des tuples (index, élément) pour itérer.

## Exemple

\`\`\`python
for i, val in enumerate(list):
    print(i, val)
\`\`\``,
    examples: `for i, val in enumerate(data)`,
  },
  'range': {
    docKey: 'range',
    title: 'range() - Génère une séquence',
    version: '3.9+',
    libName: 'builtin',
    content: `# range() - Génère une séquence d'entiers

Retourne une séquence de nombres.

## Exemple

\`\`\`python
range(5)  # 0, 1, 2, 3, 4
list(range(3, 10, 2))  # [3, 5, 7, 9]
\`\`\``,
    examples: `range(len(data))
range(5)`,
  },
  'dict': {
    docKey: 'dict',
    title: 'dict() - Créer un dictionnaire',
    version: '3.9+',
    libName: 'builtin',
    content: `# dict() - Dictionnaire clé-valeur

Crée un dictionnaire vide ou à partir d'un mapping.

## Exemple

\`\`\`python
d = {}
d = dict(zip(keys, values))
mapping = {'0': 'Died', '1': 'Survived'}
\`\`\``,
    examples: `dict()
{'0': 'Died', '1': 'Survived'}`,
  },
  'list': {
    docKey: 'list',
    title: 'list() - Créer une liste',
    version: '3.9+',
    libName: 'builtin',
    content: `# list() - Objet liste

Crée une liste vide ou convertit une séquence.

## Exemple

\`\`\`python
l = []
l = list(range(10))
list(df.columns)
\`\`\``,
    examples: `list(range(10))
list(df.columns)`,
  },
  'zip': {
    docKey: 'zip',
    title: 'zip() - Zipper les séquences',
    version: '3.9+',
    libName: 'builtin',
    content: `# zip() - Combine plusieurs séquences

Agrège les éléments de plusieurs séquences.

## Exemple

\`\`\`python
for x, y in zip(list1, list2):
    print(x, y)
dict(zip(keys, values))
\`\`\``,
    examples: `zip(keys, values)`,
  },
  'int': {
    docKey: 'int',
    title: 'int() - Convertir en entier',
    version: '3.9+',
    libName: 'builtin',
    content: `# int() - Type entier

Convertit une valeur en entier.

## Exemple

\`\`\`python
int(3.14)  # 3
int("42")  # 42
\`\`\``,
    examples: `int()`,
  },
  'float': {
    docKey: 'float',
    title: 'float() - Convertir en flottant',
    version: '3.9+',
    libName: 'builtin',
    content: `# float() - Type flottant

Convertit une valeur en nombre flottant.

## Exemple

\`\`\`python
float(3)  # 3.0
float("3.14")  # 3.14
\`\`\``,
    examples: `float()`,
  },
  'str': {
    docKey: 'str',
    title: 'str() - Convertir en chaîne',
    version: '3.9+',
    libName: 'builtin',
    content: `# str() - Type chaîne de caractères

Convertit une valeur en chaîne.

## Exemple

\`\`\`python
str(42)  # "42"
str([1, 2, 3])  # "[1, 2, 3]"
\`\`\``,
    examples: `str()`,
  },
  'sorted': {
    docKey: 'sorted',
    title: 'sorted() - Trier une séquence',
    version: '3.9+',
    libName: 'builtin',
    content: `# sorted() - Retourne une liste triée

Trie une séquence et retourne une nouvelle liste.

## Exemple

\`\`\`python
sorted([3, 1, 2])  # [1, 2, 3]
sorted(items, reverse=True)
\`\`\``,
    examples: `sorted([3, 1, 2])`,
  },
  // ============ OS MODULE ============
  'os.walk': {
    docKey: 'os.walk',
    title: 'os.walk() - Parcourir répertoires',
    version: '3.9+',
    libName: 'os',
    content: `# os.walk() - Itérer récursivement sur les répertoires

Parcourt l'arborescence des répertoires en profondeur.

## Retour

Tuples de (dirpath, dirnames, filenames)

## Exemple

\`\`\`python
import os
for dirname, _, filenames in os.walk('/path'):
    for filename in filenames:
        print(os.path.join(dirname, filename))
\`\`\``,
    examples: `os.walk('/kaggle/input')
for dirname, _, filenames in os.walk('/kaggle/input'):`,
  },
  'os.path.join': {
    docKey: 'os.path.join',
    title: 'os.path.join() - Joindre chemins',
    version: '3.9+',
    libName: 'os',
    content: `# os.path.join() - Combine les chemins

Combine intelligemment les composants de chemin.

## Exemple

\`\`\`python
import os
path = os.path.join('/home', 'user', 'file.txt')
os.path.join(dirname, filename)
\`\`\``,
    examples: `os.path.join(dirname, filename)
os.path.join('/path/to', 'file')`,
  },
  // ============ WARNINGS MODULE ============
  'warnings.filterwarnings': {
    docKey: 'warnings.filterwarnings',
    title: 'warnings.filterwarnings() - Filtrer avertissements',
    version: '3.9+',
    libName: 'warnings',
    content: `# warnings.filterwarnings() - Contrôler les avertissements

Contrôle quels avertissements sont affichés.

## Paramètres

- **action** : 'ignore', 'always', 'error', 'default'
- **category** : Type d'avertissement (ex: FutureWarning)

## Exemple

\`\`\`python
import warnings
warnings.filterwarnings('ignore', category=FutureWarning)
\`\`\``,
    examples: `warnings.filterwarnings("ignore", category=FutureWarning)`,
  },
};

/**
 * Fonction helper pour obtenir la documentation d'un token
 */
export function getDocumentation(docKey: string): DocEntry | undefined {
  return completeMockDocs[docKey];
}
