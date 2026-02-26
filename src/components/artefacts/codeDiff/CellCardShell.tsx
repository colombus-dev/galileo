import { type ReactNode } from "react";

export function CellCardShell({
	cellIndex,
	title,
	lines,
	children,
}: {
	cellIndex: number;
	title: string;
	lines: number;
	children: ReactNode;
}) {
	const lineCountLabel = `${lines} ligne${lines === 1 ? "" : "s"}`;
	const hasTitle = title.trim().length > 0;
	return (
		<div className="rounded-2xl bg-white shadow-sm">
			<div className="flex items-start justify-between gap-3 p-4">
				<div className="flex items-start gap-3 min-w-0">
					<span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white text-sm font-semibold shrink-0">
						{cellIndex}
					</span>
					<div className="min-w-0">
						{hasTitle ? (
							<div className="font-semibold text-slate-900 truncate">{title}</div>
						) : null}
						<div className="text-xs text-slate-500">{lineCountLabel}</div>
					</div>
				</div>

				{cellIndex === 0 ? (
					<span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold tracking-wide text-emerald-700">
						PREMIÈRE CELLULE
					</span>
				) : null}
			</div>

			<div className="mx-4 mb-4 overflow-hidden rounded-xl">
				<div className="max-h-[520px] overflow-auto p-4">{children}</div>
			</div>
		</div>
	);
}

export function PlaceholderCell({ message }: { message: string }) {
	return (
		<div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
			{message}
		</div>
	);
}
