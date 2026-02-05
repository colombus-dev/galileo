
import React from "react";
import { MdStorage, MdPsychology, MdShowChart, MdBarChart } from "react-icons/md";

export type ArtefactType = "data" | "model" | "metric" | "viz";

export interface ArtefactItemProps {
  name: string;
  type: ArtefactType;
  cellIndex: number;
  description?: string;
  metadata?: Array<{
    label: string;
    value?: string | number;
  }>;
  selected?: boolean;
  onClick?: () => void;
}

const typeIcon: Record<ArtefactType, React.ReactNode> = {
  data: <MdStorage size={28} className="text-blue-400" />,
  model: <MdPsychology size={28} className="text-purple-400" />,
  metric: <MdShowChart size={28} className="text-yellow-500" />,
  viz: <MdBarChart size={28} className="text-green-500" />,
};

export function ArtefactItem({
  name,
  type,
  cellIndex,
  description,
  metadata = [],
  selected = false,
  onClick,
}: ArtefactItemProps) {
  return (
    <div
      className={`flex items-start gap-4 bg-blue-50 border-2 rounded-2xl px-7 py-5 shadow-sm my-2 min-w-[350px] max-w-[700px] cursor-pointer transition
        ${selected ? "border-blue-500 ring-2 ring-blue-200" : "border-blue-200 hover:border-blue-300"}`}
      onClick={onClick}
      data-testid="artefact-item"
    >
      <div className="bg-white rounded-lg w-10 h-10 flex items-center justify-center shadow-sm text-2xl shrink-0">
        {typeIcon[type]}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-xl text-slate-900">{name}</span>
          <span className="text-slate-400 text-base flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M4 4H20V20H4V4Z" stroke="#6b7a90" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M8 8H16V16H8V8Z" stroke="#6b7a90" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            {`</> Cellule ${cellIndex}`}
          </span>
        </div>
        {description && (
          <div className="text-slate-700 text-base mt-0.5">{description}</div>
        )}
        <div className="flex gap-2 mt-3 flex-wrap">
          {metadata.map((item, index) => (
            <span
              key={index}
              className="bg-white border border-blue-100 rounded-md px-3 py-1 text-blue-500 font-medium text-sm inline-block"
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}