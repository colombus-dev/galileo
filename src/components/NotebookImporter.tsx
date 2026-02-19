import React, { useCallback, useId, useRef, useState } from "react";
import { MdExpandMore, MdExpandLess, MdDelete, MdCheckCircle } from "react-icons/md";

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

  /** Appelé au moment où l'utilisateur clique "Importer" */
  onImport?: (payload: {
    notebookFile: File;
    notebook: NotebookJson;
    pyprojectFile: File | null;
    dependencies: ParsedDependencies | null;
  }) => void;

  /** Appelé en cas d'erreur (type invalide / parsing) */
  onError?: (error: { code: string; message: string }) => void;

  /** Affiche le JSON en preview */
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

/**
 * Parse les dépendances depuis le contenu TOML
 */
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

/**
 * Extrait la version Python du TOML
 */
function extractPythonVersion(content: string): string {
  // Format: requires-python = "^3.8"
  let match = content.match(/requires-python\s*=\s*"([^"]+)"/);
  if (match) return match[1];

  // Format: python = "^3.8"
  match = content.match(/python\s*=\s*"([^"]+)"/);
  if (match) return match[1];

  return "3.10";
}

/**
 * Extrait les dépendances du TOML
 */
function extractDependencies(
  content: string
): Array<{ name: string; version: string }> {
  const dependencies: Array<{ name: string; version: string }> = [];

  // Format PEP 621: dependencies = ["package>=1.0", "other~=2.0"]
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

  // Format Poetry: dependencies = { package = "^1.0", other = "~2.0" }
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

/**
 * Extrait les dépendances de développement du TOML
 */
function extractDevDependencies(
  content: string
): Array<{ name: string; version: string }> {
  const devDependencies: Array<{ name: string; version: string }> = [];

  // Format PEP 621 avec optional-dependencies: dev = [...]
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

  // Format Poetry: [tool.poetry.group.dev.dependencies]
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

  // Format Poetry legacy: [tool.poetry.dev-dependencies]
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

/**
 * Composant amélioré d'import de notebooks avec support pyproject.toml
 * Layout 2-colonnes : drag-drop gauche, panneau rétractable droit
 */
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

  const [isDragging, setIsDragging] = useState(false);
  const [selectedNotebook, setSelectedNotebook] = useState<File | null>(null);
  const [selectedPyproject, setSelectedPyproject] = useState<File | null>(null);
  const [notebook, setNotebook] = useState<NotebookJson | null>(null);
  const [dependencies, setDependencies] = useState<ParsedDependencies | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [panelExpanded, setPanelExpanded] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [dontAskAgain, setDontAskAgain] = useState(false);

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

        // Parse les dépendances
        const parsed = parsePyprojectToml(text);
        console.log("📝 Pyproject.toml parsing result:", {
          rawText: text.slice(0, 500),
          parsed,
        });
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

  // Drag & drop handlers
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

    // Check if user has previously selected "don't ask again"
    const skipConfirmation = localStorage.getItem("skipImportConfirmation") === "true";
    
    if (skipConfirmation) {
      // Skip confirmation and import directly
      onImport?.({
        notebookFile: selectedNotebook,
        notebook,
        pyprojectFile: selectedPyproject,
        dependencies,
      });
    } else {
      // Show confirmation modal
      setShowConfirmation(true);
    }
  }, [notebook, onImport, selectedNotebook, selectedPyproject, dependencies]);

  const handleConfirmImport = useCallback(() => {
    if (!selectedNotebook || !notebook) return;

    // Save preference if "don't ask again" is checked
    if (dontAskAgain) {
      localStorage.setItem("skipImportConfirmation", "true");
    }

    setShowConfirmation(false);
    setDontAskAgain(false);

    onImport?.({
      notebookFile: selectedNotebook,
      notebook,
      pyprojectFile: selectedPyproject,
      dependencies,
    });
  }, [notebook, onImport, selectedNotebook, selectedPyproject, dependencies, dontAskAgain]);

  const handleCancelImport = useCallback(() => {
    setShowConfirmation(false);
    setDontAskAgain(false);
  }, []);

  return (
    <div className={className}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-80px)] lg:h-auto p-6 lg:p-8">
        {/* Colonne gauche : Drop zone */}
        <div className="lg:col-span-1 flex flex-col">
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
                      <p className="text-xs text-slate-500">{formatBytes(selectedNotebook.size)}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedNotebook(null);
                      setNotebook(null);
                    }}
                    className="p-1 hover:bg-green-100 rounded transition"
                  >
                    <MdDelete className="text-lg text-green-600" />
                  </button>
                </div>
              ) : null}

              {selectedPyproject ? (
                <div className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <MdCheckCircle className="text-lg text-blue-600" />
                    <div>
                      <p className="truncate text-sm font-medium text-slate-800">
                        {selectedPyproject.name}
                      </p>
                      <p className="text-xs text-slate-500">{formatBytes(selectedPyproject.size)}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPyproject(null);
                      setDependencies(null);
                    }}
                    className="p-1 hover:bg-blue-100 rounded transition"
                  >
                    <MdDelete className="text-lg text-blue-600" />
                  </button>
                </div>
              ) : null}

              {!selectedNotebook && !selectedPyproject ? (
                <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
                  Aucun fichier sélectionné
                </div>
              ) : null}
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={onImportClick}
              disabled={disabled || !isReadyToImport}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 transition flex flex-col items-center gap-1"
            >
              <span>📥 Importer</span>
              <span className="text-xs font-normal opacity-90">(vous amènera à la partie storytelling)</span>
            </button>

            <button
              type="button"
              onClick={reset}
              disabled={disabled || !hasFiles}
              className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 transition"
            >
              ↻ Réinitialiser
            </button>
          </div>

          {/* Input files */}
          <input
            id={inputId}
            ref={inputRef}
            type="file"
            accept=".ipynb"
            disabled={disabled}
            onChange={onNotebookChange}
            className="hidden"
          />
          <input
            ref={inputTomlRef}
            type="file"
            accept=".toml"
            disabled={disabled}
            onChange={onPyprojectChange}
            className="hidden"
          />
        </div>

        {/* Colonne droite : Panneau rétractable */}
        <div className="lg:col-span-1 flex flex-col">
          <div className="flex flex-col h-full rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
            {/* Header du panneau */}
            <button
              onClick={() => setPanelExpanded(!panelExpanded)}
              className="flex items-center justify-between gap-2 px-4 py-3 bg-slate-50 hover:bg-slate-100 transition border-b border-slate-200 flex-shrink-0"
            >
              <span className="font-semibold text-slate-900">📋 Aperçu</span>
              {panelExpanded ? (
                <MdExpandLess className="text-lg text-slate-600" />
              ) : (
                <MdExpandMore className="text-lg text-slate-600" />
              )}
            </button>

            {/* Contenu du panneau */}
            {panelExpanded ? (
              <div className="p-4 space-y-4 overflow-y-auto flex-1">
                {/* Statut */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-slate-900">📊 Statut</p>
                  <div className="text-xs space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={selectedNotebook ? "text-green-600" : "text-slate-400"}>
                        {selectedNotebook ? "✓" : "○"}
                      </span>
                      <span className={selectedNotebook ? "text-slate-700" : "text-slate-500"}>
                        Notebook
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={selectedPyproject ? "text-green-600" : "text-slate-400"}>
                        {selectedPyproject ? "✓" : "○"}
                      </span>
                      <span className={selectedPyproject ? "text-slate-700" : "text-slate-500"}>
                        Dépendances (pyproject.toml)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info Notebook */}
                {notebook ? (
                  <div className="space-y-2 border-t border-slate-200 pt-4">
                    <p className="text-sm font-semibold text-slate-900">📓 Notebook</p>
                    <div className="text-xs space-y-1 text-slate-600 bg-slate-50 p-3 rounded">
                      <p className="truncate"><span className="font-medium">Fichier:</span> {selectedNotebook?.name}</p>
                      <p><span className="font-medium">Cellules:</span> {(notebook as any)?.cells?.length || 0}</p>
                      <p><span className="font-medium">Taille:</span> {formatBytes(selectedNotebook?.size || 0)}</p>
                    </div>
                  </div>
                ) : null}

                {/* Info Dépendances Complètes */}
                {dependencies || selectedPyproject ? (
                  <div className="space-y-2 border-t border-slate-200 pt-4">
                    <p className="text-sm font-semibold text-slate-900">🐍 Configuration Python</p>
                    {dependencies ? (
                      <div className="text-xs bg-slate-50 p-3 rounded space-y-3">
                        <div>
                          <p className="font-semibold text-slate-700 mb-1">Version Python:</p>
                          <p className="font-mono bg-slate-900 text-green-400 p-2 rounded text-xs">
                            python {dependencies.pythonVersion}
                          </p>
                        </div>

                        {dependencies.dependencies.length > 0 ? (
                          <div>
                            <p className="font-semibold text-slate-700 mb-2">
                              📦 Dépendances ({dependencies.dependencies.length})
                            </p>
                            <div className="space-y-1 max-h-48 overflow-y-auto bg-white p-2 rounded border border-slate-200">
                              {dependencies.dependencies.map((dep, i) => (
                                <div key={i} className="text-xs text-slate-600 flex justify-between items-center gap-2">
                                  <span className="font-mono flex-1 truncate">{dep.name}</span>
                                  <span className="text-slate-500 font-mono text-right flex-shrink-0">{dep.version}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="text-xs text-slate-500">Aucune dépendance détectée</div>
                        )}

                        {dependencies.devDependencies.length > 0 ? (
                          <div>
                            <p className="font-semibold text-slate-700 mb-2">
                              🛠️ Dépendances Dev ({dependencies.devDependencies.length})
                            </p>
                            <div className="space-y-1 max-h-48 overflow-y-auto bg-white p-2 rounded border border-slate-200">
                              {dependencies.devDependencies.map((dep, i) => (
                                <div key={i} className="text-xs text-slate-600 flex justify-between items-center gap-2">
                                  <span className="font-mono flex-1 truncate">{dep.name}</span>
                                  <span className="text-slate-500 font-mono text-right flex-shrink-0">{dep.version}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="text-xs text-slate-500">Aucune dépendance dev détectée</div>
                        )}
                      </div>
                    ) : (
                      <div className="text-xs text-slate-500 italic">
                        ⚠️ Erreur parsing pyproject.toml ou fichier en cours de traitement...
                      </div>
                    )}
                  </div>
                ) : null}

                {/* Preview Cellules */}
                {showPreview && notebook ? (
                  <div className="border-t border-slate-200 pt-4 space-y-2">
                    <p className="text-sm font-semibold text-slate-900">📝 Aperçu du Code ({((notebook as any)?.cells || []).length} cellules)</p>
                    <div className="space-y-2">
                      {((notebook as any)?.cells || []).slice(0, 8).map((cell: any, i: number) => (
                        <div key={i} className="bg-slate-900 rounded p-2 space-y-1">
                          <p className="text-xs font-semibold text-blue-400">
                            {cell.cell_type === "code" ? "💻 Code" : "📄 Markdown"} (Cellule {i + 1})
                          </p>
                          <pre className="text-xs text-green-400 font-mono overflow-x-auto line-clamp-4 whitespace-pre-wrap break-words">
                            {Array.isArray(cell.source)
                              ? cell.source.join("").slice(0, 200)
                              : String(cell.source).slice(0, 200)}
                            {(Array.isArray(cell.source)
                              ? cell.source.join("").length
                              : String(cell.source).length) > 200
                              ? "..."
                              : ""}
                          </pre>
                        </div>
                      ))}
                      {((notebook as any)?.cells || []).length > 8 && (
                        <p className="text-xs text-slate-500 italic text-center">
                          +{((notebook as any)?.cells || []).length - 8} cellules...
                        </p>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-500 text-sm">
                Cliquer pour développer
              </div>
            )}
          </div>
        </div>
      </div>

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

            {/* Checkbox for "don't ask again" */}
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

            {/* Buttons */}
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
