import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { mockEvents, Event } from '../lib/mockData';
import { EventCard } from '../components/EventCard';
import { CreateEvent } from './CreateEvent';
import { PageHeader } from '../components/PageHeader';
import { Search, SlidersHorizontal, ArrowUpDown, ChevronDown } from 'lucide-react';
import { LoadingScreen } from '../components/LoadingScreen';
import { Chip } from '../components/Chip';

export function OrganizerEvents() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on route
  const initialTab = location.pathname === '/organizer/create' ? 'create' : 'discover';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isLoading, setIsLoading] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [selectedCouncil, setSelectedCouncil] = useState<string>('All');
  const [selectedDateRange, setSelectedDateRange] = useState<string>('All');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('date-asc');

  const formats = ['All', 'Online', 'In-person', 'Hybrid'];
  const councils = ['All', 'DMC', 'RMC'];
  const dateRanges = ['All', 'This week', 'This month', 'Custom'];
  const specialties = ['All', 'Critical Care', 'Cardiology', 'Neurology', 'Anesthesiology', 'Emergency Medicine', 'Pediatrics', 'Obstetrics', 'Geriatrics', 'Radiology', 'Pain Medicine'];
  const locations = ['All', 'Delhi', 'Mumbai', 'Jaipur', 'Lucknow', 'Online'];

  // Update tab when route changes
  useEffect(() => {
    const newTab = location.pathname === '/organizer/create' ? 'create' : 'discover';
    setActiveTab(newTab);
  }, [location.pathname]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'discover') {
      navigate('/organizer/events');
    } else {
      navigate('/organizer/create');
    }
  };

  const handleCreateEvent = () => {
    setActiveTab('create');
    navigate('/organizer/create');
  };

  // Filter events
  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.subtitle?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFormat = selectedFormat === 'All' || event.format === selectedFormat;
    const matchesCouncil = selectedCouncil === 'All' || event.council === selectedCouncil;
    const matchesSpecialty = selectedSpecialty === 'All' || event.specialty === selectedSpecialty;
    const matchesLocation = selectedLocation === 'All' || 
                            event.city === selectedLocation || 
                            (selectedLocation === 'Online' && event.format === 'Online');
    
    return matchesSearch && matchesFormat && matchesCouncil && matchesSpecialty && matchesLocation;
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

  const handleEventClick = (eventId: string) => {
    setIsLoading(true);
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Simulate loading time for better UX
    setTimeout(() => {
      navigate(`/event/${eventId}`, { state: { from: location.pathname } });
    }, 2000);
  };

  // If on create event tab, show the create event wizard
  if (activeTab === 'create') {
    return <CreateEvent />;
  }

  // Show discover events tab
  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {isLoading && <LoadingScreen />}
      
      {/* Page Header with Tabs */}
      <PageHeader
        title="Sahaj CME"
        subtitle="Explore CME events, browse by specialty, or check out accredited medical education calendars."
        tabs={[
          { id: 'discover', label: 'Discover Events' },
          { id: 'create', label: 'Create Event' },
        ]}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        action={{
          label: 'Create Event',
          onClick: handleCreateEvent,
        }}
      />

      {/* Filter Bar - Sticky */}
      <div className="bg-white border-b border-[#E2E8F0] sticky top-16 z-40 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-8 py-4">
          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
              <input
                type="text"
                placeholder="Search events... (⌘K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#767DFF] focus:border-transparent bg-white text-[14px]"
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

            <div className="w-px h-6 bg-[#E2E8F0]" />

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

            <div className="w-px h-6 bg-[#E2E8F0]" />

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

            <div className="w-px h-6 bg-[#E2E8F0]" />

            {/* Specialty Dropdown */}
            <div className="relative">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 border border-[#E2E8F0] rounded-lg bg-white text-sm hover:border-[#767DFF] focus:outline-none focus:ring-2 focus:ring-[#767DFF] focus:border-transparent cursor-pointer"
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty === 'All' ? 'All Specialties' : specialty}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] pointer-events-none" />
            </div>

            <div className="w-px h-6 bg-[#E2E8F0]" />

            {/* Location Dropdown */}
            <div className="relative">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 border border-[#E2E8F0] rounded-lg bg-white text-sm hover:border-[#767DFF] focus:outline-none focus:ring-2 focus:ring-[#767DFF] focus:border-transparent cursor-pointer"
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location === 'All' ? 'All Locations' : location}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] pointer-events-none" />
            </div>

            <div className="ml-auto flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#64748B]" />
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 border border-[#E2E8F0] rounded-lg bg-white text-sm hover:border-[#767DFF] focus:outline-none focus:ring-2 focus:ring-[#767DFF] focus:border-transparent cursor-pointer"
                >
                  <option value="date-asc">Date (Upcoming)</option>
                  <option value="date-desc">Date (Latest)</option>
                  <option value="title">Title (A-Z)</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] pointer-events-none" />
              </div>
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
                className="flex-1 appearance-none pl-3 pr-8 py-2 border border-[#E2E8F0] rounded-lg bg-white text-sm"
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty === 'All' ? 'All Specialties' : specialty}</option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 border border-[#E2E8F0] rounded-lg bg-white text-sm"
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
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        {sortedEvents.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F7F9FC] flex items-center justify-center">
              <Search className="w-8 h-8 text-[#64748B]" />
            </div>
            <h3 className="mb-2 text-[#1E1E1E] text-[18px] font-semibold">No matching events</h3>
            <p className="text-[#64748B] text-[14px]">Try clearing some filters or adjusting your search.</p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-sm text-[#64748B]">
              {sortedEvents.length} {sortedEvents.length === 1 ? 'event' : 'events'} found
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedEvents.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event}
                  onClick={() => handleEventClick(event.id)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center gap-2">
              <button className="px-4 py-2 border border-[#E2E8F0] rounded-lg hover:bg-[#F7F9FC] transition-colors disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-4 py-2 bg-[#767DFF] text-white rounded-lg">1</button>
              <button className="px-4 py-2 border border-[#E2E8F0] rounded-lg hover:bg-[#F7F9FC] transition-colors">2</button>
              <button className="px-4 py-2 border border-[#E2E8F0] rounded-lg hover:bg-[#F7F9FC] transition-colors">3</button>
              <button className="px-4 py-2 border border-[#E2E8F0] rounded-lg hover:bg-[#F7F9FC] transition-colors">
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}