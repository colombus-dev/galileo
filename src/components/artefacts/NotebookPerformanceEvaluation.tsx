import type { NotebookData } from "@/data/mockData";
import type { ReactNode } from "react";
import { ArtifactVisualization } from "@/components/artefacts/ArtifactVisualization";
import {
	clamp01,
	findMetricArtifact,
	getConfusionMatrixArtifact,
	getDatasetArtifact,
	getNonEmptyLineCount,
	getPrimaryMetricArtifact,
	getRecommendedMetrics,
	inferClassBalanceFromDistribution,
} from "@/utils/notebookPerformanceEvaluation";
import {
	AlertTriangle,
	BarChart3,
	CheckCircle2,
	Clock,
	Gauge,
	Layers,
	TrendingUp,
} from "lucide-react";

export type NotebookPerformanceEvaluationProps = {
	notebook: NotebookData;
	className?: string;
};

function Pill({ label }: { label: string }) {
	return (
		<span className="inline-flex items-center rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
			{label}
		</span>
	);
}

function StatCard({
	icon,
	title,
	value,
	valueClassName,
	helper,
}: {
	icon: ReactNode;
	title: string;
	value: string;
	valueClassName?: string;
	helper?: string;
}) {
	return (
		<div className="rounded-xl border border-slate-200 bg-white p-4">
			<div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
				<span className="text-slate-500">{icon}</span>
				{title}
			</div>
			<div className={["mt-2 text-2xl font-semibold", valueClassName ?? "text-slate-900"].join(" ")}>
				{value}
			</div>
			{helper ? <div className="mt-1 text-xs text-slate-500">{helper}</div> : null}
		</div>
	);
}

