import type { NotebookData } from "@/data/mockData";
import { Info } from "lucide-react";
import { NotebookComparisonDetailsTable } from "@/components/artefacts/NotebookComparisonDetailsTable.tsx";
import { NotebookContextDataCard } from "@/components/artefacts/NotebookContextDataCard.tsx";

export type NotebookContextDataComparisonProps = {
  notebooks: NotebookData[];
  className?: string;
};

export function NotebookContextDataComparison({
  notebooks,
  className,
}: NotebookContextDataComparisonProps) {
  const visibleNotebooks = notebooks.slice(0, 3);
  const cardsGridCols =
    visibleNotebooks.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";

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
            Contexte &amp; Données
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

            <div className={`mt-4 grid gap-4 ${cardsGridCols}`}>
              {visibleNotebooks.map((n, idx) => (
                <NotebookContextDataCard
                  key={n.id}
                  notebook={n}
                  index={idx + 1}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
            <NotebookComparisonDetailsTable notebooks={visibleNotebooks} className="border-0 p-0" />
          </div>
        </>
      )}
    </section>
  );
}
