import { PatternType } from '../PatternType';

export const mockDataPattern: PatternType[] = [
    {
        id: 'Gaussian_Distribution',
        schema: 'Library Loading -> Others -> Library Loading',
        counts: { '[0-0.2[': 1, '[0.2-0.4[': 0, '[0.4-0.6[': 0, '[0.6-0.8[': 2, '[0.8-1.0]': 1 },
        notebooks: { 'analysis_v1.ipynb': 0.6, 'experiment_A.ipynb': 0.4 },
        TypeAlgo: 'Isolation Forest',
        TypePattern: 'Distribution'
    },
    {
        id: 'Annealing_and_binary',
        schema: 'Model Building and Training -> Model Training',
        counts: { '[0-0.2[': 0, '[0.2-0.4[': 5, '[0.4-0.6[': 20, '[0.6-0.8[': 80, '[0.8-1.0]': 160 },
        notebooks: { 'production_model.ipynb': 0.9 },
        TypeAlgo: 'Random Forest',
        TypePattern: 'Loading'
    },
    {
        id: 'Normalisation',
        schema: 'Data Preprocessing -> Data Normalization',
        counts: { '[0-0.2[': 150, '[0.2-0.4[': 80, '[0.4-0.6[': 20, '[0.6-0.8[': 5, '[0.8-1.0]': 0 },
        notebooks: { 'debug_session.ipynb': 0.6, 'old_version.ipynb': 0.4 },
        TypeAlgo: 'DBSCAN',
        TypePattern: 'Normalisation'
    },
    {
        id: 'Normalisation_Forest',
        schema: 'Data Preprocessing -> Data Normalization',
        counts: { '[0-0.2[': 100, '[0.2-0.4[': 90, '[0.4-0.6[': 50, '[0.6-0.8[': 12, '[0.8-1.0]': 0 },
        notebooks: { 'debug_session.ipynb': 0.6, 'old_version.ipynb': 0.4 },
        TypeAlgo: 'Isolation Forest',
        TypePattern: 'Normalisation'
    },
    {
        id: 'Normalisation_Forest_2',
        schema: 'Data Preprocessing -> Data Normalization',
        counts: { '[0-0.2[': 100, '[0.2-0.4[': 90, '[0.4-0.6[': 50, '[0.6-0.8[': 12, '[0.8-1.0]': 100 },
        notebooks: { 'debug_session.ipynb': 0.6, 'old_version.ipynb': 0.4 },
        TypeAlgo: 'Isolation Forest',
        TypePattern: 'Normalisation'
    },
    {
        id: 'Normalisation_Forest_3',
        schema: 'Data Preprocessing -> Data Normalization',
        counts: { '[0-0.2[': 100, '[0.2-0.4[': 90, '[0.4-0.6[': 50, '[0.6-0.8[': 12, '[0.8-1.0]': 100 },
        notebooks: { 'debug_session.ipynb': 0.6, 'old_version.ipynb': 0.4 },
        TypeAlgo: 'Isolation Forest',
        TypePattern: 'Normalisation'
    },
    {
        id: 'Normalisation_Forest_4',
        schema: 'Data Preprocessing -> Data Normalization',
        counts: { '[0-0.2[': 100, '[0.2-0.4[': 90, '[0.4-0.6[': 50, '[0.6-0.8[': 12, '[0.8-1.0]': 100 },
        notebooks: { 'debug_session.ipynb': 0.6, 'old_version.ipynb': 0.4 },
        TypeAlgo: 'Isolation Forest',
        TypePattern: 'Normalisation'
    },
    {
        id: 'Normalisation_Forest_5',
        schema: 'Data Preprocessing -> Data Normalization',
        counts: { '[0-0.2[': 100, '[0.2-0.4[': 90, '[0.4-0.6[': 50, '[0.6-0.8[': 12, '[0.8-1.0]': 100 },
        notebooks: { 'debug_session.ipynb': 0.6, 'old_version.ipynb': 0.4 },
        TypeAlgo: 'Isolation Forest',
        TypePattern: 'Normalisation'
    },
    {
        id: 'Normalisation_Forest_6',
        schema: 'Data Preprocessing -> Data Normalization',
        counts: { '[0-0.2[': 100, '[0.2-0.4[': 90, '[0.4-0.6[': 50, '[0.6-0.8[': 12, '[0.8-1.0]': 100 },
        notebooks: { 'debug_session.ipynb': 0.6, 'old_version.ipynb': 0.4 },
        TypeAlgo: 'Isolation Forest',
        TypePattern: 'Normalisation'
    }

];