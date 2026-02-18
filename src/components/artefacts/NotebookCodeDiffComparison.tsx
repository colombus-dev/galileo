import type { CodeCell, NotebookData } from "@/data/mockData";
import {
	getResponsiveNotebookColsClass,
	getVisibleNotebooks,
} from "@/utils/notebookComparison";
import { ChevronDown, Code } from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import { NotebookBadge } from "./NotebookBadge";

import { SingleNotebookCell } from "./codeDiff/SingleNotebookCell";
import { TwoNotebookCenteredDiffCell } from "./codeDiff/TwoNotebookCenteredDiffCell";
import { ThreeNotebookCenteredDiffCell } from "./codeDiff/ThreeNotebookCenteredDiffCell";
import { resolveCellTitle } from "../../utils/diffUtils";

type CellInfo = {
	cell: CodeCell;
	rawTitle: string;
	groupKey: string;
	title: string;
};

function normalizeForGrouping(input: string): string {
	const lowered = input
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");
	const cleaned = lowered
		.replace(/[^a-z0-9\s]/g, " ")
		.replace(/\s+/g, " ")
		.trim();

	// Minimal, targeted aliases to avoid over-grouping.
	// Example: "Chargement des données" vs "Chargement du dataset Iris" should compare.
	if (
		cleaned.includes("chargement") &&
		(cleaned.includes("dataset") || cleaned.includes("donnees"))
	) {
		return "chargement_dataset";
	}

	return cleaned;
}

function buildCellInfos(notebook: NotebookData): CellInfo[] {
	return [...notebook.cells]
		.sort((a, b) => a.index - b.index)
		.map((cell) => ({
			cell,
			rawTitle: cell.description?.trim() || `Cellule ${cell.index}`,
			groupKey: normalizeForGrouping(cell.description?.trim() || `Cellule ${cell.index}`),
			title: cell.description?.trim() || `Cellule ${cell.index}`,
		}));
}

function getFirstInterleavingLabel(opts: {
	cellInfos: CellInfo[];
	fromIndex: number;
	toIndex: number;
	groupKey: string;
}): string | null {
	const min = Math.min(opts.fromIndex, opts.toIndex);
	const max = Math.max(opts.fromIndex, opts.toIndex);
	if (max - min <= 1) return null;

	for (const info of opts.cellInfos) {
		if (info.cell.index <= min) continue;
		if (info.cell.index >= max) break;
		if (info.groupKey !== opts.groupKey) {
			return info.title;
		}
	}

	return null;
}


