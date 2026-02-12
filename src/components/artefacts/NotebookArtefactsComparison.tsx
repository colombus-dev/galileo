import { useMemo, useState } from "react";
import type { Artifact, NotebookData } from "@/data/mockData";
import { ArtefactItem } from "@/components/artefacts/ArtefactItem";
import {
  Activity,
  BarChart3,
  Brain,
  ChevronDown,
  Database,
} from "lucide-react";

export type NotebookArtefactsComparisonProps = {
  notebooks: NotebookData[];
  className?: string;
};

type ArtifactType = Artifact["type"];

const TYPE_META: Record<ArtifactType, { label: string; icon: typeof Database }> = {
  dataset: { label: "Datasets", icon: Database },
  model: { label: "Modèles", icon: Brain },
  visualization: { label: "Visualisations", icon: BarChart3 },
  metric: { label: "Métriques", icon: Activity },
};

function getArtifactsByType(notebook: NotebookData, type: ArtifactType) {
  return notebook.artifacts.filter((a) => a.type === type);
}

function buildArtifactNameIndex(notebooks: NotebookData[], type: ArtifactType) {
  const names = new Set<string>();
  for (const nb of notebooks) {
    for (const a of getArtifactsByType(nb, type)) names.add(a.name);
  }
  return Array.from(names).sort((a, b) => a.localeCompare(b));
}

function findArtifactByName(notebook: NotebookData, type: ArtifactType, name: string) {
  return notebook.artifacts.find((a) => a.type === type && a.name === name) ?? null;
}

function NotebookBadge({ index }: { index: number }) {
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
      {index}
    </span>
  );
}

function MissingArtefact() {
  return (
    <div className="h-full min-h-[260px] rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center">
      <div className="text-sm text-slate-500">Non présent</div>
    </div>
  );
}

export function NotebookArtefactsComparison({
  notebooks,
  className,
}: NotebookArtefactsComparisonProps) {
  const visibleNotebooks = notebooks.slice(0, 3);
  const notebookCols =
    visibleNotebooks.length === 2
      ? "grid-cols-2"
      : visibleNotebooks.length === 3
        ? "grid-cols-3"
        : "grid-cols-1";

  const [openTypes, setOpenTypes] = useState<Record<ArtifactType, boolean>>({
    dataset: true,
    model: false,
    visualization: false,
    metric: false,
  });

  const types: ArtifactType[] = useMemo(
    () => ["dataset", "model", "visualization", "metric"],
    [],
  );

  const unionCounts = useMemo(() => {
    const entries = types.map((t) => [t, buildArtifactNameIndex(visibleNotebooks, t).length] as const);
    return Object.fromEntries(entries) as Record<ArtifactType, number>;
  }, [types, visibleNotebooks]);

  if (visibleNotebooks.length < 2) return null;

  return (
    <section
      className={["rounded-2xl border border-slate-200 bg-white overflow-hidden", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="p-6 border-b border-slate-200">
        <div className="text-lg font-semibold text-slate-900">
          Comparaison des Artefacts
        </div>
        <div className="mt-1 text-sm text-slate-600">
          Artefacts alignés horizontalement par type (format recommandé par l’évaluateur)
        </div>
      </div>

      <div className="grid grid-cols-[220px_1fr] bg-slate-50 border-b border-slate-200">
        <div className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-600">
          Type d’artefact
        </div>
        <div className={`grid ${notebookCols} gap-4 px-6 py-3`}>
          {visibleNotebooks.map((n, idx) => (
            <div key={n.id} className="flex items-center justify-center gap-3">
              <NotebookBadge index={idx + 1} />
              <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-900 truncate">
                  {n.student}
                </div>
                <div className="text-xs text-slate-500">
                  {n.artifacts.length} artefacts
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        {types.map((type) => {
          const meta = TYPE_META[type];
          const Icon = meta.icon;
          const open = openTypes[type];
          const count = unionCounts[type] ?? 0;

          const names = open ? buildArtifactNameIndex(visibleNotebooks, type) : [];

          return (
            <div key={type} className="border-b border-slate-200 last:border-b-0">
              <button
                type="button"
                onClick={() =>
                  setOpenTypes((s) => ({ ...s, [type]: !s[type] }))
                }
                className="w-full grid grid-cols-[220px_1fr] items-center px-6 py-4 hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-slate-700" aria-hidden="true" />
                  <div className="text-sm font-semibold text-slate-900">
                    {meta.label}
                    <span className="ml-2 text-xs font-semibold text-slate-500">
                      ({count})
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <ChevronDown
                    className={["h-5 w-5 text-slate-500 transition-transform", open ? "rotate-180" : ""].join(" ")}
                    aria-hidden="true"
                  />
                </div>
              </button>

              {open ? (
                <div className="px-6 pb-6">
                  {names.length === 0 ? (
                    <div className="text-sm text-slate-600">
                      Aucun artefact de ce type.
                    </div>
                  ) : (
                    <div className="grid gap-6">
                      {names.map((name) => (
                        <div
                          key={name}
                          className="grid grid-cols-[220px_1fr] gap-6"
                        >
                          <div className="pt-3">
                            <div className="text-sm font-medium text-slate-800 flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-indigo-500" />
                              <span className="break-words">{name}</span>
                            </div>
                          </div>
                          <div className={`grid ${notebookCols} gap-6`}>
                            {visibleNotebooks.map((nb) => {
                              const artifact = findArtifactByName(nb, type, name);
                              return (
                                <div key={nb.id} className="min-h-[260px]">
                                  {artifact ? (
                                    <ArtefactItem artifact={artifact} />
                                  ) : (
                                    <MissingArtefact />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
