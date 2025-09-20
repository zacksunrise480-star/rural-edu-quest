import React from 'react';
import { Progress } from '@/components/ui/progress';

interface XPProgressBarProps {
  currentXP: number;
  maxXP: number;
  level: number;
  className?: string;
}

const XPProgressBar: React.FC<XPProgressBarProps> = ({ 
  currentXP, 
  maxXP, 
  level, 
  className = '' 
}) => {
  const percentage = Math.min((currentXP / maxXP) * 100, 100);

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between text-sm text-white/80">
        <span className="font-semibold">Level {level}</span>
        <span>{currentXP} / {maxXP} XP</span>
      </div>
      
      <div className="progress-neon h-3">
        <div 
          className="progress-fill transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="text-center">
        <span className="text-xs text-white/60">
          {maxXP - currentXP} XP to next level
        </span>
      </div>
    </div>
  );
};

export default XPProgressBar;