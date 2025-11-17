import React from 'react';
import { BadgeToken, Badge } from './BadgeToken';

interface AchievementCardProps {
  badge: Badge;
  onClick?: () => void;
}

export function AchievementCard({ badge, onClick }: AchievementCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={!badge.unlocked}
      className={`p-6 bg-white border rounded-xl transition-all duration-200 text-left w-full ${
        badge.unlocked
          ? 'border-[#E2E8F0] hover:border-[#767DFF] hover:shadow-md cursor-pointer'
          : 'border-[#E2E8F0] opacity-60 cursor-not-allowed'
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <BadgeToken badge={badge} size="lg" asDiv />
        <div className="text-center">
          <h3 className="text-[16px] font-semibold text-[#1E1E1E] mb-1">{badge.name}</h3>
          <p className="text-[14px] text-[#64748B]">{badge.description}</p>
          {badge.unlocked && badge.unlockedDate && (
            <p className="text-[12px] text-[#767DFF] mt-2">Unlocked {badge.unlockedDate}</p>
          )}
        </div>
      </div>
    </button>
  );
}