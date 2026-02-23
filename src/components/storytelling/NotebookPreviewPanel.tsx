import type { NotebookModel } from '@/types/notebook';
import { MdRefresh, MdCheckCircle } from 'react-icons/md';
import { CodeCell } from './CodeCell';

export interface NotebookPreviewPanelProps {
  notebook: NotebookModel | null;
  fileName?: string;
  onRefresh?: () => void;
  loading?: boolean;
}

export const NotebookPreviewPanel: React.FC<NotebookPreviewPanelProps> = ({
  notebook,
  fileName,
  onRefresh,
  loading = false,
}) => {

  if (!notebook) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <p>No notebook loaded</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <MdCheckCircle className="text-green-500" />
          <span className="font-medium text-sm">{fileName || 'Notebook'}</span>
        </div>
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={loading}
            className="p-1 hover:bg-gray-100 rounded transition-colors disabled:opacity-50"
            title="Refresh notebook"
          >
            <MdRefresh className={loading ? 'animate-spin' : ''} />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-400">Loading...</span>
          </div>
        ) : (
          <div className="space-y-3">
            {notebook.cells?.map((cell) => (
              <div key={cell.id} className="border border-gray-200 rounded p-3">
                {cell.type === 'code' ? (
                  <CodeCell cell={cell} />
                ) : (
                  <div className="text-sm text-gray-600">
                    <p>{cell.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
