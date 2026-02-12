import type { Meta, StoryObj } from "@storybook/react";
import { NotebookContextDataCard } from "@/components/artefacts/NotebookContextDataCard.tsx";
import { mockNotebooks } from "@/data/mockData";

const meta: Meta<typeof NotebookContextDataCard> = {
  title: "Artefacts/NotebookContextDataCard",
  component: NotebookContextDataCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof NotebookContextDataCard>;

export const Default: Story = {
  args: {
    notebook: mockNotebooks[0]!,
    index: 1,
  },
};

export const IndexTwo: Story = {
  args: {
    notebook: mockNotebooks[1]!,
    index: 2,
  },
};
