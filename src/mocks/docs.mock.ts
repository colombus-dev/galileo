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
  'numpy.inf': {
    docKey: 'numpy.inf',
    title: 'numpy.inf - Infini',
    version: '1.24.3',
    libName: 'numpy',
    content: `# numpy.inf - Représenter l'infini

Constante NumPy pour représenter l'infini (positive infinity).

## Utilisation

\`\`\`python
import numpy as np

# Créer un array avec l'infini
arr = np.array([1, 2, np.inf, -np.inf])

# Remplacer les valeurs infinies
arr = arr.replace([np.inf, -np.inf], np.nan)

# Vérifier les infinies
np.isinf(arr)  # Retourne boolean array
\`\`\`

## Cas d'usage

- Valeurs par défaut pour les comparaisons
- Détection et remplacement de valeurs problématiques
- Initialisation de variables dans les algorithmes`,
    examples: `arr = np.array([1, 2, np.inf])
arr = arr.replace([np.inf, -np.inf], np.nan)`,
  },
  'numpy.nan': {
    docKey: 'numpy.nan',
    title: 'numpy.nan - Valeurs manquantes',
    version: '1.24.3',
    libName: 'numpy',
    content: `# numpy.nan - Not A Number

Constante pour représenter les valeurs manquantes ou indéfinies.

## Utilisation

\`\`\`python
import numpy as np

# Créer un array avec NaN
arr = np.array([1.0, 2.0, np.nan, 4.0])

# Vérifier les NaN
np.isnan(arr)  # [False, False, True, False]

# Compter les NaN
np.isnan(arr).sum()  # 1

# Imputer les NaN avec la moyenne
mean_val = np.nanmean(arr)
arr = np.where(np.isnan(arr), mean_val, arr)
\`\`\`

## Importance

- Représente les valeurs manquantes dans les données réelles
- À différencier de None en Python
- Requiert des fonctions spéciales (nanmean, nansum, etc.)`,
    examples: `arr = np.array([1.0, np.nan, 3.0])
np.isnan(arr)
mean = np.nanmean(arr)`,
  },
  'seaborn': {
    docKey: 'seaborn',
    title: 'Seaborn - Visualisation statistique',
    version: '0.13.0',
    libName: 'seaborn',
    content: `# Seaborn - Statistical Data Visualization

Seaborn est une librairie de visualisation basée sur matplotlib, spécialisée dans les graphiques statistiques.

## Avantages par rapport à matplotlib

- Palettes de couleurs élégantes par défaut
- Intégration directe avec pandas DataFrames
- Graphiques statistiques complexes en quelques lignes
- Gestion automatique des légendes et labels

## Graphiques principaux

- \`barplot\` : Diagrammes en barres avec statistiques
- \`scatterplot\` : Graphiques en nuages de points
- \`heatmap\` : Matrices avec code couleur
- \`histplot\` : Histogrammes avec distribution
- \`boxplot\` : Boîtes à moustaches
- \`countplot\` : Comptage des catégories

## Installation

\`\`\`bash
pip install seaborn
\`\`\``,
    examples: `import seaborn as sns
sns.barplot(x='Sex', y='Survived', data=df)
sns.heatmap(df.corr(), annot=True)`,
  },
  'seaborn.countplot': {
    docKey: 'seaborn.countplot',
    title: 'seaborn.countplot() - Compter les catégories',
    version: '0.13.0',
    libName: 'seaborn',
    content: `# sns.countplot() - Diagramme de comptage

Crée un diagramme en barres montrant le nombre d'occurrences de chaque catégorie.

## Paramètres courants

- x : Colonne catégorique (axe X)
- y : Colonne catégorique (axe Y)
- data : DataFrame
- hue : Colonne pour colorer les barres (groupement secondaire)
- palette : Palettes de couleurs
- order : Ordre des catégories

## Exemple

\`\`\`python
import seaborn as sns

# Compter les passagers par port d'embarquement
sns.countplot(x='Embarked', data=df)
plt.title('Nombre de passagers par port')
plt.show()
\`\`\`

## Cas d'usage

- Distribution des valeurs catégorique
- Vérifier le déséquilibre des classes
- Exploration rapide des données`,
    examples: `sns.countplot(x='Embarked', data=df)
sns.countplot(x='Sex', hue='Survived', data=df)`,
  },
  'seaborn.barplot': {
    docKey: 'seaborn.barplot',
    title: 'seaborn.barplot() - Diagramme avec statistiques',
    version: '0.13.0',
    libName: 'seaborn',
    content: `# sns.barplot() - Diagramme en barres avec statistiques

Crée un diagramme montrant la moyenne (ou autre statistique) avec intervalle de confiance.

## Paramètres courants

- x : Catégorie (axe X)
- y : Valeur numérique (axe Y)
- hue : Groupement secondaire
- data : DataFrame
- palette : Couleurs
- ci : Intervalle de confiance (95 par défaut)

## Exemple

\`\`\`python
import seaborn as sns

# Taux de survie par sexe
sns.barplot(x='Sex', y='Survived', data=df)
plt.title('Taux de survie par sexe')
plt.show()

# Avec hue pour un deuxième groupement
sns.barplot(x='Pclass', y='Survived', hue='Sex', data=df)
\`\`\`

## Différence avec countplot

- countplot : Compte les occurrences
- barplot : Affiche la moyenne avec CI`,
    examples: `sns.barplot(x='Sex', y='Survived', data=df)
sns.barplot(x='Pclass', y='Survived', hue='Sex', data=df)`,
  },
  'seaborn.boxplot': {
    docKey: 'seaborn.boxplot',
    title: 'seaborn.boxplot() - Boîtes à moustaches',
    version: '0.13.0',
    libName: 'seaborn',
    content: `# sns.boxplot() - Box Plot (Boîtes à moustaches)

Affiche la distribution avec quartiles, médiane et outliers.

## Structure de la boîte

- Ligne au centre : Médiane (Q2)
- Bord inférieur : Q1 (25e percentile)
- Bord supérieur : Q3 (75e percentile)
- Moustaches : Min/Max (ou 1.5×IQR)
- Points : Outliers

## Paramètres

- x, y : Axes
- hue : Groupement
- data : DataFrame
- dodge : Si True, sépare les boîtes par hue

## Exemple

\`\`\`python
import seaborn as sns

# Distribution des âges par survie
sns.boxplot(x='Survived', y='Age', data=df)
plt.title('Âge par statut de survie')
plt.show()

# Par classe et sexe
sns.boxplot(x='Pclass', y='Age', hue='Survived', data=df[df['Sex']=='female'])
\`\`\`

## Cas d'usage

- Détection d'outliers
- Comparaison de distributions
- Analyse bivariée`,
    examples: `sns.boxplot(x='Survived', y='Age', data=df)
sns.boxplot(x='Pclass', y='Age', hue='Survived', data=df)`,
  },
  'seaborn.histplot': {
    docKey: 'seaborn.histplot',
    title: 'seaborn.histplot() - Histogramme',
    version: '0.13.0',
    libName: 'seaborn',
    content: `# sns.histplot() - Histogramme avec distribution

Crée un histogramme avec support pour KDE (Kernel Density Estimation).

## Paramètres courants

- x : Données numériques
- hue : Groupement par couleur
- bins : Nombre de bacs (défaut: auto)
- kde : Si True, ajoute courbe de densité
- palette : Couleurs
- stat : 'count', 'frequency', 'density', 'probability'

## Exemple

\`\`\`python
import seaborn as sns

# Distribution simple
sns.histplot(data=df, x='Age', bins=30)

# Avec groupement par survie
sns.histplot(data=df, x='Age', hue='Survived', bins=30, kde=True, 
             palette={0: 'red', 1: 'green'})
plt.title('Distribution d\\'âge par survie')
plt.show()
\`\`\`

## Cas d'usage

- Analyser la distribution d'une variable
- Détecter des patterns ou bimodalité
- Grouper par catégories`,
    examples: `sns.histplot(data=df, x='Age', bins=30)
sns.histplot(data=df, x='Age', hue='Survived', kde=True)`,
  },
  'matplotlib.pyplot.figure': {
    docKey: 'matplotlib.pyplot.figure',
    title: 'matplotlib.pyplot.figure() - Créer une figure',
    version: '3.7.1',
    libName: 'matplotlib',
    content: `# plt.figure() - Créer une nouvelle figure

Crée une nouvelle figure pour les graphiques.

## Paramètres courants

- figsize : Tuple (width, height) en pouces
- dpi : Résolution (défaut: 100)
- facecolor : Couleur de fond

## Exemple

\`\`\`python
import matplotlib.pyplot as plt

# Figure simple
fig = plt.figure(figsize=(8, 6))
plt.plot([1, 2, 3], [1, 4, 2])
plt.show()

# Plusieurs subplots
fig, axes = plt.subplots(2, 2, figsize=(10, 8))
axes[0, 0].plot([1, 2, 3])
axes[0, 1].scatter([1, 2, 3], [1, 4, 2])
plt.tight_layout()
plt.show()
\`\`\`

## Bonnes pratiques

- Toujours spécifier figsize pour un contrôle
- Utiliser subplots pour plusieurs graphiques
- Appeler plt.tight_layout() pour éviter chevauchements`,
    examples: `fig = plt.figure(figsize=(8, 6))
plt.plot([1, 2, 3])
plt.show()`,
  },
  'matplotlib.pyplot.bar': {
    docKey: 'matplotlib.pyplot.bar',
    title: 'matplotlib.pyplot.bar() - Diagramme en barres',
    version: '3.7.1',
    libName: 'matplotlib',
    content: `# plt.bar() - Diagramme en barres

Crée un diagramme en barres simple.

## Paramètres

- x : Positions des barres
- height : Hauteurs des barres
- width : Largeur des barres (défaut: 0.8)
- color : Couleur

## Exemple

\`\`\`python
import matplotlib.pyplot as plt

categories = ['Died', 'Survived']
counts = [545, 342]

plt.bar(categories, counts, color=['red', 'green'])
plt.xlabel('Status')
plt.ylabel('Count')
plt.title('Survival Distribution')
plt.show()
\`\`\`

## Vs seaborn.barplot

- matplotlib : Contrôle bas-niveau, simple
- seaborn : Statistiques automatiques, esthétique`,
    examples: `plt.bar(['A', 'B', 'C'], [1, 4, 2])
plt.bar(categories, counts, color=['red', 'green'])`,
  },
  'matplotlib.pyplot.plot': {
    docKey: 'matplotlib.pyplot.plot',
    title: 'matplotlib.pyplot.plot() - Graphique linéaire',
    version: '3.7.1',
    libName: 'matplotlib',
    content: `# plt.plot() - Graphique linéaire

Crée un graphique linéaire en reliant les points.

## Paramètres

- x, y : Coordonnées
- color : Couleur ('r', 'g', 'b', etc.)
- linestyle : Style ('-', '--', '-.', ':')
- marker : Marqueur ('o', 's', '^', etc.)
- label : Légende

## Exemple

\`\`\`python
import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [1, 4, 2, 3, 5]

plt.plot(x, y, color='blue', marker='o', linestyle='-', label='Data')
plt.xlabel('X axis')
plt.ylabel('Y axis')
plt.title('Line Plot')
plt.legend()
plt.show()
\`\`\`

## Cas d'usage

- Séries temporelles
- Courbes de fonction
- Évolution dans le temps`,
    examples: `plt.plot([1, 2, 3], [1, 4, 2])
plt.plot(x, y, color='blue', marker='o')`,
  },
  'matplotlib.pyplot.scatter': {
    docKey: 'matplotlib.pyplot.scatter',
    title: 'matplotlib.pyplot.scatter() - Graphique en nuages',
    version: '3.7.1',
    libName: 'matplotlib',
    content: `# plt.scatter() - Graphique en nuages de points

Crée un graphique en nuages de points (dispersé).

## Paramètres

- x, y : Coordonnées
- s : Taille des points
- c : Couleur (peut être une array pour gradient)
- alpha : Transparence (0-1)
- cmap : Colormap

## Exemple

\`\`\`python
import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [1, 4, 2, 3, 5]

plt.scatter(x, y, s=100, c='blue', alpha=0.5)
plt.xlabel('X axis')
plt.ylabel('Y axis')
plt.title('Scatter Plot')
plt.show()
\`\`\`

## Cas d'usage

- Corrélation bivariée
- Clustering de données
- Détection de patterns`,
    examples: `plt.scatter(x, y, s=100, c='blue')
plt.scatter(X[:, 0], X[:, 1], c=y, cmap='viridis')`,
  },
  'sklearn.ensemble.RandomForestClassifier': {
    docKey: 'sklearn.ensemble.RandomForestClassifier',
    title: 'sklearn.ensemble.RandomForestClassifier',
    version: '1.3.2',
    libName: 'sklearn',
    content: `# RandomForestClassifier - Ensemble d'arbres aléatoires

Classifier basé sur plusieurs arbres de décision avec bootstrap et sélection aléatoire de features.

## Avantages

- Robuste au surapprentissage (overfitting)
- Gère bien les données non-normalisées
- Feature importance automatique
- Parallélisable

## Paramètres importants

- n_estimators : Nombre d'arbres (défaut: 100)
- max_depth : Profondeur maximale
- min_samples_split : Observations min pour split
- random_state : Graine pour reproductibilité
- n_jobs : -1 pour parallélisation

## Exemple

\`\`\`python
from sklearn.ensemble import RandomForestClassifier

rf = RandomForestClassifier(n_estimators=500, random_state=42)
rf.fit(X_train, y_train)
y_pred = rf.predict(X_test)

# Feature importance
importances = rf.feature_importances_
\`\`\`

## Performance

Généralement meilleur que Logistic Regression pour les données complexes.`,
    examples: `rf = RandomForestClassifier(n_estimators=500, random_state=42)
rf.fit(X_train, y_train)
y_pred = rf.predict(X_test)
importances = rf.feature_importances_`,
  },
  'sklearn.pipeline.Pipeline': {
    docKey: 'sklearn.pipeline.Pipeline',
    title: 'sklearn.pipeline.Pipeline - Chaîner les transformations',
    version: '1.3.2',
    libName: 'sklearn',
    content: `# Pipeline - Chaîner preprocessing et modèle

Un Pipeline enchaîne une série de transformations puis un modèle.

## Avantages

- Évite la fuite de données (data leakage)
- Simplifie le code
- Fit et predict en une ligne
- Compatible avec GridSearchCV

## Exemple

\`\`\`python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model', LogisticRegression(max_iter=1000))
])

# Fit et predict
pipeline.fit(X_train, y_train)
y_pred = pipeline.predict(X_test)
\`\`\`

## ⚠️ Important

Le scaler est fit SEULEMENT sur X_train, puis appliqué sur X_test. 
Cela prévient la fuite de données !

## Pipeline avec étapes multiples

\`\`\`python
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('feature_selection', SelectKBest(k=10)),
    ('model', SVC())
])
\`\`\``,
    examples: `pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model', LogisticRegression())
])
pipeline.fit(X_train, y_train)`,
  },
  'sklearn.linear_model.LogisticRegression': {
    docKey: 'sklearn.linear_model.LogisticRegression',
    title: 'sklearn.linear_model.LogisticRegression',
    version: '1.3.2',
    libName: 'sklearn',
    content: `# LogisticRegression - Classifier linéaire

Régression logistique pour la classification binaire ou multi-classe.

## Quand l'utiliser

- Baseline rapide et interprtable
- Données linéairement séparables (ou proches)
- Importance des coefficients est primordiale
- Données haute-dimensionnelles

## Paramètres importants

- max_iter : Itérations maximales pour la convergence
- C : Inverse de la force de régularisation
- random_state : Graine pour reproductibilité
- solver : 'lbfgs', 'liblinear', 'saga', etc.

## Exemple

\`\`\`python
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler

# Normaliser les données (important !)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Créer et entraîner
model = LogisticRegression(max_iter=1000, random_state=42)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
\`\`\`

## Interprétabilité

Coefficients indiquent l'importance de chaque feature.`,
    examples: `model = LogisticRegression(max_iter=1000, random_state=42)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)`,
  },
  'sklearn.metrics.classification_report': {
    docKey: 'sklearn.metrics.classification_report',
    title: 'sklearn.metrics.classification_report()',
    version: '1.3.2',
    libName: 'sklearn',
    content: `# classification_report() - Rapport complet de classification

Génère un rapport textuel avec Precision, Recall, F1-score pour chaque classe.

## Métriques

- Precision : TP / (TP + FP) - Parmi nos prédictions positives, combien étaient correctes ?
- Recall : TP / (TP + FN) - Parmi les vrais positifs, combien avons-nous détecté ?
- F1-score : Moyenne harmonique de Precision et Recall
- Support : Nombre d'occurrences de chaque classe

## Exemple

\`\`\`python
from sklearn.metrics import classification_report

report = classification_report(y_test, y_pred)
print(report)

# Output exemple :
#              precision    recall  f1-score   support
#           0       0.85      0.90      0.87       100
#           1       0.88      0.82      0.85        95
#
#    accuracy                           0.86       195
#   macro avg       0.86      0.86      0.86       195
#weighted avg       0.86      0.86      0.86       195
\`\`\`

## Avec digits et output_dict

\`\`\`python
# Plus de décimales
report = classification_report(y_test, y_pred, digits=4)

# Retourner un dict
report_dict = classification_report(y_test, y_pred, output_dict=True)
\`\`\``,
    examples: `from sklearn.metrics import classification_report
print(classification_report(y_test, y_pred))`,
  },
  'os.walk': {
    docKey: 'os.walk',
    title: 'os.walk() - Parcourir répertoires',
    version: '3.9+',
    libName: 'os',
    content: `# os.walk() - Traverser une arborescence

Parcourt récursivement les répertoires et fichiers.

## Syntaxe

\`\`\`python
os.walk(top, topdown=True, onerror=None, followlinks=False)
\`\`\`

## Retour

Tuple : (dirpath, dirnames, filenames)
- dirpath : Chemin du répertoire courant
- dirnames : Liste des sous-répertoires
- filenames : Liste des fichiers

## Exemple

\`\`\`python
import os

for dirname, subdirs, filenames in os.walk('/kaggle/input'):
    for filename in filenames:
        full_path = os.path.join(dirname, filename)
        print(full_path)
\`\`\`

## Cas d'usage

- Parcourir une arborescence de fichiers
- Traiter tous les fichiers d'un dossier
- Chercher des fichiers spécifiques`,
    examples: `for dirname, subdirs, filenames in os.walk('/data'):
    for filename in filenames:
        print(os.path.join(dirname, filename))`,
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

- pandas, pandas.read_csv, pandas.DataFrame, pandas.DataFrame.drop
- numpy, numpy.inf, numpy.nan
- sklearn.model_selection.train_test_split
- sklearn.preprocessing.StandardScaler
- sklearn.linear_model.LogisticRegression
- sklearn.ensemble.RandomForestClassifier
- sklearn.pipeline.Pipeline
- sklearn.svm.SVC
- sklearn.metrics.accuracy_score, sklearn.metrics.confusion_matrix, sklearn.metrics.classification_report
- sklearn.datasets.load_iris
- seaborn, seaborn.heatmap, seaborn.countplot, seaborn.barplot, seaborn.boxplot, seaborn.histplot
- matplotlib.pyplot, matplotlib.pyplot.figure, matplotlib.pyplot.bar, matplotlib.pyplot.plot, matplotlib.pyplot.scatter
- os.walk`,
  examples: `// Documentation non disponible`,
};
