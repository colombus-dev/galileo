import React from 'react';
import { CodeViewer } from '@/components/artefacts/CodeViewer';
import { TokenChip } from './TokenChip';
import { useExtractTokens } from '@/hooks/useExtractTokens';
import type { NotebookCell, Token } from '@/types/notebook';

export interface CodeCellProps {
  cell: NotebookCell;
  onTokenClick?: (token: Token) => void;
  onDocKeyClick?: (docKey: string) => void;
  showLineNumbers?: boolean;
  className?: string;
}

/**
 * Affiche une cellule de code avec syntax highlighting
 * et liste des tokens cliquables en dessous
 */
export const CodeCell: React.FC<CodeCellProps> = ({
  cell,
  onTokenClick,
  onDocKeyClick,
  showLineNumbers,
  className = '',
}) => {
  if (cell.type !== 'code') {
    return null;
  }

  // Extraire les tokens du code basé sur la base de connaissance
  const extractedTokens = useExtractTokens(cell.content);
  // Utiliser les tokens extraits, avec fallback sur cell.tokens si disponible
  const tokens = extractedTokens.length > 0 ? extractedTokens : (cell.tokens || []);

  return (
    <div className={`w-full space-y-4 ${className}`}>
      <div className="w-full">
        <CodeViewer
          code={cell.content}
          language="python"
          className="max-w-none w-full"
          showLineNumbers={showLineNumbers}
          enableDocLinks={true}
          onDocKeyClick={onDocKeyClick}
        />
      </div>

      {/* Description optional */}
      {cell.description && (
        <p className="text-xs text-slate-600 italic px-2">{cell.description}</p>
      )}

      {/* Tokens */}
      {tokens.length > 0 && (
        <div className="w-full pt-2 border-t border-slate-200">
          <p className="text-xs text-slate-600 font-medium mb-2">Tokens cliquables :</p>
          <div className="w-full flex flex-wrap gap-2">
            {tokens.map((token) => (
              <TokenChip
                key={token.id}
                token={token}
                onClick={() => onTokenClick?.(token)}
                size="sm"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
