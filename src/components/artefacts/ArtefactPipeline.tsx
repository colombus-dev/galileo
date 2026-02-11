import { useMemo, useState } from "react";
import type { Artifact, CodeCell } from "@/data/mockData";
import { ArtefactDetailsPanel } from "@/components/artefacts/ArtefactDetailsPanel";
import { ArtefactItem } from "@/components/artefacts/ArtefactItem";

export interface ArtefactPipelineProps {
	artifacts: Artifact[];
	cells: CodeCell[];
	className?: string;
}

export function ArtefactPipeline({
	artifacts,
	cells,
	className,
}: ArtefactPipelineProps) {
	const [selectedArtifactId, setSelectedArtifactId] = useState<string | null>(null);

	const selectedArtifact = useMemo(
		() => (selectedArtifactId ? artifacts.find((a) => a.id === selectedArtifactId) ?? null : null),
		[artifacts, selectedArtifactId],
	);

	return (
		<div className={className}>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
				{artifacts.length === 0 ? (
					<div className="text-slate-600">Aucun artefact ne correspond à ta recherche.</div>
				) : (
					artifacts.map((artifact) => (
						<div key={artifact.id} className="min-h-[260px]">
							<ArtefactItem
								artifact={artifact}
								selected={artifact.id === selectedArtifactId}
								onClick={() => setSelectedArtifactId(artifact.id)}
							/>
						</div>
					))
				)}
			</div>

			{selectedArtifact ? (
				<div className="fixed inset-0 z-40">
					<button
						type="button"
						onClick={() => setSelectedArtifactId(null)}
						className="absolute inset-0 bg-slate-900/20"
						aria-label="Fermer les détails"
					/>
					<div className="absolute right-6 top-6 bottom-6 w-[520px] max-w-[calc(100vw-48px)]">
						<ArtefactDetailsPanel
							artifact={selectedArtifact}
							cells={cells}
							onClose={() => setSelectedArtifactId(null)}
						/>
					</div>
				</div>
			) : null}
		</div>
	);
}
