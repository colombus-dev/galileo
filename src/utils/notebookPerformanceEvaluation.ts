import type { Artifact, NotebookData } from "@/data/mockData";

export function clamp01(v: number) {
	if (Number.isNaN(v)) return 0;
	return Math.max(0, Math.min(1, v));
}

export function getPrimaryMetricArtifact(notebook: NotebookData): Artifact | null {
	const metrics = notebook.artifacts.filter((a) => a.type === "metric");
	if (metrics.length === 0) return null;
	return metrics.find((m) => m.metadata?.metric === "accuracy") ?? metrics[0] ?? null;
}

export function getConfusionMatrixArtifact(notebook: NotebookData): Artifact | null {
	const vizzes = notebook.artifacts.filter((a) => a.type === "visualization");
	const byClassName = vizzes.find((v) => (v.className ?? "").toLowerCase() === "cm");
	if (byClassName) return byClassName;

	return (
		vizzes.find((v) => {
			const name = v.name.toLowerCase();
			const desc = v.description.toLowerCase();
			return name.includes("confusion") || desc.includes("confusion") || desc.includes("matrice");
		}) ?? null
	);
}

export function getDatasetArtifact(notebook: NotebookData): Artifact | null {
	return notebook.artifacts.find((a) => a.type === "dataset") ?? null;
}

export function getNonEmptyLineCount(code: string) {
	return code
		.split(/\r?\n/)
		.map((l) => l.trim())
		.filter(Boolean).length;
}

export function inferClassBalanceFromDistribution(
	dist: Array<{ label: string; count: number }>,
): { label: string; hint: string } | null {
	if (dist.length < 2) return null;
	const counts = dist.map((d) => d.count).filter((c) => typeof c === "number" && c > 0);
	if (counts.length < 2) return null;
	const min = Math.min(...counts);
	const max = Math.max(...counts);
	if (min <= 0) return null;
	const ratio = max / min;

	// Heuristique simple à partir des données du notebook (distribution classes)
	const isBalanced = ratio <= 1.25;
	if (isBalanced) {
		return {
			label: "Équilibrées",
			hint: "L’accuracy est souvent pertinente, mais vérifie aussi précision/rappel.",
		};
	}

	return {
		label: "Déséquilibrées",
		hint: "L’accuracy peut être trompeuse: privilégie F1-macro ou balanced accuracy.",
	};
}

export function getRecommendedMetrics(opts: { taskType?: string; classBalance?: string }) {
	const task = (opts.taskType ?? "").toLowerCase();
	const bal = (opts.classBalance ?? "").toLowerCase();

	if (!task.includes("classif")) return [] as string[];
	if (bal.includes("dés") || bal.includes("imbal")) {
		return ["F1-macro", "Balanced accuracy", "Precision", "Recall"];
	}
	return ["F1-score", "Precision", "Recall"];
}

function normalizeMetricName(value: string) {
	return value
		.toLowerCase()
		.replace(/[%()]/g, "")
		.replace(/[_\-\s]+/g, "")
		.trim();
}

export function findMetricArtifact(notebook: NotebookData, metricLabel: string): Artifact | null {
	const metrics = notebook.artifacts.filter((a) => a.type === "metric");
	if (metrics.length === 0) return null;

	const target = normalizeMetricName(metricLabel);
	const aliases = new Set<string>([
		target,
		// alias courants
		target.replace("macro", ""),
	]);

	for (const m of metrics) {
		const name = m.metadata?.metric ?? m.name;
		if (!name) continue;
		const n = normalizeMetricName(name);
		if (aliases.has(n)) return m;
		// correspondances souples (ex: "balancedaccuracy" vs "balanced acc")
		if (n.includes(target) || target.includes(n)) return m;
	}

	return null;
}
