import React, { useMemo } from 'react';
import { Link } from 'react-router';
import { PatternType } from '@/types/PatternType';

const DEFAULT_COLORS: Record<string, string> = {
  green: '#10B981',
  orange: '#F59E0B',
  red: '#EF4444',
  white: '#ffffff',
  gray: '#9CA3AF',
};

interface BadgePatternProps {
  pattern?: PatternType;
}

const getColorFromNotebooks = (notebooks?: Record<string, number>): string => {
  if (!notebooks) return 'white';
  
  const scores = Object.values(notebooks);
  if (scores.length === 0) return 'white';

  const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  
  if (averageScore >= 0.7) return 'green';
  if (averageScore >= 0.4) return 'orange';
  return 'red';
};

const BadgePattern: React.FC<BadgePatternProps> = ({
  pattern,
}) => {
  const finalLabel = pattern?.id;

  const finalColorKey = useMemo(() => {
    if (pattern) return getColorFromNotebooks(pattern.notebooks);
    return 'white';
  }, [pattern]);

  const hexColor = DEFAULT_COLORS[finalColorKey] || finalColorKey;

  const patternUrl = pattern?.id ? `/pattern/${pattern.id}` : '#';

  return (
    <Link
      to={patternUrl}
      className="inline-flex items-center justify-center px-5 py-2 border-2 font-bold transition-all hover:opacity-80 cursor-pointer"
      style={{
        borderRadius: '1.25rem',
        backgroundColor: `${hexColor}1A`,
        borderColor: `${hexColor}4D`,
        color: hexColor,
      }}
    >
      <span className="text-2xl tracking-tight leading-none">
        {finalLabel}
      </span>
    </Link>
  );
};

export default BadgePattern;