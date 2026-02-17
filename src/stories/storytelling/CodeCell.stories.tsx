import type { Meta, StoryObj } from '@storybook/react';
import { CodeCell } from '@/components/storytelling/CodeCell';
import { mockNotebookIris } from '@/mocks/notebook.mock';

const meta: Meta<typeof CodeCell> = {
  title: 'Storytelling/CodeCell',
  component: CodeCell,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof CodeCell>;

const cellWithTokens = mockNotebookIris.cells.find((c) => c.type === 'code' && c.tokens && c.tokens.length > 0);
const cellWithoutTokens = mockNotebookIris.cells.find((c) => c.type === 'code' && (!c.tokens || c.tokens.length === 0));

export const WithTokens: Story = {
  args: {
    cell: cellWithTokens || {
      id: 'cell-demo',
      type: 'code',
      index: 0,
      content: 'import pandas as pd\ndf = pd.read_csv("data.csv")\nprint(df.head())',
      description: 'Chargement des données',
      tokens: [
        {
          id: 'token-1',
          kind: 'import',
          name: 'pandas',
          lib: 'pandas',
          docKey: 'pandas',
        },
        {
          id: 'token-2',
          kind: 'function',
          name: 'read_csv',
          lib: 'pandas',
          docKey: 'pandas.read_csv',
        },
      ],
    },
  },
};

export const WithoutTokens: Story = {
  args: {
    cell: cellWithoutTokens || {
      id: 'cell-demo',
      type: 'code',
      index: 0,
      content: 'x = 10\ny = 20\nz = x + y\nprint(z)',
      description: 'Code simple sans tokens',
    },
  },
};

export const WithDescription: Story = {
  args: {
    cell: {
      id: 'cell-demo',
      type: 'code',
      index: 0,
      content: 'from sklearn.model_selection import train_test_split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)',
      description: 'Split train/test avec stratification',
      tokens: [
        {
          id: 'token-1',
          kind: 'function',
          name: 'train_test_split',
          lib: 'sklearn',
          docKey: 'sklearn.model_selection.train_test_split',
        },
      ],
    },
  },
};

export const LongCode: Story = {
  args: {
    cell: {
      id: 'cell-demo',
      type: 'code',
      index: 0,
      content: `import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

# Chargement
df = pd.read_csv("data.csv")
print(f"Shape: {df.shape}")

# Preprocessing
X = df.drop('target', axis=1)
y = df['target']

# Normalisation
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42, stratify=y
)

print(f"Train: {X_train.shape}, Test: {X_test.shape}")`,
      description: 'Pipeline complète de preprocessing',
      tokens: [
        {
          id: 'token-1',
          kind: 'import',
          name: 'pandas',
          lib: 'pandas',
          docKey: 'pandas',
        },
        {
          id: 'token-2',
          kind: 'function',
          name: 'read_csv',
          lib: 'pandas',
          docKey: 'pandas.read_csv',
        },
        {
          id: 'token-3',
          kind: 'function',
          name: 'train_test_split',
          lib: 'sklearn',
          docKey: 'sklearn.model_selection.train_test_split',
        },
      ],
    },
  },
};

export const Interactive: Story = {
  args: {
    cell: cellWithTokens || {
      id: 'cell-demo',
      type: 'code',
      index: 0,
      content: 'import pandas as pd\ndf = pd.read_csv("data.csv")\nprint(df.head())',
      description: 'Chargement des données',
      tokens: [
        {
          id: 'token-1',
          kind: 'import',
          name: 'pandas',
          lib: 'pandas',
          docKey: 'pandas',
        },
        {
          id: 'token-2',
          kind: 'function',
          name: 'read_csv',
          lib: 'pandas',
          docKey: 'pandas.read_csv',
        },
      ],
    },
    onTokenClick: (token) => console.log('Clicked token:', token),
  },
};
