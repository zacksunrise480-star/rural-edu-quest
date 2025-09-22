import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { Trophy, RotateCcw, Zap } from 'lucide-react';
import ConfettiEffect from '@/components/ConfettiEffect';

interface Component {
  id: string;
  type: string;
  x: number;
  y: number;
  connected: boolean;
}

interface CircuitBuilderGameProps {
  onComplete: (score: number, xp: number) => void;
}

const CircuitBuilderGame: React.FC<CircuitBuilderGameProps> = ({ onComplete }) => {
  const { t } = useLanguage();
  const [components, setComponents] = useState<Component[]>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [circuitComplete, setCircuitComplete] = useState(false);

  const circuits = [
    {
      required: ['battery', 'bulb', 'wire'],
      description: 'Simple Circuit',
      points: 120
    },
    {
      required: ['battery', 'bulb', 'switch', 'wire'],
      description: 'Switch Circuit',
      points: 180
    },
    {
      required: ['battery', 'bulb', 'bulb', 'wire'],
      description: 'Series Circuit',
      points: 220
    }
  ];

  const currentCircuit = circuits[level - 1];

  const componentTypes = [
    { type: 'battery', emoji: '🔋', name: 'Battery', color: 'text-red-400' },
    { type: 'bulb', emoji: '💡', name: 'Light Bulb', color: 'text-yellow-400' },
    { type: 'wire', emoji: '🔌', name: 'Wire', color: 'text-blue-400' },
    { type: 'switch', emoji: '🔘', name: 'Switch', color: 'text-green-400' }
  ];

  const handleComponentPlace = (type: string) => {
    const newComponent: Component = {
      id: `${type}-${Date.now()}`,
      type,
      x: Math.random() * 300 + 50,
      y: Math.random() * 200 + 50,
      connected: false
    };
    
    const newComponents = [...components, newComponent];
    setComponents(newComponents);
    
    // Check if circuit is complete
    const requiredCounts = currentCircuit.required.reduce((acc, type) => {
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
    
    const placedCounts = newComponents.reduce((acc, comp) => {
      acc[comp.type] = (acc[comp.type] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
    
    const isComplete = Object.entries(requiredCounts).every(
      ([type, count]) => placedCounts[type] >= count
    );
    
    if (isComplete && !circuitComplete) {
      setCircuitComplete(true);
      const points = currentCircuit.points;
      setScore(prev => prev + points);
      setShowConfetti(true);
      
      toast.success(
        <div className="flex items-center space-x-2">
          <Zap className="h-5 w-5 text-yellow-400 animate-sparkle" />
          <span>Circuit Complete! +{points} XP</span>
        </div>
      );

      setTimeout(() => {
        setShowConfetti(false);
        if (level >= circuits.length) {
          setGameCompleted(true);
          onComplete(score + points, Math.floor((score + points) / 10));
        } else {
          setLevel(prev => prev + 1);
          setComponents([]);
          setCircuitComplete(false);
        }
      }, 2000);
    }
  };

  const resetGame = () => {
    setLevel(1);
    setScore(0);
    setComponents([]);
    setCircuitComplete(false);
    setGameCompleted(false);
  };

  if (gameCompleted) {
    return (
      <div className="text-center space-y-6">
        <div className="text-8xl animate-bounce-gentle">⚡</div>
        <h3 className="text-3xl font-bold text-physics title-futuristic">Circuit Master!</h3>
        <p className="text-xl text-muted-foreground">You understand electricity perfectly!</p>
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
        <h3 className="text-3xl font-bold text-physics mb-4 title-futuristic animate-neon-pulse">
          {t('electricCircuit')}
        </h3>
        <p className="text-xl text-muted-foreground mb-2">
          {currentCircuit.description}
        </p>
        <p className="text-lg text-muted-foreground mb-6">
          Build a complete electrical circuit!
        </p>
        
        {/* Progress */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-semibold text-foreground">
            Level {level} / {circuits.length}
          </div>
          <div className="xp-badge">
            <Trophy className="w-4 h-4 mr-1" />
            {score} XP
          </div>
        </div>
        
        <Progress value={(level / circuits.length) * 100} className="progress-neon mb-8" />
      </div>

      {/* Circuit Board */}
      <div className="relative bg-card/50 rounded-xl p-6 border-2 border-physics/30 mx-auto" style={{width: '500px', height: '350px'}}>
        <div className="absolute inset-4 bg-gradient-to-br from-physics/10 to-transparent rounded-lg">
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle, hsl(var(--physics)) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
          
          {/* Placed components */}
          {components.map((component) => {
            const componentType = componentTypes.find(ct => ct.type === component.type);
            return (
              <div 
                key={component.id}
                className={`absolute cursor-pointer hover:scale-110 transition-all duration-300 ${componentType?.color}`}
                style={{left: component.x, top: component.y}}
              >
                <div className="text-4xl animate-float bg-card/80 rounded-lg p-2 border border-physics/30 hover:border-physics hover:shadow-glow-physics">
                  {componentType?.emoji}
                </div>
              </div>
            );
          })}
          
          {/* Circuit completion effect */}
          {circuitComplete && (
            <div className="absolute inset-0 bg-physics/20 rounded-lg flex items-center justify-center animate-neon-pulse">
              <div className="text-physics text-2xl font-bold animate-bounce-gentle">
                <Zap className="w-12 h-12 mx-auto mb-2" />
                Circuit Active!
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Required Components */}
      <div className="text-center mb-6">
        <h4 className="text-lg font-semibold text-physics mb-3">Required Components:</h4>
        <div className="flex justify-center space-x-4">
          {currentCircuit.required.map((type, index) => {
            const componentType = componentTypes.find(ct => ct.type === type);
            const placed = components.filter(c => c.type === type).length;
            const required = currentCircuit.required.filter(t => t === type).length;
            
            return (
              <div key={`${type}-${index}`} className="text-center">
                <div className={`text-3xl mb-1 ${componentType?.color}`}>
                  {componentType?.emoji}
                </div>
                <div className="text-sm text-muted-foreground">
                  {componentType?.name}
                </div>
                <div className={`text-xs font-semibold ${placed >= required ? 'text-green-400' : 'text-yellow-400'}`}>
                  {placed}/{required}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Component Palette */}
      <div className="flex justify-center space-x-4 mb-8">
        {componentTypes.map(componentType => (
          <Button 
            key={componentType.type}
            onClick={() => handleComponentPlace(componentType.type)}
            className={`w-24 h-24 bg-card/80 hover:bg-physics/20 border-2 border-physics/30 hover:border-physics hover:shadow-glow-physics transition-all duration-300 flex-col space-y-2 ${componentType.color}`}
            variant="outline"
            disabled={circuitComplete}
          >
            <div className="text-3xl animate-float">{componentType.emoji}</div>
            <div className="text-xs font-semibold">{componentType.name}</div>
          </Button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4">
        <Button 
          onClick={() => {
            setComponents([]);
            setCircuitComplete(false);
          }}
          variant="outline"
          className="bg-card/50 border-physics/30 text-physics hover:bg-physics hover:text-background"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Clear Circuit
        </Button>
        
        <Button 
          onClick={resetGame}
          variant="neon"
          className="border-physics text-physics hover:bg-physics"
        >
          New Game
        </Button>
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-muted-foreground bg-card/30 rounded-lg p-4">
        <p>Click on components to place them on the circuit board!</p>
        <p>Complete the circuit by placing all required components.</p>
      </div>
    </div>
  );
};

export default CircuitBuilderGame;