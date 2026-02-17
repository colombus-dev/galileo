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

const DEFAULT_LOGO = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwt1HL9fRcwfyF4lzGkCREKMmUv7OVyYGftYlNCNxNuENKpOCJZNxywAsv3fYra7N7uUP1&s=10';

export const ImportState: Story = {
  args: {
    logoUrl: DEFAULT_LOGO,
  },
};

export const WithNotebook: Story = {
  args: {
    initialNotebookId: 'notebook-iris-1',
    logoUrl: DEFAULT_LOGO,
  },
};

export const WithSimpleNotebook: Story = {
  args: {
    initialNotebookId: 'notebook-simple-1',
    logoUrl: DEFAULT_LOGO,
  },
};

export const FullWorkflow: Story = {
  render: () => {
    return <NotebookWorkspacePage initialNotebookId="notebook-iris-1" logoUrl={DEFAULT_LOGO} />;
  },
};
