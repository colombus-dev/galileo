import { useParams } from "react-router";
import { mockDataPattern } from "@/data/patternMockData";
import PatternTitle from "@/components/patterns/PatternTitle";
import PatternSummary from "@/components/patterns/PatternSummary";
import PatternRanking from "@/components/patterns/PatternRanking";
import PatternListNotebook from "@/components/patterns/PatternListNotebook";

export default function PatternDetails() {
    const { id } = useParams();
    const currentPattern = mockDataPattern.find(pattern => String(pattern.id) === id);

    if (!currentPattern) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-xl text-gray-500">Pattern not found</p>
            </div>
        );
    }

    return (
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
                <PatternListNotebook pattern={currentPattern} />
            </div>

        </div>
    );
}