function buildMergedCodeForDescription(opts: {
	cellInfos: CellInfo[];
	groupKey: string;
}): { code: string; firstIndex: number } | null {
	const occurrences = opts.cellInfos
		.filter((c) => c.groupKey === opts.groupKey)
		.map((c) => c.cell)
		.sort((a, b) => a.index - b.index);

	if (occurrences.length === 0) return null;

	const parts: string[] = [];
	for (let i = 0; i < occurrences.length; i++) {
		const cell = occurrences[i]!;
		if (i > 0) {
			const previous = occurrences[i - 1]!;
			const label = getFirstInterleavingLabel({
				cellInfos: opts.cellInfos,
				fromIndex: previous.index,
				toIndex: cell.index,
				groupKey: opts.groupKey,
			});
			if (label) {
				parts.push(
					`\n\n# ------------------------------------------------------------\n# CELLULE INTERCALÉE : ${label}\n# ------------------------------------------------------------\n\n`,
				);
			} else {
				parts.push("\n\n");
			}
		}
		parts.push(cell.code ?? "");
	}

	return { code: parts.join(""), firstIndex: occurrences[0]!.index };
}

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
		<div
			className="flex items-center gap-2 rounded-2xl border border-indigo-200 bg-white/90 px-3 py-2 shadow-sm"
			onClick={(e) => e.stopPropagation()}
		>
			<span className="inline-flex h-2.5 w-2.5 rounded-full bg-indigo-600" aria-hidden="true" />
			<span className="text-sm font-semibold text-slate-800">Référence</span>
			<select
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="h-10 min-w-[220px] rounded-xl border border-indigo-200 bg-white px-3 text-sm font-semibold text-slate-800 shadow-sm hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

	const orderedCellInfos = useMemo(() => orderedNotebooks.map(buildCellInfos), [orderedNotebooks]);

	const groupsToRender = useMemo(() => {
		if (orderedCellInfos.length === 0) return [] as string[];
		const orderedKeys: string[] = [];
		const seen = new Set<string>();

		// Order: follow reference notebook first
		for (const info of orderedCellInfos[0] ?? []) {
			if (!seen.has(info.groupKey)) {
				seen.add(info.groupKey);
				orderedKeys.push(info.groupKey);
			}
		}

		// Append any keys that exist only in the other notebooks
		for (let i = 1; i < orderedCellInfos.length; i++) {
			for (const info of orderedCellInfos[i] ?? []) {
				if (!seen.has(info.groupKey)) {
					seen.add(info.groupKey);
					orderedKeys.push(info.groupKey);
				}
			}
		}

		return orderedKeys;
	}, [orderedCellInfos]);

	const displayLabelByGroupKey = useMemo(() => {
		const map = new Map<string, string>();
		// Prefer reference notebook label when available
		for (const info of orderedCellInfos[0] ?? []) {
			if (!map.has(info.groupKey)) map.set(info.groupKey, info.rawTitle);
		}
		for (let i = 1; i < orderedCellInfos.length; i++) {
			for (const info of orderedCellInfos[i] ?? []) {
				if (!map.has(info.groupKey)) map.set(info.groupKey, info.rawTitle);
			}
		}
		return map;
	}, [orderedCellInfos]);

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
							Regroupé par description
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
					{!isTwoOrMore ? (
						(() => {
							const only = orderedNotebooks[0]!;
							return [...only.cells]
								.sort((a, b) => a.index - b.index)
								.map((cell) => (
									<SingleNotebookCell
										key={`single-${only.id}-${cell.index}`}
										cellIndex={cell.index}
										title={resolveCellTitle([cell])}
										code={cell.code ?? ""}
									/>
								));
						})()
					) : (
						groupsToRender.map((groupKey, groupIndex) => {
							const mergedByNotebook = orderedCellInfos.map((infos) =>
								buildMergedCodeForDescription({ cellInfos: infos, groupKey }),
							);
							const anyPresent = mergedByNotebook.some((m) => m?.code.trim());
							if (!anyPresent) return null;

							const baseMerged = mergedByNotebook[0] ?? null;
							const secondMerged = mergedByNotebook[1] ?? null;
							const thirdMerged = mergedByNotebook[2] ?? null;

							const badgeNumber = groupIndex;
							const headerLabel = displayLabelByGroupKey.get(groupKey) ?? groupKey;

							return (
								<div key={`desc-${groupKey}`} className="rounded-2xl border border-slate-200 bg-white">
									<div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
										<div className="text-base font-bold text-slate-900">{headerLabel}</div>
									</div>

									<div className="p-5 space-y-4">
										{isThree ? (
											<ThreeNotebookCenteredDiffCell
												key={`desc-${groupKey}-merged-3`}
												cellIndex={badgeNumber}
												title={""}
												baseLabel={orderedNotebooks[0]!.student}
												baseCode={baseMerged?.code ?? null}
												leftLabel={orderedNotebooks[1]!.student}
												leftCode={secondMerged?.code ?? null}
												rightLabel={orderedNotebooks[2]!.student}
												rightCode={thirdMerged?.code ?? null}
											/>
										) : (
											<TwoNotebookCenteredDiffCell
												key={`desc-${groupKey}-merged-2`}
												cellIndex={badgeNumber}
												title={""}
												baseLabel={orderedNotebooks[0]!.student}
												baseCode={baseMerged?.code ?? null}
												otherLabel={orderedNotebooks[1]!.student}
												otherCode={secondMerged?.code ?? null}
											/>
										)}
									</div>
								</div>
							);
						})
					)}
				</div>
			</div>
		</details>
	);
}
