import React from "react";

export interface ComparisonSummaryCardProps {
  title: string;
  count: number;
  items: string[];
  color?: "green" | "blue" | "purple";
  className?: string;
}

const colorMap = {
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    bullet: "text-green-600",
    count: "text-green-600",
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    bullet: "text-blue-600",
    count: "text-blue-600",
  },
  purple: {
    bg: "bg-fuchsia-50",
    border: "border-fuchsia-200",
    text: "text-fuchsia-700",
    bullet: "text-fuchsia-600",
    count: "text-fuchsia-600",
  },
};

export const ComparisonSummaryCard: React.FC<ComparisonSummaryCardProps> = ({
  title,
  count,
  items,
  className = "",
}) => {
  const c = colorMap["blue"];
  return (
      <div className={`rounded-2xl border ${c.bg} ${c.border} px-3 py-3 w-[100px] mx-auto ${className}`} style={{borderWidth: 1}}>
        <div className={`font-medium text-base mb-1 ${c.text}`}>{title}</div>
        <div className={`text-2xl font-bold mb-2 ${c.count}`}>{count}</div>
        <ul className="space-y-0.5">
        {items.map((item, i) =>
          <li key={i} className={`flex items-baseline ${c.bullet}`}>
              <span className="mr-1 text-base">•</span>
              <span className="text-sm">
              {item}
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};
