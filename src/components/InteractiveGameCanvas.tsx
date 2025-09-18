import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { Trophy, Star, Coins, Zap } from 'lucide-react';

interface GameElement {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  type: string;
  draggable?: boolean;
  correct?: boolean;
  value?: any;
}

interface InteractiveGameCanvasProps {
  gameType: 'fraction' | 'circuit' | 'ecosystem' | 'geometry';
  subject: string;
  chapter: string;
  onComplete: (score: number, xp: number) => void;
}

const InteractiveGameCanvas: React.FC<InteractiveGameCanvasProps> = ({ 
  gameType, 
  subject, 
  chapter, 
  onComplete 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameElements, setGameElements] = useState<GameElement[]>([]);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [draggedElement, setDraggedElement] = useState<GameElement | null>(null);
  const { t } = useLanguage();

  // Game configurations based on type
  const gameConfigs = {
    fraction: {
      title: t('fractionPizza'),
      description: t('fractionPizzaDesc'),
      targetElements: 4,
      colors: ['hsl(var(--physics))', 'hsl(var(--chemistry))', 'hsl(var(--biology))', 'hsl(var(--mathematics))']
    },
    circuit: {
      title: t('electricCircuit'),
      description: t('electricCircuitDesc'),
      targetElements: 6,
      colors: ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))']
    },
    ecosystem: {
      title: t('foodChain'),
      description: t('foodChainDesc'),
      targetElements: 5,
      colors: ['hsl(var(--chemistry))', 'hsl(var(--biology))', 'hsl(var(--success))']
    },
    geometry: {
      title: t('shapeBuilder'),
      description: t('shapeBuilderDesc'),
      targetElements: 3,
      colors: ['hsl(var(--mathematics))', 'hsl(var(--physics))', 'hsl(var(--primary))']
    }
  };

  const currentConfig = gameConfigs[gameType];

  const initializeGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const elements: GameElement[] = [];
    
    switch (gameType) {
      case 'fraction':
        // Create pizza slices for fractions
        for (let i = 0; i < 8; i++) {
          elements.push({
            id: `slice-${i}`,
            x: 50 + (i % 4) * 100,
            y: 50 + Math.floor(i / 4) * 100,
            width: 80,
            height: 80,
            color: currentConfig.colors[i % currentConfig.colors.length],
            type: 'slice',
            draggable: true,
            value: 1/8,
            correct: i < 4 // First 4 slices are correct for 1/2
          });
        }
        break;
        
      case 'circuit':
        // Create circuit components
        const components = ['battery', 'wire', 'bulb', 'switch'];
        components.forEach((comp, i) => {
          elements.push({
            id: comp,
            x: 100 + i * 120,
            y: 100,
            width: 80,
            height: 60,
            color: currentConfig.colors[i % currentConfig.colors.length],
            type: comp,
            draggable: true,
            correct: false
          });
        });
        break;
        
      case 'ecosystem':
        // Create ecosystem elements
        const organisms = ['sun', 'grass', 'rabbit', 'fox', 'eagle'];
        organisms.forEach((org, i) => {
          elements.push({
            id: org,
            x: 80 + i * 100,
            y: 200 - i * 30,
            width: 70,
            height: 70,
            color: currentConfig.colors[i % currentConfig.colors.length],
            type: org,
            draggable: true,
            value: i, // Position in food chain
            correct: false
          });
        });
        break;
        
      case 'geometry':
        // Create geometric shapes
        const shapes = ['triangle', 'square', 'circle'];
        shapes.forEach((shape, i) => {
          elements.push({
            id: shape,
            x: 100 + i * 150,
            y: 100,
            width: 100,
            height: 100,
            color: currentConfig.colors[i],
            type: shape,
            draggable: true,
            correct: false
          });
        });
        break;
    }
    
    setGameElements(elements);
    setScore(0);
    setProgress(0);
    setStreak(0);
    drawCanvas(elements);
  }, [gameType, currentConfig.colors]);

  const drawCanvas = useCallback((elements: GameElement[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas with dark gaming background
    ctx.fillStyle = 'hsl(var(--background))';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid pattern
    ctx.strokeStyle = 'hsl(var(--border))';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 50) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw elements with neon glow effects
    elements.forEach(element => {
      ctx.save();
      
      // Add glow effect
      ctx.shadowColor = element.color;
      ctx.shadowBlur = element.correct ? 20 : 10;
      
      ctx.fillStyle = element.color;
      
      switch (element.type) {
        case 'slice':
          // Draw pizza slice
          ctx.beginPath();
          ctx.arc(element.x + element.width/2, element.y + element.height/2, element.width/2, 0, Math.PI/4);
          ctx.lineTo(element.x + element.width/2, element.y + element.height/2);
          ctx.closePath();
          ctx.fill();
          break;
          
        case 'battery':
          ctx.fillRect(element.x, element.y, element.width, element.height);
          ctx.fillStyle = 'white';
          ctx.fillText('⚡', element.x + element.width/2 - 10, element.y + element.height/2 + 5);
          break;
          
        case 'wire':
          ctx.strokeStyle = element.color;
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.moveTo(element.x, element.y + element.height/2);
          ctx.lineTo(element.x + element.width, element.y + element.height/2);
          ctx.stroke();
          break;
          
        case 'bulb':
          ctx.beginPath();
          ctx.arc(element.x + element.width/2, element.y + element.height/2, element.width/3, 0, 2 * Math.PI);
          ctx.fill();
          break;
          
        default:
          // Default rounded rectangle
          const radius = 10;
          ctx.beginPath();
          ctx.roundRect(element.x, element.y, element.width, element.height, radius);
          ctx.fill();
          
          // Add element label
          ctx.shadowBlur = 0;
          ctx.fillStyle = 'white';
          ctx.font = 'bold 12px Inter';
          ctx.textAlign = 'center';
          ctx.fillText(element.type.toUpperCase(), element.x + element.width/2, element.y + element.height/2 + 5);
      }
      
      ctx.restore();
    });
  }, []);

  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isPlaying) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Find clicked element
    const clickedElement = gameElements.find(element => 
      x >= element.x && x <= element.x + element.width &&
      y >= element.y && y <= element.y + element.height
    );

    if (clickedElement) {
      handleElementInteraction(clickedElement);
    }
  }, [gameElements, isPlaying]);

  const handleElementInteraction = (element: GameElement) => {
    const newElements = gameElements.map(el => {
      if (el.id === element.id) {
        return { ...el, correct: !el.correct };
      }
      return el;
    });
    
    setGameElements(newElements);
    
    // Check if answer is correct
    const correctCount = newElements.filter(el => el.correct).length;
    const expectedCount = Math.ceil(currentConfig.targetElements / 2);
    
    if (correctCount === expectedCount) {
      const newScore = score + 100 + (streak * 10);
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
      setProgress(Math.min(100, progress + 25));
      
      // Gaming feedback with neon effects
      toast.success(
        <div className="flex items-center space-x-2">
          <Star className="h-5 w-5 text-yellow-400 animate-sparkle" />
          <span>{t('correct')} +{100 + (streak * 10)} XP</span>
        </div>
      );
      
      if (progress + 25 >= 100) {
        setTimeout(() => {
          onComplete(newScore, newScore / 10);
        }, 1000);
      } else {
        setTimeout(initializeGame, 1500);
      }
    } else {
      // Gentle feedback for wrong answers
      toast.info(t('tryAgain'), {
        icon: <Zap className="h-4 w-4 text-primary animate-neon-pulse" />
      });
    }
    
    drawCanvas(newElements);
  };

  const startGame = () => {
    setIsPlaying(true);
    initializeGame();
  };

  useEffect(() => {
    if (canvasRef.current) {
      drawCanvas(gameElements);
    }
  }, [gameElements, drawCanvas]);

  return (
    <div className="gaming-card max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2 animate-neon-pulse">
          {currentConfig.title}
        </h2>
        <p className="text-muted-foreground mb-4">{currentConfig.description}</p>
        
        {/* Gaming HUD */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-badge-gold animate-neon-pulse" />
              <span className="text-sm font-bold text-foreground">{score}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-primary animate-neon-pulse" />
              <span className="text-sm font-bold text-foreground">{streak}x</span>
            </div>
          </div>
          <div className="w-48">
            <Progress value={progress} className="progress-neon" />
          </div>
        </div>
      </div>

      {!isPlaying ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center animate-neon-pulse">
            <span className="text-4xl">🎮</span>
          </div>
          <Button 
            onClick={startGame}
            className="btn-hero"
          >
            {t('startGame')}
          </Button>
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          onClick={handleCanvasClick}
          className="w-full border-2 border-primary/30 rounded-lg cursor-pointer bg-background/50"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      )}
      
      <div className="mt-4 text-center text-sm text-muted-foreground">
        {t('gameInstructions')}
      </div>
    </div>
  );
};

export default InteractiveGameCanvas;