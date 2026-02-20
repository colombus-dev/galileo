import { useMemo } from "react";

import { CodeViewer } from "../CodeViewer";
import { DocModal } from "@/components/DocModal";
import { useArtefactDocumentation } from "@/hooks/useArtefactDocumentation";

import { CellCardShell, PlaceholderCell } from "./CellCardShell";

import { countLines, normalizeCode } from "../../../utils/diffUtils";
import { getInterleavingSeparatorLineNumbers } from "../../../utils/diffUtils";

function SingleNotebookCellComponent({
	cellIndex,
	title,
	code,
	onDocKeyClick,
}: {
	cellIndex: number;
	title: string;
	code: string;
	onDocKeyClick?: (docKey: string) => void;
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
					enableDocLinks={true}
					onDocKeyClick={onDocKeyClick}
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

export function SingleNotebookCell(props: {
	cellIndex: number;
	title: string;
	code: string;
}) {
	const { handleDocKeyClick, isDocModalOpen, docEntry, loading, error, closeDocModal } = useArtefactDocumentation();

	return (
		<>
			<SingleNotebookCellComponent {...props} onDocKeyClick={handleDocKeyClick} />
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
