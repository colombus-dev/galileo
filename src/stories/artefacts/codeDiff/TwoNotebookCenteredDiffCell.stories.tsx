import type { Meta, StoryObj } from "@storybook/react";

import { TwoNotebookCenteredDiffCell } from "@/components/artefacts/codeDiff/TwoNotebookCenteredDiffCell";

const meta: Meta<typeof TwoNotebookCenteredDiffCell> = {
	title: "Artefacts/CodeDiff/TwoNotebookCenteredDiffCell",
	component: TwoNotebookCenteredDiffCell,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
};

export default meta;

type Story = StoryObj<typeof TwoNotebookCenteredDiffCell>;

const baseCode = `from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print("train:", len(X_train))
`;

const otherCode = `from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, stratify=y, random_state=42
)

print("train:", len(X_train))
print("test:", len(X_test))
`;

export const Default: Story = {
	args: {
		cellIndex: 2,
		title: "Split train/test",
		baseLabel: "Notebook A",
		baseCode,
		otherLabel: "Notebook B",
		otherCode,
	},
	render: (args) => (
		<div className="max-w-7xl">
			<TwoNotebookCenteredDiffCell {...args} />
		</div>
	),
};

export const MissingOther: Story = {
	args: {
		cellIndex: 3,
		title: "Cellule manquante",
		baseLabel: "Notebook A",
		baseCode,
		otherLabel: "Notebook B",
		otherCode: null,
	},
	render: (args) => (
		<div className="max-w-7xl">
			<TwoNotebookCenteredDiffCell {...args} />
		</div>
	),
};
