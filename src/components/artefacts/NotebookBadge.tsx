export type NotebookBadgeProps = {
  index: number;
  className?: string;
};

export function NotebookBadge({ index, className }: NotebookBadgeProps) {
  return (
    <span
      className={[
        "inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {index}
    </span>
  );
}
