import React, { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  velocityX: number;
  velocityY: number;
  rotationSpeed: number;
}

interface ConfettiEffectProps {
  active: boolean;
  duration?: number;
}

const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ active, duration = 3000 }) => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (active) {
      setIsActive(true);
      
      const colors = [
        '#00FFFF', // Cyan
        '#FF00FF', // Magenta
        '#00FF00', // Green
        '#FFFF00', // Yellow
        '#FF6B6B', // Red
        '#4ECDC4', // Teal
        '#45B7D1', // Blue
        '#96CEB4', // Light Green
      ];

      const pieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        velocityX: (Math.random() - 0.5) * 10,
        velocityY: Math.random() * 5 + 2,
        rotationSpeed: (Math.random() - 0.5) * 10,
      }));

      setConfetti(pieces);

      const animateConfetti = () => {
        setConfetti(prev => prev.map(piece => ({
          ...piece,
          x: piece.x + piece.velocityX,
          y: piece.y + piece.velocityY,
          rotation: piece.rotation + piece.rotationSpeed,
          velocityY: piece.velocityY + 0.3, // Gravity
        })).filter(piece => piece.y < window.innerHeight + 50));
      };

      const interval = setInterval(animateConfetti, 16);
      
      setTimeout(() => {
        setIsActive(false);
        clearInterval(interval);
        setConfetti([]);
      }, duration);

      return () => clearInterval(interval);
    }
  }, [active, duration]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map(piece => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}px`,
            top: `${piece.y}px`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiEffect;