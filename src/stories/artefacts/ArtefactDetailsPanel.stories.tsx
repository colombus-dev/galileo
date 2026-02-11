import type { Meta, StoryObj } from "@storybook/react";

import { ArtefactDetailsPanel } from "@/components/artefacts/ArtefactDetailsPanel";
import { mockNotebooks } from "@/data/mockData";

const meta: Meta<typeof ArtefactDetailsPanel> = {
	title: "Artefacts/ArtefactDetailsPanel",
	component: ArtefactDetailsPanel,
    tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
};

export default meta;

type Story = StoryObj<typeof ArtefactDetailsPanel>;

export const Default: Story = {
	render: () => {
		const notebook = mockNotebooks[0];
		const artifact = notebook.artifacts.find((a) => a.cellIndex === 1) ?? notebook.artifacts[0];
		return (
			<div className="w-[520px] max-w-full">
				<ArtefactDetailsPanel artifact={artifact ?? null} cells={notebook.cells} onClose={() => {}} />
			</div>
		);
	},
};
