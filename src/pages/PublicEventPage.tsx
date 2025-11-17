import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { mockEvents } from '../lib/mockData';
import { Chip } from '../components/Chip';
import { Calendar, MapPin, Share2, ExternalLink, Clock, Award, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function PublicEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const event = mockEvents.find(e => e.id === id);

  // Get the referring page from location state or default to '/'
  const referrer = (location.state as { from?: string })?.from || '/';

  const handleBack = () => {
    // If coming from organizer pages, go back to organizer events
    if (referrer.startsWith('/organizer')) {
      navigate('/organizer/events');
    } else {
      navigate(referrer);
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2">Event not found</h2>
          <button 
            onClick={handleBack}
            className="text-[var(--primary)] hover:underline"
          >
            Go back to events
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const handleRegister = () => {
    toast.success('Registration request submitted!');
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Top Bar */}
      <div className="bg-white border-b border-[var(--stroke)] sticky top-0 z-50">
        <div className="max-w-[960px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Events
            </button>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleShare}
                className="px-4 py-2 border border-[var(--stroke)] rounded-lg hover:bg-[var(--bg)] transition-colors flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-80 overflow-hidden">
        <img 
          src={event.coverImage} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 max-w-[960px] mx-auto">
          {/* Top badges */}
          <div className="flex items-start justify-between">
            <Chip variant="pill" className="backdrop-blur-md text-sm">
              <Calendar className="w-4 h-4 mr-1.5" />
              {formatDate(event.date)}
            </Chip>
            <Chip variant="format" className="bg-white/95 backdrop-blur-sm">
              {event.format}
            </Chip>
          </div>

          {/* Title */}
          <div className="text-white">
            <h1 className="mb-2 text-white drop-shadow-lg">{event.title}</h1>
            {event.subtitle && (
              <p className="text-lg text-white/90 drop-shadow-md max-w-2xl">
                {event.subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[960px] mx-auto px-6 py-8">
        {/* Action Buttons */}
        <div className="flex gap-3 mb-8">
          <button 
            onClick={handleRegister}
            className="flex-1 md:flex-none px-8 py-3 bg-[var(--primary)] text-white rounded-lg hover:bg-[#6169E5] transition-colors"
          >
            Register to See Address
          </button>
          <button 
            onClick={handleShare}
            className="px-4 py-3 border border-[var(--stroke)] rounded-lg hover:bg-white transition-colors"
          >
            <Share2 className="w-5 h-5 text-[var(--muted)]" />
          </button>
        </div>

        {/* Event Details Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 rounded-xl border border-[var(--stroke)]">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--bg)] flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-[var(--primary)]" />
              </div>
              <div>
                <p className="text-sm text-[var(--muted)] mb-1">Date & Time</p>
                <p className="text-[var(--ink)]">{formatDate(event.date)}</p>
                <p className="text-sm text-[var(--muted)]">{event.startTime} - {event.endTime}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[var(--stroke)]">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--bg)] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[var(--primary)]" />
              </div>
              <div>
                <p className="text-sm text-[var(--muted)] mb-1">Location</p>
                {event.location ? (
                  <>
                    <p className="text-[var(--ink)]">{event.location}</p>
                    <p className="text-sm text-[var(--muted)]">{event.city}</p>
                  </>
                ) : (
                  <p className="text-[var(--ink)]">Online Event</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[var(--stroke)]">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--bg)] flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-[var(--primary)]" />
              </div>
              <div>
                <p className="text-sm text-[var(--muted)] mb-1">Accreditation</p>
                <p className="text-[var(--ink)]">Counts for {event.council}</p>
                <p className="text-sm text-[var(--muted)]">Est. {event.estimatedCredits || 0} credits</p>
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        {event.description && (
          <div className="bg-white p-6 rounded-xl border border-[var(--stroke)] mb-6">
            <h3 className="mb-3">About This Event</h3>
            <p className="text-[var(--muted)] leading-relaxed">{event.description}</p>
          </div>
        )}

        {/* Agenda */}
        {event.agenda && event.agenda.length > 0 && (
          <div className="bg-white p-6 rounded-xl border border-[var(--stroke)] mb-6">
            <h3 className="mb-4">Agenda</h3>
            <div className="space-y-4">
              {event.agenda.map((item, index) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-[var(--stroke)] last:border-0">
                  <div className="flex-shrink-0 w-16 text-sm text-[var(--muted)]">
                    {item.startTime}
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-1">{item.title}</h4>
                    <p className="text-sm text-[var(--muted)]">
                      {item.speaker} • {item.duration} minutes
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Faculty */}
        {event.faculty && event.faculty.length > 0 && (
          <div className="bg-white p-6 rounded-xl border border-[var(--stroke)] mb-6">
            <h3 className="mb-4">Faculty</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {event.faculty.map(faculty => (
                <div key={faculty.id} className="flex items-start gap-3">
                  <img 
                    src={faculty.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                    alt={faculty.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="text-sm mb-0.5">{faculty.name}</h4>
                    <p className="text-xs text-[var(--muted)]">{faculty.role}</p>
                    <p className="text-xs text-[var(--muted)]">{faculty.affiliation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Streaming Link */}
        {event.streamingLink && (
          <div className="bg-[var(--bg)] p-6 rounded-xl border border-[var(--stroke)] mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="mb-1">Online Streaming</h4>
                <p className="text-sm text-[var(--muted)]">Join virtually via the provided link</p>
              </div>
              <button className="px-4 py-2 bg-white border border-[var(--stroke)] rounded-lg hover:bg-[var(--bg)] transition-colors flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Join Stream
              </button>
            </div>
          </div>
        )}

        {/* Organizer */}
        <div className="bg-white p-6 rounded-xl border border-[var(--stroke)]">
          <h3 className="mb-4">Organized By</h3>
          <div className="flex items-center gap-3">
            <img 
              src={event.organizer.avatar}
              alt={event.organizer.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h4>{event.organizer.name}</h4>
              <p className="text-sm text-[var(--muted)]">Event Organizer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}