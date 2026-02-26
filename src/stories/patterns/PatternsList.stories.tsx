import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import PatternsList from '@/components/patterns/PatternsList';
import { mockDataPattern } from '@/data/patternMockData';

const meta = {
    title: 'Patterns/PatternsList',
    component: PatternsList,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <MemoryRouter>
                <div style={{ width: '800px', padding: '20px', backgroundColor: '#f8fafc' }}>
                    <Story />
                </div>
            </MemoryRouter>
        ),
    ],
} satisfies Meta<typeof PatternsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        data: mockDataPattern,
    },
};

export const ShortList: Story = {
    args: {
        data: mockDataPattern.slice(0, 5),
    },
};

export const Empty: Story = {
    args: {
        data: [],
    },
};