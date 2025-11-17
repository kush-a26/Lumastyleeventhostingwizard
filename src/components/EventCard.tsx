import React from 'react';
import { Event } from '../lib/mockData';
import { Chip } from './Chip';
import { Calendar, MapPin, Share2, Users } from 'lucide-react';
import { cn } from './ui/utils';

interface EventCardProps {
  event: Event;
  onClick?: () => void;
}

export function EventCard({ event, onClick }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      weekday: 'short'
    });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/event/${event.id}`);
  };

  return (
    <div 
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-[var(--stroke)] hover:-translate-y-1"
      onClick={onClick}
    >
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.coverImage} 
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <Chip variant="pill" className="text-xs backdrop-blur-md">
            <Calendar className="w-3 h-3 mr-1" />
            {formatDate(event.date)}
          </Chip>
          <Chip variant="format" className="text-xs bg-white/95 backdrop-blur-sm px-2.5 py-1">
            {event.format}
          </Chip>
        </div>

        {/* Status badges */}
        {event.status && (
          <div className="absolute top-3 right-3">
            {event.status === 'live' && <Chip variant="live" className="text-xs">LIVE</Chip>}
            {event.status === 'new' && <Chip variant="new" className="text-xs">NEW</Chip>}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="line-clamp-2 mb-1 text-[var(--ink)]">
          {event.title}
        </h3>
        {event.subtitle && (
          <p className="text-sm text-[var(--muted)] line-clamp-1 mb-3">
            {event.subtitle}
          </p>
        )}

        {/* Meta row */}
        <div className="flex items-center gap-2 mb-3">
          <img 
            src={event.organizer.avatar} 
            alt={event.organizer.name}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-[var(--muted)]">{event.organizer.name}</span>
          {event.city && (
            <>
              <span className="text-[var(--muted)]">•</span>
              <div className="flex items-center gap-1 text-sm text-[var(--muted)]">
                <MapPin className="w-3 h-3" />
                {event.city}
              </div>
            </>
          )}
          {!event.city && event.format === 'Online' && (
            <>
              <span className="text-[var(--muted)]">•</span>
              <span className="text-sm text-[var(--muted)]">Online</span>
            </>
          )}
        </div>

        {/* Accreditation badge */}
        <div className="mb-4 flex flex-wrap gap-2">
          {event.venue && (
            <Chip variant="badge" className="text-xs">
              <MapPin className="w-3 h-3 mr-1 inline" />
              {event.venue}
            </Chip>
          )}
          {event.seatsLeft !== undefined && event.seatsLeft >= 2 && event.seatsLeft <= 4 && (
            <Chip variant="badge" className="text-xs">
              <Users className="w-3 h-3 mr-1 inline" />
              {event.seatsLeft} seats left
            </Chip>
          )}
          {event.estimatedCredits && (
            <Chip variant="badge" className="text-xs">
              {event.estimatedCredits} credits
            </Chip>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="flex-1 bg-[var(--primary)] text-white px-4 py-2.5 rounded-lg hover:bg-[#6169E5] transition-colors">
            View Event
          </button>
          <button 
            onClick={handleShare}
            className="p-2.5 border border-[var(--stroke)] rounded-lg hover:bg-[var(--bg)] transition-colors"
          >
            <Share2 className="w-4 h-4 text-[var(--muted)]" />
          </button>
        </div>
      </div>
    </div>
  );
}