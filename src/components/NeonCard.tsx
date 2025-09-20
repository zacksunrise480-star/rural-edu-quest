import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface NeonCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'primary' | 'secondary' | 'accent' | 'physics' | 'chemistry' | 'biology' | 'mathematics';
  animated?: boolean;
  onClick?: () => void;
}

const NeonCard: React.FC<NeonCardProps> = ({ 
  children, 
  className, 
  glowColor = 'primary', 
  animated = true,
  onClick 
}) => {
  const glowClasses = {
    primary: 'border-primary/50 hover:border-primary hover:shadow-glow',
    secondary: 'border-secondary/50 hover:border-secondary hover:shadow-glow-secondary',
    accent: 'border-accent/50 hover:border-accent hover:shadow-glow-accent',
    physics: 'border-physics/50 hover:border-physics hover:shadow-[0_0_30px_hsl(var(--physics)/0.4)]',
    chemistry: 'border-chemistry/50 hover:border-chemistry hover:shadow-[0_0_30px_hsl(var(--chemistry)/0.4)]',
    biology: 'border-biology/50 hover:border-biology hover:shadow-[0_0_30px_hsl(var(--biology)/0.4)]',
    mathematics: 'border-mathematics/50 hover:border-mathematics hover:shadow-[0_0_30px_hsl(var(--mathematics)/0.4)]',
  };

  return (
    <Card 
      className={cn(
        'gaming-card border-2 bg-card/80 backdrop-blur-sm transition-all duration-300',
        glowClasses[glowColor],
        animated && 'hover:scale-105 hover:-translate-y-2',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </Card>
  );
};

export default NeonCard;