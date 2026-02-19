/**
 * Registry complète des tokens documentables
 * Mappe tous les chemins possibles aux tokens documentables
 * Format: "lib.path" => Token info
 */

export interface TokenRegistryEntry {
  lib: string;
  name: string;
  kind: 'import' | 'function' | 'symbol';
  docKey: string;
}

/**
 * Registry complète - associe les différents chemins d'import à leur token
 */
export const tokenLibraryRegistry: Record<string, TokenRegistryEntry> = {
  // ============ PANDAS ============
  'pandas': {
    lib: 'pandas',
    name: 'pandas',
    kind: 'import',
    docKey: 'pandas',
  },
  'pd': {
    lib: 'pandas',
    name: 'pandas',
    kind: 'import',
    docKey: 'pandas',
  },
  'pandas.read_csv': {
    lib: 'pandas',
    name: 'read_csv',
    kind: 'function',
    docKey: 'pandas.read_csv',
  },
  'pd.read_csv': {
    lib: 'pandas',
    name: 'read_csv',
    kind: 'function',
    docKey: 'pandas.read_csv',
  },
  'read_csv': {
    lib: 'pandas',
    name: 'read_csv',
    kind: 'function',
    docKey: 'pandas.read_csv',
  },
  'pandas.DataFrame': {
    lib: 'pandas',
    name: 'DataFrame',
    kind: 'symbol',
    docKey: 'pandas.DataFrame',
  },
  'pd.DataFrame': {
    lib: 'pandas',
    name: 'DataFrame',
    kind: 'symbol',
    docKey: 'pandas.DataFrame',
  },
  'DataFrame': {
    lib: 'pandas',
    name: 'DataFrame',
    kind: 'symbol',
    docKey: 'pandas.DataFrame',
  },
  'pandas.DataFrame.drop': {
    lib: 'pandas',
    name: 'drop',
    kind: 'function',
    docKey: 'pandas.DataFrame.drop',
  },
  'drop': {
    lib: 'pandas',
    name: 'drop',
    kind: 'function',
    docKey: 'pandas.DataFrame.drop',
  },
  'pandas.Series': {
    lib: 'pandas',
    name: 'Series',
    kind: 'symbol',
    docKey: 'pandas.Series',
  },
  'pandas.concat': {
    lib: 'pandas',
    name: 'concat',
    kind: 'function',
    docKey: 'pandas.concat',
  },
  'pandas.merge': {
    lib: 'pandas',
    name: 'merge',
    kind: 'function',
    docKey: 'pandas.merge',
  },

  // ============ NUMPY ============
  'numpy': {
    lib: 'numpy',
    name: 'numpy',
    kind: 'import',
    docKey: 'numpy',
  },
  'np': {
    lib: 'numpy',
    name: 'numpy',
    kind: 'import',
    docKey: 'numpy',
  },
  'numpy.array': {
    lib: 'numpy',
    name: 'array',
    kind: 'function',
    docKey: 'numpy.array',
  },
  'np.array': {
    lib: 'numpy',
    name: 'array',
    kind: 'function',
    docKey: 'numpy.array',
  },
  'array': {
    lib: 'numpy',
    name: 'array',
    kind: 'function',
    docKey: 'numpy.array',
  },
  'numpy.unique': {
    lib: 'numpy',
    name: 'unique',
    kind: 'function',
    docKey: 'numpy.unique',
  },
  'numpy.zeros': {
    lib: 'numpy',
    name: 'zeros',
    kind: 'function',
    docKey: 'numpy.zeros',
  },
  'numpy.ones': {
    lib: 'numpy',
    name: 'ones',
    kind: 'function',
    docKey: 'numpy.ones',
  },

  // ============ SCIKIT-LEARN ============
  'sklearn': {
    lib: 'sklearn',
    name: 'scikit-learn',
    kind: 'import',
    docKey: 'sklearn',
  },
  'sklearn.datasets': {
    lib: 'sklearn',
    name: 'datasets',
    kind: 'import',
    docKey: 'sklearn.datasets',
  },
  'sklearn.datasets.load_iris': {
    lib: 'sklearn',
    name: 'load_iris',
    kind: 'function',
    docKey: 'sklearn.datasets.load_iris',
  },
  'load_iris': {
    lib: 'sklearn',
    name: 'load_iris',
    kind: 'function',
    docKey: 'sklearn.datasets.load_iris',
  },
  'sklearn.datasets.load_digits': {
    lib: 'sklearn',
    name: 'load_digits',
    kind: 'function',
    docKey: 'sklearn.datasets.load_digits',
  },
  'sklearn.model_selection': {
    lib: 'sklearn',
    name: 'model_selection',
    kind: 'import',
    docKey: 'sklearn.model_selection',
  },
  'sklearn.model_selection.train_test_split': {
    lib: 'sklearn',
    name: 'train_test_split',
    kind: 'function',
    docKey: 'sklearn.model_selection.train_test_split',
  },
  'train_test_split': {
    lib: 'sklearn',
    name: 'train_test_split',
    kind: 'function',
    docKey: 'sklearn.model_selection.train_test_split',
  },
  'sklearn.preprocessing': {
    lib: 'sklearn',
    name: 'preprocessing',
    kind: 'import',
    docKey: 'sklearn.preprocessing',
  },
  'sklearn.preprocessing.StandardScaler': {
    lib: 'sklearn',
    name: 'StandardScaler',
    kind: 'symbol',
    docKey: 'sklearn.preprocessing.StandardScaler',
  },
  'StandardScaler': {
    lib: 'sklearn',
    name: 'StandardScaler',
    kind: 'symbol',
    docKey: 'sklearn.preprocessing.StandardScaler',
  },
  'sklearn.preprocessing.MinMaxScaler': {
    lib: 'sklearn',
    name: 'MinMaxScaler',
    kind: 'symbol',
    docKey: 'sklearn.preprocessing.MinMaxScaler',
  },
  'sklearn.svm': {
    lib: 'sklearn',
    name: 'svm',
    kind: 'import',
    docKey: 'sklearn.svm',
  },
  'sklearn.svm.SVC': {
    lib: 'sklearn',
    name: 'SVC',
    kind: 'symbol',
    docKey: 'sklearn.svm.SVC',
  },
  'SVC': {
    lib: 'sklearn',
    name: 'SVC',
    kind: 'symbol',
    docKey: 'sklearn.svm.SVC',
  },
  'sklearn.ensemble': {
    lib: 'sklearn',
    name: 'ensemble',
    kind: 'import',
    docKey: 'sklearn.ensemble',
  },
  'sklearn.ensemble.RandomForestClassifier': {
    lib: 'sklearn',
    name: 'RandomForestClassifier',
    kind: 'symbol',
    docKey: 'sklearn.ensemble.RandomForestClassifier',
  },
  'RandomForestClassifier': {
    lib: 'sklearn',
    name: 'RandomForestClassifier',
    kind: 'symbol',
    docKey: 'sklearn.ensemble.RandomForestClassifier',
  },
  'sklearn.metrics': {
    lib: 'sklearn',
    name: 'metrics',
    kind: 'import',
    docKey: 'sklearn.metrics',
  },
  'sklearn.metrics.accuracy_score': {
    lib: 'sklearn',
    name: 'accuracy_score',
    kind: 'function',
    docKey: 'sklearn.metrics.accuracy_score',
  },
  'accuracy_score': {
    lib: 'sklearn',
    name: 'accuracy_score',
    kind: 'function',
    docKey: 'sklearn.metrics.accuracy_score',
  },
  'sklearn.metrics.confusion_matrix': {
    lib: 'sklearn',
    name: 'confusion_matrix',
    kind: 'function',
    docKey: 'sklearn.metrics.confusion_matrix',
  },
  'confusion_matrix': {
    lib: 'sklearn',
    name: 'confusion_matrix',
    kind: 'function',
    docKey: 'sklearn.metrics.confusion_matrix',
  },
  'sklearn.metrics.classification_report': {
    lib: 'sklearn',
    name: 'classification_report',
    kind: 'function',
    docKey: 'sklearn.metrics.classification_report',
  },
  'classification_report': {
    lib: 'sklearn',
    name: 'classification_report',
    kind: 'function',
    docKey: 'sklearn.metrics.classification_report',
  },
  'sklearn.metrics.f1_score': {
    lib: 'sklearn',
    name: 'f1_score',
    kind: 'function',
    docKey: 'sklearn.metrics.f1_score',
  },

  // ============ MATPLOTLIB ============
  'matplotlib': {
    lib: 'matplotlib',
    name: 'matplotlib',
    kind: 'import',
    docKey: 'matplotlib',
  },
  'matplotlib.pyplot': {
    lib: 'matplotlib',
    name: 'pyplot',
    kind: 'import',
    docKey: 'matplotlib.pyplot',
  },
  'plt': {
    lib: 'matplotlib',
    name: 'pyplot',
    kind: 'import',
    docKey: 'matplotlib.pyplot',
  },
  'matplotlib.pyplot.figure': {
    lib: 'matplotlib',
    name: 'figure',
    kind: 'function',
    docKey: 'matplotlib.pyplot.figure',
  },
  'figure': {
    lib: 'matplotlib',
    name: 'figure',
    kind: 'function',
    docKey: 'matplotlib.pyplot.figure',
  },
  'matplotlib.pyplot.plot': {
    lib: 'matplotlib',
    name: 'plot',
    kind: 'function',
    docKey: 'matplotlib.pyplot.plot',
  },
  'plot': {
    lib: 'matplotlib',
    name: 'plot',
    kind: 'function',
    docKey: 'matplotlib.pyplot.plot',
  },
  'matplotlib.pyplot.show': {
    lib: 'matplotlib',
    name: 'show',
    kind: 'function',
    docKey: 'matplotlib.pyplot.show',
  },
  'show': {
    lib: 'matplotlib',
    name: 'show',
    kind: 'function',
    docKey: 'matplotlib.pyplot.show',
  },
  'matplotlib.pyplot.scatter': {
    lib: 'matplotlib',
    name: 'scatter',
    kind: 'function',
    docKey: 'matplotlib.pyplot.scatter',
  },
  'scatter': {
    lib: 'matplotlib',
    name: 'scatter',
    kind: 'function',
    docKey: 'matplotlib.pyplot.scatter',
  },

  // ============ SEABORN ============
  'seaborn': {
    lib: 'seaborn',
    name: 'seaborn',
    kind: 'import',
    docKey: 'seaborn',
  },
  'sns': {
    lib: 'seaborn',
    name: 'seaborn',
    kind: 'import',
    docKey: 'seaborn',
  },
  'seaborn.heatmap': {
    lib: 'seaborn',
    name: 'heatmap',
    kind: 'function',
    docKey: 'seaborn.heatmap',
  },
  'heatmap': {
    lib: 'seaborn',
    name: 'heatmap',
    kind: 'function',
    docKey: 'seaborn.heatmap',
  },
  'seaborn.scatterplot': {
    lib: 'seaborn',
    name: 'scatterplot',
    kind: 'function',
    docKey: 'seaborn.scatterplot',
  },
  'seaborn.boxplot': {
    lib: 'seaborn',
    name: 'boxplot',
    kind: 'function',
    docKey: 'seaborn.boxplot',
  },
  'seaborn.barplot': {
    lib: 'seaborn',
    name: 'barplot',
    kind: 'function',
    docKey: 'seaborn.barplot',
  },

  // ============ JUPYTER ============
  'jupyter': {
    lib: 'jupyter',
    name: 'jupyter',
    kind: 'import',
    docKey: 'jupyter',
  },
  'IPython.display': {
    lib: 'IPython',
    name: 'display',
    kind: 'import',
    docKey: 'IPython.display',
  },
  'IPython.display.display': {
    lib: 'IPython',
    name: 'display',
    kind: 'function',
    docKey: 'IPython.display.display',
  },
  'display': {
    lib: 'IPython',
    name: 'display',
    kind: 'function',
    docKey: 'IPython.display.display',
  },

  // ============ SKLEARN - PIPELINE ============
  'sklearn.pipeline': {
    lib: 'sklearn',
    name: 'pipeline',
    kind: 'import',
    docKey: 'sklearn.pipeline',
  },
  'sklearn.pipeline.Pipeline': {
    lib: 'sklearn',
    name: 'Pipeline',
    kind: 'symbol',
    docKey: 'sklearn.pipeline.Pipeline',
  },
  'Pipeline': {
    lib: 'sklearn',
    name: 'Pipeline',
    kind: 'symbol',
    docKey: 'sklearn.pipeline.Pipeline',
  },

  // ============ WARNINGS ============
  'warnings': {
    lib: 'warnings',
    name: 'warnings',
    kind: 'import',
    docKey: 'warnings',
  },
  'warnings.filterwarnings': {
    lib: 'warnings',
    name: 'filterwarnings',
    kind: 'function',
    docKey: 'warnings',
  },

  // ============ OS ============
  'os': {
    lib: 'os',
    name: 'os',
    kind: 'import',
    docKey: 'os',
  },
  'os.walk': {
    lib: 'os',
    name: 'walk',
    kind: 'function',
    docKey: 'os.walk',
  },
  'os.path.join': {
    lib: 'os',
    name: 'join',
    kind: 'function',
    docKey: 'os',
  },
  'os.listdir': {
    lib: 'os',
    name: 'listdir',
    kind: 'function',
    docKey: 'os',
  },

  // ============ PANDAS - ADDITIONAL ============
  'pandas.get_dummies': {
    lib: 'pandas',
    name: 'get_dummies',
    kind: 'function',
    docKey: 'pandas.get_dummies',
  },
  'get_dummies': {
    lib: 'pandas',
    name: 'get_dummies',
    kind: 'function',
    docKey: 'pandas.get_dummies',
  },
  'pandas.fillna': {
    lib: 'pandas',
    name: 'fillna',
    kind: 'function',
    docKey: 'pandas.fillna',
  },
  'fillna': {
    lib: 'pandas',
    name: 'fillna',
    kind: 'function',
    docKey: 'pandas.fillna',
  },
  'pandas.groupby': {
    lib: 'pandas',
    name: 'groupby',
    kind: 'function',
    docKey: 'pandas.groupby',
  },
  'groupby': {
    lib: 'pandas',
    name: 'groupby',
    kind: 'function',
    docKey: 'pandas.groupby',
  },
  'pandas.isnull': {
    lib: 'pandas',
    name: 'isnull',
    kind: 'function',
    docKey: 'pandas.isnull',
  },
  'isnull': {
    lib: 'pandas',
    name: 'isnull',
    kind: 'function',
    docKey: 'pandas.isnull',
  },
  'pandas.reindex': {
    lib: 'pandas',
    name: 'reindex',
    kind: 'function',
    docKey: 'pandas.reindex',
  },
  'reindex': {
    lib: 'pandas',
    name: 'reindex',
    kind: 'function',
    docKey: 'pandas.reindex',
  },
  'pandas.mode': {
    lib: 'pandas',
    name: 'mode',
    kind: 'function',
    docKey: 'pandas.mode',
  },
  'mode': {
    lib: 'pandas',
    name: 'mode',
    kind: 'function',
    docKey: 'pandas.mode',
  },

  // ============ NUMPY - ADDITIONAL ============
  'numpy.inf': {
    lib: 'numpy',
    name: 'inf',
    kind: 'symbol',
    docKey: 'numpy.inf',
  },

  // ============ SKLEARN - ADDITIONAL ============
  'sklearn.linear_model': {
    lib: 'sklearn',
    name: 'linear_model',
    kind: 'import',
    docKey: 'sklearn',
  },
  'sklearn.linear_model.LogisticRegression': {
    lib: 'sklearn',
    name: 'LogisticRegression',
    kind: 'symbol',
    docKey: 'sklearn.linear_model.LogisticRegression',
  },
  'LogisticRegression': {
    lib: 'sklearn',
    name: 'LogisticRegression',
    kind: 'symbol',
    docKey: 'sklearn.linear_model.LogisticRegression',
  },
};
