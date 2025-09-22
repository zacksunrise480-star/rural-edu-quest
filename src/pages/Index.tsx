import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, Users, Award, ArrowRight, Star, Zap, Gamepad2, Brain } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";
import FloatingParticles from "@/components/FloatingParticles";

const Index = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-animated-gradient text-foreground relative overflow-hidden">
      <FloatingParticles />
      
      <div className="relative z-10">
        {/* Gaming Header */}
        <header className="container mx-auto px-6 pt-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center animate-glow-rotate shadow-glow">
                <span className="text-3xl font-bold text-background title-gaming">R</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary title-gaming animate-neon-pulse">RUED</h1>
                <p className="text-sm text-muted-foreground">{t('gameTitle')}</p>
              </div>
            </div>
            <LanguageSelector />
          </div>
        </header>

        {/* Hero Section */}
        <main className="container mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-gradient-gaming animate-slide-up title-gaming">
              {t('welcome')}
            </h1>
            <p className="text-2xl text-primary mb-4 animate-slide-up title-futuristic" style={{ animationDelay: '0.1s' }}>
              {t('tagline')}
            </p>
            <p className="text-xl text-muted-foreground mb-8 animate-slide-up max-w-4xl mx-auto" style={{ animationDelay: '0.2s' }}>
              {t('heroSubtitle')}
            </p>
            
            {/* Gaming Achievement Stats */}
            <div className="flex justify-center space-x-8 mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary animate-neon-pulse title-futuristic">10K+</div>
                <div className="text-sm text-muted-foreground">{t('students')}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary animate-neon-pulse title-futuristic">500+</div>
                <div className="text-sm text-muted-foreground">{t('teachers')}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent animate-neon-pulse title-futuristic">1M+</div>
                <div className="text-sm text-muted-foreground">{t('gamesPlayed')}</div>
              </div>
            </div>
          </div>

          {/* Gaming Portal Cards */}
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-20">
            {/* Student Portal */}
            <Link to="/student" className="group">
              <Card className="gaming-card hover:border-primary/60 group-hover:shadow-glow transition-all duration-500 p-12">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center group-hover:animate-glow-rotate shadow-glow">
                    <Gamepad2 className="w-16 h-16 text-background" />
                  </div>
                  <h2 className="text-4xl font-bold mb-6 text-primary group-hover:text-primary-light transition-colors title-futuristic">
                    {t('student')}
                  </h2>
                  <p className="text-muted-foreground mb-8 text-lg">
                    {t('studentPortalDesc')}
                  </p>
                  <Button variant="hero" className="w-full text-xl py-4">
                    {t('startLearning')}
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </div>
              </Card>
            </Link>

            {/* Teacher Portal */}
            <Link to="/teacher" className="group">
              <Card className="gaming-card hover:border-secondary/60 group-hover:shadow-glow-secondary transition-all duration-500 p-12">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center group-hover:animate-glow-rotate shadow-glow-secondary">
                    <Users className="w-16 h-16 text-background" />
                  </div>
                  <h2 className="text-4xl font-bold mb-6 text-secondary group-hover:text-secondary-light transition-colors title-futuristic">
                    {t('teacher')}
                  </h2>
                  <p className="text-muted-foreground mb-8 text-lg">
                    {t('teacherPortalDesc')}
                  </p>
                  <Button variant="neon" className="w-full text-xl py-4 border-secondary text-secondary hover:bg-secondary">
                    {t('manageLearning')}
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </div>
              </Card>
            </Link>
          </div>

          {/* Gaming Features */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="gaming-card text-center p-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <div className="w-20 h-20 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                <Trophy className="h-10 w-10 text-primary animate-neon-pulse" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary title-futuristic">{t('gamifiedLearning')}</h3>
              <p className="text-muted-foreground">{t('gamifiedLearningDesc')}</p>
            </Card>
            
            <Card className="gaming-card text-center p-8 animate-slide-up" style={{ animationDelay: '0.8s' }}>
              <div className="w-20 h-20 mx-auto mb-6 bg-secondary/20 rounded-full flex items-center justify-center">
                <Brain className="h-10 w-10 text-secondary animate-neon-pulse" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-secondary title-futuristic">{t('multilingualSupport')}</h3>
              <p className="text-muted-foreground">{t('multilingualSupportDesc')}</p>
            </Card>
            
            <Card className="gaming-card text-center p-8 animate-slide-up" style={{ animationDelay: '1s' }}>
              <div className="w-20 h-20 mx-auto mb-6 bg-accent/20 rounded-full flex items-center justify-center">
                <Award className="h-10 w-10 text-accent animate-neon-pulse" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-accent title-futuristic">{t('rewardSystem')}</h3>
              <p className="text-muted-foreground">{t('rewardSystemDesc')}</p>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;