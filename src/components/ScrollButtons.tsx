interface ScrollButtonsProps {
  onScrollTop: () => void;
  onScrollBottom: () => void;
  className?: string;
}

export function ScrollButtons({
  onScrollTop,
  onScrollBottom,
  className = "",
}: ScrollButtonsProps) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex flex-col gap-2 ${className}`}
    >
      <button
        type="button"
        onClick={onScrollTop}
        aria-label="Aller en haut"
        className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md hover:bg-slate-50"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M12 5l-7 7m7-7l7 7m-7-7v14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        type="button"
        onClick={onScrollBottom}
        aria-label="Aller en bas"
        className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md hover:bg-slate-50"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M12 19l7-7m-7 7l-7-7m7 7V5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
