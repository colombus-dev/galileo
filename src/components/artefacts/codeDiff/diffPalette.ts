import type { ReactDiffViewerStylesOverride } from "react-diff-viewer-continued";

type NotebookRgb = readonly [number, number, number];

// Palette explicite demandée : bleu / jaune / vert
const NOTEBOOK_RGBS: NotebookRgb[] = [
	[59, 130, 246], // blue-500
	[234, 179, 8], // yellow-500
	[34, 197, 94], // green-500
];

function getNotebookRgb(notebookIndex: number): NotebookRgb {
	return NOTEBOOK_RGBS[notebookIndex % NOTEBOOK_RGBS.length]!;
}

function rgbWithAlpha([r, g, b]: NotebookRgb, alpha: number): string {
	return `rgb(${r} ${g} ${b} / ${alpha})`;
}

function changedGradient(base: NotebookRgb, other: NotebookRgb, alpha: number): string {
	const left = rgbWithAlpha(base, alpha);
	const right = rgbWithAlpha(other, alpha);
	return `linear-gradient(90deg, ${left} 0%, ${left} 50%, ${right} 50%, ${right} 100%)`;
}

export function getDiffViewerStylesOverride(opts: {
	baseNotebookIndex: number;
	otherNotebookIndex: number;
}): ReactDiffViewerStylesOverride {
	const baseRgb = getNotebookRgb(opts.baseNotebookIndex);
	const otherRgb = getNotebookRgb(opts.otherNotebookIndex);

	const variables = {
		removedBackground: rgbWithAlpha(baseRgb, 0.22),
		removedGutterBackground: rgbWithAlpha(baseRgb, 0.14),
		wordRemovedBackground: rgbWithAlpha(baseRgb, 0.34),
		addedBackground: rgbWithAlpha(otherRgb, 0.22),
		addedGutterBackground: rgbWithAlpha(otherRgb, 0.14),
		wordAddedBackground: rgbWithAlpha(otherRgb, 0.34),
		// CHANGED s'applique aux deux côtés : on utilise un dégradé base/other
		changedBackground: changedGradient(baseRgb, otherRgb, 0.18),
		gutterBackground: "hsl(var(--muted) / 0.15)",
		diffViewerBackground: "hsl(var(--background))",
		diffViewerTitleBackground: "hsl(var(--muted) / 0.25)",
		diffViewerTitleBorderColor: "hsl(var(--border))",
		diffViewerTitleColor: "hsl(var(--foreground) / 0.9)",
		diffViewerColor: "hsl(var(--foreground) / 0.92)",
		gutterColor: "hsl(var(--muted-foreground))",
		addedGutterColor: "hsl(var(--foreground) / 0.92)",
		removedGutterColor: "hsl(var(--foreground) / 0.92)",
	};

	return {
		variables: {
			dark: variables,
			light: variables,
		},
	};
}

export type ThreeWayNotebookIndex = 0 | 1 | 2;

export type ThreeWayCellStatus = "empty" | "equal" | "insert" | "delete" | "change";

export function getThreeWayCellClass(
	notebookIndex: ThreeWayNotebookIndex,
	status: ThreeWayCellStatus,
): string {
	if (status === "equal" || status === "empty") return "bg-slate-900";

	if (notebookIndex === 0) {
		// Bleu
		if (status === "insert") return "bg-blue-950/55";
		if (status === "delete") return "bg-blue-950/35";
		return "bg-blue-950/45";
	}
	if (notebookIndex === 1) {
		// Jaune
		if (status === "insert") return "bg-yellow-950/55";
		if (status === "delete") return "bg-yellow-950/35";
		return "bg-yellow-950/45";
	}
	// Vert
	if (status === "insert") return "bg-green-950/55";
	if (status === "delete") return "bg-green-950/35";
	return "bg-green-950/45";
}
