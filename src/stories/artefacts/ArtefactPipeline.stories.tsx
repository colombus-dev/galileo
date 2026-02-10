import type { Meta, StoryObj } from "@storybook/react";
import { useMemo, useState } from "react";

import { ArtefactPipeline } from "@/components/ArtefactPipeline";
import { ArtefactFilterMenu, type ArtefactFilterKey } from "@/components/ArtefactFilterMenu";
import SearchBar from "@/components/SearchBar";
import { mockNotebooks } from "@/data/mockData";

const meta: Meta<typeof ArtefactPipeline> = {
	title: "Artefacts/ArtefactPipeline",
	component: ArtefactPipeline,
    tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
	},
};

export default meta;

type Story = StoryObj<typeof ArtefactPipeline>;

function matchesFilter(type: string, filter: ArtefactFilterKey) {
	if (filter === "all") return true;
	if (filter === "data") return type === "dataset";
	if (filter === "viz") return type === "visualization";
	return type === filter;
}

export const Default: Story = {
	render: () => {
		const notebook = mockNotebooks[0];
		const [query, setQuery] = useState("");
		const [filterKey, setFilterKey] = useState<ArtefactFilterKey>("all");

		const artifacts = useMemo(() => {
			const q = query.trim().toLowerCase();
			return notebook.artifacts.filter((a) => {
				const okFilter = matchesFilter(a.type, filterKey);
				const okQuery =
					!q ||
					a.name.toLowerCase().includes(q) ||
					a.description.toLowerCase().includes(q) ||
					(a.className?.toLowerCase().includes(q) ?? false);
				return okFilter && okQuery;
			});
		}, [notebook.artifacts, query, filterKey]);

		return (
			<div className="min-h-screen bg-slate-50 p-8">
				<div className="max-w-7xl mx-auto">
					<div className="rounded-2xl border border-slate-200 bg-white p-6">
						<div className="flex items-start justify-between gap-6">
							<div>
								<h2 className="text-lg font-semibold text-slate-900">Artefacts</h2>
								<div className="text-sm text-slate-600 mt-1">
									{notebook.student} - {notebook.title}
								</div>
							</div>

							<div className="flex items-center gap-3">
								<SearchBar onSearch={setQuery} placeholder="Rechercher un artefact..." />
								<ArtefactFilterMenu value={filterKey} onChange={setFilterKey} />
							</div>
						</div>

						<div className="mt-6">
							<ArtefactPipeline artifacts={artifacts} cells={notebook.cells} />
						</div>
					</div>
				</div>
			</div>
		);
	},
};
