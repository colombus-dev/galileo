import { useEffect, useRef } from 'react'; 
import { useNavigate } from 'react-router';
import Plotly from 'plotly.js-dist-min';
import { type PatternType } from '@/types/PatternType';

type Bins = {
    '[0-0.2[': number;
    '[0.2-0.4[': number;
    '[0.4-0.6[': number;
    '[0.6-0.8[': number;
    '[0.8-1.0]': number;
};

const BASE_COLORS = [
    '220, 38, 38',
    '234, 88, 12',
    '234, 179, 8',
    '132, 204, 22',
    '22, 163, 74'
];

interface PatternHeatmapProps {
    title?: string;
    data: PatternType[];
    activeMetric?: string;
    fullWidth?: boolean;
    className?: string;
    display?: 'more' | 'less'; 
}

const PatternHeatmap = ({
    data,
    activeMetric = 'score',
    fullWidth = true,
    className = '',
    display = 'more' 
}: PatternHeatmapProps) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const DATA_KEYS: (keyof Bins)[] = ['[0-0.2[', '[0.2-0.4[', '[0.4-0.6[', '[0.6-0.8[', '[0.8-1.0]'];

    const totalCount = data?.length || 0;
    const limit = totalCount < 20 ? Math.ceil(totalCount / 2) : 10;
    const displayCount = Math.min(limit, totalCount);

    const dynamicTitle = `Les ${displayCount} patterns les ${display === 'more' ? 'plus' : 'moins'} fréquents`;
    const subtitle = `${displayCount} patterns affichés sur les ${totalCount}`;

    const getLabels = () => {
        switch (activeMetric) {
            case 'ram': return ['0-200MB', '200-400MB', '400-600MB', '600-800MB', '800MB-1GB'];
            case 'executionTime': return ['0-200ms', '200-400ms', '400-600ms', '600-800ms', '800ms-1s'];
            default: return ['0-0.2', '0.2-0.4', '0.4-0.6', '0.6-0.8', '0.8-1.0'];
        }
    };

    const transformArrayToCounts = (values: number[]): Bins => {
        const counts: Bins = { '[0-0.2[': 0, '[0.2-0.4[': 0, '[0.4-0.6[': 0, '[0.6-0.8[': 0, '[0.8-1.0]': 0 };
        if (!values) return counts;
        
        values.forEach(v => {
            if (v < 0.2) counts['[0-0.2[']++;
            else if (v < 0.4) counts['[0.2-0.4[']++;
            else if (v < 0.6) counts['[0.4-0.6[']++;
            else if (v < 0.8) counts['[0.6-0.8[']++;
            else counts['[0.8-1.0]']++;
        });
        return counts;
    };

    useEffect(() => {
        if (!chartRef.current || !data || data.length === 0) return;

        const currentLabels = getLabels();

        let formattedData = data.map(pattern => {
            let rawValues: number[] = [];

            if (activeMetric === 'score' || activeMetric === 'notebooks') {
                rawValues = Object.values(pattern.notebooks || {});
            } else {
                rawValues = (pattern[activeMetric as keyof PatternType] as number[]) || [];
            }
            
            const counts = transformArrayToCounts(rawValues);
            const frequency = pattern.notebooks ? Object.keys(pattern.notebooks).length : 0;
            
            return { id: pattern.id, counts, total: frequency };
        });

        formattedData.sort((a, b) => a.total - b.total);

        let displayData = [];
        if (display === 'less') {
            displayData = formattedData.slice(0, limit);
        } else {
            displayData = formattedData.slice(-limit);
        }

        let maxFreqInView = 1; 
        displayData.forEach(d => {
            DATA_KEYS.forEach(key => {
                maxFreqInView = Math.max(maxFreqInView, d.counts[key]);
            });
        });

        let traces: Plotly.Data[] = [];

        if (activeMetric === 'score') {
            traces = DATA_KEYS.map((key, colIndex) => {
                const zMatrix = displayData.map(d => {
                    const row: (number | null)[] = [null, null, null, null, null];
                    row[colIndex] = d.counts[key];
                    return row;
                });

                return {
                    z: zMatrix,
                    x: currentLabels,
                    y: displayData.map(d => d.id),
                    type: 'heatmap',
                    colorscale: [
                        [0, `rgba(${BASE_COLORS[colIndex]}, 0)`],
                        [1, `rgba(${BASE_COLORS[colIndex]}, 1)`]
                    ],
                    zmin: 0,
                    zmax: maxFreqInView,
                    showscale: false,
                    xgap: 2,
                    ygap: 2,
                    hovertemplate: '<b>%{y}</b><br>Tranche: %{x}<br>Notebooks: %{z}<extra></extra>',
                    hoverongaps: false
                };
            });
        } else {
            const zValues = displayData.map(d => DATA_KEYS.map(key => d.counts[key]));
            traces = [{
                z: zValues,
                x: currentLabels,
                y: displayData.map(d => d.id),
                type: 'heatmap',
                colorscale: [
                    [0, 'rgba(59, 130, 246, 0)'], 
                    [1, 'rgba(59, 130, 246, 1)']
                ],
                zmin: 0,
                zmax: maxFreqInView,
                showscale: false,
                xgap: 2,
                ygap: 2,
                hovertemplate: '<b>%{y}</b><br>Tranche: %{x}<br>Notebooks: %{z}<extra></extra>'
            }];
        }

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
                fixedrange: true,
            }
        };

        Plotly.newPlot(chartRef.current, traces, layout, { 
            responsive: true, 
            displayModeBar: false 
        }).then((gd: any) => {
            gd.on('plotly_click', (eventData: any) => {
                const point = eventData.points[0];
                const patternId = point.y;
                if (patternId) navigate(`/pattern/${patternId}`);
            });

            const yLabels = chartRef.current?.querySelectorAll('.ytick text');
            
            yLabels?.forEach((label) => {
                (label as HTMLElement).style.cursor = 'pointer';
                (label as HTMLElement).style.fontWeight = '500';

                label.addEventListener('click', () => {
                    const patternId = label.textContent;
                    if (patternId) {
                        navigate(`/pattern/${patternId}`);
                    }
                });
            });
        });

        return () => { 
            if (chartRef.current) {
                (chartRef.current as any).removeAllListeners?.('plotly_click');
                Plotly.purge(chartRef.current); 
            }
        };
    }, [data, activeMetric, display, navigate, limit]);

    return (
        <div className={`bg-white p-5 rounded-lg shadow-md ${className}`} style={{ width: fullWidth ? '100%' : 'auto' }}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">{dynamicTitle}</h2>
                    <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
                </div>
            </div>
            <div ref={chartRef} className="w-full h-[500px]" />
        </div>
    );
};

export default PatternHeatmap;