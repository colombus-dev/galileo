import type { Meta, StoryObj } from '@storybook/react';

import PatternTitle from '@/components/patterns/PatternTitle';
import { mockDataPattern } from '@/data/patternMockData';

const allPattern = mockDataPattern;

const meta: Meta<typeof PatternTitle> = {
    title: 'Patterns/PatternTitle',
    component: PatternTitle,
    tags: ['autodocs'],
    parameters: {
        backgrounds: { default: 'light' },
    },
};

export default meta;
type Story = StoryObj<typeof PatternTitle>;

export const Default: Story = {
    args: {
        currentPattern: allPattern[0],
    },
};

export const LongSchema: Story = {
    args: {
        currentPattern: allPattern[1],
    },
};