export interface PatternType {
    id: string;
    counts: Counts;
    notebooks: Record<string, number>;
    TypeAlgo: string;
    TypePattern: string;
}


export interface Counts {
    '[0-0.2['?: number;
    '[0.2-0.4['?: number;
    '[0.4-0.6['?: number;
    '[0.6-0.8['?: number;
    '[0.8-1.0]'?: number;
}