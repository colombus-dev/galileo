import { useMemo } from "react";

import { CodeViewer } from "../CodeViewer";

import { CellCardShell, PlaceholderCell } from "./CellCardShell";

import { countLines, normalizeCode } from "../../../utils/diffUtils";
import { getInterleavingSeparatorLineNumbers } from "../../../utils/diffUtils";

export function SingleNotebookCell({
	cellIndex,
	title,
	code,
}: {
	cellIndex: number;
	title: string;
	code: string;
}) {
	const normalized = useMemo(() => normalizeCode(code), [code]);
	const separatorLines = useMemo(
		() => getInterleavingSeparatorLineNumbers(normalized),
		[normalized],
	);
	const lines = countLines(normalized);

	return (
		<CellCardShell cellIndex={cellIndex} title={title} lines={lines}>
			{normalized ? (
				<CodeViewer
					code={normalized}
					language="python"
					className="max-w-none"
					wrapLines
					lineProps={(lineNumber) =>
						separatorLines.has(lineNumber)
							? {
								className:
									"block rounded-md border border-slate-200 bg-slate-50 px-2 py-1 font-semibold text-slate-800",
								style: { display: "block" },
							}
							: { style: { display: "block" } }
					}
				/>
			) : (
				<PlaceholderCell message="Code indisponible pour cette cellule." />
			)}
		</CellCardShell>
	);
}
