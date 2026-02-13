import React from 'react';
import { PatternType } from "@/PatternType"; 

interface PatternListNotebookProps {
    pattern: PatternType;
    onNotebookClick?: (notebookName: string) => void;
}

export const PatternListNotebook: React.FC<PatternListNotebookProps> = ({ 
    pattern, 
    onNotebookClick,
}) => {
    
    const notebookList = Object.entries(pattern.notebooks || {})
        .map(([name, score]) => ({ name, score }))
        .sort((a, b) => b.score - a.score);

    if (notebookList.length === 0) {
        return (
            <div className={`p-4 text-sm text-gray-500 italic bg-gray-50 rounded-lg border border-gray-100`}>
                Aucun notebook associé à ce pattern.
            </div>
        );
    }

    const handleNotebookClick = (notebookName: string) => {
        if (onNotebookClick) {
            onNotebookClick(notebookName);
        }
    };

    return (
        <div className={`flex flex-col`}>
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">
                Notebooks Sources ({notebookList.length})
            </h3>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                {notebookList.map((nb, index) => (
                    <div 
                        key={nb.name} 
                        onClick={() => handleNotebookClick(nb.name)}
                        className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0 hover:bg-blue-50 transition-colors group cursor-pointer" // Ajout de cursor-pointer
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-orange-100 text-orange-600 rounded-lg">
                                <span className="text-xs font-bold">Nb</span>
                            </div>
                            
                            <div className="flex flex-col min-w-0">
                                <span className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-700" title={nb.name}>
                                    {nb.name}
                                </span>
                                <span className="text-xs text-gray-400">
                                    Jupyter Notebook
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-1 ml-4">
                            <span className="text-xs font-bold text-gray-600">
                                {Math.round(nb.score * 100)}%
                            </span>
                            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-blue-500 rounded-full" 
                                    style={{ width: `${nb.score * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PatternListNotebook;