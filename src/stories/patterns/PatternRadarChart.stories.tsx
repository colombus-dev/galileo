import type { Meta, StoryObj } from '@storybook/react';
import PatternRadarChart from '@/components/patterns/PatternRadarChart';
import { PatternType } from '@/types/PatternType';

const mockPatterns: PatternType[] = [
    {
        id: 'Pattern_Standard',
        schema: 'Standard -> Process',
        score: { '[0-0.2[': 0, '[0.2-0.4[': 10, '[0.4-0.6[': 50, '[0.6-0.8[': 30, '[0.8-1.0]': 10 },
        ram: [100, 110, 120],
        executionTime: [0.5, 0.6, 0.7],
        notebooks: { 'nb1.ipynb': 1 },
        typeAlgo: 'Standard',
        typePattern: 'Test',
        hierarchy: { parent: null, children: null }
    },
    {
        id: 'Pattern_Gourmand_RAM',
        schema: 'Heavy -> Load',
        score: { '[0-0.2[': 0, '[0.2-0.4[': 0, '[0.4-0.6[': 10, '[0.6-0.8[': 40, '[0.8-1.0]': 50 },
        ram: [800, 900, 1000],
        executionTime: [0.2, 0.3, 0.4],
        notebooks: { 'nb2.ipynb': 1 },
        typeAlgo: 'Heavy',
        typePattern: 'Test',
        hierarchy: { parent: null, children: null }
    },
    {
        id: 'Pattern_Lent_CPU',
        schema: 'Slow -> Calc',
        score: { '[0-0.2[': 50, '[0.2-0.4[': 40, '[0.4-0.6[': 10, '[0.6-0.8[': 0, '[0.8-1.0]': 0 }, // Score bas
        ram: [50, 60, 70],
        executionTime: [2.5, 3.0, 3.5],
        notebooks: { 'nb3.ipynb': 1 },
        typeAlgo: 'Slow',
        typePattern: 'Test',
        hierarchy: { parent: null, children: null }
    }
];

const meta: Meta<typeof PatternRadarChart> = {
    title: 'Patterns/PatternRadarChart',
    component: PatternRadarChart,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Affiche un graphique radar comparant un pattern spécifique aux statistiques globales (Min, Max, Moyenne) de tous les patterns.',
            },
        },
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ width: '600px', height: '500px', padding: '20px', backgroundColor: '#f8fafc' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof PatternRadarChart>;

export const Standard: Story = {
    args: {
        currentPattern: mockPatterns[0],
        allPatterns: mockPatterns,
    },
};

export const HighRamPerformance: Story = {
    args: {
        currentPattern: mockPatterns[1],
        allPatterns: mockPatterns,
    },
};

export const SlowExecution: Story = {
    args: {
        currentPattern: mockPatterns[2],
        allPatterns: mockPatterns,
    },
};

export const MissingData: Story = {
    args: {
        currentPattern: {
            ...mockPatterns[0],
            id: 'Pattern_Missing_Data',
            ram: [],
            executionTime: undefined,
        },
        allPatterns: mockPatterns,
    },
};