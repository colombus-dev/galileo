import type { Meta, StoryObj } from "@storybook/react";
import { NotebookBadge } from "@/components/artefacts/NotebookBadge";

const meta: Meta<typeof NotebookBadge> = {
  title: "Artefacts/NotebookBadge",
  component: NotebookBadge,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof NotebookBadge>;

export const One: Story = {
  args: {
    index: 1,
  },
};

export const Two: Story = {
  args: {
    index: 2,
  },
};

export const Three: Story = {
  args: {
    index: 3,
  },
};
