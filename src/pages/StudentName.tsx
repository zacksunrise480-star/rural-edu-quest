import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, User, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import AnimatedBackground from "@/components/AnimatedBackground";
import LanguageSelector from "@/components/LanguageSelector";

const StudentName = () => {
  const [name, setName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    
    if (!selectedClass) {
      toast.error("Please select your class");
      return;
    }

    // Store student info in localStorage (offline-first approach)
    const studentData = {
      name: name.trim(),
      class: selectedClass,
      joinedAt: new Date().toISOString(),
      xp: 0,
      coins: 0,
      badges: [],
      completedChapters: []
    };
    
    localStorage.setItem("rued_student", JSON.stringify(studentData));
    toast.success(`Welcome ${name}! Let's start learning!`);
    
    navigate("/student/subjects");
  };

  return (
    <AnimatedBackground theme="default">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link to="/student" className="flex items-center text-white hover:text-white/80 transition-all duration-300 hover:scale-105">
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('back')}
          </Link>
          <LanguageSelector />
        </div>

        {/* Form Card */}
        <Card className="p-12 border-0 bg-white/10 backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">{t('enterName')}</h1>
            <p className="text-white/80">We'll personalize your learning experience</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">{t('enterName')}</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('nameInputPlaceholder')}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 text-lg p-4 transition-all duration-300 focus:scale-105"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">{t('selectClass')}</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="bg-white/20 border-white/30 text-white text-lg p-4 transition-all duration-300 hover:scale-105">
                  <SelectValue placeholder={t('selectClass')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">Class 6</SelectItem>
                  <SelectItem value="7">Class 7</SelectItem>
                  <SelectItem value="8">Class 8</SelectItem>
                  <SelectItem value="9">Class 9</SelectItem>
                  <SelectItem value="10">Class 10</SelectItem>
                  <SelectItem value="11">Class 11</SelectItem>
                  <SelectItem value="12">Class 12</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="btn-hero w-full text-lg py-4 mt-8 hover:scale-105 transition-all duration-300">
              <BookOpen className="w-5 h-5 mr-2" />
              {t('continueButton')}
            </Button>
          </form>

          <div className="text-center mt-8 text-white/70 text-sm">
            <p>Demo: We recommend starting with Class 6 for the best experience</p>
          </div>
        </Card>
      </div>
    </AnimatedBackground>
  );
};

export default StudentName;