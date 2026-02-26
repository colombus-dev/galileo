import { NavBar } from "./components/NavBar";
import { useNavigate } from "react-router";

const DEFAULT_LOGO_BASE64_SVG =
	"PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PSc0MCcgdmlld0JveD0nMCAwIDQwIDQwJz4KICA8cmVjdCB3aWR0aD0nNDAnIGhlaWdodD0nNDAnIHJ4PSc4JyBmaWxsPScjMUYyOTM3Jy8+CiAgPHRleHQgeD0nMjAnIHk9JzI2JyB0ZXh0LWFuY2hvcj0nbWlkZGxlJyBmb250LXNpemU9JzE4JyBmb250LWZhbWlseT0nc3lzdGVtLXVpLCAtYXBwbGUtc3lzdGVtLCBTZWdvZSBVSSwgUm9ib3RvLCBBcmlhbCcgZmlsbD0nd2hpdGUnPkcsPC90ZXh0Pgo8L3N2Zz4=";

export default function App() {
	const navigate = useNavigate();

	return (
		<section className="flex flex-col h-screen justify-between">
			<div className="grid grid-rows-6 space-y-4">
				<NavBar logoUrl={DEFAULT_LOGO_BASE64_SVG} logoMimeType="image/svg+xml" title="Galileo">
					<button
						type="button"
						onClick={() => navigate("/storytelling")}
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
					>
						Storytelling
					</button>
					<button
						type="button"
						onClick={() => navigate("/artefact")}
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
					>
						Artefact
					</button>
					<button
						type="button"
						onClick={() => navigate("/patterns")}
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
					>
						Patterns
					</button>
				</NavBar>
			</div>
		</section>
	);
}
