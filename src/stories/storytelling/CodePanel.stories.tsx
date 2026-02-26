import type { Meta, StoryObj } from '@storybook/react';
import { CodePanel } from '@/components/storytelling/CodePanel';
import { mockNotebookIris, mockNotebookSimple } from '@/mocks/notebook.mock';
import { useState } from 'react';

const meta: Meta<typeof CodePanel> = {
  title: 'Storytelling/CodePanel',
  component: CodePanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof CodePanel>;

export const Extended: Story = {
  render: (args) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div className="p-8 bg-slate-50 min-h-screen">
        <CodePanel
          {...args}
          collapsed={collapsed}
          onToggleCollapsed={setCollapsed}
          onTokenClick={(token) => console.log('Token clicked:', token)}
        />
      </div>
    );
  },
  args: {
    notebook: mockNotebookIris,
    section: mockNotebookIris.sections[0],
  },
};

export const Collapsed: Story = {
  render: (args) => {
    const [collapsed, setCollapsed] = useState(true);
    return (
      <div className="p-8 bg-slate-50 min-h-screen">
        <CodePanel
          {...args}
          collapsed={collapsed}
          onToggleCollapsed={setCollapsed}
        />
      </div>
    );
  },
  args: {
    notebook: mockNotebookIris,
    section: mockNotebookIris.sections[0],
  },
};

export const MultipleCells: Story = {
  render: (args) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div className="p-8 bg-slate-50 min-h-screen">
        <CodePanel
          {...args}
          collapsed={collapsed}
          onToggleCollapsed={setCollapsed}
          onTokenClick={(token) => console.log('Token clicked:', token)}
        />
      </div>
    );
  },
  args: {
    notebook: mockNotebookIris,
    section: mockNotebookIris.sections[3],
  },
};

export const NoCode: Story = {
  render: (args) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div className="p-8 bg-slate-50 min-h-screen">
        <CodePanel
          {...args}
          collapsed={collapsed}
          onToggleCollapsed={setCollapsed}
        />
      </div>
    );
  },
  args: {
    notebook: mockNotebookSimple,
    section: mockNotebookSimple.sections[0],
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div className="p-8 bg-slate-50 min-h-screen">
        <CodePanel
          {...args}
          collapsed={collapsed}
          onToggleCollapsed={setCollapsed}
          onTokenClick={(token) => {
            console.log('Token clicked:', token);
            alert(`Clicked: ${token.name} from ${token.lib}`);
          }}
        />
      </div>
    );
  },
  args: {
    notebook: mockNotebookIris,
    section: mockNotebookIris.sections[1],
  },
};
