import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, Users, Award, ArrowRight, Star, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const Index = () => {
  const { t } = useLanguage();
  
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
        {/* Animated Gaming Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full animate-float opacity-30"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-secondary rounded-full animate-float opacity-40" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-40 left-20 w-5 h-5 bg-accent rounded-full animate-float opacity-35" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 right-40 w-3 h-3 bg-primary rounded-full animate-float opacity-25" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-8 h-8 border-2 border-secondary rounded-full animate-glow-rotate opacity-20"></div>
          <div className="absolute top-1/3 right-1/3 w-6 h-6 border-2 border-accent rounded-full animate-glow-rotate opacity-25" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10">
          {/* Gaming Header */}
          <header className="container mx-auto px-6 pt-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center animate-neon-pulse">
                  <span className="text-2xl font-bold text-background">R</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-primary">RUED</h1>
                  <p className="text-sm text-muted-foreground">{t('gameTitle')}</p>
                </div>
              </div>
              <LanguageSelector />
            </div>
          </header>

          {/* Hero Section */}
          <main className="container mx-auto px-6 py-16">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-primary animate-slide-up">
                {t('welcome')}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                {t('heroSubtitle')}
              </p>
              
              {/* Gaming Achievement Stats */}
              <div className="flex justify-center space-x-8 mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary animate-neon-pulse">10K+</div>
                  <div className="text-sm text-muted-foreground">{t('students')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary animate-neon-pulse">500+</div>
                  <div className="text-sm text-muted-foreground">{t('teachers')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent animate-neon-pulse">1M+</div>
                  <div className="text-sm text-muted-foreground">{t('gamesPlayed')}</div>
                </div>
              </div>
            </div>

            {/* Gaming Portal Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Student Portal */}
              <Link to="/student" className="group">
                <div className="gaming-card hover:border-primary/60 group-hover:shadow-glow transition-all duration-500">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center group-hover:animate-neon-pulse">
                      <span className="text-4xl">🎮</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-4 text-primary group-hover:text-primary-light transition-colors">
                      {t('student')}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {t('studentPortalDesc')}
                    </p>
                    <div className="btn-neon-primary w-full justify-center inline-flex items-center">
                      {t('startLearning')}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Teacher Portal */}
              <Link to="/teacher" className="group">
                <div className="gaming-card hover:border-secondary/60 group-hover:shadow-glow-secondary transition-all duration-500">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center group-hover:animate-neon-pulse">
                      <span className="text-4xl">👨‍🏫</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-4 text-secondary group-hover:text-secondary-light transition-colors">
                      {t('teacher')}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {t('teacherPortalDesc')}
                    </p>
                    <div className="btn-neon-secondary w-full justify-center inline-flex items-center">
                      {t('manageLearning')}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Gaming Features */}
            <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="text-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                  <Trophy className="h-8 w-8 text-primary animate-neon-pulse" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary">{t('gamifiedLearning')}</h3>
                <p className="text-muted-foreground">{t('gamifiedLearningDesc')}</p>
              </div>
              <div className="text-center animate-slide-up" style={{ animationDelay: '0.8s' }}>
                <div className="w-16 h-16 mx-auto mb-4 bg-secondary/20 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-secondary animate-neon-pulse" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-secondary">{t('multilingualSupport')}</h3>
                <p className="text-muted-foreground">{t('multilingualSupportDesc')}</p>
              </div>
              <div className="text-center animate-slide-up" style={{ animationDelay: '1s' }}>
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
                  <Award className="h-8 w-8 text-accent animate-neon-pulse" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-accent">{t('rewardSystem')}</h3>
                <p className="text-muted-foreground">{t('rewardSystemDesc')}</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </LanguageProvider>
  );
};

export default Index;