import { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';
import { type PatternStat, type ChartVariant } from '../types';

interface PatternChartProps {
    title: string;
    variant: ChartVariant;
    data: PatternStat[];
    fullWidth?: boolean;
    colors?: { good: string; bad: string; neutral: string; scale: string[] };
}

const DEFAULT_COLORS = {
    good: '#22c55e',
    bad: '#ef4444',
    neutral: '#94a3b8',
    scale: ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e']
};

export const PatternChart = ({ 
    title, 
    variant, 
    data, 
    fullWidth = true, 
    colors = DEFAULT_COLORS 
}: PatternChartProps) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const binLabels = ['Critique', 'Mauvais', 'Moyen', 'Bon', 'Excellent'];

    useEffect(() => {
        if (!chartRef.current) return;

        let traces: any[] = [];
        let layout: any = {
            autosize: true,
            margin: { l: 100, r: 20, t: 40, b: 50 },
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'transparent',
            font: { family: 'Inter, sans-serif' }
        };

        switch (variant) {
            case 'bar-compare':
                traces = [
                    {
                        y: data.map(d => d.id),
                        x: data.map(d => d.counts[4]),
                        name: 'Excellents',
                        type: 'bar',
                        orientation: 'h',
                        marker: { color: colors.good }
                    },
                    {
                        y: data.map(d => d.id),
                        x: data.map(d => d.counts[0] + d.counts[1]),
                        name: 'Médiocres',
                        type: 'bar',
                        orientation: 'h',
                        marker: { color: colors.bad }
                    }
                ];
                layout.barmode = 'group';
                break;

            case 'heatmap':
                traces = [{
                    z: data.map(d => d.counts),
                    x: binLabels,
                    y: data.map(d => d.id),
                    type: 'heatmap',
                    colorscale: 'Viridis'
                }];
                break;

            case 'bubble':
                traces = [{
                    x: data.map(d => d.totalScore / (d.totalCount || 1)),
                    y: data.map(d => d.totalCount),
                    text: data.map(d => d.id),
                    mode: 'markers+text',
                    marker: {
                        size: data.map(d => Math.sqrt(d.totalCount) * 10),
                        color: data.map(d => (d.totalScore / d.totalCount) > 0.6 ? colors.good : colors.bad)
                    },
                    textposition: 'top center'
                }];
                break;

            case 'stack-bar':
                traces = binLabels.map((label, i) => ({
                    x: data.map(d => d.id),
                    y: data.map(d => d.counts[i]),
                    name: label,
                    type: 'bar',
                    marker: { color: colors.scale[i] }
                }));
                layout.barmode = 'stack';
                break;
        }

        Plotly.newPlot(chartRef.current, traces, layout, { responsive: true, displayModeBar: false });
    }, [data, variant, colors]);

    return (
        <div className={`card ${fullWidth ? 'full' : 'half'}`} style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
            <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{title}</h2>
            <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
        </div>
    );
};