import type { NotebookData } from "@/data/mockData";
import { buildNotebookContextViewModel } from "@/utils/notebookContext";
import { Info } from "lucide-react";

export type NotebookContextDataComparisonProps = {
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

export function NotebookContextDataComparison({
  notebooks,
  className,
}: NotebookContextDataComparisonProps) {
  const visibleNotebooks = notebooks.slice(0, 3);
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
      label: "Entrée",
      values: vms.map((vm) => vm.data.inputDetail || "—"),
    },
    {
      label: "Sortie",
      values: vms.map((vm) => vm.data.outputDetail || "—"),
    },
    {
      label: "Équilibrage",
      values: vms.map((vm) => vm.data.classBalanceLabel || "—"),
    },
  ];

  const diffCount = rows.filter((r) => isRowDifferent(r.values)).length;

  return (
    <section
      className={[
        "rounded-2xl border border-indigo-200 bg-indigo-50/50 p-6",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <header className="flex items-start gap-3">
        <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
          <Info className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-slate-900">
            Comparaison des notebooks
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Contexte &amp; Données — {diffCount} différence{diffCount > 1 ? "s" : ""}
            détectée{diffCount > 1 ? "s" : ""}
          </p>
        </div>
      </header>

      {visibleNotebooks.length < 2 ? (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 text-slate-700">
          Sélectionne au moins 2 notebooks pour activer la comparaison.
        </div>
      ) : (
        <>
          <div className="mt-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
              Contexte &amp; Données
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              {visibleNotebooks.map((n, idx) => (
                <div
                  key={n.id}
                  className="rounded-2xl border border-indigo-200 bg-white p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <NotebookBadge index={idx + 1} />
                        <div className="truncate text-sm font-semibold text-slate-900">
                          {n.student}
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-slate-600 line-clamp-2">
                        {n.title}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Type de tâche
                      </div>
                      <div className="mt-1 text-sm font-medium text-slate-900">
                        {vms[idx]?.problem.taskTypeLabel ?? "—"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Domaine
                      </div>
                      <div className="mt-1 text-sm font-medium text-slate-900">
                        {vms[idx]?.problem.domainLabel ?? "—"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Entrée
                      </div>
                      <div className="mt-1 text-sm font-medium text-slate-900">
                        {vms[idx]?.data.inputDetail ?? "—"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Sortie
                      </div>
                      <div className="mt-1 text-sm font-medium text-slate-900">
                        {vms[idx]?.data.outputDetail ?? "—"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
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
                      <tr
                        key={row.label}
                        className={differs ? "bg-amber-50" : undefined}
                      >
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
        </>
      )}
    </section>
  );
}
