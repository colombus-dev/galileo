import { useMemo } from "react";

import { CodeViewer } from "../CodeViewer";
import { CellCardShell, PlaceholderCell } from "./CellCardShell";

import { buildAnchoredAlignment, countLines, normalizeCode, splitLines } from "../../../utils/diffUtils";
import { getNotebookDiffColor } from "../../../utils/diffPalette";

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

function getLineProps(opts: {
	highlights: Map<number, HighlightStatus>;
	notebookIndex: number;
}): (lineNumber: number) => { style?: React.CSSProperties } {
	return (lineNumber) => {
		const status = opts.highlights.get(lineNumber);
		if (!status) return {};

		const alpha = status === "insert" ? 0.32 : status === "delete" ? 0.22 : 0.28;
		return {
			style: {
				background: getNotebookDiffColor(opts.notebookIndex, alpha),
				display: "block",
			},
		};
	};
}

export function TwoNotebookCenteredDiffCell({
	cellIndex,
	title,
	baseLabel,
	baseCode,
	otherLabel,
	otherCode,
}: {
	cellIndex: number;
	title: string;
	baseLabel: string;
	baseCode: string;
	otherLabel: string;
	otherCode: string;
}) {
	const baseNormalized = useMemo(() => normalizeCode(baseCode), [baseCode]);
	const otherNormalized = useMemo(() => normalizeCode(otherCode), [otherCode]);

	const lines = useMemo(() => {
		return Math.max(countLines(baseNormalized), countLines(otherNormalized));
	}, [baseNormalized, otherNormalized]);

	const highlights = useMemo(() => computeHighlights(baseNormalized, otherNormalized), [baseNormalized, otherNormalized]);

	return (
		<CellCardShell cellIndex={cellIndex} title={title} lines={lines}>
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
				<div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
					<div className="border-b border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800">
						{otherLabel}
					</div>
					<div className="p-2">
						{otherNormalized ? (
							<CodeViewer
								code={otherNormalized}
								language="python"
								className="max-w-none w-full shadow-none border-0"
								wrapLines
								lineProps={getLineProps({ highlights: highlights.other, notebookIndex: 1 })}
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
								lineProps={getLineProps({ highlights: highlights.base, notebookIndex: 0 })}
							/>
						) : (
							<PlaceholderCell message="Code indisponible pour la référence." />
						)}
					</div>
				</div>

				<div className="hidden lg:block" aria-hidden="true" />
			</div>
		</CellCardShell>
	);
}
