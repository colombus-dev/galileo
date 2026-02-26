import type { NotebookData, NotebookPedagogicalValidationCheckpoint } from "@/data/mockData";

export type PedagogicalCheckpointCategory =
	| "data"
	| "preprocessing"
	| "split"
	| "modeling"
	| "evaluation";

function joinNotebookCode(notebook: NotebookData) {
	return notebook.cells.map((c) => c.code).join("\n\n");
}

function includesAny(haystack: string, needles: string[]) {
	return needles.some((n) => haystack.includes(n));
}

function findIndex(haystack: string, needles: string[]) {
	const indices = needles
		.map((n) => haystack.indexOf(n))
		.filter((i) => i >= 0)
		.sort((a, b) => a - b);
	return indices[0] ?? -1;
}

function isClassificationNotebook(notebook: NotebookData) {
	const t = (notebook.context?.problem.taskTypeLabel ?? "").toLowerCase();
	return t.includes("classif");
}

function isRegressionNotebook(notebook: NotebookData) {
	const t = (notebook.context?.problem.taskTypeLabel ?? "").toLowerCase();
	return t.includes("régression") || t.includes("regression");
}

function getAlgorithmLabel(notebook: NotebookData) {
	return (
		notebook.context?.methodology.algorithmLabel ??
		notebook.artifacts.find((a) => a.type === "model")?.metadata?.modelType ??
		""
	).toLowerCase();
}

function needsScaling(algorithmLabel: string) {
	return includesAny(algorithmLabel, [
		"svm",
		"svc",
		"kneighbors",
		"knn",
		"logistic",
		"linear",
		"sgd",
	]);
}

function scalingNotRequired(algorithmLabel: string) {
	return includesAny(algorithmLabel, [
		"randomforest",
		"decisiontree",
		"xgb",
		"lightgbm",
		"catboost",
	]);
}

function makeCheckpoint(
	cp: Omit<NotebookPedagogicalValidationCheckpoint, "id"> & { id: string },
): NotebookPedagogicalValidationCheckpoint {
	return cp;
}

