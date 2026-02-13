import type { Meta, StoryObj } from '@storybook/react';
import { CodeNotebookModal } from '@/components/patterns/CodeNotebookModal';

const meta: Meta<typeof CodeNotebookModal> = {
    title: 'Patterns/CodeNotebookModal',
    component: CodeNotebookModal,
    decorators: [(Story) => <div style={{ padding: '2rem', height: '500px' }}><Story/></div>],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CodeNotebookModal>;

export const Default: Story = {
    args: {
        selectedNotebook: 'notebook_example.ipynb',
        closeModal: () => alert('Modal closed'),
    },
};

export const WithLongNotebookName: Story = {
    args: {
        selectedNotebook: 'this_is_a_very_long_notebook_name_to_test_overflow_handling_in_the_modal.ipynb',
        closeModal: () => alert('Modal closed'),
    },
};