import React, { useCallback, useId, useRef, useState } from "react";
import { MdExpandMore, MdExpandLess, MdDelete, MdCheckCircle, MdRefresh, MdClear } from "react-icons/md";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useNotebookHistory } from "../hooks/useNotebookHistory";

type NotebookJson = Record<string, unknown>;

export interface ParsedDependencies {
  pythonVersion: string;
  dependencies: Array<{ name: string; version: string }>;
  devDependencies: Array<{ name: string; version: string }>;
}

export type NotebookImporterProps = {
  label?: string;
  helperText?: string;
  disabled?: boolean;
  onImport?: (payload: {
    notebookFile: File;
    notebook: NotebookJson;
    pyprojectFile: File | null;
    dependencies: ParsedDependencies | null;
  }) => void;
  onError?: (error: { code: string; message: string }) => void;
  showPreview?: boolean;
  className?: string;
};

function formatBytes(bytes: number) {
  const units = ["B", "KB", "MB", "GB"];
  let v = bytes;
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

function getExt(name: string) {
  const idx = name.lastIndexOf(".");
  return idx >= 0 ? name.slice(idx).toLowerCase() : "";
}

function parsePyprojectToml(content: string): ParsedDependencies | null {
  try {
    const pythonVersion = extractPythonVersion(content);
    const dependencies = extractDependencies(content);
    const devDependencies = extractDevDependencies(content);

    return {
      pythonVersion,
      dependencies,
      devDependencies,
    };
  } catch (error) {
    console.error("Erreur parsing pyproject.toml:", error);
    return null;
  }
}

function extractPythonVersion(content: string): string {
  let match = content.match(/requires-python\s*=\s*"([^"]+)"/);
  if (match) return match[1];
  match = content.match(/python\s*=\s*"([^"]+)"/);
  if (match) return match[1];
  return "3.10";
}

function extractDependencies(
  content: string
): Array<{ name: string; version: string }> {
  const dependencies: Array<{ name: string; version: string }> = [];

  let match = content.match(/^\s*dependencies\s*=\s*\[([\s\S]*?)\]/m);
  if (match) {
    const depLines = match[1].split(/[,\n]/).filter((l) => l.trim());
    depLines.forEach((line) => {
      const depMatch = line.match(/"([^"]+)"/);
      if (depMatch) {
        const depSpec = depMatch[1];
        const [name] = depSpec.split(/[<>=!]/);
        dependencies.push({
          name: name.trim(),
          version: depSpec.trim(),
        });
      }
    });
    return dependencies;
  }

  match = content.match(/^\s*dependencies\s*=\s*{([\s\S]*?)}/m);
  if (match) {
    const depLines = match[1].split(/[,\n]/).filter((l) => l.trim());
    depLines.forEach((line) => {
      const depMatch = line.match(/(\w+)\s*=\s*"([^"]+)"/);
      if (depMatch) {
        const [, name, version] = depMatch;
        dependencies.push({
          name: name.trim(),
          version: version.trim(),
        });
      }
    });
    return dependencies;
  }

  return dependencies;
}

function extractDevDependencies(
  content: string
): Array<{ name: string; version: string }> {
  const devDependencies: Array<{ name: string; version: string }> = [];

  let match = content.match(/optional-dependencies\s*=\s*{[\s\S]*?dev\s*=\s*\[([\s\S]*?)\]/);
  if (match) {
    const depLines = match[1].split(/[,\n]/).filter((l) => l.trim());
    depLines.forEach((line) => {
      const depMatch = line.match(/"([^"]+)"/);
      if (depMatch) {
        const depSpec = depMatch[1];
        const [name] = depSpec.split(/[<>=!]/);
        devDependencies.push({
          name: name.trim(),
          version: depSpec.trim(),
        });
      }
    });
    return devDependencies;
  }

  match = content.match(/\[tool\.poetry\.group\.dev\.dependencies\]([\s\S]*?)(?=\[|$)/);
  if (match) {
    const depLines = match[1].split(/\n/).filter((l) => l.trim());
    depLines.forEach((line) => {
      const depMatch = line.match(/(\w+)\s*=\s*"([^"]+)"/);
      if (depMatch) {
        const [, name, version] = depMatch;
        devDependencies.push({
          name: name.trim(),
          version: version.trim(),
        });
      }
    });
    return devDependencies;
  }

  match = content.match(/\[tool\.poetry\.dev-dependencies\]([\s\S]*?)(?=\[|$)/);
  if (match) {
    const depLines = match[1].split(/\n/).filter((l) => l.trim());
    depLines.forEach((line) => {
      const depMatch = line.match(/(\w+)\s*=\s*"([^"]+)"/);
      if (depMatch) {
        const [, name, version] = depMatch;
        devDependencies.push({
          name: name.trim(),
          version: version.trim(),
        });
      }
    });
    return devDependencies;
  }

  return devDependencies;
}

