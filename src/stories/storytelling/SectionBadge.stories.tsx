import type { Meta, StoryObj } from '@storybook/react';
import { SectionBadge } from '@/components/storytelling/SectionBadge';

const meta: Meta<typeof SectionBadge> = {
  title: 'Storytelling/SectionBadge',
  component: SectionBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof SectionBadge>;

export const WithMarkdown: Story = {
  args: {
    hasMarkdown: true,
    cellCount: 3,
    compact: false,
  },
};

export const CodeOnly: Story = {
  args: {
    hasMarkdown: false,
    cellCount: 2,
    compact: false,
  },
};

export const CompactMarkdown: Story = {
  args: {
    hasMarkdown: true,
    cellCount: 3,
    compact: true,
  },
};

export const CompactCodeOnly: Story = {
  args: {
    hasMarkdown: false,
    cellCount: 2,
    compact: true,
  },
};

export const Group: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Normal</h3>
        <div className="flex gap-2">
          <SectionBadge hasMarkdown={true} cellCount={2} />
          <SectionBadge hasMarkdown={false} cellCount={3} />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Compact</h3>
        <div className="flex gap-2">
          <SectionBadge hasMarkdown={true} cellCount={2} compact />
          <SectionBadge hasMarkdown={false} cellCount={3} compact />
        </div>
      </div>
    </div>
  ),
};
