import type { Meta, StoryObj } from '@storybook/react';
import { DocSidePanel } from '@/components/storytelling/DocSidePanel';
import { mockDocs } from '@/mocks/docs.mock';
import { useState } from 'react';

const meta: Meta<typeof DocSidePanel> = {
  title: 'Storytelling/DocSidePanel',
  component: DocSidePanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof DocSidePanel>;

export const WithDoc: Story = {
  args: {
    docEntry: mockDocs['pandas.read_csv'],
    loading: false,
    error: null,
  },
};

export const Loading: Story = {
  args: {
    docEntry: null,
    loading: true,
    error: null,
  },
};

export const Error: Story = {
  args: {
    docEntry: null,
    loading: false,
    error: 'Documentation not found for this token',
  },
};

export const Empty: Story = {
  args: {
    docEntry: null,
    loading: false,
    error: null,
  },
};

export const DifferentDoc: Story = {
  args: {
    docEntry: mockDocs['sklearn.svm.SVC'],
    loading: false,
    error: null,
  },
};

export const Interactive: Story = {
  render: () => {
    const [docKey, setDocKey] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleOpenDoc = (key: string) => {
      setDocKey(key);
      setLoading(true);
      setError(null);

      // Simule un délai de chargement
      setTimeout(() => {
        const doc = mockDocs[key];
        if (doc) {
          setLoading(false);
        } else {
          setLoading(false);
          setError('Documentation not found');
        }
      }, 500);
    };

    return (
      <div className="flex h-screen gap-4 bg-slate-50">
        {/* Sidebar avec boutons */}
        <div className="w-48 bg-white p-4 border-r border-slate-200 overflow-y-auto">
          <h3 className="font-bold mb-4">Sélectionnez une doc</h3>
          <div className="space-y-2">
            {Object.entries(mockDocs).map(([key, doc]) => (
              <button
                key={key}
                onClick={() => handleOpenDoc(key)}
                className={`w-full text-left p-2 rounded text-sm ${
                  docKey === key
                    ? 'bg-blue-100 text-blue-900 font-semibold'
                    : 'hover:bg-slate-100'
                }`}
              >
                {doc.title}
              </button>
            ))}
            <button
              onClick={() => {
                setDocKey(null);
                setError(null);
              }}
              className="w-full text-left p-2 rounded text-sm hover:bg-slate-100"
            >
              Fermer
            </button>
          </div>
        </div>

        {/* Doc Panel */}
        <div className="flex-1 bg-white border-r border-slate-200 overflow-hidden">
          <DocSidePanel
            docEntry={docKey ? mockDocs[docKey] || null : null}
            loading={loading}
            error={error}
            onClose={() => setDocKey(null)}
          />
        </div>
      </div>
    );
  },
};

export const LongContent: Story = {
  args: {
    docEntry: mockDocs['pandas'],
    loading: false,
    error: null,
  },
};

export const WithExamples: Story = {
  args: {
    docEntry: mockDocs['seaborn.heatmap'],
    loading: false,
    error: null,
  },
};
