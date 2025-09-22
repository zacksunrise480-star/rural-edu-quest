import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import GameifiedAvatar from '@/components/GameifiedAvatar';
import { useLanguage } from '@/contexts/LanguageContext';
import { Trophy, Medal, Crown, Star, Zap, Target } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  name: string;
  class: string;
  xp: number;
  level: number;
  badges: number;
  streak: number;
  rank: number;
  accuracy: number;
}

interface GamingLeaderboardProps {
  className?: string;
}

const GamingLeaderboard: React.FC<GamingLeaderboardProps> = ({ className }) => {
  const { t } = useLanguage();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [currentUser, setCurrentUser] = useState<LeaderboardEntry | null>(null);

  useEffect(() => {
    // Enhanced mock data with more gaming elements
    const mockData: LeaderboardEntry[] = [
      { id: '1', name: 'Arjun Kumar', class: '8th A', xp: 3250, level: 15, badges: 18, streak: 12, rank: 1, accuracy: 96 },
      { id: '2', name: 'Priya Patel', class: '8th B', xp: 2980, level: 14, badges: 15, streak: 8, rank: 2, accuracy: 94 },
      { id: '3', name: 'Rohan Singh', class: '8th A', xp: 2750, level: 13, badges: 14, streak: 6, rank: 3, accuracy: 92 },
      { id: '4', name: 'Anisha Rao', class: '8th C', xp: 2450, level: 12, badges: 12, streak: 15, rank: 4, accuracy: 98 },
      { id: '5', name: 'Kiran Dash', class: '8th B', xp: 2200, level: 11, badges: 10, streak: 4, rank: 5, accuracy: 89 },
      { id: '6', name: 'Vikram Joshi', class: '8th A', xp: 1980, level: 10, badges: 9, streak: 7, rank: 6, accuracy: 91 },
      { id: '7', name: 'Meera Gupta', class: '8th C', xp: 1750, level: 9, badges: 8, streak: 3, rank: 7, accuracy: 87 }
    ];

    setLeaderboard(mockData);
    
    // Get current user from localStorage
    const studentData = localStorage.getItem('rued_student');
    if (studentData) {
      const data = JSON.parse(studentData);
      setCurrentUser({
        id: 'current',
        name: data.name,
        class: data.class,
        xp: data.xp || 150,
        level: Math.floor((data.xp || 150) / 200) + 1,
        badges: data.badges?.length || 0,
        streak: Math.floor(Math.random() * 5) + 1,
        rank: 12,
        accuracy: 85 + Math.floor(Math.random() * 10)
      });
    }
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-8 w-8 text-badge-gold animate-neon-pulse" />;
      case 2:
        return <Medal className="h-7 w-7 text-badge-silver animate-neon-pulse" />;
      case 3:
        return <Trophy className="h-6 w-6 text-badge-bronze animate-neon-pulse" />;
      default:
        return <span className="text-2xl font-bold text-primary animate-neon-pulse">#{rank}</span>;
    }
  };

  const getRankColors = (rank: number) => {
    switch (rank) {
      case 1:
        return 'border-badge-gold shadow-[0_0_30px_hsl(var(--badge-gold)/0.4)] bg-gradient-to-r from-badge-gold/10 to-badge-gold/5';
      case 2:
        return 'border-badge-silver shadow-[0_0_30px_hsl(var(--badge-silver)/0.4)] bg-gradient-to-r from-badge-silver/10 to-badge-silver/5';
      case 3:
        return 'border-badge-bronze shadow-[0_0_30px_hsl(var(--badge-bronze)/0.4)] bg-gradient-to-r from-badge-bronze/10 to-badge-bronze/5';
      default:
        return 'border-primary/30 hover:border-primary/60 bg-card/50';
    }
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 95) return 'text-green-400';
    if (accuracy >= 85) return 'text-yellow-400';
    return 'text-orange-400';
  };

  return (
    <Card className={`gaming-card border-2 border-primary/30 hover:border-primary/60 shadow-glow ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-3 text-primary title-futuristic">
          <Trophy className="h-8 w-8 animate-neon-pulse" />
          <span className="text-2xl">{t('leaderboard')}</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Current User Highlight */}
        {currentUser && (
          <div className="p-6 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-xl border-2 border-primary/40 shadow-glow animate-neon-pulse">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <GameifiedAvatar name={currentUser.name} size="md" />
                <div>
                  <p className="font-bold text-lg text-foreground title-futuristic">
                    {currentUser.name} <span className="text-primary">({t('you')})</span>
                  </p>
                  <p className="text-sm text-muted-foreground">{currentUser.class}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6 text-right">
                <div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-primary animate-sparkle" />
                    <span className="text-lg font-bold text-primary">{currentUser.xp} XP</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Level {currentUser.level}</div>
                </div>
                <div className="text-3xl font-bold text-primary animate-neon-pulse">#{currentUser.rank}</div>
              </div>
            </div>
          </div>
        )}

        {/* Top Players */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-secondary mb-4 title-futuristic">🏆 Hall of Fame</h3>
          {leaderboard.map((player, index) => (
            <div
              key={player.id}
              className={`flex items-center justify-between p-6 rounded-xl border-2 transition-all duration-500 hover:scale-105 ${getRankColors(player.rank)}`}
            >
              <div className="flex items-center space-x-6">
                <div className="flex items-center justify-center w-16">
                  {getRankIcon(player.rank)}
                </div>
                
                <GameifiedAvatar name={player.name} size="md" />
                
                <div>
                  <p className="font-bold text-lg text-foreground title-futuristic">{player.name}</p>
                  <p className="text-sm text-muted-foreground">{player.class}</p>
                </div>
              </div>

              <div className="flex items-center space-x-8">
                {/* XP & Level */}
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-primary animate-neon-pulse" />
                    <span className="font-bold text-lg text-foreground">{player.xp}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Level {player.level}</div>
                </div>

                {/* Badges */}
                <div className="text-right">
                  <Badge variant="secondary" className="bg-gradient-to-r from-badge-gold to-coins text-background font-bold">
                    <Trophy className="h-4 w-4 mr-1" />
                    {player.badges}
                  </Badge>
                </div>

                {/* Streak */}
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-accent animate-neon-pulse" />
                    <span className="font-bold text-lg text-accent">{player.streak}x</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{t('streak')}</div>
                </div>

                {/* Accuracy */}
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-secondary animate-neon-pulse" />
                    <span className={`font-bold text-lg ${getAccuracyColor(player.accuracy)}`}>
                      {player.accuracy}%
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">{t('accuracy')}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gaming Stats */}
        <div className="mt-8 grid grid-cols-3 gap-6 pt-6 border-t border-border">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary animate-neon-pulse title-futuristic">256</div>
            <div className="text-sm text-muted-foreground">{t('totalPlayers')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary animate-neon-pulse title-futuristic">4.2k</div>
            <div className="text-sm text-muted-foreground">{t('gamesPlayed')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent animate-neon-pulse title-futuristic">92%</div>
            <div className="text-sm text-muted-foreground">Avg {t('accuracy')}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GamingLeaderboard;