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
    const [selectedSlices, setSelectedSlices] = useState<number>(0);
    const [targetFraction, setTargetFraction] = useState({ numerator: 1, denominator: 4 });

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
    const [droppedItems, setDroppedItems] = useState<string[]>([]);
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

  const renderGame = () => {
    if (gameType === 'video') return renderVideoPlayer();
    if (gameType === 'pizza-fractions') return renderFractionsGame();
    if (gameType === 'food-chain-builder') return renderFoodChainGame();
    
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