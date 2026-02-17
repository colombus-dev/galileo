import type { Meta, StoryObj } from '@storybook/react';
import { CollapseToggle } from '@/components/storytelling/CollapseToggle';
import { useState } from 'react';

const meta: Meta<typeof CollapseToggle> = {
  title: 'Storytelling/CollapseToggle',
  component: CollapseToggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof CollapseToggle>;

export const Extended: Story = {
  args: {
    collapsed: false,
    label: 'Code',
  },
};

export const Collapsed: Story = {
  args: {
    collapsed: true,
    label: 'Code',
  },
};

export const WithCustomLabel: Story = {
  args: {
    collapsed: false,
    label: 'Détails',
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <CollapseToggle
        {...args}
        collapsed={collapsed}
        onChange={setCollapsed}
      />
    );
  },
  args: {
    label: 'Code',
  },
};
