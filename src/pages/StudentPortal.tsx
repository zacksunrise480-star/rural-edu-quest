import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, User, BookOpen, Gamepad2, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import AnimatedBackground from "@/components/AnimatedBackground";
import LanguageSelector from "@/components/LanguageSelector";
import NeonCard from "@/components/NeonCard";

const StudentPortal = () => {
  const { t } = useLanguage();

  return (
    <AnimatedBackground theme="default">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link to="/" className="flex items-center text-white hover:text-white/80 transition-all duration-300 hover:scale-105">
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('backToHome')}
          </Link>
          <LanguageSelector />
        </div>

        {/* Welcome Card */}
        <NeonCard glowColor="primary" className="p-12 text-center mb-8">
          <div className="w-32 h-32 bg-gradient-to-r from-primary via-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-8 shadow-glow animate-glow-rotate">
            <User className="w-16 h-16 text-white drop-shadow-lg" />
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-6 text-gradient-primary">{t('studentPortalTitle')}</h1>
          <p className="text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('studentPortalWelcome')}
          </p>

          <div className="space-y-8">
            <div className="flex items-center justify-center space-x-3 text-white/80 text-lg">
              <BookOpen className="w-6 h-6 animate-float" />
              <span>{t('chooseSubjects')}</span>
            </div>

            <Link to="/student/name">
              <Button variant="hero" className="text-xl px-16 py-6 shadow-glow">
                <Star className="w-6 h-6 mr-3" />
                {t('letsGetStarted')}
              </Button>
            </Link>
          </div>
        </NeonCard>

        {/* Quick Info */}
        <div className="grid md:grid-cols-3 gap-8 text-center text-white">
          <NeonCard glowColor="primary" className="p-8">
            <Gamepad2 className="w-12 h-12 text-primary mx-auto mb-4 animate-float" />
            <h3 className="text-xl font-bold mb-3 text-gradient-primary">{t('interactiveGames')}</h3>
            <p className="text-white/80 text-lg">{t('interactiveGamesDesc')}</p>
          </NeonCard>
          
          <NeonCard glowColor="secondary" className="p-8">
            <BookOpen className="w-12 h-12 text-secondary mx-auto mb-4 animate-float" style={{animationDelay: '0.2s'}} />
            <h3 className="text-xl font-bold mb-3 text-gradient-primary">{t('videoLessons')}</h3>
            <p className="text-white/80 text-lg">{t('videoLessonsDesc')}</p>
          </NeonCard>
          
          <NeonCard glowColor="accent" className="p-8">
            <ArrowLeft className="w-12 h-12 text-accent mx-auto mb-4 animate-float" style={{animationDelay: '0.4s'}} />
            <h3 className="text-xl font-bold mb-3 text-gradient-primary">{t('earnRewards')}</h3>
            <p className="text-white/80 text-lg">{t('earnRewardsDesc')}</p>
          </NeonCard>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default StudentPortal;