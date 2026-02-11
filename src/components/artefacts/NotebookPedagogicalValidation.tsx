import { useEffect, useMemo, useState } from "react";
import type { NotebookData } from "@/data/mockData";
import { buildPedagogicalCheckpoints } from "@/utils/notebookPedagogicalValidation";
import { PedagogicalCheckpointsPanel } from "@/components/artefacts/PedagogicalCheckpointsPanel";
import {
  CheckCircle2,
  MessageSquareText,
  Save,
  User,
} from "lucide-react";

export type NotebookPedagogicalValidationProps = {
  notebook: NotebookData;
  className?: string;
  onSave?: (payload: {
    checkedCheckpointIds: string[];
    comment: string;
  }) => void;
};

function formatPercent01(value: number) {
  const v = Math.max(0, Math.min(1, value));
  return `${Math.round(v * 100)}%`;
}

export function NotebookPedagogicalValidation({
  notebook,
  className,
  onSave,
}: NotebookPedagogicalValidationProps) {
  const validation = notebook.pedagogicalValidation;
  const checkpoints = useMemo(() => {
    const provided = validation?.checkpoints ?? [];
    return provided.length > 0 ? provided : buildPedagogicalCheckpoints(notebook);
  }, [notebook, validation?.checkpoints]);

  const [checkedIds, setCheckedIds] = useState<string[]>(
    validation?.initialCheckedCheckpointIds ?? [],
  );
  const [comment, setComment] = useState<string>(
    validation?.initialComment ?? "",
  );

  useEffect(() => {
    setCheckedIds(validation?.initialCheckedCheckpointIds ?? []);
    setComment(validation?.initialComment ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notebook.id]);

  const checkedSet = useMemo(() => new Set(checkedIds), [checkedIds]);
  const validatedCount = useMemo(
    () => checkpoints.filter((cp) => checkedSet.has(cp.id)).length,
    [checkpoints, checkedSet],
  );
  const total = checkpoints.length;
  const progress = total > 0 ? validatedCount / total : 0;

  const canSave =
    total > 0 && (checkedIds.length > 0 || comment.trim().length > 0);
  const commentBadge = comment.trim().length > 0 ? "1" : "—";

  return (
    <section
      className={[
        "rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-slate-900">
              Validation Pédagogique
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Vérifiez les bonnes pratiques et laissez vos commentaires
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-lg font-semibold text-emerald-700">
            {validatedCount}/{total}
          </div>
          <div className="text-xs text-slate-500">Checkpoints validés</div>
        </div>
      </header>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span>Progression de la validation</span>
          <span className="font-semibold text-emerald-700">
            {formatPercent01(progress)}
          </span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
          <div
            className="h-2 rounded-full bg-emerald-500"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {/* Left: checkpoints */}
        <PedagogicalCheckpointsPanel
          checkpoints={checkpoints}
          checkedIds={checkedIds}
          onToggleId={(id) => {
            setCheckedIds((prev) =>
              prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
            );
          }}
        />

        <div className="rounded-2xl border border-emerald-200 bg-white p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <MessageSquareText
              className="h-4 w-4 text-emerald-600"
              aria-hidden="true"
            />
            Commentaires &amp; Feedback
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center text-sm font-semibold text-slate-900">
              {" "}
              <User className="h-4 w-4" aria-hidden="true" />
              {notebook.student}
            </div>
            <div className="mt-1 text-xs text-slate-600">{notebook.title}</div>
          </div>

          <div className="mt-4">
            <div className="text-xs font-semibold text-slate-700">
              Vos commentaires et recommandations
            </div>
            <textarea
              className="mt-2 min-h-[220px] w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              placeholder={
                "Laissez vos commentaires ici :\n\n• Points forts du notebook...\n• Points à améliorer...\n• Recommandations méthodologiques...\n• Suggestions de lectures ou techniques..."
              }
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="mt-2 text-xs text-slate-500">
              {comment.length} caractères
            </div>
          </div>

          <button
            type="button"
            disabled={!canSave}
            onClick={() => {
              onSave?.({ checkedCheckpointIds: checkedIds, comment });
            }}
            className={[
              "mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition",
              canSave
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-slate-200 text-slate-500 cursor-not-allowed",
            ].join(" ")}
          >
            <Save className="h-4 w-4" aria-hidden="true" />
            Sauvegarder la validation
          </button>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
              <div className="text-lg font-semibold text-slate-900">
                {validatedCount}/{total}
              </div>
              <div className="mt-1 text-xs text-slate-600">Checkpoints</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
              <div className="text-lg font-semibold text-slate-900">
                {commentBadge}
              </div>
              <div className="mt-1 text-xs text-slate-600">Commentaires</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
