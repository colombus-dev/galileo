import type { CodeCell, NotebookData } from "@/data/mockData";
import {
	getResponsiveNotebookColsClass,
	getVisibleNotebooks,
} from "@/utils/notebookComparison";
import { diffArrays } from "diff";
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

function splitLines(code: string): string[] {
	const normalized = normalizeCode(code).replace(/\n+$/g, "");
	if (!normalized) return [];
	return normalized.split("\n");
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

type AnchoredBaseRow = {
	otherText: string | null;
	otherLineNo: number | null;
	status: "equal" | "change" | "delete";
};

type AnchoredInsertRow = {
	text: string;
	lineNo: number;
};

type AnchoredAlignment = {
	baseRows: AnchoredBaseRow[];
	insertsAt: Map<number, AnchoredInsertRow[]>;
};

function buildAnchoredAlignment(baseLines: string[], otherLines: string[]): AnchoredAlignment {
	const parts = diffArrays(baseLines, otherLines);

	const baseRows: AnchoredBaseRow[] = [];
	const insertsAt = new Map<number, AnchoredInsertRow[]>();

	let baseIndex = 0;
	let otherIndex = 0;

	const pushInsert = (pos: number, text: string) => {
		const existing = insertsAt.get(pos) ?? [];
		existing.push({ text, lineNo: otherIndex + 1 });
		insertsAt.set(pos, existing);
		otherIndex += 1;
	};

	for (let p = 0; p < parts.length; p++) {
		const part = parts[p];
		const next = parts[p + 1];

		if (part.removed && next?.added) {
			const removedLines = part.value as string[];
			const addedLines = next.value as string[];
			const max = Math.max(removedLines.length, addedLines.length);

			for (let k = 0; k < max; k++) {
				const baseLine = removedLines[k] ?? null;
				const otherLine = addedLines[k] ?? null;

				if (baseLine !== null) {
					const otherLineNo = otherLine !== null ? otherIndex + 1 : null;
					if (otherLine !== null) otherIndex += 1;
					baseRows.push({
						otherText: otherLine,
						otherLineNo,
						status: otherLine === null ? "delete" : otherLine === baseLine ? "equal" : "change",
					});
					baseIndex += 1;
				} else if (otherLine !== null) {
					pushInsert(baseIndex, otherLine);
				}
			}

			p += 1;
			continue;
		}

		if (part.added) {
			for (const line of part.value as string[]) pushInsert(baseIndex, line);
			continue;
		}

		if (part.removed) {
			for (const _ of part.value as string[]) {
				baseRows.push({ otherText: null, otherLineNo: null, status: "delete" });
				baseIndex += 1;
			}
			continue;
		}

		for (const line of part.value as string[]) {
			baseRows.push({ otherText: line, otherLineNo: otherIndex + 1, status: "equal" });
			baseIndex += 1;
			otherIndex += 1;
		}
	}

	return { baseRows, insertsAt };
}

type ThreeWayCellStatus = "empty" | "equal" | "insert" | "delete" | "change";

function resolveThreeWayCellStatus(opts: {
	baseText: string | null;
	otherText: string | null;
	isInsertRow: boolean;
}): ThreeWayCellStatus {
	if (opts.isInsertRow) {
		return opts.otherText ? "insert" : "empty";
	}
	if (opts.otherText == null) return "delete";
	if (opts.baseText == null) return "insert";
	return opts.otherText === opts.baseText ? "equal" : "change";
}

function getThreeWayCellClass(status: ThreeWayCellStatus): string {
	if (status === "insert") return "bg-emerald-950/35";
	if (status === "delete") return "bg-red-950/35";
	if (status === "change") return "bg-amber-950/35";
	return "bg-slate-900";
}

function ThreeWayLineCell({
	lineNo,
	text,
	status,
}: {
	lineNo: number | null;
	text: string | null;
	status: ThreeWayCellStatus;
}) {
	return (
		<div className={`flex min-w-0 items-start gap-2 border-r border-slate-800 ${getThreeWayCellClass(status)}`}>
			<div className="w-12 shrink-0 select-none pr-2 text-right font-mono text-[11px] leading-5 text-slate-500">
				{lineNo ?? ""}
			</div>
			<pre className="min-w-0 flex-1 overflow-hidden font-mono text-[12px] leading-5 text-slate-100 whitespace-pre">
				{text ?? ""}
			</pre>
		</div>
	);
}

function ThreeNotebookUnifiedDiffCell({
	cellIndex,
	title,
	labels,
	codes,
}: {
	cellIndex: number;
	title: string;
	labels: [string, string, string];
	codes: [string, string, string];
}) {
	const viewModel = useMemo(() => {
		const [aCode, bCode, cCode] = codes;
		const aLines = splitLines(aCode);
		const bLines = splitLines(bCode);
		const cLines = splitLines(cCode);

		const bAligned = buildAnchoredAlignment(aLines, bLines);
		const cAligned = buildAnchoredAlignment(aLines, cLines);

		type Row = {
			a: { lineNo: number | null; text: string | null; status: ThreeWayCellStatus };
			b: { lineNo: number | null; text: string | null; status: ThreeWayCellStatus };
			c: { lineNo: number | null; text: string | null; status: ThreeWayCellStatus };
		};

		const rows: Row[] = [];
		const baseLen = aLines.length;

		const getBInserts = (pos: number) => bAligned.insertsAt.get(pos) ?? [];
		const getCInserts = (pos: number) => cAligned.insertsAt.get(pos) ?? [];

		for (let pos = 0; pos <= baseLen; pos++) {
			const bIns = getBInserts(pos);
			const cIns = getCInserts(pos);
			const insertCount = Math.max(bIns.length, cIns.length);

			for (let k = 0; k < insertCount; k++) {
				const bRow = bIns[k] ?? null;
				const cRow = cIns[k] ?? null;

				rows.push({
					a: {
						lineNo: null,
						text: null,
						status: "empty",
					},
					b: {
						lineNo: bRow?.lineNo ?? null,
						text: bRow?.text ?? null,
						status: resolveThreeWayCellStatus({ baseText: null, otherText: bRow?.text ?? null, isInsertRow: true }),
					},
					c: {
						lineNo: cRow?.lineNo ?? null,
						text: cRow?.text ?? null,
						status: resolveThreeWayCellStatus({ baseText: null, otherText: cRow?.text ?? null, isInsertRow: true }),
					},
				});
			}

			if (pos === baseLen) break;

			const aText = aLines[pos] ?? "";
			const bBase = bAligned.baseRows[pos] ?? { otherText: null, otherLineNo: null, status: "delete" as const };
			const cBase = cAligned.baseRows[pos] ?? { otherText: null, otherLineNo: null, status: "delete" as const };

			const bText = bBase.otherText;
			const cText = cBase.otherText;

			const bStatus = resolveThreeWayCellStatus({ baseText: aText, otherText: bText, isInsertRow: false });
			const cStatus = resolveThreeWayCellStatus({ baseText: aText, otherText: cText, isInsertRow: false });

			const aStatus: ThreeWayCellStatus =
				bStatus === "equal" && cStatus === "equal" ? "equal" : "change";

			rows.push({
				a: { lineNo: pos + 1, text: aText, status: aStatus },
				b: { lineNo: bBase.otherLineNo, text: bText, status: bStatus },
				c: { lineNo: cBase.otherLineNo, text: cText, status: cStatus },
			});
		}

		return { rows, lineCount: rows.length };
	}, [codes]);

	return (
		<CellCardShell cellIndex={cellIndex} title={title} lines={viewModel.lineCount}>
			<div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-900">
				<div className="grid grid-cols-3 border-b border-slate-700 bg-slate-800">
					{labels.map((label) => (
						<div key={label} className="px-4 py-2 text-xs font-semibold text-slate-200 truncate">
							{label}
						</div>
					))}
				</div>

				<div className="max-h-[520px] overflow-auto">
					<div className="min-w-[980px]">
						{viewModel.rows.map((row, i) => (
							<div key={i} className="grid grid-cols-3 border-b border-slate-800">
								<ThreeWayLineCell lineNo={row.a.lineNo} text={row.a.text} status={row.a.status} />
								<ThreeWayLineCell lineNo={row.b.lineNo} text={row.b.text} status={row.b.status} />
								<ThreeWayLineCell lineNo={row.c.lineNo} text={row.c.text} status={row.c.status} />
							</div>
						))}
					</div>
				</div>
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

						if (isThree) {
							const labels: [string, string, string] = [
								visibleNotebooks[0]!.student,
								visibleNotebooks[1]!.student,
								visibleNotebooks[2]!.student,
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
