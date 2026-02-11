import type { Meta, StoryObj } from "@storybook/react";
import { NotebookContextProblem } from "@/components/NotebookContextProblem";
import { mockNotebooks } from "@/data/mockData";

const meta: Meta<typeof NotebookContextProblem> = {
  title: "Notebooks/NotebookContextProblem",
  component: NotebookContextProblem,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof NotebookContextProblem>;

export const Iris: Story = {
  args: {
    notebook: mockNotebooks[0]!,
  },
};
