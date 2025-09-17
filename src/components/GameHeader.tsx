import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, Coins, Trophy, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';
import GameifiedAvatar from './GameifiedAvatar';

interface GameHeaderProps {
  backTo: string;
  backLabel?: string;
  showStats?: boolean;
  showAvatar?: boolean;
}

interface StudentData {
  name: string;
  class: string;
  xp: number;
  coins: number;
  badges: string[];
  completedChapters: string[];
}

const GameHeader: React.FC<GameHeaderProps> = ({ 
  backTo, 
  backLabel,
  showStats = true, 
  showAvatar = false 
}) => {
  const { t } = useLanguage();
  const [studentData, setStudentData] = useState<StudentData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("rued_student");
    if (stored) {
      setStudentData(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="flex items-center justify-between mb-8">
      <Link to={backTo} className="flex items-center text-white hover:text-white/80 transition-all duration-300 hover:scale-105">
        <ArrowLeft className="w-5 h-5 mr-2" />
        {backLabel || t('back')}
      </Link>
      
      <div className="flex items-center space-x-4">
        {showAvatar && studentData && (
          <div className="flex items-center space-x-3">
            <GameifiedAvatar name={studentData.name} size="sm" />
            <span className="text-white font-medium">{studentData.name}</span>
          </div>
        )}
        
        {showStats && studentData && (
          <div className="flex items-center space-x-4">
            <div className="xp-badge animate-pulse-glow">
              <Zap className="w-4 h-4 mr-1" />
              {studentData.xp} {t('xp')}
            </div>
            <div className="coins-badge animate-pulse-glow">
              <Coins className="w-4 h-4 mr-1" />
              {studentData.coins} {t('coins')}
            </div>
            <div className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse-glow">
              <Trophy className="w-4 h-4 mr-1 inline" />
              {studentData.badges.length}
            </div>
          </div>
        )}
        
        <LanguageSelector />
      </div>
    </div>
  );
};

export default GameHeader;