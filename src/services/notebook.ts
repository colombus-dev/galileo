import { mockNotebooks, type NotebookData } from "@/data/mockData";

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
	return mockNotebooks;
}

export async function listNotebookOptions(): Promise<NotebookOption[]> {
	const notebooks = await listNotebooks();
	return notebooks.map((n) => ({
		id: n.id,
		user: n.student,
		project: n.title,
		domain: n.context?.problem.domainLabel,
		problem: n.context?.problem.taskTypeLabel,
	}));
}

export async function getNotebookById(id: string): Promise<NotebookData | null> {
	const notebooks = await listNotebooks();
	return notebooks.find((n) => n.id === id) ?? null;
}
