import { PatternType } from '../PatternType';

export const mockDataPattern: PatternType[] = [
    {
        id: 'Gaussian Distribution',
        counts: { '[0-0.2[': 1, '[0.2-0.4[': 0, '[0.4-0.6[': 0, '[0.6-0.8[': 2, '[0.8-1.0]': 1 },
        notebooks: { 'analysis_v1.ipynb': 0.6, 'experiment_A.ipynb': 0.4 },
        TypeAlgo: 'Isolation Forest',
        TypePattern: 'Distribution'
    },
    {
        id: 'Annealing and binary',
        counts: { '[0-0.2[': 0, '[0.2-0.4[': 5, '[0.4-0.6[': 20, '[0.6-0.8[': 80, '[0.8-1.0]': 160 },
        notebooks: { 'production_model.ipynb': 0.9 },
        TypeAlgo: 'Random Forest',
        TypePattern: 'Loading'
    },
    {
        id: 'Normalisation DB',
        counts: { '[0-0.2[': 150, '[0.2-0.4[': 80, '[0.4-0.6[': 20, '[0.6-0.8[': 5, '[0.8-1.0]': 0 },
        notebooks: { 'debug_session.ipynb': 0.6, 'old_version.ipynb': 0.4 },
        TypeAlgo: 'DBSCAN',
        TypePattern: 'Normalisation'
    },
    {
        id: 'Normalisation Forest',
        counts: { '[0-0.2[': 100, '[0.2-0.4[': 90, '[0.4-0.6[': 50, '[0.6-0.8[': 12, '[0.8-1.0]': 0 },
        notebooks: { 'debug_session.ipynb': 0.6, 'old_version.ipynb': 0.4 },
        TypeAlgo: 'Isolation Forest',
        TypePattern: 'Normalisation'
    },
    {
        id: 'Normalisation Forest 2',
        counts: { '[0-0.2[': 100, '[0.2-0.4[': 90, '[0.4-0.6[': 50, '[0.6-0.8[': 12, '[0.8-1.0]': 100 },
        notebooks: { 'debug_session.ipynb': 0.6, 'old_version.ipynb': 0.4 },
        TypeAlgo: 'Isolation Forest',
        TypePattern: 'Normalisation'
    },
    {
        id: 'Normalisation Forest 3',
        counts: { '[0-0.2[': 100, '[0.2-0.4[': 90, '[0.4-0.6[': 50, '[0.6-0.8[': 12, '[0.8-1.0]': 100 },
        notebooks: { 'debug_session.ipynb': 0.6, 'old_version.ipynb': 0.4 },
        TypeAlgo: 'Isolation Forest',
        TypePattern: 'Normalisation'
    },
    {
        id: 'Normalisation Forest 4',
        counts: { '[0-0.2[': 100, '[0.2-0.4[': 90, '[0.4-0.6[': 50, '[0.6-0.8[': 12, '[0.8-1.0]': 100 },
        notebooks: { 'debug_session.ipynb': 0.6, 'old_version.ipynb': 0.4 },
        TypeAlgo: 'Isolation Forest',
        TypePattern: 'Normalisation'
    },
    {
        id: 'Normalisation Forest 5',
        counts: { '[0-0.2[': 100, '[0.2-0.4[': 90, '[0.4-0.6[': 50, '[0.6-0.8[': 12, '[0.8-1.0]': 100 },
        notebooks: { 'debug_session.ipynb': 0.6, 'old_version.ipynb': 0.4 },
        TypeAlgo: 'Isolation Forest',
        TypePattern: 'Normalisation'
    },
    {
        id: 'Normalisation Forest 6',
        counts: { '[0-0.2[': 100, '[0.2-0.4[': 90, '[0.4-0.6[': 50, '[0.6-0.8[': 12, '[0.8-1.0]': 100 },
        notebooks: { 'debug_session.ipynb': 0.6, 'old_version.ipynb': 0.4 },
        TypeAlgo: 'Isolation Forest',
        TypePattern: 'Normalisation'
    }
    
];