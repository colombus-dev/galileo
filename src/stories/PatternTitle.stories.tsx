import type { Meta, StoryObj } from '@storybook/react';

import PatternTitle from '../components/PatternTitle';

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
        title: 'Loading',
        schema: 'Library Loading -> Others -> Library Loading',
    },
};

export const LongSchema: Story = {
    args: {
        title: 'Training',
        schema: 'Others -> Model Building and Training -> Others -> Model Building and Training -> Others -> Model Building and Training -> Model Training -> Visualization',
    },
};