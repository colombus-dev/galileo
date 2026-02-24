import type { Meta, StoryObj } from '@storybook/react';
import { HierarchyPatterns } from '@/components/patterns/HierarchyPatterns';
import { mockDataPattern } from '@/data/patternMockData';
import { PatternType } from '@/types/PatternType';

const meta = {
  title: 'Patterns/HierarchyPatterns',
  component: HierarchyPatterns,
  tags: ['autodocs'],
  argTypes: {
    pattern: { control: 'object', description: 'Le pattern racine à afficher' },
    allPatterns: { control: 'object', description: 'La liste complète (contexte) pour trouver les enfants' },
  },
} satisfies Meta<typeof HierarchyPatterns>;

export default meta;
type Story = StoryObj<typeof meta>;

const createPattern = (
  id: string,
  parent: string | null,
  children: string[] | null,
  scoreKey: '[0-0.2[' | '[0.4-0.6[' | '[0.8-1.0]' = '[0.8-1.0]'
): PatternType => ({
  id,
  schema: `Schema -> ${id}`,
  typeAlgo: 'Isolation Forest',
  typePattern: 'Distribution',
  notebooks: { 'demo.ipynb': 1 },
  score: { [scoreKey]: 100 },
  hierarchy: { parent, children }
});


const mockList = Array.isArray(mockDataPattern) ? mockDataPattern : [mockDataPattern];
const rootFromMock = mockList.find(p => p.hierarchy.children && p.hierarchy.children.length > 0) || mockList[0];

export const defaut: Story = {
  args: {
    pattern: rootFromMock,
    allPatterns: mockList,
  },
  render: (args) => (
    <HierarchyPatterns 
      pattern={args.pattern} 
      allPatterns={args.allPatterns} 
    />
  ),
};

const customPatternsList = [
  createPattern('Racine', null, ['Enfant_1', 'Enfant_2'], '[0.8-1.0]'), 
  createPattern('Enfant_1', 'Racine', ['Petit_Enfant_A'], '[0.4-0.6['),
  createPattern('Enfant_2', 'Racine', null, '[0-0.2['),
  createPattern('Petit_Enfant_A', 'Enfant_1', null, '[0.8-1.0]'),
];

export const ArbrePersonnalise: Story = {
  args: {
    pattern: customPatternsList[0],
    allPatterns: customPatternsList,
  },
};


const singlePattern = createPattern('Solo_Pattern', null, null, '[0.8-1.0]');

export const PatternSeul: Story = {
  args: {
    pattern: singlePattern,
    allPatterns: [singlePattern],
  },
};
