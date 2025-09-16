import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Trophy, BookOpen, Download, BarChart3, TrendingUp, Clock } from "lucide-react";
import { toast } from "sonner";

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

  useEffect(() => {
    const stored = localStorage.getItem("rued_teacher");
    if (!stored) {
      toast.error("Please complete your profile first");
      navigate("/teacher/name");
      return;
    }
    setTeacherData(JSON.parse(stored));

    // Load demo student data for the dashboard
    const demoStudents: StudentData[] = [
      {
        name: "Rahul Kumar",
        class: "6",
        xp: 1250,
        coins: 85,
        badges: ["First Steps", "Math Master"],
        completedChapters: ["physics-light", "mathematics-fractions", "biology-food-chain"]
      },
      {
        name: "Priya Sharma",
        class: "6", 
        xp: 980,
        coins: 62,
        badges: ["Explorer"],
        completedChapters: ["chemistry-matter", "biology-food-chain"]
      },
      {
        name: "Amit Patel",
        class: "7",
        xp: 1450,
        coins: 95,
        badges: ["First Steps", "Science Star", "Quiz Master"],
        completedChapters: ["physics-light", "physics-electricity", "chemistry-matter", "mathematics-fractions"]
      },
      {
        name: "Anita Singh", 
        class: "6",
        xp: 720,
        coins: 48,
        badges: ["First Steps"],
        completedChapters: ["mathematics-fractions"]
      },
      {
        name: "Suresh Das",
        class: "7",
        xp: 1180,
        coins: 78,
        badges: ["Explorer", "Math Master"],
        completedChapters: ["physics-light", "mathematics-fractions", "mathematics-lcm-hcf"]
      }
    ];

    setStudents(demoStudents);
  }, [navigate]);

  const exportData = () => {
    const csvContent = [
      "Name,Class,XP,Coins,Badges,Completed Chapters",
      ...students.map(student => 
        `"${student.name}",${student.class},${student.xp},${student.coins},"${student.badges.join(', ')}","${student.completedChapters.join(', ')}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_progress_report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success("Student data exported successfully!");
  };

  const getSubjectProgress = (subject: string) => {
    const subjectChapters = students.reduce((acc, student) => {
      return acc + student.completedChapters.filter(ch => ch.startsWith(subject)).length;
    }, 0);
    return subjectChapters;
  };

  if (!teacherData) {
    return <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
      <div className="text-white text-xl">Loading...</div>
    </div>;
  }

  const totalXP = students.reduce((sum, student) => sum + student.xp, 0);
  const averageXP = students.length > 0 ? Math.round(totalXP / students.length) : 0;
  const topPerformer = students.reduce((prev, current) => (prev.xp > current.xp) ? prev : current, students[0]);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/teacher/name" className="flex items-center text-white hover:text-white/80 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Link>
          
          <Button 
            onClick={exportData}
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            variant="outline"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome, {teacherData.name}!
          </h1>
          <p className="text-xl text-white/80 mb-2">{teacherData.school}</p>
          <p className="text-white/60">Subject: {teacherData.subject}</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total Students</p>
                <p className="text-3xl font-bold text-white">{students.length}</p>
              </div>
              <Users className="w-8 h-8 text-white/60" />
            </div>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-sm border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Average XP</p>
                <p className="text-3xl font-bold text-white">{averageXP}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-white/60" />
            </div>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-sm border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total Chapters</p>
                <p className="text-3xl font-bold text-white">
                  {students.reduce((sum, s) => sum + s.completedChapters.length, 0)}
                </p>
              </div>
              <BookOpen className="w-8 h-8 text-white/60" />
            </div>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-sm border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Active Today</p>
                <p className="text-3xl font-bold text-white">{Math.floor(students.length * 0.7)}</p>
              </div>
              <Clock className="w-8 h-8 text-white/60" />
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Leaderboard */}
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Student Leaderboard</h2>
              <Trophy className="w-6 h-6 text-yellow-400" />
            </div>
            
            <div className="space-y-4">
              {students
                .sort((a, b) => b.xp - a.xp)
                .slice(0, 10)
                .map((student, index) => (
                <div key={student.name} className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-yellow-400 text-black' :
                      index === 1 ? 'bg-gray-300 text-black' :
                      index === 2 ? 'bg-amber-600 text-white' :
                      'bg-white/20 text-white'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{student.name}</p>
                      <p className="text-white/60 text-sm">Class {student.class}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white">{student.xp} XP</p>
                    <p className="text-white/60 text-sm">{student.badges.length} badges</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Subject Progress */}
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Subject Progress</h2>
              <BarChart3 className="w-6 h-6 text-blue-400" />
            </div>
            
            <div className="space-y-6">
              {[
                { name: 'Physics', key: 'physics', color: 'bg-blue-400', icon: '⚡' },
                { name: 'Chemistry', key: 'chemistry', color: 'bg-green-400', icon: '🧪' },
                { name: 'Biology', key: 'biology', color: 'bg-orange-400', icon: '🌱' },
                { name: 'Mathematics', key: 'mathematics', color: 'bg-purple-400', icon: '🔢' }
              ].map(subject => {
                const progress = getSubjectProgress(subject.key);
                const maxProgress = students.length * 2; // Assuming 2 chapters per subject for demo
                const percentage = maxProgress > 0 ? (progress / maxProgress) * 100 : 0;
                
                return (
                  <div key={subject.key}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{subject.icon}</span>
                        <span className="text-white font-medium">{subject.name}</span>
                      </div>
                      <span className="text-white/60 text-sm">{progress} completions</span>
                    </div>
                    <div className="bg-white/20 rounded-full h-3">
                      <div 
                        className={`${subject.color} rounded-full h-3 transition-all duration-500`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Top Performer Highlight */}
        {topPerformer && (
          <Card className="mt-8 p-6 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm border-0">
            <div className="text-center">
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Top Performer</h3>
              <p className="text-xl text-white/90 mb-2">{topPerformer.name}</p>
              <p className="text-white/70 mb-4">Class {topPerformer.class} • {topPerformer.xp} XP • {topPerformer.badges.length} badges</p>
              <div className="flex justify-center space-x-2">
                {topPerformer.badges.map(badge => (
                  <Badge key={badge} className="bg-yellow-400/20 text-yellow-200 border-yellow-400/30">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;