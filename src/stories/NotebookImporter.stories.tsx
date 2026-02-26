import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { NotebookImporter } from "../components/NotebookImporter";

const meta: Meta<typeof NotebookImporter> = {
  title: "Galileo/NotebookImporter",
  component: NotebookImporter,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    onImport: { action: "import" },
    onError: { action: "error" },
    disabled: { control: "boolean" },
    showPreview: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof NotebookImporter>;

/**
 * État par défaut du composant d'import
 * Affiche la zone drag-drop et le panneau rétractable avec aperçu
 */
export const Default: Story = {
  args: {
    showPreview: true,
    label: "Importer un notebook",
    helperText: "Glisse-dépose les fichiers ou clique pour parcourir",
  },
  render: (args) => (
    <div className="w-full h-screen lg:h-auto">
      <NotebookImporter {...args} />
    </div>
  ),
};

/**
 * État avec import réussi et statut
 */
export const WithSuccessfulImport: Story = {
  render: () => {
    const [status, setStatus] = useState("En attente d'import...");
    const [importData, setImportData] = useState<any>(null);

    return (
      <div className="w-full max-w-4xl space-y-4">
        <NotebookImporter
          showPreview
          onImport={(payload) => {
            setStatus(`✓ Import réussi: ${payload.notebookFile.name}`);
            setImportData({
              notebook: payload.notebookFile.name,
              hasPyproject: !!payload.pyprojectFile,
              pythonVersion: payload.dependencies?.pythonVersion || "—",
              depsCount: payload.dependencies?.dependencies.length || 0,
            });
          }}
          onError={({ message }) => setStatus(`✗ Erreur: ${message}`)}
        />
        <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-2">
          <p className="text-sm font-medium text-slate-800">Statut: {status}</p>
          {importData && (
            <div className="text-xs text-slate-600 space-y-1">
              <p>📓 Notebook: {importData.notebook}</p>
              <p>📝 Config (pyproject.toml): {importData.hasPyproject ? "✓" : "—"}</p>
              <p>🐍 Python: {importData.pythonVersion}</p>
              <p>📦 Dépendances: {importData.depsCount}</p>
            </div>
          )}
        </div>
      </div>
    );
  },
};

/**
 * État avec gestion d'erreur
 */
export const WithErrorHandling: Story = {
  render: () => {
    const [status, setStatus] = useState("—");
    const [errors, setErrors] = useState<string[]>([]);

    return (
      <div className="w-full max-w-4xl space-y-4">
        <NotebookImporter
          showPreview
          onImport={({ notebookFile }) => {
            setStatus(`Import validé: ${notebookFile.name}`);
            setErrors([]);
          }}
          onError={({ code, message }) => {
            setStatus(`Erreur (${code})`);
            setErrors((prev) => [...prev, message]);
          }}
        />
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-800">Statut: {status}</p>
          {errors.length > 0 && (
            <div className="space-y-2">
              {errors.map((error, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                >
                  {error}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
};

/**
 * État désactivé (loading, validation en cours, etc.)
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    label: "Importation en cours...",
    helperText: "Veuillez patienter pendant l'import du notebook",
    showPreview: true,
  },
  render: (args) => (
    <div className="w-full max-w-4xl">
      <NotebookImporter {...args} />
    </div>
  ),
};

/**
 * État sans aperçu JSON
 */
export const WithoutPreview: Story = {
  args: {
    showPreview: false,
    label: "Importer un notebook",
    helperText: "Mode simplifié sans aperçu JSON",
  },
  render: (args) => (
    <div className="w-full max-w-4xl">
      <NotebookImporter {...args} />
    </div>
  ),
};

/**
 * Démonstration avec logs des événements
 */
export const WithEventLogs: Story = {
  render: () => {
    const [logs, setLogs] = useState<Array<{ type: string; message: string; time: string }>>([]);

    const addLog = (type: string, message: string) => {
      const time = new Date().toLocaleTimeString();
      setLogs((prev) => [{ type, message, time }, ...prev].slice(0, 10));
    };

    return (
      <div className="w-full max-w-4xl space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <p className="mb-2 font-medium text-slate-900">Composant</p>
            <NotebookImporter
              showPreview
              onImport={(payload) => {
                addLog("import", `Importé: ${payload.notebookFile.name}`);
              }}
              onError={({ code, message }) => {
                addLog("error", `${code}: ${message}`);
              }}
            />
          </div>

          <div>
            <p className="mb-2 font-medium text-slate-900">Logs d'événements</p>
            <div className="h-96 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-1">
              {logs.length === 0 ? (
                <p className="text-xs text-slate-500 italic">
                  Les événements s'afficheront ici...
                </p>
              ) : (
                logs.map((log, i) => (
                  <div
                    key={i}
                    className={[
                      "text-xs font-mono p-2 rounded",
                      log.type === "error"
                        ? "bg-red-100 text-red-800"
                        : log.type === "import"
                          ? "bg-green-100 text-green-800"
                          : log.type === "navigation"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-slate-100 text-slate-800",
                    ].join(" ")}
                  >
                    <span className="opacity-60">[{log.time}]</span> {log.type}:{" "}
                    <span className="font-semibold">{log.message}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * État avec custom helperText
 */
export const CustomMessages: Story = {
  args: {
    label: "Charger mes données",
    helperText:
      "Dépose un notebook Jupyter (.ipynb) + un fichier de configuration (pyproject.toml) pour analyser tes données avec le module Storytelling.",
    showPreview: true,
  },
  render: (args) => (
    <div className="w-full max-w-4xl">
      <NotebookImporter {...args} />
    </div>
  ),
};

/**
 * État compact (mobile)
 */
export const CompactLayout: Story = {
  render: () => {
    const [status, setStatus] = useState("—");

    return (
      <div className="w-full max-w-sm mx-auto">
        <NotebookImporter
          showPreview={false}
          label="Importer"
          helperText="Ajoute un notebook"
          onImport={() => setStatus("✓ Importé")}
          onError={() => setStatus("✗ Erreur")}
        />
        <div className="mt-3 text-xs text-slate-600">Statut: {status}</div>
      </div>
    );
  },
};
