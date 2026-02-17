import type { Meta, StoryObj } from '@storybook/react';
import PatternPipeline from '@/components/patterns/PatternPipeline';

const meta: Meta<typeof PatternPipeline> = {
  title: 'Patterns/PatternPipeline',
  component: PatternPipeline,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof PatternPipeline>;

export const DefautPipeline: Story = {
  args: {
    notebookName: 'notebook-1',
  },
};

export const VerticalPipeline: Story = {
  args: {
    notebookName: 'notebook-1',
    direction: 'vertical',
  },
};

export const EmptyPipeline: Story = {
  args: {
    notebookName: 'notebook_inexistant.ipynb',
  },
};