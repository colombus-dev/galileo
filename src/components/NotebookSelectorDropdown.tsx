import React, { useState } from "react";
import { MdMenuBook, MdExpandMore } from "react-icons/md";

export interface NotebookOption {
  id: string;
  user: string;
  project: string;
}

export interface NotebookSelectorDropdownProps {
  options: NotebookOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  multiple?: boolean;
  label?: string;
  compareLabel?: string;
}

export const NotebookSelectorDropdown: React.FC<NotebookSelectorDropdownProps> = ({
  options,
  selected,
  onChange,
  multiple = false,
  label = "Choisir un notebook",
  compareLabel = "Sélectionnez les notebooks à comparer",
}) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (id: string) => {
    if (multiple) {
      if (selected.includes(id)) {
        onChange(selected.filter((s) => s !== id));
      } else {
        onChange([...selected, id]);
      }
    } else {
      onChange([id]);
      setOpen(false);
    }
  };

  const selectedOptions = options.filter((o) => selected.includes(o.id));
  const displayLabel = multiple
    ? `${selected.length} notebook${selected.length > 1 ? "s" : ""} sélectionné${selected.length > 1 ? "s" : ""}`
    : selectedOptions[0]?.user || label;

  return (
    <div className="relative inline-block text-left">
      <button
        className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-medium shadow-sm hover:bg-blue-50 transition text-lg min-w-[220px]"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        type="button"
      >
        <MdMenuBook className="text-2xl text-slate-400" />
        <span className="truncate">{displayLabel}</span>
        <MdExpandMore className="text-2xl ml-1 text-slate-400" />
      </button>
      {open && (
        <div className="absolute left-0 mt-2 z-30 min-w-[340px] bg-white rounded-3xl shadow-xl border border-slate-100 py-3 animate-fade-in">
          <div className="px-7 pt-1 pb-3 text-slate-500 text-base font-medium select-none">
            {multiple ? compareLabel : label}
          </div>
          <ul className="flex flex-col gap-1 max-h-80 overflow-y-auto">
            {options.map((o) => {
              const isSelected = selected.includes(o.id);
              return (
                <li key={o.id}>
                  <button
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-left transition font-medium text-lg
                      ${isSelected ? "bg-blue-50" : "hover:bg-blue-50"}
                    `}
                    onClick={() => handleSelect(o.id)}
                    type="button"
                  >
                    <span
                      className={`flex items-center justify-center w-7 h-7 rounded-lg border-2 mr-2
                        ${isSelected ? "bg-blue-600 border-blue-600" : "bg-white border-slate-200"}
                      `}
                    >
                      {isSelected && (
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                          <rect width="20" height="20" rx="6" fill="#2563eb" />
                          <path d="M6 10.5L9 13.5L14 8.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <div className="flex flex-col items-start">
                      <span className={`font-semibold ${isSelected ? "text-blue-700" : "text-slate-800"}`}>{o.user}</span>
                      <span className="text-slate-500 text-base leading-tight">{o.project}</span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
