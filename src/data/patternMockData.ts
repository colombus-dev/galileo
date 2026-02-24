import { PatternType } from '../types/PatternType';

export const mockDataPattern: PatternType[] = [
    {
        id: 'PCA_Master_Pipeline',
        schema: 'Feature Eng -> Transform -> Save',
        ram: [0.16, 0.33, 0.52, 0.55, 0.63, 0.73],
        executionTime: [0.11, 0.19, 0.22, 0.29, 0.31, 0.7, 0.78],
        notebooks: { 'train.ipynb': 0.99, 'notebook-1': 0.85, 'notebook-3': 0.82 },
        typeAlgo: 'PCA',
        typePattern: 'Preprocessing',
        hierarchy: { parent: null, children: ['PCA_Data_Scaling', 'PCA_Covariance_Matrix', 'PCA_Eigenvalue_Decomp', 'PCA_Explained_Variance', 'PCA_Component_Selection', 'PCA_Inverse_Transform', 'PCA_Biplot_Visualization'] }
    },
    {
        id: 'PCA_Data_Scaling',
        schema: 'Images -> CNN -> Classify',
        ram: [0.1, 0.2, 0.21, 0.52, 0.56, 0.76, 0.86],
        executionTime: [0.11, 0.15, 0.32, 0.73, 0.76, 0.77, 0.88],
        notebooks: { 'prep.ipynb': 0.52, 'notebook-1': 0.95, 'notebook-3': 0.92 }, // notebook-1 et 3 utilisent StandardScaler
        typeAlgo: 'PCA',
        typePattern: 'Preprocessing',
        hierarchy: { parent: 'PCA_Master_Pipeline', children: null }
    },
    {
        id: 'PCA_Covariance_Matrix',
        schema: 'Tokens -> Embed -> Dense',
        ram: [0.16, 0.34, 0.42, 0.78],
        executionTime: [0.28, 0.44, 0.47, 0.49, 0.65, 0.69, 0.84],
        notebooks: { 'model.ipynb': 0.51 },
        typeAlgo: 'PCA',
        typePattern: 'Clustering',
        hierarchy: { parent: 'PCA_Master_Pipeline', children: null }
    },
    {
        id: 'PCA_Eigenvalue_Decomp',
        schema: 'Feature Eng -> Transform -> Save',
        ram: [0.11, 0.31, 0.37, 0.74, 0.74, 0.81, 0.82, 0.87],
        executionTime: [0.13, 0.24, 0.25, 0.29, 0.29, 0.84, 0.86],
        notebooks: { 'train.ipynb': 0.57 },
        typeAlgo: 'PCA',
        typePattern: 'Preprocessing',
        hierarchy: { parent: 'PCA_Master_Pipeline', children: null }
    },
    {
        id: 'PCA_Explained_Variance',
        schema: 'Scale -> Fit -> Feature Importance',
        ram: [0.22, 0.24, 0.52, 0.59, 0.61],
        executionTime: [0.15, 0.16, 0.19, 0.34, 0.49, 0.53, 0.68, 0.74],
        notebooks: { 'eval.ipynb': 0.86 },
        typeAlgo: 'PCA',
        typePattern: 'Preprocessing',
        hierarchy: { parent: 'PCA_Master_Pipeline', children: null }
    },
    {
        id: 'PCA_Component_Selection',
        schema: 'Feature Eng -> Transform -> Save',
        ram: [0.35, 0.55, 0.71, 0.78, 0.88],
        executionTime: [0.18, 0.38, 0.56, 0.67, 0.74, 0.76, 0.78],
        notebooks: { 'explore.ipynb': 0.59, 'notebook-3': 0.94 },
        typeAlgo: 'PCA',
        typePattern: 'Training',
        hierarchy: { parent: 'PCA_Master_Pipeline', children: null }
    },
    {
        id: 'PCA_Inverse_Transform',
        schema: 'Load Data -> Clean -> Output',
        ram: [0.15, 0.36, 0.48, 0.58, 0.68],
        executionTime: [0.14, 0.15, 0.21, 0.28, 0.53, 0.59, 0.81, 0.83],
        notebooks: { 'experiment.ipynb': 0.9 },
        typeAlgo: 'PCA',
        typePattern: 'Evaluation',
        hierarchy: { parent: 'PCA_Master_Pipeline', children: null }
    },
    {
        id: 'PCA_Biplot_Visualization',
        schema: 'Scale -> Fit -> Feature Importance',
        ram: [0.14, 0.58, 0.62, 0.75, 0.82],
        executionTime: [0.34, 0.49, 0.62, 0.78, 0.8, 0.85],
        notebooks: { 'eval.ipynb': 0.59 },
        typeAlgo: 'PCA',
        typePattern: 'Evaluation',
        hierarchy: { parent: 'PCA_Master_Pipeline', children: null }
    },
    {
        id: 'RF_Ensemble_Training_Flow',
        schema: 'Tokens -> Embed -> Dense',
        ram: [0.16, 0.2, 0.25, 0.4, 0.56, 0.56, 0.68, 0.89],
        executionTime: [0.19, 0.28, 0.33, 0.56, 0.61],
        notebooks: { 'eval.ipynb': 0.66, 'notebook-1': 0.98 },
        typeAlgo: 'Random Forest',
        typePattern: 'Training',
        hierarchy: { parent: null, children: ['RF_Bagging_Init', 'RF_Tree_Depth_Opt', 'RF_Min_Samples_Leaf', 'RF_OOB_Score_Calc', 'RF_Gini_Importance', 'RF_Permutation_Importance', 'RF_Decision_Boundary'] }
    },
    {
        id: 'RF_Bagging_Init',
        schema: 'Feature Eng -> Transform -> Save',
        ram: [0.17, 0.3, 0.49, 0.62, 0.66, 0.77],
        executionTime: [0.51, 0.55, 0.67, 0.89],
        notebooks: { 'model.ipynb': 0.79 },
        typeAlgo: 'Random Forest',
        typePattern: 'Training',
        hierarchy: { parent: 'RF_Ensemble_Training_Flow', children: null }
    },
    {
        id: 'RF_Tree_Depth_Opt',
        schema: 'Train/Test Split -> Fit -> Predict',
        ram: [0.16, 0.29, 0.35, 0.47, 0.6, 0.63, 0.68, 0.8],
        executionTime: [0.34, 0.34, 0.66, 0.69],
        notebooks: { 'eval.ipynb': 0.86, 'notebook-2': 0.88 },
        typeAlgo: 'Random Forest',
        typePattern: 'Evaluation',
        hierarchy: { parent: 'RF_Ensemble_Training_Flow', children: null }
    },
    {
        id: 'RF_Min_Samples_Leaf',
        schema: 'Images -> CNN -> Classify',
        ram: [0.1, 0.13, 0.19, 0.34, 0.58],
        executionTime: [0.48, 0.72, 0.73, 0.84],
        notebooks: { 'prep.ipynb': 0.6 },
        typeAlgo: 'Random Forest',
        typePattern: 'Evaluation',
        hierarchy: { parent: 'RF_Ensemble_Training_Flow', children: null }
    },
    {
        id: 'RF_OOB_Score_Calc',
        schema: 'Vectorize -> Cluster -> Elbow',
        ram: [0.28, 0.46, 0.5, 0.68],
        executionTime: [0.3, 0.33, 0.47, 0.53, 0.64, 0.82, 0.85],
        notebooks: { 'explore.ipynb': 0.65 },
        typeAlgo: 'Random Forest',
        typePattern: 'Deep Learning',
        hierarchy: { parent: 'RF_Ensemble_Training_Flow', children: null }
    },
    {
        id: 'RF_Gini_Importance',
        schema: 'Scale -> Fit -> Feature Importance',
        ram: [0.1, 0.14, 0.29, 0.31, 0.48, 0.59, 0.77],
        executionTime: [0.19, 0.22, 0.38, 0.7, 0.72, 0.86],
        notebooks: { 'experiment.ipynb': 0.66, 'notebook-1': 0.95 },
        typeAlgo: 'Random Forest',
        typePattern: 'Deep Learning',
        hierarchy: { parent: 'RF_Ensemble_Training_Flow', children: null }
    },
    {
        id: 'RF_Permutation_Importance',
        schema: 'Load Data -> Clean -> Output',
        ram: [0.2, 0.36, 0.54, 0.84],
        executionTime: [0.14, 0.15, 0.25, 0.31, 0.46, 0.52, 0.74],
        notebooks: { 'explore.ipynb': 0.66 },
        typeAlgo: 'Random Forest',
        typePattern: 'Clustering',
        hierarchy: { parent: 'RF_Ensemble_Training_Flow', children: null }
    },
    {
        id: 'RF_Decision_Boundary',
        schema: 'Feature Eng -> Transform -> Save',
        ram: [0.13, 0.26, 0.39, 0.49, 0.72, 0.75, 0.77, 0.77],
        executionTime: [0.3, 0.49, 0.5, 0.64, 0.65, 0.76],
        notebooks: { 'explore.ipynb': 0.64, 'notebook-2': 0.80 },
        typeAlgo: 'Random Forest',
        typePattern: 'Training',
        hierarchy: { parent: 'RF_Ensemble_Training_Flow', children: null }
    },
    {
        id: 'KMeans_Clustering_Workflow',
        schema: 'Images -> CNN -> Classify',
        ram: [0.2, 0.29, 0.71, 0.89, 0.9, 0.9],
        executionTime: [0.16, 0.32, 0.42, 0.45, 0.49, 0.62, 0.67, 0.79],
        notebooks: { 'explore.ipynb': 0.97 },
        typeAlgo: 'K-Means',
        typePattern: 'Clustering',
        hierarchy: { parent: null, children: ['KMeans_Data_Vectorization', 'KMeans_Plus_Plus_Init', 'KMeans_Elbow_Curve', 'KMeans_Silhouette_Score', 'KMeans_Inertia_Tracking', 'KMeans_Voronoi_Plot', 'KMeans_Cluster_Assignment'] }
    },
    {
        id: 'KMeans_Data_Vectorization',
        schema: 'Train/Test Split -> Fit -> Predict',
        ram: [0.14, 0.19, 0.2, 0.23, 0.72, 0.77, 0.85],
        executionTime: [0.13, 0.42, 0.57, 0.77, 0.88],
        notebooks: { 'model.ipynb': 0.6 },
        typeAlgo: 'K-Means',
        typePattern: 'Clustering',
        hierarchy: { parent: 'KMeans_Clustering_Workflow', children: null }
    },
    {
        id: 'KMeans_Plus_Plus_Init',
        schema: 'Images -> CNN -> Classify',
        ram: [0.15, 0.23, 0.27, 0.35],
        executionTime: [0.12, 0.22, 0.31, 0.34, 0.44, 0.62, 0.85],
        notebooks: { 'model.ipynb': 0.52 },
        typeAlgo: 'K-Means',
        typePattern: 'Clustering',
        hierarchy: { parent: 'KMeans_Clustering_Workflow', children: null }
    },
    {
        id: 'KMeans_Elbow_Curve',
        schema: 'Load API -> Prompt -> Response',
        ram: [0.32, 0.42, 0.81, 0.89],
        executionTime: [0.26, 0.48, 0.77, 0.88],
        notebooks: { 'eval.ipynb': 0.92 },
        typeAlgo: 'K-Means',
        typePattern: 'Preprocessing',
        hierarchy: { parent: 'KMeans_Clustering_Workflow', children: null }
    },
    {
        id: 'KMeans_Silhouette_Score',
        schema: 'Vectorize -> Cluster -> Elbow',
        ram: [0.14, 0.16, 0.22, 0.42, 0.46, 0.59, 0.61, 0.85],
        executionTime: [0.12, 0.27, 0.3, 0.48, 0.56, 0.64],
        notebooks: { 'model.ipynb': 0.9 },
        typeAlgo: 'K-Means',
        typePattern: 'Clustering',
        hierarchy: { parent: 'KMeans_Clustering_Workflow', children: null }
    },
    {
        id: 'KMeans_Inertia_Tracking',
        schema: 'Train/Test Split -> Fit -> Predict',
        ram: [0.26, 0.49, 0.75, 0.77, 0.79, 0.82],
        executionTime: [0.26, 0.35, 0.44, 0.5, 0.57, 0.58, 0.66],
        notebooks: { 'eval.ipynb': 0.56 },
        typeAlgo: 'K-Means',
        typePattern: 'Preprocessing',
        hierarchy: { parent: 'KMeans_Clustering_Workflow', children: null }
    },
    {
        id: 'KMeans_Voronoi_Plot',
        schema: 'Feature Eng -> Transform -> Save',
        ram: [0.23, 0.25, 0.53, 0.73, 0.85],
        executionTime: [0.21, 0.3, 0.36, 0.51, 0.59, 0.71, 0.88],
        notebooks: { 'explore.ipynb': 0.93 },
        typeAlgo: 'K-Means',
        typePattern: 'Deep Learning',
        hierarchy: { parent: 'KMeans_Clustering_Workflow', children: null }
    },
    {
        id: 'KMeans_Cluster_Assignment',
        schema: 'Load API -> Prompt -> Response',
        ram: [0.13, 0.33, 0.34, 0.66, 0.76],
        executionTime: [0.15, 0.29, 0.3, 0.36, 0.48, 0.62, 0.78, 0.83],
        notebooks: { 'explore.ipynb': 0.62 },
        typeAlgo: 'K-Means',
        typePattern: 'Clustering',
        hierarchy: { parent: 'KMeans_Clustering_Workflow', children: null }
    },
    {
        id: 'XGB_Gradient_Boosting_Flow',
        schema: 'Train/Test Split -> Fit -> Predict',
        ram: [0.37, 0.79, 0.82, 0.88],
        executionTime: [0.29, 0.51, 0.53, 0.57, 0.58, 0.63, 0.67, 0.7],
        notebooks: { 'prep.ipynb': 0.64 },
        typeAlgo: 'XGBoost',
        typePattern: 'Evaluation',
        hierarchy: { parent: null, children: ['XGB_DMatrix_Conversion', 'XGB_Learning_Rate_Sched', 'XGB_Max_Depth_Search', 'XGB_Early_Stopping', 'XGB_Cross_Validation', 'XGB_Confusion_Matrix', 'XGB_ROC_AUC_Curve'] }
    },
    {
        id: 'XGB_DMatrix_Conversion',
        schema: 'Load API -> Prompt -> Response',
        ram: [0.33, 0.47, 0.69, 0.73, 0.79, 0.79, 0.8],
        executionTime: [0.34, 0.42, 0.51, 0.54, 0.86, 0.9],
        notebooks: { 'model.ipynb': 0.98 },
        typeAlgo: 'XGBoost',
        typePattern: 'Deep Learning',
        hierarchy: { parent: 'XGB_Gradient_Boosting_Flow', children: null }
    },
    {
        id: 'XGB_Learning_Rate_Sched',
        schema: 'Train/Test Split -> Fit -> Predict',
        ram: [0.18, 0.26, 0.65, 0.83, 0.84],
        executionTime: [0.14, 0.31, 0.41, 0.46, 0.55, 0.57, 0.79, 0.82],
        notebooks: { 'experiment.ipynb': 0.86 },
        typeAlgo: 'XGBoost',
        typePattern: 'Evaluation',
        hierarchy: { parent: 'XGB_Gradient_Boosting_Flow', children: null }
    },
    {
        id: 'XGB_Max_Depth_Search',
        schema: 'Feature Eng -> Transform -> Save',
        ram: [0.1, 0.1, 0.35, 0.37, 0.52, 0.67, 0.7, 0.85],
        executionTime: [0.26, 0.29, 0.34, 0.54, 0.57, 0.67, 0.68, 0.83],
        notebooks: { 'prep.ipynb': 0.55 },
        typeAlgo: 'XGBoost',
        typePattern: 'Evaluation',
        hierarchy: { parent: 'XGB_Gradient_Boosting_Flow', children: null }
    },
    {
        id: 'XGB_Early_Stopping',
        schema: 'Scale -> Fit -> Feature Importance',
        ram: [0.13, 0.17, 0.2, 0.43, 0.53, 0.62, 0.9],
        executionTime: [0.14, 0.26, 0.29, 0.48, 0.51, 0.54, 0.74, 0.79],
        notebooks: { 'explore.ipynb': 0.81 },
        typeAlgo: 'XGBoost',
        typePattern: 'Evaluation',
        hierarchy: { parent: 'XGB_Gradient_Boosting_Flow', children: null }
    },
    {
        id: 'XGB_Cross_Validation',
        schema: 'Images -> CNN -> Classify',
        ram: [0.22, 0.25, 0.33, 0.65],
        executionTime: [0.14, 0.16, 0.33, 0.45, 0.47, 0.63, 0.72],
        notebooks: { 'explore.ipynb': 0.84, 'notebook-3': 0.95 },
        typeAlgo: 'XGBoost',
        typePattern: 'Evaluation',
        hierarchy: { parent: 'XGB_Gradient_Boosting_Flow', children: null }
    },
    {
        id: 'XGB_Confusion_Matrix',
        schema: 'Tokens -> Embed -> Dense',
        ram: [0.19, 0.31, 0.35, 0.4, 0.62, 0.65, 0.76, 0.76],
        executionTime: [0.18, 0.22, 0.38, 0.55, 0.68, 0.72, 0.85],
        notebooks: { 'explore.ipynb': 0.69, 'notebook-1': 0.90, 'notebook-3': 0.88 },
        typeAlgo: 'XGBoost',
        typePattern: 'Evaluation',
        hierarchy: { parent: 'XGB_Gradient_Boosting_Flow', children: null }
    },
    {
        id: 'XGB_ROC_AUC_Curve',
        schema: 'Load API -> Prompt -> Response',
        ram: [0.23, 0.29, 0.7, 0.76, 0.89],
        executionTime: [0.32, 0.63, 0.66, 0.71],
        notebooks: { 'prep.ipynb': 0.65 },
        typeAlgo: 'XGBoost',
        typePattern: 'Evaluation',
        hierarchy: { parent: 'XGB_Gradient_Boosting_Flow', children: null }
    },

    {
        id: 'NN_Deep_Learning_Pipeline',
        schema: 'Scale -> Fit -> Feature Importance',
        ram: [0.23, 0.28, 0.29, 0.3, 0.35, 0.57, 0.68],
        executionTime: [0.11, 0.18, 0.4, 0.43, 0.46, 0.51, 0.61, 0.75],
        notebooks: { 'prep.ipynb': 0.75 },
        typeAlgo: 'Neural Network',
        typePattern: 'Deep Learning',
        hierarchy: { parent: null, children: ['NN_Tensor_Conversion', 'NN_Batch_Normalization', 'NN_Adam_Optimizer', 'NN_Backpropagation', 'NN_Loss_Function_Graph', 'NN_Validation_Accuracy', 'NN_Model_Checkpointing'] }
    },
    {
        id: 'NN_Tensor_Conversion',
        schema: 'Scale -> Fit -> Feature Importance',
        ram: [0.46, 0.62, 0.73, 0.76, 0.85],
        executionTime: [0.18, 0.19, 0.28, 0.38, 0.51, 0.79],
        notebooks: { 'explore.ipynb': 0.77 },
        typeAlgo: 'Neural Network',
        typePattern: 'Deep Learning',
        hierarchy: { parent: 'NN_Deep_Learning_Pipeline', children: null }
    },
    {
        id: 'NN_Batch_Normalization',
        schema: 'Feature Eng -> Transform -> Save',
        ram: [0.17, 0.34, 0.34, 0.69, 0.71, 0.83],
        executionTime: [0.2, 0.4, 0.46, 0.5, 0.71, 0.73, 0.82, 0.85],
        notebooks: { 'explore.ipynb': 0.65 },
        typeAlgo: 'Neural Network',
        typePattern: 'Evaluation',
        hierarchy: { parent: 'NN_Deep_Learning_Pipeline', children: null }
    },
    {
        id: 'NN_Adam_Optimizer',
        schema: 'Train/Test Split -> Fit -> Predict',
        ram: [0.19, 0.25, 0.52, 0.81, 0.82, 0.87, 0.87],
        executionTime: [0.2, 0.28, 0.38, 0.76, 0.78, 0.81],
        notebooks: { 'train.ipynb': 0.88 },
        typeAlgo: 'Neural Network',
        typePattern: 'Clustering',
        hierarchy: { parent: 'NN_Deep_Learning_Pipeline', children: null }
    },
    {
        id: 'NN_Backpropagation',
        schema: 'Load Data -> Clean -> Output',
        ram: [0.1, 0.13, 0.32, 0.59],
        executionTime: [0.12, 0.25, 0.31, 0.36, 0.37, 0.77],
        notebooks: { 'eval.ipynb': 0.63 },
        typeAlgo: 'Neural Network',
        typePattern: 'Deep Learning',
        hierarchy: { parent: 'NN_Deep_Learning_Pipeline', children: null }
    },
    {
        id: 'NN_Loss_Function_Graph',
        schema: 'Train/Test Split -> Fit -> Predict',
        ram: [0.16, 0.28, 0.46, 0.5, 0.67, 0.71, 0.73, 0.74],
        executionTime: [0.17, 0.25, 0.28, 0.33, 0.41, 0.61, 0.66, 0.78],
        notebooks: { 'explore.ipynb': 0.56 },
        typeAlgo: 'Neural Network',
        typePattern: 'Preprocessing',
        hierarchy: { parent: 'NN_Deep_Learning_Pipeline', children: null }
    },
    {
        id: 'NN_Validation_Accuracy',
        schema: 'Train/Test Split -> Fit -> Predict',
        ram: [0.19, 0.43, 0.47, 0.48],
        executionTime: [0.2, 0.23, 0.28, 0.44, 0.67, 0.87],
        notebooks: { 'eval.ipynb': 0.74 },
        typeAlgo: 'Neural Network',
        typePattern: 'Deep Learning',
        hierarchy: { parent: 'NN_Deep_Learning_Pipeline', children: null }
    },
    {
        id: 'NN_Model_Checkpointing',
        schema: 'Load Data -> Clean -> Output',
        ram: [0.14, 0.35, 0.44, 0.46, 0.48, 0.58],
        executionTime: [0.14, 0.15, 0.28, 0.32, 0.32, 0.56, 0.74],
        notebooks: { 'experiment.ipynb': 0.89 },
        typeAlgo: 'Neural Network',
        typePattern: 'Training',
        hierarchy: { parent: 'NN_Deep_Learning_Pipeline', children: null }
    }
];