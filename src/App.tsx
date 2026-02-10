import { NavBar } from "./components/NavBar";

const DEFAULT_LOGO_BASE64_SVG =
	"PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PSc0MCcgdmlld0JveD0nMCAwIDQwIDQwJz4KICA8cmVjdCB3aWR0aD0nNDAnIGhlaWdodD0nNDAnIHJ4PSc4JyBmaWxsPScjMUYyOTM3Jy8+CiAgPHRleHQgeD0nMjAnIHk9JzI2JyB0ZXh0LWFuY2hvcj0nbWlkZGxlJyBmb250LXNpemU9JzE4JyBmb250LWZhbWlseT0nc3lzdGVtLXVpLCAtYXBwbGUtc3lzdGVtLCBTZWdvZSBVSSwgUm9ib3RvLCBBcmlhbCcgZmlsbD0nd2hpdGUnPkcsPC90ZXh0Pgo8L3N2Zz4=";

export default function App() {
	return (
		<section className="flex flex-col h-screen justify-between">
			<div className="grid grid-rows-6 space-y-4">
				<NavBar logoUrl={DEFAULT_LOGO_BASE64_SVG} logoMimeType="image/svg+xml" title="Galileo">
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
