import type { Meta, StoryObj } from '@storybook/react';
import BadgePattern from '../components/BagdePattern';
import { mockDataPattern } from '@/data/patternMockData';

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
    pattern: mockDataPattern[6],
  },
};

export const MediumPattern: Story = {
  args: {
    pattern: mockDataPattern[0],
  },
};

export const FailedPattern: Story = {
  args: {
    pattern: mockDataPattern[1],
  },
};