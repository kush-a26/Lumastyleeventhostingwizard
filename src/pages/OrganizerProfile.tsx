import React from 'react';
import { Button } from '../components/ui/button';
import { Chip } from '../components/Chip';
import { Calendar, Users, Award, TrendingUp } from 'lucide-react';
import { mockEvents } from '../lib/mockData';

export default function OrganizerProfile() {
  // Filter events by current organizer (in a real app, this would be based on user ID)
  const organizerEvents = mockEvents.filter(event => 
    ['Dr. Rajesh Kumar', 'Dr. Priya Singh', 'Dr. Suresh Menon'].includes(event.organizer.name)
  );

  const stats = {
    totalEvents: organizerEvents.length,
    totalAttendees: organizerEvents.reduce((sum, e) => sum + (150 - (e.seatsLeft || 0)), 0),
    totalCreditsIssued: organizerEvents.reduce((sum, e) => sum + (e.estimatedCredits || 0), 0),
    upcomingEvents: organizerEvents.filter(e => new Date(e.date) > new Date()).length,
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="max-w-[960px] mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[28px] font-semibold text-[#1E1E1E] mb-2">
            Organizer Profile
          </h1>
          <p className="text-[16px] text-[#64748B]">
            Your event hosting history and stats
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#E8EBFF] flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#767DFF]" />
              </div>
            </div>
            <div className="text-[28px] font-semibold text-[#1E1E1E] mb-1">
              {stats.totalEvents}
            </div>
            <div className="text-[14px] text-[#64748B]">Total Events</div>
          </div>

          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#E8FFF3] flex items-center justify-center">
                <Users className="w-5 h-5 text-[#16A34A]" />
              </div>
            </div>
            <div className="text-[28px] font-semibold text-[#1E1E1E] mb-1">
              {stats.totalAttendees}
            </div>
            <div className="text-[14px] text-[#64748B]">Total Attendees</div>
          </div>

          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#FEF3C7] flex items-center justify-center">
                <Award className="w-5 h-5 text-[#F59E0B]" />
              </div>
            </div>
            <div className="text-[28px] font-semibold text-[#1E1E1E] mb-1">
              {stats.totalCreditsIssued}
            </div>
            <div className="text-[14px] text-[#64748B]">Credits Issued</div>
          </div>

          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#E8EBFF] flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#767DFF]" />
              </div>
            </div>
            <div className="text-[28px] font-semibold text-[#1E1E1E] mb-1">
              {stats.upcomingEvents}
            </div>
            <div className="text-[14px] text-[#64748B]">Upcoming</div>
          </div>
        </div>

        {/* Event History */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#E2E8F0]">
            <h2 className="text-[18px] font-semibold text-[#1E1E1E]">Event History</h2>
          </div>

          <div className="divide-y divide-[#E2E8F0]">
            {organizerEvents.map(event => {
              const isPast = new Date(event.date) < new Date();
              const attendeeCount = 150 - (event.seatsLeft || 0);
              
              return (
                <div key={event.id} className="p-6 hover:bg-[#F7F9FC] transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-[16px] font-semibold text-[#1E1E1E]">
                          {event.title}
                        </h3>
                        {event.status && (
                          <Chip 
                            variant={
                              event.status === 'live' ? 'live' : 
                              event.status === 'new' ? 'new' : 
                              'badge'
                            }
                            className="text-xs"
                          >
                            {event.status.toUpperCase()}
                          </Chip>
                        )}
                      </div>
                      <p className="text-[14px] text-[#64748B] mb-3">{event.subtitle}</p>
                      
                      <div className="flex flex-wrap gap-4 text-[14px] text-[#64748B]">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(event.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4" />
                          <span>{isPast ? `${attendeeCount} attendees` : `${event.seatsLeft} seats left`}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Award className="w-4 h-4" />
                          <span>{event.estimatedCredits} credits</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Chip variant="outline">{event.format}</Chip>
                      <Chip variant="outline">{event.council}</Chip>
                    </div>
                  </div>

                  {event.venue && (
                    <div className="text-[14px] text-[#64748B]">
                      📍 {event.venue}, {event.city}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
