export interface PatternStat {
    id: string;
    counts: Record<string, number>; 
    totalCount?: number;
}