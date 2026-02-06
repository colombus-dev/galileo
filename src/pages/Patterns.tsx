import { NavBar } from "@/components/NavBar";


export default function Patterns() {
    return (
        <section className="flex flex-col h-screen justify-between">
            <div className="grid grid-rows-6 space-y-4">
                <NavBar logoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwt1HL9fRcwfyF4lzGkCREKMmUv7OVyYGftYlNCNxNuENKpOCJZNxywAsv3fYra7N7uUP1&s=10" title="Galileo - Patterns">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        <a href="/storytelling">Storytelling</a>
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        <a href="/artefact">Artefact</a>
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        <a href="/patterns">Patterns</a>
                    </button>
                </NavBar>
            </div>
        </section>
    );
}