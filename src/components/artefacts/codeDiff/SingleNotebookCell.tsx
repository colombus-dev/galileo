import { useMemo } from "react";

import { CodeViewer } from "../CodeViewer";

import { CellCardShell, PlaceholderCell } from "./CellCardShell";

import { countLines, normalizeCode } from "./diffUtils";

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
