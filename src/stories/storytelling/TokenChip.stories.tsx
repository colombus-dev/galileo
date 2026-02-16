import type { Meta, StoryObj } from '@storybook/react';
import { TokenChip } from '@/components/storytelling/TokenChip';
import { mockNotebookIris } from '@/mocks/notebook.mock';

const meta: Meta<typeof TokenChip> = {
  title: 'Storytelling/TokenChip',
  component: TokenChip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof TokenChip>;

const cell = mockNotebookIris.cells.find((c) => c.tokens && c.tokens.length > 0);
const tokens = cell?.tokens || [];

export const FunctionToken: Story = {
  args: {
    token: tokens[1] || {
      id: 'token-demo',
      kind: 'function',
      name: 'read_csv',
      lib: 'pandas',
      docKey: 'pandas.read_csv',
    },
  },
};

export const ImportToken: Story = {
  args: {
    token: tokens[0] || {
      id: 'token-demo',
      kind: 'import',
      name: 'pandas',
      lib: 'pandas',
      docKey: 'pandas',
    },
  },
};

export const SymbolToken: Story = {
  args: {
    token: {
      id: 'token-demo',
      kind: 'symbol',
      name: 'DataFrame',
      lib: 'pandas',
      docKey: 'pandas.DataFrame',
    },
  },
};

export const SklearnToken: Story = {
  args: {
    token: {
      id: 'token-demo',
      kind: 'function',
      name: 'train_test_split',
      lib: 'sklearn',
      docKey: 'sklearn.model_selection.train_test_split',
    },
  },
};

export const SeabornToken: Story = {
  args: {
    token: {
      id: 'token-demo',
      kind: 'function',
      name: 'heatmap',
      lib: 'seaborn',
      docKey: 'seaborn.heatmap',
    },
  },
};

export const SmallSize: Story = {
  args: {
    token: tokens[1] || {
      id: 'token-demo',
      kind: 'function',
      name: 'read_csv',
      lib: 'pandas',
      docKey: 'pandas.read_csv',
    },
    size: 'sm',
  },
};

export const MediumSize: Story = {
  args: {
    token: tokens[1] || {
      id: 'token-demo',
      kind: 'function',
      name: 'read_csv',
      lib: 'pandas',
      docKey: 'pandas.read_csv',
    },
    size: 'md',
  },
};

export const HighlightedVariant: Story = {
  args: {
    token: tokens[1] || {
      id: 'token-demo',
      kind: 'function',
      name: 'read_csv',
      lib: 'pandas',
      docKey: 'pandas.read_csv',
    },
    variant: 'highlighted',
  },
};

export const SecondaryVariant: Story = {
  args: {
    token: tokens[1] || {
      id: 'token-demo',
      kind: 'function',
      name: 'read_csv',
      lib: 'pandas',
      docKey: 'pandas.read_csv',
    },
    variant: 'secondary',
  },
};

export const Interactive: Story = {
  args: {
    token: tokens[1] || {
      id: 'token-demo',
      kind: 'function',
      name: 'read_csv',
      lib: 'pandas',
      docKey: 'pandas.read_csv',
    },
    onClick: () => console.log('Token clicked!'),
  },
};

export const Group: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 p-4 bg-slate-50 rounded-lg">
      {tokens.map((token) => (
        <TokenChip
          key={token.id}
          token={token}
          onClick={() => console.log(`Clicked: ${token.name}`)}
        />
      ))}
    </div>
  ),
};
