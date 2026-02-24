import React from 'react';
import { PatternType } from "@/types/PatternType"; 

interface PatternSummaryProps {
    pattern: PatternType;
    className?: string;
}

export const PatternSummary: React.FC<PatternSummaryProps> = ({ pattern, className = '' }) => {
    
    const totalFrequency = pattern.notebooks ? Object.keys(pattern.notebooks).length : 0;

    const scores = pattern.notebooks ? Object.values(pattern.notebooks) : [];
    const rawScore = totalFrequency > 0 
        ? scores.reduce((sum, score) => sum + score, 0) / totalFrequency 
        : 0;
    
    const displayScore = totalFrequency > 0 ? rawScore.toFixed(2) : "N/A";

    const getScoreStyles = (score: number) => {
        if (totalFrequency === 0) return 'bg-gray-100 text-gray-400 border-gray-200';
        
        if (score < 0.3) {
            return 'bg-red-100 text-red-700 border-red-200'; 
        } else if (score < 0.7) {
            return 'bg-orange-100 text-orange-700 border-orange-200';
        } else {
            return 'bg-green-100 text-green-700 border-green-200';
        }
    };

    return (
        <div className={`flex flex-row items-center justify-between w-full p-3 bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
            
            <div className="flex items-center gap-3">
                <span className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wide border bg-blue-50 text-blue-700 border-blue-200`}>
                    {pattern.typePattern}
                </span>

                <span className="text-sm font-semibold text-gray-800">
                    {pattern.typeAlgo}
                </span>
            </div>

            <div className="flex items-center gap-6 text-sm">

                <div className="flex items-center gap-2">
                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Notebooks</span>
                    <span className="font-mono font-bold text-gray-900">
                        {new Intl.NumberFormat('fr-FR').format(totalFrequency)}
                    </span>
                </div>

                <div className="h-4 w-px bg-gray-200"></div>

                <div className={`flex items-center gap-2 px-2 py-1 rounded border ${getScoreStyles(rawScore)} transition-colors`}>
                    <span className="text-xs uppercase font-bold tracking-wider opacity-80">Score moy.</span>
                    <span className="font-mono font-bold">
                        {displayScore}
                    </span>
                </div>

            </div>
        </div>
    );
};

export default PatternSummary;