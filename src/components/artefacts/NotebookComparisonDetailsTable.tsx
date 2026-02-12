import type { NotebookData } from "@/data/mockData";
import { buildNotebookContextViewModel } from "@/utils/notebookContext";
import { NotebookBadge } from "@/components/artefacts/NotebookBadge";
import { getVisibleNotebooks } from "@/utils/notebookComparison";

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

function extractAccuracy(notebook: NotebookData): string {
  const acc = notebook.artifacts.find(
    (a) => a.type === "metric" && a.metadata?.metric === "accuracy",
  );
  const v = acc?.metadata?.value;
  if (typeof v === "number") {
    return `${(v * 100).toFixed(1)}%`;
  }
  return "—";
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
    {
      label: "Performance finale",
      values: visibleNotebooks.map(extractAccuracy),
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
              <th className="sticky left-0 bg-white px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Critère
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
