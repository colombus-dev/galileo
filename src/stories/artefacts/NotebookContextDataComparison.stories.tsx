import type { Meta, StoryObj } from "@storybook/react";
import { NotebookContextDataComparison } from "@/components/artefacts/NotebookContextDataComparison.tsx";
import { mockNotebooks } from "@/data/mockData";

const meta: Meta<typeof NotebookContextDataComparison> = {
  title: "Artefacts/NotebookContextDataComparison",
  component: NotebookContextDataComparison,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof NotebookContextDataComparison>;

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
