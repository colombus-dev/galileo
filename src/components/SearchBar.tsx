import React from "react";
import { MdSearch } from "react-icons/md";

export interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	className?: string;
	inputClassName?: string;
	minWidth?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
	value,
	onChange,
	placeholder = "Rechercher…",
	className,
	inputClassName,
	minWidth = 260,
}) => {
	return (
		<div className={className}>
			<div className="relative">
				<MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
				<input
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
					className={
						inputClassName ??
						"pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
					}
					style={{ minWidth }}
				/>
			</div>
		</div>
	);
};
