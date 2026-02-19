import type { Meta, StoryObj } from "@storybook/react";

import { CellCardShell, PlaceholderCell } from "@/components/artefacts/codeDiff/CellCardShell";
import { CodeViewer } from "@/components/artefacts/CodeViewer";

const meta: Meta<typeof CellCardShell> = {
	title: "Artefacts/CodeDiff/CellCardShell",
	component: CellCardShell,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
};

export default meta;

type Story = StoryObj<typeof CellCardShell>;

export const WithCode: Story = {
	args: {
		cellIndex: 1,
		title: "Préparation des données",
		lines: 12,
		children: null,
	},
	render: (args) => (
		<div className="max-w-4xl">
			<CellCardShell {...args}>
				<CodeViewer
					code={"import pandas as pd\n\ndf = pd.read_csv('iris.csv')\nprint(df.head())\n"}
					language="python"
					className="max-w-none w-full"
					wrapLines
				/>
			</CellCardShell>
		</div>
	),
};

export const Placeholder: Story = {
	args: {
		cellIndex: 2,
		title: "Cellule vide",
		lines: 0,
		children: null,
	},
	render: (args) => (
		<div className="max-w-4xl">
			<CellCardShell {...args}>
				<PlaceholderCell message="Aucun code à afficher." />
			</CellCardShell>
		</div>
	),
};
