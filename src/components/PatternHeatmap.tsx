import { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';
import { type PatternStat } from '../types';

interface PatternHeatmapProps {
    title: string;
    data: PatternStat[];
    fullWidth?: boolean;
    className?: string;
}

export const PatternHeatmap = ({ 
    title, 
    data, 
    fullWidth = true,
    className = ''
}: PatternHeatmapProps) => {
    const chartRef = useRef<HTMLDivElement>(null);

   
    const SCORE_KEYS = ['0-0.2', '0.2-0.4', '0.4-0.6', '0.6-0.8', '0.8-1.0'];

    useEffect(() => {
        if (!chartRef.current) return;

        if (!data || data.length === 0) {
            Plotly.purge(chartRef.current);
            return;
        }

        const sortedData = [...data].sort((a, b) => {
            const sumA = a.totalCount ?? Object.values(a.counts).reduce((acc, v) => acc + v, 0);
            const sumB = b.totalCount ?? Object.values(b.counts).reduce((acc, v) => acc + v, 0);
            return sumA - sumB; 
        });

        const zValues = sortedData.map(pattern => {
            return SCORE_KEYS.map(key => pattern.counts[key] || 0);
        });

        const trace: Plotly.Data = {
            z: zValues,           
            x: SCORE_KEYS,        
            y: sortedData.map(d => d.id),
            type: 'heatmap',
            colorscale: [
                [0.0, '#ef4444'], 
                [0.5, '#f97316'], 
                [1.0, '#22c55e']  
            ],
            showscale: true,
            xgap: 1,
            ygap: 1,
            hovertemplate: 
                '<b>%{y}</b><br>' +
                'Score: %{x}<br>' +
                'Fréquence: %{z}<extra></extra>'
        };

        const layout: Plotly.Layout = {
            autosize: true,
            margin: { l: 150, r: 20, t: 30, b: 50 },
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'transparent',
            font: { family: 'Inter, sans-serif' },
            xaxis: { title: 'Score du pattern', fixedrange: true },
            yaxis: { automargin: true, fixedrange: true }
        };

        Plotly.newPlot(chartRef.current, [trace], layout, { responsive: true, displayModeBar: false });

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