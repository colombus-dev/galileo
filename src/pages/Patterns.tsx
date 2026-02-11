import { useState } from 'react';
import { NavBar } from "@/components/NavBar";
import Select, { Option } from '../components/Select';
import SearchBar, { SearchSuggestion } from "@/components/SearchBar";
import PatternHeatmap from "@/components/PatternHeatmap";
import { type PatternType } from "@/PatternType";

const mockOptionsType: Option[] = [
    { label: 'Anomaly', value: 'anomaly' },
    { label: 'Nominal', value: 'nominal' },
    { label: 'Noise', value: 'noise' },
];

const mockOptionsAlgos: Option[] = [
    { label: 'Isolation Forest', value: 'isoforest' },
    { label: 'Random Forest', value: 'ranforest' },
    { label: 'DBSCAN', value: 'dbscan' },
];

const mockData: PatternType[] = [
    {
        id: 'Gaussian Distribution',
        counts: { 
            '[0-0.2[': 1, '[0.2-0.4[': 0, '[0.4-0.6[': 0, '[0.6-0.8[': 2, '[0.8-1.0]': 1 
        },
        notebooks: { 'analysis_v1.ipynb': 0.6, 'experiment_A.ipynb': 0.4 },
        TypeAlgo: 'Isolation Forest',
        TypePattern: 'Distribution'
    },
    {
        id: 'Annealing and binary',
        counts: { 
            '[0-0.2[': 0, '[0.2-0.4[': 5, '[0.4-0.6[': 20, '[0.6-0.8[': 80, '[0.8-1.0]': 160 
        },
        notebooks: { 'production_model.ipynb': 0.9 },
        TypeAlgo: 'Random Forest',
        TypePattern: 'Loading'
    },
    {
        id: 'Normalisation',
        counts: { 
            '[0-0.2[': 150, '[0.2-0.4[': 80, '[0.4-0.6[': 20, '[0.6-0.8[': 5, '[0.8-1.0]': 0 
        },
        notebooks: { 'debug_session.ipynb': 0.6, 'old_version.ipynb': 0.4 },
        TypeAlgo: 'DBSCAN',
        TypePattern: 'Normalisation'
    }
];

export default function Patterns() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredData = mockData.filter((pattern) => {
        const query = searchQuery.toLowerCase();
        if (!query) return true;
        return (
            pattern.id.toLowerCase().includes(query) ||
            pattern.TypePattern.toLowerCase().includes(query) ||
            pattern.TypeAlgo.toLowerCase().includes(query)
        );
    });

    const searchSuggestions: SearchSuggestion[] = searchQuery 
        ? filteredData.map(pattern => ({
            label: pattern.id,
            subLabel: `${pattern.TypePattern} • ${pattern.TypeAlgo}`,
            value: pattern.id
          }))
        : [];

    return (
        <main className="flex flex-col h-screen bg-gray-50 overflow-hidden">
            <NavBar
                logoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwt1HL9fRcwfyF4lzGkCREKMmUv7OVyYGftYlNCNxNuENKpOCJZNxywAsv3fYra7N7uUP1&s=10"
                title="Galileo - Patterns"
            >
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                    <a href="/storytelling">Storytelling</a>
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                    <a href="/artefact">Artefact</a>
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                    <a href="/patterns">Patterns</a>
                </button>
            </NavBar>

            <div className="p-4 flex flex-row items-center justify-between gap-4 bg-white border-b shadow-sm">
                <div className="flex flex-row gap-6">
                    <div className="w-64">
                        <Select
                            options={mockOptionsType}
                            placeholder="Sélectionner un type"
                            onSelect={(value) => console.log("Type:", value)}
                        />
                    </div>
                    <div className="w-64">
                        <Select
                            options={mockOptionsAlgos}
                            placeholder="Sélectionner un algo"
                            onSelect={(value) => console.log("Algo:", value)}
                        />
                    </div>
                </div>

                <div className="flex-1 max-w-md relative">
                    <SearchBar 
                        placeholder="Rechercher (Nom, Type, Algo)..." 
                        onSearch={(value) => setSearchQuery(value)}
                        suggestions={searchSuggestions}
                        onSelectSuggestion={(value) => setSearchQuery(value)}
                    />
                </div>
            </div>

            <section className="flex-1 p-6 flex flex-col min-h-0">
                <div className="bg-white rounded-xl shadow-lg p-4 flex-1 flex flex-col">
                    <PatternHeatmap 
                        title="Distribution des patterns par score" 
                        data={filteredData} 
                        fullWidth
                        className="flex-1"
                    />
                </div>
            </section>
        </main>
    );
}