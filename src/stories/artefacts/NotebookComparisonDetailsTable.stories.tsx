import type { Meta, StoryObj } from "@storybook/react";
import { NotebookComparisonDetailsTable } from "@/components/artefacts/NotebookComparisonDetailsTable.tsx";
import { mockNotebooks } from "@/data/mockData";

const meta: Meta<typeof NotebookComparisonDetailsTable> = {
  title: "Artefacts/NotebookComparisonDetailsTable",
  component: NotebookComparisonDetailsTable,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof NotebookComparisonDetailsTable>;

export const TwoNotebooks: Story = {
  args: {
    notebooks: [mockNotebooks[0]!, mockNotebooks[1]!],
  },
};

export const ThreeNotebooks: Story = {
  args: {
    notebooks: [mockNotebooks[0]!, mockNotebooks[1]!, mockNotebooks[2]!],
  },
};
