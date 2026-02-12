import type { Meta, StoryObj } from '@storybook/react';
import PatternRanking from '@/components/patterns/PatternRanking';
import { mockDataPattern } from '@/data/patternMockData';

const currentPattern = mockDataPattern[3]; 

const meta: Meta<typeof PatternRanking> = {
    title: 'Patterns/PatternRanking',
    component: PatternRanking,
    tags: ['autodocs'],
    parameters: {
        backgrounds: { default: 'light' },
    },
    decorators: [
        (Story) => (
            <div className="max-w-md p-6 bg-slate-50 flex justify-center items-start min-h-[300px]">
                <div className="w-full">
                    <Story />
                </div>
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof PatternRanking>;

export const RankingByType: Story = {
    args: {
        currentPattern: currentPattern,
        allPatterns: mockDataPattern,
        criteria: 'type',
    },
};

export const RankingByAlgo: Story = {
    args: {
        currentPattern: currentPattern,
        allPatterns: mockDataPattern,
        criteria: 'algo',
    },
};