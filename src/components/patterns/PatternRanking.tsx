import React, { useMemo } from 'react';
import { PatternType } from "@/PatternType";
import { mockDataPattern } from '@/data/patternMockData';

interface PatternRankingProps {
    currentPattern: PatternType;
    allPatterns?: PatternType[]; 
    criteria: 'type' | 'algo';
    className?: string;
}

const getAverageScore = (pattern: PatternType): number => {
    const bucketMidpoints: Record<string, number> = {
        '[0-0.2[': 0.1, '[0.2-0.4[': 0.3, '[0.4-0.6[': 0.5, '[0.6-0.8[': 0.7, '[0.8-1.0]': 0.9
    };
    
    const totalFreq = Object.values(pattern.counts).reduce((a, b) => a + b, 0);
    if (totalFreq === 0) return 0;
    
    let weightedSum = 0;
    Object.entries(pattern.counts).forEach(([bucket, count]) => {
        weightedSum += (bucketMidpoints[bucket] || 0) * count;
    });
    
    return weightedSum / totalFreq;
};

const getScoreColor = (score: number) => {
    if (score < 0.3) return 'text-red-600 bg-red-50';
    if (score < 0.7) return 'text-orange-600 bg-orange-50';
    return 'text-green-600 bg-green-50';
};

export const PatternRanking: React.FC<PatternRankingProps> = ({ 
    currentPattern, 
    allPatterns = mockDataPattern, 
    criteria, 
    className = '' 
}) => {

    const fullRankingData = useMemo(() => {
        const groupValue = criteria === 'type' ? currentPattern.typePattern : currentPattern.typeAlgo;

        const sameGroupPatterns = allPatterns.filter(p => 
            (criteria === 'type' ? p.typePattern : p.typeAlgo) === groupValue
        );

        return sameGroupPatterns
            .map(p => ({ ...p, score: getAverageScore(p) }))
            .sort((a, b) => b.score - a.score); 
    }, [currentPattern, allPatterns, criteria]);

    const displayItems = useMemo(() => {
        const currentIndex = fullRankingData.findIndex(p => p.id === currentPattern.id);
        
        if (fullRankingData.length <= 5 || currentIndex < 4) {
            return fullRankingData.slice(0, 5);
        }

        const top4 = fullRankingData.slice(0, 4);
        const currentItemWithRank = fullRankingData[currentIndex];
        
        return [...top4, 'SEPARATOR', currentItemWithRank];
    }, [fullRankingData, currentPattern]);

    return (
        <div className={`bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col overflow-hidden ${className}`}>
            
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Classement par {criteria === 'type' ? 'Type' : 'Algorithme'}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                    Groupe : <span className="font-semibold text-gray-900">
                        {criteria === 'type' ? currentPattern.typePattern : currentPattern.typeAlgo}
                    </span>
                </p>
            </div>

            <div className="overflow-y-auto p-2 space-y-1">
                {displayItems.map((item, index) => {
                    
                    if (item === 'SEPARATOR') {
                        return (
                            <div key="sep" className="flex justify-center py-1">
                                <span className="text-gray-400 text-xs tracking-widest">. . .</span>
                            </div>
                        );
                    }

                    const patternItem = item as typeof fullRankingData[0];
                    
                    const realRank = fullRankingData.findIndex(p => p.id === patternItem.id) + 1;
                    const isCurrent = patternItem.id === currentPattern.id;

                    return (
                        <div 
                            key={patternItem.id}
                            className={`
                                flex items-center justify-between p-2.5 rounded-lg text-sm transition-colors border
                                ${isCurrent 
                                    ? 'bg-blue-50 border-blue-200 shadow-sm z-10' 
                                    : 'bg-white border-transparent hover:bg-gray-50 hover:border-gray-100'
                                }
                            `}
                        >
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className={`
                                    flex items-center justify-center w-6 h-6 rounded-full font-bold text-xs shrink-0
                                `}>
                                    {realRank}
                                </div>

                                <div className="flex flex-col truncate">
                                    <span className={`truncate font-medium ${isCurrent ? 'text-blue-800' : 'text-gray-700'}`}>
                                        {patternItem.id}
                                    </span>
                                    {isCurrent && (
                                        <span className="text-[10px] text-blue-500 font-semibold uppercase tracking-wider leading-none">
                                            (Pattern sélectionné)
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${getScoreColor(patternItem.score)}`}>
                                {patternItem.score.toFixed(2)}
                            </div>
                        </div>
                    );
                })}

                {fullRankingData.length === 0 && (
                    <div className="text-center py-4 text-gray-400 text-xs italic">
                        Aucune donnée disponible.
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatternRanking;