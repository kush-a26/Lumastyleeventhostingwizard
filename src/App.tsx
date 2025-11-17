import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { EventListing } from './pages/EventListing';
import { CreateEvent } from './pages/CreateEvent';
import { PublicEventPage } from './pages/PublicEventPage';
import { OrganizerEvents } from './pages/OrganizerEvents';
import DoctorHome from './pages/DoctorHome';
import DoctorAchievements from './pages/DoctorAchievements';
import DoctorPassbook from './pages/DoctorPassbook';
import OrganizerProfile from './pages/OrganizerProfile';
import { Toaster } from './components/ui/sonner';
import { RoleSwitcher, UserRole } from './components/RoleSwitcher';
import { Button } from './components/ui/button';
import { Search, Bell, Home, Award, Wallet, Settings, Plus, List, FileText, User } from 'lucide-react';
import { doctorProfile } from './lib/doctorMockData';

function AppShell({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Determine role based on current path
  const currentRole: UserRole = location.pathname.startsWith('/organizer') ? 'organizer' : 'doctor';
  const [role, setRole] = useState<UserRole>(currentRole);

  // Update role when path changes
  useEffect(() => {
    setRole(currentRole);
  }, [currentRole]);

  // Handle scroll for condensing top bar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'doctor') {
      navigate('/');
    } else {
      navigate('/organizer/events');
    }
  };

  const handleSwitchToOrganizer = () => {
    setRole('organizer');
    navigate('/organizer/create');
  };

  const isPublicPage = location.pathname.startsWith('/event/');

  if (isPublicPage) {
    return <>{children}</>;
  }

  const doctorNav = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Award, label: 'Achievements', path: '/achievements' },
    { icon: Wallet, label: 'Passbook', path: '/passbook' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const organizerNav = [
    { icon: Plus, label: 'Create Event', path: '/organizer/create' },
    { icon: List, label: 'My Events', path: '/organizer/events' },
    { icon: User, label: 'Profile', path: '/organizer/profile' },
    { icon: Settings, label: 'Settings', path: '/organizer/settings' },
  ];

  const navItems = role === 'doctor' ? doctorNav : organizerNav;

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* Top Bar */}
      <div 
        className={`bg-white border-b border-[#E2E8F0] sticky top-0 z-50 transition-all duration-200 ${
          isScrolled ? 'h-14 shadow-sm' : 'h-16'
        }`}
      >
        <div className={`max-w-[1440px] mx-auto px-8 h-full flex items-center justify-between transition-all duration-200`}>
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link 
              to="/" 
              className={`font-semibold text-[#1E1E1E] transition-all duration-200 ${
                isScrolled ? 'text-[18px]' : 'text-[22px]'
              }`}
            >
              Sahaj<span className="text-[#767DFF]">CME</span>
            </Link>
            
            {/* Role Switcher */}
            <RoleSwitcher role={role} onRoleChange={handleRoleChange} />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-[#F7F9FC] rounded-lg transition-colors">
              <Search className="w-5 h-5 text-[#64748B]" />
            </button>
            <button className="p-2 hover:bg-[#F7F9FC] rounded-lg transition-colors relative">
              <Bell className="w-5 h-5 text-[#64748B]" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#DC2626] rounded-full" />
            </button>
            <button className="flex items-center gap-2 hover:bg-[#F7F9FC] rounded-lg transition-colors p-2">
              <img
                src={doctorProfile.avatar}
                alt={doctorProfile.name}
                className="w-8 h-8 rounded-full"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="flex max-w-[1440px] mx-auto">
        {/* Sidebar */}
        <div className={`w-64 bg-white border-r border-[#E2E8F0] min-h-[calc(100vh-4rem)] sticky transition-all duration-200 ${
          isScrolled ? 'top-14' : 'top-16'
        }`}>
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-[#E8EBFF] text-[#767DFF]'
                      : 'text-[#64748B] hover:bg-[#F7F9FC] hover:text-[#1E1E1E]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[14px] font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 transition-opacity duration-250">
          {typeof children === 'object' && 'type' in children && children.type === DoctorHome
            ? React.cloneElement(children as React.ReactElement, {
                onSwitchToOrganizer: handleSwitchToOrganizer,
                onNavigateToAchievements: () => navigate('/achievements'),
              })
            : children}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route
          path="/"
          element={
            <AppShell>
              <DoctorHome onSwitchToOrganizer={() => {}} onNavigateToAchievements={() => {}} />
            </AppShell>
          }
        />
        <Route
          path="/achievements"
          element={
            <AppShell>
              <DoctorAchievements />
            </AppShell>
          }
        />
        <Route
          path="/passbook"
          element={
            <AppShell>
              <DoctorPassbook />
            </AppShell>
          }
        />
        <Route
          path="/organizer/create"
          element={
            <AppShell>
              <OrganizerEvents />
            </AppShell>
          }
        />
        <Route
          path="/organizer/events"
          element={
            <AppShell>
              <OrganizerEvents />
            </AppShell>
          }
        />
        <Route
          path="/organizer/profile"
          element={
            <AppShell>
              <OrganizerProfile />
            </AppShell>
          }
        />
        <Route path="/event/:id" element={<PublicEventPage />} />
        <Route path="/preview_page_v2.html" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}