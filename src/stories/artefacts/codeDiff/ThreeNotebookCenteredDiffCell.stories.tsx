import type { Meta, StoryObj } from "@storybook/react";

import { ThreeNotebookCenteredDiffCell } from "@/components/artefacts/codeDiff/ThreeNotebookCenteredDiffCell";

const meta: Meta<typeof ThreeNotebookCenteredDiffCell> = {
	title: "Artefacts/CodeDiff/ThreeNotebookCenteredDiffCell",
	component: ThreeNotebookCenteredDiffCell,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
};

export default meta;

type Story = StoryObj<typeof ThreeNotebookCenteredDiffCell>;

const baseCode = `from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
`;

const leftCode = `from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
`;

const rightCode = `from sklearn.preprocessing import MinMaxScaler

scaler = MinMaxScaler()
X_scaled = scaler.fit_transform(X)
`;

export const Default: Story = {
	args: {
		cellIndex: 4,
		title: "Normalisation",
		baseLabel: "Référence",
		baseCode,
		leftLabel: "Notebook A",
		leftCode,
		rightLabel: "Notebook B",
		rightCode,
	},
	render: (args) => (
		<div className="max-w-7xl">
			<ThreeNotebookCenteredDiffCell {...args} />
		</div>
	),
};
