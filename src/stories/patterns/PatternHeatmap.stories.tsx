import type { Meta, StoryObj } from '@storybook/react';
import PatternHeatmap from '@/components/patterns/PatternHeatmap'; 
import { mockDataPattern } from '@/data/patternMockData';

const mockData = mockDataPattern

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
    },
    tags: ['autodocs'],
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