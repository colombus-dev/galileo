export const MAX_COMPARISON_NOTEBOOKS = 3;

export function getVisibleNotebooks<T>(items: T[], max = MAX_COMPARISON_NOTEBOOKS): T[] {
  return items.slice(0, max);
}

export function getNotebookColsClass(count: number): string {
  if (count === 2) return "grid-cols-2";
  if (count === 3) return "grid-cols-3";
  return "grid-cols-1";
}

export function getResponsiveNotebookColsClass(
  count: number,
  breakpoint: "sm" | "md" | "lg" | "xl" = "lg",
): string {
  if (count === 2) return `${breakpoint}:grid-cols-2`;
  if (count === 3) return `${breakpoint}:grid-cols-3`;
  return `${breakpoint}:grid-cols-1`;
}
