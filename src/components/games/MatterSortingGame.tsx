import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { Trophy, RotateCcw } from 'lucide-react';
import ConfettiEffect from '@/components/ConfettiEffect';

interface MatterSortingGameProps {
  onComplete: (score: number, xp: number) => void;
}

const MatterSortingGame: React.FC<MatterSortingGameProps> = ({ onComplete }) => {
  const { t } = useLanguage();
  const [sortedItems, setSortedItems] = useState<{[key: string]: string[]}>({
    solid: [],
    liquid: [],
    gas: []
  });
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const levels = [
    {
      items: ['Ice', 'Water', 'Steam', 'Rock', 'Milk', 'Air'],
      correct: {
        solid: ['Ice', 'Rock'],
        liquid: ['Water', 'Milk'],
        gas: ['Steam', 'Air']
      },
      description: 'Basic States of Matter'
    },
    {
      items: ['Wood', 'Oil', 'Oxygen', 'Metal', 'Juice', 'Helium'],
      correct: {
        solid: ['Wood', 'Metal'],
        liquid: ['Oil', 'Juice'],
        gas: ['Oxygen', 'Helium']
      },
      description: 'Common Materials'
    },
    {
      items: ['Diamond', 'Mercury', 'Nitrogen', 'Salt', 'Alcohol', 'Carbon Dioxide'],
      correct: {
        solid: ['Diamond', 'Salt'],
        liquid: ['Mercury', 'Alcohol'],
        gas: ['Nitrogen', 'Carbon Dioxide']
      },
      description: 'Advanced Materials'
    }
  ];

  const currentLevel = levels[level - 1];

  const getItemEmoji = (item: string) => {
    const emojis: { [key: string]: string } = {
      'Ice': '🧊', 'Water': '💧', 'Steam': '💨', 'Rock': '🪨', 'Milk': '🥛', 'Air': '🌬️',
      'Wood': '🪵', 'Oil': '🛢️', 'Oxygen': '💨', 'Metal': '🔩', 'Juice': '🧃', 'Helium': '🎈',
      'Diamond': '💎', 'Mercury': '🌡️', 'Nitrogen': '💨', 'Salt': '🧂', 'Alcohol': '🍷', 'Carbon Dioxide': '💨'
    };
    return emojis[item] || '❓';
  };

  const getStateColor = (state: string) => {
    const colors = {
      solid: 'chemistry',
      liquid: 'primary',
      gas: 'secondary'
    };
    return colors[state as keyof typeof colors] || 'muted';
  };

  const handleItemSort = (item: string, state: string) => {
    const newSorted = { ...sortedItems };
    
    // Remove from other states
    Object.keys(newSorted).forEach(key => {
      newSorted[key] = newSorted[key].filter(i => i !== item);
    });
    
    // Add to selected state
    newSorted[state] = [...newSorted[state], item];
    setSortedItems(newSorted);
    
    // Check if all items are sorted
    const totalSorted = Object.values(newSorted).flat().length;
    if (totalSorted === currentLevel.items.length) {
      checkAnswer(newSorted);
    }
  };

  const checkAnswer = (sorted: {[key: string]: string[]}) => {
    const isCorrect = Object.entries(currentLevel.correct).every(([state, items]) => {
      return items.every(item => sorted[state].includes(item)) && 
             sorted[state].length === items.length;
    });
    
    if (isCorrect) {
      const points = 140 + (level * 30);
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
        if (level >= levels.length) {
          setGameCompleted(true);
          onComplete(score + points, Math.floor((score + points) / 10));
        } else {
          setLevel(prev => prev + 1);
          setSortedItems({ solid: [], liquid: [], gas: [] });
        }
      }, 2000);
    } else {
      toast.error(t('tryAgain'));
      setTimeout(() => setSortedItems({ solid: [], liquid: [], gas: [] }), 1000);
    }
  };

  const resetGame = () => {
    setLevel(1);
    setScore(0);
    setSortedItems({ solid: [], liquid: [], gas: [] });
    setGameCompleted(false);
  };

  if (gameCompleted) {
    return (
      <div className="text-center space-y-6">
        <div className="text-8xl animate-bounce-gentle">🧪</div>
        <h3 className="text-3xl font-bold text-chemistry title-futuristic">Matter Expert!</h3>
        <p className="text-xl text-muted-foreground">You mastered states of matter!</p>
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
        <h3 className="text-3xl font-bold text-chemistry mb-4 title-futuristic animate-neon-pulse">
          Matter Sorting Lab
        </h3>
        <p className="text-xl text-muted-foreground mb-2">
          {currentLevel.description}
        </p>
        <p className="text-lg text-muted-foreground mb-6">
          Sort materials into solid, liquid, and gas states!
        </p>
        
        {/* Progress */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-semibold text-foreground">
            Level {level} / {levels.length}
          </div>
          <div className="xp-badge">
            <Trophy className="w-4 h-4 mr-1" />
            {score} XP
          </div>
        </div>
        
        <Progress value={(level / levels.length) * 100} className="progress-neon mb-8" />
      </div>

      {/* Sorting Containers */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {['solid', 'liquid', 'gas'].map(state => (
          <div key={state} className={`bg-card/50 border-2 border-${getStateColor(state)}/30 rounded-xl p-6 hover:border-${getStateColor(state)}/60 transition-all duration-300`}>
            <h4 className={`text-xl font-bold text-${getStateColor(state)} mb-4 text-center title-futuristic`}>
              {state.charAt(0).toUpperCase() + state.slice(1)}
            </h4>
            <div className="min-h-[120px] border-2 border-dashed border-muted/30 rounded-lg p-4 flex flex-wrap gap-2">
              {sortedItems[state].map(item => (
                <div key={item} className={`bg-${getStateColor(state)}/20 text-${getStateColor(state)} px-3 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2 animate-slide-up`}>
                  <span className="text-lg">{getItemEmoji(item)}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Available Items */}
      <div className="text-center">
        <h4 className="text-lg font-semibold text-foreground mb-4">Available Materials:</h4>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {currentLevel.items.filter(item => !Object.values(sortedItems).flat().includes(item)).map(item => (
            <div key={item} className="bg-card/80 border border-muted/30 rounded-lg p-3">
              <div className="text-center mb-3">
                <div className="text-3xl mb-1 animate-float">{getItemEmoji(item)}</div>
                <div className="text-sm font-semibold text-foreground">{item}</div>
              </div>
              <div className="flex space-x-1">
                {['solid', 'liquid', 'gas'].map(state => (
                  <Button 
                    key={state}
                    onClick={() => handleItemSort(item, state)}
                    className={`text-xs px-2 py-1 bg-${getStateColor(state)}/20 hover:bg-${getStateColor(state)}/40 border border-${getStateColor(state)}/30 text-${getStateColor(state)}`}
                    variant="outline"
                  >
                    {state}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4">
        <Button 
          onClick={() => setSortedItems({ solid: [], liquid: [], gas: [] })}
          variant="outline"
          className="bg-card/50 border-chemistry/30 text-chemistry hover:bg-chemistry hover:text-background"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
        
        <Button 
          onClick={resetGame}
          variant="neon"
          className="border-chemistry text-chemistry hover:bg-chemistry"
        >
          New Game
        </Button>
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-muted-foreground bg-card/30 rounded-lg p-4">
        <p>Click the state buttons under each material to sort them correctly!</p>
        <p>Remember: Solids hold their shape, liquids flow, gases expand to fill space.</p>
      </div>
    </div>
  );
};

export default MatterSortingGame;