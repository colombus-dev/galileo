import React, { useMemo } from 'react';
import { Link } from 'react-router';
import { PatternType, Counts } from '@/types/PatternType';

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

const SCORE_WEIGHTS: Record<keyof Counts, number> = {
  '[0-0.2[': 0.1,
  '[0.2-0.4[': 0.3,
  '[0.4-0.6[': 0.5,
  '[0.6-0.8[': 0.7,
  '[0.8-1.0]': 0.9,
};

const getColorFromScore = (score: Counts): string => {
  let totalCount = 0;
  let weightedSum = 0;

  (Object.keys(SCORE_WEIGHTS) as Array<keyof Counts>).forEach((key) => {
    const count = score[key] || 0;
    const weight = SCORE_WEIGHTS[key];
    weightedSum += count * weight;
    totalCount += count;
  });

  if (totalCount === 0) return 'white';

  const averageScore = weightedSum / totalCount;
  if (averageScore >= 0.7) return 'green';
  if (averageScore >= 0.4) return 'orange';
  return 'red';
};

const BadgePattern: React.FC<BadgePatternProps> = ({
  pattern,
}) => {
  const finalLabel = pattern?.id;

  const finalColorKey = useMemo(() => {
    if (pattern && pattern.score) return getColorFromScore(pattern.score);
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