import type { CodeCell, NotebookData } from "@/data/mockData";
import {
	getResponsiveNotebookColsClass,
	getVisibleNotebooks,
} from "@/utils/notebookComparison";
import { ChevronDown, Code } from "lucide-react";
import { type ReactNode, useMemo } from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer-continued";

import { CodeViewer } from "./CodeViewer";
import { NotebookBadge } from "./NotebookBadge";

export type NotebookCodeDiffComparisonProps = {
	notebooks: NotebookData[];
};

function normalizeCode(code: string): string {
	return (code ?? "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function countLines(code: string): number {
	const normalized = normalizeCode(code).replace(/\n+$/g, "");
	if (!normalized) return 0;
	return normalized.split("\n").length;
}

function getCellByIndex(notebook: NotebookData, cellIndex: number): CodeCell | null {
	return notebook.cells.find((c) => c.index === cellIndex) ?? null;
}

function getCellIndexUnionMany(items: NotebookData[]): number[] {
	const indices = new Set<number>();
	for (const nb of items) {
		for (const cell of nb.cells) indices.add(cell.index);
	}
	return Array.from(indices).sort((a, b) => a - b);
}

function resolveCellTitle(cells: Array<CodeCell | null>): string {
	for (const c of cells) {
		const t = c?.description?.trim();
		if (t) return t;
	}
	return "Cellule";
}

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

function CellCardShell({
	cellIndex,
	title,
	lines,
	children,
}: {
	cellIndex: number;
	title: string;
	lines: number;
	children: ReactNode;
}) {
	const lineCountLabel = `${lines} ligne${lines === 1 ? "" : "s"}`;
	return (
		<div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
			<div className="flex items-start justify-between gap-3 p-4">
				<div className="flex items-start gap-3 min-w-0">
					<span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white text-sm font-semibold shrink-0">
						{cellIndex}
					</span>
					<div className="min-w-0">
						<div className="font-semibold text-slate-900 truncate">{title}</div>
						<div className="text-xs text-slate-500">{lineCountLabel}</div>
					</div>
				</div>

				{cellIndex === 0 ? (
					<span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold tracking-wide text-emerald-700">
						PREMIÈRE CELLULE
					</span>
				) : null}
			</div>

			<div className="mx-4 mb-4 overflow-hidden rounded-xl border border-slate-200">
				<div className="max-h-[520px] overflow-auto p-4">{children}</div>
			</div>
		</div>
	);
}

function PlaceholderCell({ message }: { message: string }) {
	return (
		<div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
			{message}
		</div>
	);
}

function SingleNotebookCell({ cellIndex, title, code }: { cellIndex: number; title: string; code: string }) {
	const normalized = useMemo(() => normalizeCode(code), [code]);
	const lines = countLines(normalized);

	return (
		<CellCardShell cellIndex={cellIndex} title={title} lines={lines}>
			{normalized ? (
				<CodeViewer code={normalized} language="python" className="max-w-none" />
			) : (
				<PlaceholderCell message="Code indisponible pour cette cellule." />
			)}
		</CellCardShell>
	);
}

function MultiNotebookDiffCell({
	cellIndex,
	title,
	baseLabel,
	baseCode,
	comparisons,
}: {
	cellIndex: number;
	title: string;
	baseLabel: string;
	baseCode: string;
	comparisons: Array<{ label: string; code: string }>;
}) {
	const baseNormalized = useMemo(() => normalizeCode(baseCode), [baseCode]);
	const lines = useMemo(() => {
		let max = countLines(baseNormalized);
		for (const c of comparisons) {
			max = Math.max(max, countLines(normalizeCode(c.code)));
		}
		return max;
	}, [baseNormalized, comparisons]);

	const gridCols = comparisons.length > 1 ? "lg:grid-cols-2" : "lg:grid-cols-1";

	return (
		<CellCardShell cellIndex={cellIndex} title={title} lines={lines}>
			<div className={`grid grid-cols-1 gap-4 ${gridCols}`}>
				{comparisons.map((c) => {
					const normalized = normalizeCode(c.code);
					return (
						<div key={`${cellIndex}-${c.label}`} className="overflow-hidden rounded-xl border border-slate-200">
							<ReactDiffViewer
								oldValue={baseNormalized}
								newValue={normalized}
								leftTitle={baseLabel}
								rightTitle={c.label}
								compareMethod={DiffMethod.LINES}
								splitView
								useDarkTheme
								hideLineNumbers={false}
								showDiffOnly={false}
								disableWordDiff
							/>
						</div>
					);
				})}
			</div>
		</CellCardShell>
	);
}

export function NotebookCodeDiffComparison({ notebooks }: NotebookCodeDiffComparisonProps) {
	const visibleNotebooks = getVisibleNotebooks(notebooks);
	const colsClass = getResponsiveNotebookColsClass(visibleNotebooks.length);

	const cellIndices = useMemo(
		() => getCellIndexUnionMany(visibleNotebooks),
		[visibleNotebooks],
	);

	if (visibleNotebooks.length === 0) {
		return (
			<div className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-700">
				Sélectionne des notebooks pour afficher la comparaison de code.
			</div>
		);
	}

	const isTwoOrMore = visibleNotebooks.length >= 2;

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
				<ChevronDown className="h-5 w-5 text-slate-500" aria-hidden="true" />
			</summary>

			<div className="p-5">
				<div className={`grid grid-cols-1 gap-6 ${colsClass}`}>
					{visibleNotebooks.map((nb, i) => (
						<NotebookHeaderCard key={nb.id} notebook={nb} index={i + 1} />
					))}
				</div>

				<div className="mt-4 space-y-4">
					{cellIndices.map((cellIndex) => {
						const cells = visibleNotebooks.map((nb) => getCellByIndex(nb, cellIndex));
						const title = resolveCellTitle(cells);

						if (isTwoOrMore) {
							const baseNotebook = visibleNotebooks[0]!;
							const baseCell = cells[0];
							const baseCode = baseCell?.code ?? "";

							const comparisons = visibleNotebooks.slice(1).map((nb, idx) => {
								const cell = cells[idx + 1];
								return { label: nb.student, code: cell?.code ?? "" };
							});

							return (
								<MultiNotebookDiffCell
									key={`diff-${visibleNotebooks.length}-${cellIndex}`}
									cellIndex={cellIndex}
									title={title}
									baseLabel={baseNotebook.student}
									baseCode={baseCode}
									comparisons={comparisons}
								/>
							);
						}

						// 1 notebook (or fallback for >3, though UI limits to 3)
						const only = visibleNotebooks[0]!;
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
