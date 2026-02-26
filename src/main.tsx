import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import { BrowserRouter, Route, Routes } from "react-router";

import Patterns from "@/pages/Patterns.tsx";
import PatternDetails from "@/pages/PatternDetails.tsx";
import ArtefactsView from "@/pages/ArtefactsView";
import Storytelling from "@/pages/Storytelling.tsx";
import StorytellingWorkspacePage from "@/pages/storytelling/StorytellingWorkspacePage.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route index element={<Storytelling />} />
				<Route path="/patterns" element={<Patterns />} />
				<Route path="/pattern/:id" element={<PatternDetails />} /> 
				<Route path="/artefact" element={<ArtefactsView />} />
				<Route path="/storytelling" element={<Storytelling />} />
				<Route path="/storytelling/workspace" element={<StorytellingWorkspacePage />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
