import { useState } from "react";
import { useParams } from "react-router";
import { NavBar } from "@/components/NavBar";
import { mockDataPattern } from "@/data/patternMockData";
import PatternTitle from "@/components/patterns/PatternTitle";
import PatternSummary from "@/components/patterns/PatternSummary";
import PatternRanking from "@/components/patterns/PatternRanking";
import PatternListNotebook from "@/components/patterns/PatternListNotebook";

export default function PatternDetails() {
    const { id } = useParams();
    const [selectedNotebook, setSelectedNotebook] = useState<string | null>(null);
    const currentPattern = mockDataPattern.find(pattern => String(pattern.id) === id);

    if (!currentPattern) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-xl text-gray-500">Pattern not found</p>
            </div>
        );
    }

    const handleNotebookClick = (notebookName: string) => {
        setSelectedNotebook(notebookName);
    }

    const closeModal = () => {
        setSelectedNotebook(null);
    }

    return (
        <>
            <NavBar
                logoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwt1HL9fRcwfyF4lzGkCREKMmUv7OVyYGftYlNCNxNuENKpOCJZNxywAsv3fYra7N7uUP1&s=10"
                title="Galileo - Patterns"
            >
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    <a href="/storytelling">Storytelling</a>
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    <a href="/artefact">Artefact</a>
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                    <a href="/patterns">Patterns</a>
                </button>
            </NavBar>
            <div className="max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-12">

                <div className="border-b border-gray-200 pb-8">
                    <PatternTitle currentPattern={currentPattern} />
                    <div className="mt-6">
                        <PatternSummary pattern={currentPattern} />
                    </div>
                </div>

                <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-10 text-center">
                    <p className="text-gray-400 font-medium">Peut-être des schémas ici</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Classement par Type</h3>
                        <PatternRanking
                            currentPattern={currentPattern}
                            allPatterns={mockDataPattern}
                            criteria="type"
                        />
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Classement par Algo</h3>
                        <PatternRanking
                            currentPattern={currentPattern}
                            allPatterns={mockDataPattern}
                            criteria="algo"
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Notebooks associés</h2>
                    <PatternListNotebook pattern={currentPattern} onNotebookClick={handleNotebookClick} />
                </div>

            </div>

            {selectedNotebook && (
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
            )}
        </>
    );
}