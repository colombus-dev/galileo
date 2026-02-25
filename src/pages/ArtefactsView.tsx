import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { type ArtefactFilterKey } from "@/components/artefacts/ArtefactFilterMenu";
import { NotebookSelectorDropdown } from "@/components/NotebookSelectorDropdown";
import type { NotebookData } from "@/data/mockData";
import { getNotebookById } from "@/services/notebook";
import { NavBar } from "@/components/NavBar";
import {
  ModeSwitchButton,
  type ModeType,
} from "@/components/artefacts/ModeSwitchButton";
import { ArtefactsSimpleMode } from "@/pages/artefacts/ArtefactsSimpleMode";
import { ArtefactsComparisonMode } from "@/pages/artefacts/ArtefactsComparisonMode";

function matchesFilter(type: string, filter: ArtefactFilterKey) {
  if (filter === "all") return true;
  if (filter === "data") return type === "dataset";
  if (filter === "viz") return type === "visualization";
  return type === filter;
}

export default function ArtefactsView() {
	const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  const scrollCollapseStateRef = useRef<{
    lastY: number;
    lastDirection: -1 | 0 | 1;
    accumulatorPx: number;
    raf: number;
  }>({
    lastY: 0,
    lastDirection: 0,
    accumulatorPx: 0,
    raf: 0,
  });

  const [mode, setMode] = useState<ModeType>("simple");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const selectedId = selectedIds[0];
  const [query, setQuery] = useState("");
  const [filterKey, setFilterKey] = useState<ArtefactFilterKey>("all");

  const [selectedNotebooks, setSelectedNotebooks] = useState<NotebookData[]>(
    [],
  );
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

  const sectionSteps = useMemo(() => {
    const base = [
      { label: "Contexte & problème", id: "section-context" },
      { label: "Évaluation performance", id: "section-performance" },
      { label: "Artefacts", id: "section-artefacts" },
      { label: "Validation pédagogique", id: "section-pedagogical" },
    ];
    if (mode !== "comparaison") return base;
    return [
      { label: "Contexte & Données", id: "section-compare-context-data" },
      { label: "Performance", id: "section-compare-performance" },
      { label: "Artefacts", id: "section-compare-artefacts" },
      { label: "Code", id: "section-compare-code" },
    ];
  }, [mode]);

  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [scrollProgressPct, setScrollProgressPct] = useState(0);

  const headerRef = useRef<HTMLDivElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (!selectedId) {
      setActiveSectionId(null);
      return;
    }

    const ids = sectionSteps.map((s) => s.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((e): e is HTMLElement => Boolean(e));
    if (elements.length === 0) return;

    // Default to first step when entering the page/mode.
    setActiveSectionId((current) => current ?? sectionSteps[0]?.id ?? null);

    const ratiosById = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const target = entry.target as HTMLElement;
          ratiosById.set(
            target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        }

        let bestId: string | null = null;
        let bestRatio = 0;
        for (const step of sectionSteps) {
          const ratio = ratiosById.get(step.id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = step.id;
          }
        }

        if (bestId) setActiveSectionId(bestId);
      },
      {
        // Compensate sticky header: consider a section active once it passes below the header.
        root: null,
        rootMargin: `-${Math.max(0, headerHeight + 16)}px 0px -60% 0px`,
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [headerHeight, sectionSteps, selectedId]);

  const stepIndex = useMemo(() => {
    if (!activeSectionId) return 0;
    const idx = sectionSteps.findIndex((s) => s.id === activeSectionId);
    return idx >= 0 ? idx : 0;
  }, [activeSectionId, sectionSteps]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const ro = new ResizeObserver(() => {
      setHeaderHeight(header.getBoundingClientRect().height);
    });
    ro.observe(header);
    setHeaderHeight(header.getBoundingClientRect().height);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!selectedId) {
      setScrollProgressPct(0);
      return;
    }

    let raf = 0;
    const compute = () => {
      raf = 0;
      const first = document.getElementById(sectionSteps[0]?.id ?? "");
      const last = document.getElementById(
        sectionSteps[sectionSteps.length - 1]?.id ?? "",
      );
      if (!first || !last) {
        setScrollProgressPct(0);
        return;
      }

      const scrollY = window.scrollY ?? 0;
      const start =
        first.getBoundingClientRect().top +
        scrollY -
        Math.max(0, headerHeight + 24);
      const end =
        last.getBoundingClientRect().bottom +
        scrollY -
        Math.max(0, window.innerHeight - 80);

      const denom = Math.max(1, end - start);
      const pos = scrollY;
      const raw = (pos - start) / denom;
      const clamped = Math.max(0, Math.min(1, raw));
      setScrollProgressPct(clamped * 100);
    };

    const onScrollOrResize = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(compute);
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    compute();
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [headerHeight, sectionSteps, selectedId]);

  useEffect(() => {
    const state = scrollCollapseStateRef.current;
    state.lastY = window.scrollY ?? 0;
    state.lastDirection = 0;
    state.accumulatorPx = 0;

    const compute = () => {
      state.raf = 0;
      const y = window.scrollY ?? 0;
      const delta = y - state.lastY;
      state.lastY = y;

      // Always show navigation near the top of the page.
      if (y <= 16) {
        state.lastDirection = 0;
        state.accumulatorPx = 0;
        setIsNavCollapsed(false);
        return;
      }

      // Ignore tiny scroll noise.
      if (Math.abs(delta) < 2) return;

      const direction: -1 | 1 = delta > 0 ? 1 : -1;
      if (direction !== state.lastDirection) {
        state.lastDirection = direction;
        state.accumulatorPx = 0;
      }
      state.accumulatorPx += Math.abs(delta);

      // Collapse when scrolling down, expand when scrolling up.
      if (direction === 1 && state.accumulatorPx >= 40) {
        setIsNavCollapsed(true);
      }
      if (direction === -1 && state.accumulatorPx >= 20) {
        setIsNavCollapsed(false);
      }
    };

    const onScroll = () => {
      if (state.raf) return;
      state.raf = window.requestAnimationFrame(compute);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Run once to sync initial state.
    compute();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (state.raf) window.cancelAnimationFrame(state.raf);
      state.raf = 0;
    };
  }, []);

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
    const ids =
      mode === "comparaison"
        ? selectedIds.slice(0, 3)
        : selectedIds.slice(0, 1);
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
      <div ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-white">
    {!isNavCollapsed ? (
      <NavBar
        logoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwt1HL9fRcwfyF4lzGkCREKMmUv7OVyYGftYlNCNxNuENKpOCJZNxywAsv3fYra7N7uUP1&s=10"
        title="Galileo - Artefacts"
      >
        <button
          type="button"
          onClick={() => navigate("/storytelling")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Storytelling
        </button>
        <button
          type="button"
          onClick={() => navigate("/artefact")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Artefact
        </button>
        <button
          type="button"
          onClick={() => navigate("/patterns")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Patterns
        </button>
      </NavBar>
    ) : null}
        <div className="p-4 flex flex-row flex-wrap items-center justify-between gap-4 bg-white border-b shadow-sm">
          <div className="w-64">
            <NotebookSelectorDropdown
              multiple={mode === "comparaison"}
              label="Choisir un notebook"
              selected={selectedIds}
              onChange={handleSelectionChange}
            />
          </div>

      <div className="flex items-center gap-3">
        <ModeSwitchButton mode={mode} onChange={setMode} />
        {isNavCollapsed ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/storytelling")}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Storytelling
            </button>
            <button
              type="button"
              onClick={() => navigate("/artefact")}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Artefacts
            </button>
            <button
              type="button"
              onClick={() => navigate("/patterns")}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Patterns
            </button>
          </div>
        ) : null}
      </div>
        </div>
      {selectedId && primaryNotebook ? (
        <div className="border-b bg-white/95">
          <div className={isNavCollapsed ? "px-4 py-2" : "p-4"}>
            <div
              className={[
                "border border-slate-200 bg-white shadow-sm",
                isNavCollapsed
                  ? "rounded-xl px-3 py-2"
                  : "rounded-2xl px-4 py-3",
              ].join(" ")}
            >
              {isNavCollapsed ? (
                <div className="flex items-center gap-2 overflow-x-auto">
                  {sectionSteps.map((step, index) => {
                    const isActive = step.id === activeSectionId;
                    const stepProgress = (scrollProgressPct / 100) * sectionSteps.length;
                    const fill = Math.max(0, Math.min(1, stepProgress - index));
                    const fillPct = Math.round(fill * 100);
                    const isFilled = fillPct > 0;
                    return (
                      <button
                        key={step.id}
                        type="button"
                        onClick={() => scrollToSection(step.id)}
                        className={[
                          "relative overflow-hidden shrink-0 rounded-full px-3 py-1 text-xs font-semibold border bg-white",
                          isActive
                            ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                            : isFilled
                              ? "border-indigo-200 text-indigo-700"
                              : "border-slate-200 text-slate-700 hover:bg-slate-50",
                        ].join(" ")}
                    >
                      {isFilled ? (
                        <span
                          aria-hidden="true"
                          className="absolute inset-y-0 left-0 bg-indigo-100"
                          style={{ width: `${fillPct}%` }}
                        />
                      ) : null}
                      <span className="relative z-10">{step.label}</span>
                    </button>
                    );
                  })}
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Navigation
                      </span>
                      <span className="text-xs font-semibold text-slate-700 truncate">
                        {sectionSteps[stepIndex]?.label ?? ""}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-500 shrink-0">
                      {stepIndex + 1}/{sectionSteps.length}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 overflow-x-auto">
                      {sectionSteps.map((step, index) => {
                      const isActive = step.id === activeSectionId;
                        const stepProgress = (scrollProgressPct / 100) * sectionSteps.length;
                        const fill = Math.max(0, Math.min(1, stepProgress - index));
                        const fillPct = Math.round(fill * 100);
                        const isFilled = fillPct > 0;
                      return (
                        <button
                          key={step.id}
                          type="button"
                          onClick={() => scrollToSection(step.id)}
                          className={[
                              "relative overflow-hidden shrink-0 rounded-full px-3 py-1 text-xs font-semibold border bg-white",
                            isActive
                              ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                                : isFilled
                                  ? "border-indigo-200 text-indigo-700"
                                  : "border-slate-200 text-slate-700 hover:bg-slate-50",
                          ].join(" ")}
                      >
                          {isFilled ? (
                            <span
                              aria-hidden="true"
                              className="absolute inset-y-0 left-0 bg-indigo-100"
                              style={{ width: `${fillPct}%` }}
                            />
                          ) : null}
                          <span className="relative z-10">{step.label}</span>
                      </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
      </div>
		<div
			className="flex flex-col gap-2 p-6 mb-4"
			style={{ paddingTop: headerHeight + 24 }}
		>
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
					detailsTopOffsetPx={headerHeight + 24}
              />
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}
