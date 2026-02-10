import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { SearchBar } from "@/components/SearchBar";

const meta: Meta<typeof SearchBar> = {
	title: "Artefacts/SearchBar",
	component: SearchBar,
    tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
	render: () => {
		const [value, setValue] = useState("");
		return (
			<div className="p-8 bg-slate-50 rounded-2xl">
				<SearchBar value={value} onChange={setValue} placeholder="Rechercher un artefact..." minWidth={320} />
			</div>
		);
	},
};
