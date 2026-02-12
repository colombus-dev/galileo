import type { Meta, StoryObj } from '@storybook/react';
import { ParamCard } from '@/components/patterns/ParamCard';

const meta: Meta<typeof ParamCard> = {
    title: 'Patterns/ParamCard',
    component: ParamCard,
    decorators: [(Story) => <div style={{ padding: '2rem', maxWidth: '400px' }}><Story/></div>],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ParamCard>;

export const Occurrences: Story = {
    args: {
        icon: '1',
        title: 'Occurrences',
        desc: 'Analyse quantitative : Quels sont les patterns les plus fréquents ?',
        linkText: 'Voir les fréquences',
        linkUrl: '#',
        theme: 'blue',
    },
};