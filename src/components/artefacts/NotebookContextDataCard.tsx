import type { NotebookData } from "@/data/mockData";
import { buildNotebookContextViewModel } from "@/utils/notebookContext";

export type NotebookContextDataCardProps = {
  notebook: NotebookData;
  index: number;
  className?: string;
};

function NotebookBadge({ index }: { index: number }) {
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
      {index}
    </span>
  );
}

export function NotebookContextDataCard({
  notebook,
  index,
  className,
}: NotebookContextDataCardProps) {
  const vm = buildNotebookContextViewModel(notebook);

  return (
    <div
      className={[
        "rounded-2xl border border-indigo-200 bg-white p-5",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <NotebookBadge index={index} />
            <div className="truncate text-sm font-semibold text-slate-900">
              {notebook.student}
            </div>
          </div>
          <div className="mt-2 text-sm text-slate-600 line-clamp-2">
            {notebook.title}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Type de tâche
          </div>
          <div className="mt-1 text-sm font-medium text-slate-900">
            {vm.problem.taskTypeLabel ?? "—"}
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Domaine
          </div>
          <div className="mt-1 text-sm font-medium text-slate-900">
            {vm.problem.domainLabel ?? "—"}
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Entrée
          </div>
          <div className="mt-1 text-sm font-medium text-slate-900">
            {vm.data.inputDetail ?? "—"}
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Sortie
          </div>
          <div className="mt-1 text-sm font-medium text-slate-900">
            {vm.data.outputDetail ?? "—"}
          </div>
        </div>
      </div>
    </div>
  );
}
