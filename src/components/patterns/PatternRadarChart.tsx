import { useMemo } from 'react';
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
import { PatternType, Counts } from '@/PatternType';


const calculateScore = (pattern: any): number => {
    const counts = pattern.score || pattern.counts;
    if (!counts) return 0;

    const weights: Record<string, number> = {
        '[0-0.2[': 0.1,
        '[0.2-0.4[': 0.3,
        '[0.4-0.6[': 0.5,
        '[0.6-0.8[': 0.7,
        '[0.8-1.0]': 0.9,
    };
    let totalScore = 0;
    let totalCount = 0;
    Object.entries(counts as Counts).forEach(([key, val]) => {
        const count = val || 0;
        totalScore += count * (weights[key] || 0);
        totalCount += count;
    });
    return totalCount === 0 ? 0 : totalScore / totalCount;
};

const calculateAverage = (arr?: number[]): number => {
    if (!arr || !Array.isArray(arr) || arr.length === 0) return 0;
    return arr.reduce((a, b) => a + b, 0) / arr.length;
};

interface PatternRadarChartProps {
    currentPattern: PatternType;
    allPatterns: PatternType[];
}

const PatternRadarChart = ({ currentPattern, allPatterns }: PatternRadarChartProps) => {

    const chartData = useMemo(() => {
        const stats = allPatterns.map(p => ({
            score: calculateScore(p),
            ram: calculateAverage(p.ram),
            time: calculateAverage(p.executionTime)
        }));

        const globalMax = {
            score: 1, // Le score max théorique est 1
            ram: Math.max(...stats.map(s => s.ram)),
            time: Math.max(...stats.map(s => s.time))
        };

        const globalMin = {
            score: 0,
            ram: Math.min(...stats.map(s => s.ram)),
            time: Math.min(...stats.map(s => s.time))
        };

        const bestScenario = {
            score: Math.max(...stats.map(s => s.score)), 
            ram: globalMin.ram,
            time: globalMin.time
        };

        const worstScenario = {
            score: Math.min(...stats.map(s => s.score)),
            ram: globalMax.ram,
            time: globalMax.time
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

        const scaleMax = {
            score: 1, 
            ram: globalMax.ram === 0 ? 100 : globalMax.ram,
            time: globalMax.time === 0 ? 100 : globalMax.time
        };

        const normalize = (val: number, max: number) => (val / max) * 100;

        return [
            {
                subject: 'Score',
                fullMark: 100,
                current: normalize(currentStats.score, scaleMax.score),
                avg: normalize(avgValues.score, scaleMax.score),
                best: normalize(bestScenario.score, scaleMax.score),
                worst: normalize(worstScenario.score, scaleMax.score),
                // Valeurs réelles pour Tooltip
                realCurrent: currentStats.score.toFixed(2),
                realAvg: avgValues.score.toFixed(2),
                realBest: bestScenario.score.toFixed(2),
                realWorst: worstScenario.score.toFixed(2),
                unit: ''
            },
            {
                subject: 'RAM',
                fullMark: 100,
                current: normalize(currentStats.ram, scaleMax.ram),
                avg: normalize(avgValues.ram, scaleMax.ram),
                best: normalize(bestScenario.ram, scaleMax.ram),
                worst: normalize(worstScenario.ram, scaleMax.ram),
                
                realCurrent: currentStats.ram.toFixed(0),
                realAvg: avgValues.ram.toFixed(0),
                realBest: bestScenario.ram.toFixed(0),
                realWorst: worstScenario.ram.toFixed(0),
                unit: 'MB'
            },
            {
                subject: 'Temps',
                fullMark: 100,
                current: normalize(currentStats.time, scaleMax.time),
                avg: normalize(avgValues.time, scaleMax.time),
                best: normalize(bestScenario.time, scaleMax.time),
                worst: normalize(worstScenario.time, scaleMax.time),

                realCurrent: currentStats.time.toFixed(2),
                realAvg: avgValues.time.toFixed(2),
                realBest: bestScenario.time.toFixed(2),
                realWorst: worstScenario.time.toFixed(2),
                unit: 's'
            }
        ];
    }, [currentPattern, allPatterns]);

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-3 border border-slate-200 shadow-xl rounded-md text-xs z-50 min-w-[150px]">
                    <p className="font-bold mb-2 text-slate-800 text-sm border-b pb-1">{label}</p>
                    <div className="space-y-1.5">
                        <div className="flex justify-between">
                            <span className="text-blue-600 font-bold">Actuel:</span>
                            <span>{data.realCurrent} {data.unit}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-green-600 font-medium">Meilleur:</span>
                            <span>{data.realBest} {data.unit}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 font-medium">Moyenne:</span>
                            <span>{data.realAvg} {data.unit}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-red-500 font-medium">Pire:</span>
                            <span>{data.realWorst} {data.unit}</span>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-[450px] bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex flex-col items-center">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Analyse Complète (Benchmark)</h3>
            
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />

                    <Radar
                        name="Pire"
                        dataKey="worst"
                        stroke="#ef4444"
                        strokeWidth={1}
                        fill="#ef4444"
                        fillOpacity={0.1}
                    />

                    <Radar
                        name="Meilleur"
                        dataKey="best"
                        stroke="#22c55e"
                        strokeWidth={1}
                        fill="#22c55e"
                        fillOpacity={0.15}
                    />

                    <Radar
                        name="Moyenne"
                        dataKey="avg"
                        stroke="#64748b"
                        strokeWidth={2}
                        strokeDasharray="4 4"
                        fill="transparent"
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