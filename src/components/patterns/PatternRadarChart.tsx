import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Legend,
    Tooltip
} from 'recharts';
import { PatternType } from '@/PatternType';

const calculateScore = (pattern: any): number => {
    const notebooks = pattern.notebooks;
    if (!notebooks) return 0;
    
    const scores = Object.values(notebooks) as number[];
    if (scores.length === 0) return 0;
    
    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    return totalScore / scores.length;
};

const calculateAverage = (arr?: number[]): number => {
    if (!arr || !Array.isArray(arr) || arr.length === 0) return 0;
    return arr.reduce((a, b) => a + b, 0) / arr.length;
};

interface PatternRadarChartProps {
    currentPattern: PatternType;
    allPatterns: PatternType[];
}

type FilterMode = 'all' | 'type' | 'strict';

const PatternRadarChart = ({ currentPattern, allPatterns }: PatternRadarChartProps) => {
    const navigate = useNavigate();
    const [filterMode, setFilterMode] = useState<FilterMode>('all');

    const filteredPatterns = useMemo(() => {
        switch (filterMode) {
            case 'type':
                return allPatterns.filter(p => p.typePattern === currentPattern.typePattern);
            case 'strict':
                return allPatterns.filter(p => 
                    p.typePattern === currentPattern.typePattern && 
                    p.typeAlgo === currentPattern.typeAlgo
                );
            case 'all':
            default:
                return allPatterns;
        }
    }, [filterMode, allPatterns, currentPattern]);

    const chartData = useMemo(() => {
        const patternsToCompare = filteredPatterns.length > 0 ? filteredPatterns : [currentPattern];

        const stats = patternsToCompare.map(p => ({
            id: p.id,
            score: calculateScore(p),
            ram: calculateAverage(p.ram),
            time: calculateAverage(p.executionTime)
        }));

        const maxValues = {
            score: 1, 
            ram: Math.max(...stats.map(s => s.ram)) || 100, 
            time: Math.max(...stats.map(s => s.time)) || 100
        };

        const findExtreme = (metric: keyof typeof stats[0], type: 'min' | 'max') => {
            return stats.reduce((prev, curr) => {
                return (type === 'max' ? curr[metric] > prev[metric] : curr[metric] < prev[metric]) ? curr : prev;
            });
        };

        const worstPatterns = {
            score: findExtreme('score', 'min'), 
            ram: findExtreme('ram', 'max'),     
            time: findExtreme('time', 'max')    
        };

        const bestPatterns = {
            score: findExtreme('score', 'max'), 
            ram: findExtreme('ram', 'min'),     
            time: findExtreme('time', 'min')    
        };

        const avgValues = {
            score: stats.reduce((acc, s) => acc + s.score, 0) / stats.length,
            ram: stats.reduce((acc, s) => acc + s.ram, 0) / stats.length,
            time: stats.reduce((acc, s) => acc + s.time, 0) / stats.length,
        };

        const currentStats = {
            score: calculateScore(currentPattern),
            ram: calculateAverage(currentPattern.ram),
            time: calculateAverage(currentPattern.executionTime)
        };

        const normalizeScore = (val: number) => Math.min(100, Math.max(0, val * 100));
        
        const invertNormalize = (val: number, max: number) => max === 0 ? 100 : Math.max(0, 100 - ((val / max) * 100));

        return [
            {
                subject: 'Score',
                fullMark: 100,
                current: normalizeScore(currentStats.score),
                avg: normalizeScore(avgValues.score),
                best: normalizeScore(bestPatterns.score.score),
                worst: normalizeScore(worstPatterns.score.score),
                
                unit: '',
                realCurrent: currentStats.score.toFixed(2),
                realAvg: avgValues.score.toFixed(2),
                realBest: bestPatterns.score.score.toFixed(2),
                bestName: bestPatterns.score.id,
                realWorst: worstPatterns.score.score.toFixed(2),
                worstName: worstPatterns.score.id
            },
            {
                subject: 'Efficacité RAM', 
                fullMark: 100,
                current: invertNormalize(currentStats.ram, maxValues.ram),
                avg: invertNormalize(avgValues.ram, maxValues.ram),
                best: invertNormalize(bestPatterns.ram.ram, maxValues.ram),
                worst: invertNormalize(worstPatterns.ram.ram, maxValues.ram),
                
                unit: 'MB',
                realCurrent: currentStats.ram.toFixed(0),
                realAvg: avgValues.ram.toFixed(0),
                realBest: bestPatterns.ram.ram.toFixed(0),
                bestName: bestPatterns.ram.id,
                realWorst: worstPatterns.ram.ram.toFixed(0),
                worstName: worstPatterns.ram.id
            },
            {
                subject: 'Vitesse', 
                fullMark: 100,
                current: invertNormalize(currentStats.time, maxValues.time),
                avg: invertNormalize(avgValues.time, maxValues.time),
                best: invertNormalize(bestPatterns.time.time, maxValues.time),
                worst: invertNormalize(worstPatterns.time.time, maxValues.time),

                unit: 's',
                realCurrent: currentStats.time.toFixed(2),
                realAvg: avgValues.time.toFixed(2),
                realBest: bestPatterns.time.time.toFixed(2),
                bestName: bestPatterns.time.id,
                realWorst: worstPatterns.time.time.toFixed(2),
                worstName: worstPatterns.time.id
            }
        ];
    }, [currentPattern, filteredPatterns]);

    const InteractiveDot = (props: any) => {
        const { cx, cy, payload, type } = props;
        
        if (!cx || !cy) return null;

        const isBest = type === 'best';
        const color = isBest ? "#22c55e" : "#ef4444";
        const targetId = isBest ? payload.bestName : payload.worstName;

        return (
            <g 
                onClick={(e) => {
                    e.stopPropagation();
                    if (targetId) navigate(`/pattern/${targetId}`);
                }}
                className="cursor-pointer hover:opacity-80 transition-opacity"
            >
                <circle cx={cx} cy={cy} r={10} fill="transparent" />
                <circle cx={cx} cy={cy} r={4} fill={color} stroke="white" strokeWidth={1} />
            </g>
        );
    };

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-3 border border-slate-200 shadow-xl rounded-md text-xs z-50 min-w-[200px]">
                    <p className="font-bold mb-2 text-slate-800 text-sm border-b pb-1">{label}</p>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-blue-600 font-bold">Actuel:</span>
                            <span className="font-mono">{data.realCurrent} {data.unit}</span>
                        </div>
                        
                        <div className="bg-gray-50 p-1.5 rounded border border-gray-100">
                            <div className="flex justify-between text-green-700 font-medium">
                                <span>Meilleur:</span>
                                <span>{data.realBest} {data.unit}</span>
                            </div>
                            <div className="text-[10px] text-green-600/70 italic text-right truncate max-w-[150px]">
                                ({data.bestName})
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-gray-500">
                            <span>Moyenne:</span>
                            <span>{data.realAvg} {data.unit}</span>
                        </div>

                        <div className="bg-gray-50 p-1.5 rounded border border-gray-100">
                            <div className="flex justify-between text-red-600 font-medium">
                                <span>Pire:</span>
                                <span>{data.realWorst} {data.unit}</span>
                            </div>
                            <div className="text-[10px] text-red-500/70 italic text-right truncate max-w-[150px]">
                                ({data.worstName})
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-[500px] bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex flex-col items-center">
            
            <div className="w-full flex flex-row justify-between items-center mb-2 px-2">
                <h3 className="text-sm font-semibold text-slate-700">
                    Benchmark Comparatif
                </h3>
                
                <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Comparer avec:</span>
                    <select 
                        value={filterMode}
                        onChange={(e) => setFilterMode(e.target.value as FilterMode)}
                        className="text-xs border border-slate-200 rounded px-2 py-1 bg-slate-50 text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                    >
                        <option value="all">Tous les patterns</option>
                        <option value="type">Même Type ({currentPattern.typePattern})</option>
                        <option value="strict">Type & Algo ({currentPattern.typeAlgo})</option>
                    </select>
                </div>
            </div>
            
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />

                    <Radar
                        name="Pire"
                        dataKey="worst"
                        stroke="#ef4444"
                        strokeOpacity={0}
                        fill="#ef4444"
                        fillOpacity={0}
                        dot={<InteractiveDot type="worst" />}
                    />

                    <Radar
                        name="Meilleur"
                        dataKey="best"
                        stroke="#22c55e"
                        strokeOpacity={0}
                        fill="#22c55e"
                        fillOpacity={0}
                        dot={<InteractiveDot type="best" />}
                    />

                    <Radar
                        name="Moyenne"
                        dataKey="avg"
                        stroke="#64748b"
                        strokeWidth={2}
                        strokeDasharray="4 4"
                        fill="transparent"
                        dot={false}
                    />

                    <Radar
                        name={currentPattern.id}
                        dataKey="current"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        fill="#3b82f6"
                        fillOpacity={0.3}
                        dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }}
                    />

                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                        iconType="circle" 
                        wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PatternRadarChart;