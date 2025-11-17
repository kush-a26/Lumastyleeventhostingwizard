import React, { useState } from 'react';
import { ProgressRing } from '../components/ProgressRing';
import { BadgeToken } from '../components/BadgeToken';
import { NextActionChip } from '../components/NextActionChip';
import { ChevronRow } from '../components/ChevronRow';
import { CertificateQuickView, Certificate } from '../components/CertificateQuickView';
import { Button } from '../components/ui/button';
import { Chip } from '../components/Chip';
import { Eye, ExternalLink, ArrowRight } from 'lucide-react';
import { doctorProfile, badges, recentCertificates, creditsBreakdown } from '../lib/doctorMockData';

interface DoctorHomeProps {
  onSwitchToOrganizer: () => void;
  onNavigateToAchievements: () => void;
}

export default function DoctorHome({ onSwitchToOrganizer, onNavigateToAchievements }: DoctorHomeProps) {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [showQuickView, setShowQuickView] = useState(false);

  const handleCertificateClick = (cert: Certificate) => {
    setSelectedCertificate(cert);
    setShowQuickView(true);
  };

  const unlockedBadges = badges.filter(b => b.unlocked).slice(0, 4);
  const nextBadge = badges.find(b => !b.unlocked);

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="max-w-[960px] mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[28px] font-semibold text-[#1E1E1E] mb-2">
            Your CME, at a glance.
          </h1>
          <p className="text-[16px] text-[#64748B]">
            Nice pace—11.5 hrs to go.
          </p>
        </div>

        {/* Hero Card - Credits Overview */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* Progress Ring */}
            <div className="flex-shrink-0">
              <ProgressRing
                current={doctorProfile.credits.current}
                total={doctorProfile.credits.total}
                size={120}
                strokeWidth={10}
              />
              <div className="text-center mt-3">
                <p className="text-[14px] text-[#64748B]">Cycle {doctorProfile.credits.cycle}</p>
                <p className="text-[12px] text-[#64748B]">
                  {doctorProfile.credits.daysToRenewal} days to renewal
                </p>
              </div>
            </div>

            {/* Right Stack - Next Actions */}
            <div className="flex-1">
              <div className="mb-4">
                <h3 className="text-[18px] font-semibold text-[#1E1E1E] mb-1">
                  You're 11.5 hrs away
                </h3>
                <p className="text-[14px] text-[#64748B]">
                  On track to complete by {new Date(Date.now() + 225 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-[14px] font-medium text-[#1E1E1E] mb-3">Next Actions</p>
                <div className="flex flex-wrap gap-2">
                  {doctorProfile.nextActions.map((action, idx) => (
                    <NextActionChip key={idx} text={action} />
                  ))}
                </div>
              </div>

              <Button
                variant="link"
                className="text-[#767DFF] p-0 h-auto hover:text-[#6571E8]"
              >
                View all credits
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Credits Snapshot - Detail on Demand */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] mb-6 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#E2E8F0]">
            <h2 className="text-[18px] font-semibold text-[#1E1E1E]">Credits Snapshot</h2>
          </div>

          <ChevronRow title="This month" subtitle="3.0 hrs added">
            <div className="space-y-2">
              {creditsBreakdown.thisMonth.events.map((event, idx) => (
                <div key={idx} className="flex justify-between items-center py-2">
                  <span className="text-[14px] text-[#1E1E1E]">{event.title}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-medium text-[#767DFF]">
                      {event.hours} hrs
                    </span>
                    <span className="text-[12px] text-[#64748B]">{event.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </ChevronRow>

          <ChevronRow title="By council" subtitle="DMC 14.5 • RMC 4.0">
            <div className="space-y-3">
              {creditsBreakdown.byCouncil.map((council, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[14px] text-[#1E1E1E]">{council.name}</span>
                    <span className="text-[14px] font-medium text-[#1E1E1E]">
                      {council.hours} hrs
                    </span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(council.hours / doctorProfile.credits.total) * 100}%`,
                        backgroundColor: council.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ChevronRow>

          <ChevronRow title="By specialty" subtitle="4 specialties">
            <div className="flex flex-wrap gap-2">
              {creditsBreakdown.bySpecialty.map((specialty, idx) => (
                <Chip key={idx} variant="secondary">
                  {specialty.name} {specialty.hours}
                </Chip>
              ))}
            </div>
          </ChevronRow>
        </div>

        {/* Badges Teaser */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-semibold text-[#1E1E1E]">Achievements</h2>
            <Button
              variant="link"
              className="text-[#767DFF] p-0 h-auto hover:text-[#6571E8]"
              onClick={onNavigateToAchievements}
            >
              See all badges
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="flex items-center gap-4">
            {unlockedBadges.map(badge => (
              <BadgeToken key={badge.id} badge={badge} size="md" />
            ))}
            {nextBadge && (
              <BadgeToken key={nextBadge.id} badge={nextBadge} size="md" />
            )}
          </div>
        </div>

        {/* Recent Certificates */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#E2E8F0]">
            <h2 className="text-[18px] font-semibold text-[#1E1E1E]">Recent Certificates</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F7F9FC]">
                <tr>
                  <th className="px-6 py-3 text-left text-[12px] font-medium text-[#64748B] uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] font-medium text-[#64748B] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] font-medium text-[#64748B] uppercase tracking-wider">
                    Council
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] font-medium text-[#64748B] uppercase tracking-wider">
                    Hours
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] font-medium text-[#64748B] uppercase tracking-wider">
                    
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {recentCertificates.map(cert => (
                  <tr key={cert.id} className="hover:bg-[#F7F9FC] transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-[14px] text-[#1E1E1E]">{cert.eventTitle}</div>
                      {cert.status === 'pending' && (
                        <div className="text-[12px] text-[#F59E0B] mt-1">RMC Ref pending</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-[14px] text-[#64748B]">{cert.date}</td>
                    <td className="px-6 py-4">
                      <Chip variant="outline">{cert.council}</Chip>
                    </td>
                    <td className="px-6 py-4 text-[14px] font-medium text-[#1E1E1E]">
                      {cert.hours} hrs
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleCertificateClick(cert)}
                        className="text-[#767DFF] hover:text-[#6571E8] transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="mt-8 flex justify-center">
          <Button
            onClick={onSwitchToOrganizer}
            className="bg-[#767DFF] hover:bg-[#6571E8] text-white px-8"
          >
            Host a CME
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      <CertificateQuickView
        certificate={selectedCertificate}
        open={showQuickView}
        onOpenChange={setShowQuickView}
      />
    </div>
  );
}