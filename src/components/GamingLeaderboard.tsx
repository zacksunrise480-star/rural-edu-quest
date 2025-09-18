import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import GameifiedAvatar from '@/components/GameifiedAvatar';
import { useLanguage } from '@/contexts/LanguageContext';
import { Trophy, Medal, Crown, Star, Zap } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  name: string;
  class: string;
  xp: number;
  level: number;
  badges: number;
  streak: number;
  rank: number;
}

interface GamingLeaderboardProps {
  className?: string;
}

const GamingLeaderboard: React.FC<GamingLeaderboardProps> = ({ className }) => {
  const { t } = useLanguage();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [currentUser, setCurrentUser] = useState<LeaderboardEntry | null>(null);

  useEffect(() => {
    // Simulate leaderboard data
    const mockData: LeaderboardEntry[] = [
      { id: '1', name: 'Arjun Kumar', class: '8th A', xp: 2850, level: 12, badges: 15, streak: 7, rank: 1 },
      { id: '2', name: 'Priya Patel', class: '8th B', xp: 2650, level: 11, badges: 12, streak: 5, rank: 2 },
      { id: '3', name: 'Rohan Singh', class: '8th A', xp: 2450, level: 10, badges: 10, streak: 3, rank: 3 },
      { id: '4', name: 'Anisha Rao', class: '8th C', xp: 2250, level: 9, badges: 8, streak: 8, rank: 4 },
      { id: '5', name: 'Kiran Dash', class: '8th B', xp: 2100, level: 9, badges: 7, streak: 2, rank: 5 }
    ];

    setLeaderboard(mockData);
    
    // Get current user from localStorage
    const studentData = localStorage.getItem('studentData');
    if (studentData) {
      const data = JSON.parse(studentData);
      setCurrentUser({
        id: 'current',
        name: data.name,
        class: data.class,
        xp: data.xp || 150,
        level: Math.floor((data.xp || 150) / 100) + 1,
        badges: data.badges?.length || 0,
        streak: 1,
        rank: 8
      });
    }
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-badge-gold animate-neon-pulse" />;
      case 2:
        return <Medal className="h-6 w-6 text-badge-silver animate-neon-pulse" />;
      case 3:
        return <Trophy className="h-6 w-6 text-badge-bronze animate-neon-pulse" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankColors = (rank: number) => {
    switch (rank) {
      case 1:
        return 'border-badge-gold shadow-[0_0_20px_hsl(var(--badge-gold)/0.3)]';
      case 2:
        return 'border-badge-silver shadow-[0_0_20px_hsl(var(--badge-silver)/0.3)]';
      case 3:
        return 'border-badge-bronze shadow-[0_0_20px_hsl(var(--badge-bronze)/0.3)]';
      default:
        return 'border-primary/30';
    }
  };

  return (
    <Card className={`gaming-card ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-primary">
          <Trophy className="h-6 w-6 animate-neon-pulse" />
          <span>{t('leaderboard')}</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Current User */}
        {currentUser && (
          <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border-2 border-primary/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <GameifiedAvatar name={currentUser.name} size="sm" />
                <div>
                  <p className="font-semibold text-foreground">{currentUser.name} ({t('you')})</p>
                  <p className="text-sm text-muted-foreground">{currentUser.class}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-right">
                <div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-primary" />
                    <span className="text-sm font-bold">{currentUser.xp} XP</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Level {currentUser.level}</div>
                </div>
                <div className="text-2xl font-bold text-primary">#{currentUser.rank}</div>
              </div>
            </div>
          </div>
        )}

        {/* Top Players */}
        <div className="space-y-3">
          {leaderboard.map((player, index) => (
            <div
              key={player.id}
              className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${getRankColors(player.rank)}`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10">
                  {getRankIcon(player.rank)}
                </div>
                
                <GameifiedAvatar name={player.name} size="sm" />
                
                <div>
                  <p className="font-semibold text-foreground">{player.name}</p>
                  <p className="text-sm text-muted-foreground">{player.class}</p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                {/* XP & Level */}
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-primary animate-neon-pulse" />
                    <span className="font-bold text-foreground">{player.xp}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Level {player.level}</div>
                </div>

                {/* Badges */}
                <div className="text-right">
                  <Badge variant="secondary" className="bg-gradient-to-r from-badge-gold to-coins text-background">
                    <Trophy className="h-3 w-3 mr-1" />
                    {player.badges}
                  </Badge>
                </div>

                {/* Streak */}
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Zap className="h-4 w-4 text-accent animate-neon-pulse" />
                    <span className="font-bold text-accent">{player.streak}x</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{t('streak')}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gaming Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary animate-neon-pulse">156</div>
            <div className="text-xs text-muted-foreground">{t('totalPlayers')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary animate-neon-pulse">2.8k</div>
            <div className="text-xs text-muted-foreground">{t('gamesPlayed')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent animate-neon-pulse">95%</div>
            <div className="text-xs text-muted-foreground">{t('accuracy')}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GamingLeaderboard;