import { useState } from 'react';
import { NavBar } from "@/components/NavBar";
import Select, { Option } from '@/components/Select';
import SearchBar, { SearchSuggestion } from "@/components/SearchBar";
import PatternHeatmap from "@/components/patterns/PatternHeatmap";
import { mockDataPattern } from "@/data/patternMockData";

const mockData = mockDataPattern;

export default function Patterns() {

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<string>('');
    const [selectedAlgo, setSelectedAlgo] = useState<string>('');

    const typeOptions: Option[] = [
        { label: 'Afficher tous les type', value: '' },
        ...Array.from(new Set(mockData.map(d => d.TypePattern))).map(type => ({
            label: type,
            value: type
        }))
    ];

    const algoOptions: Option[] = [
        { label: 'Afficher tous les algos', value: '', },
        ...Array.from(new Set(mockData.map(d => d.TypeAlgo))).map(algo => ({
            label: algo,
            value: algo
        }))
    ];

    const filteredData = mockData.filter((pattern) => {
        const query = searchQuery.toLowerCase();

        const matchSearch = !query || (
            pattern.id.toLowerCase().includes(query) ||
            pattern.TypePattern.toLowerCase().includes(query) ||
            pattern.TypeAlgo.toLowerCase().includes(query)
        );

        const matchType = selectedType === '' || pattern.TypePattern === selectedType;
        const matchAlgo = selectedAlgo === '' || pattern.TypeAlgo === selectedAlgo;

        return matchSearch && matchType && matchAlgo;
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
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    <a href="/storytelling">Storytelling</a>
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
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
                            options={typeOptions}
                            placeholder="Filtrer par type"
                            defaultValue={typeOptions[0]}
                            onSelect={(option) => setSelectedType(String(option.value))}
                        />
                    </div>
                    <div className="w-64">
                        <Select
                            options={algoOptions}
                            placeholder="Filtrer par algo"
                            defaultValue={algoOptions[0]}
                            onSelect={(option) => setSelectedAlgo(String(option.value))}
                        />
                    </div>
                </div>

                <div className="flex-1 max-w-md relative">
                    <SearchBar
                        placeholder="Rechercher..."
                        onSearch={(value) => setSearchQuery(value)}
                        suggestions={searchSuggestions}
                        onSelectSuggestion={(value) => setSearchQuery(value)}
                    />
                </div>
            </div>

            <section className="flex-1 p-6 flex flex-col min-h-0">
                <div className="bg-white rounded-xl shadow-lg p-4 flex-1 flex flex-col">
                    <PatternHeatmap
                        title={`Patterns (${filteredData.length})`}
                        data={filteredData}
                        fullWidth
                        className="flex-1"
                    />
                </div>
            </section>
        </main>
    );
}