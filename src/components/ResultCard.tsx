import React from "react";

export interface ResultCardProps {
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  icon,
  title,
  children,
  className = "",
  iconClassName = "",
  titleClassName = "",
}) => (
  <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm px-6 py-8 max-w-md ${className}`}>
    <div className="flex items-center gap-2 mb-4">
      {icon && <span className={`text-xl ${iconClassName}`}>{icon}</span>}
      <span className={`font-medium text-lg ${titleClassName}`}>{title}</span>
    </div>
    <div>{children}</div>
  </div>
);
