import React from 'react';

const DEFAULT_COLORS: Record<string, string> = {
  green: '#10B981',
  orange: '#F59E0B',
  red: '#EF4444', 
  white: '#ffffff',
};

interface BadgePatternProps {
  label: string;
  color?: 'green' | 'orange' | 'red' | 'white' | string;
}

const BadgePattern: React.FC<BadgePatternProps> = ({ 
  label, 
  color = 'white',
}) => {
  const finalColor = DEFAULT_COLORS[color] || color;

  return (
    <div
      className={`inline-flex items-center justify-center px-5 py-2 border-2 font-bold transition-all`}
      style={{
        borderRadius: '1.25rem', 
        backgroundColor: `${finalColor}1A`,
        borderColor: `${finalColor}4D`,
        color: finalColor,
      }}
    >
      <span className="text-2xl tracking-tight leading-none">
        {label}
      </span>
    </div>
  );
};

export default BadgePattern;