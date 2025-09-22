import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Trophy, BookOpen, Download, BarChart3, TrendingUp, Clock, Target, Zap } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import FloatingParticles from "@/components/FloatingParticles";
import GamingLeaderboard from "@/components/GamingLeaderboard";

interface TeacherData {
  name: string;
  subject: string;
  school: string;
  joinedAt: string;
}

interface StudentData {
  name: string;
  class: string;
  xp: number;
  coins: number;
  badges: string[];
  completedChapters: string[];
}

const TeacherDashboard = () => {
  const [teacherData, setTeacherData] = useState<TeacherData | null>(null);
  const [students, setStudents] = useState<StudentData[]>([]);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const stored = localStorage.getItem("rued_teacher");
    if (!stored) {
      toast.error("Please complete your profile first");
      navigate("/teacher/name");
      return;
    }
    setTeacherData(JSON.parse(stored));

    // Enhanced demo student data
    const demoStudents: StudentData[] = [
      {
        name: "Arjun Kumar",
        class: "8",
        xp: 3250,
        coins: 185,
        badges: ["First Steps", "Math Master", "Science Star", "Quiz Champion"],
        completedChapters: ["physics-light", "physics-electricity", "mathematics-fractions", "mathematics-lcm-hcf", "biology-food-chain", "chemistry-matter"]
      },
      {
        name: "Priya Sharma",
        class: "8", 
        xp: 2980,
        coins: 162,
        badges: ["Explorer", "Biology Expert", "Consistent Learner"],
        completedChapters: ["chemistry-matter", "biology-food-chain", "biology-plants", "physics-light"]
      },
      {
        name: "Rohan Singh",
        class: "7",
        xp: 2750,
        coins: 145,
        badges: ["First Steps", "Physics Pro", "Circuit Master", "Problem Solver"],
        completedChapters: ["physics-light", "physics-electricity", "physics-motion", "chemistry-matter", "mathematics-fractions"]
      },
      {
        name: "Anisha Rao", 
        class: "8",
        xp: 2450,
        coins: 128,
        badges: ["First Steps", "Accuracy Expert", "Streak Master"],
        completedChapters: ["mathematics-fractions", "mathematics-lcm-hcf", "biology-food-chain"]
      },
      {
        name: "Vikram Joshi",
        class: "7",
        xp: 2200,
        coins: 115,
        badges: ["Explorer", "Math Master", "Quick Learner"],
        completedChapters: ["physics-light", "mathematics-fractions", "mathematics-lcm-hcf", "chemistry-matter"]
      },
      {
        name: "Meera Gupta",
        class: "8",
        xp: 1980,
        coins: 98,
        badges: ["First Steps", "Chemistry Star"],
        completedChapters: ["chemistry-matter", "chemistry-mixtures", "biology-food-chain"]
      }
    ];

    setStudents(demoStudents);
  }, [navigate]);

  const exportData = () => {
    const csvContent = [
      "Name,Class,XP,Level,Coins,Badges,Completed Chapters,Games Completed,Accuracy",
      ...students.map(student => {
        const level = Math.floor(student.xp / 200) + 1;
        const accuracy = 85 + Math.floor(Math.random() * 15);
        return `"${student.name}",${student.class},${student.xp},${level},${student.coins},"${student.badges.join(', ')}","${student.completedChapters.join(', ')}",${student.completedChapters.length * 2},${accuracy}%`;
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `student_progress_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success("Student data exported successfully! 📊");
  };

  const getSubjectProgress = (subject: string) => {
    const subjectChapters = students.reduce((acc, student) => {
      return acc + student.completedChapters.filter(ch => ch.startsWith(subject)).length;
    }, 0);
    return subjectChapters;
  };

  if (!teacherData) {
    return (
      <div className="min-h-screen bg-animated-gradient flex items-center justify-center">
        <FloatingParticles />
        <div className="text-white text-2xl title-futuristic">Loading...</div>
      </div>
    );
  }

  const totalXP = students.reduce((sum, student) => sum + student.xp, 0);
  const averageXP = students.length > 0 ? Math.round(totalXP / students.length) : 0;
  const topPerformer = students.reduce((prev, current) => (prev.xp > current.xp) ? prev : current, students[0]);
  const totalGamesCompleted = students.reduce((sum, s) => sum + (s.completedChapters.length * 2), 0);
  const activeToday = Math.floor(students.length * 0.75);

  return (
    <div className="min-h-screen bg-animated-gradient">
      <FloatingParticles />
      
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/teacher/name" className="flex items-center text-white hover:text-white/80 transition-all duration-300 hover:scale-105">
            <ArrowLeft className="w-6 h-6 mr-2" />
            {t('back')}
          </Link>
          
          <Button 
            onClick={exportData}
            className="bg-card/50 hover:bg-card/70 text-primary border-2 border-primary/30 hover:border-primary hover:shadow-glow transition-all duration-300"
            variant="outline"
          >
            <Download className="w-5 h-5 mr-2" />
            {t('exportCSV')}
          </Button>
        </div>

        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4 title-gaming animate-neon-pulse">
            {t('welcomeTeacher')}, {teacherData.name}!
          </h1>
          <p className="text-2xl text-secondary mb-2 title-futuristic">{teacherData.school}</p>
          <p className="text-xl text-muted-foreground">Subject: {t(teacherData.subject)}</p>
        </div>

        {/* Enhanced Stats Overview */}
        <div className="grid md:grid-cols-5 gap-6 mb-12">
          <Card className="gaming-card p-6 border-2 border-primary/30 hover:border-primary hover:shadow-glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium mb-1">{t('totalStudents')}</p>
                <p className="text-4xl font-bold text-primary animate-neon-pulse title-futuristic">{students.length}</p>
              </div>
              <Users className="w-12 h-12 text-primary animate-float" />
            </div>
          </Card>

          <Card className="gaming-card p-6 border-2 border-secondary/30 hover:border-secondary hover:shadow-glow-secondary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium mb-1">{t('averageXP')}</p>
                <p className="text-4xl font-bold text-secondary animate-neon-pulse title-futuristic">{averageXP}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-secondary animate-float" />
            </div>
          </Card>

          <Card className="gaming-card p-6 border-2 border-accent/30 hover:border-accent hover:shadow-glow-accent">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium mb-1">{t('totalChapters')}</p>
                <p className="text-4xl font-bold text-accent animate-neon-pulse title-futuristic">
                  {students.reduce((sum, s) => sum + s.completedChapters.length, 0)}
                </p>
              </div>
              <BookOpen className="w-12 h-12 text-accent animate-float" />
            </div>
          </Card>

          <Card className="gaming-card p-6 border-2 border-physics/30 hover:border-physics hover:shadow-glow-physics">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium mb-1">{t('gamesCompleted')}</p>
                <p className="text-4xl font-bold text-physics animate-neon-pulse title-futuristic">{totalGamesCompleted}</p>
              </div>
              <span className="text-4xl animate-float">🎮</span>
            </div>
          </Card>

          <Card className="gaming-card p-6 border-2 border-chemistry/30 hover:border-chemistry hover:shadow-glow-chemistry">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium mb-1">{t('activeToday')}</p>
                <p className="text-4xl font-bold text-chemistry animate-neon-pulse title-futuristic">{activeToday}</p>
              </div>
              <Clock className="w-12 h-12 text-chemistry animate-float" />
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Enhanced Leaderboard */}
          <GamingLeaderboard />

          {/* Subject Progress */}
          <Card className="gaming-card p-6 border-2 border-primary/30 hover:border-primary/60 shadow-glow">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-primary title-futuristic">{t('subjectProgress')}</h2>
              <BarChart3 className="w-8 h-8 text-primary animate-neon-pulse" />
            </div>
            
            <div className="space-y-6">
              {[
                { name: t('physics'), key: 'physics', color: 'bg-physics', icon: '⚡', textColor: 'text-physics' },
                { name: t('chemistry'), key: 'chemistry', color: 'bg-chemistry', icon: '🧪', textColor: 'text-chemistry' },
                { name: t('biology'), key: 'biology', color: 'bg-biology', icon: '🌱', textColor: 'text-biology' },
                { name: t('mathematics'), key: 'mathematics', color: 'bg-mathematics', icon: '🔢', textColor: 'text-mathematics' }
              ].map(subject => {
                const progress = getSubjectProgress(subject.key);
                const maxProgress = students.length * 3; // Assuming 3 chapters per subject
                const percentage = maxProgress > 0 ? (progress / maxProgress) * 100 : 0;
                
                return (
                  <div key={subject.key}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl animate-float">{subject.icon}</span>
                        <span className={`font-bold text-lg title-futuristic ${subject.textColor}`}>{subject.name}</span>
                      </div>
                      <div className="text-right">
                        <span className={`font-bold ${subject.textColor}`}>{progress}</span>
                        <span className="text-muted-foreground text-sm ml-1">{t('completions')}</span>
                      </div>
                    </div>
                    <div className="bg-muted/30 rounded-full h-4 overflow-hidden border border-muted/50">
                      <div 
                        className={`${subject.color} rounded-full h-4 transition-all duration-1000 shadow-glow animate-neon-pulse`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Additional Analytics */}
            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="text-lg font-bold text-secondary mb-4 title-futuristic">📈 Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-card/30 rounded-lg border border-primary/20">
                  <div className="text-2xl font-bold text-primary title-futuristic">
                    {Math.round((students.reduce((sum, s) => sum + s.completedChapters.length, 0) / (students.length * 12)) * 100)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Overall Progress</div>
                </div>
                <div className="text-center p-4 bg-card/30 rounded-lg border border-secondary/20">
                  <div className="text-2xl font-bold text-secondary title-futuristic">
                    {students.reduce((sum, s) => sum + s.badges.length, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total {t('badges')}</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Top Performer Highlight */}
        {topPerformer && (
          <Card className="mt-8 p-8 bg-gradient-to-r from-badge-gold/20 via-badge-gold/10 to-transparent border-2 border-badge-gold/40 shadow-[0_0_40px_hsl(var(--badge-gold)/0.3)] hover:shadow-[0_0_60px_hsl(var(--badge-gold)/0.4)] transition-all duration-500">
            <div className="text-center">
              <Crown className="w-16 h-16 text-badge-gold mx-auto mb-6 animate-glow-rotate" />
              <h3 className="text-3xl font-bold text-badge-gold mb-4 title-gaming animate-neon-pulse">👑 {t('topPerformer')}</h3>
              <p className="text-2xl text-foreground mb-2 title-futuristic">{topPerformer.name}</p>
              <p className="text-lg text-muted-foreground mb-6">
                Class {topPerformer.class} • {topPerformer.xp} XP • Level {Math.floor(topPerformer.xp / 200) + 1}
              </p>
              <div className="flex justify-center space-x-4">
                {topPerformer.badges.slice(0, 4).map(badge => (
                  <Badge key={badge} className="bg-badge-gold/20 text-badge-gold border-badge-gold/30 px-4 py-2 text-sm font-semibold">
                    {badge}
                  </Badge>
                ))}
                {topPerformer.badges.length > 4 && (
                  <Badge className="bg-badge-gold/20 text-badge-gold border-badge-gold/30 px-4 py-2 text-sm font-semibold">
                    +{topPerformer.badges.length - 4} more
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;