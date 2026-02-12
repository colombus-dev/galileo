import type { Meta, StoryObj } from '@storybook/react';
import PatternSummary from '../components/PatternSummary'; // Vérifie le chemin
import { mockDataPattern } from '../data/patternMockData';   // Import des mocks demandés

const meta: Meta<typeof PatternSummary> = {
    title: 'Patterns/PatternSummary',
    component: PatternSummary,
    tags: ['autodocs'],
    parameters: {
        backgrounds: {
            default: 'light',
        },
    },
};

export default meta;
type Story = StoryObj<typeof PatternSummary>;

export const Distribution: Story = {
    args: {
        pattern: mockDataPattern[0],
    },
};

export const Loading: Story = {
    args: {
        pattern: mockDataPattern[1],
    },
};

export const Normalisation: Story = {
    args: {
        pattern: mockDataPattern[2],
    },
};