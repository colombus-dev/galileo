import type { DocEntry } from '@/types/notebook';

export const mockDocs: Record<string, DocEntry> = {
  'pandas': {
    docKey: 'pandas',
    title: 'Pandas - Data Analysis Library',
    version: '2.1.3',
    libName: 'pandas',
    content: `# Pandas - Data Manipulation

Pandas est une librairie Python open-source pour la manipulation et l'analyse de données.

## Caractéristiques principales

- DataFrame : Structure tabulaire 2D avec colonnes nommées et indexage flexible
- Series : Structure 1D pour manipuler des colonnes isolées
- Groupby : Opérations d'agrégation et transformation en groupe
- Merge/Join : Fusion entre plusieurs DataFrames
- Time series : Manipulation de données temporelles avec indexage temporel

## Cas d'usage

Pandas est particulièrement utile pour :
- Nettoyage et préparation de données (data cleaning)
- Exploration exploratoire (EDA)
- Transformation de formats (CSV, Excel, JSON, SQL, etc.)
- Fusion et agrégation de données
- Détection d'anomalies

## Installation

\`\`\`bash
pip install pandas
\`\`\``,
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

Fonction pour charger un fichier CSV dans un DataFrame pandas.

## Signature

\`\`\`python
pd.read_csv(filepath_or_buffer, sep=',', delimiter=None, header='infer')
\`\`\`

## Paramètres principaux

- filepath_or_buffer : Chemin du fichier ou URL
- sep : Délimiteur (défaut: ',') - peut être ';', '\\t', etc.
- header : Ligne à utiliser comme noms de colonnes (défaut: 0)
- dtype : Types des colonnes
- skiprows : Nombre de lignes à ignorer
- nrows : Nombre de lignes à lire

## Exemples d'utilisation

\`\`\`python
# Lecture simple
df = pd.read_csv("iris.csv")

# Avec délimiteur personnalisé
df = pd.read_csv("data.csv", sep=';', encoding='utf-8')

# Pour gros fichiers
df = pd.read_csv("data.csv", nrows=1000)
\`\`\``,
    examples: `df = pd.read_csv("iris.csv")
df = pd.read_csv("data.csv", sep=';')
df = pd.read_csv("data.csv", skiprows=2, nrows=100)`,
  },
  'pandas.DataFrame': {
    docKey: 'pandas.DataFrame',
    title: 'pandas.DataFrame',
    version: '2.1.3',
    libName: 'pandas',
    content: `# pandas.DataFrame - Structure de données principale

Un DataFrame est une table 2D avec colonnes et index flexibles.

## Création

\`\`\`python
import pandas as pd

# Depuis un dictionnaire
df = pd.DataFrame({'nom': ['Alice', 'Bob'], 'age': [25, 30]})

# Depuis une liste de listes
df = pd.DataFrame([[1, 2], [3, 4]], columns=['A', 'B'])
\`\`\`

## Opérations courantes

\`\`\`python
# Sélection
df['colonne']
df[['col1', 'col2']]
df.iloc[0]

# Filtrage
df[df['age'] > 25]

# Agrégation
df.groupby('categorie').sum()
\`\`\``,
    examples: `df = pd.DataFrame({'A': [1, 2], 'B': [3, 4]})
print(df.shape)
df.describe()`,
  },
  'pandas.DataFrame.drop': {
    docKey: 'pandas.DataFrame.drop',
    title: 'DataFrame.drop()',
    version: '2.1.3',
    libName: 'pandas',
    content: `# DataFrame.drop() - Supprimer lignes/colonnes

Supprime les lignes ou colonnes spécifiées d'un DataFrame.

## Usage

\`\`\`python
# Supprimer une colonne
df = df.drop(columns=['B'])

# Supprimer une ligne
df = df.drop(index=0)

# Plusieurs colonnes
df = df.drop(columns=['B', 'C'])
\`\`\`

## Dans le contexte ML

\`\`\`python
# Séparer features et target
X = df.drop('target', axis=1)
y = df['target']
\`\`\``,
    examples: `X = df.drop('target', axis=1)
y = df['target']
df_clean = df.drop(columns=['id', 'temp_col'])`,
  },
  'sklearn.model_selection.train_test_split': {
    docKey: 'sklearn.model_selection.train_test_split',
    title: 'sklearn.model_selection.train_test_split()',
    version: '1.3.2',
    libName: 'sklearn',
    content: `# train_test_split() - Diviser les données

Divise les données en ensembles d'entraînement et de test.

## Signature

\`\`\`python
train_test_split(*arrays, test_size=0.25, random_state=None, stratify=None)
\`\`\`

## Paramètres principaux

- test_size : Proportion pour le test set (défaut: 0.25)
- random_state : Graine pour reproductibilité
- stratify : Colonne pour stratified sampling (maintient distribution des classes)

## Importance du stratified split

Avec données déséquilibrées, maintenir la distribution est crucial :

\`\`\`python
# ✅ BON
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
\`\`\`

## Exemple complet

\`\`\`python
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
print(f"Train: {X_train.shape}, Test: {X_test.shape}")
\`\`\``,
    examples: `X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)`,
  },
  'sklearn.preprocessing.StandardScaler': {
    docKey: 'sklearn.preprocessing.StandardScaler',
    title: 'sklearn.preprocessing.StandardScaler',
    version: '1.3.2',
    libName: 'sklearn',
    content: `# StandardScaler - Normalisation

Normalise les features en les centrant et réduisant (standardisation z-score).

## Pourquoi normaliser ?

Certains modèles sont sensibles à l'échelle :
- SVM : Très sensible
- KNN : Sensible
- Neural Networks : Convergence plus rapide

## Formule

\`\`\`
X_scaled = (X - mean) / std
\`\`\`

Important : fit() uniquement sur le train set !

## Usage correct

\`\`\`python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)  # Fit + Transform
X_test = scaler.transform(X_test)  # Seulement Transform
\`\`\`

⚠️ Erreur courante : fit_transform sur train+test ensemble = fuite de données !`,
    examples: `scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)`,
  },
  'sklearn.svm.SVC': {
    docKey: 'sklearn.svm.SVC',
    title: 'sklearn.svm.SVC - Support Vector Machine',
    version: '1.3.2',
    libName: 'sklearn',
    content: `# SVC (Support Vector Classifier)

Classifier basé sur les Support Vector Machines pour la classification.

## Concept

SVM trouve l'hyperplan qui maximise la marge entre les classes.

## Paramètres importants

- kernel : 'linear', 'rbf' (défaut), 'poly', 'sigmoid'
- C : Paramètre de régularisation (1.0 par défaut)
- gamma : Paramètre pour kernels non-linéaires
- random_state : Graine pour reproductibilité

## Usage

\`\`\`python
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler

# IMPORTANT : Normaliser les données
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# SVM avec kernel RBF
model = SVC(kernel='rbf', random_state=42)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
\`\`\`

⚠️ Rappel : SVM est très sensible à l'échelle - TOUJOURS normaliser !`,
    examples: `model = SVC(kernel='rbf', random_state=42)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)`,
  },
  'sklearn.metrics.accuracy_score': {
    docKey: 'sklearn.metrics.accuracy_score',
    title: 'sklearn.metrics.accuracy_score()',
    version: '1.3.2',
    libName: 'sklearn',
    content: `# accuracy_score() - Métrique de classification

Calcule l'accuracy (pourcentage de prédictions correctes).

## Formule

\`\`\`
Accuracy = (Prédictions correctes) / (Total)
\`\`\`

## Usage

\`\`\`python
from sklearn.metrics import accuracy_score

accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.2f}")
\`\`\`

## Attention

⚠️ Pour données déséquilibrées, préférez F1-score, Precision, Recall ou Balanced Accuracy.`,
    examples: `from sklearn.metrics import accuracy_score
accuracy = accuracy_score(y_test, y_pred)`,
  },
  'sklearn.metrics.confusion_matrix': {
    docKey: 'sklearn.metrics.confusion_matrix',
    title: 'sklearn.metrics.confusion_matrix()',
    version: '1.3.2',
    libName: 'sklearn',
    content: `# confusion_matrix() - Matrice de confusion

Crée une matrice montrant les vrais/faux positifs pour chaque classe.

## Exemple

\`\`\`
        Prédites
        Négatif Positif
Réelles
Négatif  TN      FP
Positif  FN      TP
\`\`\`

## Usage

\`\`\`python
from sklearn.metrics import confusion_matrix

cm = confusion_matrix(y_test, y_pred)
print(cm)
\`\`\`

## Visualisation avec heatmap

\`\`\`python
import seaborn as sns
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
\`\`\``,
    examples: `cm = confusion_matrix(y_test, y_pred)
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')`,
  },
  'seaborn.heatmap': {
    docKey: 'seaborn.heatmap',
    title: 'seaborn.heatmap() - Visualiser les données',
    version: '0.13.0',
    libName: 'seaborn',
    content: `# sns.heatmap() - Heatmap de visualisation

Crée une visualisation 2D avec des couleurs représentant les valeurs numériques.

## Paramètres courants

- data : Les données (ex: matrice de confusion)
- annot : Si True, affiche les valeurs
- fmt : Format ('d' pour int, '.2f' pour float)
- cmap : Colormap (Blues, RdYlGn, viridis, etc.)
- xticklabels : Noms pour l'axe X
- yticklabels : Noms pour l'axe Y

## Exemple : Confusion matrix

\`\`\`python
import seaborn as sns
import matplotlib.pyplot as plt

fig = plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
            xticklabels=['setosa', 'versicolor', 'virginica'],
            yticklabels=['setosa', 'versicolor', 'virginica'])
plt.title('Matrice de Confusion')
plt.ylabel('Vraie classe')
plt.xlabel('Classe prédite')
plt.show()
\`\`\``,
    examples: `sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
sns.heatmap(df.corr(), annot=True, cmap='coolwarm')`,
  },
  'matplotlib.pyplot': {
    docKey: 'matplotlib.pyplot',
    title: 'matplotlib.pyplot - Visualization',
    version: '3.7.1',
    libName: 'matplotlib',
    content: `# matplotlib.pyplot - Librairie de visualization

Matplotlib est la librairie de base pour créer des graphiques statiques en Python.

## Import

\`\`\`python
import matplotlib.pyplot as plt
\`\`\`

## Usage simple

\`\`\`python
plt.figure(figsize=(8, 6))
plt.plot([1, 2, 3, 4], [1, 4, 2, 3])
plt.xlabel('X axis')
plt.ylabel('Y axis')
plt.title('Mon graphique')
plt.show()
\`\`\`

## Subplots

\`\`\`python
fig, axes = plt.subplots(2, 2, figsize=(10, 8))
axes[0, 0].plot([1, 2, 3])
axes[0, 1].scatter([1, 2, 3], [1, 4, 2])
plt.tight_layout()
plt.show()
\`\`\``,
    examples: `fig = plt.figure(figsize=(8, 6))
plt.plot([1, 2, 3], [1, 4, 2])
plt.show()`,
  },
  'sklearn.datasets.load_iris': {
    docKey: 'sklearn.datasets.load_iris',
    title: 'sklearn.datasets.load_iris()',
    version: '1.3.2',
    libName: 'sklearn',
    content: `# load_iris() - Dataset Iris classique

Charge le fameux dataset Iris pour la classification.

## Dataset

- Samples : 150 iris (50 par classe)
- Features : 4 (sepal length, sepal width, petal length, petal width)
- Target : 3 classes (setosa, versicolor, virginica)

## Usage

\`\`\`python
from sklearn.datasets import load_iris
import pandas as pd

iris = load_iris()
X = iris.data  # Shape: (150, 4)
y = iris.target  # Shape: (150,)

# Créer un DataFrame
df = pd.DataFrame(X, columns=iris.feature_names)
df['target'] = y
\`\`\`

## Attributs

- data : Features (150, 4)
- target : Labels (150,)
- feature_names : Noms des colonnes
- target_names : Noms des classes`,
    examples: `from sklearn.datasets import load_iris
iris = load_iris()
X, y = iris.data, iris.target
df = pd.DataFrame(X, columns=iris.feature_names)`,
  },
  'numpy': {
    docKey: 'numpy',
    title: 'NumPy - Numerical Computing',
    version: '1.24.3',
    libName: 'numpy',
    content: `# NumPy - Numerical Python

NumPy est la librairie fondamentale pour le calcul numérique en Python.

## Pourquoi NumPy ?

- Arrays : Plus rapide que les listes Python
- Vectorisation : Pas de boucles Python (exécution C)
- Intégration : Base de pandas, sklearn, etc.

## Utilisation basique

\`\`\`python
import numpy as np

# Créer des arrays
arr = np.array([1, 2, 3, 4, 5])
zeros = np.zeros((3, 4))
ones = np.ones((2, 3))
arange = np.arange(0, 10, 2)

# Opérations
arr = arr * 2
result = np.sum(arr)
result = np.mean(arr)
result = np.std(arr)

# Unique
unique_values = np.unique(arr)

# Count
counts = np.bincount(y)  # Compter les occurrences
\`\`\`

## Avantage de la vectorisation

\`\`\`python
# ✅ NumPy (rapide)
result = np.arange(1000000) * 2
\`\`\``,
    examples: `import numpy as np
arr = np.array([1, 2, 3, 4, 5])
print(np.unique(iris.target))
print(np.bincount(y))`,
  },
};

export const mockDocNotFound: DocEntry = {
  docKey: 'not-found',
  title: 'Documentation non trouvée',
  version: 'N/A',
  libName: 'unknown',
  content: `# Documentation non trouvée

La documentation pour ce token n'est pas disponible dans cette démo.

## Tokens disponibles

- pandas
- pandas.read_csv
- pandas.DataFrame
- sklearn.model_selection.train_test_split
- sklearn.preprocessing.StandardScaler
- sklearn.svm.SVC
- sklearn.metrics.accuracy_score
- sklearn.metrics.confusion_matrix
- seaborn.heatmap
- matplotlib.pyplot
- sklearn.datasets.load_iris
- numpy`,
  examples: `// Documentation non disponible`,
};
