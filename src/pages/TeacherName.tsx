import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Users, BarChart3 } from "lucide-react";
import { toast } from "sonner";

const TeacherName = () => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [school, setSchool] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    
    if (!subject) {
      toast.error("Please select your subject specialization");
      return;
    }

    if (!school.trim()) {
      toast.error("Please enter your school name");
      return;
    }

    // Store teacher info in localStorage
    const teacherData = {
      name: name.trim(),
      subject,
      school: school.trim(),
      joinedAt: new Date().toISOString()
    };
    
    localStorage.setItem("rued_teacher", JSON.stringify(teacherData));
    toast.success(`Welcome ${name}! Let's check your dashboard!`);
    
    navigate("/teacher/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link to="/teacher" className="flex items-center text-white hover:text-white/80 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Link>
        </div>

        {/* Form Card */}
        <Card className="p-12 border-0 bg-white/10 backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Teacher Setup</h1>
            <p className="text-white/80">Set up your profile to access the dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">Your Name</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 text-lg p-4"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Subject Specialization</label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger className="bg-white/20 border-white/30 text-white text-lg p-4">
                  <SelectValue placeholder="Choose your primary subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="all">All Subjects</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">School Name</label>
              <Input
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="Enter your school name"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 text-lg p-4"
              />
            </div>

            <Button type="submit" className="btn-hero w-full text-lg py-4 mt-8">
              <BarChart3 className="w-5 h-5 mr-2" />
              Access Dashboard
            </Button>
          </form>

          <div className="text-center mt-8 text-white/70 text-sm">
            <p>All student data is stored locally for privacy and offline access</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TeacherName;