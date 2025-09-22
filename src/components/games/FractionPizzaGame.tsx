import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { Trophy, RotateCcw } from 'lucide-react';
import ConfettiEffect from '@/components/ConfettiEffect';

interface FractionPizzaGameProps {
  onComplete: (score: number, xp: number) => void;
}

const FractionPizzaGame: React.FC<FractionPizzaGameProps> = ({ onComplete }) => {
  const { t } = useLanguage();
  const [selectedSlices, setSelectedSlices] = useState<number>(0);
  const [targetFraction, setTargetFraction] = useState({ numerator: 1, denominator: 4 });
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const fractions = [
    { numerator: 1, denominator: 4, slices: 1 },
    { numerator: 1, denominator: 2, slices: 2 },
    { numerator: 3, denominator: 4, slices: 3 },
    { numerator: 1, denominator: 8, slices: 1 },
    { numerator: 3, denominator: 8, slices: 3 },
  ];

  useEffect(() => {
    if (level <= fractions.length) {
      const currentFraction = fractions[level - 1];
      setTargetFraction(currentFraction);
      setSelectedSlices(0);
    }
  }, [level]);

  const handleSliceClick = (slices: number) => {
    setSelectedSlices(slices);
    
    if (slices === targetFraction.slices) {
      const points = 100 + (level * 20);
      setScore(prev => prev + points);
      setShowConfetti(true);
      
      toast.success(
        <div className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-yellow-400 animate-sparkle" />
          <span>{t('correct')} +{points} XP</span>
        </div>
      );

      setTimeout(() => {
        setShowConfetti(false);
        if (level >= fractions.length) {
          setGameCompleted(true);
          onComplete(score + points, Math.floor((score + points) / 10));
        } else {
          setLevel(prev => prev + 1);
        }
      }, 1500);
    } else {
      toast.error(t('tryAgain'));
      setSelectedSlices(0);
    }
  };

  const resetGame = () => {
    setLevel(1);
    setScore(0);
    setSelectedSlices(0);
    setGameCompleted(false);
  };

  if (gameCompleted) {
    return (
      <div className="text-center space-y-6">
        <div className="text-8xl animate-bounce-gentle">🎉</div>
        <h3 className="text-3xl font-bold text-primary title-futuristic">Game Complete!</h3>
        <p className="text-xl text-muted-foreground">You mastered fractions!</p>
        <div className="xp-badge text-xl px-8 py-4">
          <Trophy className="w-6 h-6 mr-2" />
          Final Score: {score} XP
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ConfettiEffect active={showConfetti} />
      
      {/* Game Header */}
      <div className="text-center">
        <h3 className="text-3xl font-bold text-primary mb-4 title-futuristic animate-neon-pulse">
          {t('fractionPizza')}
        </h3>
        <p className="text-xl text-muted-foreground mb-6">
          Select {targetFraction.numerator}/{targetFraction.denominator} of the pizza!
        </p>
        
        {/* Progress */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-semibold text-foreground">
            Level {level} / {fractions.length}
          </div>
          <div className="xp-badge">
            <Trophy className="w-4 h-4 mr-1" />
            {score} XP
          </div>
        </div>
        
        <Progress value={(level / fractions.length) * 100} className="progress-neon mb-8" />
      </div>

      {/* Pizza Game */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="w-80 h-80 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-8 border-yellow-600 relative overflow-hidden shadow-glow hover:shadow-glow-accent transition-all duration-300">
            {/* Pizza base */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-red-400 to-red-600 opacity-80" />
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 opacity-60" />
            
            {/* Pizza slices */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map(slice => (
              <div
                key={slice}
                className={`absolute w-1/2 h-1/2 cursor-pointer transition-all duration-300 ${
                  slice < selectedSlices 
                    ? 'bg-gradient-to-br from-primary to-accent opacity-90 shadow-glow' 
                    : 'hover:bg-white/20'
                }`}
                style={{
                  transformOrigin: 'bottom right',
                  transform: `rotate(${slice * 45}deg)`,
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
                  top: '50%',
                  left: '50%',
                  marginTop: '-50%',
                  marginLeft: '-50%'
                }}
                onClick={() => handleSliceClick(slice + 1)}
              >
                {slice < selectedSlices && (
                  <div className="absolute inset-2 bg-gradient-to-br from-primary to-secondary rounded opacity-80 animate-neon-pulse" />
                )}
              </div>
            ))}
            
            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-yellow-800 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Fraction Display */}
      <div className="text-center mb-8">
        <div className="inline-block bg-card/80 backdrop-blur-sm border-2 border-primary/30 rounded-xl p-6">
          <div className="text-6xl font-bold text-primary title-futuristic mb-2">
            {selectedSlices}/{8}
          </div>
          <div className="text-lg text-muted-foreground">
            Target: {targetFraction.numerator}/{targetFraction.denominator}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4">
        <Button 
          onClick={() => setSelectedSlices(0)}
          variant="outline"
          className="bg-card/50 border-primary/30 text-primary hover:bg-primary hover:text-background"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
        
        <Button 
          onClick={resetGame}
          variant="neon"
          className="border-secondary text-secondary hover:bg-secondary"
        >
          New Game
        </Button>
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-muted-foreground bg-card/30 rounded-lg p-4">
        <p>Click on the pizza slices to select the correct fraction!</p>
        <p>Each correct answer earns you XP and advances to the next level.</p>
      </div>
    </div>
  );
};

export default FractionPizzaGame;