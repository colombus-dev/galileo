import type { NotebookData } from "@/data/mockData";
import { buildNotebookContextViewModel } from "@/utils/notebookContext";
import { ArrowRight, Info } from "lucide-react";

export type NotebookContextProblemProps = {
  notebook: NotebookData;
  className?: string;
};

function Pill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
      {label}
    </span>
  );
}

function KeyValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div>
      <div className="text-base font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function getBalanceBadgeTokens(balanceLabel?: string) {
  const label = (balanceLabel ?? "").toLowerCase();
  if (label.includes("dés") || label.includes("imbal")) {
    return {
      text: balanceLabel,
      className: "border-amber-200 bg-amber-50 text-amber-700",
    };
  }
  if (label.includes("équ") || label.includes("bal")) {
    return {
      text: balanceLabel,
      className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    };
  }
  return {
    text: balanceLabel,
    className: "border-slate-200 bg-slate-50 text-slate-700",
  };
}

export function NotebookContextProblem({ notebook, className }: NotebookContextProblemProps) {
  const vm = buildNotebookContextViewModel(notebook);
  const balanceBadge = vm.data.classBalanceLabel
    ? getBalanceBadgeTokens(vm.data.classBalanceLabel)
    : null;

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
          <h2 className="text-lg font-semibold text-slate-900">Contexte &amp; Problématique</h2>
          <p className="mt-1 text-sm text-slate-600">
            Informations essentielles pour comprendre le notebook
          </p>
        </div>
      </header>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {/* Problème */}
        <div className="rounded-2xl border border-indigo-200 bg-white p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-indigo-700">Problème</div>

          <div className="mt-4 grid gap-4">
            <div>
              <div className="text-sm text-slate-600">Type de tâche</div>
              <div className="mt-1 text-base font-semibold text-slate-900">{vm.problem.taskTypeLabel}</div>
            </div>

            <div>
              <div className="text-sm text-slate-600">Domaine</div>
              <div className="mt-1 text-sm font-medium text-slate-900">{vm.problem.domainLabel}</div>
            </div>

            <div>
              <div className="text-sm text-slate-600">Description</div>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">{vm.problem.description}</p>
            </div>
          </div>
        </div>

        {/* Données */}
        <div className="rounded-2xl border border-indigo-200 bg-white p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-indigo-700">Données (Entrée → Sortie)</div>

          <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            <div className="rounded-2xl bg-indigo-50 p-4">
              <div className="flex items-baseline justify-between gap-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{vm.data.inputLabel}</div>
              </div>
              <div className="mt-2 text-sm font-medium text-slate-900">{vm.data.inputDetail}</div>
            </div>

            <div className="flex items-center justify-center text-slate-400">
              <ArrowRight className="h-5 w-5" />
            </div>

            <div className="rounded-2xl bg-purple-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{vm.data.outputLabel}</div>
                {balanceBadge ? (
                  <span
                    className={[
                      "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
                      balanceBadge.className,
                    ].join(" ")}
                  >
                    {balanceBadge.text}
                  </span>
                ) : null}
              </div>
              <div className="mt-2 text-sm font-medium text-slate-900">{vm.data.outputDetail}</div>
              {vm.data.classBalanceHint ? (
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{vm.data.classBalanceHint}</p>
              ) : null}
            </div>
          </div>
        </div>

        {/* Méthodologie */}
        <div className="rounded-2xl border border-indigo-200 bg-white p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-indigo-700">Méthodologie</div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <KeyValue label="Algorithme" value={vm.methodology.algorithmLabel} />
            <KeyValue label="Split Train/Test" value={vm.methodology.trainTestSplitLabel} />
            <KeyValue label="Validation" value={vm.methodology.validationLabel} />
            <KeyValue label="Évalué sur" value={vm.methodology.evaluatedOnLabel} />
          </div>
        </div>

        {/* Librairies */}
        <div className="rounded-2xl border border-indigo-200 bg-white p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-indigo-700">Librairies ML</div>

          <div className="mt-4 flex flex-wrap gap-2">
            {vm.libraries.length > 0 ? (
              vm.libraries.map((lib) => <Pill key={lib} label={lib} />)
            ) : (
              <div className="text-sm text-slate-600">Aucune librairie détectée.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
