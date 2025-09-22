import React from 'react';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  theme?: 'default' | 'physics' | 'chemistry' | 'biology' | 'mathematics';
  intensity?: 'low' | 'medium' | 'high';
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  children, 
  theme = 'default',
  intensity = 'medium' 
}) => {
  const getThemeElements = () => {
    switch (theme) {
      case 'physics':
        return (
          <>
            <div className="absolute top-20 left-10 w-6 h-6 text-physics text-2xl animate-float opacity-30">⚡</div>
            <div className="absolute top-40 right-20 w-8 h-8 text-physics text-3xl animate-float opacity-40" style={{ animationDelay: '0.5s' }}>🔬</div>
            <div className="absolute bottom-40 left-20 w-5 h-5 text-physics text-xl animate-float opacity-35" style={{ animationDelay: '1s' }}>⚛️</div>
            <div className="absolute bottom-20 right-40 w-4 h-4 text-physics text-lg animate-float opacity-25" style={{ animationDelay: '1.5s' }}>🌊</div>
            <div className="absolute top-1/2 left-1/4 w-12 h-12 border-2 border-physics/30 rounded-full animate-glow-rotate opacity-20"></div>
            <div className="absolute top-1/3 right-1/3 w-8 h-8 border-2 border-physics/25 rounded-full animate-glow-rotate opacity-15" style={{ animationDelay: '2s' }}></div>
          </>
        );
      case 'chemistry':
        return (
          <>
            <div className="absolute top-20 left-10 w-6 h-6 text-chemistry text-2xl animate-float opacity-30">🧪</div>
            <div className="absolute top-40 right-20 w-8 h-8 text-chemistry text-3xl animate-float opacity-40" style={{ animationDelay: '0.5s' }}>⚗️</div>
            <div className="absolute bottom-40 left-20 w-5 h-5 text-chemistry text-xl animate-float opacity-35" style={{ animationDelay: '1s' }}>🔬</div>
            <div className="absolute bottom-20 right-40 w-4 h-4 text-chemistry text-lg animate-float opacity-25" style={{ animationDelay: '1.5s' }}>💊</div>
            <div className="absolute top-1/3 right-1/3 w-10 h-10 border-2 border-chemistry/30 rounded-full animate-glow-rotate opacity-25" style={{ animationDelay: '2s' }}></div>
          </>
        );
      case 'biology':
        return (
          <>
            <div className="absolute top-20 left-10 w-6 h-6 text-biology text-2xl animate-float opacity-30">🌱</div>
            <div className="absolute top-40 right-20 w-8 h-8 text-biology text-3xl animate-float opacity-40" style={{ animationDelay: '0.5s' }}>🦋</div>
            <div className="absolute bottom-40 left-20 w-5 h-5 text-biology text-xl animate-float opacity-35" style={{ animationDelay: '1s' }}>🍃</div>
            <div className="absolute bottom-20 right-40 w-4 h-4 text-biology text-lg animate-float opacity-25" style={{ animationDelay: '1.5s' }}>🐛</div>
            <div className="absolute top-60 left-1/3 w-6 h-6 text-biology text-xl animate-float opacity-20" style={{ animationDelay: '2.5s' }}>🌸</div>
          </>
        );
      case 'mathematics':
        return (
          <>
            <div className="absolute top-20 left-10 w-6 h-6 text-mathematics text-2xl animate-float opacity-30">➕</div>
            <div className="absolute top-40 right-20 w-8 h-8 text-mathematics text-3xl animate-float opacity-40" style={{ animationDelay: '0.5s' }}>➖</div>
            <div className="absolute bottom-40 left-20 w-5 h-5 text-mathematics text-xl animate-float opacity-35" style={{ animationDelay: '1s' }}>✖️</div>
            <div className="absolute bottom-20 right-40 w-4 h-4 text-mathematics text-lg animate-float opacity-25" style={{ animationDelay: '1.5s' }}>➗</div>
            <div className="absolute top-1/2 right-1/4 w-8 h-8 border-2 border-mathematics/30 rounded-full animate-glow-rotate opacity-20" style={{ animationDelay: '3s' }}></div>
            <div className="absolute top-60 left-1/3 w-6 h-6 text-mathematics text-2xl animate-float opacity-25" style={{ animationDelay: '2s' }}>π</div>
          </>
        );
      default:
        return (
          <>
            <div className="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full animate-float opacity-30"></div>
            <div className="absolute top-40 right-20 w-6 h-6 bg-secondary rounded-full animate-float opacity-40" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-40 left-20 w-5 h-5 bg-accent rounded-full animate-float opacity-35" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-20 right-40 w-3 h-3 bg-primary rounded-full animate-float opacity-25" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute top-1/2 left-1/4 w-8 h-8 border-2 border-secondary/30 rounded-full animate-glow-rotate opacity-20"></div>
            <div className="absolute top-1/3 right-1/3 w-6 h-6 border-2 border-accent/30 rounded-full animate-glow-rotate opacity-25" style={{ animationDelay: '2s' }}></div>
          </>
        );
    }
  };

  const getIntensityClass = () => {
    switch (intensity) {
      case 'low': return 'opacity-20';
      case 'high': return 'opacity-60';
      default: return 'opacity-40';
    }
  };

  return (
    <div className="min-h-screen bg-animated-gradient relative overflow-hidden">
      {/* Enhanced animated elements */}
      <div className={`absolute inset-0 z-0 ${getIntensityClass()}`}>
        {getThemeElements()}
        
        {/* Additional gaming particles */}
        <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-accent rounded-full animate-sparkle opacity-60"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-primary rounded-full animate-sparkle opacity-50" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-secondary rounded-full animate-sparkle opacity-40" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating neon lines */}
        <div className="absolute top-1/4 right-10 w-1 h-20 bg-gradient-to-b from-primary/30 to-transparent animate-float" style={{ animationDelay: '0.8s' }}></div>
        <div className="absolute bottom-1/4 left-10 w-1 h-16 bg-gradient-to-t from-secondary/30 to-transparent animate-float" style={{ animationDelay: '1.8s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Enhanced overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30 pointer-events-none z-5"></div>
    </div>
  );
};

export default AnimatedBackground;