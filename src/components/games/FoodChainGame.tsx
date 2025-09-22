import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { Trophy, RotateCcw, ArrowRight } from 'lucide-react';
import ConfettiEffect from '@/components/ConfettiEffect';

interface FoodChainGameProps {
  onComplete: (score: number, xp: number) => void;
}

const FoodChainGame: React.FC<FoodChainGameProps> = ({ onComplete }) => {
  const { t } = useLanguage();
  const [droppedItems, setDroppedItems] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const foodChains = [
    {
      correct: ['Sun', 'Grass', 'Rabbit', 'Fox'],
      items: ['Fox', 'Grass', 'Sun', 'Rabbit'],
      description: 'Forest Food Chain'
    },
    {
      correct: ['Sun', 'Algae', 'Fish', 'Shark'],
      items: ['Shark', 'Algae', 'Sun', 'Fish'],
      description: 'Ocean Food Chain'
    },
    {
      correct: ['Sun', 'Corn', 'Mouse', 'Snake', 'Eagle'],
      items: ['Eagle', 'Corn', 'Sun', 'Mouse', 'Snake'],
      description: 'Grassland Food Chain'
    }
  ];

  const currentChain = foodChains[level - 1];

  const getItemEmoji = (item: string) => {
    const emojis: { [key: string]: string } = {
      'Sun': '☀️',
      'Grass': '🌱',
      'Rabbit': '🐰',
      'Fox': '🦊',
      'Algae': '🌿',
      'Fish': '🐟',
      'Shark': '🦈',
      'Corn': '🌽',
      'Mouse': '🐭',
      'Snake': '🐍',
      'Eagle': '🦅'
    };
    return emojis[item] || '❓';
  };

  const handleDrop = (item: string) => {
    if (!droppedItems.includes(item)) {
      const newDroppedItems = [...droppedItems, item];
      setDroppedItems(newDroppedItems);
      
      if (newDroppedItems.length === currentChain.correct.length) {
        const isCorrect = newDroppedItems.every((item, index) => item === currentChain.correct[index]);
        
        if (isCorrect) {
          const points = 150 + (level * 25);
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
            if (level >= foodChains.length) {
              setGameCompleted(true);
              onComplete(score + points, Math.floor((score + points) / 10));
            } else {
              setLevel(prev => prev + 1);
              setDroppedItems([]);
            }
          }, 2000);
        } else {
          toast.error(t('tryAgain'));
          setTimeout(() => setDroppedItems([]), 1000);
        }
      }
    }
  };

  const resetGame = () => {
    setLevel(1);
    setScore(0);
    setDroppedItems([]);
    setGameCompleted(false);
  };

  if (gameCompleted) {
    return (
      <div className="text-center space-y-6">
        <div className="text-8xl animate-bounce-gentle">🌿</div>
        <h3 className="text-3xl font-bold text-biology title-futuristic">Ecosystem Master!</h3>
        <p className="text-xl text-muted-foreground">You understand food chains perfectly!</p>
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
        <h3 className="text-3xl font-bold text-biology mb-4 title-futuristic animate-neon-pulse">
          {t('foodChain')}
        </h3>
        <p className="text-xl text-muted-foreground mb-2">
          {currentChain.description}
        </p>
        <p className="text-lg text-muted-foreground mb-6">
          Arrange organisms in the correct food chain order!
        </p>
        
        {/* Progress */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-semibold text-foreground">
            Level {level} / {foodChains.length}
          </div>
          <div className="xp-badge">
            <Trophy className="w-4 h-4 mr-1" />
            {score} XP
          </div>
        </div>
        
        <Progress value={(level / foodChains.length) * 100} className="progress-neon mb-8" />
      </div>

      {/* Drop zones */}
      <div className="flex justify-center items-center space-x-4 mb-8 overflow-x-auto pb-4">
        {currentChain.correct.map((_, index) => (
          <React.Fragment key={index}>
            <div className="flex-shrink-0 w-24 h-24 border-2 border-dashed border-biology/50 rounded-xl flex items-center justify-center bg-biology/10 hover:bg-biology/20 transition-all duration-300">
              {droppedItems[index] ? (
                <div className="text-center">
                  <div className="text-4xl mb-1 animate-bounce-gentle">{getItemEmoji(droppedItems[index])}</div>
                  <div className="text-xs text-biology font-semibold">{droppedItems[index]}</div>
                </div>
              ) : (
                <div className="text-biology/50 text-sm font-semibold">
                  {index + 1}
                </div>
              )}
            </div>
            {index < currentChain.correct.length - 1 && (
              <ArrowRight className="w-6 h-6 text-biology animate-pulse flex-shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Energy Flow Indicator */}
      <div className="text-center mb-8">
        <div className="inline-block bg-biology/20 rounded-lg px-6 py-3">
          <div className="text-biology font-semibold mb-1">Energy Flow</div>
          <div className="text-sm text-muted-foreground">
            Energy flows from producers to consumers
          </div>
        </div>
      </div>

      {/* Draggable items */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {currentChain.items.filter(item => !droppedItems.includes(item)).map(item => (
          <Button
            key={item}
            onClick={() => handleDrop(item)}
            className="w-28 h-28 bg-card/80 hover:bg-biology/20 border-2 border-biology/30 hover:border-biology hover:shadow-glow-biology transition-all duration-300 flex-col space-y-2"
            variant="outline"
          >
            <div className="text-4xl animate-float">{getItemEmoji(item)}</div>
            <div className="text-sm font-semibold text-biology">{item}</div>
          </Button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4">
        <Button 
          onClick={() => setDroppedItems([])}
          variant="outline"
          className="bg-card/50 border-biology/30 text-biology hover:bg-biology hover:text-background"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
        
        <Button 
          onClick={resetGame}
          variant="neon"
          className="border-biology text-biology hover:bg-biology"
        >
          New Game
        </Button>
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-muted-foreground bg-card/30 rounded-lg p-4">
        <p>Click on organisms to place them in the correct food chain order!</p>
        <p>Remember: Energy flows from the sun to producers, then to consumers.</p>
      </div>
    </div>
  );
};

export default FoodChainGame;