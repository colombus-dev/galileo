import { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';
import { type PatternType, type Counts } from '@/PatternType';

interface PatternHeatmapProps {
    title: string;
    data: PatternType[];
    activeMetric?: string;
    fullWidth?: boolean;
    className?: string;
}

const PatternHeatmap = ({
    title,
    data,
    activeMetric = 'score',
    fullWidth = true,
    className = ''
}: PatternHeatmapProps) => {
    const chartRef = useRef<HTMLDivElement>(null);

    const DATA_KEYS: (keyof Counts)[] = ['[0-0.2[', '[0.2-0.4[', '[0.4-0.6[', '[0.6-0.8[', '[0.8-1.0]'];

    const getLabels = () => {
        switch (activeMetric) {
            case 'ram': return ['0-200MB', '200-400MB', '400-600MB', '600-800MB', '800MB-1GB'];
            case 'executionTime': return ['0-200ms', '200-400ms', '400-600ms', '600-800ms', '800ms-1s'];
            default: return ['0-0.2', '0.2-0.4', '0.4-0.6', '0.6-0.8', '0.8-1.0'];
        }
    };

    const transformArrayToCounts = (values: number[]): Counts => {
        const counts: Counts = { '[0-0.2[': 0, '[0.2-0.4[': 0, '[0.4-0.6[': 0, '[0.6-0.8[': 0, '[0.8-1.0]': 0 };
        values.forEach(v => {
            if (v < 0.2) counts['[0-0.2[']!++;
            else if (v < 0.4) counts['[0.2-0.4[']!++;
            else if (v < 0.6) counts['[0.4-0.6[']!++;
            else if (v < 0.8) counts['[0.6-0.8[']!++;
            else counts['[0.8-1.0]']!++;
        });
        return counts;
    };

    useEffect(() => {
        if (!chartRef.current || !data || data.length === 0) return;

        const metricKey = activeMetric as keyof PatternType;
        const currentLabels = getLabels();

        const formattedData = data.map(pattern => {
            const rawValue = pattern[metricKey];
            const counts = Array.isArray(rawValue) 
                ? transformArrayToCounts(rawValue) 
                : (rawValue as Counts) || {};
            
            const total = Object.values(counts).reduce((acc, v) => acc + (v || 0), 0);
            return { id: pattern.id, counts, total };
        });

        formattedData.sort((a, b) => a.total - b.total);

        const zValues = formattedData.map(d => DATA_KEYS.map(key => d.counts[key] || 0));

        const trace: Plotly.Data = {
            z: zValues,
            x: currentLabels,
            y: formattedData.map(d => d.id),
            type: 'heatmap',
            colorscale: [
                [0.0, '#f8fafc'],
                [0.01, '#ef4444'], 
                [0.25, '#f97316'],
                [0.5, '#facc15'], 
                [0.75, '#84cc16'],
                [1.0, '#22c55e']
            ],
            showscale: true,
            xgap: 2,
            ygap: 2,
            hovertemplate: '<b>%{y}</b><br>Tranche: %{x}<br>Fréquence: %{z}<extra></extra>'
        };

        const layout: Plotly.Layout = {
            autosize: true,
            margin: { l: 180, r: 30, t: 40, b: 60 },
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'transparent',
            xaxis: {
                title: { text: `Distribution (${activeMetric})`, font: { size: 12 } },
                tickangle: -30,
                fixedrange: true
            },
            yaxis: {
                automargin: true,
                fixedrange: true
            }
        };

        Plotly.newPlot(chartRef.current, [trace], layout, { 
            responsive: true, 
            displayModeBar: false 
        });

        return () => { if (chartRef.current) Plotly.purge(chartRef.current); };
    }, [data, activeMetric]);

    return (
        <div className={`bg-white p-5 rounded-lg shadow-md ${className}`} style={{ width: fullWidth ? '100%' : 'auto' }}>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">{title}</h2>
            <div ref={chartRef} className="w-full h-[500px]" />
        </div>
    );
};

export default PatternHeatmap;