/**
 * Documentation complète pour tous les tokens supportés
 * Couvre: pandas, numpy, sklearn, matplotlib, seaborn, jupyter, IPython
 */

import type { DocEntry } from '@/types/notebook';

export const completeMockDocs: Record<string, DocEntry> = {
  // ===== PANDAS =====
  'pandas': {
    docKey: 'pandas',
    title: 'pandas',
    version: '2.1.3',
    libName: 'pandas',
    content: `# Pandas - Python Data Analysis Library

Pandas est une bibliothèque Python pour la manipulation et l'analyse de données. Elle fournit des structures de données flexibles et performantes pour rendre le travail avec les données relationnelles et non-structurées simple et intuitif.

## Caractéristiques principales:
- DataFrame: structure 2D pour représenter des données tabulaires
- Series: tableau 1D avec index
- Opérations de lecture/écriture pour plusieurs formats (CSV, Excel, SQL, JSON)
- Agrégation, transformation, nettoyage de données
- Manipulation des données temporelles

## Installation:
\`\`\`bash
pip install pandas
\`\`\`

## Usage basique:
\`\`\`python
import pandas as pd
df = pd.read_csv('data.csv')
df.describe()
\`\`\``,
    examples: [
      'import pandas as pd',
      'df = pd.read_csv("file.csv")',
      'df.head()',
      'df.describe()',
    ],
  },
  'pandas.read_csv': {
    docKey: 'pandas.read_csv',
    title: 'pandas.read_csv()',
    version: '2.1.3',
    libName: 'pandas',
    content: `# pandas.read_csv()

Lit un fichier CSV dans un DataFrame pandas.

## Signature:
\`\`\`python
pd.read_csv(
    filepath_or_buffer,
    sep=',',
    delimiter=None,
    header='infer',
    names=None,
    index_col=None,
    usecols=None,
    dtype=None,
    ...
)
\`\`\`

## Paramètres principaux:
- **filepath_or_buffer**: URL, chemin fichier ou objet fichier
- **sep**: Séparateur à utiliser (par défaut ',')
- **header**: Ligne numéro à utiliser comme noms de colonnes
- **names**: Liste des noms de colonnes
- **index_col**: Colonne(s) à utiliser comme index
- **usecols**: Sous-ensemble de colonnes à charger
- **dtype**: Type de données pour les colonnes

## Exemples:
\`\`\`python
# Lecture basique
df = pd.read_csv('data.csv')

# Spécifier le séparateur
df = pd.read_csv('data.tsv', sep='\t')

# Définir l'index
df = pd.read_csv('data.csv', index_col='id')

# Charger colonnes spécifiques
df = pd.read_csv('data.csv', usecols=['col1', 'col2'])
\`\`\``,
    examples: [
      'pd.read_csv("data.csv")',
      'pd.read_csv("data.tsv", sep="\\t")',
      'pd.read_csv("data.csv", usecols=["col1", "col2"])',
    ],
  },
  'pandas.DataFrame': {
    docKey: 'pandas.DataFrame',
    title: 'pandas.DataFrame',
    version: '2.1.3',
    libName: 'pandas',
    content: `# pandas.DataFrame

Structure 2D mutable, hétérogène avec axes étiquetés (lignes et colonnes).

## Création:
\`\`\`python
# À partir d'un dictionnaire
df = pd.DataFrame({'col1': [1, 2], 'col2': [3, 4]})

# À partir d'une liste de listes
df = pd.DataFrame([[1, 2], [3, 4]], columns=['col1', 'col2'])

# À partir d'un array NumPy
df = pd.DataFrame(np.array([[1, 2], [3, 4]]))
\`\`\`

## Attributs principaux:
- **shape**: Dimensions (rows, columns)
- **columns**: Noms des colonnes
- **index**: Index des lignes
- **values**: Valeurs sous forme d'array NumPy

## Méthodes principales:
- **head()**: Premiers N lignes
- **tail()**: Derniers N lignes
- **describe()**: Statistiques descriptives
- **info()**: Informations générales
- **drop()**: Supprimer lignes/colonnes
- **loc[]**: Accès par étiquette
- **iloc[]**: Accès par position`,
    examples: [
      'df = pd.DataFrame({"A": [1, 2, 3], "B": [4, 5, 6]})',
      'df.head()',
      'df.describe()',
      'df.loc[0]',
    ],
  },
  'pandas.drop': {
    docKey: 'pandas.drop',
    title: 'DataFrame.drop()',
    version: '2.1.3',
    libName: 'pandas',
    content: `# DataFrame.drop()

Supprime les lignes ou colonnes spécifiées.

## Signature:
\`\`\`python
DataFrame.drop(
    labels=None,
    axis=0,
    index=None,
    columns=None,
    level=None,
    inplace=False,
    errors='raise'
)
\`\`\`

## Paramètres:
- **labels**: Index ou nom de colonne à supprimer
- **axis**: 0 pour lignes, 1 pour colonnes
- **index**: Lignes à supprimer (alternative à labels avec axis=0)
- **columns**: Colonnes à supprimer (alternative à labels avec axis=1)
- **inplace**: Modifier le DataFrame original
- **errors**: 'raise' ou 'ignore'

## Exemples:
\`\`\`python
# Supprimer une colonne
df.drop('col_name', axis=1)
df.drop(columns=['col1', 'col2'])

# Supprimer une ligne
df.drop(0, axis=0)
df.drop(index=[0, 1, 2])

# Modifier sur place
df.drop('col_name', axis=1, inplace=True)
\`\`\``,
    examples: [
      'df.drop("col_name", axis=1)',
      'df.drop(columns=["col1", "col2"])',
      'df.drop(0)',
    ],
  },
  'pandas.Series': {
    docKey: 'pandas.Series',
    title: 'pandas.Series',
    version: '2.1.3',
    libName: 'pandas',
    content: `# pandas.Series

Tableau 1D mutable avec index, capable de contenir plusieurs types de données.

## Création:
\`\`\`python
# À partir d'une liste
s = pd.Series([1, 2, 3])

# À partir d'un dictionnaire
s = pd.Series({'a': 1, 'b': 2, 'c': 3})

# Avec index personnalisé
s = pd.Series([1, 2, 3], index=['a', 'b', 'c'])
\`\`\`

## Attributs:
- **values**: Valeurs sous-jacentes
- **index**: Index de la série
- **dtype**: Type de données
- **name**: Nom de la série

## Méthodes courantes:
- **mean()**: Moyenne
- **sum()**: Somme
- **value_counts()**: Compte occurrences
- **sort_values()**: Trie les valeurs
- **apply()**: Applique une fonction`,
    examples: [
      's = pd.Series([1, 2, 3])',
      's = pd.Series({"a": 1, "b": 2})',
      's.mean()',
      's.value_counts()',
    ],
  },
  'pandas.concat': {
    docKey: 'pandas.concat',
    title: 'pandas.concat()',
    version: '2.1.3',
    libName: 'pandas',
    content: `# pandas.concat()

Concatène objets pandas (DataFrames ou Series).

## Signature:
\`\`\`python
pd.concat(
    objs,
    axis=0,
    ignore_index=False,
    join='outer',
    keys=None,
    levels=None,
    names=None,
    verify_integrity=False,
    copy=None
)
\`\`\`

## Paramètres:
- **objs**: Sequence de DataFrames/Series
- **axis**: 0 pour lignes, 1 pour colonnes
- **ignore_index**: Ignore index et crée nouveau
- **join**: 'outer' (union) ou 'inner' (intersection)
- **keys**: Pour créer index hiérarchique

## Exemples:
\`\`\`python
# Concatener verticalement
df_result = pd.concat([df1, df2])

# Concatener horizontalement
df_result = pd.concat([df1, df2], axis=1)

# Ignorer l'index
df_result = pd.concat([df1, df2], ignore_index=True)
\`\`\``,
    examples: [
      'pd.concat([df1, df2])',
      'pd.concat([df1, df2], axis=1)',
      'pd.concat([s1, s2], ignore_index=True)',
    ],
  },
  'pandas.merge': {
    docKey: 'pandas.merge',
    title: 'pandas.merge()',
    version: '2.1.3',
    libName: 'pandas',
    content: `# pandas.merge()

Fusionne deux DataFrames sur les colonnes ou index.

## Signature:
\`\`\`python
pd.merge(
    left,
    right,
    how='inner',
    on=None,
    left_on=None,
    right_on=None,
    left_index=False,
    right_index=False,
    suffixes=('_x', '_y'),
    indicator=False,
    validate=None
)
\`\`\`

## Paramètres:
- **how**: 'inner', 'outer', 'left', 'right'
- **on**: Colonne commune pour la fusion
- **left_on/right_on**: Colonnes spécifiques
- **suffixes**: Suffixes pour colonnes dupliquées

## Exemples:
\`\`\`python
# Fusion interne
merged = pd.merge(df1, df2, on='key')

# Fusion externe
merged = pd.merge(df1, df2, how='outer', on='id')

# Fusion sur colonnes différentes
merged = pd.merge(df1, df2, left_on='id_1', right_on='id_2')
\`\`\``,
    examples: [
      'pd.merge(df1, df2, on="key")',
      'pd.merge(df1, df2, how="left", on="id")',
    ],
  },

  // ===== NUMPY =====
  'numpy': {
    docKey: 'numpy',
    title: 'NumPy',
    version: '1.24.3',
    libName: 'numpy',
    content: `# NumPy - Numerical Computing Library

NumPy est la bibliothèque de base pour le calcul scientifique en Python. Elle fournit:
- N-dimensional arrays
- Opérations mathématiques et statistiques
- Algèbre linéaire
- Génération de nombres aléatoires

## Installation:
\`\`\`bash
pip install numpy
\`\`\`

## Usage basique:
\`\`\`python
import numpy as np
arr = np.array([1, 2, 3])
arr2d = np.array([[1, 2], [3, 4]])
\`\`\``,
    examples: ['import numpy as np', 'np.array([1, 2, 3])', 'np.zeros(10)'],
  },
  'numpy.array': {
    docKey: 'numpy.array',
    title: 'numpy.array()',
    version: '1.24.3',
    libName: 'numpy',
    content: `# numpy.array()

Crée un array NumPy à partir d'une liste ou d'autres données.

## Signature:
\`\`\`python
numpy.array(
    object,
    dtype=None,
    *,
    copy=True,
    order='K',
    subok=False,
    ndmin=0,
    like=None
)
\`\`\`

## Paramètres:
- **object**: Données sources (liste, tuple, array)
- **dtype**: Type de données (int32, float64, etc)
- **copy**: Copier ou référencer les données

## Exemples:
\`\`\`python
# 1D array
arr = np.array([1, 2, 3])

# 2D array
arr2d = np.array([[1, 2], [3, 4]])

# Spécifier le dtype
arr = np.array([1, 2, 3], dtype=float)
\`\`\``,
    examples: ['np.array([1, 2, 3])', 'np.array([[1, 2], [3, 4]])', 'np.array([1, 2], dtype=float)'],
  },
  'numpy.unique': {
    docKey: 'numpy.unique',
    title: 'numpy.unique()',
    version: '1.24.3',
    libName: 'numpy',
    content: `# numpy.unique()

Retourne les éléments uniques d'un array.

## Signature:
\`\`\`python
numpy.unique(ar, return_index=False, return_inverse=False, return_counts=False, axis=None, *, equal_nan=False)
\`\`\`

## Paramètres:
- **ar**: Array d'entrée
- **return_index**: Retourner les index des premiers occurrences
- **return_inverse**: Retourner les index pour reconstruire l'array original
- **return_counts**: Retourner le nombre d'occurrences

## Exemples:
\`\`\`python
# Éléments uniques
np.unique([1, 2, 2, 3, 3, 3])
# Output: array([1, 2, 3])

# Avec comptages
unique_vals, counts = np.unique([1, 2, 2, 3], return_counts=True)
\`\`\``,
    examples: ['np.unique([1, 2, 2, 3])', 'np.unique(arr, return_counts=True)'],
  },
  'numpy.zeros': {
    docKey: 'numpy.zeros',
    title: 'numpy.zeros()',
    version: '1.24.3',
    libName: 'numpy',
    content: `# numpy.zeros()

Crée un array rempli de zéros.

## Signature:
\`\`\`python
numpy.zeros(shape, dtype=None, order='C', *, like=None)
\`\`\`

## Paramètres:
- **shape**: Forme du nouvel array (int ou tuple d'ints)
- **dtype**: Type de données
- **order**: 'C' (row-major) ou 'F' (column-major)

## Exemples:
\`\`\`python
# 1D array de 5 zéros
np.zeros(5)

# 2D array 3x4 de zéros
np.zeros((3, 4))

# Avec type spécifique
np.zeros(5, dtype=int)
\`\`\``,
    examples: ['np.zeros(5)', 'np.zeros((3, 4))', 'np.zeros(10, dtype=int)'],
  },
  'numpy.ones': {
    docKey: 'numpy.ones',
    title: 'numpy.ones()',
    version: '1.24.3',
    libName: 'numpy',
    content: `# numpy.ones()

Crée un array rempli de uns.

## Signature:
\`\`\`python
numpy.ones(shape, dtype=None, order='C', *, like=None)
\`\`\`

## Exemples:
\`\`\`python
# Array 1D de 5 uns
np.ones(5)

# Array 2D 3x3 de uns
np.ones((3, 3))

# Avec type float
np.ones(5, dtype=float)
\`\`\``,
    examples: ['np.ones(5)', 'np.ones((3, 3))', 'np.ones(5, dtype=float)'],
  },

  // ===== SKLEARN =====
  'sklearn': {
    docKey: 'sklearn',
    title: 'scikit-learn',
    version: '1.3.0',
    libName: 'sklearn',
    content: `# scikit-learn - Machine Learning Library

scikit-learn est une bibliothèque pour le machine learning en Python. Elle propose:
- Classification, regression, clustering
- Extraction de features, sélection
- Pré-traitement et normalisation
- Évaluation de modèles
- Pipelines d'apprentissage

## Installation:
\`\`\`bash
pip install scikit-learn
\`\`\`

## Modules principaux:
- \`sklearn.datasets\`: Datasets d'exemple
- \`sklearn.model_selection\`: Division train/test, cross-validation
- \`sklearn.preprocessing\`: Normalisation, scaling
- \`sklearn.svm\`: Support Vector Machines
- \`sklearn.ensemble\`: Random Forests, Gradient Boosting
- \`sklearn.metrics\`: Évaluation`,
    examples: [
      'from sklearn import datasets',
      'from sklearn.model_selection import train_test_split',
      'from sklearn.preprocessing import StandardScaler',
    ],
  },
  'sklearn.datasets.load_iris': {
    docKey: 'sklearn.datasets.load_iris',
    title: 'sklearn.datasets.load_iris()',
    version: '1.3.0',
    libName: 'sklearn',
    content: `# sklearn.datasets.load_iris()

Charge le dataset Iris (150 échantillons de 3 espèces d'iris).

## Signature:
\`\`\`python
sklearn.datasets.load_iris(*, return_X_y=False, as_frame=False)
\`\`\`

## Paramètres:
- **return_X_y**: Si True, retourne (X, y) sinon un Bunch
- **as_frame**: Si True, retourne pandas DataFrame/Series

## Retour:
- Dataset Iris avec 150 échantillons, 4 features, 3 classes

## Exemples:
\`\`\`python
from sklearn.datasets import load_iris

# Charger le dataset
iris = load_iris()
X, y = iris.data, iris.target

# Ou avec DataFrames
iris_df = load_iris(as_frame=True)
df = iris_df.frame
\`\`\``,
    examples: [
      'from sklearn.datasets import load_iris',
      'iris = load_iris()',
      'X, y = load_iris(return_X_y=True)',
    ],
  },
  'sklearn.model_selection.train_test_split': {
    docKey: 'sklearn.model_selection.train_test_split',
    title: 'sklearn.model_selection.train_test_split()',
    version: '1.3.0',
    libName: 'sklearn',
    content: `# sklearn.model_selection.train_test_split()

Divise les données en ensembles d'entraînement et de test.

## Signature:
\`\`\`python
sklearn.model_selection.train_test_split(
    *arrays,
    test_size=None,
    train_size=None,
    random_state=None,
    shuffle=True,
    stratify=None
)
\`\`\`

## Paramètres:
- **test_size**: Fraction des données pour le test (défaut 0.25)
- **random_state**: Seed pour la reproductibilité
- **shuffle**: Mélanger les données
- **stratify**: Stratifier par cette colonne

## Exemples:
\`\`\`python
from sklearn.model_selection import train_test_split

# Division 80/20
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Stratification pour classification
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)
\`\`\``,
    examples: [
      'X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)',
      'train_test_split(X, y, random_state=42)',
      'train_test_split(X, y, stratify=y)',
    ],
  },
  'sklearn.preprocessing.StandardScaler': {
    docKey: 'sklearn.preprocessing.StandardScaler',
    title: 'sklearn.preprocessing.StandardScaler',
    version: '1.3.0',
    libName: 'sklearn',
    content: `# sklearn.preprocessing.StandardScaler

Normalise les features à moyenne 0 et variance 1.

## Usage:
\`\`\`python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
\`\`\`

## Méthodes:
- **fit()**: Apprendre la moyenne et l'écart-type
- **transform()**: Appliquer la normalisation
- **fit_transform()**: Apprendre et transformer en une étape`,
    examples: [
      'scaler = StandardScaler()',
      'X_scaled = scaler.fit_transform(X)',
      'X_test_scaled = scaler.transform(X_test)',
    ],
  },
  'sklearn.svm.SVC': {
    docKey: 'sklearn.svm.SVC',
    title: 'sklearn.svm.SVC',
    version: '1.3.0',
    libName: 'sklearn',
    content: `# sklearn.svm.SVC

Support Vector Machine pour la classification.

## Usage:
\`\`\`python
from sklearn.svm import SVC

model = SVC(kernel='rbf', C=1.0, gamma='scale')
model.fit(X_train, y_train)
predictions = model.predict(X_test)
\`\`\`

## Paramètres:
- **kernel**: 'linear', 'poly', 'rbf', 'sigmoid'
- **C**: Paramètre de régularisation
- **gamma**: Coefficient du kernel

## Méthodes:
- **fit()**: Entraîner le modèle
- **predict()**: Prédictions
- **score()**: Exactitude`,
    examples: [
      'model = SVC(kernel="rbf")',
      'model.fit(X_train, y_train)',
      'predictions = model.predict(X_test)',
    ],
  },
  'sklearn.ensemble.RandomForestClassifier': {
    docKey: 'sklearn.ensemble.RandomForestClassifier',
    title: 'sklearn.ensemble.RandomForestClassifier',
    version: '1.3.0',
    libName: 'sklearn',
    content: `# sklearn.ensemble.RandomForestClassifier

Random Forest pour la classification.

## Usage:
\`\`\`python
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
predictions = model.predict(X_test)
\`\`\`

## Paramètres:
- **n_estimators**: Nombre d'arbres
- **max_depth**: Profondeur maximale
- **random_state**: Seed pour reproductibilité

## Méthodes:
- **fit()**: Entraîner
- **predict()**: Prédictions
- **predict_proba()**: Probabilités`,
    examples: [
      'model = RandomForestClassifier(n_estimators=100)',
      'model.fit(X_train, y_train)',
      'predictions = model.predict(X_test)',
    ],
  },
  'sklearn.metrics.accuracy_score': {
    docKey: 'sklearn.metrics.accuracy_score',
    title: 'sklearn.metrics.accuracy_score()',
    version: '1.3.0',
    libName: 'sklearn',
    content: `# sklearn.metrics.accuracy_score()

Calcule la précision (exactitude) de la classification.

## Signature:
\`\`\`python
sklearn.metrics.accuracy_score(y_true, y_pred, normalize=True)
\`\`\`

## Paramètres:
- **y_true**: Labels vrais
- **y_pred**: Labels prédits
- **normalize**: Si True, retourne une fraction; sinon le nombre correct

## Exemples:
\`\`\`python
from sklearn.metrics import accuracy_score

accuracy = accuracy_score(y_test, predictions)
print(f"Accuracy: {accuracy:.2%}")
\`\`\``,
    examples: [
      'accuracy_score(y_test, predictions)',
      'accuracy = accuracy_score(y_true, y_pred)',
    ],
  },
  'sklearn.metrics.confusion_matrix': {
    docKey: 'sklearn.metrics.confusion_matrix',
    title: 'sklearn.metrics.confusion_matrix()',
    version: '1.3.0',
    libName: 'sklearn',
    content: `# sklearn.metrics.confusion_matrix()

Calcule la matrice de confusion pour l'évaluation.

## Signature:
\`\`\`python
sklearn.metrics.confusion_matrix(y_true, y_pred, labels=None)
\`\`\`

## Retour:
Matrice C où C[i, j] est le nombre d'observations prédites comme j mais de classe i.

## Exemples:
\`\`\`python
from sklearn.metrics import confusion_matrix

cm = confusion_matrix(y_test, predictions)
print(cm)
\`\`\``,
    examples: ['confusion_matrix(y_test, predictions)', 'cm = confusion_matrix(y_true, y_pred)'],
  },
  'sklearn.metrics.classification_report': {
    docKey: 'sklearn.metrics.classification_report',
    title: 'sklearn.metrics.classification_report()',
    version: '1.3.0',
    libName: 'sklearn',
    content: `# sklearn.metrics.classification_report()

Génère un rapport de classification texte.

## Signature:
\`\`\`python
sklearn.metrics.classification_report(y_true, y_pred, target_names=None, digits=2)
\`\`\`

## Retour:
Chaîne texte avec precision, recall, f1-score pour chaque classe.

## Exemples:
\`\`\`python
from sklearn.metrics import classification_report

report = classification_report(y_test, predictions)
print(report)
\`\`\``,
    examples: [
      'classification_report(y_test, predictions)',
      'print(classification_report(y_true, y_pred))',
    ],
  },

  // ===== MATPLOTLIB =====
  'matplotlib': {
    docKey: 'matplotlib',
    title: 'Matplotlib',
    version: '3.7.2',
    libName: 'matplotlib',
    content: `# Matplotlib - Plotting Library

Matplotlib est une bibliothèque pour créer des visualisations statiques, animées et interactives en Python.

## Installation:
\`\`\`bash
pip install matplotlib
\`\`\`

## Modules principaux:
- \`matplotlib.pyplot\`: Interface MATLAB-like
- \`matplotlib.figure\`: Figure et axes
- \`matplotlib.patches\`: Éléments graphiques

## Exemple basique:
\`\`\`python
import matplotlib.pyplot as plt

plt.plot([1, 2, 3], [1, 4, 9])
plt.show()
\`\`\``,
    examples: ['import matplotlib.pyplot as plt', 'plt.plot([1, 2, 3])', 'plt.show()'],
  },
  'matplotlib.pyplot.figure': {
    docKey: 'matplotlib.pyplot.figure',
    title: 'matplotlib.pyplot.figure()',
    version: '3.7.2',
    libName: 'matplotlib',
    content: `# matplotlib.pyplot.figure()

Crée une nouvelle figure.

## Signature:
\`\`\`python
matplotlib.pyplot.figure(
    figsize=None,
    dpi=None,
    facecolor=None,
    edgecolor=None,
    frameon=True,
    FigureClass=Figure,
    clear=False
)
\`\`\`

## Paramètres:
- **figsize**: Taille en pouces (width, height)
- **dpi**: Résolution
- **facecolor**: Couleur de fond

## Exemples:
\`\`\`python
fig = plt.figure(figsize=(10, 6))
fig, ax = plt.subplots(figsize=(12, 8))
\`\`\``,
    examples: ['fig = plt.figure(figsize=(10, 6))', 'fig, ax = plt.subplots()'],
  },
  'matplotlib.pyplot.plot': {
    docKey: 'matplotlib.pyplot.plot',
    title: 'matplotlib.pyplot.plot()',
    version: '3.7.2',
    libName: 'matplotlib',
    content: `# matplotlib.pyplot.plot()

Trace une ligne ou des markers.

## Signature:
\`\`\`python
matplotlib.pyplot.plot(*args, scalex=True, scaley=True, data=None, **kwargs)
\`\`\`

## Paramètres courants:
- **color**: Couleur ('r', 'b', 'g', etc.)
- **linestyle**: Style de ligne ('-', '--', '-.', ':')
- **marker**: Marqueur ('o', 's', '^', etc.)
- **label**: Étiquette pour la légende

## Exemples:
\`\`\`python
plt.plot([1, 2, 3], [1, 4, 9], label='y=x²')
plt.plot(x, y, 'r--o', label='Data')
plt.legend()
\`\`\``,
    examples: [
      'plt.plot([1, 2, 3], [1, 4, 9])',
      'plt.plot(x, y, "r--o")',
      'plt.plot(x, y, label="data")',
    ],
  },
  'matplotlib.pyplot.show': {
    docKey: 'matplotlib.pyplot.show',
    title: 'matplotlib.pyplot.show()',
    version: '3.7.2',
    libName: 'matplotlib',
    content: `# matplotlib.pyplot.show()

Affiche la figure.

## Usage:
\`\`\`python
import matplotlib.pyplot as plt

plt.plot([1, 2, 3], [1, 4, 9])
plt.show()
\`\`\``,
    examples: ['plt.show()', 'plt.plot(...); plt.show()'],
  },
  'matplotlib.pyplot.scatter': {
    docKey: 'matplotlib.pyplot.scatter',
    title: 'matplotlib.pyplot.scatter()',
    version: '3.7.2',
    libName: 'matplotlib',
    content: `# matplotlib.pyplot.scatter()

Trace un scatter plot (nuage de points).

## Signature:
\`\`\`python
matplotlib.pyplot.scatter(x, y, s=None, c=None, marker='o', cmap=None, **kwargs)
\`\`\`

## Paramètres:
- **x, y**: Coordonnées
- **s**: Taille des points
- **c**: Couleur (scalaire, array, ou colormap)
- **marker**: Style de marqueur
- **cmap**: Colormap

## Exemples:
\`\`\`python
plt.scatter(X[:, 0], X[:, 1], c=y, cmap='viridis')
plt.scatter(x, y, s=100, alpha=0.5)
\`\`\``,
    examples: [
      'plt.scatter([1, 2, 3], [1, 2, 3])',
      'plt.scatter(X[:, 0], X[:, 1], c=y)',
    ],
  },

  // ===== SEABORN =====
  'seaborn': {
    docKey: 'seaborn',
    title: 'Seaborn',
    version: '0.13.0',
    libName: 'seaborn',
    content: `# Seaborn - Statistical Data Visualization

Seaborn est une bibliothèque de visualisation de données basée sur Matplotlib. Elle simplifie la création de graphiques statistiques.

## Installation:
\`\`\`bash
pip install seaborn
\`\`\`

## Caractéristiques:
- Interface DataFrame-compatible
- Palettes de couleurs par défaut attractives
- Visualisations multivariées
- Intégration avec pandas

## Exemple:
\`\`\`python
import seaborn as sns
import matplotlib.pyplot as plt

sns.scatterplot(data=df, x='x', y='y', hue='class')
plt.show()
\`\`\``,
    examples: [
      'import seaborn as sns',
      'sns.scatterplot(data=df, x="x", y="y")',
      'sns.heatmap(data)',
    ],
  },
  'seaborn.heatmap': {
    docKey: 'seaborn.heatmap',
    title: 'seaborn.heatmap()',
    version: '0.13.0',
    libName: 'seaborn',
    content: `# seaborn.heatmap()

Trace une heatmap (carte de chaleur).

## Signature:
\`\`\`python
seaborn.heatmap(
    data,
    vmin=None,
    vmax=None,
    cmap=None,
    center=None,
    annot=False,
    fmt='.2g',
    linewidths=0,
    cbar_kws=None,
    **kwargs
)
\`\`\`

## Paramètres:
- **data**: Array 2D
- **cmap**: Colormap
- **annot**: Afficher les valeurs
- **fmt**: Format des annotations
- **linewidths**: Largeur des lignes

## Exemples:
\`\`\`python
sns.heatmap(confusion_matrix, annot=True, cmap='Blues')
sns.heatmap(df.corr(), cmap='coolwarm', center=0)
\`\`\``,
    examples: [
      'sns.heatmap(data)',
      'sns.heatmap(data, annot=True, cmap="Blues")',
      'sns.heatmap(df.corr())',
    ],
  },
  'seaborn.scatterplot': {
    docKey: 'seaborn.scatterplot',
    title: 'seaborn.scatterplot()',
    version: '0.13.0',
    libName: 'seaborn',
    content: `# seaborn.scatterplot()

Trace un scatter plot amélioré avec seaborn.

## Signature:
\`\`\`python
seaborn.scatterplot(
    data=None,
    x=None,
    y=None,
    hue=None,
    size=None,
    style=None,
    palette=None,
    hue_order=None,
    size_order=None,
    sizes=(20, 200),
    **kwargs
)
\`\`\`

## Paramètres:
- **data**: DataFrame
- **x, y**: Noms de colonnes
- **hue**: Colorer par colonne
- **size**: Taille par colonne
- **style**: Style par colonne

## Exemples:
\`\`\`python
sns.scatterplot(data=iris, x='sepal_length', y='sepal_width', hue='species')
sns.scatterplot(data=df, x='A', y='B', size='C', hue='D')
\`\`\``,
    examples: [
      'sns.scatterplot(data=df, x="A", y="B")',
      'sns.scatterplot(data=iris, x="sepal_length", y="sepal_width", hue="species")',
    ],
  },
  'seaborn.boxplot': {
    docKey: 'seaborn.boxplot',
    title: 'seaborn.boxplot()',
    version: '0.13.0',
    libName: 'seaborn',
    content: `# seaborn.boxplot()

Trace un box plot.

## Signature:
\`\`\`python
seaborn.boxplot(
    data=None,
    x=None,
    y=None,
    hue=None,
    palette=None,
    **kwargs
)
\`\`\`

## Exemples:
\`\`\`python
sns.boxplot(data=iris, x='species', y='sepal_length')
sns.boxplot(data=df, y='values')
\`\`\``,
    examples: ['sns.boxplot(data=df, x="cat", y="val")', 'sns.boxplot(data=iris, x="species", y="sepal_length")'],
  },
  'seaborn.barplot': {
    docKey: 'seaborn.barplot',
    title: 'seaborn.barplot()',
    version: '0.13.0',
    libName: 'seaborn',
    content: `# seaborn.barplot()

Trace un bar plot.

## Signature:
\`\`\`python
seaborn.barplot(
    data=None,
    x=None,
    y=None,
    hue=None,
    palette=None,
    estimator=mean,
    **kwargs
)
\`\`\`

## Exemples:
\`\`\`python
sns.barplot(data=iris, x='species', y='sepal_length')
sns.barplot(data=df, x='category', y='value', hue='group')
\`\`\``,
    examples: [
      'sns.barplot(data=df, x="cat", y="val")',
      'sns.barplot(data=iris, x="species", y="sepal_length")',
    ],
  },

  // ===== JUPYTER & IPYTHON =====
  'jupyter': {
    docKey: 'jupyter',
    title: 'Jupyter',
    version: '1.0.0',
    libName: 'jupyter',
    content: `# Jupyter - Interactive Computing

Jupyter est une application open-source pour créer et partager des documents contenant du code, des équations, des visualisations et du texte narratif.

## Installation:
\`\`\`bash
pip install jupyter
\`\`\`

## Lancement:
\`\`\`bash
jupyter notebook
jupyter lab
\`\`\``,
    examples: ['jupyter notebook', 'jupyter lab'],
  },
  'IPython': {
    docKey: 'IPython',
    title: 'IPython',
    version: '8.16.0',
    libName: 'IPython',
    content: `# IPython - Interactive Shell

IPython est un shell Python interactif amélioré.

## Installation:
\`\`\`bash
pip install ipython
\`\`\`

## Usage:
\`\`\`bash
ipython
\`\`\``,
    examples: ['ipython', 'from IPython.display import display'],
  },
  'IPython.display': {
    docKey: 'IPython.display',
    title: 'IPython.display',
    version: '8.16.0',
    libName: 'IPython',
    content: `# IPython.display

Module pour afficher des contenus riches dans Jupyter.

## Fonctions courantes:
- **display()**: Affiche un objet
- **HTML()**: Affiche du HTML
- **Image()**: Affiche une image
- **Markdown()**: Affiche du Markdown
- **Code()**: Affiche du code avec surlignage

## Exemples:
\`\`\`python
from IPython.display import display, HTML, Image

display(HTML("<h1>Title</h1>"))
display(Image('image.png'))
\`\`\``,
    examples: ['from IPython.display import display', 'display(HTML("<h1>Title</h1>"))'],
  },

  // ===== SKLEARN - PIPELINE =====
  'sklearn.pipeline.Pipeline': {
    docKey: 'sklearn.pipeline.Pipeline',
    title: 'sklearn.pipeline.Pipeline',
    version: '1.3.0',
    libName: 'sklearn',
    content: `# sklearn.pipeline.Pipeline

Construit un pipeline pour enchaîner plusieurs étapes de prétraitement et d'estimation.

## Usage:
\`\`\`python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model', LogisticRegression())
])

pipeline.fit(X_train, y_train)
predictions = pipeline.predict(X_test)
\`\`\`

## Avantages:
- Encapsule le preprocessing et la modélisation
- Évite les fuites de données
- Simplifie le code
- Améliore la reproductibilité`,
    examples: [
      'from sklearn.pipeline import Pipeline',
      'pipeline = Pipeline([(\'scaler\', StandardScaler()), (\'model\', LogisticRegression())])',
      'pipeline.fit(X_train, y_train)',
    ],
  },


  // ===== SKLEARN - MODEL SELECTION =====
  'sklearn.model_selection.train_test_split': {
    docKey: 'sklearn.model_selection.train_test_split',
    title: 'sklearn.model_selection.train_test_split()',
    version: '1.3.0',
    libName: 'sklearn',
    content: `# sklearn.model_selection.train_test_split()
  
Divise les données en ensembles d'entraînement et de test.

## Signature:
\`\`\`python
sklearn.model_selection.train_test_split(
    *arrays,
    test_size=None,
    train_size=None,
    random_state=None,
    shuffle=True,
    stratify=None
)
\`\`\`

## Paramètres:
- **test_size**: Fraction des données pour le test (défaut 0.25)
- **random_state**: Seed pour la reproductibilité
- **shuffle**: Mélanger les données
- **stratify**: Stratifier par cette colonne (utile pour classification déséquilibrée)

## Exemples:
\`\`\`python
from sklearn.model_selection import train_test_split

# Division 80/20 avec stratification
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)
\`\`\``,
    examples: [
      'X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)',
      'train_test_split(X, y, random_state=42, stratify=y)',
    ],
  },

  // ===== WARNINGS =====
  'warnings': {
    docKey: 'warnings',
    title: 'warnings',
    version: '3.11',
    libName: 'warnings',
    content: `# warnings - Gestion des avertissements

Le module warnings contrôle l'affichage des avertissements Python.

## Usage:
\`\`\`python
import warnings

# Supprimer tous les avertissements
warnings.filterwarnings('ignore')

# Supprimer des avertissements spécifiques
warnings.filterwarnings('ignore', category=FutureWarning)
warnings.filterwarnings('ignore', category=DeprecationWarning)

# Afficher les avertissements
warnings.filterwarnings('default')

# Lancer une erreur sur les avertissements
warnings.filterwarnings('error')
\`\`\`

## Catégories communes:
- **DeprecationWarning**: Fonctionnalité dépréciée
- **FutureWarning**: Changement futur prévu
- **UserWarning**: Avertissement générique utilisateur`,
    examples: [
      'import warnings',
      'warnings.filterwarnings("ignore")',
      'warnings.filterwarnings("ignore", category=FutureWarning)',
    ],
  },

  // ===== OS =====
  'os': {
    docKey: 'os',
    title: 'os',
    version: '3.11',
    libName: 'os',
    content: `# os - Interface système d'exploitation

Le module os fournit une interface pour interagir avec le système d'exploitation, notamment pour naviguer dans le système de fichiers.

## Usage courant:
\`\`\`python
import os

# Obtenir le répertoire courant
current_dir = os.getcwd()

# Changer de répertoire
os.chdir('/path/to/directory')

# Lister les fichiers
files = os.listdir('.')

# Vérifier l'existence d'un chemin
if os.path.exists('file.txt'):
    print('Le fichier existe')

# Obtenir le chemin complet
full_path = os.path.abspath('file.txt')

# Joindre des chemins
path = os.path.join('folder', 'subfolder', 'file.txt')
\`\`\`

## Fonctions principales:
- **getcwd()**: Répertoire courant
- **listdir()**: Lister les fichiers
- **walk()**: Parcourir arborescence
- **path.exists()**: Vérifier existence
- **path.join()**: Joindre chemins`,
    examples: [
      'import os',
      'for dirname, _, filenames in os.walk(\'/path\'): ...',
      'os.listdir(\'.\')',
    ],
  },

  // ===== OS.PATH.WALK =====
  'os.walk': {
    docKey: 'os.walk',
    title: 'os.walk()',
    version: '3.11',
    libName: 'os',
    content: `# os.walk()

Parcourt récursivement l'arborescence du répertoire.

## Signature:
\`\`\`python
os.walk(top, topdown=True, onerror=None, followlinks=False)
\`\`\`

## Retour:
Générateur de tuples (dirpath, dirnames, filenames) pour chaque répertoire.

## Exemple:
\`\`\`python
import os

for dirname, dirnames, filenames in os.walk('/kaggle/input'):
    for filename in filenames:
        print(os.path.join(dirname, filename))
\`\`\``,
    examples: [
      'for dirname, _, filenames in os.walk(\'/path\'): ...',
      'for root, dirs, files in os.walk("."): pass',
    ],
  },

  // ===== SKLEARN METRICS - F1_SCORE =====
  'sklearn.metrics.f1_score': {
    docKey: 'sklearn.metrics.f1_score',
    title: 'sklearn.metrics.f1_score()',
    version: '1.3.0',
    libName: 'sklearn',
    content: `# sklearn.metrics.f1_score()

Calcule le score F1 (moyenne harmonique de la précision et du rappel).

## Signature:
\`\`\`python
sklearn.metrics.f1_score(y_true, y_pred, average='binary')
\`\`\`

## Paramètres:
- **y_true**: Labels vrais
- **y_pred**: Labels prédits
- **average**: 'binary', 'micro', 'macro', 'weighted'

## Exemple:
\`\`\`python
from sklearn.metrics import f1_score

f1 = f1_score(y_test, predictions)
print(f"F1 Score: {f1:.4f}")
\`\`\``,
    examples: [
      'from sklearn.metrics import f1_score',
      'f1_score(y_test, predictions)',
    ],
  },

  // ===== PANDAS GET_DUMMIES =====
  'pandas.get_dummies': {
    docKey: 'pandas.get_dummies',
    title: 'pandas.get_dummies()',
    version: '2.1.3',
    libName: 'pandas',
    content: `# pandas.get_dummies()

Convertit les variables catégoriques en variables dummy (one-hot encoding).

## Signature:
\`\`\`python
pd.get_dummies(data, columns=None, drop_first=False, prefix=None)
\`\`\`

## Paramètres:
- **data**: DataFrame ou Series à traiter
- **columns**: Colonnes à encoder (toutes si None)
- **drop_first**: Supprimer la première catégorie (utile pour éviter la multicolinéarité)
- **prefix**: Préfixe pour les nouvelles colonnes

## Exemple:
\`\`\`python
df = pd.get_dummies(
    df,
    columns=['Sex', 'Embarked'],
    drop_first=True
)
\`\`\``,
    examples: [
      'pd.get_dummies(df, columns=["categorical"])',
      'pd.get_dummies(df, columns=["Sex", "Embarked"], drop_first=True)',
    ],
  },

  // ===== PANDAS FILLNA =====
  'pandas.fillna': {
    docKey: 'pandas.fillna',
    title: 'DataFrame.fillna()',
    version: '2.1.3',
    libName: 'pandas',
    content: `# DataFrame.fillna()

Remplit les valeurs manquantes (NaN) avec une valeur spécifiée.

## Signature:
\`\`\`python
DataFrame.fillna(value=None, method=None, inplace=False)
\`\`\`

## Paramètres:
- **value**: Valeur pour remplir les NaN
- **method**: 'ffill' (forward fill) ou 'bfill' (backward fill)
- **inplace**: Modifier le DataFrame original

## Exemple:
\`\`\`python
# Remplir avec une constante
df['Age'].fillna(df['Age'].median(), inplace=True)

# Forward fill
df.fillna(method='ffill', inplace=True)
\`\`\``,
    examples: [
      'df.fillna(df.mean())',
      'df["Age"].fillna(df["Age"].median(), inplace=True)',
      'df.fillna(method="ffill")',
    ],
  },

  // ===== PANDAS GROUPBY =====
  'pandas.groupby': {
    docKey: 'pandas.groupby',
    title: 'DataFrame.groupby()',
    version: '2.1.3',
    libName: 'pandas',
    content: `# DataFrame.groupby()

Groupe les données par une ou plusieurs colonnes et applique une fonction d'agrégation.

## Signature:
\`\`\`python
DataFrame.groupby(by, as_index=True, sort=True)
\`\`\`

## Paramètres:
- **by**: Colonne(s) de regroupement
- **as_index**: Utiliser les groupes comme index
- **sort**: Trier les groupes

## Exemple:
\`\`\`python
# Calcul de statistiques par groupe
df.groupby('Sex')['Survived'].mean()
df.groupby(['Sex', 'Pclass'])['Survived'].mean()

# Agrégation personnalisée
df.groupby('Category')['Value'].agg(['mean', 'sum', 'count'])
\`\`\``,
    examples: [
      'df.groupby("column").mean()',
      'df.groupby(["Sex", "Pclass"])["Survived"].mean()',
      'df.groupby("category").agg(["sum", "mean"])',
    ],
  },

  // ===== PANDAS ISNULL =====
  'pandas.isnull': {
    docKey: 'pandas.isnull',
    title: 'DataFrame.isnull()',
    version: '2.1.3',
    libName: 'pandas',
    content: `# DataFrame.isnull()

Détecte les valeurs manquantes (NaN) et retourne un booléen.

## Signature:
\`\`\`python
DataFrame.isnull()  # Alias: DataFrame.isna()
\`\`\`

## Retour:
DataFrame de booléens avec True pour NaN et False sinon.

## Exemple:
\`\`\`python
# Compter les valeurs manquantes par colonne
df.isnull().sum()

# Afficher les lignes avec valeurs manquantes
df[df.isnull().any(axis=1)]

# Visualiser avec heatmap
import seaborn as sns
sns.heatmap(df.isnull(), cbar=False)
\`\`\``,
    examples: [
      'df.isnull().sum()',
      'df[df.isnull().any(axis=1)]',
      'sns.heatmap(df.isnull(), cbar=False)',
    ],
  },

  // ===== PANDAS REINDEX =====
  'pandas.reindex': {
    docKey: 'pandas.reindex',
    title: 'DataFrame.reindex()',
    version: '2.1.3',
    libName: 'pandas',
    content: `# DataFrame.reindex()

Réindexe le DataFrame en utilisant les étiquettes fournies.

## Signature:
\`\`\`python
DataFrame.reindex(labels=None, fill_value=0, method=None)
\`\`\`

## Paramètres:
- **labels**: Nouvelles étiquettes (index ou colonnes)
- **fill_value**: Valeur à utiliser pour les positions nouvelles
- **method**: 'ffill' ou 'bfill' pour interpolation

## Exemple:
\`\`\`python
# Aligner les colonnes du test set avec l'entraînement
test_df = test_df.reindex(columns=X.columns, fill_value=0)
\`\`\``,
    examples: [
      'df.reindex(columns=X.columns, fill_value=0)',
      'df.reindex([0, 1, 2, 5, 10], fill_value=0)',
    ],
  },

  // ===== PANDAS MODE =====
  'pandas.mode': {
    docKey: 'pandas.mode',
    title: 'Series.mode()',
    version: '2.1.3',
    libName: 'pandas',
    content: `# Series.mode()

Retourne la ou les valeurs les plus fréquentes (mode).

## Signature:
\`\`\`python
Series.mode()
\`\`\`

## Retour:
Series contenant la(les) valeur(s) modale(s).

## Exemple:
\`\`\`python
# Obtenir la valeur la plus fréquente
mode_value = df['Embarked'].mode()[0]

# Remplir avec le mode
df['Embarked'].fillna(mode_value, inplace=True)
\`\`\``,
    examples: [
      'df["column"].mode()',
      'df["Embarked"].mode()[0]',
      'df["column"].fillna(df["column"].mode()[0], inplace=True)',
    ],
  },

  // ===== NUMPY INF =====
  'numpy.inf': {
    docKey: 'numpy.inf',
    title: 'numpy.inf',
    version: '1.24.3',
    libName: 'numpy',
    content: `# numpy.inf

Représente l'infini en NumPy.

## Usage:
\`\`\`python
import numpy as np

# Créer un array avec l'infini
arr = np.array([1, 2, np.inf, -np.inf, 3])

# Remplacer l'infini par NaN
arr_clean = arr.replace([np.inf, -np.inf], np.nan)

# Vérifier l'infini
np.isinf(arr)
\`\`\`

## Cas d'usage:
- Gestion des résultats de division par zéro
- Initialisation de valeurs d'optimisation
- Nettoyage de données`,
    examples: [
      'arr = np.array([1, np.inf, -np.inf])',
      'arr = arr.replace([np.inf, -np.inf], np.nan)',
      'np.isinf(arr)',
    ],
  },
};

/**
 * Récupère la documentation pour une clé donnée
 * @param docKey Clé de doc (ex: 'pandas.read_csv')
 * @returns DocEntry ou null
 */
export function getDocumentation(docKey: string): DocEntry | null {
  return completeMockDocs[docKey] ?? null;
}
