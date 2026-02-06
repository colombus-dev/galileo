import { mockNotebooks, type NotebookData } from "@/data/mockData";

export interface NotebookOption {
	id: string;
	user: string;
	project: string;
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
		project: n.title
	}));
}
