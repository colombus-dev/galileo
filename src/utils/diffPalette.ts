import type { ReactDiffViewerStylesOverride } from "react-diff-viewer-continued";

// Palette explicite demandée : bleu / jaune / vert, basée sur les variables de thème
// pour rester cohérent avec le design system (pas de couleurs hardcodées).
const NOTEBOOK_COLOR_VARS = ["--chart-3", "--chart-4", "--chart-2"] as const;
type NotebookColorVar = (typeof NOTEBOOK_COLOR_VARS)[number];

function getNotebookColorVar(notebookIndex: number): NotebookColorVar {
	return NOTEBOOK_COLOR_VARS[notebookIndex % NOTEBOOK_COLOR_VARS.length]!;
}

function hslVar(varName: NotebookColorVar, alpha: number): string {
	return `hsl(var(${varName}) / ${alpha})`;
}

export function getNotebookDiffColor(notebookIndex: number, alpha: number): string {
	return hslVar(getNotebookColorVar(notebookIndex), alpha);
}

function changedGradient(baseVar: NotebookColorVar, otherVar: NotebookColorVar, alpha: number): string {
	const left = hslVar(baseVar, alpha);
	const right = hslVar(otherVar, alpha);
	return `linear-gradient(90deg, ${left} 0%, ${left} 50%, ${right} 50%, ${right} 100%)`;
}

export function getDiffViewerStylesOverride(opts: {
	baseNotebookIndex: number;
	otherNotebookIndex: number;
}): ReactDiffViewerStylesOverride {
	const baseVar = getNotebookColorVar(opts.baseNotebookIndex);
	const otherVar = getNotebookColorVar(opts.otherNotebookIndex);

	const variables = {
		// Un peu plus opaques pour une lecture plus nette
		removedBackground: hslVar(baseVar, 0.32),
		removedGutterBackground: hslVar(baseVar, 0.22),
		wordRemovedBackground: hslVar(baseVar, 0.5),
		addedBackground: hslVar(otherVar, 0.32),
		addedGutterBackground: hslVar(otherVar, 0.22),
		wordAddedBackground: hslVar(otherVar, 0.5),
		// CHANGED s'applique aux deux côtés : on utilise un dégradé base/other
		changedBackground: changedGradient(baseVar, otherVar, 0.28),
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

// Pour un affichage "other-only" (ex: colonne gauche/droite en mode 3 notebooks),
// on veut éviter de mélanger la couleur de la référence : tout est teinté avec
// la couleur du notebook "other" pour une cohérence visuelle.
export function getOtherOnlyDiffViewerStylesOverride(opts: {
	baseNotebookIndex: number;
	otherNotebookIndex: number;
}): ReactDiffViewerStylesOverride {
	const otherVar = getNotebookColorVar(opts.otherNotebookIndex);

	const variables = {
		addedBackground: hslVar(otherVar, 0.32),
		addedGutterBackground: hslVar(otherVar, 0.22),
		wordAddedBackground: hslVar(otherVar, 0.5),
		removedBackground: hslVar(otherVar, 0.32),
		removedGutterBackground: hslVar(otherVar, 0.22),
		wordRemovedBackground: hslVar(otherVar, 0.5),
		changedBackground: hslVar(otherVar, 0.28),
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
