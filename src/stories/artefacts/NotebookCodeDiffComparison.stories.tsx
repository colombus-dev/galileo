import type { Meta, StoryObj } from "@storybook/react";
import { NotebookCodeDiffComparison } from "@/components/artefacts/NotebookCodeDiffComparison";
import { mockNotebooks } from "@/data/mockData";

const meta: Meta<typeof NotebookCodeDiffComparison> = {
  title: "Artefacts/NotebookCodeDiffComparison",
  component: NotebookCodeDiffComparison,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof NotebookCodeDiffComparison>;

export const TwoNotebooks: Story = {
  render: (args) => (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl">
        <NotebookCodeDiffComparison {...args} />
      </div>
    </div>
  ),
  args: {
    notebooks: [mockNotebooks[0]!, mockNotebooks[1]!],
  },
};

export const ThreeNotebooks: Story = {
  render: (args) => (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl">
        <NotebookCodeDiffComparison {...args} />
      </div>
    </div>
  ),
  args: {
    notebooks: [mockNotebooks[0]!, mockNotebooks[1]!, mockNotebooks[2]!],
  },
};
