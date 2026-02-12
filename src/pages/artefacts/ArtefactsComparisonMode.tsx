import { ScrollButtons } from "@/components/ScrollButtons";
import { NotebookContextDataComparison } from "@/components/artefacts/NotebookContextDataComparison.tsx";
import { NotebookArtefactsComparison } from "@/components/artefacts/NotebookArtefactsComparison";
import { NotebookPerformanceComparison } from "@/components/artefacts/NotebookPerformanceComparison";
import type { NotebookData } from "@/data/mockData";
import { Info } from "lucide-react";

export type ArtefactsComparisonModeProps = {
  notebooks: NotebookData[];
  scrollToTop: () => void;
  scrollToBottom: () => void;
};

export function ArtefactsComparisonMode({
  notebooks,
  scrollToTop,
  scrollToBottom,
}: ArtefactsComparisonModeProps) {
  const visibleNotebooks = notebooks.slice(0, 3);

  return (
    <section className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-6">
      <header className="flex items-start gap-3">
        <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
          <Info className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-slate-900">
            Comparaison des notebooks
          </h2>
        </div>
      </header>
      <div>
        <ScrollButtons
          onScrollTop={scrollToTop}
          onScrollBottom={scrollToBottom}
        />

        <div id="section-compare-context-data" className="mb-6 scroll-mt-40">
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
                <div className="mt-4">
                  <NotebookContextDataComparison notebooks={visibleNotebooks} />
                </div>
              </div>

              <div
                id="section-compare-performance"
                className="mt-6 mb-6 scroll-mt-40"
              >
                <div className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
                  Performance &amp; Évaluation
                </div>
                <div className="mt-4">
                  <NotebookPerformanceComparison notebooks={visibleNotebooks} />
                </div>
              </div>

              <div id="section-compare-artefacts" className="mt-6 mb-6 scroll-mt-40">
                <div className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
                  Artefacts
                </div>
                <div className="mt-4">
                  <NotebookArtefactsComparison notebooks={visibleNotebooks} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
