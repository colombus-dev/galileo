import type { Meta, StoryObj } from '@storybook/react';
import { NotebookWorkspaceLayout } from '@/components/storytelling/NotebookWorkspaceLayout';

const meta: Meta<typeof NotebookWorkspaceLayout> = {
  title: 'Storytelling/NotebookWorkspaceLayout',
  component: NotebookWorkspaceLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof NotebookWorkspaceLayout>;

const DummySidebar = () => (
  <div className="p-6">
    <h3 className="font-bold mb-4">Sections</h3>
    <div className="space-y-2">
      <div className="p-3 bg-blue-50 rounded border border-blue-200 cursor-pointer">Section 1</div>
      <div className="p-3 hover:bg-slate-100 rounded border border-transparent cursor-pointer">Section 2</div>
      <div className="p-3 hover:bg-slate-100 rounded border border-transparent cursor-pointer">Section 3</div>
    </div>
  </div>
);

const DummyMain = () => (
  <div className="p-8">
    <h2 className="text-2xl font-bold mb-4">Section 1: Introduction</h2>
    <p className="text-slate-600 mb-4">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <div className="bg-slate-800 text-white p-4 rounded-lg font-mono text-sm">
      <div>import pandas as pd</div>
      <div>df = pd.read_csv("data.csv")</div>
      <div>print(df.head())</div>
    </div>
  </div>
);

const DummyDocPanel = () => (
  <div className="p-6">
    <h3 className="font-bold mb-4">Documentation</h3>
    <div className="space-y-3">
      <div>
        <p className="font-semibold text-sm">pandas.read_csv</p>
        <p className="text-xs text-slate-600 mt-1">v2.1.3</p>
      </div>
      <p className="text-xs text-slate-700">Lire un fichier CSV dans un DataFrame pandas...</p>
    </div>
  </div>
);

export const FullLayout: Story = {
  args: {
    sidebar: <DummySidebar />,
    main: <DummyMain />,
    docPanel: <DummyDocPanel />,
  },
};

export const WithoutDocPanel: Story = {
  args: {
    sidebar: <DummySidebar />,
    main: <DummyMain />,
  },
};

export const CompactView: Story = {
  args: {
    sidebar: <DummySidebar />,
    main: <DummyMain />,
    docPanel: <DummyDocPanel />,
  },
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
  },
};
