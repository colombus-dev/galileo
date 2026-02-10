import type { Meta, StoryObj } from '@storybook/react';
import { PatternHeatmap } from '../components/PatternHeatmap';
import { PatternStat } from '../types';

// Mock Data avec le format dictionnaire
const mockData: PatternStat[] = [
    {
        id: 'Pattern Rare',
        counts: { 
            '0-0.2': 1, 
            '0.2-0.4': 0, 
            '0.4-0.6': 0, 
            '0.6-0.8': 2, 
            '0.8-1.0': 1 
        },
        totalCount: 4
    },
    {
        id: 'Pattern Très Fréquent (Bon)',
        counts: { 
            '0-0.2': 0, 
            '0.2-0.4': 5, 
            '0.4-0.6': 20, 
            '0.6-0.8': 80, 
            '0.8-1.0': 160 
        },
        totalCount: 265
    },
    {
        id: 'Pattern Critique (Mauvais)',
        counts: { 
            '0-0.2': 150, 
            '0.2-0.4': 80, 
            '0.4-0.6': 20, 
            '0.6-0.8': 5, 
            '0.8-1.0': 0 
        },
        totalCount: 255
    }
];

const meta: Meta<typeof PatternHeatmap> = {
    title: 'Patterns/PatternHeatmap',
    component: PatternHeatmap,
    args: {
        title: 'Heatmap avec Dictionnaire',
        data: mockData,
        fullWidth: true
    }
};

export default meta;
type Story = StoryObj<typeof PatternHeatmap>;

export const Default: Story = {};