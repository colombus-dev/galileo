import { useMemo } from "react";

import { CodeViewer } from "../CodeViewer";
import { DocModal } from "@/components/DocModal";
import { useArtefactDocumentation } from "@/hooks/useArtefactDocumentation";
import { CellCardShell, PlaceholderCell } from "./CellCardShell";

import { getNotebookDiffColor } from "../../../utils/diffPalette";
import {
	buildAnchoredAlignment,
	countLines,
	getInterleavingSeparatorLineNumbers,
	normalizeCode,
	splitLines,
} from "../../../utils/diffUtils";

type HighlightStatus = "insert" | "delete" | "change";

type Highlights = {
	base: Map<number, HighlightStatus>;
	other: Map<number, HighlightStatus>;
};

function computeHighlights(baseCode: string, otherCode: string): Highlights {
	const baseLines = splitLines(baseCode);
	const otherLines = splitLines(otherCode);
	const alignment = buildAnchoredAlignment(baseLines, otherLines);

	const base = new Map<number, HighlightStatus>();
	const other = new Map<number, HighlightStatus>();

	for (let i = 0; i < alignment.baseRows.length; i++) {
		const row = alignment.baseRows[i]!;
		const baseLineNo = i + 1;
		if (row.status === "change") {
			base.set(baseLineNo, "change");
			if (row.otherLineNo != null) other.set(row.otherLineNo, "change");
		}
		if (row.status === "delete") {
			base.set(baseLineNo, "delete");
		}
	}

	for (const [, inserts] of alignment.insertsAt) {
		for (const ins of inserts) {
			other.set(ins.lineNo, "insert");
		}
	}

	return { base, other };
}

function mergeBaseHighlights(
	baseHighlightsA: Map<number, HighlightStatus>,
	baseHighlightsB: Map<number, HighlightStatus>,
): Map<number, HighlightStatus> {
	const merged = new Map<number, HighlightStatus>();
	for (const [k, v] of baseHighlightsA) merged.set(k, v);
	for (const [k, v] of baseHighlightsB) merged.set(k, v);
	return merged;
}

function getLineProps(opts: {
	highlights: Map<number, HighlightStatus> | null;
	notebookIndex: number;
	separatorLines: Set<number>;
}): (lineNumber: number) => React.HTMLAttributes<HTMLElement> {
	return (lineNumber) => {
		if (opts.separatorLines.has(lineNumber)) {
			return {
				className:
					"block rounded-md border border-slate-200 bg-slate-50 px-2 py-1 font-semibold text-slate-800",
				style: { display: "block" },
			};
		}

		const status = opts.highlights?.get(lineNumber);
		if (!status) return { style: { display: "block" } };
		const alpha = status === "insert" ? 0.52 : status === "delete" ? 0.36 : 0.46;
		return {
			style: {
				background: getNotebookDiffColor(opts.notebookIndex, alpha),
				display: "block",
			},
		};
	};
}

