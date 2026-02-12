import type { Meta, StoryObj } from "@storybook/react";
import { NotebookPerformanceEvaluation } from "@/components/artefacts/NotebookPerformanceEvaluation";
import { mockNotebooks } from "@/data/mockData";

const meta: Meta<typeof NotebookPerformanceEvaluation> = {
  title: "Artefacts/NotebookPerformanceEvaluation",
  component: NotebookPerformanceEvaluation,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof NotebookPerformanceEvaluation>;

export const Iris: Story = {
  args: {
    notebook: mockNotebooks[0]!,
  },
};
