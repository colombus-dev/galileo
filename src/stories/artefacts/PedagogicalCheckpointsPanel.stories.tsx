import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { PedagogicalCheckpointsPanel } from "@/components/artefacts/PedagogicalCheckpointsPanel";
import { mockNotebooks } from "@/data/mockData";

const meta: Meta<typeof PedagogicalCheckpointsPanel> = {
	title: "Artefacts/PedagogicalCheckpointsPanel",
	component: PedagogicalCheckpointsPanel,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
};

export default meta;

type Story = StoryObj<typeof PedagogicalCheckpointsPanel>;

const checkpoints = mockNotebooks[0]?.pedagogicalValidation?.checkpoints ?? [];

export const Interactive: Story = {
	render: (args) => {
		const [checkedIds, setCheckedIds] = useState<string[]>(args.checkedIds);
		return (
			<div className="max-w-3xl">
				<PedagogicalCheckpointsPanel
					{...args}
					checkedIds={checkedIds}
					onToggleId={(id) =>
						setCheckedIds((prev) =>
							prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
						)
					}
				/>
			</div>
		);
	},
	args: {
		checkpoints,
		checkedIds: checkpoints.length > 0 ? [checkpoints[0]!.id] : [],
		onToggleId: () => {},
	},
};

export const Empty: Story = {
	args: {
		checkpoints: [],
		checkedIds: [],
		onToggleId: () => {},
	},
	render: (args) => (
		<div className="max-w-3xl">
			<PedagogicalCheckpointsPanel {...args} />
		</div>
	),
};
