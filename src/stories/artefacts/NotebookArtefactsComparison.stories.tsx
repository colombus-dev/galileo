import type { Meta, StoryObj } from "@storybook/react";
import { NotebookArtefactsComparison } from "@/components/artefacts/NotebookArtefactsComparison";
import { mockNotebooks } from "@/data/mockData";

const meta: Meta<typeof NotebookArtefactsComparison> = {
  title: "Artefacts/NotebookArtefactsComparison",
  component: NotebookArtefactsComparison,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof NotebookArtefactsComparison>;

export const TwoNotebooks: Story = {
  render: (args) => (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <NotebookArtefactsComparison {...args} />
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
      <div className="max-w-7xl mx-auto">
        <NotebookArtefactsComparison {...args} />
      </div>
    </div>
  ),
  args: {
    notebooks: [mockNotebooks[0]!, mockNotebooks[1]!, mockNotebooks[2]!],
  },
};
