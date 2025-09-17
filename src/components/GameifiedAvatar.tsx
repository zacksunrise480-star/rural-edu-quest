import React from 'react';

interface GameifiedAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

const GameifiedAvatar: React.FC<GameifiedAvatarProps> = ({ name, size = 'md', animate = true }) => {
  // Generate consistent avatar based on name
  const avatars = ['👦', '👧', '🧒', '👶', '🧑', '👨', '👩', '🧓', '👴', '👵', '🦸‍♂️', '🦸‍♀️', '🧚‍♂️', '🧚‍♀️', '🧙‍♂️', '🧙‍♀️'];
  const colors = ['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-purple-400', 'bg-pink-400', 'bg-indigo-400', 'bg-orange-400'];
  
  const avatarIndex = name ? name.charCodeAt(0) % avatars.length : 0;
  const colorIndex = name ? name.length % colors.length : 0;
  
  const sizeClasses = {
    sm: 'w-8 h-8 text-lg',
    md: 'w-12 h-12 text-2xl', 
    lg: 'w-20 h-20 text-4xl'
  };

  return (
    <div className={`
      ${sizeClasses[size]} 
      ${colors[colorIndex]} 
      rounded-full 
      flex items-center justify-center 
      shadow-lg 
      border-2 border-white/30
      ${animate ? 'hover:scale-110 hover:shadow-glow transition-all duration-300' : ''}
    `}>
      <span className="animate-bounce-gentle">
        {avatars[avatarIndex]}
      </span>
    </div>
  );
};

export default GameifiedAvatar;