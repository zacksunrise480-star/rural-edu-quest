import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Trophy, Coins, Star, RotateCcw, Home } from "lucide-react";
import { toast } from "sonner";

interface StudentData {
  name: string;
  class: string;
  xp: number;
  coins: number;
  badges: string[];
  completedChapters: string[];
}

const StudentGame = () => {
  const { subject, chapter, gameType } = useParams<{ subject: string; chapter: string; gameType: string }>();
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [gameState, setGameState] = useState<'playing' | 'completed' | 'video'>('playing');
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  // Game-specific state hooks - moved to top level
  const [selectedSlices, setSelectedSlices] = useState<number>(0);
  const [targetFraction, setTargetFraction] = useState({ numerator: 1, denominator: 4 });
  const [droppedItems, setDroppedItems] = useState<string[]>([]);
  
  // New game states
  const [draggedNumbers, setDraggedNumbers] = useState<number[]>([]);
  const [factorGroups, setFactorGroups] = useState<{[key: string]: number[]}>({});
  const [equation, setEquation] = useState({ left: 5, right: 3, target: 8 });
  const [mirrorPositions, setMirrorPositions] = useState<{x: number, y: number, angle: number}[]>([]);
  const [circuitComponents, setCircuitComponents] = useState<{type: string, x: number, y: number, connected: boolean}[]>([]);
  const [sortedItems, setSortedItems] = useState<{mixtures: string[], pure: string[]}>({mixtures: [], pure: []});
  const [placedElements, setPlacedElements] = useState<{[key: string]: string}>({});
  const [identifiedOrganelles, setIdentifiedOrganelles] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("rued_student");
    if (!stored) {
      toast.error("Please complete your profile first");
      navigate("/student/name");
      return;
    }
    setStudentData(JSON.parse(stored));
  }, [navigate]);

  const handleGameComplete = (earnedScore: number) => {
    if (!studentData) return;

    const xpEarned = earnedScore * 10;
    const coinsEarned = Math.floor(earnedScore / 10);
    
    const updatedData = {
      ...studentData,
      xp: studentData.xp + xpEarned,
      coins: studentData.coins + coinsEarned,
      completedChapters: [...new Set([...studentData.completedChapters, `${subject}-${chapter}`])]
    };

    localStorage.setItem("rued_student", JSON.stringify(updatedData));
    setStudentData(updatedData);
    setGameState('completed');
    setShowConfetti(true);
    
    toast.success(`Great job! You earned ${xpEarned} XP and ${coinsEarned} coins!`);
    
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const getGameTitle = () => {
    if (gameType === 'video') return 'Video Lesson';
    return gameType?.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ') || 'Game';
  };

  const getSubjectEmoji = () => {
    switch (subject) {
      case 'physics': return '⚡';
      case 'chemistry': return '🧪';
      case 'biology': return '🌱';
      case 'mathematics': return '🔢';
      default: return '📚';
    }
  };

  const renderVideoPlayer = () => {
    const videoId = "dQw4w9WgXcQ"; // Demo video
    return (
      <div className="space-y-6">
        <div className="aspect-video bg-black rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="Educational Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        
        <div className="text-center">
          <Button 
            onClick={() => handleGameComplete(50)}
            className="btn-hero"
          >
            <Trophy className="w-5 h-5 mr-2" />
            Mark as Watched
          </Button>
        </div>
      </div>
    );
  };

  const renderFractionsGame = () => {
    const handleSliceClick = (slices: number) => {
      setSelectedSlices(slices);
      if (slices === targetFraction.numerator) {
        handleGameComplete(100);
      }
    };

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">Pizza Fractions</h3>
          <p className="text-white/80">Select {targetFraction.numerator}/{targetFraction.denominator} of the pizza!</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="w-64 h-64 relative">
            <div className="w-full h-full bg-yellow-400 rounded-full border-8 border-yellow-600 relative overflow-hidden">
              {/* Pizza slices */}
              {[0, 1, 2, 3].map(slice => (
                <div
                  key={slice}
                  className={`absolute w-1/2 h-1/2 cursor-pointer transition-all duration-200 ${
                    slice < selectedSlices ? 'bg-red-500' : 'bg-yellow-400 hover:bg-yellow-300'
                  }`}
                  style={{
                    transformOrigin: 'bottom right',
                    transform: `rotate(${slice * 90}deg)`,
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%)'
                  }}
                  onClick={() => handleSliceClick(slice + 1)}
                />
              ))}
              
              {/* Pizza toppings */}
              <div className="absolute inset-4 rounded-full bg-red-400 opacity-60" />
              <div className="absolute inset-8 rounded-full bg-green-400 opacity-40" />
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button 
            onClick={() => setSelectedSlices(0)}
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>
    );
  };

  const renderFoodChainGame = () => {
    const correctOrder = ['Sun', 'Plant', 'Rabbit', 'Fox'];
    const items = ['Fox', 'Plant', 'Sun', 'Rabbit'];

    const handleDrop = (item: string) => {
      if (!droppedItems.includes(item)) {
        const newDroppedItems = [...droppedItems, item];
        setDroppedItems(newDroppedItems);
        
        if (newDroppedItems.length === 4) {
          const isCorrect = newDroppedItems.every((item, index) => item === correctOrder[index]);
          if (isCorrect) {
            handleGameComplete(100);
          } else {
            toast.error("Not quite right! Try again.");
            setDroppedItems([]);
          }
        }
      }
    };

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">Food Chain Builder</h3>
          <p className="text-white/80">Drag items to build the correct food chain!</p>
        </div>

        {/* Drop zones */}
        <div className="flex justify-center space-x-4 mb-8">
          {correctOrder.map((item, index) => (
            <div
              key={index}
              className="w-24 h-24 border-2 border-dashed border-white/50 rounded-lg flex items-center justify-center bg-white/10"
            >
              {droppedItems[index] && (
                <div className="text-2xl">{getItemEmoji(droppedItems[index])}</div>
              )}
            </div>
          ))}
        </div>

        {/* Draggable items */}
        <div className="flex justify-center space-x-4">
          {items.filter(item => !droppedItems.includes(item)).map(item => (
            <Button
              key={item}
              onClick={() => handleDrop(item)}
              className="w-20 h-20 text-2xl bg-white/20 hover:bg-white/30 border-white/30"
              variant="outline"
            >
              {getItemEmoji(item)}
            </Button>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={() => setDroppedItems([])}
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>
    );
  };

  const getItemEmoji = (item: string) => {
    switch (item) {
      case 'Sun': return '☀️';
      case 'Plant': return '🌱';
      case 'Rabbit': return '🐰';
      case 'Fox': return '🦊';
      default: return '❓';
    }
  };

  // Mathematics Games
  const renderLCMHCFPuzzle = () => {
    const numbers = [12, 18, 24, 30];
    const targetLCM = 180;
    const targetHCF = 6;

    const handleNumberDrop = (number: number, group: 'lcm' | 'hcf') => {
      const newGroups = { ...factorGroups };
      if (!newGroups[group]) newGroups[group] = [];
      
      if (!newGroups[group].includes(number)) {
        newGroups[group] = [...newGroups[group], number];
        setFactorGroups(newGroups);
        
        if (newGroups['lcm']?.length === 4 && newGroups['hcf']?.length === 4) {
          handleGameComplete(100);
        }
      }
    };

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">LCM & HCF Puzzle</h3>
          <p className="text-white/80">Find numbers that share the LCM (180) and HCF (6)!</p>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="bg-white/10 p-6 rounded-lg">
            <h4 className="text-white font-semibold mb-4">LCM Group (180)</h4>
            <div className="min-h-[100px] border-2 border-dashed border-white/50 rounded-lg p-4">
              {factorGroups['lcm']?.map(num => (
                <span key={num} className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full mr-2 mb-2">{num}</span>
              ))}
            </div>
          </div>
          
          <div className="bg-white/10 p-6 rounded-lg">
            <h4 className="text-white font-semibold mb-4">HCF Group (6)</h4>
            <div className="min-h-[100px] border-2 border-dashed border-white/50 rounded-lg p-4">
              {factorGroups['hcf']?.map(num => (
                <span key={num} className="inline-block bg-green-500 text-white px-3 py-1 rounded-full mr-2 mb-2">{num}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          {numbers.map(number => (
            <div key={number} className="space-y-2">
              <div className="bg-white/20 text-white px-4 py-2 rounded-lg font-bold text-center">{number}</div>
              <div className="flex space-x-2">
                <Button 
                  onClick={() => handleNumberDrop(number, 'lcm')}
                  className="text-xs bg-blue-500 hover:bg-blue-600"
                  disabled={factorGroups['lcm']?.includes(number)}
                >
                  LCM
                </Button>
                <Button 
                  onClick={() => handleNumberDrop(number, 'hcf')}
                  className="text-xs bg-green-500 hover:bg-green-600"
                  disabled={factorGroups['hcf']?.includes(number)}
                >
                  HCF
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={() => setFactorGroups({})}
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>
    );
  };

  const renderEquationBalancer = () => {
    const handleNumberClick = (side: 'left' | 'right', value: number) => {
      const newEquation = { ...equation };
      newEquation[side] = value;
      setEquation(newEquation);
      
      if (newEquation.left + newEquation.right === newEquation.target) {
        handleGameComplete(100);
      }
    };

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">Equation Balancer</h3>
          <p className="text-white/80">Balance the equation to equal {equation.target}!</p>
        </div>

        <div className="flex items-center justify-center space-x-8 mb-8">
          <div className="text-center">
            <div className="bg-white/20 w-16 h-16 rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-2">
              {equation.left}
            </div>
            <div className="space-x-2">
              {[1, 2, 3, 4, 5].map(num => (
                <Button 
                  key={num}
                  onClick={() => handleNumberClick('left', num)}
                  className="w-8 h-8 p-0 text-xs bg-blue-500 hover:bg-blue-600"
                >
                  {num}
                </Button>
              ))}
            </div>
          </div>

          <div className="text-white text-3xl font-bold">+</div>

          <div className="text-center">
            <div className="bg-white/20 w-16 h-16 rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-2">
              {equation.right}
            </div>
            <div className="space-x-2">
              {[1, 2, 3, 4, 5].map(num => (
                <Button 
                  key={num}
                  onClick={() => handleNumberClick('right', num)}
                  className="w-8 h-8 p-0 text-xs bg-green-500 hover:bg-green-600"
                >
                  {num}
                </Button>
              ))}
            </div>
          </div>

          <div className="text-white text-3xl font-bold">=</div>

          <div className="text-center">
            <div className="bg-white/20 w-16 h-16 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
              {equation.target}
            </div>
          </div>
        </div>

        <div className="text-center text-white/70">
          Current: {equation.left} + {equation.right} = {equation.left + equation.right}
        </div>
      </div>
    );
  };

  // Physics Games  
  const renderLightReflectionMaze = () => {
    const handleMirrorClick = (x: number, y: number) => {
      const newMirror = { x, y, angle: 45 };
      const newPositions = [...mirrorPositions];
      const existingIndex = newPositions.findIndex(m => m.x === x && m.y === y);
      
      if (existingIndex >= 0) {
        newPositions[existingIndex].angle = (newPositions[existingIndex].angle + 45) % 360;
      } else {
        newPositions.push(newMirror);
      }
      
      setMirrorPositions(newPositions);
      
      // Simple win condition - place 3 mirrors
      if (newPositions.length >= 3) {
        handleGameComplete(100);
      }
    };

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">Light Reflection Maze</h3>
          <p className="text-white/80">Click to place mirrors and guide the light to the target!</p>
        </div>

        <div className="bg-black/50 rounded-lg p-4 mx-auto" style={{width: '400px', height: '300px'}}>
          {/* Light source */}
          <div className="absolute w-4 h-4 bg-yellow-400 rounded-full animate-pulse" style={{left: '20px', top: '20px'}}>
            <div className="w-20 h-1 bg-yellow-400/50 absolute top-2 left-4"></div>
          </div>
          
          {/* Target */}
          <div className="absolute w-4 h-4 bg-red-400 rounded-full animate-pulse" style={{right: '20px', bottom: '20px'}}>
          </div>

          {/* Mirror placement grid */}
          <div className="grid grid-cols-8 grid-rows-6 gap-1 h-full">
            {Array.from({length: 48}).map((_, index) => {
              const x = index % 8;
              const y = Math.floor(index / 8);
              const mirror = mirrorPositions.find(m => m.x === x && m.y === y);
              
              return (
                <div 
                  key={index}
                  className="border border-white/20 cursor-pointer hover:bg-white/10 flex items-center justify-center"
                  onClick={() => handleMirrorClick(x, y)}
                >
                  {mirror && (
                    <div 
                      className="w-6 h-1 bg-gray-300 rounded"
                      style={{transform: `rotate(${mirror.angle}deg)`}}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center">
          <Button 
            onClick={() => setMirrorPositions([])}
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Mirrors
          </Button>
        </div>
      </div>
    );
  };

  const renderCircuitBuilder = () => {
    const components = [
      { type: 'battery', emoji: '🔋', name: 'Battery' },
      { type: 'bulb', emoji: '💡', name: 'Light Bulb' },
      { type: 'wire', emoji: '🔌', name: 'Wire' }
    ];

    const handleComponentPlace = (type: string) => {
      const newComponent = {
        type,
        x: Math.random() * 300,
        y: Math.random() * 200,
        connected: false
      };
      
      const newComponents = [...circuitComponents, newComponent];
      setCircuitComponents(newComponents);
      
      // Simple win condition - place all 3 types
      const types = newComponents.map(c => c.type);
      if (types.includes('battery') && types.includes('bulb') && types.includes('wire')) {
        handleGameComplete(100);
      }
    };

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">Electric Circuit Builder</h3>
          <p className="text-white/80">Connect battery, bulb, and wires to complete the circuit!</p>
        </div>

        <div className="bg-black/50 rounded-lg p-4 mx-auto relative" style={{width: '400px', height: '300px'}}>
          {circuitComponents.map((component, index) => (
            <div 
              key={index}
              className="absolute text-2xl cursor-pointer hover:scale-110 transition-transform"
              style={{left: component.x, top: component.y}}
            >
              {components.find(c => c.type === component.type)?.emoji}
            </div>
          ))}
          
          {circuitComponents.length >= 3 && (
            <div className="absolute inset-0 bg-yellow-400/20 rounded-lg flex items-center justify-center">
              <div className="text-white text-xl font-bold animate-pulse">Circuit Complete! 💡</div>
            </div>
          )}
        </div>

        <div className="flex justify-center space-x-4">
          {components.map(component => (
            <Button 
              key={component.type}
              onClick={() => handleComponentPlace(component.type)}
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              <span className="mr-2">{component.emoji}</span>
              {component.name}
            </Button>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={() => setCircuitComponents([])}
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Clear Circuit
          </Button>
        </div>
      </div>
    );
  };

  // Chemistry Games
  const renderMixtureSorter = () => {
    const items = ['Salt Water', 'Pure Gold', 'Air', 'Sugar', 'Orange Juice', 'Diamond', 'Milk', 'Iron'];
    const correctMixtures = ['Salt Water', 'Air', 'Orange Juice', 'Milk'];
    const correctPure = ['Pure Gold', 'Sugar', 'Diamond', 'Iron'];

    const handleItemSort = (item: string, category: 'mixtures' | 'pure') => {
      const newSorted = { ...sortedItems };
      
      // Remove from other category if exists
      const otherCategory = category === 'mixtures' ? 'pure' : 'mixtures';
      newSorted[otherCategory] = newSorted[otherCategory].filter(i => i !== item);
      
      // Add to selected category if not already there
      if (!newSorted[category].includes(item)) {
        newSorted[category] = [...newSorted[category], item];
      }
      
      setSortedItems(newSorted);
      
      // Check if all items are correctly sorted
      if (newSorted.mixtures.length === 4 && newSorted.pure.length === 4) {
        const mixturesCorrect = newSorted.mixtures.every(item => correctMixtures.includes(item));
        const pureCorrect = newSorted.pure.every(item => correctPure.includes(item));
        
        if (mixturesCorrect && pureCorrect) {
          handleGameComplete(100);
        } else {
          toast.error("Some items are in the wrong category! Try again.");
        }
      }
    };

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">Mixture Sorter</h3>
          <p className="text-white/80">Sort items into Mixtures or Pure Substances!</p>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="bg-white/10 p-6 rounded-lg">
            <h4 className="text-white font-semibold mb-4">Mixtures 🧪</h4>
            <div className="min-h-[150px] border-2 border-dashed border-white/50 rounded-lg p-4">
              {sortedItems.mixtures.map(item => (
                <div key={item} className="bg-blue-500 text-white px-3 py-1 rounded-full mr-2 mb-2 inline-block text-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white/10 p-6 rounded-lg">
            <h4 className="text-white font-semibold mb-4">Pure Substances ⚗️</h4>
            <div className="min-h-[150px] border-2 border-dashed border-white/50 rounded-lg p-4">
              {sortedItems.pure.map(item => (
                <div key={item} className="bg-green-500 text-white px-3 py-1 rounded-full mr-2 mb-2 inline-block text-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <h4 className="text-white mb-4">Available Items:</h4>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {items.filter(item => !sortedItems.mixtures.includes(item) && !sortedItems.pure.includes(item)).map(item => (
              <div key={item} className="bg-white/20 text-white px-3 py-2 rounded-lg">
                <div className="text-sm mb-2">{item}</div>
                <div className="flex space-x-1">
                  <Button 
                    onClick={() => handleItemSort(item, 'mixtures')}
                    className="text-xs bg-blue-500 hover:bg-blue-600 px-2 py-1"
                  >
                    Mixture
                  </Button>
                  <Button 
                    onClick={() => handleItemSort(item, 'pure')}
                    className="text-xs bg-green-500 hover:bg-green-600 px-2 py-1"
                  >
                    Pure
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button 
            onClick={() => setSortedItems({mixtures: [], pure: []})}
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>
    );
  };

  const renderPeriodicTablePuzzle = () => {
    const elements = [
      { symbol: 'H', name: 'Hydrogen', position: '1-1' },
      { symbol: 'He', name: 'Helium', position: '1-18' },
      { symbol: 'Li', name: 'Lithium', position: '2-1' },
      { symbol: 'Be', name: 'Beryllium', position: '2-2' },
      { symbol: 'C', name: 'Carbon', position: '2-14' },
      { symbol: 'N', name: 'Nitrogen', position: '2-15' }
    ];

    const handleElementPlace = (symbol: string, position: string) => {
      const correctElement = elements.find(e => e.symbol === symbol);
      const newPlaced = { ...placedElements };
      
      if (correctElement && correctElement.position === position) {
        newPlaced[position] = symbol;
        setPlacedElements(newPlaced);
        
        if (Object.keys(newPlaced).length === elements.length) {
          handleGameComplete(100);
        }
      } else {
        toast.error("Wrong position! Try again.");
      }
    };

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">Periodic Table Puzzle</h3>
          <p className="text-white/80">Place elements in their correct positions!</p>
        </div>

        <div className="bg-white/10 p-4 rounded-lg mx-auto max-w-4xl">
          {/* Simplified periodic table grid */}
          <div className="grid grid-cols-18 gap-1 mb-6">
            {Array.from({length: 36}).map((_, index) => {
              const col = (index % 18) + 1;
              const row = Math.floor(index / 18) + 1;
              const position = `${row}-${col}`;
              const element = elements.find(e => e.position === position);
              
              return (
                <div 
                  key={index}
                  className={`w-8 h-8 border border-white/30 rounded text-xs flex items-center justify-center text-white ${
                    element ? 'bg-white/20 cursor-pointer hover:bg-white/30' : 'bg-transparent'
                  }`}
                  onClick={() => element && !placedElements[position] && console.log('Click to place:', position)}
                >
                  {placedElements[position] || (element ? '?' : '')}
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <h4 className="text-white mb-4">Elements to Place:</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {elements.filter(e => !Object.values(placedElements).includes(e.symbol)).map(element => (
                <Button 
                  key={element.symbol}
                  onClick={() => {
                    // For demo, auto-place correctly
                    handleElementPlace(element.symbol, element.position);
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm"
                >
                  {element.symbol} - {element.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button 
            onClick={() => setPlacedElements({})}
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>
    );
  };

  // Biology Games
  const renderCellExplorer = () => {
    const organelles = [
      { name: 'Nucleus', x: 50, y: 40, emoji: '🟢' },
      { name: 'Mitochondria', x: 30, y: 60, emoji: '🔴' },
      { name: 'Ribosomes', x: 70, y: 30, emoji: '🔵' },
      { name: 'Cell Membrane', x: 20, y: 20, emoji: '⭕' },
      { name: 'Cytoplasm', x: 60, y: 70, emoji: '🟡' }
    ];

    const handleOrganelleClick = (organelleName: string) => {
      if (!identifiedOrganelles.includes(organelleName)) {
        const newIdentified = [...identifiedOrganelles, organelleName];
        setIdentifiedOrganelles(newIdentified);
        
        if (newIdentified.length === organelles.length) {
          handleGameComplete(100);
        }
      }
    };

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">Cell Explorer</h3>
          <p className="text-white/80">Click on the organelles to identify them!</p>
        </div>

        <div className="bg-green-100/20 rounded-full p-8 mx-auto relative" style={{width: '400px', height: '300px'}}>
          {organelles.map(organelle => (
            <div 
              key={organelle.name}
              className={`absolute cursor-pointer text-2xl hover:scale-125 transition-transform ${
                identifiedOrganelles.includes(organelle.name) ? 'opacity-100' : 'opacity-70'
              }`}
              style={{left: `${organelle.x}%`, top: `${organelle.y}%`}}
              onClick={() => handleOrganelleClick(organelle.name)}
              title={identifiedOrganelles.includes(organelle.name) ? organelle.name : '?'}
            >
              {organelle.emoji}
              {identifiedOrganelles.includes(organelle.name) && (
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/60 px-2 py-1 rounded whitespace-nowrap">
                  {organelle.name}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="text-white mb-4">
            Identified: {identifiedOrganelles.length} / {organelles.length}
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {identifiedOrganelles.map(organelle => (
              <span key={organelle} className="bg-green-500 text-white px-2 py-1 rounded-full text-sm">
                {organelle}
              </span>
            ))}
          </div>
          <Button 
            onClick={() => setIdentifiedOrganelles([])}
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>
    );
  };

  const renderGame = () => {
    if (gameType === 'video') return renderVideoPlayer();
    if (gameType === 'pizza-fractions') return renderFractionsGame();
    if (gameType === 'food-chain-builder') return renderFoodChainGame();
    
    // New Math Games
    if (gameType === 'lcm-hcf-puzzle') return renderLCMHCFPuzzle();
    if (gameType === 'equation-balancer') return renderEquationBalancer();
    
    // New Physics Games
    if (gameType === 'light-reflection-maze') return renderLightReflectionMaze();
    if (gameType === 'electric-circuit-builder') return renderCircuitBuilder();
    
    // New Chemistry Games
    if (gameType === 'mixture-sorter') return renderMixtureSorter();
    if (gameType === 'periodic-table-puzzle') return renderPeriodicTablePuzzle();
    
    // New Biology Games
    if (gameType === 'cell-explorer') return renderCellExplorer();
    
    // Default game placeholder
    return (
      <div className="text-center space-y-6">
        <div className="text-6xl">{getSubjectEmoji()}</div>
        <h3 className="text-2xl font-bold text-white">{getGameTitle()}</h3>
        <p className="text-white/80">This is a demo game. Click below to complete!</p>
        <Button 
          onClick={() => handleGameComplete(75)}
          className="btn-hero"
        >
          <Trophy className="w-5 h-5 mr-2" />
          Complete Game
        </Button>
      </div>
    );
  };

  if (!studentData) {
    return <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
      <div className="text-white text-xl">Loading...</div>
    </div>;
  }

  if (gameState === 'completed') {
    return (
      <div className="min-h-screen bg-gradient-hero">
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-purple-400/20 animate-pulse" />
          </div>
        )}
        
        <div className="max-w-2xl mx-auto px-6 py-12 text-center">
          <Card className="p-12 bg-white/10 backdrop-blur-sm border-0">
            <div className="text-8xl mb-6">🎉</div>
            <h1 className="text-4xl font-bold text-white mb-4">Congratulations!</h1>
            <p className="text-xl text-white/80 mb-8">You completed the {getGameTitle()}!</p>
            
            <div className="flex justify-center space-x-6 mb-8">
              <div className="xp-badge text-lg px-6 py-3">
                <Trophy className="w-5 h-5 mr-2" />
                +{score * 10} XP
              </div>
              <div className="coins-badge text-lg px-6 py-3">
                <Coins className="w-5 h-5 mr-2" />
                +{Math.floor(score / 10)} Coins
              </div>
            </div>

            <div className="space-y-4">
              <Link to={`/student/chapters/${subject}`}>
                <Button className="btn-hero w-full">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Chapters
                </Button>
              </Link>
              <Link to="/student/subjects">
                <Button variant="outline" className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30">
                  <Home className="w-5 h-5 mr-2" />
                  Back to Subjects
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to={`/student/chapters/${subject}`} className="flex items-center text-white hover:text-white/80 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Chapters
          </Link>
          
          {/* Stats */}
          <div className="flex items-center space-x-4">
            <div className="xp-badge">
              <Trophy className="w-4 h-4 mr-1" />
              {studentData.xp} XP
            </div>
            <div className="coins-badge">
              <Coins className="w-4 h-4 mr-1" />
              {studentData.coins}
            </div>
          </div>
        </div>

        {/* Game Content */}
        <Card className="p-8 bg-white/10 backdrop-blur-sm border-0">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{getSubjectEmoji()}</div>
            <h1 className="text-3xl font-bold text-white mb-2">{getGameTitle()}</h1>
            <p className="text-white/80 capitalize">{subject} - {chapter?.replace('-', ' ')}</p>
          </div>

          <div className="bg-white/5 rounded-xl p-8">
            {renderGame()}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentGame;