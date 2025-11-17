import React from 'react';
import { Lock, Award, TrendingUp, Target, Users, CheckCircle, Shield, FileCheck } from 'lucide-react';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
  category: 'core' | 'contribution' | 'compliance';
}

const iconMap: Record<string, any> = {
  'council-ready': CheckCircle,
  'first-10': TrendingUp,
  'halfway': Target,
  'full-cycle': Award,
  'speaker': Users,
  'mentor': Users,
  'evidence-pro': FileCheck,
  'rmc-seal': Shield,
};

interface BadgeTokenProps {
  badge: Badge;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  asDiv?: boolean; // Render as div instead of button to avoid nesting issues
}

export function BadgeToken({ badge, size = 'md', onClick, asDiv = false }: BadgeTokenProps) {
  const Icon = iconMap[badge.icon] || Award;
  
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  };

  const iconSizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-9 h-9',
  };

  const className = `${sizeClasses[size]} rounded-full flex items-center justify-center transition-all duration-200 ${
    badge.unlocked
      ? 'bg-[#767DFF] text-white hover:scale-105 hover:shadow-lg cursor-pointer'
      : 'bg-[#E2E8F0] text-[#64748B] opacity-50 cursor-not-allowed'
  }`;

  const content = (
    <>
      {badge.unlocked ? (
        <Icon className={iconSizeClasses[size]} />
      ) : (
        <Lock className={iconSizeClasses[size]} />
      )}
    </>
  );

  if (asDiv) {
    return (
      <div className={className} title={badge.name}>
        {content}
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={!badge.unlocked}
      className={className}
      title={badge.name}
    >
      {content}
    </button>
  );
}