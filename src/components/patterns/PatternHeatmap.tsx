import { useEffect, useRef } from 'react'; // Suppression de useState
import { useNavigate } from 'react-router';
import Plotly from 'plotly.js-dist-min';
import { type PatternType } from '@/PatternType';

type Bins = {
    '[0-0.2[': number;
    '[0.2-0.4[': number;
    '[0.4-0.6[': number;
    '[0.6-0.8[': number;
    '[0.8-1.0]': number;
};

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
    display = 'more' // Contrôle statique via les props
}: PatternHeatmapProps) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const DATA_KEYS: (keyof Bins)[] = ['[0-0.2[', '[0.2-0.4[', '[0.4-0.6[', '[0.6-0.8[', '[0.8-1.0]'];

    const totalCount = data?.length || 0;
    const limit = totalCount < 20 ? Math.ceil(totalCount / 2) : 10;
    const displayCount = Math.min(limit, totalCount);

    // Le titre s'adapte directement à la prop "display"
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
        // On se base uniquement sur la prop 'display' pour découper le tableau
        if (display === 'less') {
            displayData = formattedData.slice(0, limit);
        } else {
            displayData = formattedData.slice(-limit);
        }

        const zValues = displayData.map(d => DATA_KEYS.map(key => d.counts[key]));

        const trace: Plotly.Data = {
            z: zValues,
            x: currentLabels,
            y: displayData.map(d => d.id),
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
            hovertemplate: '<b>%{y}</b><br>Tranche: %{x}<br>Occurrences: %{z}<extra></extra>'
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
                fixedrange: true,
            }
        };

        Plotly.newPlot(chartRef.current, [trace], layout, { 
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
    // On a remplacé filterMode par display dans les dépendances
    }, [data, activeMetric, display, navigate, limit]);

    return (
        <div className={`bg-white p-5 rounded-lg shadow-md ${className}`} style={{ width: fullWidth ? '100%' : 'auto' }}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">{dynamicTitle}</h2>
                    <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
                </div>
                {/* Suppression du bloc contenant les boutons "Moins" et "Plus" */}
            </div>
            <div ref={chartRef} className="w-full h-[500px]" />
        </div>
    );
};

export default PatternHeatmap;