export function buildPedagogicalCheckpoints(notebook: NotebookData): NotebookPedagogicalValidationCheckpoint[] {
	const codeRaw = joinNotebookCode(notebook);
	const code = codeRaw.toLowerCase();
	const classification = isClassificationNotebook(notebook);
	const regression = isRegressionNotebook(notebook);
	const algo = getAlgorithmLabel(notebook);

	const datasetArtifact = notebook.artifacts.find((a) => a.type === "dataset") ?? null;
	const hasDatasetLoad =
		!!datasetArtifact ||
		includesAny(code, ["pd.read_csv", "read_excel", "load_iris", "read_parquet", "read_json"]);

	const hasShape = includesAny(code, [".shape", "shape(", "print("]) && code.includes("shape");
	const hasMissingHandling = includesAny(code, ["isnull", "isna", "dropna", "fillna", "nan"]);
	const hasClassDistribution = includesAny(code, ["value_counts", "countplot", "confusion_matrix"]) ||
		notebook.artifacts.some((a) => a.type === "dataset" && (a.metadata?.classDistribution?.length ?? 0) > 0);

	const isImbalanced = (notebook.context?.data.classBalanceLabel ?? "").toLowerCase().includes("dés");
	const hasImbalanceStrategy = includesAny(code, [
		"class_weight",
		"smote",
		"randomundersampler",
		"randomoversampler",
		"scale_pos_weight",
	]);

	const hasScaler = includesAny(code, ["standardscaler", "minmaxscaler", "robustscaler", "scaler ="]);
	const hasPipeline = includesAny(code, ["pipeline(", "make_pipeline("]);

	const iSplit = findIndex(code, ["train_test_split", "stratify="]);
	const iScaleFitTransform = findIndex(code, ["fit_transform(", "scaler.fit("]);
	const scaleBeforeSplit = iScaleFitTransform >= 0 && iSplit >= 0 && iScaleFitTransform < iSplit;

	const hasTrainTestSplit = code.includes("train_test_split");
	const hasStratify = code.includes("stratify=");
	const hasRandomState = code.includes("random_state=");
	const hasCrossVal = includesAny(code, ["cross_val_score", "cross_validate", "stratifiedkfold", "kfold"]);

	const hasFitOnTrain = includesAny(code, [".fit(x_train", "fit(x_train", "fit(xtrain", "fit(x_tr", "fit(x_train,"]);
	const hasPredictOnTest = includesAny(code, ["predict(x_test", ".predict(x_test", "score(x_test", ".score(x_test"]);

	const evaluatedOn = (notebook.context?.methodology.evaluatedOnLabel ?? "").toLowerCase();
	const contextEvalOnTest = evaluatedOn.includes("test");
	const contextEvalOnTrain = evaluatedOn.includes("train");

	const hasAccuracy = includesAny(code, ["accuracy_score", "accuracy =", "metric: 'accuracy'"]);
	const hasF1 = includesAny(code, ["f1_score", "f1-macro", "f1_macro", "f1 "]);
	const hasConfusionMatrix = includesAny(code, ["confusion_matrix", "heatmap(cm", "cm = confusion_matrix"]) ||
		notebook.artifacts.some((a) => a.type === "visualization" && (a.className ?? "").toLowerCase() === "cm");

	const checkpoints: NotebookPedagogicalValidationCheckpoint[] = [];

	// 1) Données
	checkpoints.push(
		makeCheckpoint({
			id: "data-dataset-loaded",
			category: "data",
			title: "Dataset chargé correctement",
			description: "Le notebook charge un dataset (artefact dataset ou fonction de chargement détectée).",
			status: hasDatasetLoad ? "success" : "error",
			detail: hasDatasetLoad
				? "Chargement détecté via artefact dataset ou appels de lecture."
				: "Aucun chargement clair détecté (artefact dataset manquant et lecture non repérée).",
		}),
	);

	checkpoints.push(
		makeCheckpoint({
			id: "data-shape",
			category: "data",
			title: "Nombre d’échantillons/features cohérent",
			description: "Le notebook expose la dimension des données (ex: df.shape).",
			status: hasShape ? "success" : "warning",
			detail: hasShape ? "Référence à shape détectée." : "Pas de trace claire de df.shape / dimensions.",
		}),
	);

	checkpoints.push(
		makeCheckpoint({
			id: "data-missing-values",
			category: "data",
			title: "Valeurs manquantes traitées",
			description: "Vérifie NaN et applique une stratégie (dropna/fillna) si nécessaire.",
			status: hasMissingHandling ? "success" : "warning",
			detail: hasMissingHandling
				? "Détection de isnull/isna/dropna/fillna ou mention de NaN."
				: "Aucune vérification/gestion de NaN détectée.",
		}),
	);

	if (classification) {
		checkpoints.push(
			makeCheckpoint({
				id: "data-class-distribution",
				category: "data",
				title: "Distribution des classes vérifiée",
				description: "Le notebook vérifie value_counts() / distribution (ou renseigne la distribution dans les artefacts).",
				status: hasClassDistribution ? "success" : "warning",
				detail: hasClassDistribution
					? "Distribution détectée (code ou artefact)."
					: "Pas de value_counts/countplot ni distribution dans les artefacts.",
			}),
		);

		if (isImbalanced) {
			checkpoints.push(
				makeCheckpoint({
					id: "data-imbalance-strategy",
					category: "data",
					title: "Stratégie si classes déséquilibrées",
					description: "Si les classes sont déséquilibrées, une stratégie doit être mise en place.",
					status: hasImbalanceStrategy ? "success" : "warning",
					detail: hasImbalanceStrategy
						? "Stratégie détectée (class_weight/SMOTE/under/over-sampling)."
						: "Aucune stratégie explicite détectée.",
				}),
			);
		}
	}

	// 2) Préprocessing
	if (needsScaling(algo)) {
		checkpoints.push(
			makeCheckpoint({
				id: "prep-scaling",
				category: "preprocessing",
				title: "Scaling adapté au modèle",
				description: "Certains modèles (SVM/KNN/régression) nécessitent un scaling.",
				status: hasScaler || hasPipeline ? "success" : "warning",
				detail: hasScaler || hasPipeline
					? "Scaler/Pipeline détecté."
					: "Modèle sensible au scaling mais aucun scaler/pipeline détecté.",
			}),
		);
	} else if (scalingNotRequired(algo)) {
		checkpoints.push(
			makeCheckpoint({
				id: "prep-scaling",
				category: "preprocessing",
				title: "Scaling cohérent",
				description: "Pour ce modèle, le scaling n’est pas obligatoire.",
				status: "success",
				detail: "Arbres/forêts: scaling généralement optionnel.",
			}),
		);
	} else {
		checkpoints.push(
			makeCheckpoint({
				id: "prep-scaling",
				category: "preprocessing",
				title: "Scaling (si nécessaire)",
				description: "Vérifier si le scaling est pertinent selon le modèle et les features.",
				status: hasScaler || hasPipeline ? "success" : "warning",
				detail: hasScaler || hasPipeline ? "Scaler/Pipeline détecté." : "Pas de scaler/pipeline détecté.",
			}),
		);
	}

	checkpoints.push(
		makeCheckpoint({
			id: "prep-feature-selection",
			category: "preprocessing",
			title: "Feature selection justifiée (bonus)",
			description: "Réduction de features via PCA/SelectKBest/RFE si pertinent.",
			status: includesAny(code, ["pca", "selectkbest", "rfe", "feature_selection"]) ? "success" : "warning",
			detail: includesAny(code, ["pca", "selectkbest", "rfe", "feature_selection"]) ? "Feature selection détectée." : "Aucune feature selection détectée.",
		}),
	);

	checkpoints.push(
		makeCheckpoint({
			id: "prep-no-leakage",
			category: "preprocessing",
			title: "Pas de data leakage",
			description: "Pré-traitement fit sur train seulement (pipeline recommandé).",
			status: hasPipeline
				? "success"
				: scaleBeforeSplit
					? "error"
					: "warning",
			detail: hasPipeline
				? "Pipeline détecté (bonne pratique pour éviter leakage)."
				: scaleBeforeSplit
					? "fit_transform/scaler.fit détecté avant train_test_split → risque de leakage."
					: "Impossible de confirmer l'absence de leakage (pipeline non détecté).",
		}),
	);

	// 3) Split & validation
	checkpoints.push(
		makeCheckpoint({
			id: "split-train-test",
			category: "split",
			title: "Train/Test séparés",
			description: "Le notebook doit effectuer un split train/test.",
			status: hasTrainTestSplit ? "success" : "error",
			detail: hasTrainTestSplit ? "train_test_split détecté." : "Aucun train_test_split détecté.",
		}),
	);

	if (classification) {
		checkpoints.push(
			makeCheckpoint({
				id: "split-stratify",
				category: "split",
				title: "Stratification (classification)",
				description: "En classification, utiliser stratify=y est recommandé.",
				status: hasStratify ? "success" : "warning",
				detail: hasStratify ? "stratify= détecté." : "stratify= non détecté.",
			}),
		);
	}

	checkpoints.push(
		makeCheckpoint({
			id: "split-random-state",
			category: "split",
			title: "random_state fixé",
			description: "Assure la reproductibilité des résultats.",
			status: hasRandomState ? "success" : "warning",
			detail: hasRandomState ? "random_state= détecté." : "random_state= non détecté.",
		}),
	);

	checkpoints.push(
		makeCheckpoint({
			id: "split-cross-val",
			category: "split",
			title: "Validation croisée (bonus)",
			description: "cross_val_score/cross_validate pour une évaluation plus robuste.",
			status: hasCrossVal ? "success" : "warning",
			detail: hasCrossVal ? "Validation croisée détectée." : "Pas de validation croisée détectée.",
		}),
	);

	// 4) Modélisation
	checkpoints.push(
		makeCheckpoint({
			id: "model-adapted",
			category: "modeling",
			title: "Modèle adapté au problème",
			description: "Classifier pour classification / Regressor pour régression.",
			status:
				classification && algo.includes("regressor")
					? "warning"
					: regression && algo.includes("classifier")
						? "warning"
						: "success",
			detail:
				classification && algo.includes("regressor")
					? `Algo détecté: ${algo} (semble régression).`
					: regression && algo.includes("classifier")
						? `Algo détecté: ${algo} (semble classification).`
						: algo
							? `Algo détecté: ${algo}.`
							: "Aucun algorithme clairement détecté.",
		}),
	);

	checkpoints.push(
		makeCheckpoint({
			id: "model-hyperparams",
			category: "modeling",
			title: "Hyperparamètres visibles",
			description: "Le notebook explicite les hyperparamètres (pas uniquement les valeurs par défaut).",
			status: includesAny(code, ["n_estimators=", "max_depth=", "min_samples", "c=", "gamma=", "alpha=", "l1_ratio="]) ? "success" : "warning",
			detail: includesAny(code, ["n_estimators=", "max_depth=", "c=", "gamma="])
				? "Hyperparamètres détectés."
				: "Aucun hyperparamètre explicite détecté (à confirmer).",
		}),
	);

	checkpoints.push(
		makeCheckpoint({
			id: "model-fit-after-split",
			category: "modeling",
			title: "Modèle entraîné après split",
			description: "Entraînement sur X_train, y_train.",
			status: hasFitOnTrain ? "success" : "warning",
			detail: hasFitOnTrain ? "fit(X_train, y_train) détecté." : "fit sur X_train non détecté.",
		}),
	);

	// 5) Évaluation & cohérence
	checkpoints.push(
		makeCheckpoint({
			id: "eval-on-test",
			category: "evaluation",
			title: "Évaluation sur test",
			description: "La performance doit être évaluée sur X_test (ou via validation).",
			status: contextEvalOnTest || hasPredictOnTest ? "success" : contextEvalOnTrain ? "error" : "warning",
			detail: contextEvalOnTest
				? "Le contexte indique une évaluation sur Test."
				: hasPredictOnTest
					? "predict/score sur X_test détecté."
					: contextEvalOnTrain
						? "Le contexte indique une évaluation sur Train."
						: "Impossible de confirmer l'ensemble d'évaluation.",
		}),
	);

	checkpoints.push(
		makeCheckpoint({
			id: "eval-metric-adapted",
			category: "evaluation",
			title: "Métrique adaptée",
			description: "Accuracy pour classification (mais pas seule si déséquilibre).",
			status: classification
				? isImbalanced && hasAccuracy && !hasF1
					? "warning"
					: hasAccuracy || hasF1
						? "success"
						: "warning"
				: "warning",
			detail: classification
				? isImbalanced && hasAccuracy && !hasF1
					? "Classes déséquilibrées: ajouter F1-macro/balanced accuracy." 
					: hasAccuracy || hasF1
						? "Métriques détectées." 
						: "Aucune métrique claire détectée." 
				: "Vérifier les métriques selon le type de tâche.",
		}),
	);

	checkpoints.push(
		makeCheckpoint({
			id: "eval-confusion-matrix",
			category: "evaluation",
			title: "Matrice de confusion (bonus)",
			description: "Très pédagogique pour comprendre les erreurs par classe.",
			status: hasConfusionMatrix ? "success" : "warning",
			detail: hasConfusionMatrix ? "Matrice de confusion détectée." : "Pas de matrice de confusion détectée.",
		}),
	);

	checkpoints.push(
		makeCheckpoint({
			id: "eval-overfitting",
			category: "evaluation",
			title: "Sur-apprentissage (overfitting) surveillé",
			description: "Comparer performance train vs test (écart important → suspect).",
			status: contextEvalOnTrain && !contextEvalOnTest ? "warning" : "warning",
			detail:
				"Détection automatique limitée sans exécuter le notebook. Si possible, loggez score train et test pour comparaison.",
		}),
	);

	return checkpoints;
}
