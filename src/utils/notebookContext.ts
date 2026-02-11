import type { NotebookData } from "@/data/mockData";

export type NotebookProblemSummary = {
  taskTypeLabel: string;
  domainLabel: string;
  description: string;
};

export type NotebookDataSummary = {
  inputLabel: string;
  inputDetail: string;
  outputLabel: string;
  outputDetail: string;
  classBalanceLabel?: string;
  classBalanceHint?: string;
};

export type NotebookMethodologySummary = {
  algorithmLabel: string;
  trainTestSplitLabel: string;
  validationLabel: string;
  evaluatedOnLabel: string;
};

export type NotebookContextViewModel = {
  problem: NotebookProblemSummary;
  data: NotebookDataSummary;
  methodology: NotebookMethodologySummary;
  libraries: string[];
};

function normalizeLibName(raw: string) {
  const s = raw.trim();
  if (!s) return null;
  if (s === "sklearn") return "scikit-learn";
  if (s === "matplotlib") return "matplotlib";
  if (s === "seaborn") return "seaborn";
  if (s === "pandas") return "pandas";
  if (s === "numpy") return "numpy";
  if (s === "plotly") return "plotly";
  return s;
}

function extractLibrariesFromCode(code: string): string[] {
  const libs = new Set<string>();

  const importRe = /^\s*import\s+([a-zA-Z0-9_\.]+)(\s+as\s+[a-zA-Z0-9_]+)?\s*$/gm;
  const fromRe = /^\s*from\s+([a-zA-Z0-9_\.]+)\s+import\s+/gm;

  for (const m of code.matchAll(importRe)) {
    const mod = m[1]?.split(".")[0] ?? "";
    const name = normalizeLibName(mod);
    if (name) libs.add(name);
  }

  for (const m of code.matchAll(fromRe)) {
    const mod = m[1]?.split(".")[0] ?? "";
    const name = normalizeLibName(mod);
    if (name) libs.add(name);
  }

  return [...libs];
}

function parseLibrariesFromNotebookCells(notebook: NotebookData): string[] {
  const libs = new Set<string>();
  for (const cell of notebook.cells) {
    for (const lib of extractLibrariesFromCode(cell.code)) libs.add(lib);
  }
  return [...libs].sort((a, b) => a.localeCompare(b));
}

export function buildNotebookContextViewModel(notebook: NotebookData): NotebookContextViewModel {
  const parsedLibraries = parseLibrariesFromNotebookCells(notebook);

  // Source of truth: notebook.context (données explicites fournies par le notebook/import)
  if (notebook.context) {
    const explicit = notebook.context.libraries ?? [];
    const libSet = new Set(explicit);
    const mergedLibraries = [...explicit];
    for (const lib of parsedLibraries) {
      if (!libSet.has(lib)) mergedLibraries.push(lib);
    }

    return {
      problem: {
        taskTypeLabel: notebook.context.problem.taskTypeLabel,
        domainLabel: notebook.context.problem.domainLabel,
        description: notebook.context.problem.description,
      },
      data: {
        inputLabel: notebook.context.data.inputLabel,
        inputDetail: notebook.context.data.inputDetail,
        outputLabel: notebook.context.data.outputLabel,
        outputDetail: notebook.context.data.outputDetail,
        classBalanceLabel: notebook.context.data.classBalanceLabel,
        classBalanceHint: notebook.context.data.classBalanceHint,
      },
      methodology: {
        algorithmLabel: notebook.context.methodology.algorithmLabel,
        trainTestSplitLabel: notebook.context.methodology.trainTestSplitLabel,
        validationLabel: notebook.context.methodology.validationLabel,
        evaluatedOnLabel: notebook.context.methodology.evaluatedOnLabel,
      },
      libraries: mergedLibraries,
    };
  }

  // Fallback: notebook sans contexte explicite — on évite les heuristiques, on affiche des placeholders.
  return {
    problem: {
      taskTypeLabel: "—",
      domainLabel: "—",
      description: "—",
    },
    data: {
      inputLabel: "Entrée",
      inputDetail: "—",
      outputLabel: "Sortie",
      outputDetail: "—",
    },
    methodology: {
      algorithmLabel: "—",
      trainTestSplitLabel: "—",
      validationLabel: "—",
      evaluatedOnLabel: "—",
    },
    libraries: parsedLibraries,
  };
}
