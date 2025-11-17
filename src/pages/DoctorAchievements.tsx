import React, { useState } from 'react';
import { AchievementCard } from '../components/AchievementCard';
import { Badge } from '../components/BadgeToken';
import { badges } from '../lib/doctorMockData';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Calendar, FileCheck, Info } from 'lucide-react';

export default function DoctorAchievements() {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleBadgeClick = (badge: Badge) => {
    if (!badge.unlocked) return;
    setSelectedBadge(badge);
    setSheetOpen(true);
  };

  const groupedBadges = {
    core: badges.filter(b => b.category === 'core'),
    contribution: badges.filter(b => b.category === 'contribution'),
    compliance: badges.filter(b => b.category === 'compliance'),
  };

  const unlockedCount = badges.filter(b => b.unlocked).length;

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="max-w-[960px] mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[28px] font-semibold text-[#1E1E1E] mb-2">
            Achievements
          </h1>
          <p className="text-[16px] text-[#64748B]">
            {unlockedCount} of {badges.length} badges unlocked
          </p>
        </div>

        {/* Core Badges */}
        <div className="mb-8">
          <h2 className="text-[18px] font-semibold text-[#1E1E1E] mb-4">Core Milestones</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {groupedBadges.core.map(badge => (
              <AchievementCard
                key={badge.id}
                badge={badge}
                onClick={() => handleBadgeClick(badge)}
              />
            ))}
          </div>
        </div>

        {/* Contribution Badges */}
        <div className="mb-8">
          <h2 className="text-[18px] font-semibold text-[#1E1E1E] mb-4">Contribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {groupedBadges.contribution.map(badge => (
              <AchievementCard
                key={badge.id}
                badge={badge}
                onClick={() => handleBadgeClick(badge)}
              />
            ))}
          </div>
        </div>

        {/* Compliance Badges */}
        <div className="mb-8">
          <h2 className="text-[18px] font-semibold text-[#1E1E1E] mb-4">Compliance Excellence</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {groupedBadges.compliance.map(badge => (
              <AchievementCard
                key={badge.id}
                badge={badge}
                onClick={() => handleBadgeClick(badge)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Badge Detail Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          {selectedBadge && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedBadge.name}</SheetTitle>
              </SheetHeader>

              <Tabs defaultValue="overview" className="mt-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="proof">Proof</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6 mt-6">
                  <div className="flex flex-col items-center gap-4 p-6 bg-[#F7F9FC] rounded-lg">
                    <div className="w-24 h-24 rounded-full bg-[#767DFF] flex items-center justify-center">
                      <Info className="w-12 h-12 text-white" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-[18px] font-semibold text-[#1E1E1E] mb-2">
                        {selectedBadge.name}
                      </h3>
                      <p className="text-[14px] text-[#64748B]">
                        {selectedBadge.description}
                      </p>
                    </div>
                  </div>

                  {selectedBadge.unlocked && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-white border border-[#E2E8F0] rounded-lg">
                        <Calendar className="w-5 h-5 text-[#767DFF]" />
                        <div>
                          <div className="text-[12px] text-[#64748B]">Unlocked on</div>
                          <div className="text-[14px] font-medium text-[#1E1E1E]">
                            {selectedBadge.unlockedDate}
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-[#E8EBFF] border border-[#767DFF] rounded-lg">
                        <p className="text-[14px] text-[#1E1E1E]">
                          <strong>Achievement unlocked!</strong> You've successfully completed the requirements for this badge.
                        </p>
                      </div>
                    </div>
                  )}

                  {!selectedBadge.unlocked && (
                    <div className="p-4 bg-[#FEF3C7] border border-[#F59E0B] rounded-lg">
                      <p className="text-[14px] text-[#92400E]">
                        <strong>Locked:</strong> Complete the requirements to unlock this achievement.
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="proof" className="space-y-4 mt-6">
                  {selectedBadge.unlocked ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-4 bg-white border border-[#E2E8F0] rounded-lg">
                        <FileCheck className="w-5 h-5 text-[#16A34A]" />
                        <div className="flex-1">
                          <div className="text-[14px] font-medium text-[#1E1E1E]">
                            Achievement Certificate
                          </div>
                          <div className="text-[12px] text-[#64748B]">
                            Generated on {selectedBadge.unlockedDate}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-[#64748B]">
                      <FileCheck className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p className="text-[14px]">Proof will be available once unlocked</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="notes" className="mt-6">
                  <div className="p-4 bg-[#F7F9FC] border border-[#E2E8F0] rounded-lg">
                    <p className="text-[14px] text-[#64748B]">
                      Add personal notes about this achievement...
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