function ThreeNotebookCenteredDiffCellComponent({
	cellIndex,
	title,
	baseLabel,
	baseCode,
	leftLabel,
	leftCode,
	rightLabel,
	rightCode,
	onDocKeyClick,
}: {
	cellIndex: number;
	title: string;
	baseLabel: string;
	baseCode: string | null;
	leftLabel: string;
	leftCode: string | null;
	rightLabel: string;
	rightCode: string | null;
	onDocKeyClick?: (docKey: string) => void;
}) {
	const baseNormalized = useMemo(
		() => normalizeCode(baseCode ?? ""),
		[baseCode],
	);
	const leftNormalized = useMemo(
		() => normalizeCode(leftCode ?? ""),
		[leftCode],
	);
	const rightNormalized = useMemo(
		() => normalizeCode(rightCode ?? ""),
		[rightCode],
	);

	const lines = useMemo(() => {
		return Math.max(
			countLines(baseNormalized),
			countLines(leftNormalized),
			countLines(rightNormalized),
		);
	}, [baseNormalized, leftNormalized, rightNormalized]);

	const leftHighlights = useMemo(() => {
		if (!baseCode || !leftCode) return null;
		return computeHighlights(baseNormalized, leftNormalized);
	}, [baseCode, leftCode, baseNormalized, leftNormalized]);
	const rightHighlights = useMemo(() => {
		if (!baseCode || !rightCode) return null;
		return computeHighlights(baseNormalized, rightNormalized);
	}, [baseCode, rightCode, baseNormalized, rightNormalized]);
	const baseHighlights = useMemo(() => {
		if (!leftHighlights || !rightHighlights) return null;
		return mergeBaseHighlights(leftHighlights.base, rightHighlights.base);
	}, [leftHighlights, rightHighlights]);

	const leftSeparatorLines = useMemo(
		() => getInterleavingSeparatorLineNumbers(leftNormalized),
		[leftNormalized],
	);
	const baseSeparatorLines = useMemo(
		() => getInterleavingSeparatorLineNumbers(baseNormalized),
		[baseNormalized],
	);
	const rightSeparatorLines = useMemo(
		() => getInterleavingSeparatorLineNumbers(rightNormalized),
		[rightNormalized],
	);

	return (
		<CellCardShell cellIndex={cellIndex} title={title} lines={lines}>
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
				<div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
					<div className="border-b border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800">
						{leftLabel}
					</div>
					<div className="p-2">
						{leftNormalized ? (
							<CodeViewer
								code={leftNormalized}
								language="python"
								className="max-w-none w-full shadow-none border-0"
								wrapLines
								enableDocLinks={true}
								onDocKeyClick={onDocKeyClick}
								lineProps={
									getLineProps({
										highlights: leftHighlights ? leftHighlights.other : null,
										notebookIndex: 1,
										separatorLines: leftSeparatorLines,
									})
								}
							/>
						) : (
							<PlaceholderCell message="Code indisponible pour ce notebook." />
						)}
					</div>
				</div>

				<div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
					<div className="border-b border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800">
						{baseLabel} (référence)
					</div>
					<div className="p-2">
						{baseNormalized ? (
							<CodeViewer
								code={baseNormalized}
								language="python"
								className="max-w-none w-full shadow-none border-0"
								wrapLines
								enableDocLinks={true}
								onDocKeyClick={onDocKeyClick}
								lineProps={
									getLineProps({
										highlights: baseHighlights,
										notebookIndex: 0,
										separatorLines: baseSeparatorLines,
									})
								}
							/>
						) : (
							<PlaceholderCell message="Code indisponible pour la référence." />
						)}
					</div>
				</div>

				<div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
					<div className="border-b border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800">
						{rightLabel}
					</div>
					<div className="p-2">
						{rightNormalized ? (
							<CodeViewer
								code={rightNormalized}
								language="python"
								className="max-w-none w-full shadow-none border-0"
								wrapLines
								enableDocLinks={true}
								onDocKeyClick={onDocKeyClick}
								lineProps={
									getLineProps({
										highlights: rightHighlights ? rightHighlights.other : null,
										notebookIndex: 2,
										separatorLines: rightSeparatorLines,
									})
								}
							/>
						) : (
							<PlaceholderCell message="Code indisponible pour ce notebook." />
						)}
					</div>
				</div>
			</div>
		</CellCardShell>
	);
}

export function ThreeNotebookCenteredDiffCell(props: {
	cellIndex: number;
	title: string;
	baseLabel: string;
	baseCode: string | null;
	leftLabel: string;
	leftCode: string | null;
	rightLabel: string;
	rightCode: string | null;
}) {
	const { handleDocKeyClick, isDocModalOpen, docEntry, loading, error, closeDocModal } = useArtefactDocumentation();

	return (
		<>
			<ThreeNotebookCenteredDiffCellComponent {...props} onDocKeyClick={handleDocKeyClick} />
			<DocModal
				isOpen={isDocModalOpen}
				docEntry={docEntry}
				loading={loading}
				error={error}
				onClose={closeDocModal}
			/>
		</>
	);
}
