import type { Meta, StoryObj } from '@storybook/react';
import { SectionSummaryView } from '@/components/storytelling/SectionSummaryView';
import { mockNotebookIris, mockNotebookSimple } from '@/mocks/notebook.mock';

const meta: Meta<typeof SectionSummaryView> = {
  title: 'Storytelling/SectionSummaryView',
  component: SectionSummaryView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SectionSummaryView>;

export const WithMarkdown: Story = {
  args: {
    notebook: mockNotebookIris,
    section: mockNotebookIris.sections[0],
  },
};

export const WithFallback: Story = {
  args: {
    notebook: mockNotebookSimple,
    section: mockNotebookSimple.sections[0],
  },
};

export const MiddleSection: Story = {
  args: {
    notebook: mockNotebookIris,
    section: mockNotebookIris.sections[2],
  },
};

export const LastSection: Story = {
  args: {
    notebook: mockNotebookIris,
    section: mockNotebookIris.sections[3],
  },
};

export const CustomFallbackMessage: Story = {
  args: {
    notebook: mockNotebookSimple,
    section: mockNotebookSimple.sections[0],
    fallbackMessage: '⚠️ Cette section ne contient que du code. Consultez les cellules ci-dessous.',
  },
};
