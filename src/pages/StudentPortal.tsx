import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, User, BookOpen } from "lucide-react";

const StudentPortal = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link to="/" className="flex items-center text-white hover:text-white/80 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Welcome Card */}
        <Card className="p-12 border-0 bg-white/10 backdrop-blur-sm text-center mb-8">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <User className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">Student Portal</h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Ready to start your learning journey? Let's get you set up and begin exploring!
          </p>

          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-2 text-white/70">
              <BookOpen className="w-5 h-5" />
              <span>Choose from 4 subjects: Physics, Chemistry, Biology & Mathematics</span>
            </div>

            <Link to="/student/name">
              <Button className="btn-hero text-lg px-12 py-4">
                Let's Get Started!
              </Button>
            </Link>
          </div>
        </Card>

        {/* Quick Info */}
        <div className="grid md:grid-cols-3 gap-6 text-center text-white">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="font-semibold mb-2">Interactive Games</h3>
            <p className="text-sm text-white/70">Play engaging games for each chapter</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="font-semibold mb-2">Video Lessons</h3>
            <p className="text-sm text-white/70">Watch YouTube videos to learn concepts</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="font-semibold mb-2">Earn Rewards</h3>
            <p className="text-sm text-white/70">Collect XP points, coins, and badges</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;