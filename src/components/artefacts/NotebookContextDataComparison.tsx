import type { NotebookData } from "@/data/mockData";
import { NotebookComparisonDetailsTable } from "@/components/artefacts/NotebookComparisonDetailsTable.tsx";
import { NotebookContextDataCard } from "@/components/artefacts/NotebookContextDataCard.tsx";
import { getResponsiveNotebookColsClass, getVisibleNotebooks } from "@/utils/notebookComparison";

export type NotebookContextDataComparisonProps = {
  notebooks: NotebookData[];
  className?: string;
};

export function NotebookContextDataComparison({
  notebooks,
  className,
}: NotebookContextDataComparisonProps) {
  const visibleNotebooks = getVisibleNotebooks(notebooks);
  const cardsGridCols = getResponsiveNotebookColsClass(visibleNotebooks.length);

  if (visibleNotebooks.length < 2) return null;

  return (
    <div className={className}>
      <div className={`grid gap-4 ${cardsGridCols}`}>
        {visibleNotebooks.map((n, idx) => (
          <NotebookContextDataCard key={n.id} notebook={n} index={idx + 1} />
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
        <NotebookComparisonDetailsTable
          notebooks={visibleNotebooks}
          className="border-0 p-0"
        />
      </div>
    </div>
  );
}
