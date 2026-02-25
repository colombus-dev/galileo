import {
	mockNotebooks,
	type Artifact,
	type NotebookContext,
	type NotebookData,
	type NotebookPedagogicalValidation,
} from "@/data/mockData";

type StoredNotebook = {
	id: string;
	name: string;
	timestamp: number;
	notebook: Record<string, unknown>;
	dependencies?: unknown;
};

const STORAGE_KEY = "galileo_notebook_history";

function normalizeImportedNotebookId(filename: string): string {
	const trimmed = filename.trim();
	const base = trimmed.split(/[/\\]/).pop() ?? trimmed;
	const lowered = base.toLowerCase();
	return lowered.endsWith(".ipynb") ? lowered : `${lowered}.ipynb`;
}

function canUseLocalStorage(): boolean {
	return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function safeParseJson<T>(value: string | null): T | null {
	if (!value) return null;
	try {
		return JSON.parse(value) as T;
	} catch {
		return null;
	}
}

function stripIpynbExtension(filename: string): string {
	return filename.replace(/\.ipynb$/i, "");
}

function normalizeIpynbSource(source: unknown): string {
	if (typeof source === "string") return source;
	if (Array.isArray(source)) {
		return source.map((s) => (typeof s === "string" ? s : "")).join("");
	}
	return "";
}

function normalizeLibName(raw: string) {
	const s = raw.trim();
	if (!s) return null;
	if (s === "sklearn") return "scikit-learn";
	return s;
}

function hasFrenchAccent(value: string): boolean {
	return /[àâäçéèêëîïôöùûüÿœ]/i.test(value);
}

function looksFrenchLikeHeading(value: string): boolean {
	const s = value.trim();
	if (!s) return false;
	if (hasFrenchAccent(s)) return true;
	const lowered = s.toLowerCase();
	return (
		lowered.includes("chargement") ||
		lowered.includes("donnees") ||
		lowered.includes("données") ||
		lowered.includes("pretrait") ||
		lowered.includes("prétrait") ||
		lowered.includes("preparation") ||
		lowered.includes("préparation") ||
		lowered.includes("split") ||
		lowered.includes("entrain") ||
		lowered.includes("entraîn") ||
		lowered.includes("evaluation") ||
		lowered.includes("évaluation") ||
		lowered.includes("metrique") ||
		lowered.includes("métrique") ||
		lowered.includes("modele") ||
		lowered.includes("modèle") ||
		lowered.includes("visual") ||
		lowered.includes("matrice")
	);
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

function detectNotebookSignals(code: string): {
	isClassification: boolean;
	isRegression: boolean;
} {
	const c = code.toLowerCase();
	const isClassification =
		c.includes("accuracy_score") ||
		c.includes("f1_score") ||
		c.includes("classification_report") ||
		c.includes("confusion_matrix") ||
		c.includes("logisticregression") ||
		c.includes("randomforestclassifier") ||
		c.includes("svc") ||
		c.includes("xgbclassifier");
	const isRegression =
		c.includes("mean_squared_error") ||
		c.includes("mean_absolute_error") ||
		c.includes("r2_score") ||
		c.includes("linearregression") ||
		c.includes("randomforestregressor") ||
		c.includes("xgbregressor");
	return { isClassification, isRegression };
}

function looksLikeNotebookGeneratedComment(line: string): boolean {
	const s = line.trim();
	// Common Jupyter / tooling markers that are not meaningful descriptions
	return (
		s.startsWith("# In[") ||
		s.startsWith("#%%") ||
		s.startsWith("# ---") ||
		s.startsWith("# ---") ||
		s.startsWith("#!")
	);
}

function inferFrenchCellDescription(code: string): string {
	const c = code.toLowerCase();

	// 1) Data loading / IO
	if (
		c.includes("read_csv") ||
		c.includes("read_excel") ||
		c.includes("read_parquet") ||
		c.includes("read_json") ||
		c.includes("load_") ||
		c.includes("open(")
	) {
		return "Chargement du dataset";
	}

	// 2) Data inspection / cleaning
	if (c.includes(".shape") || c.includes("head(") || c.includes("describe(")) {
		return "Exploration des données";
	}
	if (
		c.includes("dropna") ||
		c.includes("fillna") ||
		c.includes("isnull") ||
		c.includes("isna") ||
		c.includes("nan")
	) {
		return "Nettoyage des données";
	}

	// 3) Split / preprocessing
	if (c.includes("train_test_split") || c.includes("stratify=")) {
		return "Préparation et split des données";
	}
	if (
		c.includes("standardscaler") ||
		c.includes("minmaxscaler") ||
		c.includes("robustscaler") ||
		c.includes("onehotencoder") ||
		c.includes("pipeline(") ||
		c.includes("make_pipeline(")
	) {
		return "Prétraitement des données";
	}

	// 4) Training
	if (c.includes(".fit(") || c.includes("fit(")) {
		return "Entraînement du modèle";
	}

	// 5) Evaluation
	if (
		c.includes("accuracy_score") ||
		c.includes("f1_score") ||
		c.includes("precision_score") ||
		c.includes("recall_score") ||
		c.includes("classification_report") ||
		c.includes("mean_squared_error") ||
		c.includes("mean_absolute_error") ||
		c.includes("r2_score") ||
		c.includes(".score(")
	) {
		return "Évaluation du modèle";
	}
	if (c.includes("confusion_matrix") || c.includes("heatmap(") || c.includes("cm =")) {
		return "Matrice de confusion";
	}

	// 6) Visualization
	if (
		c.includes("plt.") ||
		c.includes("seaborn") ||
		c.includes("sns.") ||
		c.includes("plotly") ||
		c.includes("px.") ||
		c.includes("go.") ||
		c.includes(".plot(")
	) {
		return "Visualisation";
	}

	// 7) Imports/config
	if (c.includes("import ") || c.includes("from ")) {
		return "Imports & configuration";
	}

	return "Code";
}

function extractCodeCellDescription(code: string): string {
	const lines = code.split(/\r?\n/);
	for (const line of lines) {
		const trimmed = line.trim();
		if (!trimmed) continue;
		if (!trimmed.startsWith("#")) break;
		if (looksLikeNotebookGeneratedComment(trimmed)) continue;
		const label = trimmed.replace(/^#+\s*/, "").trim();
		// Avoid keeping English headings from imported notebooks: they break grouping.
		if (label.length >= 4 && looksFrenchLikeHeading(label)) return label.slice(0, 120);
		break;
	}
	return inferFrenchCellDescription(code);
}

function hashStringToPositiveInt(value: string): number {
	let h = 0;
	for (let i = 0; i < value.length; i++) {
		h = (h * 31 + value.charCodeAt(i)) | 0;
	}
	return Math.abs(h);
}

function remapCellIndex(templateIndex: number, availableCellIndices: number[]): number {
	if (availableCellIndices.length === 0) return templateIndex;
	const pos = Math.max(0, Math.min(availableCellIndices.length - 1, templateIndex));
	return availableCellIndices[pos] ?? templateIndex;
}

function prefixAndRemapArtifacts(opts: {
	artifacts: Artifact[];
	prefix: string;
	availableCellIndices: number[];
}): Artifact[] {
	const { artifacts, prefix, availableCellIndices } = opts;
	const idMap = new Map<string, string>();
	for (const a of artifacts) idMap.set(a.id, `${prefix}${a.id}`);

	return artifacts.map((a) => {
		const nextId = idMap.get(a.id) ?? `${prefix}${a.id}`;
		const nextInputs = (a.inputs ?? []).map((x) => idMap.get(x) ?? `${prefix}${x}`);
		return {
			...a,
			id: nextId,
			inputs: nextInputs.length > 0 ? nextInputs : undefined,
			cellIndex: remapCellIndex(a.cellIndex, availableCellIndices),
		};
	});
}

function selectMockTemplateForImported(opts: {
	importedId: string;
	detectedLibraries: string[];
	signals: { isClassification: boolean; isRegression: boolean };
}): NotebookData | null {
	const templates = mockNotebooks;
	if (templates.length === 0) return null;

	const detectedLower = new Set(opts.detectedLibraries.map((x) => x.toLowerCase()));
	const scored = templates.map((t, idx) => {
		const ctxLibs = (t.context?.libraries ?? []).map((x) => x.toLowerCase());
		let score = 0;
		for (const lib of ctxLibs) {
			if (detectedLower.has(lib)) score += 3;
		}
		const task = (t.context?.problem.taskTypeLabel ?? "").toLowerCase();
		if (opts.signals.isClassification && task.includes("classif")) score += 2;
		if (opts.signals.isRegression && (task.includes("régression") || task.includes("regression"))) score += 2;
		return { t, idx, score };
	});

	scored.sort((a, b) => b.score - a.score || a.idx - b.idx);
	const best = scored[0];
	if (best && best.score > 0) return best.t;
	return templates[hashStringToPositiveInt(opts.importedId) % templates.length] ?? null;
}

function buildImportedNotebookMockOverlay(opts: {
	importedId: string;
	availableCellIndices: number[];
	detectedLibraries: string[];
	template: NotebookData | null;
}): {
	artifacts: Artifact[];
	context?: NotebookContext;
	pedagogicalValidation?: NotebookPedagogicalValidation;
} {
	const { importedId, availableCellIndices, detectedLibraries, template } = opts;
	if (!template) return { artifacts: [] };

	const prefix = `${importedId}::`;

	const artifacts = prefixAndRemapArtifacts({
		artifacts: template.artifacts,
		prefix,
		availableCellIndices,
	});

	const detectedLibsSorted = [...new Set(detectedLibraries)].sort((a, b) => a.localeCompare(b));
	const context = template.context
		? ({
			...template.context,
			libraries: detectedLibsSorted.length > 0 ? detectedLibsSorted : template.context.libraries,
			problem: {
				...template.context.problem,
				description:
					detectedLibsSorted.length > 0
						? `Notebook importé (mocks) — libs détectées: ${detectedLibsSorted.join(", ")}. ${template.context.problem.description}`
						: `Notebook importé (mocks). ${template.context.problem.description}`,
			},
		} satisfies NotebookContext)
		: undefined;

	const pedagogicalValidation = template.pedagogicalValidation
		? ({
			...template.pedagogicalValidation,
			initialComment: template.pedagogicalValidation.initialComment ?? "",
		} satisfies NotebookPedagogicalValidation)
		: undefined;

	return { artifacts, context, pedagogicalValidation };
}

function readImportedNotebookHistory(): StoredNotebook[] {
	if (!canUseLocalStorage()) return [];
	const parsed = safeParseJson<StoredNotebook[]>(window.localStorage.getItem(STORAGE_KEY));
	if (!parsed || !Array.isArray(parsed)) return [];
	const filtered = parsed
		.filter(
			(x) =>
				Boolean(x) &&
				typeof x.id === "string" &&
				typeof x.name === "string" &&
				typeof x.timestamp === "number" &&
				typeof x.notebook === "object" &&
				x.notebook !== null,
		)
		.sort((a, b) => b.timestamp - a.timestamp);

	let didChange = false;
	const dedup = new Map<string, StoredNotebook>();
	for (const entry of filtered) {
		const normalizedId = normalizeImportedNotebookId(entry.name);
		const migrated =
			entry.id.startsWith("nb_") || entry.id !== normalizedId
				? { ...entry, id: normalizedId }
				: entry;
		if (migrated !== entry) didChange = true;
		if (!dedup.has(migrated.id)) dedup.set(migrated.id, migrated);
	}

	const result = Array.from(dedup.values()).sort((a, b) => b.timestamp - a.timestamp);
	if (didChange) {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
	}

	return result;
}

function toNotebookDataFromImported(entry: StoredNotebook): NotebookData {
	const raw = entry.notebook as { cells?: unknown };
	const rawCells = Array.isArray(raw?.cells) ? (raw.cells as any[]) : [];

	const codeCells: NotebookData["cells"] = [];
	const libraries = new Set<string>();
	const codeParts: string[] = [];
	for (let i = 0; i < rawCells.length; i++) {
		const c = rawCells[i];
		if (!c || c.cell_type !== "code") continue;
		const code = normalizeIpynbSource(c.source);
		codeParts.push(code);
		for (const lib of extractLibrariesFromCode(code)) libraries.add(lib);
		codeCells.push({
			index: i,
			code,
			description: "",
		});
	}

	const availableCellIndices = codeCells
		.map((c) => c.index)
		.filter((n) => typeof n === "number" && Number.isFinite(n))
		.sort((a, b) => a - b);

	const importedTitle = stripIpynbExtension(entry.name);
	const detectedLibraries = [...libraries].sort((a, b) => a.localeCompare(b));
	const signals = detectNotebookSignals(codeParts.join("\n\n"));
	const template = selectMockTemplateForImported({
		importedId: entry.id,
		detectedLibraries,
		signals,
	});

	// Align descriptions with the selected template (critical for code comparison grouping).
	const templateDescriptions = template
		? [...template.cells]
				.sort((a, b) => a.index - b.index)
				.map((c) => c.description)
		: [];
	const sortedImported = [...codeCells].sort((a, b) => a.index - b.index);
	for (let k = 0; k < sortedImported.length; k++) {
		const cell = sortedImported[k]!;
		cell.description = templateDescriptions[k] || extractCodeCellDescription(cell.code);
	}

	const overlay = buildImportedNotebookMockOverlay({
		importedId: entry.id,
		availableCellIndices,
		detectedLibraries,
		template,
	});

	return {
		id: entry.id,
		student: "Notebook importé",
		title: importedTitle,
		artifacts: overlay.artifacts,
		cells: codeCells,
		context: overlay.context,
		pedagogicalValidation: overlay.pedagogicalValidation,
		issues: [],
	};
}

function readImportedNotebooks(): NotebookData[] {
	return readImportedNotebookHistory().map(toNotebookDataFromImported);
}

export interface NotebookOption {
	id: string;
	user: string;
	project: string;
	/** Domaine métier (ex: Médecine, Histoire, Botanique…) */
	domain?: string;
	/** Problème / type de tâche (ex: Classification multi-classes) */
	problem?: string;
}

export async function listNotebooks(): Promise<NotebookData[]> {
	// TODO: replace with real backend call.
	// For now, merge imported notebooks (localStorage history) + mock data.
	const imported = readImportedNotebooks();
	return [...imported, ...mockNotebooks];
}

export async function listNotebookOptions(): Promise<NotebookOption[]> {
	const notebooks = await listNotebooks();
	return notebooks.map((n) => ({
		id: n.id,
		user: n.student,
		project: n.title,
		domain: n.context?.problem.domainLabel ?? (n.student === "Notebook importé" ? "Importé" : undefined),
		problem: n.context?.problem.taskTypeLabel,
	}));
}

export async function getNotebookById(id: string): Promise<NotebookData | null> {
	const notebooks = await listNotebooks();
	return notebooks.find((n) => n.id === id) ?? null;
}
