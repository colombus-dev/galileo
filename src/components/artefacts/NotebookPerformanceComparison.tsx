import type { NotebookData } from "@/data/mockData";
import {
  findMetricArtifact,
  getConfusionMatrixArtifact,
  getNonEmptyLineCount,
  getPrimaryMetricArtifact,
} from "@/utils/notebookPerformanceEvaluation";
import { CheckCircle2, TrendingUp } from "lucide-react";

export type NotebookPerformanceComparisonProps = {
  notebooks: NotebookData[];
  className?: string;
};

function NotebookBadge({ index }: { index: number }) {
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
      {index}
    </span>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-0.5 text-sm font-semibold text-slate-900">
        {value}
      </div>
    </div>
  );
}

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
      <div className="text-xs font-semibold text-slate-700 truncate">
        {label}
      </div>
      <div className="text-xs text-slate-600 mt-0.5">{value}</div>
    </div>
  );
}

function formatMetricValue(value: number) {
  if (Number.isNaN(value)) return "—";
  if (value >= 0 && value <= 1) return `${(value * 100).toFixed(1)}%`;
  return value.toFixed(3);
}

function extractPrimaryMetricLabel(notebook: NotebookData): string {
  const primary = getPrimaryMetricArtifact(notebook);
  return primary?.metadata?.metric ?? primary?.name ?? "Performance";
}


function extractPerformancePct(notebook: NotebookData): string {
  const primary = getPrimaryMetricArtifact(notebook);
  const v = primary?.metadata?.value;
  if (typeof v === "number") return formatMetricValue(v);

  const acc = findMetricArtifact(notebook, "accuracy");
  const a = acc?.metadata?.value;
  if (typeof a === "number") return formatMetricValue(a);

  return "—";
}

function extractExecutionTime(notebook: NotebookData): string {
  const seconds = notebook.context?.codeQuality?.executionTimeSeconds;
  if (typeof seconds !== "number" || Number.isNaN(seconds)) return "—";
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const min = Math.floor(seconds / 60);
  const sec = Math.round(seconds % 60);
  return `${min}m ${sec}s`;
}

function extractCodeLines(notebook: NotebookData): string {
  const lines = notebook.cells.reduce(
    (acc, cell) => acc + getNonEmptyLineCount(cell.code),
    0,
  );
  return String(lines);
}

function extractCodeCells(notebook: NotebookData): string {
  return String(notebook.cells.length);
}

function getMetricEntries(notebook: NotebookData): Array<{ label: string; value: string }> {
  const metrics = notebook.artifacts.filter((a) => a.type === "metric");
  if (metrics.length === 0) return [];

  const map = new Map<string, string>();
  for (const m of metrics) {
    const label = (m.metadata?.metric ?? m.name ?? "metric").trim();
    const raw =
      typeof m.metadata?.value === "number"
        ? m.metadata.value
        : typeof m.metadata?.accuracy === "number"
          ? m.metadata.accuracy
          : null;
    const value = typeof raw === "number" ? formatMetricValue(raw) : "—";
    if (!map.has(label)) map.set(label, value);
  }

  return Array.from(map.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function NotebookPerformanceComparison({
  notebooks,
  className,
}: NotebookPerformanceComparisonProps) {
  const visibleNotebooks = notebooks.slice(0, 3);
  if (visibleNotebooks.length < 2) return null;

  const cardsGridCols =
    visibleNotebooks.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";

  return (
    <div className={className}>
      <div className={`grid gap-4 ${cardsGridCols}`}>
        {visibleNotebooks.map((n, idx) => {
          const perf = extractPerformancePct(n);
          const metricLabel = extractPrimaryMetricLabel(n);
          const hasConfusionMatrix = Boolean(getConfusionMatrixArtifact(n));
          const metrics = getMetricEntries(n);

          return (
            <div
              key={n.id}
              className="rounded-2xl border border-emerald-200 bg-white p-5"
            >
              <div className="flex items-center gap-3">
                <NotebookBadge index={idx + 1} />
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-slate-900">
                    {n.student}
                  </div>
                  <div className="truncate text-xs text-slate-500">{n.title}</div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
                <div className="text-xs text-slate-600">Performance</div>
                <div className="mt-1 flex items-baseline gap-2">
                  <div className="text-3xl font-semibold text-emerald-700">
                    {perf}
                  </div>
                  <TrendingUp className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                </div>
                <div className="mt-1 text-xs text-slate-500">{metricLabel}</div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <StatPill label="Cellules" value={extractCodeCells(n)} />
                <StatPill label="Lignes" value={extractCodeLines(n)} />
                <StatPill label="Temps" value={extractExecutionTime(n)} />
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Artefacts d'évaluation
                  </div>
                  {hasConfusionMatrix ? (
                    <div className="inline-flex items-center gap-1 text-emerald-700 text-xs font-semibold">
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      <span>Matrice de confusion</span>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500">Matrice de confusion: —</div>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Métriques disponibles
                </div>
                {metrics.length === 0 ? (
                  <div className="mt-2 text-sm text-slate-600">Aucune métrique trouvée.</div>
                ) : (
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {metrics.map((m) => (
                      <MetricPill key={m.label} label={m.label} value={m.value} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
