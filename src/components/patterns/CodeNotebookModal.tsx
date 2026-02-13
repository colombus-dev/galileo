interface CodeNotebookModalProps {
    selectedNotebook: string;
    closeModal: () => void;
}

export const CodeNotebookModal: React.FC<CodeNotebookModalProps> = ({
    selectedNotebook,
    closeModal
}) => {
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
                    <h3 className="font-semibold text-gray-800">Détails du Notebook</h3>
                    <button
                        onClick={closeModal}
                        className="p-1 rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
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
                    <div className="mt-4 rounded-lg bg-slate-900 shadow-xl overflow-hidden border border-slate-800 text-left">

                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border-b border-slate-700">
                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            <span className="ml-2 text-xs text-slate-500 font-mono">source.py</span>
                        </div>

                        <div className="p-4 overflow-x-auto">
                            <pre className="font-mono text-sm leading-6 text-slate-300">
                                <code>
                                    {`# Code associé au notebook`}
                                </code>
                            </pre>
                        </div>
                    </div>
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

