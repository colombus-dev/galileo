import type { NotebookData } from "@/data/mockData";
import { buildNotebookContextViewModel } from "@/utils/notebookContext";
import { NotebookBadge } from "@/components/artefacts/NotebookBadge";
import { getVisibleNotebooks } from "@/utils/notebookComparison";
import { getPrimaryMetricArtifact } from "@/utils/notebookPerformanceEvaluation";

export type NotebookComparisonDetailsTableProps = {
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

function extractInputSize(notebook: NotebookData): string {
  const dataset = notebook.artifacts.find((a) => a.type === "dataset");
  const samples = dataset?.metadata?.samples;
  const features = dataset?.metadata?.features;
  if (typeof samples === "number" && typeof features === "number") {
    return `${samples} × ${features}`;
  }
  return "—";
}

function extractOutputSize(notebook: NotebookData): string {
  const dataset = notebook.artifacts.find((a) => a.type === "dataset");
  const classCount = dataset?.metadata?.classCount ?? dataset?.metadata?.classes;
  if (typeof classCount === "number") {
    return `${classCount} classe${classCount > 1 ? "s" : ""}`;
  }
  return "—";
}

function extractPrimaryMetricName(notebook: NotebookData): string {
  const metric = getPrimaryMetricArtifact(notebook);
  if (!metric) return "—";
  return metric.metadata?.metric ?? metric.name ?? "—";
}

function extractPrimaryMetricValue(notebook: NotebookData): string {
  const metric = getPrimaryMetricArtifact(notebook);
  const v = metric?.metadata?.value;
  if (typeof v !== "number") return "—";

  if (v >= 0 && v <= 1) return `${(v * 100).toFixed(1)}%`;
  if (Number.isInteger(v)) return String(v);
  return v.toFixed(2);
}

function extractExecutionTime(notebook: NotebookData): string {
  const seconds = notebook.context?.codeQuality?.executionTimeSeconds;
  if (typeof seconds !== "number") return "—";
  if (Number.isInteger(seconds)) return `${seconds}s`;
  return `${seconds.toFixed(1)}s`;
}

function extractMetricsList(notebook: NotebookData): string {
  const metrics = notebook.artifacts.filter((a) => a.type === "metric");
  if (metrics.length === 0) return "—";
  const names = metrics
    .map((m) => m.metadata?.metric ?? m.name)
    .filter(Boolean)
    .map((x) => x.trim())
    .filter(Boolean);
  if (names.length === 0) return "—";
  const seen = new Set<string>();
  const deduped: string[] = [];
  for (const n of names) {
    const key = n.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(n);
  }
  return deduped.join(", ");
}

function extractVisualizationsCount(notebook: NotebookData): string {
  const count = notebook.artifacts.filter((a) => a.type === "visualization").length;
  return String(count);
}

function extractCheckpointsSummary(notebook: NotebookData): string {
  const cps = notebook.pedagogicalValidation?.checkpoints;
  if (!cps || cps.length === 0) return "—";
  const success = cps.filter((c) => c.status === "success").length;
  return `${success}/${cps.length} réussis`;
}

function extractNormalization(notebook: NotebookData): string {
  const cps = notebook.pedagogicalValidation?.checkpoints;
  if (!cps || cps.length === 0) return "—";
  const norm = cps.find((c) => c.title.toLowerCase().includes("normalis"));
  if (!norm) return "—";
  return norm.status === "success" ? "✓ Oui" : "⚠︎ Non";
}

export function NotebookComparisonDetailsTable({
  notebooks,
  className,
}: NotebookComparisonDetailsTableProps) {
  const visibleNotebooks = getVisibleNotebooks(notebooks);
  const vms = visibleNotebooks.map((n) => buildNotebookContextViewModel(n));

  const rows: ComparisonRow[] = [
    {
      label: "Performance (score)",
      values: visibleNotebooks.map(extractPrimaryMetricValue),
    },
    {
      label: "Métrique (score)",
      values: visibleNotebooks.map(extractPrimaryMetricName),
    },
    {
      label: "Temps d'exécution",
      values: visibleNotebooks.map(extractExecutionTime),
    },
    {
      label: "Métriques disponibles",
      values: visibleNotebooks.map(extractMetricsList),
    },
    {
      label: "Type de tâche",
      values: vms.map((vm) => vm.problem.taskTypeLabel || "—"),
    },
    {
      label: "Domaine",
      values: vms.map((vm) => vm.problem.domainLabel || "—"),
    },
    {
      label: "Taille Entrée (samples × features)",
      values: visibleNotebooks.map(extractInputSize),
    },
    {
      label: "Taille Sortie",
      values: visibleNotebooks.map(extractOutputSize),
    },
    {
      label: "Librairies ML",
      values: vms.map((vm) => (vm.libraries.length ? vm.libraries.join(", ") : "—")),
    },
    {
      label: "Algorithme",
      values: vms.map((vm) => vm.methodology.algorithmLabel || "—"),
    },
    {
      label: "Train/Test Split",
      values: vms.map((vm) => vm.methodology.trainTestSplitLabel || "—"),
    },
    {
      label: "Validation",
      values: vms.map((vm) => vm.methodology.validationLabel || "—"),
    },
    {
      label: "Évalué sur",
      values: vms.map((vm) => vm.methodology.evaluatedOnLabel || "—"),
    },
    {
      label: "Normalisation",
      values: visibleNotebooks.map(extractNormalization),
    },
    {
      label: "Équilibrage des classes",
      values: vms.map((vm) => vm.data.classBalanceLabel || "—"),
    },
    {
      label: "Checkpoints",
      values: visibleNotebooks.map(extractCheckpointsSummary),
    },
    {
      label: "Visualisations",
      values: visibleNotebooks.map(extractVisualizationsCount),
    },
  ];

  return (
    <div className={["rounded-2xl border border-slate-200 bg-white p-5", className]
      .filter(Boolean)
      .join(" ")}
    >
      <div className="text-sm font-semibold text-slate-900">
        Tableau détaillé des différences
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="sticky left-0 bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 border-b border-slate-200">
                Critère
              </th>
              {visibleNotebooks.map((n, idx) => (
                <th
                  key={n.id}
                  className="bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 border-b border-slate-200"
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
            {rows.map((row, idx) => {
              const differs = isRowDifferent(row.values);
              const zebra = idx % 2 === 0 ? "bg-white" : "bg-slate-100";
              const rowBg = differs ? "bg-amber-100" : zebra;
              return (
                <tr key={row.label} className={rowBg}>
                  <td className="sticky left-0 bg-inherit px-4 py-3 text-sm font-medium text-slate-900 border-b border-slate-200">
                    {row.label}
                  </td>
                  {row.values.map((v, i) => (
                    <td
                      key={i}
                      className="px-4 py-3 text-sm text-slate-900 border-b border-slate-200"
                    >
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
