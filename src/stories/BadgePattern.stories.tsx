import type { Meta, StoryObj } from '@storybook/react';
import BadgePattern from '../components/BagdePattern';

const meta: Meta<typeof BadgePattern> = {
  title: 'Patterns/BadgePattern',
  component: BadgePattern,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BadgePattern>;

export const ValidePattern: Story = {
  args: {
    label: 'Pattern 1',
    color: 'green',
  },
};

export const MediumPattern: Story = {
  args: {
    label: 'Pattern 2',
    color: 'orange',
  },
};

export const FailedPattern: Story = {
  args: {
    label: 'Pattern 3',
    color: 'red', 
  },
};