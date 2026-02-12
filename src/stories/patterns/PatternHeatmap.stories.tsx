import type { Meta, StoryObj } from '@storybook/react';
import PatternHeatmap from '@/components/PatternHeatmap'; 
import { PatternType } from '@/PatternType';

// Mock Data adapté à la nouvelle interface
const mockData: PatternType[] = [
    {
        id: 'Pattern Rare',
        counts: { 
            '[0-0.2[': 1, 
            '[0.2-0.4[': 0, 
            '[0.4-0.6[': 0, 
            '[0.6-0.8[': 2, 
            '[0.8-1.0]': 1 
        },
        notebooks: { 'analysis_v1.ipynb': 0.6, 'experiment_A.ipynb': 0.4 },
        TypeAlgo: 'Isolation Forest',
        TypePattern: 'Anomaly'
    },
    {
        id: 'Pattern Très Fréquent (Bon)',
        counts: { 
            '[0-0.2[': 0, 
            '[0.2-0.4[': 5, 
            '[0.4-0.6[': 20, 
            '[0.6-0.8[': 80, 
            '[0.8-1.0]': 160 
        },
        notebooks: { 'production_model.ipynb': 0.9 },
        TypeAlgo: 'Random Forest',
        TypePattern: 'Nominal'
    },
    {
        id: 'Pattern Critique (Mauvais)',
        counts: { 
            '[0-0.2[': 150, 
            '[0.2-0.4[': 80, 
            '[0.4-0.6[': 20, 
            '[0.6-0.8[': 5, 
            '[0.8-1.0]': 0 
        },
        notebooks: { 'debug_session.ipynb': 0.6, 'old_version.ipynb': 0.4 },
        TypeAlgo: 'DBSCAN',
        TypePattern: 'Noise'
    }
];

const meta: Meta<typeof PatternHeatmap> = {
    title: 'Patterns/PatternHeatmap',
    component: PatternHeatmap,
    args: {
        title: 'Distribution des Patterns',
        data: mockData,
        fullWidth: true
    },
    parameters: {
        layout: 'padded', 
    }
};

export default meta;
type Story = StoryObj<typeof PatternHeatmap>;

export const Default: Story = {};

export const Empty: Story = {
    args: {
        title: 'Aucune donnée',
        data: [],
        fullWidth: false
    }
};