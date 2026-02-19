import type { CodeCell } from "@/data/mockData";

export type PipelineStageId =
	| "imports"
	| "data"
	| "preprocessing"
	| "split"
	| "training"
	| "evaluation"
	| "visualization"
	| "other";

export type PipelineStage = {
	id: PipelineStageId;
	label: string;
	// Tested against (description + code) lowercased
	patterns: RegExp[];
};

export const PIPELINE_STAGES: PipelineStage[] = [
	{
		id: "imports",
		label: "Imports & configuration",
		patterns: [/\bimport\b/, /\bfrom\s+\w+\s+import\b/],
	},
	{
		id: "data",
		label: "Chargement des données",
		patterns: [
			/\bcharg(e|ement)\b/, 
			/\bdataset\b/, 
			/\bread_(csv|excel|json|parquet)\b/,
			/\b(read_csv|read_excel|read_json|read_parquet)\b/,
			/\bload\b/,
			/\bdownload\b/,
		],
	},
	{
		id: "preprocessing",
		label: "Prétraitement",
		patterns: [
			/\bpreprocess\b/,
			/\bnettoy(age|er)\b/,
			/\bclean\b/,
			/\bfillna\b/,
			/\bimput(er|ation)\b/,
			/\bencode\b/,
			/\bonehot\b/,
			/\bstandardscaler\b/,
			/\bminmaxscaler\b/,
			/\bscal(er|ing)\b/,
			/\bnormaliz(e|ation)\b/,
		],
	},
	{
		id: "split",
		label: "Découpage train/test",
		patterns: [
			/\btrain_test_split\b/,
			/\bsplit\b/,
			/\bstratif(y|ied|ication)\b/,
			/\bcross\s*-?val(\b|idation)/,
		],
	},
	{
		id: "training",
		label: "Entraînement du modèle",
		patterns: [
			/\btrain\b/,
			/\bentrain(ement|er)\b/,
			/\bfit\s*\(/,
			/\bclassifier\b/,
			/\bregressor\b/,
			/\bdecisiontree\b/,
			/\brandomforest\b/,
			/\blogisticregression\b/,
			/\bsvc\b/,
			/\bknn\b/,
			/\bneural\b/,
			/\bkeras\b/,
			/\btorch\b/,
		],
	},
	{
		id: "evaluation",
		label: "Évaluation",
		patterns: [
			/\baccuracy\b/,
			/\bf1\b/,
			/\bprecision\b/,
			/\brecall\b/,
			/\bconfusion\b/,
			/\bclassification_report\b/,
			/\bscore\b/,
			/\broc\b/,
			/\bauc\b/,
		],
	},
	{
		id: "visualization",
		label: "Visualisation",
		patterns: [
			/\bplot\b/,
			/\bmatplotlib\b/,
			/\bseaborn\b/,
			/\bplt\./,
			/\bsns\./,
			/\bhist\b/,
			/\bscatter\b/,
			/\bheatmap\b/,
		],
	},
	{
		id: "other",
		label: "Autres",
		patterns: [],
	},
];

export function getPipelineStageLabel(id: PipelineStageId): string {
	return PIPELINE_STAGES.find((s) => s.id === id)?.label ?? "Autres";
}

export function inferPipelineStage(cell: CodeCell): PipelineStageId {
	const desc = (cell.description ?? "").trim();
	const text = `${desc}\n${cell.code ?? ""}`.toLowerCase();

	for (const stage of PIPELINE_STAGES) {
		if (stage.id === "other") continue;
		if (stage.patterns.some((re) => re.test(text))) return stage.id;
	}
	return "other";
}
