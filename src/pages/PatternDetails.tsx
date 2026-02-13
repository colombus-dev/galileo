import { useState } from "react";
import { useParams } from "react-router";
import { NavBar } from "@/components/NavBar";
import { mockDataPattern } from "@/data/patternMockData";
import PatternTitle from "@/components/patterns/PatternTitle";
import PatternSummary from "@/components/patterns/PatternSummary";
import PatternRanking from "@/components/patterns/PatternRanking";
import PatternListNotebook from "@/components/patterns/PatternListNotebook";
import { CodeNotebookModal } from "@/components/patterns/CodeNotebookModal";
import HierarchyPatterns from "@/components/patterns/HierarchyPatterns";

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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                <div className="lg:col-span-2 space-y-8 m-2">

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

                <div className="lg:col-span-1 sticky top-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <HierarchyPatterns pattern={currentPattern} allPatterns={mockDataPattern} />
                    </div>
                </div>

            </div>

            {selectedNotebook && (
                <CodeNotebookModal
                    selectedNotebook={selectedNotebook}
                    closeModal={closeModal}
                />
            )}
        </>
    );
}