import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Users, BarChart3, Download } from "lucide-react";

const TeacherPortal = () => {
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
            <Users className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">Teacher Portal</h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Welcome to your teaching dashboard. Monitor student progress, view analytics, and manage your classroom effectively.
          </p>

          <Link to="/teacher/name">
            <Button className="btn-hero text-lg px-12 py-4">
              Access Dashboard
            </Button>
          </Link>
        </Card>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-6 text-center text-white">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <BarChart3 className="w-8 h-8 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Student Analytics</h3>
            <p className="text-sm text-white/70">Track progress, time spent, and performance across all subjects</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <Users className="w-8 h-8 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Leaderboard</h3>
            <p className="text-sm text-white/70">View top performing students and class rankings</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <Download className="w-8 h-8 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Export Data</h3>
            <p className="text-sm text-white/70">Download student data and progress reports as CSV</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherPortal;