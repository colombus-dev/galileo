import type { Meta, StoryObj } from "@storybook/react";

import { ArtifactVisualization } from "@/components/artefacts/ArtifactVisualization";
import { mockNotebooks } from "@/data/mockData";

const meta: Meta<typeof ArtifactVisualization> = {
	title: "Artefacts/ArtifactVisualization",
	component: ArtifactVisualization,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
};

export default meta;

type Story = StoryObj<typeof ArtifactVisualization>;

const notebook = mockNotebooks[0]!;
const fallbackArtifact = notebook.artifacts[0]!;

function pickArtifact(type: "dataset" | "model" | "visualization" | "metric") {
	return notebook.artifacts.find((a) => a.type === type) ?? fallbackArtifact;
}

export const Dataset: Story = {
	args: {
		artifact: pickArtifact("dataset"),
		compact: false,
	},
	render: (args) => (
		<div className="max-w-xl rounded-2xl border border-slate-200 bg-white">
			<ArtifactVisualization {...args} />
		</div>
	),
};

export const Model: Story = {
	args: {
		artifact: pickArtifact("model"),
		compact: false,
	},
	render: (args) => (
		<div className="max-w-xl rounded-2xl border border-slate-200 bg-white">
			<ArtifactVisualization {...args} />
		</div>
	),
};

export const Metric: Story = {
	args: {
		artifact: pickArtifact("metric"),
		compact: false,
	},
	render: (args) => (
		<div className="max-w-xl rounded-2xl border border-slate-200 bg-white">
			<ArtifactVisualization {...args} />
		</div>
	),
};

export const Visualization: Story = {
	args: {
		artifact: pickArtifact("visualization"),
		compact: false,
	},
	render: (args) => (
		<div className="max-w-xl rounded-2xl border border-slate-200 bg-white">
			<ArtifactVisualization {...args} />
		</div>
	),
};

export const Compact: Story = {
	args: {
		artifact: pickArtifact("visualization"),
		compact: true,
	},
	render: (args) => (
		<div className="max-w-sm rounded-2xl border border-slate-200 bg-white">
			<ArtifactVisualization {...args} />
		</div>
	),
};
