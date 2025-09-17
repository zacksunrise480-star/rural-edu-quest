import React from 'react';

interface AnimatedBackgroundProps {
  theme?: 'default' | 'mathematics' | 'physics' | 'chemistry' | 'biology';
  children: React.ReactNode;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ theme = 'default', children }) => {
  const getFloatingElements = () => {
    switch (theme) {
      case 'mathematics':
        return (
          <>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-10 left-10 text-white/10 text-4xl animate-bounce-gentle" style={{ animationDelay: '0s' }}>π</div>
              <div className="absolute top-32 right-20 text-white/10 text-3xl animate-bounce-gentle" style={{ animationDelay: '0.5s' }}>∑</div>
              <div className="absolute bottom-32 left-20 text-white/10 text-5xl animate-bounce-gentle" style={{ animationDelay: '1s' }}>∞</div>
              <div className="absolute top-60 left-1/3 text-white/10 text-2xl animate-bounce-gentle" style={{ animationDelay: '1.5s' }}>√</div>
              <div className="absolute bottom-20 right-1/3 text-white/10 text-4xl animate-bounce-gentle" style={{ animationDelay: '2s' }}>∫</div>
            </div>
          </>
        );
      case 'physics':
        return (
          <>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-10 left-10 text-white/10 text-3xl animate-pulse-glow" style={{ animationDelay: '0s' }}>⚡</div>
              <div className="absolute top-32 right-20 text-white/10 text-2xl animate-pulse-glow" style={{ animationDelay: '0.7s' }}>🔬</div>
              <div className="absolute bottom-32 left-20 text-white/10 text-4xl animate-pulse-glow" style={{ animationDelay: '1.4s' }}>⚛️</div>
              <div className="absolute top-60 left-1/3 text-white/10 text-3xl animate-pulse-glow" style={{ animationDelay: '2.1s' }}>🌊</div>
              <div className="absolute bottom-20 right-1/3 text-white/10 text-2xl animate-pulse-glow" style={{ animationDelay: '2.8s' }}>🔭</div>
            </div>
          </>
        );
      case 'chemistry':
        return (
          <>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-10 left-10 text-white/10 text-3xl animate-bounce-gentle" style={{ animationDelay: '0s' }}>🧪</div>
              <div className="absolute top-32 right-20 text-white/10 text-2xl animate-bounce-gentle" style={{ animationDelay: '0.6s' }}>⚗️</div>
              <div className="absolute bottom-32 left-20 text-white/10 text-4xl animate-bounce-gentle" style={{ animationDelay: '1.2s' }}>🔬</div>
              <div className="absolute top-60 left-1/3 text-white/10 text-3xl animate-bounce-gentle" style={{ animationDelay: '1.8s' }}>💊</div>
              <div className="absolute bottom-20 right-1/3 text-white/10 text-2xl animate-bounce-gentle" style={{ animationDelay: '2.4s' }}>🌡️</div>
            </div>
          </>
        );
      case 'biology':
        return (
          <>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-10 left-10 text-white/10 text-3xl animate-slide-up" style={{ animationDelay: '0s' }}>🌱</div>
              <div className="absolute top-32 right-20 text-white/10 text-2xl animate-slide-up" style={{ animationDelay: '0.8s' }}>🦋</div>
              <div className="absolute bottom-32 left-20 text-white/10 text-4xl animate-slide-up" style={{ animationDelay: '1.6s' }}>🌿</div>
              <div className="absolute top-60 left-1/3 text-white/10 text-3xl animate-slide-up" style={{ animationDelay: '2.4s' }}>🐛</div>
              <div className="absolute bottom-20 right-1/3 text-white/10 text-2xl animate-slide-up" style={{ animationDelay: '3.2s' }}>🌸</div>
            </div>
          </>
        );
      default:
        return (
          <>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-10 left-10 w-2 h-2 bg-white/20 rounded-full animate-bounce-gentle" style={{ animationDelay: '0s' }}></div>
              <div className="absolute top-32 right-20 w-3 h-3 bg-white/15 rounded-full animate-bounce-gentle" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-32 left-20 w-4 h-4 bg-white/10 rounded-full animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-60 left-1/3 w-2 h-2 bg-white/25 rounded-full animate-bounce-gentle" style={{ animationDelay: '1.5s' }}></div>
              <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-white/20 rounded-full animate-bounce-gentle" style={{ animationDelay: '2s' }}></div>
              <div className="absolute top-20 right-10 w-1 h-1 bg-white/30 rounded-full animate-pulse-glow" style={{ animationDelay: '0.2s' }}></div>
              <div className="absolute bottom-60 left-10 w-2 h-2 bg-white/15 rounded-full animate-pulse-glow" style={{ animationDelay: '0.8s' }}></div>
              <div className="absolute top-80 right-1/4 w-1 h-1 bg-white/25 rounded-full animate-pulse-glow" style={{ animationDelay: '1.3s' }}></div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-hero">
      {getFloatingElements()}
      {children}
    </div>
  );
};

export default AnimatedBackground;