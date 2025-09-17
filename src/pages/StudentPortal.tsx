import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, User, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import AnimatedBackground from "@/components/AnimatedBackground";
import LanguageSelector from "@/components/LanguageSelector";

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
        <Card className="p-12 border-0 bg-white/10 backdrop-blur-sm text-center mb-8">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <User className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">{t('studentPortalTitle')}</h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            {t('studentPortalWelcome')}
          </p>

          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-2 text-white/70">
              <BookOpen className="w-5 h-5" />
              <span>{t('chooseSubjects')}</span>
            </div>

            <Link to="/student/name">
              <Button className="btn-hero text-lg px-12 py-4 hover:scale-105 transition-all duration-300">
                {t('letsGetStarted')}
              </Button>
            </Link>
          </div>
        </Card>

        {/* Quick Info */}
        <div className="grid md:grid-cols-3 gap-6 text-center text-white">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-glow">
            <h3 className="font-semibold mb-2">{t('interactiveGames')}</h3>
            <p className="text-sm text-white/70">{t('interactiveGamesDesc')}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-glow">
            <h3 className="font-semibold mb-2">{t('videoLessons')}</h3>
            <p className="text-sm text-white/70">{t('videoLessonsDesc')}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-glow">
            <h3 className="font-semibold mb-2">{t('earnRewards')}</h3>
            <p className="text-sm text-white/70">{t('earnRewardsDesc')}</p>
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default StudentPortal;