import React from 'react';
import { Chip } from './Chip';
import { Calendar, MapPin, Share2, Award, Sparkles } from 'lucide-react';

interface EventPreviewProps {
  eventData: {
    title: string;
    subtitle: string;
    date: string;
    startTime: string;
    endTime: string;
    format: string;
    location: string;
    city: string;
    coverImage: string | null;
    organizer: { name: string; avatar: string };
    agenda: Array<{ id: string; startTime: string; title: string; speaker: string; duration: number }>;
    faculty: Array<{ id: string; name: string; role: string; affiliation: string; avatar?: string }>;
    description: string;
    streamingLink: string;
    council: string;
    estimatedCredits: number;
    autoPoster?: boolean;
  };
  onAutoGeneratePoster?: () => void;
}

export function EventPreview({ eventData, onAutoGeneratePoster }: EventPreviewProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'TBD';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const defaultCover = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop';

  return (
    <div className="h-full overflow-y-auto bg-[var(--bg)]">
      {/* Preview Label */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-[var(--stroke)] px-6 py-3 z-10">
        <p className="text-sm text-[var(--muted)]">Live Preview</p>
      </div>

      {/* Hero Section */}
      <div className="relative h-80 overflow-hidden">
        <img 
          src={eventData.coverImage || defaultCover}
          alt={eventData.title || 'Event cover'}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          <div className="flex items-start justify-between">
            <Chip variant="pill" className="backdrop-blur-md text-sm">
              <Calendar className="w-4 h-4 mr-1.5" />
              {eventData.date ? formatDate(eventData.date) : 'Date TBD'}
            </Chip>
            {eventData.format && (
              <Chip variant="format" className="bg-white/95 backdrop-blur-sm">
                {eventData.format}
              </Chip>
            )}
          </div>

          <div className="text-white">
            <h1 className="mb-2 text-white drop-shadow-lg">
              {eventData.title || 'Untitled Event'}
            </h1>
            {eventData.subtitle && (
              <p className="text-lg text-white/90 drop-shadow-md max-w-2xl">
                {eventData.subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 px-6 py-3 bg-[var(--primary)] text-white rounded-lg cursor-default">
            Register to See Address
          </button>
          <button className="px-4 py-3 border border-[var(--stroke)] rounded-lg bg-white cursor-default">
            <Share2 className="w-5 h-5 text-[var(--muted)]" />
          </button>
          {onAutoGeneratePoster && eventData.autoPoster && (
            <button 
              onClick={onAutoGeneratePoster}
              className="px-4 py-3 border border-[var(--stroke)] rounded-lg bg-white hover:bg-[var(--bg)] transition-colors cursor-pointer group relative"
              title="Auto-generate poster"
            >
              <Sparkles className="w-5 h-5 text-[var(--primary)] group-hover:animate-pulse" />
              <span className="absolute -bottom-10 right-0 bg-[#1E1E1E] text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Generate AI Poster
              </span>
            </button>
          )}
        </div>

        {/* Event Details Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-[var(--stroke)]">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--bg)] flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-[var(--primary)]" />
              </div>
              <div>
                <p className="text-xs text-[var(--muted)] mb-1">Date & Time</p>
                <p className="text-sm text-[var(--ink)]">{eventData.date ? formatDate(eventData.date).split(',').slice(1).join(',') : 'TBD'}</p>
                {eventData.startTime && eventData.endTime && (
                  <p className="text-xs text-[var(--muted)]">{eventData.startTime} - {eventData.endTime}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[var(--stroke)]">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--bg)] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[var(--primary)]" />
              </div>
              <div>
                <p className="text-xs text-[var(--muted)] mb-1">Location</p>
                {eventData.location ? (
                  <>
                    <p className="text-sm text-[var(--ink)] line-clamp-1">{eventData.location}</p>
                    <p className="text-xs text-[var(--muted)]">{eventData.city}</p>
                  </>
                ) : (
                  <p className="text-sm text-[var(--ink)]">
                    {eventData.format === 'Online' ? 'Online Event' : 'Location TBD'}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[var(--stroke)]">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--bg)] flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-[var(--primary)]" />
              </div>
              <div>
                <p className="text-xs text-[var(--muted)] mb-1">Accreditation</p>
                <p className="text-sm text-[var(--ink)]">Counts for {eventData.council}</p>
                <p className="text-xs text-[var(--muted)]">Est. {eventData.estimatedCredits} credits</p>
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        {eventData.description && (
          <div className="bg-white p-5 rounded-xl border border-[var(--stroke)]">
            <h3 className="mb-3">About This Event</h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed">{eventData.description}</p>
          </div>
        )}

        {/* Agenda */}
        {eventData.agenda.length > 0 && (
          <div className="bg-white p-5 rounded-xl border border-[var(--stroke)]">
            <h3 className="mb-4">Agenda</h3>
            <div className="space-y-3">
              {eventData.agenda.map((item) => (
                <div key={item.id} className="flex gap-3 pb-3 border-b border-[var(--stroke)] last:border-0">
                  <div className="flex-shrink-0 w-14 text-sm text-[var(--muted)]">
                    {item.startTime}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm mb-0.5">{item.title}</h4>
                    <p className="text-xs text-[var(--muted)]">
                      {item.speaker} • {item.duration} minutes
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Faculty */}
        {eventData.faculty.length > 0 && (
          <div className="bg-white p-5 rounded-xl border border-[var(--stroke)]">
            <h3 className="mb-4">Faculty</h3>
            <div className="grid grid-cols-2 gap-4">
              {eventData.faculty.map(faculty => (
                <div key={faculty.id} className="flex items-start gap-3">
                  <img 
                    src={faculty.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                    alt={faculty.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h4 className="text-sm mb-0.5">{faculty.name}</h4>
                    <p className="text-xs text-[var(--muted)]">{faculty.role}</p>
                    <p className="text-xs text-[var(--muted)] line-clamp-1">{faculty.affiliation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Organizer */}
        <div className="bg-white p-5 rounded-xl border border-[var(--stroke)]">
          <h3 className="mb-4">Organized By</h3>
          <div className="flex items-center gap-3">
            <img 
              src={eventData.organizer.avatar}
              alt={eventData.organizer.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h4 className="text-sm">{eventData.organizer.name || 'Organizer Name'}</h4>
              <p className="text-xs text-[var(--muted)]">Event Organizer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}