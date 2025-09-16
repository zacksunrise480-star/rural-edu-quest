import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, BookOpen, Gamepad2, Trophy, CheckCircle, Lock } from "lucide-react";
import { toast } from "sonner";

interface StudentData {
  name: string;
  class: string;
  xp: number;
  coins: number;
  badges: string[];
  completedChapters: string[];
}

const subjectData = {
  physics: {
    name: "Physics",
    icon: "⚡",
    color: "physics",
    gradient: "card-physics",
    chapters: [
      {
        id: "light",
        name: "Light",
        description: "Learn about reflection, refraction, and how light travels",
        videoId: "dQw4w9WgXcQ", // Demo YouTube ID
        games: ["reflection-game", "refraction-puzzle", "light-quiz"],
        difficulty: "Easy",
        xpReward: 100
      },
      {
        id: "electricity", 
        name: "Electricity",
        description: "Understand circuits, current, and electrical safety",
        videoId: "dQw4w9WgXcQ",
        games: ["circuit-builder", "current-flow", "safety-quiz"],
        difficulty: "Medium",
        xpReward: 150
      },
      {
        id: "motion",
        name: "Motion", 
        description: "Explore speed, velocity, and different types of motion",
        videoId: "dQw4w9WgXcQ",
        games: ["motion-simulator", "speed-calculator", "motion-quiz"],
        difficulty: "Medium", 
        xpReward: 150
      },
      {
        id: "sound",
        name: "Sound",
        description: "Discover how sound travels and its properties",
        videoId: "dQw4w9WgXcQ", 
        games: ["sound-waves", "frequency-game", "sound-quiz"],
        difficulty: "Easy",
        xpReward: 100
      }
    ]
  },
  chemistry: {
    name: "Chemistry",
    icon: "🧪",
    color: "chemistry", 
    gradient: "card-chemistry",
    chapters: [
      {
        id: "matter",
        name: "Matter",
        description: "Learn about states of matter and their properties",
        videoId: "dQw4w9WgXcQ",
        games: ["matter-states", "particle-motion", "matter-quiz"],
        difficulty: "Easy",
        xpReward: 100
      },
      {
        id: "mixtures",
        name: "Mixtures", 
        description: "Understand different types of mixtures and separation",
        videoId: "dQw4w9WgXcQ",
        games: ["mixture-sorter", "separation-methods", "mixture-quiz"],
        difficulty: "Medium",
        xpReward: 150
      }
    ]
  },
  biology: {
    name: "Biology",
    icon: "🌱", 
    color: "biology",
    gradient: "card-biology",
    chapters: [
      {
        id: "food-chain",
        name: "Food Chain",
        description: "Explore how energy flows through living organisms",
        videoId: "dQw4w9WgXcQ",
        games: ["food-chain-builder", "ecosystem-balance", "chain-quiz"],
        difficulty: "Easy", 
        xpReward: 100
      },
      {
        id: "plants",
        name: "Plants",
        description: "Learn about plant parts, photosynthesis, and growth",
        videoId: "dQw4w9WgXcQ", 
        games: ["plant-parts", "photosynthesis-game", "plant-quiz"],
        difficulty: "Medium",
        xpReward: 150
      }
    ]
  },
  mathematics: {
    name: "Mathematics",
    icon: "🔢",
    color: "mathematics",
    gradient: "card-mathematics", 
    chapters: [
      {
        id: "fractions",
        name: "Fractions",
        description: "Master fractions with fun pizza and pie activities",
        videoId: "dQw4w9WgXcQ",
        games: ["pizza-fractions", "fraction-match", "fraction-quiz"],
        difficulty: "Easy",
        xpReward: 100
      },
      {
        id: "lcm-hcf", 
        name: "LCM & HCF",
        description: "Learn to find LCM and HCF using different methods",
        videoId: "dQw4w9WgXcQ",
        games: ["factor-finder", "multiple-match", "lcm-hcf-quiz"],
        difficulty: "Medium",
        xpReward: 150
      }
    ]
  }
};

