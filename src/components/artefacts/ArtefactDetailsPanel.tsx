import { useEffect, useMemo, useState } from "react";
import { MdCode } from "react-icons/md";

import type { Artifact, CodeCell } from "@/data/mockData";
import { CodeViewer } from "@/components/artefacts/CodeViewer";
import { DocModal } from "@/components/DocModal";
import { CommentBox } from "@/components/artefacts/CommentBox";
import { useArtefactDocumentation } from "@/hooks/useArtefactDocumentation";

export interface ArtefactDetailsPanelProps {
	artifact: Artifact | null;
	cells: CodeCell[];
	onClose?: () => void;
}

export function ArtefactDetailsPanel({ artifact, cells, onClose }: ArtefactDetailsPanelProps) {
	const [showComments] = useState(true);
	const [comment, setComment] = useState("");
	const {
		isDocModalOpen,
		docEntry,
		loading,
		error,
		handleDocKeyClick,
		closeDocModal,
	} = useArtefactDocumentation();

	// Fermer avec Escape (seulement si le DocModal n'est pas ouvert)
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && onClose && !isDocModalOpen) {
				onClose();
			}
		};

		if (onClose && !isDocModalOpen) {
			document.addEventListener('keydown', handleEscape);
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, [onClose, isDocModalOpen]);

	const cell = useMemo(() => {
		if (!artifact) return null;
		return cells.find((c) => c.index === artifact.cellIndex) ?? null;
	}, [artifact, cells]);

	return (
		<div className="h-full rounded-2xl border border-blue-200 bg-white overflow-hidden flex flex-col">
			<div className="shrink-0 flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50">
				<div className="flex-1">
					<h3 className="text-base font-semibold text-slate-900">Détails</h3>
					{onClose && (
						<p className="text-xs text-slate-400 mt-1">
							Appuyez sur <kbd className="px-1 py-0.5 bg-slate-200 rounded text-slate-700 font-mono text-xs">Esc</kbd>
						</p>
					)}
				</div>
				{onClose ? (
					<button
						type="button"
						onClick={onClose}
						className="text-sm text-slate-600 hover:text-slate-900 flex-shrink-0"
						aria-label="Fermer les détails"
					>
						Fermer
					</button>
				) : null}
			</div>

			{artifact ? (
				<div className="flex-1 min-h-0 overflow-y-auto px-7 pb-7">
					<div className="flex items-center gap-3 text-slate-900">
						<MdCode className="text-xl text-slate-700" />
						<div className="text-lg font-medium">
							Code source - Cellule {artifact.cellIndex}
						</div>
					</div>

					{cell?.description ? (
						<p className="mt-4 text-slate-600">{cell.description}</p>
					) : artifact.description ? (
						<p className="mt-4 text-slate-600">{artifact.description}</p>
					) : null}

					{cell?.code ? (
						<div className="mt-6">
							<CodeViewer
								code={cell.code}
								language="python"
								className="max-w-none w-full"
								enableDocLinks={true}
								onDocKeyClick={handleDocKeyClick}
							/>
						</div>
					) : (
						<div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
							Code indisponible pour cette cellule.
						</div>
					)}

					<div className="mt-8 border-t border-slate-200" />

					<div className="mt-8">
						{showComments ? (
							<div className="mt-4">
								<CommentBox
									value={comment}
									onChange={setComment}
									label="Commentaires sur cet artefact"
									className="max-w-none"
								/>
							</div>
						) : null}
					</div>
				</div>
			) : (
				<div className="flex-1 min-h-0 overflow-y-auto px-6 pb-6 text-sm text-slate-600">
					Sélectionne un artefact pour afficher son code et ses commentaires.
				</div>
			)}
			<DocModal
				isOpen={isDocModalOpen}
				docEntry={docEntry}
				loading={loading}
				error={error}
				onClose={closeDocModal}
				sidePanel={true}
			/>
		</div>
	);
}
