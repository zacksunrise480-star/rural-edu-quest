import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, Users, BookOpen, Trophy, Gamepad2, Video } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">RUED</h1>
              <p className="text-white/80 text-sm">Learn. Play. Lead.</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-slide-up">
            Welcome to RUED
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto animate-slide-up">
            A gamified learning platform designed for rural students. Learn through interactive games, 
            earn rewards, and track your progress while having fun!
          </p>
          
          {/* Portal Selection */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Student Portal */}
            <Card className="p-8 border-0 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 group cursor-pointer">
              <Link to="/student" className="block">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Student Portal</h3>
                  <p className="text-white/80 mb-6">
                    Access interactive lessons, play educational games, and earn XP points and badges!
                  </p>
                  <div className="flex justify-center space-x-4 text-sm text-white/70">
                    <div className="flex items-center space-x-1">
                      <Gamepad2 className="w-4 h-4" />
                      <span>Games</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Video className="w-4 h-4" />
                      <span>Videos</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Trophy className="w-4 h-4" />
                      <span>Rewards</span>
                    </div>
                  </div>
                </div>
              </Link>
            </Card>

            {/* Teacher Portal */}
            <Card className="p-8 border-0 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 group cursor-pointer">
              <Link to="/teacher" className="block">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Teacher Portal</h3>
                  <p className="text-white/80 mb-6">
                    Monitor student progress, view analytics, and manage classroom activities.
                  </p>
                  <div className="flex justify-center space-x-4 text-sm text-white/70">
                    <div className="flex items-center space-x-1">
                      <Trophy className="w-4 h-4" />
                      <span>Leaderboard</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>Analytics</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>Students</span>
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-4 gap-6 mt-16">
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8" />
            </div>
            <h4 className="font-semibold mb-2">Interactive Learning</h4>
            <p className="text-sm text-white/70">Engaging content for all subjects</p>
          </div>
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Gamepad2 className="w-8 h-8" />
            </div>
            <h4 className="font-semibold mb-2">Educational Games</h4>
            <p className="text-sm text-white/70">Learn through play and fun</p>
          </div>
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8" />
            </div>
            <h4 className="font-semibold mb-2">Rewards System</h4>
            <p className="text-sm text-white/70">Earn XP, coins, and badges</p>
          </div>
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8" />
            </div>
            <h4 className="font-semibold mb-2">Progress Tracking</h4>
            <p className="text-sm text-white/70">Monitor learning achievements</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;