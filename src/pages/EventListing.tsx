import React, { useState } from 'react';
import { EventCard } from '../components/EventCard';
import { Chip } from '../components/Chip';
import { mockEvents } from '../lib/mockData';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function EventListing() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [selectedCouncil, setSelectedCouncil] = useState<string>('All');
  const [selectedDateRange, setSelectedDateRange] = useState<string>('All');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('date-asc');

  const formats = ['All', 'Online', 'In-person', 'Hybrid'];
  const councils = ['All', 'DMC', 'RMC'];
  const dateRanges = ['All', 'This week', 'This month', 'Custom'];
  const specialties = ['All', 'Critical Care', 'Cardiology', 'Neurology', 'Anesthesiology', 'Emergency Medicine', 'Pediatrics', 'Obstetrics', 'Geriatrics', 'Radiology', 'Pain Medicine'];

  // Filter events
  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.subtitle?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFormat = selectedFormat === 'All' || event.format === selectedFormat;
    const matchesCouncil = selectedCouncil === 'All' || event.council === selectedCouncil;
    const matchesSpecialty = selectedSpecialty === 'All' || event.specialty === selectedSpecialty;
    
    return matchesSearch && matchesFormat && matchesCouncil && matchesSpecialty;
  });

  // Sort events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    switch (sortBy) {
      case 'date-asc':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'date-desc':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Top Bar */}
      <div className="bg-white border-b border-[var(--stroke)] sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-[var(--primary)]">Sahaj CME</h1>
              <nav className="hidden md:flex items-center gap-6">
                <a href="#" className="text-[var(--ink)] hover:text-[var(--primary)] transition-colors">Discover Events</a>
                <button 
                  onClick={() => navigate('/create')}
                  className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
                >
                  Create Event
                </button>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/create')}
                className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[#6169E5] transition-colors hidden md:block"
              >
                Create Event
              </button>
              <button className="px-4 py-2 border border-[var(--stroke)] rounded-lg hover:bg-[var(--bg)] transition-colors hidden md:block">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white border-b border-[var(--stroke)]">
        <div className="max-w-[960px] mx-auto px-6 py-12 text-center">
          <h1 className="mb-3">Discover Events</h1>
          <p className="text-[var(--muted)] max-w-2xl mx-auto">
            Explore CME events, browse by specialty, or check out accredited medical education calendars.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-b border-[var(--stroke)] sticky top-[73px] z-40">
        <div className="max-w-[960px] mx-auto px-6 py-4">
          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted)]" />
              <input
                type="text"
                placeholder="Search events... (⌘K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-[var(--stroke)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-white"
              />
            </div>
          </div>

          {/* Filters - Desktop */}
          <div className="hidden md:flex flex-wrap gap-3 items-center">
            {/* Date Range */}
            <div className="flex items-center gap-2">
              {dateRanges.map(range => (
                <Chip
                  key={range}
                  variant="default"
                  selected={selectedDateRange === range}
                  onClick={() => setSelectedDateRange(range)}
                  className="text-sm"
                >
                  {range}
                </Chip>
              ))}
            </div>

            <div className="w-px h-6 bg-[var(--stroke)]" />

            {/* Format */}
            <div className="flex items-center gap-2">
              {formats.map(format => (
                <Chip
                  key={format}
                  variant="default"
                  selected={selectedFormat === format}
                  onClick={() => setSelectedFormat(format)}
                  className="text-sm"
                >
                  {format}
                </Chip>
              ))}
            </div>

            <div className="w-px h-6 bg-[var(--stroke)]" />

            {/* Council */}
            <div className="flex items-center gap-2">
              {councils.map(council => (
                <Chip
                  key={council}
                  variant="default"
                  selected={selectedCouncil === council}
                  onClick={() => setSelectedCouncil(council)}
                  className="text-sm"
                >
                  {council}
                </Chip>
              ))}
            </div>

            <div className="w-px h-6 bg-[var(--stroke)]" />

            {/* Specialty Dropdown */}
            <div className="relative">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 border border-[var(--stroke)] rounded-lg bg-white text-sm hover:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent cursor-pointer"
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty === 'All' ? 'All Specialties' : specialty}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)] pointer-events-none" />
            </div>

            <div className="ml-auto flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[var(--muted)]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 border border-[var(--stroke)] rounded-lg bg-white text-sm hover:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent cursor-pointer"
              >
                <option value="date-asc">Date (Upcoming)</option>
                <option value="date-desc">Date (Latest)</option>
                <option value="title">Title (A-Z)</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)] pointer-events-none ml-[-24px]" />
            </div>
          </div>

          {/* Filters - Mobile (Horizontal Scroll) */}
          <div className="md:hidden space-y-3">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {formats.map(format => (
                <Chip
                  key={format}
                  variant="default"
                  selected={selectedFormat === format}
                  onClick={() => setSelectedFormat(format)}
                  className="text-sm flex-shrink-0"
                >
                  {format}
                </Chip>
              ))}
            </div>
            <div className="flex gap-2">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="flex-1 appearance-none pl-3 pr-8 py-2 border border-[var(--stroke)] rounded-lg bg-white text-sm"
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty === 'All' ? 'All Specialties' : specialty}</option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 border border-[var(--stroke)] rounded-lg bg-white text-sm"
              >
                <option value="date-asc">Upcoming</option>
                <option value="date-desc">Latest</option>
                <option value="title">A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-[960px] mx-auto px-6 py-8">
        {sortedEvents.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--bg)] flex items-center justify-center">
              <Search className="w-8 h-8 text-[var(--muted)]" />
            </div>
            <h3 className="mb-2 text-[var(--ink)]">No matching events</h3>
            <p className="text-[var(--muted)]">Try clearing some filters or adjusting your search.</p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-sm text-[var(--muted)]">
              {sortedEvents.length} {sortedEvents.length === 1 ? 'event' : 'events'} found
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedEvents.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event}
                  onClick={() => navigate(`/event/${event.id}`)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center gap-2">
              <button className="px-4 py-2 border border-[var(--stroke)] rounded-lg hover:bg-[var(--bg)] transition-colors disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg">1</button>
              <button className="px-4 py-2 border border-[var(--stroke)] rounded-lg hover:bg-[var(--bg)] transition-colors">2</button>
              <button className="px-4 py-2 border border-[var(--stroke)] rounded-lg hover:bg-[var(--bg)] transition-colors">3</button>
              <button className="px-4 py-2 border border-[var(--stroke)] rounded-lg hover:bg-[var(--bg)] transition-colors">
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}