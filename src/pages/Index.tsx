import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, Users, BookOpen, Trophy, Gamepad2, Video } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const Index = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl opacity-10 animate-bounce-gentle">🎓</div>
        <div className="absolute top-32 right-20 text-4xl opacity-20 animate-pulse">⭐</div>
        <div className="absolute bottom-20 left-20 text-5xl opacity-15 animate-bounce-gentle">🚀</div>
        <div className="absolute bottom-32 right-10 text-3xl opacity-25 animate-pulse">🎮</div>
      </div>

      {/* Header */}
      <header className="p-6 relative z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center animate-pulse-glow">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">RUED</h1>
              <p className="text-white/80 text-sm">{t('tagline')}</p>
            </div>
          </div>
          <LanguageSelector />
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-slide-up text-gradient-primary">
            {t('welcome')}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto animate-slide-up">
            {t('description')}
          </p>
          
          {/* Portal Selection */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Student Portal */}
            <Card className="p-8 border-0 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:shadow-glow transition-all duration-300 group cursor-pointer">
              <Link to="/student" className="block">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-glow">
                    <BookOpen className="w-10 h-10 text-white animate-bounce-gentle" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{t('studentPortal')}</h3>
                  <p className="text-white/80 mb-6">
                    {t('studentPortalDesc')}
                  </p>
                  <div className="flex justify-center space-x-4 text-sm text-white/70">
                    <div className="flex items-center space-x-1 hover-scale">
                      <Gamepad2 className="w-4 h-4" />
                      <span>{t('games')}</span>
                    </div>
                    <div className="flex items-center space-x-1 hover-scale">
                      <Video className="w-4 h-4" />
                      <span>{t('videos')}</span>
                    </div>
                    <div className="flex items-center space-x-1 hover-scale">
                      <Trophy className="w-4 h-4" />
                      <span>{t('rewards')}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </Card>

            {/* Teacher Portal */}
            <Card className="p-8 border-0 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:shadow-glow transition-all duration-300 group cursor-pointer">
              <Link to="/teacher" className="block">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-glow">
                    <Users className="w-10 h-10 text-white animate-bounce-gentle" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{t('teacherPortal')}</h3>
                  <p className="text-white/80 mb-6">
                    {t('teacherPortalDesc')}
                  </p>
                  <div className="flex justify-center space-x-4 text-sm text-white/70">
                    <div className="flex items-center space-x-1 hover-scale">
                      <Trophy className="w-4 h-4" />
                      <span>{t('leaderboard')}</span>
                    </div>
                    <div className="flex items-center space-x-1 hover-scale">
                      <BookOpen className="w-4 h-4" />
                      <span>{t('analytics')}</span>
                    </div>
                    <div className="flex items-center space-x-1 hover-scale">
                      <Users className="w-4 h-4" />
                      <span>{t('students')}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-4 gap-6 mt-16">
          <div className="text-center text-white group hover-scale">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300 animate-pulse-glow">
              <BookOpen className="w-8 h-8 group-hover:scale-110 transition-transform" />
            </div>
            <h4 className="font-semibold mb-2">{t('interactiveLearning')}</h4>
            <p className="text-sm text-white/70">{t('interactiveLearningDesc')}</p>
          </div>
          <div className="text-center text-white group hover-scale">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300 animate-pulse-glow">
              <Gamepad2 className="w-8 h-8 group-hover:scale-110 transition-transform" />
            </div>
            <h4 className="font-semibold mb-2">{t('educationalGames')}</h4>
            <p className="text-sm text-white/70">{t('educationalGamesDesc')}</p>
          </div>
          <div className="text-center text-white group hover-scale">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300 animate-pulse-glow">
              <Trophy className="w-8 h-8 group-hover:scale-110 transition-transform" />
            </div>
            <h4 className="font-semibold mb-2">{t('rewardsSystem')}</h4>
            <p className="text-sm text-white/70">{t('rewardsSystemDesc')}</p>
          </div>
          <div className="text-center text-white group hover-scale">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300 animate-pulse-glow">
              <Users className="w-8 h-8 group-hover:scale-110 transition-transform" />
            </div>
            <h4 className="font-semibold mb-2">{t('progressTracking')}</h4>
            <p className="text-sm text-white/70">{t('progressTrackingDesc')}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;