import React, { useEffect } from 'react';
import { CodeNotebook } from "./CodeNotebook";

interface CodeNotebookModalProps {
    selectedNotebook: string;
    closeModal: () => void;
}

export const CodeNotebookModal: React.FC<CodeNotebookModalProps> = ({
    selectedNotebook,
    closeModal
}) => {
    // Fermer avec Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };

        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'auto';
        };
    }, [closeModal]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={closeModal}
        >
            <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">Détails du Notebook</h3>
                        <p className="text-xs text-gray-400 mt-1">
                            Appuyez sur <kbd className="px-1 py-0.5 bg-gray-200 rounded text-gray-700 font-mono text-xs">Esc</kbd>
                        </p>
                    </div>
                    <button
                        onClick={closeModal}
                        className="p-1 rounded-full hover:bg-gray-200 text-gray-500 transition-colors flex-shrink-0"
                        aria-label="Fermer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div className="p-6">
                    <p className="text-sm text-gray-600 mb-2">Notebook sélectionné :</p>
                    <div className="p-3 bg-blue-50 text-blue-800 rounded-lg font-mono text-sm break-all">
                        {selectedNotebook}
                    </div>
                    <CodeNotebook
                        titleCode="Exemple de code"
                        code={`def example_function():
    print("Hello, World!")`}
                    />
                </div>

                <div className="p-4 border-t border-gray-100 flex justify-end">
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
}

