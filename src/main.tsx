import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "@/App.tsx";
import ArtefactsView from "@/pages/ArtefactsView";

// biome-ignore lint/style/noNonNullAssertion: TODO
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route index element={<ArtefactsView />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
