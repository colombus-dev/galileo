export interface PatternStat {
    id: string;          
    counts: number[];   
    totalCount: number;
    totalScore: number;
}

export type ChartVariant = 'bar-compare' | 'heatmap' | 'bubble' | 'stack-bar';