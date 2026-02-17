import { PatternType } from '../PatternType';

export const mockDataPattern: PatternType[] = [
    {
        id: 'Iso_Distribution_V1',
        schema: 'Library Loading -> Others -> Library Loading',
        score: { '[0-0.2[': 1, '[0.2-0.4[': 0, '[0.4-0.6[': 5, '[0.6-0.8[': 20, '[0.8-1.0]': 5 },
        ram: [0.12, 0.15, 0.18, 0.45, 0.52, 0.58, 0.71, 0.75, 0.79],
        executionTime: [0.05, 0.08, 0.12, 0.15, 0.22, 0.31],
        notebooks: { 'notebook-1': 0.8, 'experiment_A.ipynb': 0.3 },
        typeAlgo: 'Isolation Forest',
        typePattern: 'Distribution',
        hierarchy: { parent: null, children: ['Iso_Outlier_Detection'] }
    },
    {
        id: 'Iso_Outlier_Detection',
        schema: 'Feature Eng -> Model Fit -> Prediction',
        score: { '[0-0.2[': 100, '[0.2-0.4[': 10, '[0.4-0.6[': 5, '[0.6-0.8[': 2, '[0.8-1.0]': 1 },
        ram: [0.25, 0.31, 0.42, 0.48, 0.55, 0.61, 0.65],
        executionTime: [0.45, 0.52, 0.68, 0.72, 0.81, 0.85, 0.92],
        notebooks: { 'notebook-2': 0.95,'notebook-1': 0.8 },
        typeAlgo: 'Isolation Forest',
        typePattern: 'Outlier',
        hierarchy: { parent: 'Iso_Distribution_V1', children: null }
    },
    {
        id: 'PCA_Dimensionality',
        schema: 'Load Data -> Standardize -> PCA Transform',
        score: { '[0-0.2[': 10, '[0.2-0.4[': 20, '[0.4-0.6[': 30, '[0.6-0.8[': 40, '[0.8-1.0]': 50 },
        ram: [0.55, 0.62, 0.68, 0.75, 0.82, 0.88, 0.91, 0.95],
        executionTime: [0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75],
        notebooks: { 'notebook-3': 0.7, 'visu_3d.ipynb': 0.5,'notebook-1': 0.8 },
        typeAlgo: 'PCA',
        typePattern: 'Preprocessing',
        hierarchy: { parent: null, children: null }
    },
    {
        id: 'Scaler_Normalization',
        schema: 'Load Data -> Clean NaNs -> StandardScaler',
        score: { '[0-0.2[': 50, '[0.2-0.4[': 50, '[0.4-0.6[': 50, '[0.6-0.8[': 50, '[0.8-1.0]': 50 },
        ram: [0.05, 0.08, 0.11, 0.14, 0.17, 0.19],
        executionTime: [0.01, 0.02, 0.04, 0.05, 0.07, 0.09, 0.12],
        notebooks: { 'prep_pipeline.ipynb': 0.98 },
        typeAlgo: 'StandardScaler',
        typePattern: 'Preprocessing',
        hierarchy: { parent: null, children: null }
    },
    {
        id: 'KMeans_Customer_Seg',
        schema: 'Vectorize -> K-Means -> Elbow Method',
        score: { '[0-0.2[': 5, '[0.2-0.4[': 15, '[0.4-0.6[': 80, '[0.6-0.8[': 20, '[0.8-1.0]': 5 },
        ram: [0.35, 0.42, 0.45, 0.51, 0.55, 0.58, 0.62],
        executionTime: [0.41, 0.48, 0.52, 0.55, 0.59, 0.72],
        notebooks: { 'segmentation_2023.ipynb': 0.85 },
        typeAlgo: 'K-Means',
        typePattern: 'Clustering',
        hierarchy: { parent: null, children: null }
    },
    {
        id: 'KMeans_Image_Quant',
        schema: 'Image Load -> Reshape -> K-Means',
        score: { '[0-0.2[': 2, '[0.2-0.4[': 8, '[0.4-0.6[': 40, '[0.6-0.8[': 60, '[0.8-1.0]': 10 },
        ram: [0.65, 0.72, 0.78, 0.81, 0.85, 0.92, 0.98],
        executionTime: [0.55, 0.68, 0.75, 0.82, 0.88, 0.95],
        notebooks: { 'color_compression.ipynb': 0.75, 'test_k.ipynb': 0.2 },
        typeAlgo: 'K-Means',
        typePattern: 'Clustering',
        hierarchy: { parent: null, children: null }
    },
    {
        id: 'RandomForest_Training',
        schema: 'Train/Test Split -> RF Classifier -> Confusion Matrix',
        score: { '[0-0.2[': 0, '[0.2-0.4[': 5, '[0.4-0.6[': 10, '[0.6-0.8[': 90, '[0.8-1.0]': 150 },
        ram: [0.58, 0.65, 0.72, 0.78, 0.85, 0.91, 0.96, 0.99],
        executionTime: [0.75, 0.82, 0.88, 0.92, 0.95, 0.98],
        notebooks: { 'final_model.ipynb': 0.98 },
        typeAlgo: 'Random Forest',
        typePattern: 'Training',
        hierarchy: { parent: null, children: null }
    },
    {
        id: 'DBSCAN_Noise_Filter',
        schema: 'Spatial Index -> DBSCAN -> Filter -1',
        score: { '[0-0.2[': 120, '[0.2-0.4[': 30, '[0.4-0.6[': 10, '[0.6-0.8[': 5, '[0.8-1.0]': 0 },
        ram: [0.38, 0.42, 0.48, 0.52, 0.55, 0.59],
        executionTime: [0.45, 0.55, 0.65, 0.75, 0.85, 0.95],
        notebooks: { 'geo_cleaning.ipynb': 0.65 },
        typeAlgo: 'DBSCAN',
        typePattern: 'Cleaning',
        hierarchy: { parent: null, children: null }
    },
    {
        id: 'NeuralNet_LSTM',
        schema: 'Tokenize -> Embedding -> LSTM Layer -> Dense',
        score: { '[0-0.2[': 10, '[0.2-0.4[': 10, '[0.4-0.6[': 20, '[0.6-0.8[': 30, '[0.8-1.0]': 80 },
        ram: [0.78, 0.82, 0.88, 0.91, 0.95, 0.98, 0.99],
        executionTime: [0.85, 0.89, 0.92, 0.95, 0.97, 0.99],
        notebooks: { 'sentiment_analysis.ipynb': 0.88, 'gpu_test.ipynb': 0.1 },
        typeAlgo: 'LSTM',
        typePattern: 'Deep Learning',
        hierarchy: { parent: null, children: null }
    },
    {
        id: "Exemple_de_Pattern_Parent",
        schema: "Data Preparation -> * -> Modeling",
        score: { '[0-0.2[': 10, '[0.2-0.4[': 20, '[0.4-0.6[': 30, '[0.6-0.8[': 25, '[0.8-1.0]': 15 },
        ram: [0.1, 0.3, 0.5, 0.7, 0.9],
        executionTime: [0.2, 0.4, 0.6, 0.8],
        notebooks: { 'example_pattern.ipynb': 0.9 },
        typeAlgo: 'ExampleAlgo',
        typePattern: 'ExampleType',
        hierarchy: { parent: null, children: ['Exemple_de_Pattern_Enfant', 'Exemple_de_Pattern_Enfant_2'] }
    },
    {
        id: "Exemple_de_Pattern_Enfant",
        schema: "Data Preparation -> Cleaning -> Modeling",
        score: { '[0-0.2[': 5, '[0.2-0.4[': 15, '[0.4-0.6[': 25, '[0.6-0.8[': 35, '[0.8-1.0]': 20 },
        ram: [0.2, 0.4, 0.5, 0.6, 0.7],
        executionTime: [0.1, 0.3, 0.4, 0.5, 0.6],
        notebooks: { 'example_child_pattern.ipynb': 0.85 },
        typeAlgo: 'ExampleAlgo',
        typePattern: 'ExampleType',
        hierarchy: { parent: "Exemple_de_Pattern_Parent", children: null }
    },
    {
        id: "Exemple_de_Pattern_Enfant_2",
        schema: "Data Preparation -> Cleaning -> Modeling",
        score: { '[0-0.2[': 5, '[0.2-0.4[': 15, '[0.4-0.6[': 25, '[0.6-0.8[': 35, '[0.8-1.0]': 20 },
        ram: [0.2, 0.4, 0.5, 0.6, 0.7],
        executionTime: [0.1, 0.3, 0.4, 0.5, 0.6],
        notebooks: { 'example_child_pattern.ipynb': 0.85 },
        typeAlgo: 'ExampleAlgo',
        typePattern: 'ExampleType',
        hierarchy: { parent: "Exemple_de_Pattern_Parent", children: null }
    }
];