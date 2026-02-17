import type { NotebookData } from "@/data/mockData";
import {
	getResponsiveNotebookColsClass,
	getVisibleNotebooks,
} from "@/utils/notebookComparison";
import { ChevronDown, Code } from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import { NotebookBadge } from "./NotebookBadge";

import { MultiNotebookDiffCell } from "./codeDiff/MultiNotebookDiffCell";
import { SingleNotebookCell } from "./codeDiff/SingleNotebookCell";
import { ThreeNotebookUnifiedDiffCell } from "./codeDiff/ThreeNotebookUnifiedDiffCell";
import {
	getCellByIndex,
	getCellIndexUnionMany,
	resolveCellTitle,
} from "../../utils/diffUtils";

export type NotebookCodeDiffComparisonProps = {
	notebooks: NotebookData[];
};

function NotebookHeaderCard({ notebook, index }: { notebook: NotebookData; index: number }) {
	return (
		<div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
			<NotebookBadge index={index} />
			<div className="min-w-0">
				<div className="font-semibold text-slate-900 truncate">{notebook.student}</div>
				<div className="text-xs text-slate-500">
					{notebook.cells.length} cellule{notebook.cells.length === 1 ? "" : "s"}
				</div>
			</div>
		</div>
	);
}

function ReferenceSelector({
	value,
	onChange,
	options,
}: {
	value: string;
	onChange: (value: string) => void;
	options: Array<{ label: string; value: string }>;
}) {
	return (
		<div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
			<span className="text-xs font-semibold text-slate-600">Référence</span>
			<select
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
			>
				{options.map((opt) => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
		</div>
	);
}

export function NotebookCodeDiffComparison({ notebooks }: NotebookCodeDiffComparisonProps) {
	const visibleNotebooks = getVisibleNotebooks(notebooks);
	const colsClass = getResponsiveNotebookColsClass(visibleNotebooks.length);

	const [baseNotebookId, setBaseNotebookId] = useState<string>("");

	useEffect(() => {
		if (visibleNotebooks.length === 0) {
			if (baseNotebookId) setBaseNotebookId("");
			return;
		}
		const stillExists = baseNotebookId && visibleNotebooks.some((nb) => nb.id === baseNotebookId);
		if (!stillExists) setBaseNotebookId(visibleNotebooks[0]!.id);
	}, [visibleNotebooks, baseNotebookId]);

	const baseIndex = useMemo(() => {
		if (!baseNotebookId) return 0;
		const idx = visibleNotebooks.findIndex((nb) => nb.id === baseNotebookId);
		return idx >= 0 ? idx : 0;
	}, [visibleNotebooks, baseNotebookId]);

	const orderedNotebooks = useMemo(() => {
		if (visibleNotebooks.length === 0) return [] as NotebookData[];
		const base = visibleNotebooks[baseIndex] ?? visibleNotebooks[0]!;
		return [base, ...visibleNotebooks.filter((_, i) => i !== baseIndex)];
	}, [visibleNotebooks, baseIndex]);

	const cellIndices = useMemo(
		() => getCellIndexUnionMany(orderedNotebooks),
		[orderedNotebooks],
	);

	if (visibleNotebooks.length === 0) {
		return (
			<div className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-700">
				Sélectionne des notebooks pour afficher la comparaison de code.
			</div>
		);
	}

	const isTwoOrMore = visibleNotebooks.length >= 2;
	const isThree = visibleNotebooks.length === 3;

	return (
		<details open className="rounded-2xl border border-slate-200 bg-white">
			<summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl bg-slate-50 px-5 py-4">
				<div className="flex items-start gap-3">
					<span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
						<Code className="h-5 w-5" aria-hidden="true" />
					</span>
					<div>
						<div className="font-semibold text-slate-900">Comparaison de Code</div>
						<div className="text-sm text-slate-600">
							Vue cellule par cellule, alignée entre notebooks
						</div>
					</div>
				</div>
				<div className="flex items-center gap-3">
					{isTwoOrMore ? (
						<ReferenceSelector
							value={baseNotebookId}
							onChange={setBaseNotebookId}
							options={visibleNotebooks.map((nb) => ({ label: nb.student, value: nb.id }))}
						/>
					) : null}
					<ChevronDown className="h-5 w-5 text-slate-500" aria-hidden="true" />
				</div>
			</summary>

			<div className="p-5">
				<div className={`grid grid-cols-1 gap-6 ${colsClass}`}>
					{orderedNotebooks.map((nb, i) => (
						<NotebookHeaderCard key={nb.id} notebook={nb} index={i + 1} />
					))}
				</div>

				<div className="mt-4 space-y-4">
					{cellIndices.map((cellIndex) => {
						const cells = orderedNotebooks.map((nb) => getCellByIndex(nb, cellIndex));
						const title = resolveCellTitle(cells);

						if (isThree) {
							const labels: [string, string, string] = [
								orderedNotebooks[0]!.student,
								orderedNotebooks[1]!.student,
								orderedNotebooks[2]!.student,
							];
							const codes: [string, string, string] = [
								cells[0]?.code ?? "",
								cells[1]?.code ?? "",
								cells[2]?.code ?? "",
							];
							return (
								<ThreeNotebookUnifiedDiffCell
									key={`diff-3-way-${cellIndex}`}
									cellIndex={cellIndex}
									title={title}
									labels={labels}
									codes={codes}
								/>
							);
						}

						if (isTwoOrMore) {
							const baseNotebook = orderedNotebooks[0]!;
							const baseCell = cells[0];
							const baseCode = baseCell?.code ?? "";

							const comparisons = orderedNotebooks.slice(1).map((nb, idx) => {
								const cell = cells[idx + 1];
								return { label: nb.student, code: cell?.code ?? "", notebookIndex: idx + 1 };
							});

							return (
								<MultiNotebookDiffCell
									key={`diff-${visibleNotebooks.length}-${cellIndex}`}
									cellIndex={cellIndex}
									title={title}
									baseLabel={baseNotebook.student}
									baseCode={baseCode}
									baseNotebookIndex={0}
									comparisons={comparisons}
								/>
							);
						}

						// 1 notebook (or fallback for >3, though UI limits to 3)
						const only = orderedNotebooks[0]!;
						const cell = cells[0];
						return (
							<SingleNotebookCell
								key={`single-${only.id}-${cellIndex}`}
								cellIndex={cellIndex}
								title={title}
								code={cell?.code ?? ""}
							/>
						);
					})}
				</div>
			</div>
		</details>
	);
}
