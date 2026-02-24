import { useState } from 'react';
import { useNavigate } from 'react-router';
import { NavBar } from "@/components/NavBar";
import Select, { Option } from '@/components/Select';
import SearchBar, { SearchSuggestion } from "@/components/SearchBar";
import PatternHeatmap from "@/components/patterns/PatternHeatmap";
import PatternsList from '@/components/patterns/PatternsList';
import { mockDataPattern } from "@/data/patternMockData";

const mockData = mockDataPattern;

export default function Patterns() {

    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<string>('');
    const [selectedAlgo, setSelectedAlgo] = useState<string>('');
    const [selectedMetric, setSelectedMetric] = useState<string>('score');

    const typeOptions: Option[] = [
        { label: 'Afficher tous les type', value: '' },
        ...Array.from(new Set(mockData.map(d => d.typePattern))).map(type => ({
            label: type,
            value: type
        }))
    ];

    const algoOptions: Option[] = [
        { label: 'Afficher tous les algos', value: '', },
        ...Array.from(new Set(mockData.map(d => d.typeAlgo))).map(algo => ({
            label: algo,
            value: algo
        }))
    ];

    const metricsOptions: Option[] = [
        { label: 'Score', value: 'score' },
        { label: 'Mémoire (RAM)', value: 'ram' },
        { label: 'Temps d’exécution', value: 'executionTime' }
    ];

    const filteredData = mockData.filter((pattern) => {
        const query = searchQuery.toLowerCase();

        const matchSearch = !query || (
            pattern.id.toLowerCase().includes(query) ||
            pattern.typePattern.toLowerCase().includes(query) ||
            pattern.typeAlgo.toLowerCase().includes(query)
        );

        const matchType = selectedType === '' || pattern.typePattern === selectedType;
        const matchAlgo = selectedAlgo === '' || pattern.typeAlgo === selectedAlgo;
        
        const matchMetric = selectedMetric === '' || 
            (selectedMetric === 'score' ? pattern.notebooks !== undefined : pattern[selectedMetric as keyof typeof pattern] !== undefined);

        return matchSearch && matchType && matchAlgo && matchMetric;
    });

    const searchSuggestions: SearchSuggestion[] = searchQuery
        ? filteredData.map(pattern => ({
            label: pattern.id,
            subLabel: `${pattern.typePattern} • ${pattern.typeAlgo}`,
            value: pattern.id
        }))
        : [];

    const handleRedirection = (patternId: string) => {
        navigate(`/pattern/${patternId}`);
    };

    return (
        <main className="flex flex-col h-screen bg-gray-50 overflow-hidden">
            <NavBar
                logoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwt1HL9fRcwfyF4lzGkCREKMmUv7OVyYGftYlNCNxNuENKpOCJZNxywAsv3fYra7N7uUP1&s=10"
                title="Galileo - Patterns"
            >
				<button type="button" onClick={() => navigate('/storytelling')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
					Storytelling
				</button>
				<button type="button" onClick={() => navigate('/artefact')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
					Artefacts
				</button>
				<button type="button" onClick={() => navigate('/patterns')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
					Patterns
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
                    <div className="w-64">
                        <Select
                            options={metricsOptions}
                            placeholder="Filtrer par métriques"
                            defaultValue={metricsOptions[0]}
                            onSelect={(option) => setSelectedMetric(String(option.value))}
                        />
                    </div>
                </div>

                <div className="flex-1 max-w-md relative">
                    <SearchBar
                        placeholder="Rechercher..."
                        onSearch={(value) => setSearchQuery(value)}
                        suggestions={searchSuggestions}
                        onSelectSuggestion={handleRedirection}
                    />
                </div>
            </div>

            <section className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto min-h-0">
                <div className="bg-white rounded-xl shadow-lg p-4 shrink-0">
                    <PatternHeatmap
                        title={`Patterns (${filteredData.length})`}
                        data={filteredData}
                        activeMetric={selectedMetric}
                        fullWidth
                        display="more"
                    />
                    <PatternHeatmap
                        title={`Patterns (${filteredData.length})`}
                        data={filteredData}
                        activeMetric={selectedMetric}
                        fullWidth
                        display="less"
                    />
                </div>
                <div className="shrink-0">
                    <PatternsList data={mockData} />
                </div>
            </section>

        </main>
    );
}