import type { Meta, StoryObj } from '@storybook/react';
import { NotebookPreviewPanel } from '@/components/storytelling/NotebookPreviewPanel';
import type { NotebookModel } from '@/types/notebook';

const mockNotebook: NotebookModel = {
  id: 'test-notebook',
  name: 'Data Analysis',
  createdAt: new Date().toISOString(),
  createdBy: 'Test User',
  cells: [
    {
      id: 'cell-1',
      type: 'code',
      content: 'import pandas as pd\nimport numpy as np\n\n# Charger les données\ndf = pd.read_csv("data.csv")',
      index: 0,
    },
    {
      id: 'cell-2',
      type: 'markdown',
      content: '# Analyse des données\n\nCette section explore les données chargées',
      index: 1,
    },
    {
      id: 'cell-3',
      type: 'code',
      content: 'print(df.head())',
      index: 2,
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Introduction',
      summary: 'Introduction to the analysis',
      cellIds: ['cell-1', 'cell-2'],
      order: 0,
    },
    {
      id: 'section-2',
      title: 'Analyse',
      summary: 'Data analysis section',
      cellIds: ['cell-3'],
      order: 1,
    },
  ],
};

const meta = {
  title: 'Components/Storytelling/NotebookPreviewPanel',
  component: NotebookPreviewPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NotebookPreviewPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithNotebook: Story = {
  args: {
    notebook: mockNotebook,
    fileName: 'data_analysis.ipynb',
    onRefresh: () => console.log('Refresh'),
  },
};

export const Empty: Story = {
  args: {
    notebook: null,
    fileName: '',
  },
};

export const Loading: Story = {
  args: {
    notebook: mockNotebook,
    fileName: 'data_analysis.ipynb',
    loading: true,
  },
};
