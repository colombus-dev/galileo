import { PatternType } from '../PatternType';

export const mockDataPattern: PatternType[] = [
    {
        id: 'Iso_Distribution_V1',
        schema: 'Library Loading -> Others -> Library Loading',
        counts: { '[0-0.2[': 1, '[0.2-0.4[': 0, '[0.4-0.6[': 5, '[0.6-0.8[': 20, '[0.8-1.0]': 5 },
        notebooks: { 'data_exploration.ipynb': 0.8, 'experiment_A.ipynb': 0.3 },
        TypeAlgo: 'Isolation Forest',
        TypePattern: 'Distribution',
        hierarchy: {
            parent: null,
            children: null
        }
    },
    {
        id: 'Iso_Outlier_Detection',
        schema: 'Feature Eng -> Model Fit -> Prediction',
        counts: { '[0-0.2[': 100, '[0.2-0.4[': 10, '[0.4-0.6[': 5, '[0.6-0.8[': 2, '[0.8-1.0]': 1 },
        notebooks: { 'fraud_detection.ipynb': 0.95 },
        TypeAlgo: 'Isolation Forest',
        TypePattern: 'Outlier',
        hierarchy: {
            parent: null,
            children: null
        }
    },
    {
        id: 'PCA_Dimensionality',
        schema: 'Load Data -> Standardize -> PCA Transform',
        counts: { '[0-0.2[': 10, '[0.2-0.4[': 20, '[0.4-0.6[': 30, '[0.6-0.8[': 40, '[0.8-1.0]': 50 },
        notebooks: { 'dim_reduction.ipynb': 0.7, 'visu_3d.ipynb': 0.5 },
        TypeAlgo: 'PCA',
        TypePattern: 'Preprocessing',
        hierarchy: {
            parent: null,
            children: null
        }
    },
    {
        id: 'Scaler_Normalization',
        schema: 'Load Data -> Clean NaNs -> StandardScaler',
        counts: { '[0-0.2[': 50, '[0.2-0.4[': 50, '[0.4-0.6[': 50, '[0.6-0.8[': 50, '[0.8-1.0]': 50 },
        notebooks: { 'prep_pipeline.ipynb': 0.98 },
        TypeAlgo: 'StandardScaler',
        TypePattern: 'Preprocessing',
        hierarchy: {
            parent: null,
            children: null
        }
    },
    {
        id: 'KMeans_Customer_Seg',
        schema: 'Vectorize -> K-Means -> Elbow Method',
        counts: { '[0-0.2[': 5, '[0.2-0.4[': 15, '[0.4-0.6[': 80, '[0.6-0.8[': 20, '[0.8-1.0]': 5 },
        notebooks: { 'segmentation_2023.ipynb': 0.85 },
        TypeAlgo: 'K-Means',
        TypePattern: 'Clustering',
        hierarchy: {
            parent: null,
            children: null
        }
    },
    {
        id: 'KMeans_Image_Quant',
        schema: 'Image Load -> Reshape -> K-Means',
        counts: { '[0-0.2[': 2, '[0.2-0.4[': 8, '[0.4-0.6[': 40, '[0.6-0.8[': 60, '[0.8-1.0]': 10 },
        notebooks: { 'color_compression.ipynb': 0.75, 'test_k.ipynb': 0.2 },
        TypeAlgo: 'K-Means',
        TypePattern: 'Clustering',
        hierarchy: {
            parent: null,
            children: null
        }
    },
    {
        id: 'RandomForest_Training',
        schema: 'Train/Test Split -> RF Classifier -> Confusion Matrix',
        counts: { '[0-0.2[': 0, '[0.2-0.4[': 5, '[0.4-0.6[': 10, '[0.6-0.8[': 90, '[0.8-1.0]': 150 },
        notebooks: { 'final_model.ipynb': 0.98 },
        TypeAlgo: 'Random Forest',
        TypePattern: 'Training',
        hierarchy: {
            parent: null,
            children: null
        }
    },
    {
        id: 'DBSCAN_Noise_Filter',
        schema: 'Spatial Index -> DBSCAN -> Filter -1',
        counts: { '[0-0.2[': 120, '[0.2-0.4[': 30, '[0.4-0.6[': 10, '[0.6-0.8[': 5, '[0.8-1.0]': 0 },
        notebooks: { 'geo_cleaning.ipynb': 0.65 },
        TypeAlgo: 'DBSCAN',
        TypePattern: 'Cleaning',
        hierarchy: {
            parent: null,
            children: null
        }
    },
    {
        id: 'NeuralNet_LSTM',
        schema: 'Tokenize -> Embedding -> LSTM Layer -> Dense',
        counts: { '[0-0.2[': 10, '[0.2-0.4[': 10, '[0.4-0.6[': 20, '[0.6-0.8[': 30, '[0.8-1.0]': 80 },
        notebooks: { 'sentiment_analysis.ipynb': 0.88, 'gpu_test.ipynb': 0.1 },
        TypeAlgo: 'LSTM',
        TypePattern: 'Deep Learning',
        hierarchy: {
            parent: null,
            children: null
        }
    }
];