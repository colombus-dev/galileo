import React, { useState } from "react";
import { MdFilterList, MdStorage, MdPsychology, MdShowChart, MdBarChart } from "react-icons/md";

const FILTERS = [
  { key: "all", label: "Tout", icon: <MdFilterList size={28} /> },
  { key: "data", label: "Données", icon: <MdStorage size={28} /> },
  { key: "model", label: "Modèles", icon: <MdPsychology size={28} /> },
  { key: "viz", label: "Visualisations", icon: <MdBarChart size={28} /> },
  { key: "metric", label: "Métriques", icon: <MdShowChart size={28} /> },
];

export type ArtefactFilterKey = "all" | "data" | "model" | "viz" | "metric";

export interface ArtefactFilterMenuProps {
  value: ArtefactFilterKey;
  onChange: (key: ArtefactFilterKey) => void;
}

export const ArtefactFilterMenu: React.FC<ArtefactFilterMenuProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#f7fafd] border border-slate-100 text-slate-700 font-medium shadow-sm hover:bg-blue-50 transition text-lg"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        type="button"
      >
        <MdFilterList className="text-2xl" />
        Filtres
      </button>
      {open && (
        <div className="absolute left-0 mt-2 z-20 min-w-[290px] bg-white rounded-3xl shadow-xl border border-slate-100 py-3 animate-fade-in">
          <div className="px-7 pt-1 pb-3 text-slate-500 text-base font-medium select-none">Type d’artefacts</div>
          <ul className="flex flex-col gap-1">
            {FILTERS.map((f) => (
              <li key={f.key}>
                <button
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-left transition font-medium text-lg
                    ${value === f.key
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-blue-50"}
                  `}
                  onClick={() => { onChange(f.key as ArtefactFilterKey); setOpen(false); }}
                  type="button"
                >
                  <span className={`flex items-center justify-center w-12 h-12 rounded-xl mr-2
                    ${value === f.key ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-400"}
                  `}>
                    {f.icon}
                  </span>
                  {f.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
