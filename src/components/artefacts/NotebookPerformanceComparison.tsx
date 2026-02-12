import type { NotebookData } from "@/data/mockData";
import {
  findMetricArtifact,
  getConfusionMatrixArtifact,
  getPrimaryMetricArtifact,
} from "@/utils/notebookPerformanceEvaluation";

export type NotebookPerformanceComparisonProps = {
  notebooks: NotebookData[];
  className?: string;
};

type ComparisonRow = {
  label: string;
  values: string[];
};

function normalizeValue(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

function isRowDifferent(values: string[]) {
  const normalized = values.map(normalizeValue).filter((v) => v !== "—");
  if (normalized.length <= 1) return false;
  return new Set(normalized).size > 1;
}

function NotebookBadge({ index }: { index: number }) {
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
      {index}
    </span>
  );
}

function formatMetricValue(value: number) {
  if (Number.isNaN(value)) return "—";
  if (value >= 0 && value <= 1) return `${(value * 100).toFixed(1)}%`;
  return value.toFixed(3);
}

function extractMetric(notebook: NotebookData, metricLabel: string): string {
  const art = findMetricArtifact(notebook, metricLabel);
  const v = art?.metadata?.value;
  if (typeof v === "number") return formatMetricValue(v);
  return "—";
}

function extractPrimaryMetric(notebook: NotebookData): string {
  const primary = getPrimaryMetricArtifact(notebook);
  const metricName = primary?.metadata?.metric ?? primary?.name;
  const value = primary?.metadata?.value;
  if (!metricName || typeof value !== "number") return "—";
  return `${metricName}: ${formatMetricValue(value)}`;
}

function extractConfusionMatrix(notebook: NotebookData): string {
  return getConfusionMatrixArtifact(notebook) ? "✓ Oui" : "—";
}

export function NotebookPerformanceComparison({
  notebooks,
  className,
}: NotebookPerformanceComparisonProps) {
  const visibleNotebooks = notebooks.slice(0, 3);
  if (visibleNotebooks.length < 2) return null;

  const rows: ComparisonRow[] = [
    {
      label: "Score principal",
      values: visibleNotebooks.map(extractPrimaryMetric),
    },
    {
      label: "Accuracy",
      values: visibleNotebooks.map((n) => extractMetric(n, "accuracy")),
    },
    {
      label: "F1-score",
      values: visibleNotebooks.map((n) => extractMetric(n, "F1-score")),
    },
    {
      label: "F1-macro",
      values: visibleNotebooks.map((n) => extractMetric(n, "F1-macro")),
    },
    {
      label: "Precision",
      values: visibleNotebooks.map((n) => extractMetric(n, "Precision")),
    },
    {
      label: "Recall",
      values: visibleNotebooks.map((n) => extractMetric(n, "Recall")),
    },
    {
      label: "Balanced accuracy",
      values: visibleNotebooks.map((n) => extractMetric(n, "Balanced accuracy")),
    },
    {
      label: "Matrice de confusion",
      values: visibleNotebooks.map(extractConfusionMatrix),
    },
  ];

  return (
    <div
      className={["rounded-2xl border border-slate-200 bg-white p-5", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="text-sm font-semibold text-slate-900">
        Comparaison des performances
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="sticky left-0 bg-white px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Métrique
              </th>
              {visibleNotebooks.map((n, idx) => (
                <th
                  key={n.id}
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  <div className="flex items-center gap-2">
                    <NotebookBadge index={idx + 1} />
                    <span className="truncate">{n.student}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const differs = isRowDifferent(row.values);
              return (
                <tr key={row.label} className={differs ? "bg-amber-50" : undefined}>
                  <td className="sticky left-0 bg-inherit px-4 py-3 text-sm font-medium text-slate-800">
                    {row.label}
                  </td>
                  {row.values.map((v, i) => (
                    <td key={i} className="px-4 py-3 text-sm text-slate-800">
                      {v || "—"}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