const StudentChapters = () => {
  const { subject } = useParams<{ subject: string }>();
  const [studentData, setStudentData] = useState<StudentData | null>(null);
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

  if (!studentData || !subject || !subjectData[subject as keyof typeof subjectData]) {
    return <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
      <div className="text-white text-xl">Loading...</div>
    </div>;
  }

  const currentSubject = subjectData[subject as keyof typeof subjectData];
  
  const isChapterCompleted = (chapterId: string) => {
    return studentData.completedChapters.includes(`${subject}-${chapterId}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/student/subjects" className="flex items-center text-white hover:text-white/80 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Subjects
          </Link>
        </div>

        {/* Subject Header */}
        <div className="text-center mb-12">
          <div className="text-8xl mb-4">{currentSubject.icon}</div>
          <h1 className="text-4xl font-bold text-white mb-4">{currentSubject.name}</h1>
          <p className="text-xl text-white/80 mb-6">Choose a chapter to start learning</p>
        </div>

        {/* Chapters Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {currentSubject.chapters.map((chapter, index) => {
            const isCompleted = isChapterCompleted(chapter.id);
            const isLocked = index > 0 && !isChapterCompleted(currentSubject.chapters[index - 1].id);
            
            return (
              <Card 
                key={chapter.id}
                className={`${isLocked ? 'bg-gray-200/20' : 'bg-white/10'} backdrop-blur-sm border-0 p-6 transition-all duration-300 ${!isLocked ? 'hover:scale-105 cursor-pointer' : 'cursor-not-allowed'} shadow-card`}
              >
                <div className="relative">
                  {isLocked && (
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center z-10">
                      <div className="text-center text-white">
                        <Lock className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">Complete previous chapter</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">{chapter.name}</h3>
                    <div className="flex items-center space-x-2">
                      {isCompleted && (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completed
                        </Badge>
                      )}
                      <Badge className={getDifficultyColor(chapter.difficulty)}>
                        {chapter.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-white/80 mb-6">{chapter.description}</p>

                  {/* XP Reward */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-white/70 text-sm">Reward:</div>
                    <div className="xp-badge">
                      <Trophy className="w-4 h-4 mr-1" />
                      {chapter.xpReward} XP
                    </div>
                  </div>

                  {/* Activities */}
                  <div className="space-y-3">
                    {/* Video Lesson */}
                    <Link 
                      to={`/student/game/${subject}/${chapter.id}/video`}
                      className={`flex items-center justify-between p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors ${isLocked ? 'pointer-events-none opacity-50' : ''}`}
                    >
                      <div className="flex items-center space-x-3">
                        <Play className="w-5 h-5 text-white" />
                        <span className="text-white font-medium">Watch Video Lesson</span>
                      </div>
                      <ArrowLeft className="w-4 h-4 text-white/60 rotate-180" />
                    </Link>

                    {/* Games */}
                    {chapter.games.map((game, gameIndex) => (
                      <Link 
                        key={game}
                        to={`/student/game/${subject}/${chapter.id}/${game}`}
                        className={`flex items-center justify-between p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors ${isLocked ? 'pointer-events-none opacity-50' : ''}`}
                      >
                        <div className="flex items-center space-x-3">
                          <Gamepad2 className="w-5 h-5 text-white" />
                          <span className="text-white font-medium">
                            {game.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </span>
                        </div>
                        <ArrowLeft className="w-4 h-4 text-white/60 rotate-180" />
                      </Link>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Progress Summary */}
        <div className="mt-12 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-2">Your Progress</h3>
            <p className="text-white/80 mb-4">
              Complete chapters in order to unlock new content and earn rewards!
            </p>
            <div className="text-white/70 text-sm">
              Completed: {currentSubject.chapters.filter(ch => isChapterCompleted(ch.id)).length} / {currentSubject.chapters.length} chapters
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentChapters;