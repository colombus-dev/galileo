import type { Meta, StoryObj } from '@storybook/react';
import Select, { Option } from '@/components/Select';

const meta: Meta<typeof Select> = {
  title: 'Patterns/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

const mockOptionsType: Option[] = [
  { label: 'Préparation', value: 'preparation' },
  { label: 'Exploration', value: 'explore' },
  { label: 'Modélisation', value: 'mondel' },
  { label: 'Normalisation', value: 'norm' },
];

const mockOptionsAlgos: Option[] = [
    { label: 'K-means', value: 'kmeans' },
    { label: 'DBSCAN', value: 'dbscan' },
    { label: 'PCA', value: 'pca' },
    { label: 'Random Forest', value: 'rf' },
];

export const Default: Story = {
  args: {
    options: mockOptionsType,
    placeholder: 'Sélectionne un type de pattern',
  },
};

export const WithLabel: Story = {
  args: {
    options: mockOptionsAlgos,
    label: 'Les algos',
    placeholder: 'Faites votre choix',
  },
};
