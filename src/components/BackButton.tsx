import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

export type BackButtonProps = {
	label?: string;
	fallbackTo?: string;
	className?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

export function BackButton({
	label = "Retour",
	fallbackTo = "/",
	className,
}: BackButtonProps) {
	const navigate = useNavigate();
	const location = useLocation();

	const fromState = isRecord(location.state) ? location.state.from : undefined;
	const from = typeof fromState === "string" ? fromState : null;

	const handleBack = () => {
		if (from) {
			navigate(from);
			return;
		}
		
		if (window.history.length > 1) {
			navigate(-1);
			return;
		}

		navigate(fallbackTo);
	};

	return (
		<button
			type="button"
			onClick={handleBack}
			className={[
				"inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50",
				className,
			]
				.filter(Boolean)
				.join(" ")}
		>
			<ArrowLeft className="h-4 w-4" aria-hidden="true" />
			<span>{label}</span>
		</button>
	);
}
