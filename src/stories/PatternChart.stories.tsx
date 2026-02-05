import type { Meta, StoryObj } from '@storybook/react';
import { PatternChart } from '../components/PatternChart';
import { type PatternStat } from '../types';


const mockData: PatternStat[] = Array.from({ length: 10 }, (_, i) => ({
    id: `Pattern ${i + 1}`,
    counts: [2, 5, 10, 8, 3],
    totalScore: 12.5,
    totalCount: 28
}));

const meta: Meta<typeof PatternChart> = {
    title: 'Patterns/PatternChart',
    component: PatternChart,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PatternChart>;

export const Comparison: Story = {
    args: {
        title: 'Top vs Flop : Fréquence',
        variant: 'bar-compare',
        data: mockData,
        fullWidth: true
    },
};

export const Heatmap: Story = {
    args: {
        title: 'Densité par Score',
        variant: 'heatmap',
        data: mockData,
        fullWidth: true
    },
};

export const Bubble: Story = {
    args: {
        title: 'Corrélation Score/Fréquence',
        variant: 'bubble',
        data: mockData,
        fullWidth: false
    },
};

export const Stacked: Story = {
    args: {
        title: 'Distribution Globale',
        variant: 'stack-bar',
        data: mockData,
        fullWidth: false
    },
};