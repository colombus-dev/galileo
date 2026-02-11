import React from 'react';
import { PatternType } from "@/PatternType"; 

interface PatternSummaryProps {
    pattern: PatternType;
    className?: string;
}

const bucketMidpoints: Record<string, number> = {
    '[0-0.2[': 0.1, '[0.2-0.4[': 0.3, '[0.4-0.6[': 0.5, '[0.6-0.8[': 0.7, '[0.8-1.0]': 0.9
};

export const PatternSummary: React.FC<PatternSummaryProps> = ({ pattern, className = '' }) => {
    
    const totalFrequency = Object.values(pattern.counts).reduce((sum, count) => sum + count, 0);

    let weightedScoreSum = 0;
    Object.entries(pattern.counts).forEach(([bucket, count]) => {
        const midpoint = bucketMidpoints[bucket] || 0;
        weightedScoreSum += midpoint * count;
    });

    const averageScore = totalFrequency > 0 
        ? (weightedScoreSum / totalFrequency).toFixed(2) 
        : "N/A";


    return (
        <div className={`flex flex-row items-center justify-between w-full p-3 bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
            
            <div className="flex items-center gap-3">
                <span className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wide border bg-blue-50 text-blue-700 border-blue-200`}>
                    {pattern.TypePattern}
                </span>

                <span className="text-sm font-semibold text-gray-800">
                    {pattern.TypeAlgo}
                </span>
            </div>

            <div className="flex items-center gap-6 text-sm">
                
                <div className="flex items-center gap-2">
                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Freq.</span>
                    <span className="font-mono font-bold text-gray-900">
                        {new Intl.NumberFormat('fr-FR').format(totalFrequency)}
                    </span>
                </div>

                <div className="h-4 w-px bg-gray-200"></div>

                <div className="flex items-center gap-2">
                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Score moy.</span>
                    <span className="font-mono font-bold text-gray-900">
                        {averageScore}
                    </span>
                </div>

            </div>
        </div>
    );
};

export default PatternSummary;