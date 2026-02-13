import { useMemo } from 'react';
import { GitCommit, Activity, FileCode } from 'lucide-react';

import { mockDataPattern } from "@/data/patternMockData";
import { PatternType, Counts } from "@/PatternType";

interface HierarchyPatternsProps {
    pattern: PatternType; 
    allPatterns?: PatternType[];
    currentPatternId?: string; 
}

// ... (Les fonctions calculateAverageScore, getScoreStyle, getSideBarStyle restent inchangées) ...
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

// --- NOUVELLE FONCTION UTILITAIRE ---
// Cette fonction remonte la chaîne des parents jusqu'à trouver celui qui n'a plus de parent (la racine)
const findRootPattern = (startPattern: PatternType, allPatterns: PatternType[]): PatternType => {
    let current = startPattern;
    
    // Tant que le pattern a un parent défini...
    while (current.hierarchy.parent) {
        // ... on essaie de trouver ce parent dans la liste complète
        const parent = allPatterns.find(p => p.id === current.hierarchy.parent);
        
        if (parent) {
            // On remonte d'un cran
            current = parent;
        } else {
            // Si le parent est introuvable (donnée manquante), on s'arrête là
            break;
        }
    }
    
    return current;
};

// ... (Le composant PatternNode reste identique à ta version précédente) ...
const PatternNode = ({ 
    pattern, 
    allPatterns, 
    isLastChild,
    isRoot = false,
    currentPatternId 
}: { 
    pattern: PatternType, 
    allPatterns: PatternType[], 
    isLastChild: boolean,
    isRoot?: boolean,
    currentPatternId?: string
}) => {
    // ... (Logique inchangée : récupération des enfants, calcul du score, rendu JSX) ...
    // Je ne remets pas tout le code du PatternNode ici pour alléger, 
    // GARDE LE MÊME CODE QUE TU AVAIS DÉJÀ POUR PatternNode
    const children = pattern.hierarchy.children
        ? pattern.hierarchy.children
            .map(childId => allPatterns.find(p => p.id === childId))
            .filter((p): p is PatternType => !!p)
        : [];

    const score = calculateAverageScore(pattern.counts);
    const scoreClass = getScoreStyle(score);
    const sideBarClass = getSideBarStyle(score);

    const isSelected = currentPatternId === pattern.id;

    return (
        <div className={`relative ${isRoot ? 'pl-0' : 'pl-6'}`}>
            {!isRoot && (
                <>
                    <div className="absolute left-[-10px] top-0 w-4 h-6 border-b border-l border-slate-300 rounded-bl-lg" />
                    {!isLastChild && (
                        <div className="absolute left-[-10px] top-0 bottom-0 w-px bg-slate-300" />
                    )}
                </>
            )}

            <div className="mb-2 relative group">
                <div className={`
                    flex items-center gap-2 p-2.5 rounded-md 
                    border transition-all duration-200
                    w-full relative overflow-hidden
                    ${isSelected 
                        ? 'bg-blue-50/60 border-blue-300 shadow-sm ring-1 ring-blue-200'
                        : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
                    }
                `}>
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${sideBarClass}`} />
                    <div className={`
                        ml-2 p-1.5 rounded-md border shrink-0
                        ${isSelected ? 'bg-blue-100 text-blue-600 border-blue-200' : 'bg-slate-50 text-slate-500 border-slate-100'}
                    `}>
                        <Activity size={14} strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col">
                            <span className={`text-sm font-semibold truncate ${isSelected ? 'text-blue-800' : 'text-blue-700'}`}>
                                {pattern.id}
                            </span>
                            {isSelected && (
                                <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wide leading-tight mt-0.5">
                                    (Pattern sélectionné)
                                </span>
                            )}
                        </div>
                        {!isSelected && (
                             <div className="text-[10px] text-slate-500 font-medium truncate leading-tight mt-0.5">
                                {pattern.schema}
                             </div>
                        )}
                        <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400">
                            <FileCode size={10} />
                            <span>{Object.keys(pattern.notebooks).length} nb</span>
                            <span className="mx-1">•</span>
                            <span className="uppercase text-[9px] border px-1 rounded bg-slate-50">{pattern.TypeAlgo}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-0.5 ml-1">
                        <div className={`flex items-center justify-center px-2 py-0.5 rounded border ${scoreClass}`}>
                            <span className="text-xs font-bold">{score.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {children.length > 0 && (
                <div className={`border-l border-slate-300 pt-2 pb-1 ${isRoot ? 'ml-4 pl-4' : 'ml-[-10px]'}`}>
                    {children.map((child, idx) => (
                        <PatternNode
                            key={child.id}
                            pattern={child}
                            allPatterns={allPatterns}
                            isLastChild={idx === children.length - 1}
                            isRoot={false}
                            currentPatternId={currentPatternId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// --- MODIFICATION ICI DANS LE COMPOSANT PRINCIPAL ---
export const HierarchyPatterns = ({ 
    pattern, 
    allPatterns = mockDataPattern,
    currentPatternId
}: HierarchyPatternsProps) => {
    
    // Si currentPatternId n'est pas fourni, on utilise l'ID du pattern passé en prop
    const activeId = currentPatternId || pattern?.id;

    // Normalisation de la liste des patterns
    const contextPatterns = useMemo(() => {
        return Array.isArray(allPatterns) ? allPatterns : [allPatterns];
    }, [allPatterns]);

    // CALCUL DE LA VRAIE RACINE
    const trueRootPattern = useMemo(() => {
        if (!pattern) return null;
        // Au lieu de rendre 'pattern', on cherche son ancêtre le plus lointain
        return findRootPattern(pattern, contextPatterns);
    }, [pattern, contextPatterns]);


    if (!trueRootPattern) return <div className="p-4 text-xs text-slate-500 text-center border-dashed border">Aucun pattern.</div>;

    return (
        <div className="p-4 bg-gray-50 h-full overflow-auto font-sans">
            <header className="mb-4 flex items-center gap-2 pb-3 border-b border-slate-200">
                <div className="p-1.5 bg-blue-50 rounded text-blue-600">
                    <GitCommit size={18} />
                </div>
                <div>
                    <h1 className="text-sm font-bold text-slate-900 leading-tight">Arborescence</h1>
                    <p className="text-[10px] text-slate-500">Vue hiérarchique globale</p>
                </div>
            </header>

            <div className="pl-1">
                {/* On démarre l'affichage depuis la VRAIE RACINE (trueRootPattern) */}
                <PatternNode 
                    pattern={trueRootPattern} 
                    allPatterns={contextPatterns}
                    isLastChild={true}
                    isRoot={true}
                    // On passe l'ID actif pour qu'il soit bien surligné plus bas dans l'arbre
                    currentPatternId={activeId}
                />
            </div>
        </div>
    );
};

export default HierarchyPatterns;