export const NotebookImporter: React.FC<NotebookImporterProps> = ({
  label = "Importer un notebook",
  helperText = "Glisse-dépose les fichiers ou clique pour parcourir",
  disabled = false,
  onImport,
  onError,
  showPreview = true,
  className,
}) => {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputTomlRef = useRef<HTMLInputElement | null>(null);

  const {
    notebooks,
    currentNotebook,
    isLoaded,
    addNotebook,
    setCurrentFromHistory,
    removeNotebook,
    clearHistory,
    resetCurrent,
  } = useNotebookHistory();

  const [isDragging, setIsDragging] = useState(false);
  const [selectedNotebook, setSelectedNotebook] = useState<File | null>(null);
  const [selectedPyproject, setSelectedPyproject] = useState<File | null>(null);
  const [notebook, setNotebook] = useState<NotebookJson | null>(null);
  const [dependencies, setDependencies] = useState<ParsedDependencies | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [panelExpanded, setPanelExpanded] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [dontAskAgain, setDontAskAgain] = useState(false);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string>("");

  const isReadyToImport = !!selectedNotebook && !!notebook;
  const hasFiles = selectedNotebook || selectedPyproject;

  const emitError = useCallback(
    (code: string, message: string) => {
      setError(message);
      onError?.({ code, message });
    },
    [onError]
  );

  const reset = useCallback(() => {
    setSelectedNotebook(null);
    setSelectedPyproject(null);
    setNotebook(null);
    setDependencies(null);
    setError(null);
    setIsDragging(false);
  }, []);

  const validateNotebookType = useCallback(
    (file: File) => {
      const ext = getExt(file.name);
      if (ext !== ".ipynb") {
        return {
          ok: false as const,
          code: "invalid_type",
          message: `Type de fichier non supporté (${ext || "sans extension"}). Extension requise: .ipynb`,
        };
      }
      return { ok: true as const };
    },
    []
  );

  const loadNotebook = useCallback(
    async (file: File) => {
      const validation = validateNotebookType(file);
      if (!validation.ok) {
        emitError(validation.code, validation.message);
        return;
      }

      try {
        const text = await file.text();
        const parsed = JSON.parse(text) as NotebookJson;
        setSelectedNotebook(file);
        setNotebook(parsed);
        setError(null);
      } catch {
        emitError(
          "parse_error",
          "Impossible de lire le notebook. Vérifie que le fichier est un JSON valide (.ipynb)."
        );
      }
    },
    [emitError, validateNotebookType]
  );

  const loadPyproject = useCallback(
    async (file: File) => {
      if (getExt(file.name) !== ".toml") {
        emitError(
          "invalid_type",
          "Le fichier doit être un fichier TOML (.toml)"
        );
        return;
      }

      try {
        const text = await file.text();
        setSelectedPyproject(file);
        const parsed = parsePyprojectToml(text);
        setDependencies(parsed);
        setError(null);
      } catch {
        emitError(
          "parse_error",
          "Impossible de lire le fichier TOML."
        );
      }
    },
    [emitError]
  );

  const openNotebookDialog = useCallback(() => {
    if (disabled) return;
    inputRef.current?.click();
  }, [disabled]);

  const openPyprojectDialog = useCallback(() => {
    if (disabled) return;
    inputTomlRef.current?.click();
  }, [disabled]);

  const onNotebookChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      void loadNotebook(file);
      e.target.value = "";
    },
    [loadNotebook]
  );

  const onPyprojectChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      void loadPyproject(file);
      e.target.value = "";
    },
    [loadPyproject]
  );

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const onDragEnter = useCallback(() => {
    if (!disabled) setIsDragging(true);
  }, [disabled]);

  const onDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (disabled) return;
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      for (const file of files) {
        const ext = getExt(file.name);
        if (ext === ".ipynb") {
          void loadNotebook(file);
        } else if (ext === ".toml") {
          void loadPyproject(file);
        }
      }
    },
    [disabled, loadNotebook, loadPyproject]
  );

  const onImportClick = useCallback(() => {
    if (!selectedNotebook || !notebook) return;

    const skipConfirmation = localStorage.getItem("skipImportConfirmation") === "true";
    
    if (skipConfirmation) {
      addNotebook(notebook, selectedNotebook.name, dependencies);
      onImport?.({
        notebookFile: selectedNotebook,
        notebook,
        pyprojectFile: selectedPyproject,
        dependencies,
      });
    } else {
      setShowConfirmation(true);
    }
  }, [selectedNotebook, notebook, selectedPyproject, dependencies, onImport, addNotebook]);

  const handleConfirmImport = useCallback(() => {
    if (!selectedNotebook || !notebook) return;

    if (dontAskAgain) {
      localStorage.setItem("skipImportConfirmation", "true");
    }

    setShowConfirmation(false);
    setDontAskAgain(false);

    addNotebook(notebook, selectedNotebook.name, dependencies);
    onImport?.({
      notebookFile: selectedNotebook,
      notebook,
      pyprojectFile: selectedPyproject,
      dependencies,
    });
  }, [notebook, onImport, selectedNotebook, selectedPyproject, dependencies, dontAskAgain, addNotebook]);

  const handleCancelImport = useCallback(() => {
    setShowConfirmation(false);
    setDontAskAgain(false);
  }, []);

  const handleReimportFromHistory = useCallback(
    (notebookId: string) => {
      const found = setCurrentFromHistory(notebookId);
      if (found) {
        onImport?.({
          notebookFile: new File(
            [JSON.stringify(found.notebook)],
            found.name,
            { type: "application/json" }
          ),
          notebook: found.notebook,
          pyprojectFile: null,
          dependencies: found.dependencies || null,
        });
      }
    },
    [setCurrentFromHistory, onImport]
  );

  const handleRemoveFromHistory = useCallback(
    (notebookId: string) => {
      removeNotebook(notebookId);
    },
    [removeNotebook]
  );

  const handleResetCurrent = useCallback(() => {
    resetCurrent();
  }, [resetCurrent]);

  const handleClearHistory = useCallback(() => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer tout l'historique ?")) {
      clearHistory();
      setSelectedHistoryId("");
    }
  }, [clearHistory]);

  return (
    <div className={className}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 lg:p-8 min-h-screen lg:min-h-auto">
        {/* Colonne gauche : Historique & Réimport */}
        {isLoaded && (
          <div className="lg:col-span-1 h-fit">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  📚 Notebooks importés
                </h3>
                {notebooks.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearHistory}
                    className="p-1 text-slate-400 hover:text-slate-600 transition"
                    title="Effacer l'historique"
                  >
                    <MdClear className="text-lg" />
                  </button>
                )}
              </div>

              {notebooks.length === 0 ? (
                <p className="text-xs text-slate-500 italic">Aucun notebook importé</p>
              ) : (
                <div className="space-y-3">
                  {/* Select dropdown */}
                  <div>
                    <select
                      value={selectedHistoryId}
                      onChange={(e) => {
                        setSelectedHistoryId(e.target.value);
                      }}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Sélectionner un notebook</option>
                      {notebooks.map((nb) => (
                        <option key={nb.id} value={nb.id}>
                          {nb.name} ({new Date(nb.timestamp).toLocaleDateString()})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Réimporter button */}
                  <button
                    type="button"
                    disabled={!selectedHistoryId}
                    onClick={() => {
                      if (selectedHistoryId) {
                        handleReimportFromHistory(selectedHistoryId);
                      }
                    }}
                    className="w-full rounded-lg bg-blue-600 text-white px-3 py-2 text-sm font-medium hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 transition flex items-center justify-center gap-2"
                  >
                    <MdRefresh className="text-lg" />
                    Réimporter
                  </button>

                  {/* Current notebook info */}
                  {currentNotebook && (
                    <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 space-y-2">
                      <p className="text-xs font-semibold text-blue-900">
                        ✓ Actuellement sélectionné
                      </p>
                      <p className="text-xs text-blue-800 break-words">{currentNotebook.name}</p>
                      <button
                        type="button"
                        onClick={handleResetCurrent}
                        className="w-full text-xs text-blue-600 hover:text-blue-700 font-medium transition"
                      >
                        Réinitialiser
                      </button>
                    </div>
                  )}

                  {/* Recent notebooks list */}
                  <div className="space-y-2 border-t border-slate-200 pt-3">
                    <p className="text-xs font-medium text-slate-600">Récents</p>
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                      {notebooks.slice(0, 5).map((nb) => (
                        <div
                          key={nb.id}
                          className="flex items-center justify-between gap-2 rounded-lg bg-slate-50 px-2 py-2 hover:bg-slate-100 transition group"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-xs truncate text-slate-700">
                              {nb.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {new Date(nb.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveFromHistory(nb.id)}
                            className="p-1 text-slate-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition"
                            title="Supprimer"
                          >
                            <MdDelete className="text-sm" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Colonnes centrales & droites : Import zone */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Card d'import */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <label htmlFor={inputId} className="mb-4 block text-sm font-medium text-slate-800">
              {label}
            </label>

            {/* Zone DnD */}
            <div
              role="button"
              tabIndex={0}
              aria-disabled={disabled}
              onClick={openNotebookDialog}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") openNotebookDialog();
              }}
              onDragOver={onDragOver}
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              className={[
                "rounded-xl border-2 border-dashed p-8 transition",
                "flex flex-col gap-6",
                disabled
                  ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400"
                  : "cursor-pointer border-slate-300 bg-white hover:bg-slate-50",
                isDragging && !disabled ? "border-blue-500 bg-blue-50" : "",
              ].join(" ")}
            >
              <div className="text-center">
                <p className="text-base text-slate-700">
                  <span className="font-semibold">Glisse-dépose</span> tes fichiers ici{" "}
                  <span className="text-slate-500">ou</span>{" "}
                  <span className="underline underline-offset-2">clique pour parcourir</span>
                </p>
                <p className="mt-2 text-sm text-slate-500">{helperText}</p>
                <p className="mt-2 text-xs text-slate-500">
                  📓 Notebook (.ipynb) + 📝 Configuration (pyproject.toml)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openNotebookDialog();
                  }}
                  disabled={disabled}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 transition"
                >
                  📓 Notebook
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openPyprojectDialog();
                  }}
                  disabled={disabled}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 transition"
                >
                  📝 Config
                </button>
              </div>

              {error ? (
                <div
                  className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                  onClick={(e) => e.stopPropagation()}
                >
                  ⚠️ {error}
                </div>
              ) : null}

              {/* Affichage fichiers sélectionnés */}
              <div onClick={(e) => e.stopPropagation()} className="space-y-3 border-t border-slate-200 pt-4">
                {selectedNotebook ? (
                  <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <MdCheckCircle className="text-lg text-green-600" />
                      <div>
                        <p className="truncate text-sm font-medium text-slate-800">
                          {selectedNotebook.name}
                        </p>
                        <p className="text-xs text-slate-600">
                          {formatBytes(selectedNotebook.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        reset();
                      }}
                      className="text-slate-400 hover:text-slate-600 transition"
                    >
                      <MdDelete className="text-lg" />
                    </button>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic text-center">
                    Aucun notebook sélectionné
                  </p>
                )}

                {selectedPyproject ? (
                  <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <MdCheckCircle className="text-lg text-green-600" />
                      <div>
                        <p className="truncate text-sm font-medium text-slate-800">
                          {selectedPyproject.name}
                        </p>
                        <p className="text-xs text-slate-600">
                          {formatBytes(selectedPyproject.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPyproject(null);
                        setDependencies(null);
                      }}
                      className="text-slate-400 hover:text-slate-600 transition"
                    >
                      <MdDelete className="text-lg" />
                    </button>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic text-center">
                    Aucun fichier de config
                  </p>
                )}
              </div>
            </div>

            {/* Bouton d'import */}
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={onImportClick}
                disabled={!isReadyToImport || disabled}
                className="flex-1 rounded-lg bg-blue-600 text-white px-4 py-3 text-sm font-medium hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 transition"
              >
                📥 Importer
              </button>
              <button
                type="button"
                onClick={reset}
                disabled={!hasFiles || disabled}
                className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 transition"
              >
                Annuler
              </button>
            </div>

            {/* Panneau d'infos */}
            <button
              type="button"
              onClick={() => setPanelExpanded(!panelExpanded)}
              className="mt-6 flex w-full items-center gap-2 border-t border-slate-200 pt-4 text-left text-sm font-medium text-slate-700 hover:text-slate-900 transition"
            >
              {panelExpanded ? (
                <MdExpandLess className="text-lg" />
              ) : (
                <MdExpandMore className="text-lg" />
              )}
              Détails d'import
            </button>

            {panelExpanded && (
              <div className="mt-4 space-y-4 border-t border-slate-200 pt-4">
                {dependencies ? (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-slate-900">
                      🔧 Dépendances Python ({dependencies.dependencies.length + dependencies.devDependencies.length})
                    </p>
                    <div className="space-y-2">
                      {dependencies.dependencies.length > 0 && (
                        <div>
                          <p className="text-xs font-medium text-slate-700">
                            Production ({dependencies.dependencies.length})
                          </p>
                          <div className="space-y-1">
                            {dependencies.dependencies.slice(0, 5).map((dep, i) => (
                              <p key={i} className="text-xs text-slate-600">
                                • {dep.name}: {dep.version}
                              </p>
                            ))}
                            {dependencies.dependencies.length > 5 && (
                              <p className="text-xs text-slate-500 italic">
                                +{dependencies.dependencies.length - 5} autres...
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {dependencies.devDependencies.length > 0 && (
                        <div className="border-t border-slate-200 pt-2">
                          <p className="text-xs font-medium text-slate-700">
                            Développement ({dependencies.devDependencies.length})
                          </p>
                          <div className="space-y-1">
                            {dependencies.devDependencies.slice(0, 5).map((dep, i) => (
                              <p key={i} className="text-xs text-slate-600">
                                • {dep.name}: {dep.version}
                              </p>
                            ))}
                            {dependencies.devDependencies.length > 5 && (
                              <p className="text-xs text-slate-500 italic">
                                +{dependencies.devDependencies.length - 5} autres...
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : null}

                {/* Preview Cellules */}
                {showPreview && notebook ? (
                  <div className="border-t border-slate-200 pt-4 space-y-2">
                    <p className="text-sm font-semibold text-slate-900">
                      📝 Aperçu du Code ({((notebook as any)?.cells || []).length} cellules)
                    </p>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {((notebook as any)?.cells || []).slice(0, 5).map((cell: any, i: number) => (
                        <div key={i} className="space-y-1 border border-slate-200 rounded-lg overflow-hidden">
                          <div className="bg-slate-100 px-3 py-2 border-b border-slate-200 flex items-center gap-2">
                            <span className="text-xs font-semibold text-slate-700">
                              {cell.cell_type === "code" ? "💻" : "📄"} Cellule {i + 1}
                            </span>
                            <span className="text-xs text-slate-500">
                              {cell.cell_type === "code" ? "Code" : "Markdown"}
                            </span>
                          </div>
                          
                          {cell.cell_type === "code" ? (
                            <div className="bg-slate-900">
                              <SyntaxHighlighter
                                language="python"
                                style={vscDarkPlus}
                                customStyle={{
                                  margin: 0,
                                  background: "transparent",
                                  fontSize: 12,
                                  padding: "0.8em",
                                  borderRadius: 0,
                                }}
                                showLineNumbers={false}
                                wrapLines={true}
                              >
                                {Array.isArray(cell.source)
                                  ? cell.source.join("").slice(0, 400)
                                  : String(cell.source).slice(0, 400)}
                              </SyntaxHighlighter>
                              {(Array.isArray(cell.source)
                                ? cell.source.join("").length
                                : String(cell.source).length) > 400 && (
                                <div className="px-3 py-1 bg-slate-800 text-xs text-slate-400 border-t border-slate-700">
                                  ... affichage tronqué
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="px-3 py-2 text-sm text-slate-700 bg-slate-50 max-h-32 overflow-hidden">
                              <p className="whitespace-pre-wrap break-words">
                                {Array.isArray(cell.source)
                                  ? cell.source.join("").slice(0, 300)
                                  : String(cell.source).slice(0, 300)}
                              </p>
                              {(Array.isArray(cell.source)
                                ? cell.source.join("").length
                                : String(cell.source).length) > 300 && (
                                <p className="text-xs text-slate-500 italic">
                                  ... affichage tronqué
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                      {((notebook as any)?.cells || []).length > 5 && (
                        <p className="text-xs text-slate-500 italic text-center py-2">
                          +{((notebook as any)?.cells || []).length - 5} cellules supplémentaires
                        </p>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input files */}
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept=".ipynb"
        onChange={onNotebookChange}
        className="hidden"
      />
      <input
        ref={inputTomlRef}
        type="file"
        accept=".toml"
        onChange={onPyprojectChange}
        className="hidden"
      />

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md mx-4 p-6 space-y-4">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-slate-900">
                📥 Importer le notebook ?
              </h2>
              <p className="text-sm text-slate-600">
                L'import du notebook vous amènera à la partie <span className="font-semibold">storytelling</span> pour explorer les données et créer des analyses.
              </p>
            </div>

            <div className="flex items-center gap-2 py-2">
              <input
                type="checkbox"
                id="dontAskAgain"
                checked={dontAskAgain}
                onChange={(e) => setDontAskAgain(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 cursor-pointer"
              />
              <label
                htmlFor="dontAskAgain"
                className="text-sm text-slate-700 cursor-pointer"
              >
                Ne plus afficher ce message
              </label>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={handleCancelImport}
                className="flex-1 rounded-lg px-4 py-2 text-sm font-medium text-slate-700 border border-slate-300 hover:bg-slate-50 transition"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleConfirmImport}
                className="flex-1 rounded-lg px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
              >
                Importer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
