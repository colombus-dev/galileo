import { NotebookSelectorDropdown } from "@/components/NotebookSelectorDropdown";

export default function ArtefactsView() {
	return (
		<div className="w-full max-w-5xl mx-auto px-6 py-10">

			<div className="mt-8">
				<NotebookSelectorDropdown multiple={false} label="Choisir un notebook" />
			</div>
		</div>
	);
}
