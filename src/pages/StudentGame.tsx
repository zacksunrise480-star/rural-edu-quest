import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Trophy, Coins, Star, RotateCcw, Home } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import FloatingParticles from "@/components/FloatingParticles";
import ConfettiEffect from "@/components/ConfettiEffect";
import FractionPizzaGame from "@/components/games/FractionPizzaGame";
import FoodChainGame from "@/components/games/FoodChainGame";
import CircuitBuilderGame from "@/components/games/CircuitBuilderGame";
import MatterSortingGame from "@/components/games/MatterSortingGame";

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
  const { t } = useLanguage();

  useEffect(() => {
    const stored = localStorage.getItem("rued_student");
    if (!stored) {
      toast.error("Please complete your profile first");
      navigate("/student/name");
      return;
    }
    setStudentData(JSON.parse(stored));
  }, [navigate]);

  const handleGameComplete = (earnedScore: number, xpEarned: number) => {
    if (!studentData) return;

    const coinsEarned = Math.floor(earnedScore / 100);
    
    // Award badges based on performance
    const newBadges = [...studentData.badges];
    if (earnedScore >= 500 && !newBadges.includes("High Scorer")) {
      newBadges.push("High Scorer");
    }
    if (earnedScore >= 1000 && !newBadges.includes("Master Player")) {
      newBadges.push("Master Player");
    }
    
    const updatedData = {
      ...studentData,
      xp: studentData.xp + xpEarned,
      coins: studentData.coins + coinsEarned,
      badges: newBadges,
      completedChapters: [...new Set([...studentData.completedChapters, `${subject}-${chapter}`])]
    };

    localStorage.setItem("rued_student", JSON.stringify(updatedData));
    setStudentData(updatedData);
    setGameState('completed');
    setShowConfetti(true);
    setScore(earnedScore);
    
    toast.success(`Amazing! You earned ${xpEarned} XP and ${coinsEarned} coins!`);
    
    setTimeout(() => setShowConfetti(false), 4000);
  };

  const getGameTitle = () => {
    if (gameType === 'video') return 'Video Lesson';
    
    const gameTitles: { [key: string]: string } = {
      'pizza-fractions': t('fractionPizza'),
      'food-chain-builder': t('foodChain'),
      'electric-circuit-builder': t('electricCircuit'),
      'matter-sorting': 'Matter Sorting Lab',
      'lcm-hcf-puzzle': 'LCM & HCF Puzzle',
      'light-reflection-maze': 'Light Reflection Maze',
      'mixture-separation': 'Mixture Separation',
      'cell-explorer': 'Cell Explorer'
    };
    
    return gameTitles[gameType || ''] || gameType?.split('-').map(word => 
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

  const getSubjectColor = () => {
    switch (subject) {
      case 'physics': return 'physics';
      case 'chemistry': return 'chemistry';
      case 'biology': return 'biology';
      case 'mathematics': return 'mathematics';
      default: return 'primary';
    }
  };

  const renderVideoPlayer = () => {
    const videoId = "dQw4w9WgXcQ"; // Demo video
    return (
      <div className="space-y-6">
        <div className="aspect-video bg-black rounded-lg overflow-hidden border-2 border-primary/30">
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
            onClick={() => handleGameComplete(50, 50)}
            variant="hero"
            className="text-xl px-8 py-4"
          >
            <Trophy className="w-6 h-6 mr-2" />
            Mark as Watched
          </Button>
        </div>
      </div>
    );
  };

  const renderGame = () => {
    if (gameType === 'video') return renderVideoPlayer();
    
    // Render specific games based on gameType
    switch (gameType) {
      case 'pizza-fractions':
        return <FractionPizzaGame onComplete={handleGameComplete} />;
      case 'food-chain-builder':
        return <FoodChainGame onComplete={handleGameComplete} />;
      case 'electric-circuit-builder':
        case 'circuit-builder':
        return <CircuitBuilderGame onComplete={handleGameComplete} />;
      case 'matter-sorting':
        return <MatterSortingGame onComplete={handleGameComplete} />;
      default:
        // Default game placeholder for other games
        return (
          <div className="text-center space-y-6">
            <div className="text-8xl animate-bounce-gentle">{getSubjectEmoji()}</div>
            <h3 className="text-3xl font-bold text-primary title-futuristic">{getGameTitle()}</h3>
            <p className="text-xl text-muted-foreground">This game is coming soon! Click below to get some XP.</p>
            <Button 
              onClick={() => handleGameComplete(75, 75)}
              variant="hero"
              className="text-xl px-8 py-4"
            >
              <Trophy className="w-6 h-6 mr-2" />
              Complete Demo
            </Button>
          </div>
        );
    }
  };

  if (!studentData) {
    return (
      <div className="min-h-screen bg-animated-gradient flex items-center justify-center">
        <FloatingParticles />
        <div className="text-white text-2xl title-futuristic">Loading...</div>
      </div>
    );
  }

  if (gameState === 'completed') {
    return (
      <div className="min-h-screen bg-animated-gradient">
        <FloatingParticles />
        <ConfettiEffect active={showConfetti} />
        
        <div className="max-w-3xl mx-auto px-6 py-12 text-center relative z-10">
          <Card className="gaming-card p-16 border-2 border-primary/50 hover:border-primary shadow-glow">
            <div className="text-9xl mb-8 animate-bounce-gentle">🎉</div>
            <h1 className="text-5xl font-bold text-primary mb-6 title-gaming animate-neon-pulse">
              VICTORY!
            </h1>
            <p className="text-2xl text-muted-foreground mb-8">
              You completed {getGameTitle()}!
            </p>
            
            <div className="flex justify-center space-x-8 mb-12">
              <div className="xp-badge text-2xl px-8 py-4">
                <Trophy className="w-8 h-8 mr-3" />
                +{Math.floor(score / 10)} XP
              </div>
              <div className="coins-badge text-2xl px-8 py-4">
                <Coins className="w-8 h-8 mr-3" />
                +{Math.floor(score / 100)} Coins
              </div>
            </div>

            <div className="space-y-6">
              <Link to={`/student/chapters/${subject}`}>
                <Button variant="hero" className="w-full text-xl py-4">
                  <ArrowLeft className="w-6 h-6 mr-2" />
                  Back to Chapters
                </Button>
              </Link>
              <Link to="/student/subjects">
                <Button variant="outline" className="w-full text-xl py-4 bg-card/50 border-primary/30 text-primary hover:bg-primary hover:text-background">
                  <Home className="w-6 h-6 mr-2" />
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
    <div className="min-h-screen bg-animated-gradient">
      <FloatingParticles />
      
      <div className="max-w-5xl mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to={`/student/chapters/${subject}`} className="flex items-center text-white hover:text-white/80 transition-all duration-300 hover:scale-105">
            <ArrowLeft className="w-6 h-6 mr-2" />
            Back to Chapters
          </Link>
          
          {/* Stats */}
          <div className="flex items-center space-x-4">
            <div className="xp-badge">
              <Trophy className="w-5 h-5 mr-1" />
              {studentData.xp} XP
            </div>
            <div className="coins-badge">
              <Coins className="w-5 h-5 mr-1" />
              {studentData.coins}
            </div>
          </div>
        </div>

        {/* Game Content */}
        <Card className="gaming-card p-8 border-2 border-primary/30 hover:border-primary/60 shadow-glow">
          <div className="text-center mb-8">
            <div className="text-8xl mb-6 animate-float">{getSubjectEmoji()}</div>
            <h1 className="text-4xl font-bold text-primary mb-4 title-gaming animate-neon-pulse">
              {getGameTitle()}
            </h1>
            <p className="text-xl text-muted-foreground capitalize title-futuristic">
              {t(subject || '')} - {chapter?.replace('-', ' ')}
            </p>
          </div>

          <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-primary/20">
            {renderGame()}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentGame;