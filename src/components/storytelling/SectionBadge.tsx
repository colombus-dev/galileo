import React from 'react';
import { MdCheckCircle, MdCode } from 'react-icons/md';

export interface SectionBadgeProps {
  hasMarkdown: boolean;
  cellCount: number;
  compact?: boolean;
  className?: string;
}

/**
 * Badge indicateur du type de section (markdown disponible ou code only)
 */
export const SectionBadge: React.FC<SectionBadgeProps> = ({
  hasMarkdown,
  cellCount,
  compact = false,
  className = '',
}) => {
  if (compact) {
    return (
      <div
        className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
          hasMarkdown
            ? 'bg-green-100 text-green-700'
            : 'bg-amber-100 text-amber-700'
        } ${className}`}
        title={hasMarkdown ? 'Markdown disponible' : 'Code seulement'}
      >
        {hasMarkdown ? (
          <MdCheckCircle className="text-lg" />
        ) : (
          <MdCode className="text-lg" />
        )}
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
        hasMarkdown
          ? 'bg-green-50 text-green-700 border border-green-200'
          : 'bg-amber-50 text-amber-700 border border-amber-200'
      } ${className}`}
    >
      {hasMarkdown ? (
        <>
          <MdCheckCircle className="text-base" />
          <span>Texte + Code ({cellCount})</span>
        </>
      ) : (
        <>
          <MdCode className="text-base" />
          <span>Code seulement ({cellCount})</span>
        </>
      )}
    </div>
  );
};
