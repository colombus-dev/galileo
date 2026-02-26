import type { Meta, StoryObj } from "@storybook/react";

import { SingleNotebookCell } from "@/components/artefacts/codeDiff/SingleNotebookCell";

const meta: Meta<typeof SingleNotebookCell> = {
	title: "Artefacts/CodeDiff/SingleNotebookCell",
	component: SingleNotebookCell,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
};

export default meta;

type Story = StoryObj<typeof SingleNotebookCell>;

const code = `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

iris = load_iris()
X, y = iris.data, iris.target

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print(len(X_train), len(X_test))
`;

export const Default: Story = {
	args: {
		cellIndex: 1,
		title: "Split des données",
		code,
	},
	render: (args) => (
		<div className="max-w-5xl">
			<SingleNotebookCell {...args} />
		</div>
	),
};
