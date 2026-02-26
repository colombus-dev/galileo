import { useNavigate } from 'react-router';
import { type PatternType } from '@/types/PatternType';

interface PatternsListProps {
    data: PatternType[];
}

const PatternsList = ({ data }: PatternsListProps) => {
    const navigate = useNavigate();

    const getTotalFrequency = (pattern: PatternType) => {
        if (!pattern.notebooks) return 0;
        return Object.keys(pattern.notebooks).length;
    };

    const sortedPatterns = [...data].sort((a, b) => getTotalFrequency(b) - getTotalFrequency(a));

    return (
        <div className={`bg-white rounded-lg shadow-md overflow-hidden flex flex-col`}>
            <div className="p-5 border-b border-gray-100 bg-white z-10">
                <h2 className="text-lg font-semibold text-gray-800">Liste des Patterns</h2>
                <p className="text-sm text-gray-500 mt-1">
                    {data.length} patterns classés par fréquence d'apparition
                </p>
            </div>

            <div className="overflow-y-auto max-h-[600px] divide-y divide-gray-100">
                {sortedPatterns.map((pattern, index) => {
                    const frequency = getTotalFrequency(pattern);

                    return (
                        <div
                            key={pattern.id}
                            onClick={() => navigate(`/pattern/${pattern.id}`)}
                            className="p-4 hover:bg-blue-50 cursor-pointer transition-colors flex items-center justify-between group"
                        >
                            <div className="flex items-start gap-4">
                                <span className="text-gray-400 font-medium text-sm w-5 pt-0.5">
                                    #{index + 1}
                                </span>
                                
                                <div>
                                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {pattern.id}
                                    </h3>
                                    <div className="flex gap-2 mt-2">
                                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-medium border border-gray-200">
                                            {pattern.typePattern}
                                        </span>
                                        <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs font-medium border border-blue-100">
                                            {pattern.typeAlgo}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-end">
                                <span className="text-sm font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                                    {frequency} {frequency > 1 ? 'notebooks' : 'notebook'}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PatternsList;