import { useEffect, useMemo, useState } from "react";
import {
  type ArtefactFilterKey,
} from "@/components/artefacts/ArtefactFilterMenu";
import { NotebookSelectorDropdown } from "@/components/NotebookSelectorDropdown";
import type { NotebookData } from "@/data/mockData";
import { getNotebookById } from "@/services/notebook";
import { NavBar } from "@/components/NavBar";
import Select, { type Option } from "@/components/Select";
import { ModeSwitchButton, type ModeType } from "@/components/artefacts/ModeSwitchButton";
import { ArtefactsSimpleMode } from "@/pages/artefacts/ArtefactsSimpleMode";
import { ArtefactsComparisonMode } from "@/pages/artefacts/ArtefactsComparisonMode";

function matchesFilter(type: string, filter: ArtefactFilterKey) {
  if (filter === "all") return true;
  if (filter === "data") return type === "dataset";
  if (filter === "viz") return type === "visualization";
  return type === filter;
}

export default function ArtefactsView() {
  const [mode, setMode] = useState<ModeType>("simple");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const selectedId = selectedIds[0];
  const [query, setQuery] = useState("");
  const [filterKey, setFilterKey] = useState<ArtefactFilterKey>("all");

  const [selectedNotebooks, setSelectedNotebooks] = useState<NotebookData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const primaryNotebook = selectedNotebooks[0] ?? null;

  const filteredArtifacts = useMemo(() => {
    if (!primaryNotebook) return [];
    const q = query.trim().toLowerCase();
    return primaryNotebook.artifacts.filter((a) => {
      const okFilter = matchesFilter(a.type, filterKey);
      const okQuery =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        (a.className?.toLowerCase().includes(q) ?? false);
      return okFilter && okQuery;
    });
  }, [primaryNotebook, query, filterKey]);

  const sectionOptions = useMemo<Option[]>(() => {
    const base: Option[] = [
      { label: "Contexte & problème", value: "section-context" },
      { label: "Évaluation performance", value: "section-performance" },
      { label: "Artefacts", value: "section-artefacts" },
      { label: "Validation pédagogique", value: "section-pedagogical" },
    ];

    if (mode !== "comparaison") return base;

    return [
      {
        label: "Comparaison — Contexte & Données",
        value: "section-compare-context-data",
      },
      {
        label: "Comparaison — Performance",
        value: "section-compare-performance",
      },
      {
        label: "Comparaison — Artefacts",
        value: "section-compare-artefacts",
      },
      {
        label: "Comparaison — Code",
        value: "section-compare-code",
      },
    ];
  }, [mode]);

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
    if (mode === "simple") {
      setSelectedIds((ids) => (ids.length > 0 ? [ids[0]] : []));
    }
  }, [mode]);

  const handleSelectionChange = (next: string[]) => {
    if (mode === "simple") {
      setSelectedIds(next.length > 0 ? [next[0]] : []);
      return;
    }
    setSelectedIds(next.slice(0, 3));
  };

  useEffect(() => {
    const ids = mode === "comparaison" ? selectedIds.slice(0, 3) : selectedIds.slice(0, 1);
    if (ids.length === 0) {
      setSelectedNotebooks([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const results = await Promise.all(ids.map((id) => getNotebookById(id)));
        if (cancelled) return;
        const missing = results.some((r) => !r);
        const notebooks = results.filter(Boolean) as NotebookData[];
        setSelectedNotebooks(notebooks);
        if (missing) setError("Un ou plusieurs notebooks sont introuvables");
      } catch (e) {
        if (cancelled) return;
        setError(
          e instanceof Error
            ? e.message
            : "Erreur lors du chargement du notebook",
        );
        setSelectedNotebooks([]);
      } finally {
        if (cancelled) return;
        setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [mode, selectedIds]);

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
        <div className="p-4 flex flex-row flex-wrap items-center justify-between gap-4 bg-white border-b shadow-sm">
          <div className="w-64">
            <NotebookSelectorDropdown
              multiple={mode === "comparaison"}
              label="Choisir un notebook"
              selected={selectedIds}
              onChange={handleSelectionChange}
            />
          </div>

          <ModeSwitchButton mode={mode} onChange={setMode} />

          {selectedId && primaryNotebook ? (
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
          ) : primaryNotebook ? (
            mode === "comparaison" ? (
              <ArtefactsComparisonMode
                notebooks={selectedNotebooks}
                scrollToTop={scrollToTop}
                scrollToBottom={scrollToBottom}
              />
            ) : (
              <ArtefactsSimpleMode
                notebook={primaryNotebook}
                filteredArtifacts={filteredArtifacts}
                filterKey={filterKey}
                onChangeFilterKey={setFilterKey}
                onSearch={setQuery}
                scrollToTop={scrollToTop}
                scrollToBottom={scrollToBottom}
              />
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}
