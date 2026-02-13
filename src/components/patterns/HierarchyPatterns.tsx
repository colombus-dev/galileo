import { useMemo } from 'react';
import { GitCommit, Activity, FileCode } from 'lucide-react';

import { mockDataPattern } from "@/data/patternMockData";
import { PatternType, Counts } from "@/PatternType";

interface HierarchyPatternsProps {
    pattern: PatternType; 
    allPatterns?: PatternType[]; 
}

const calculateAverageScore = (counts: Counts): number => {
    const intervalValues: Record<string, number> = {
        '[0-0.2[': 0.1,
        '[0.2-0.4[': 0.3,
        '[0.4-0.6[': 0.5,
        '[0.6-0.8[': 0.7,
        '[0.8-1.0]': 0.9,
    };

    let totalScore = 0;
    let totalCount = 0;

    Object.entries(counts).forEach(([interval, count]) => {
        const value = count || 0;
        const weight = intervalValues[interval] || 0;

        totalScore += value * weight;
        totalCount += value;
    });
    return totalCount === 0 ? 0 : totalScore / totalCount;
};

const getScoreStyle = (score: number) => {
    if (score >= 0.7) return 'bg-green-50 text-green-700 border-green-100';
    if (score >= 0.4) return 'bg-orange-50 text-orange-700 border-orange-100';
    return 'bg-red-50 text-red-700 border-red-100';
};

const getSideBarStyle = (score: number) => {
    if (score >= 0.7) return 'bg-green-500';
    if (score >= 0.4) return 'bg-orange-500';
    return 'bg-red-500';
};

const PatternNode = ({ 
    pattern, 
    allPatterns, 
    isLastChild,
    isRoot = false 
}: { 
    pattern: PatternType, 
    allPatterns: PatternType[], 
    isLastChild: boolean,
    isRoot?: boolean 
}) => {

    const children = pattern.hierarchy.children
        ? pattern.hierarchy.children
            .map(childId => allPatterns.find(p => p.id === childId))
            .filter((p): p is PatternType => !!p)
        : [];

    const score = calculateAverageScore(pattern.counts);
    const scoreClass = getScoreStyle(score);
    const sideBarClass = getSideBarStyle(score);

    return (
        <div className={`relative ${isRoot ? 'pl-0' : 'pl-8'}`}>
            
            {!isRoot && (
                <>
                    <div className="absolute left-[-12px] top-0 w-5 h-8 border-b-2 border-l-2 border-slate-300 rounded-bl-xl" />
                    
                    {!isLastChild && (
                        <div className="absolute left-[-12px] top-0 bottom-0 w-px bg-slate-300" />
                    )}
                </>
            )}

            <div className="mb-4 relative group">
                <div className={`
                    flex items-center gap-4 p-4 rounded-lg 
                    bg-white border border-slate-200 
                    shadow-sm hover:shadow-md transition-all duration-200
                    max-w-3xl relative overflow-hidden
                `}>
                    
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${sideBarClass}`} />

                    <div className="ml-2 p-2 rounded-md bg-slate-50 text-slate-500 border border-slate-100">
                        <Activity size={18} strokeWidth={2} />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-base font-semibold text-blue-700 truncate">
                                {pattern.id}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full border border-slate-200 text-slate-600 bg-slate-50 font-medium uppercase tracking-wide">
                                {pattern.TypeAlgo}
                            </span>
                        </div>

                        <div className="text-sm text-slate-500 font-medium truncate mb-1">
                            {pattern.schema}
                        </div>
                        
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                            <FileCode size={12} />
                            <span>{Object.keys(pattern.notebooks).length} notebook(s)</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <div className={`flex items-center justify-center px-3 py-1 rounded-md border ${scoreClass}`}>
                            <span className="text-sm font-bold">{score.toFixed(2)}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                            Score Moy.
                        </span>
                    </div>
                </div>
            </div>

            {children.length > 0 && (
                <div className={`border-l-2 border-slate-300 pt-3 pb-1 ${isRoot ? 'ml-6 pl-6' : 'ml-[-12px]'}`}>
                    {children.map((child, idx) => (
                        <PatternNode
                            key={child.id}
                            pattern={child}
                            allPatterns={allPatterns}
                            isLastChild={idx === children.length - 1}
                            isRoot={false}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export const HierarchyPatterns = ({ 
    pattern, 
    allPatterns = mockDataPattern 
}: HierarchyPatternsProps) => {
    const contextPatterns = useMemo(() => {
        return Array.isArray(allPatterns) ? allPatterns : [allPatterns];
    }, [allPatterns]);

    if (!pattern) return <div className="p-8 text-slate-500 text-center bg-gray-50 rounded-lg border border-dashed border-slate-300">Aucun pattern sélectionné.</div>;

    return (
        <div className="p-8 bg-gray-50 min-h-screen font-sans">
            <header className="mb-8 flex items-center gap-3 pb-4 border-b border-slate-200">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <GitCommit size={24} />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Arborescence des Patterns</h1>
                    <p className="text-sm text-slate-500">Visualisation hiérarchique : {pattern.id}</p>
                </div>
            </header>

            <div className="pl-2">
                <PatternNode 
                    pattern={pattern} 
                    allPatterns={contextPatterns}
                    isLastChild={true}
                    isRoot={true}
                />
            </div>
        </div>
    );
};

export default HierarchyPatterns;