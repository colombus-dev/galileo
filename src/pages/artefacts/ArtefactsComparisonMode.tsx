import { ScrollButtons } from "@/components/ScrollButtons";
import { NotebookContextDataComparison } from "@/components/artefacts/NotebookContextDataComparison.tsx";
import { NotebookArtefactsComparison } from "@/components/artefacts/NotebookArtefactsComparison";
import { NotebookCodeDiffComparison } from "@/components/artefacts/NotebookCodeDiffComparison";
import { NotebookPerformanceComparison } from "@/components/artefacts/NotebookPerformanceComparison";
import type { NotebookData } from "@/data/mockData";
import { getVisibleNotebooks } from "@/utils/notebookComparison";
import { ChevronDown, Info } from "lucide-react";
import { useState } from "react";

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
  const visibleNotebooks = getVisibleNotebooks(notebooks);
	const [isCodeDiffOpen, setIsCodeDiffOpen] = useState(false);

  return (
    <section className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-8">
      <header className="flex items-start gap-4 mb-8">
        <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white flex-shrink-0">
          <Info className="h-6 w-6" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h2 className="text-xl font-semibold text-slate-900">
            Comparaison des notebooks
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Analyse comparative entre les notebooks sélectionnés
          </p>
        </div>
      </header>
      <div>
        <ScrollButtons
          onScrollTop={scrollToTop}
          onScrollBottom={scrollToBottom}
        />

        <div className="space-y-8">
          {visibleNotebooks.length < 2 ? (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-slate-700 text-center">
              <p className="text-sm">Sélectionne au moins 2 notebooks pour activer la comparaison.</p>
            </div>
          ) : (
            <>
              <section id="section-compare-context-data" className="scroll-mt-40">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-0.5 w-1.5 bg-indigo-600 rounded-full" />
                  <div className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
                    Contexte &amp; Données
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-indigo-100 p-6">
                  <NotebookContextDataComparison notebooks={visibleNotebooks} />
                </div>
              </section>

              <section
                id="section-compare-performance"
                className="scroll-mt-40"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-0.5 w-1.5 bg-indigo-600 rounded-full" />
                  <div className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
                    Performance &amp; Évaluation
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-indigo-100 p-6">
                  <NotebookPerformanceComparison notebooks={visibleNotebooks} />
                </div>
              </section>

              <section
                id="section-compare-artefacts"
                className="scroll-mt-40"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-0.5 w-1.5 bg-indigo-600 rounded-full" />
                  <div className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
                    Artefacts
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-indigo-100 p-6">
                  <NotebookArtefactsComparison notebooks={visibleNotebooks} />
                </div>
              </section>

              <section id="section-compare-code" className="scroll-mt-40">
          <button
            type="button"
            onClick={() => setIsCodeDiffOpen((v) => !v)}
            className="w-full flex items-center justify-between gap-3 rounded-xl border border-indigo-200 bg-white px-6 py-4 hover:bg-indigo-50/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="h-0.5 w-1.5 bg-indigo-600 rounded-full" />
              <div className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
                Code (diff)
              </div>
            </div>
            <ChevronDown
              className={[
                "h-5 w-5 text-indigo-700 transition-transform flex-shrink-0",
                isCodeDiffOpen ? "rotate-180" : "",
              ].join(" ")}
              aria-hidden="true"
            />
          </button>
          {isCodeDiffOpen ? (
            <div className="mt-6 bg-white rounded-xl border border-indigo-100 p-6">
              <NotebookCodeDiffComparison notebooks={visibleNotebooks} />
            </div>
          ) : null}
              </section>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
