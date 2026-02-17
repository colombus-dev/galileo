import { useMemo } from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer-continued";

import { CellCardShell } from "./CellCardShell";
import { getDiffViewerStylesOverride } from "./diffPalette";
import { countLines, normalizeCode } from "./diffUtils";

export function MultiNotebookDiffCell({
	cellIndex,
	title,
	baseLabel,
	baseCode,
	baseNotebookIndex,
	comparisons,
}: {
	cellIndex: number;
	title: string;
	baseLabel: string;
	baseCode: string;
	baseNotebookIndex: number;
	comparisons: Array<{ label: string; code: string; notebookIndex: number }>;
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
					const styles = getDiffViewerStylesOverride({
						baseNotebookIndex,
						otherNotebookIndex: c.notebookIndex,
					});
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
								styles={styles}
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
