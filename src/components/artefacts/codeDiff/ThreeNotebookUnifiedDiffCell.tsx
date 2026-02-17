import { useMemo } from "react";

import { CellCardShell } from "./CellCardShell";
import { getThreeWayCellClass, type ThreeWayNotebookIndex } from "../../../utils/diffPalette";
import {
	buildAnchoredAlignment,
	resolveThreeWayCellStatus,
	splitLines,
	type ThreeWayCellStatus,
} from "../../../utils/diffUtils";

function ThreeWayLineCell({
	lineNo,
	text,
	status,
	notebookIndex,
}: {
	lineNo: number | null;
	text: string | null;
	status: ThreeWayCellStatus;
	notebookIndex: ThreeWayNotebookIndex;
}) {
	return (
		<div
			className={`flex min-w-0 items-start gap-2 border-r border-slate-800 ${getThreeWayCellClass(
				notebookIndex,
				status,
			)}`}
		>
			<div className="w-12 shrink-0 select-none pr-2 text-right font-mono text-[11px] leading-5 text-slate-400">
				{lineNo ?? ""}
			</div>
			<pre className="min-w-0 flex-1 overflow-hidden font-mono text-[12px] leading-5 text-slate-100 whitespace-pre">
				{text ?? ""}
			</pre>
		</div>
	);
}

export function ThreeNotebookUnifiedDiffCell({
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
		const [baseCode, bCode, cCode] = codes;
		const baseLines = splitLines(baseCode);
		const bLines = splitLines(bCode);
		const cLines = splitLines(cCode);

		const bAligned = buildAnchoredAlignment(baseLines, bLines);
		const cAligned = buildAnchoredAlignment(baseLines, cLines);

		type Row = {
			base: { lineNo: number | null; text: string | null; status: ThreeWayCellStatus };
			b: { lineNo: number | null; text: string | null; status: ThreeWayCellStatus };
			c: { lineNo: number | null; text: string | null; status: ThreeWayCellStatus };
		};

		const rows: Row[] = [];
		const baseLen = baseLines.length;

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
					base: { lineNo: null, text: null, status: "empty" },
					b: {
						lineNo: bRow?.lineNo ?? null,
						text: bRow?.text ?? null,
						status: resolveThreeWayCellStatus({
							baseText: null,
							otherText: bRow?.text ?? null,
							isInsertRow: true,
						}),
					},
					c: {
						lineNo: cRow?.lineNo ?? null,
						text: cRow?.text ?? null,
						status: resolveThreeWayCellStatus({
							baseText: null,
							otherText: cRow?.text ?? null,
							isInsertRow: true,
						}),
					},
				});
			}

			if (pos === baseLen) break;

			const baseText = baseLines[pos] ?? "";
			const bBase = bAligned.baseRows[pos] ?? { otherText: null, otherLineNo: null, status: "delete" as const };
			const cBase = cAligned.baseRows[pos] ?? { otherText: null, otherLineNo: null, status: "delete" as const };

			const bText = bBase.otherText;
			const cText = cBase.otherText;

			const bStatus = resolveThreeWayCellStatus({ baseText, otherText: bText, isInsertRow: false });
			const cStatus = resolveThreeWayCellStatus({ baseText, otherText: cText, isInsertRow: false });

			const baseStatus: ThreeWayCellStatus =
				bStatus === "equal" && cStatus === "equal" ? "equal" : "change";

			rows.push({
				base: { lineNo: pos + 1, text: baseText, status: baseStatus },
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
								<ThreeWayLineCell
									lineNo={row.base.lineNo}
									text={row.base.text}
									status={row.base.status}
									notebookIndex={0}
								/>
								<ThreeWayLineCell
									lineNo={row.b.lineNo}
									text={row.b.text}
									status={row.b.status}
									notebookIndex={1}
								/>
								<ThreeWayLineCell
									lineNo={row.c.lineNo}
									text={row.c.text}
									status={row.c.status}
									notebookIndex={2}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</CellCardShell>
	);
}
