import type { Meta, StoryObj } from '@storybook/react';
import { NotebookWorkspacePage } from '@/pages/storytelling/NotebookWorkspacePage';

const meta: Meta<typeof NotebookWorkspacePage> = {
  title: 'Storytelling/NotebookWorkspacePage',
  component: NotebookWorkspacePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof NotebookWorkspacePage>;

export const Default: Story = {
  args: {},
};

export const WithCallback: Story = {
  args: {
    onImportSuccess: (notebookId) => console.log('Imported notebook:', notebookId),
  },
};
