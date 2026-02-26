import { useMemo } from "react";
import type { NotebookPedagogicalValidationCheckpoint } from "@/data/mockData";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

const CATEGORY_ORDER = [
  "data",
  "preprocessing",
  "split",
  "modeling",
  "evaluation",
] as const;

type Category = (typeof CATEGORY_ORDER)[number];

const CATEGORY_LABEL: Record<Category, string> = {
  data: "Données",
  preprocessing: "Préprocessing",
  split: "Split & validation",
  modeling: "Modélisation",
  evaluation: "Évaluation & cohérence",
};

function getStatusMeta(status: NotebookPedagogicalValidationCheckpoint["status"]) {
  if (status === "success") {
    return {
      icon: (
        <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
      ),
      containerClassName: "border-emerald-200 bg-emerald-50",
    };
  }
  if (status === "warning") {
    return {
      icon: (
        <AlertTriangle className="h-4 w-4 text-amber-600" aria-hidden="true" />
      ),
      containerClassName: "border-amber-200 bg-amber-50",
    };
  }
  return {
    icon: <XCircle className="h-4 w-4 text-red-600" aria-hidden="true" />,
    containerClassName: "border-red-200 bg-red-50",
  };
}

function formatPercent01(value: number) {
  const v = Math.max(0, Math.min(1, value));
  return `${Math.round(v * 100)}%`;
}

function CheckpointRow({
  checkpoint,
  checked,
  onToggle,
}: {
  checkpoint: NotebookPedagogicalValidationCheckpoint;
  checked: boolean;
  onToggle: () => void;
}) {
  const meta = getStatusMeta(checkpoint.status);

  return (
    <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 cursor-pointer">
      <input
        type="checkbox"
        className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-200"
        checked={checked}
        onChange={onToggle}
      />
      <div className="mt-0.5">{meta.icon}</div>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-slate-900">
          {checkpoint.title}
        </div>
        <div className="mt-1 text-xs text-slate-600">{checkpoint.description}</div>
      </div>
    </label>
  );
}

export type PedagogicalCheckpointsPanelProps = {
  checkpoints: NotebookPedagogicalValidationCheckpoint[];
  checkedIds: string[];
  onToggleId: (id: string) => void;
};

export function PedagogicalCheckpointsPanel({
  checkpoints,
  checkedIds,
  onToggleId,
}: PedagogicalCheckpointsPanelProps) {
  const checkedSet = useMemo(() => new Set(checkedIds), [checkedIds]);

  const grouped = useMemo(() => {
    const out: Record<Category, NotebookPedagogicalValidationCheckpoint[]> = {
      data: [],
      preprocessing: [],
      split: [],
      modeling: [],
      evaluation: [],
    };
    for (const cp of checkpoints) {
      out[cp.category as Category]?.push(cp);
    }
    return out;
  }, [checkpoints]);

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5">
      <div className="text-sm font-semibold text-slate-900">Checkpoints à valider</div>

      <div className="mt-4 grid gap-5">
        {checkpoints.length > 0 ? (
          CATEGORY_ORDER.map((category) => {
            const sectionCheckpoints = grouped[category];
            const sectionTotal = sectionCheckpoints.length;
            const sectionValidated = sectionCheckpoints.filter((cp) =>
              checkedSet.has(cp.id),
            ).length;

            return (
              <section
                key={category}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-900">
                      {CATEGORY_LABEL[category]}
                    </div>
                    <div className="mt-1 text-xs text-slate-600">
                      {sectionTotal > 0
                        ? `${sectionValidated}/${sectionTotal} validés`
                        : "Aucun checkpoint dans cette section"}
                    </div>
                  </div>

                  {sectionTotal > 0 ? (
                    <div className="shrink-0 text-xs font-semibold text-emerald-700">
                      {formatPercent01(
                        sectionTotal > 0 ? sectionValidated / sectionTotal : 0,
                      )}
                    </div>
                  ) : null}
                </div>

                {sectionTotal > 0 ? (
                  <div className="mt-3 grid gap-3">
                    {sectionCheckpoints.map((cp) => (
                      <CheckpointRow
                        key={cp.id}
                        checkpoint={cp}
                        checked={checkedSet.has(cp.id)}
                        onToggle={() => onToggleId(cp.id)}
                      />
                    ))}
                  </div>
                ) : null}
              </section>
            );
          })
        ) : (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            Aucun checkpoint n’est défini pour ce notebook.
          </div>
        )}
      </div>
    </div>
  );
}
