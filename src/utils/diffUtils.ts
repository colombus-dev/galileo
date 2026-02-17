import type { CodeCell, NotebookData } from "@/data/mockData";
import { diffArrays } from "diff";

export function normalizeCode(code: string): string {
	return (code ?? "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

export function countLines(code: string): number {
	const normalized = normalizeCode(code).replace(/\n+$/g, "");
	if (!normalized) return 0;
	return normalized.split("\n").length;
}

export function splitLines(code: string): string[] {
	const normalized = normalizeCode(code).replace(/\n+$/g, "");
	if (!normalized) return [];
	return normalized.split("\n");
}

export function getCellByIndex(notebook: NotebookData, cellIndex: number): CodeCell | null {
	return notebook.cells.find((c) => c.index === cellIndex) ?? null;
}

export function getCellIndexUnionMany(items: NotebookData[]): number[] {
	const indices = new Set<number>();
	for (const nb of items) {
		for (const cell of nb.cells) indices.add(cell.index);
	}
	return Array.from(indices).sort((a, b) => a - b);
}

export function resolveCellTitle(cells: Array<CodeCell | null>): string {
	for (const c of cells) {
		const t = c?.description?.trim();
		if (t) return t;
	}
	return "Cellule";
}

export type AnchoredBaseRow = {
	otherText: string | null;
	otherLineNo: number | null;
	status: "equal" | "change" | "delete";
};

export type AnchoredInsertRow = {
	text: string;
	lineNo: number;
};

export type AnchoredAlignment = {
	baseRows: AnchoredBaseRow[];
	insertsAt: Map<number, AnchoredInsertRow[]>;
};

export function buildAnchoredAlignment(baseLines: string[], otherLines: string[]): AnchoredAlignment {
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

export type ThreeWayCellStatus = "empty" | "equal" | "insert" | "delete" | "change";

export function resolveThreeWayCellStatus(opts: {
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
