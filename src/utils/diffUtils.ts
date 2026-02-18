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

function stripAccents(input: string): string {
	return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function getInterleavingSeparatorLineNumbers(code: string): Set<number> {
	const lines = splitLines(code);
	const result = new Set<number>();

	for (let i = 0; i < lines.length; i++) {
		const raw = lines[i] ?? "";
		const trimmed = raw.trim();
		if (!trimmed.startsWith("#")) continue;

		const normalized = stripAccents(trimmed).toLowerCase();
		const isRule = /^#\s*-{10,}\s*$/.test(trimmed);
		const isLabel = normalized.startsWith("# cellule intercalee") || normalized.includes("cellule intercalee");

		if (isRule || isLabel) result.add(i + 1);
	}

	return result;
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

function getCellAlignmentKey(cell: CodeCell): string {
	const title = cell.description?.trim();
	if (title) return title.toLowerCase();
	return `__idx_${cell.index}`;
}

export type CellAlignmentToBase = {
	matchByBasePos: Map<number, CodeCell>;
	insertsAtBasePos: Map<number, CodeCell[]>;
};


export function alignCellsToBase(
	baseCells: CodeCell[],
	otherCells: CodeCell[],
): CellAlignmentToBase {
	const baseSorted = [...baseCells].sort((a, b) => a.index - b.index);
	const otherSorted = [...otherCells].sort((a, b) => a.index - b.index);

	const baseKeys = baseSorted.map(getCellAlignmentKey);
	const otherKeys = otherSorted.map(getCellAlignmentKey);

	const m = baseKeys.length;
	const n = otherKeys.length;
	const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

	for (let i = 1; i <= m; i++) {
		for (let j = 1; j <= n; j++) {
			if (baseKeys[i - 1] === otherKeys[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
			else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
		}
	}

	const matches: Array<{ basePos: number; otherPos: number }> = [];
	let i = m;
	let j = n;
	while (i > 0 && j > 0) {
		if (baseKeys[i - 1] === otherKeys[j - 1]) {
			matches.push({ basePos: i - 1, otherPos: j - 1 });
			i -= 1;
			j -= 1;
			continue;
		}
		if (dp[i - 1][j] >= dp[i][j - 1]) i -= 1;
		else j -= 1;
	}
	matches.reverse();

	const matchByBasePos = new Map<number, CodeCell>();
	const insertsAtBasePos = new Map<number, CodeCell[]>();

	let prevOtherPos = 0;
	for (const match of matches) {
		if (prevOtherPos < match.otherPos) {
			insertsAtBasePos.set(
				match.basePos,
				otherSorted.slice(prevOtherPos, match.otherPos),
			);
		}
		matchByBasePos.set(match.basePos, otherSorted[match.otherPos]!);
		prevOtherPos = match.otherPos + 1;
	}

	if (prevOtherPos < n) {
		insertsAtBasePos.set(m, otherSorted.slice(prevOtherPos));
	}

	return { matchByBasePos, insertsAtBasePos };
}
