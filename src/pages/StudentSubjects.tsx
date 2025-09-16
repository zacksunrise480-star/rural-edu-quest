import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap, Coins, Trophy, BookOpen, PlayCircle } from "lucide-react";
import { toast } from "sonner";

interface StudentData {
  name: string;
  class: string;
  xp: number;
  coins: number;
  badges: string[];
  completedChapters: string[];
}

const subjects = [
  {
    id: "physics",
    name: "Physics",
    icon: "⚡",
    description: "Explore the wonders of light, electricity, and motion",
    chapters: ["Light", "Electricity", "Motion", "Sound"],
    color: "physics",
    gradient: "card-physics"
  },
  {
    id: "chemistry", 
    name: "Chemistry",
    icon: "🧪",
    description: "Discover matter, mixtures, and chemical reactions",
    chapters: ["Matter", "Mixtures", "Acids & Bases", "Metals"],
    color: "chemistry",
    gradient: "card-chemistry"
  },
  {
    id: "biology",
    name: "Biology", 
    icon: "🌱",
    description: "Learn about life, food chains, and living organisms",
    chapters: ["Food Chain", "Plants", "Human Body", "Animals"],
    color: "biology",
    gradient: "card-biology"
  },
  {
    id: "mathematics",
    name: "Mathematics",
    icon: "🔢", 
    description: "Master fractions, LCM, HCF, and number patterns",
    chapters: ["Fractions", "LCM & HCF", "Decimals", "Geometry"],
    color: "mathematics",
    gradient: "card-mathematics"
  }
];

const StudentSubjects = () => {
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

  if (!studentData) {
    return <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
      <div className="text-white text-xl">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/student/name" className="flex items-center text-white hover:text-white/80 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Link>
          
          {/* Student Stats */}
          <div className="flex items-center space-x-4">
            <div className="xp-badge">
              <Zap className="w-4 h-4 mr-1" />
              {studentData.xp} XP
            </div>
            <div className="coins-badge">
              <Coins className="w-4 h-4 mr-1" />
              {studentData.coins}
            </div>
            <div className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
              <Trophy className="w-4 h-4 mr-1 inline" />
              {studentData.badges.length}
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome back, {studentData.name}! 
          </h1>
          <p className="text-xl text-white/80 mb-2">Class {studentData.class}</p>
          <p className="text-white/70">Choose a subject to start your learning adventure</p>
        </div>

        {/* Subjects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {subjects.map((subject) => {
            const completedInSubject = studentData.completedChapters.filter(
              chapter => chapter.startsWith(subject.id)
            ).length;
            
            return (
              <Card 
                key={subject.id}
                className={`${subject.gradient} border-0 p-8 hover:scale-105 transition-all duration-300 cursor-pointer group shadow-card`}
              >
                <Link to={`/student/chapters/${subject.id}`} className="block">
                  <div className="text-center">
                    <div className="text-6xl mb-4">{subject.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-3">{subject.name}</h3>
                    <p className="text-white/90 mb-6">{subject.description}</p>
                    
                    {/* Progress */}
                    <div className="bg-white/20 rounded-lg p-4 mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/80 text-sm">Progress</span>
                        <span className="text-white font-semibold text-sm">
                          {completedInSubject}/{subject.chapters.length}
                        </span>
                      </div>
                      <div className="bg-white/20 rounded-full h-2">
                        <div 
                          className="bg-white rounded-full h-2 transition-all duration-500"
                          style={{ width: `${(completedInSubject / subject.chapters.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Chapters Preview */}
                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                      {subject.chapters.slice(0, 3).map((chapter) => (
                        <span 
                          key={chapter}
                          className="bg-white/20 text-white/80 px-3 py-1 rounded-full text-xs"
                        >
                          {chapter}
                        </span>
                      ))}
                      {subject.chapters.length > 3 && (
                        <span className="bg-white/20 text-white/80 px-3 py-1 rounded-full text-xs">
                          +{subject.chapters.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-center space-x-4 text-white/80 text-sm">
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{subject.chapters.length} Chapters</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <PlayCircle className="w-4 h-4" />
                        <span>Games & Videos</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Card>
            );
          })}
        </div>

        {/* Bottom Encouragement */}
        <div className="text-center mt-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-2">Ready to Learn?</h3>
            <p className="text-white/80">
              Each subject has interactive games, videos, and rewards waiting for you. 
              Start with any subject you're curious about!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSubjects;