export interface PatternType {
    id: string;
    schema: string;
    ram?: number[];
    executionTime?: number[];
    notebooks: Record<string, number>;
    typeAlgo: string;
    typePattern: string;
    hierarchy: Hierarchy
}


export interface Hierarchy {
    parent: string | null;
    children: string[] | null;
}