export function NotebookPerformanceEvaluation({ notebook, className }: NotebookPerformanceEvaluationProps) {
	const primary = getPrimaryMetricArtifact(notebook);
	const value = primary?.metadata?.value;
	const metricName = primary?.metadata?.metric ?? primary?.name ?? "metric";
	const pct = typeof value === "number" ? Math.round(clamp01(value) * 1000) / 10 : null;

	const evaluatedOn = notebook.context?.methodology.evaluatedOnLabel;
	const isOnTest = (evaluatedOn ?? "").toLowerCase().includes("test");
	const isOnTrain = (evaluatedOn ?? "").toLowerCase().includes("train");

	const dataset = getDatasetArtifact(notebook);
	const dist = dataset?.metadata?.classDistribution ?? [];
	const distTotal = dist.reduce((acc, x) => acc + x.count, 0);

	const inferredBalance = inferClassBalanceFromDistribution(dist);
	const balanceLabel = notebook.context?.data.classBalanceLabel ?? inferredBalance?.label;
	const balanceHint = notebook.context?.data.classBalanceHint ?? inferredBalance?.hint;
	const recommended = getRecommendedMetrics({
		taskType: notebook.context?.problem.taskTypeLabel,
		classBalance: balanceLabel,
	});

	const cm = getConfusionMatrixArtifact(notebook);
	const codeCells = notebook.cells.length;
	const codeLines = notebook.cells.reduce((acc, c) => acc + getNonEmptyLineCount(c.code), 0);
	const execSeconds = notebook.context?.codeQuality?.executionTimeSeconds;

	const isAccuracy = (metricName ?? "").toLowerCase().includes("accuracy");
	const isImbalanced = (balanceLabel ?? "").toLowerCase().includes("dés") || (balanceLabel ?? "").toLowerCase().includes("imbal");

	const resolvedRecommended = recommended.map((m) => {
		const found = findMetricArtifact(notebook, m);
		const v = found?.metadata?.value;
		return { label: m, value: typeof v === "number" ? v : null };
	});
	const availableRecommended = resolvedRecommended.filter((r) => typeof r.value === "number");
	const missingRecommended = resolvedRecommended.filter((r) => r.value === null);

	return (
		<section
			className={[
				"rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6",
				className,
			]
				.filter(Boolean)
				.join(" ")}
		>
			<header className="flex items-start gap-3">
				<div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
					<TrendingUp className="h-5 w-5" aria-hidden="true" />
				</div>
				<div className="min-w-0">
					<h2 className="text-lg font-semibold text-slate-900">Performance &amp; Évaluation</h2>
					<p className="mt-1 text-sm text-slate-600">Métriques de performance et qualité du code</p>
				</div>
			</header>

			<div className="mt-5">
				<div className="text-sm font-semibold text-slate-800">Les Métriques de Performance</div>
			</div>

			<div className="mt-4 grid gap-4 lg:grid-cols-3">
				{/* Score principal */}
				<div className="rounded-2xl border border-emerald-200 bg-white p-5">
					<div className="flex items-center justify-between">
						<div className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Score principal</div>
						<Gauge className="h-4 w-4 text-emerald-600" aria-hidden="true" />
					</div>

					<div className="mt-4">
						{primary ? (
							<ArtifactVisualization artifact={primary} compact />
						) : (
							<>
								<div className="text-3xl font-semibold text-emerald-700">
									{pct !== null ? `${pct.toFixed(1)}%` : "—"}
								</div>
								<div className="text-sm text-slate-600">{metricName}</div>
							</>
						)}
						{notebook.context?.methodology?.trainTestSplitLabel ? (
							<div className="mt-1 text-xs text-slate-500">
								Split: {notebook.context.methodology.trainTestSplitLabel}
							</div>
						) : null}
						{notebook.context?.methodology?.validationLabel ? (
							<div className="mt-1 text-xs text-slate-500">
								Validation: {notebook.context.methodology.validationLabel}
							</div>
						) : null}
					</div>

					<div className="mt-4 border-t border-slate-100 pt-3 text-xs">
						{isOnTest ? (
							<div className="flex items-center gap-2 text-emerald-700">
								<CheckCircle2 className="h-4 w-4" aria-hidden="true" />
								<span>Évalué sur test set</span>
							</div>
						) : isOnTrain ? (
							<div className="flex items-center gap-2 text-amber-700">
								<AlertTriangle className="h-4 w-4" aria-hidden="true" />
								<span>Évalué sur train set (score potentiellement optimiste)</span>
							</div>
						) : (
							<div className="text-slate-500">Évalué sur: —</div>
						)}
						{typeof primary?.cellIndex === "number" ? (
							<div className="mt-1 text-slate-500">Cell {primary.cellIndex}</div>
						) : null}
					</div>
				</div>

				{/* Distribution classes */}
				<div className="rounded-2xl border border-emerald-200 bg-white p-5">
					<div className="flex items-center justify-between">
						<div className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Distribution classes</div>
						<BarChart3 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
					</div>

					{dist.length > 0 && distTotal > 0 ? (
						<div className="mt-4 grid gap-3">
							{dist.map((d) => {
								const p = (d.count / distTotal) * 100;
								return (
									<div key={d.label} className="grid gap-1">
										<div className="flex items-center justify-between text-xs text-slate-600">
											<span className="font-medium text-slate-700">{d.label}</span>
											<span>
												{d.count} <span className="text-slate-400">({p.toFixed(1)}%)</span>
											</span>
										</div>
										<div className="h-2 w-full rounded-full bg-slate-100">
											<div className="h-2 rounded-full bg-emerald-500" style={{ width: `${Math.max(2, p)}%` }} />
										</div>
									</div>
								);
							})}

							{balanceLabel ? (
								<div className="mt-2">
									<div className="text-xs text-emerald-700 flex items-center gap-2">
										<CheckCircle2 className="h-4 w-4" aria-hidden="true" />
										<span>Classes: {balanceLabel}</span>
									</div>
									{balanceHint ? (
										<div className="mt-1 text-[11px] text-slate-500">{balanceHint}</div>
									) : null}
								</div>
							) : null}
						</div>
					) : (
						<div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
							Distribution indisponible (ajoute-la dans le notebook ou les artefacts).
						</div>
					)}
				</div>

				{/* Matrice de confusion */}
				<div className="rounded-2xl border border-emerald-200 bg-white p-5">
					<div className="flex items-center justify-between">
						<div className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Matrice de confusion</div>
						<Layers className="h-4 w-4 text-emerald-600" aria-hidden="true" />
					</div>

					<div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 min-h-[220px] flex items-center justify-center">
						{cm ? (
							<div className="w-full">
								<ArtifactVisualization artifact={cm} compact />
								<div className="mt-2 flex items-center justify-between text-xs text-slate-600">
									<span className="font-medium text-slate-700">{cm.name}</span>
									<span className="inline-flex items-center gap-1 text-emerald-700">
										<CheckCircle2 className="h-4 w-4" aria-hidden="true" />
										Disponible
									</span>
								</div>
							</div>
						) : (
							<div className="text-center">
								<div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-amber-700 border border-amber-200">
									<AlertTriangle className="h-5 w-5" aria-hidden="true" />
								</div>
								<div className="mt-3 text-sm font-semibold text-slate-800">Indisponible</div>
								<div className="text-xs text-slate-600">Ajoute un artefact de matrice de confusion</div>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Aide rapide: interprétation */}
			{(isOnTrain || (isAccuracy && isImbalanced)) ? (
				<div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
					<div className="flex items-start gap-2">
						<AlertTriangle className="mt-0.5 h-4 w-4" aria-hidden="true" />
						<div className="min-w-0">
							<div className="font-semibold">Attention à l’interprétation</div>
							{isOnTrain ? (
								<div className="mt-1 text-xs text-amber-800">
									Un score sur train est souvent surestimé. Idéalement, évalue sur test set ou via validation.
								</div>
							) : null}
							{isAccuracy && isImbalanced ? (
								<div className="mt-1 text-xs text-amber-800">
									Avec des classes déséquilibrées, l’accuracy peut masquer des erreurs. Regarde la matrice de confusion et F1-macro.
								</div>
							) : null}
						</div>
					</div>
				</div>
			) : null}

			{recommended.length > 0 ? (
				<div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
					<span className="text-slate-700 font-semibold">Métriques recommandées :</span>
					{availableRecommended.map((r) => (
						<Pill key={r.label} label={`${r.label}: ${r.value!.toFixed(3)}`} />
					))}
					{missingRecommended.length > 0 ? (
						<span className="text-slate-500">
							À calculer dans ce notebook: {missingRecommended.map((m) => m.label).join(", ")}
						</span>
					) : null}
				</div>
			) : null}

			<div className="mt-8">
				<div className="text-sm font-semibold text-slate-800">Qualité du Code</div>
				<div className="mt-3 grid gap-4 md:grid-cols-3">
					<StatCard
						icon={<Layers className="h-4 w-4" aria-hidden="true" />}
						title="Cellules"
						value={`${codeCells}`}
						helper="Cellules de code"
					/>
					<StatCard
						icon={<BarChart3 className="h-4 w-4" aria-hidden="true" />}
						title="Lignes"
						value={`${codeLines}`}
						helper="Lignes de code (hors vides)"
					/>
					<StatCard
						icon={<Clock className="h-4 w-4" aria-hidden="true" />}
						title="Temps"
						value={typeof execSeconds === "number" ? `~${Math.round(execSeconds)}s` : "—"}
						valueClassName={typeof execSeconds === "number" ? "text-amber-700" : undefined}
						helper="Estimation d'exécution"
					/>
				</div>
			</div>
		</section>
	);
}
