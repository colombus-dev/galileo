import React, { useMemo } from 'react';
import BadgePattern from '@/components/BagdePattern';
import { mockDataPattern } from '@/data/patternMockData';

interface PatternPipelineProps {
  notebookName: string;
  direction?: 'horizontal' | 'vertical';
}

const PatternPipeline: React.FC<PatternPipelineProps> = ({ 
  notebookName, 
  direction = 'horizontal' 
}) => {
  
  const pipelinePatterns = useMemo(() => {
    const filtered = mockDataPattern.filter((pattern) => 
      Object.prototype.hasOwnProperty.call(pattern.notebooks, notebookName)
    );

    return filtered.sort((a, b) => {
      const scoreA = a.notebooks[notebookName] || 0;
      const scoreB = b.notebooks[notebookName] || 0;
      return scoreB - scoreA;
    });
  }, [notebookName]);

  if (pipelinePatterns.length === 0) {
    return <div className="text-gray-400 italic">Aucun pattern détecté pour {notebookName}</div>;
  }

  const isVertical = direction === 'vertical';

  return (
    <div 
      className={`flex items-center gap-3 ${isVertical ? 'flex-col' : 'flex-wrap'}`}
    >
      {pipelinePatterns.map((pattern, index) => (
        <React.Fragment key={pattern.id}>
          <BadgePattern pattern={pattern} />

          {/* Séparateur (Flèche) */}
          {index < pipelinePatterns.length - 1 && (
            <div 
              className={`text-gray-400 flex items-center justify-center transition-transform ${isVertical ? 'rotate-90' : ''}`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default PatternPipeline;