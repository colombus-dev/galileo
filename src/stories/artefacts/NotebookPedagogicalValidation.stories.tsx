import type { Meta, StoryObj } from "@storybook/react";
import { NotebookPedagogicalValidation } from "@/components/artefacts/NotebookPedagogicalValidation";
import { mockNotebooks } from "@/data/mockData";

const meta: Meta<typeof NotebookPedagogicalValidation> = {
	title: "Artefacts/NotebookPedagogicalValidation",
	component: NotebookPedagogicalValidation,
	parameters: {
		layout: "padded",
	},
};

export default meta;

type Story = StoryObj<typeof NotebookPedagogicalValidation>;

export const Iris: Story = {
	args: {
		notebook: mockNotebooks[0]!,
	},
};
