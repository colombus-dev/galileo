import type { Meta, StoryObj } from '@storybook/react';
import { PatternListNotebook } from '../components/PatternListNotebook';
import { mockDataPattern } from '../data/patternMockData';

const currentPattern = mockDataPattern[3];
const meta: Meta<typeof PatternListNotebook> = {
    title: 'Patterns/PatternListNotebook',
    component: PatternListNotebook,
    tags: ['autodocs'],
    parameters: {
        backgrounds: { default: 'light' },
    },
};

export default meta;

type Story = StoryObj<typeof PatternListNotebook>;

export const Default: Story = {
    args: {
        pattern: currentPattern,
    },
};

export const NoNotebooks: Story = {
    args: {
        pattern: {
            ...currentPattern,
            notebooks: {},
        },
    },
};