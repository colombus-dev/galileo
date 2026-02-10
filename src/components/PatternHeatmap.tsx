import { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';
import { type PatternType, type Counts } from '../PatternType';

interface PatternHeatmapProps {
    title: string;
    data: PatternType[];
    fullWidth?: boolean;
    className?: string;
}

const PatternHeatmap = ({
    title,
    data,
    fullWidth = true,
    className = ''
}: PatternHeatmapProps) => {
    const chartRef = useRef<HTMLDivElement>(null);

    const DATA_KEYS: (keyof Counts)[] = [
        '[0-0.2[',
        '[0.2-0.4[',
        '[0.4-0.6[',
        '[0.6-0.8[',
        '[0.8-1.0]'
    ];

    const DISPLAY_LABELS = ['0-0.2', '0.2-0.4', '0.4-0.6', '0.6-0.8', '0.8-1.0'];

    useEffect(() => {
        if (!chartRef.current) return;

        if (!data || data.length === 0) {
            Plotly.purge(chartRef.current);
            return;
        }

        const sortedData = [...data].sort((a, b) => {
            const sumA = Object.values(a.counts).reduce((acc, v) => acc + (v || 0), 0);
            const sumB = Object.values(b.counts).reduce((acc, v) => acc + (v || 0), 0);
            return sumA - sumB;
        });

        const zValues = sortedData.map(pattern => {
            return DATA_KEYS.map(key => pattern.counts[key] || 0);
        });

        const trace: Plotly.Data = {
            z: zValues,
            x: DISPLAY_LABELS,
            y: sortedData.map(d => d.id),
            type: 'heatmap',
            colorscale: [
                [0.0, '#ef4444'], 
                [0.25, '#f97316'],
                [0.5, '#facc15'], 
                [0.75, '#84cc16'],
                [1.0, '#22c55e'] 
            ],

            showscale: true,
            xgap: 1,
            ygap: 1,
            hovertemplate:
                '<b>%{y}</b><br>' +
                'Intervalle: %{x}<br>' +
                'Fréquence: %{z}<extra></extra>'
        };

        const layout: Plotly.Layout = {
            autosize: true,
            margin: { l: 150, r: 20, t: 40, b: 50 },
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'transparent',
            font: { family: 'Inter, sans-serif' },
            xaxis: {
                title: 'Score du pattern',
                fixedrange: true,
                tickmode: 'array',
                tickvals: DISPLAY_LABELS
            },
            yaxis: {
                automargin: true,
                fixedrange: true,
                title: 'ID Pattern'
            }
        };

        const config: Plotly.Config = {
            responsive: true,
            displayModeBar: false
        };

        Plotly.newPlot(chartRef.current, [trace], layout, config);

        return () => {
            if (chartRef.current) Plotly.purge(chartRef.current);
        };
    }, [data]);

    return (
        <div
            className={`card ${className}`}
            style={{
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                width: fullWidth ? '100%' : '50%',
                backgroundColor: 'white'
            }}
        >
            <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: 600 }}>{title}</h2>
            <div ref={chartRef} style={{ width: '100%', height: '400px', minHeight: '300px' }} />
        </div>
    );
};

export default PatternHeatmap;