import { ArtefactPipeline } from "@/components/artefacts/ArtefactPipeline";
import {
  ArtefactFilterMenu,
  type ArtefactFilterKey,
} from "@/components/artefacts/ArtefactFilterMenu";
import { NotebookContextProblem } from "@/components/artefacts/NotebookContextProblem";
import { NotebookPedagogicalValidation } from "@/components/artefacts/NotebookPedagogicalValidation";
import { NotebookPerformanceEvaluation } from "@/components/artefacts/NotebookPerformanceEvaluation";
import { ScrollButtons } from "@/components/ScrollButtons";
import type { NotebookData } from "@/data/mockData";
import SearchBar from "@/components/SearchBar";

export type ArtefactsSimpleModeProps = {
  notebook: NotebookData;
  filteredArtifacts: NotebookData["artifacts"];
  filterKey: ArtefactFilterKey;
  onChangeFilterKey: (key: ArtefactFilterKey) => void;
  onSearch: (query: string) => void;
  scrollToTop: () => void;
  scrollToBottom: () => void;
	/** Offset (px) for the artefact details popup to avoid fixed headers */
	detailsTopOffsetPx?: number;
};

export function ArtefactsSimpleMode({
  notebook,
  filteredArtifacts,
  filterKey,
  onChangeFilterKey,
  onSearch,
  scrollToTop,
  scrollToBottom,
	detailsTopOffsetPx,
}: ArtefactsSimpleModeProps) {
  return (
    <div>
      <ScrollButtons onScrollTop={scrollToTop} onScrollBottom={scrollToBottom} />

      <div id="section-context" className="mb-6 scroll-mt-40">
        <NotebookContextProblem notebook={notebook} />
      </div>
      <div id="section-performance" className="mb-6 scroll-mt-40">
        <NotebookPerformanceEvaluation notebook={notebook} />
      </div>

      <div
        id="section-artefacts"
        className="rounded-2xl border border-slate-200 bg-white p-6 mb-6 scroll-mt-40"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Artefacts</h2>
            <div className="text-sm text-slate-600 mt-1">
              {notebook.student} - {notebook.title}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <SearchBar
              onSearch={onSearch}
              placeholder="Rechercher des artefacts..."
            />
            <ArtefactFilterMenu value={filterKey} onChange={onChangeFilterKey} />
          </div>
        </div>

        <div className="mt-6">
        <ArtefactPipeline
          artifacts={filteredArtifacts}
          cells={notebook.cells}
          detailsTopOffsetPx={detailsTopOffsetPx}
        />
        </div>
      </div>

      <div id="section-pedagogical" className="mb-6 scroll-mt-40">
        <NotebookPedagogicalValidation notebook={notebook} />
      </div>
    </div>
  );
}
