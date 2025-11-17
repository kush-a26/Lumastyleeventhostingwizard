import { Badge } from '../components/BadgeToken';
import { Certificate } from '../components/CertificateQuickView';

export const doctorProfile = {
  name: 'Dr. Priya Sharma',
  email: 'priya.sharma@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
  credits: {
    current: 18.5,
    total: 30,
    daysToRenewal: 225,
    cycle: '2025–2030',
  },
  nextActions: [
    'Find 2-hr webinar',
    'Claim speaker +1',
    'Nudge organizer for RMC Ref',
  ],
};

export const badges: Badge[] = [
  {
    id: '1',
    name: 'Council-Ready',
    description: 'Completed all required documentation',
    icon: 'council-ready',
    unlocked: true,
    unlockedDate: 'Jan 2025',
    category: 'core',
  },
  {
    id: '2',
    name: 'First 10',
    description: 'Earned your first 10 CME hours',
    icon: 'first-10',
    unlocked: true,
    unlockedDate: 'Feb 2025',
    category: 'core',
  },
  {
    id: '3',
    name: 'Halfway There',
    description: 'Reached 15 of 30 hours',
    icon: 'halfway',
    unlocked: true,
    unlockedDate: 'Oct 2025',
    category: 'core',
  },
  {
    id: '4',
    name: 'Speaker',
    description: 'Contributed as faculty at an accredited event',
    icon: 'speaker',
    unlocked: true,
    unlockedDate: 'Sep 2025',
    category: 'contribution',
  },
  {
    id: '5',
    name: 'Full Cycle',
    description: 'Complete all 30 hours in current cycle',
    icon: 'full-cycle',
    unlocked: false,
    category: 'core',
  },
  {
    id: '6',
    name: 'Evidence Pro',
    description: 'Maintained complete audit trail',
    icon: 'evidence-pro',
    unlocked: false,
    category: 'compliance',
  },
  {
    id: '7',
    name: 'RMC Seal',
    description: 'All certificates verified by RMC',
    icon: 'rmc-seal',
    unlocked: false,
    category: 'compliance',
  },
];

export const recentCertificates: Certificate[] = [
  {
    id: '1',
    eventTitle: 'Critical Care Update 2025',
    date: 'Oct 12, 2025',
    council: 'DMC',
    hours: 4.0,
    status: 'verified',
    venue: 'Sheraton Grand, Delhi',
    specialty: 'Critical Care',
  },
  {
    id: '2',
    eventTitle: 'Advanced Airway Workshop',
    date: 'Sep 8, 2025',
    council: 'DMC',
    hours: 3.5,
    status: 'verified',
    venue: 'AIIMS Convention Center',
    specialty: 'Anesthesia',
  },
  {
    id: '3',
    eventTitle: 'ECMO Basics: A Practical Approach',
    date: 'Aug 20, 2025',
    council: 'RMC',
    hours: 4.0,
    status: 'pending',
    venue: 'Fortis Hospital, Mumbai',
    specialty: 'Critical Care',
  },
  {
    id: '4',
    eventTitle: 'Cardiac Arrhythmia Summit',
    date: 'Jul 15, 2025',
    council: 'DMC',
    hours: 3.0,
    status: 'verified',
    venue: 'ITC Grand Bharat',
    specialty: 'Cardiology',
  },
];

export const allCertificates: Certificate[] = [
  ...recentCertificates,
  {
    id: '5',
    eventTitle: 'Sepsis Management Review',
    date: 'Jun 10, 2025',
    council: 'DMC',
    hours: 2.0,
    status: 'verified',
    venue: 'Max Hospital, Delhi',
    specialty: 'Critical Care',
  },
  {
    id: '6',
    eventTitle: 'Neuro Imaging Pearls',
    date: 'May 22, 2025',
    council: 'RMC',
    hours: 2.0,
    status: 'verified',
    venue: 'Manipal Hospital, Bangalore',
    specialty: 'Neurology',
  },
];

export const creditsBreakdown = {
  thisMonth: {
    total: 3.0,
    events: [
      { title: 'Critical Care Update 2025', hours: 4.0, date: 'Oct 12' },
    ],
  },
  byCouncil: [
    { name: 'DMC', hours: 14.5, color: '#767DFF' },
    { name: 'RMC', hours: 4.0, color: '#16A34A' },
  ],
  bySpecialty: [
    { name: 'Cardiology', hours: 7.0 },
    { name: 'Critical Care', hours: 6.5 },
    { name: 'Neurology', hours: 2.0 },
    { name: 'Anesthesia', hours: 3.0 },
  ],
};
