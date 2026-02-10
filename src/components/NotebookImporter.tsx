import React, { useCallback, useId, useMemo, useRef, useState } from "react";

type NotebookJson = Record<string, unknown>;

export type NotebookImporterProps = {
  label?: string;
  helperText?: string;

  /** Extensions autorisées (par défaut: .ipynb) */
  accept?: string[];

  disabled?: boolean;

  /** Appelé au moment où l’utilisateur clique “Valider l’import” */
  onConfirm?: (payload: { file: File; notebook: NotebookJson }) => void;

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

export const NotebookImporter: React.FC<NotebookImporterProps> = ({
  label = "Importer un notebook",
  helperText = "Glisse-dépose un fichier .ipynb ou clique pour parcourir, puis valide l’import.",
  accept = [".ipynb"],
  disabled = false,
  onConfirm,
  onError,
  showPreview = true,
  className,
}) => {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [notebook, setNotebook] = useState<NotebookJson | null>(null);
  const [error, setError] = useState<string | null>(null);

  const acceptAttr = useMemo(() => accept.join(","), [accept]);
  const isReadyToConfirm = !!selectedFile && !!notebook && !error;

  const emitError = useCallback(
    (code: string, message: string) => {
      setError(message);
      onError?.({ code, message });
    },
    [onError]
  );

  const reset = useCallback(() => {
    setSelectedFile(null);
    setNotebook(null);
    setError(null);
    setIsDragging(false);
  }, []);

  const validateType = useCallback(
    (file: File) => {
      const ext = getExt(file.name);
      const allowed = accept.map((a) => a.toLowerCase());
      if (!allowed.includes(ext)) {
        return {
          ok: false as const,
          code: "invalid_type",
          message: `Type de fichier non supporté (${ext || "sans extension"}). Extensions autorisées: ${accept.join(
            ", "
          )}`,
        };
      }
      return { ok: true as const };
    },
    [accept]
  );

  const loadForPreview = useCallback(
    async (file: File) => {
      const validation = validateType(file);
      if (!validation.ok) {
        emitError(validation.code, validation.message);
        return;
      }

      try {
        const text = await file.text();
        const parsed = JSON.parse(text) as NotebookJson;

        setSelectedFile(file);
        setNotebook(parsed);
        setError(null);
      } catch {
        emitError(
          "parse_error",
          "Impossible de lire le notebook. Vérifie que le fichier est un JSON valide (.ipynb)."
        );
      }
    },
    [emitError, validateType]
  );

  const openFileDialog = useCallback(() => {
    if (disabled) return;
    inputRef.current?.click();
  }, [disabled]);

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      void loadForPreview(file);

      // Permet de re-sélectionner le même fichier
      e.target.value = "";
    },
    [loadForPreview]
  );

  // Drag & drop handlers
  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // nécessaire pour autoriser le drop
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

      const file = e.dataTransfer.files?.[0];
      if (!file) return;

      void loadForPreview(file);
    },
    [disabled, loadForPreview]
  );

  const onConfirmClick = useCallback(async () => {
    if (!selectedFile || !notebook) return;

    // Pour l’instant: confirmation côté front (callback)
    onConfirm?.({ file: selectedFile, notebook });

    // Plus tard: upload vers le backend (exemple)
    // const form = new FormData();
    // form.append("file", selectedFile);
    // const res = await fetch("/api/notebooks/upload", { method: "POST", body: form });
    // if (!res.ok) emitError("upload_error", "Échec de l’upload du notebook.");
  }, [notebook, onConfirm, selectedFile]);

  return (
    <div className={className}>
      <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-slate-800">
        {label}
      </label>

      {/* Zone DnD */}
      <div
        role="button"
        tabIndex={0}
        aria-disabled={disabled}
        onClick={openFileDialog}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") openFileDialog();
        }}
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={[
          "rounded-xl border-2 border-dashed p-6 transition",
          "flex flex-col gap-4",
          disabled
            ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400"
            : "cursor-pointer border-slate-300 bg-white hover:bg-slate-50",
          isDragging && !disabled ? "border-slate-500 bg-slate-50" : "",
        ].join(" ")}
      >
        <div className="text-center">
          <p className="text-sm text-slate-700">
            <span className="font-semibold">Glisse-dépose</span> un notebook ici{" "}
            <span className="text-slate-500">ou</span>{" "}
            <span className="underline underline-offset-2">clique pour parcourir</span>
          </p>
          <p className="mt-1 text-xs text-slate-500">{helperText}</p>
          <p className="mt-2 text-xs text-slate-500">Extensions: {accept.join(", ")}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openFileDialog();
            }}
            disabled={disabled}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Choisir un fichier
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              void onConfirmClick();
            }}
            disabled={disabled || !isReadyToConfirm}
            className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Valider l’import
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              reset();
            }}
            disabled={disabled || (!selectedFile && !error)}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Réinitialiser
          </button>

          <input
            id={inputId}
            ref={inputRef}
            type="file"
            accept={acceptAttr}
            disabled={disabled}
            onChange={onInputChange}
            className="hidden"
          />
        </div>

        {error ? (
          <div
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
            onClick={(e) => e.stopPropagation()}
          >
            {error}
          </div>
        ) : null}

        <div onClick={(e) => e.stopPropagation()} className="space-y-3">
          {selectedFile ? (
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              <p className="truncate text-sm font-medium text-slate-800">
                {selectedFile.name}
              </p>
              <p className="text-xs text-slate-500">{formatBytes(selectedFile.size)}</p>
            </div>
          ) : (
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-6 text-center text-sm text-slate-500">
              Aucun fichier sélectionné
            </div>
          )}

          {showPreview && notebook ? (
            <div>
              <p className="mb-2 text-sm font-medium text-slate-800">Preview</p>
              <pre className="max-h-64 overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-800">
                {JSON.stringify(notebook, null, 2)}
              </pre>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
