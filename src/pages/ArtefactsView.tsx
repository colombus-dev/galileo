import { useEffect, useMemo, useState } from "react";
import { ArtefactPipeline } from "@/components/artefacts/ArtefactPipeline";
import {
  ArtefactFilterMenu,
  type ArtefactFilterKey,
} from "@/components/artefacts/ArtefactFilterMenu";
import { NotebookSelectorDropdown } from "@/components/NotebookSelectorDropdown";
import type { NotebookData } from "@/data/mockData";
import { getNotebookById } from "@/services/notebook";
import { NavBar } from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import { NotebookContextProblem } from "@/components/artefacts/NotebookContextProblem";
import { NotebookPerformanceEvaluation } from "@/components/artefacts/NotebookPerformanceEvaluation";
import { NotebookPedagogicalValidation } from "@/components/artefacts/NotebookPedagogicalValidation";
import Select, { type Option } from "@/components/Select";
import { ScrollButtons } from "@/components/ScrollButtons";

function matchesFilter(type: string, filter: ArtefactFilterKey) {
  if (filter === "all") return true;
  if (filter === "data") return type === "dataset";
  if (filter === "viz") return type === "visualization";
  return type === filter;
}

export default function ArtefactsView() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const selectedId = selectedIds[0];
  const [query, setQuery] = useState("");
  const [filterKey, setFilterKey] = useState<ArtefactFilterKey>("all");

  const [notebook, setNotebook] = useState<NotebookData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredArtifacts = useMemo(() => {
    if (!notebook) return [];
    const q = query.trim().toLowerCase();
    return notebook.artifacts.filter((a) => {
      const okFilter = matchesFilter(a.type, filterKey);
      const okQuery =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        (a.className?.toLowerCase().includes(q) ?? false);
      return okFilter && okQuery;
    });
  }, [notebook, query, filterKey]);

  const sectionOptions = useMemo<Option[]>(
    () => [
      { label: "Contexte & problème", value: "section-context" },
      { label: "Évaluation performance", value: "section-performance" },
      { label: "Artefacts", value: "section-artefacts" },
      { label: "Validation pédagogique", value: "section-pedagogical" },
    ],
    [],
  );

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    const scrollElement = document.scrollingElement ?? document.documentElement;
    window.scrollTo({ top: scrollElement.scrollHeight, behavior: "smooth" });
  };

  useEffect(() => {
    if (!selectedId) {
      setNotebook(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getNotebookById(selectedId);
        if (cancelled) return;
        setNotebook(data);
        if (!data) {
          setError("Notebook introuvable");
        }
      } catch (e) {
        if (cancelled) return;
        setError(
          e instanceof Error
            ? e.message
            : "Erreur lors du chargement du notebook",
        );
        setNotebook(null);
      } finally {
        if (cancelled) return;
        setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [selectedId]);

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <NavBar
          logoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwt1HL9fRcwfyF4lzGkCREKMmUv7OVyYGftYlNCNxNuENKpOCJZNxywAsv3fYra7N7uUP1&s=10"
          title="Galileo - Artefacts"
        >
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            <a href="/storytelling">Storytelling</a>
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            <a href="/artefact">Artefact</a>
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            <a href="/patterns">Patterns</a>
          </button>
        </NavBar>
        <div className="p-4 flex flex-row items-center justify-around gap-4 bg-white border-b shadow-sm">
          <div className="w-64">
            <NotebookSelectorDropdown
              multiple={false}
              label="Choisir un notebook"
              onChange={setSelectedIds}
            />
          </div>
          {selectedId && notebook ? (
            <div className="w-64">
              <Select
                options={sectionOptions}
                placeholder="Aller à une section"
                onSelect={(option) => scrollToSection(String(option.value))}
                className="max-w-[260px]"
              />
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col gap-2 p-6 mb-4">
        <div className="mt-8">
          {!selectedId ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-700">
              Sélectionne un notebook pour afficher ses artefacts.
            </div>
          ) : isLoading ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-700">
              Chargement…
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800">
              {error}
            </div>
          ) : notebook ? (
            <div>
              <ScrollButtons
                onScrollTop={scrollToTop}
                onScrollBottom={scrollToBottom}
              />
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
                    <h2 className="text-lg font-semibold text-slate-900">
                      Artefacts
                    </h2>
                    <div className="text-sm text-slate-600 mt-1">
                      {notebook.student} - {notebook.title}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <SearchBar
                      onSearch={setQuery}
                      placeholder="Rechercher des artefacts..."
                    />
                    <ArtefactFilterMenu
                      value={filterKey}
                      onChange={setFilterKey}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <ArtefactPipeline
                    artifacts={filteredArtifacts}
                    cells={notebook.cells}
                  />
                </div>
              </div>
              <div id="section-pedagogical" className="mb-6 scroll-mt-40">
                <NotebookPedagogicalValidation notebook={notebook} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
