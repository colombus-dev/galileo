import type { Meta, StoryObj } from '@storybook/react';
import { SummarySidebar } from '@/components/storytelling/SummarySidebar';
import { mockNotebookIris, mockNotebookSimple } from '@/mocks/notebook.mock';
import { useState } from 'react';

const meta: Meta<typeof SummarySidebar> = {
  title: 'Storytelling/SummarySidebar',
  component: SummarySidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SummarySidebar>;

export const Default: Story = {
  render: (args) => {
    const [activeSection, setActiveSection] = useState('section-0');
    return (
      <div className="h-screen w-96 border-r border-slate-200 bg-white overflow-y-auto">
        <SummarySidebar
          {...args}
          activeSection={activeSection}
          onSelectSection={setActiveSection}
        />
      </div>
    );
  },
  args: {
    notebook: mockNotebookIris,
  },
};

export const SimpleNotebook: Story = {
  render: (args) => {
    const [activeSection, setActiveSection] = useState('section-simple-0');
    return (
      <div className="h-screen w-96 border-r border-slate-200 bg-white overflow-y-auto">
        <SummarySidebar
          {...args}
          activeSection={activeSection}
          onSelectSection={setActiveSection}
        />
      </div>
    );
  },
  args: {
    notebook: mockNotebookSimple,
  },
};

export const WithoutActiveSection: Story = {
  render: (args) => (
    <div className="h-screen w-96 border-r border-slate-200 bg-white overflow-y-auto">
      <SummarySidebar {...args} />
    </div>
  ),
  args: {
    notebook: mockNotebookIris,
    activeSection: undefined,
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [activeSection, setActiveSection] = useState('section-0');
    return (
      <div className="h-screen w-96 border-r border-slate-200 bg-white overflow-y-auto">
        <SummarySidebar
          {...args}
          activeSection={activeSection}
          onSelectSection={(id) => {
            console.log('Selected section:', id);
            setActiveSection(id);
          }}
        />
      </div>
    );
  },
  args: {
    notebook: mockNotebookIris,
  },
};
