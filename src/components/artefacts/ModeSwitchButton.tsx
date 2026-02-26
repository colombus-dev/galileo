import React from "react";
import { MdAltRoute } from "react-icons/md";

export type ModeType = "simple" | "comparaison";

export interface ModeSwitchButtonProps {
  mode: ModeType;
  onChange: (mode: ModeType) => void;
}

export const ModeSwitchButton: React.FC<ModeSwitchButtonProps> = ({
  mode,
  onChange,
}) => {
  return (
    <div className="flex gap-3">
      <button
        type="button"
        className={`flex items-center gap-2 px-7 py-3 rounded-2xl font-medium text-lg transition shadow-sm
          ${
            mode === "simple"
              ? "bg-blue-600 text-white"
              : "bg-blue-50 text-blue-600 hover:bg-blue-100"
          }
        `}
        onClick={() => onChange("simple")}
      >
        <MdAltRoute className="text-xl" />
        Mode simple
      </button>
      <button
        type="button"
        className={`flex items-center gap-2 px-7 py-3 rounded-2xl font-medium text-lg transition shadow-sm
    ${
      mode === "comparaison"
        ? "bg-fuchsia-600 text-white"
        : "bg-white text-slate-900 hover:bg-fuchsia-50"
    }
  `}
        onClick={() => onChange("comparaison")}
      >
        <MdAltRoute className="text-xl" />
        Mode comparaison
      </button>
    </div>
  );
};
