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

const calculateScore = (counts?: Counts): number => {
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
    Object.entries(counts).forEach(([key, val]) => {
        const count = val || 0;
        totalScore += count * (weights[key] || 0);
        totalCount += count;
    });
    return totalCount === 0 ? 0 : totalScore / totalCount;
};

const calculateAverage = (arr?: number[]): number => {
    if (!arr || arr.length === 0) return 0;
    return arr.reduce((a, b) => a + b, 0) / arr.length;
};


interface PatternRadarChartProps {
    currentPattern: PatternType;
    allPatterns: PatternType[];
}

const PatternRadarChart = ({ currentPattern, allPatterns }: PatternRadarChartProps) => {

    const chartData = useMemo(() => {
        const stats = allPatterns.map(p => ({
            score: calculateScore(p.score),
            ram: calculateAverage(p.ram),
            time: calculateAverage(p.executionTime)
        }));

        const maxValues = {
            score: 1,
            ram: Math.max(...stats.map(s => s.ram)) || 1,
            time: Math.max(...stats.map(s => s.time)) || 1
        };

        const minValues = {
            score: 0,
            ram: Math.min(...stats.map(s => s.ram)),
            time: Math.min(...stats.map(s => s.time))
        };

        const avgValues = {
            score: stats.reduce((acc, s) => acc + s.score, 0) / stats.length,
            ram: stats.reduce((acc, s) => acc + s.ram, 0) / stats.length,
            time: stats.reduce((acc, s) => acc + s.time, 0) / stats.length,
        };

        const currentStats = {
            score: calculateScore(currentPattern.score),
            ram: calculateAverage(currentPattern.ram),
            time: calculateAverage(currentPattern.executionTime)
        };

        const normalize = (val: number, max: number) => (val / max) * 100;

        return [
            {
                subject: 'Score',
                fullMark: 100,
                current: normalize(currentStats.score, 1),
                avg: normalize(avgValues.score, 1),
                min: normalize(minValues.score, 1),
                max: normalize(1, 1),
                realCurrent: currentStats.score.toFixed(2),
                realAvg: avgValues.score.toFixed(2),
                realMin: minValues.score.toFixed(2),
                realMax: "1.00",
                unit: ''
            },
            {
                subject: 'RAM',
                fullMark: 100,
                current: normalize(currentStats.ram, maxValues.ram),
                avg: normalize(avgValues.ram, maxValues.ram),
                min: normalize(minValues.ram, maxValues.ram),
                max: normalize(maxValues.ram, maxValues.ram),
                realCurrent: currentStats.ram.toFixed(0),
                realAvg: avgValues.ram.toFixed(0),
                realMin: minValues.ram.toFixed(0),
                realMax: maxValues.ram.toFixed(0),
                unit: 'MB'
            },
            {
                subject: 'Temps',
                fullMark: 100,
                current: normalize(currentStats.time, maxValues.time),
                avg: normalize(avgValues.time, maxValues.time),
                min: normalize(minValues.time, maxValues.time),
                max: normalize(maxValues.time, maxValues.time),
                realCurrent: currentStats.time.toFixed(2),
                realAvg: avgValues.time.toFixed(2),
                realMin: minValues.time.toFixed(2),
                realMax: maxValues.time.toFixed(2),
                unit: 's'
            }
        ];
    }, [currentPattern, allPatterns]);

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-3 border border-slate-200 shadow-lg rounded text-sm">
                    <p className="font-bold mb-2 text-slate-700">{label}</p>
                    <div className="space-y-1">
                        <p className="text-blue-600">Actuel : <b>{data.realCurrent}</b> {data.unit}</p>
                        <p className="text-gray-500">Moyenne : {data.realAvg} {data.unit}</p>
                        <p className="text-green-600">Max Global : {data.realMax} {data.unit}</p>
                        <p className="text-red-500">Min Global : {data.realMin} {data.unit}</p>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-[400px] bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex flex-col items-center">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Comparatif de Performance</h3>
            
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />

                    <Radar
                        name="Max Global"
                        dataKey="max"
                        stroke="#22c55e"
                        strokeWidth={2}
                        fill="#22c55e"
                        fillOpacity={0.1}
                    />

                    <Radar
                        name="Moyenne"
                        dataKey="avg"
                        stroke="#9ca3af"
                        strokeWidth={2}
                        strokeDasharray="4 4"
                        fill="#9ca3af"
                        fillOpacity={0.1}
                    />
                    
                    <Radar
                        name="Min Global"
                        dataKey="min"
                        stroke="#ef4444"
                        strokeWidth={2}
                        fill="#ef4444"
                        fillOpacity={0.0}
                    />

                    <Radar
                        name={currentPattern.id}
                        dataKey="current"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        fill="#3b82f6"
                        fillOpacity={0.4}
                    />

                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PatternRadarChart;