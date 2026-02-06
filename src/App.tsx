import { Outlet } from "react-router";

export default function App() {
	return (
		<section className="min-h-screen bg-slate-50">
			<Outlet />
		</section>
	);
}
