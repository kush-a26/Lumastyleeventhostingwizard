export interface Event {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  startTime: string;
  endTime: string;
  format: 'Online' | 'In-person' | 'Hybrid';
  location?: string;
  city?: string;
  venue?: string;
  seatsLeft?: number;
  coverImage: string;
  organizer: {
    name: string;
    avatar: string;
  };
  council: 'DMC' | 'RMC';
  status?: 'live' | 'new' | 'pending' | 'closed';
  specialty?: string;
  description?: string;
  agenda?: AgendaItem[];
  faculty?: FacultyMember[];
  streamingLink?: string;
  estimatedCredits?: number;
  refNumber?: string;
}

export interface AgendaItem {
  id: string;
  startTime: string;
  title: string;
  speaker: string;
  duration: number;
}

export interface FacultyMember {
  id: string;
  name: string;
  role: 'Speaker' | 'Chair' | 'Moderator';
  affiliation: string;
  avatar?: string;
}

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Critical Care Update (Day-1)',
    subtitle: 'Advanced ICU management strategies for 2025',
    date: '2025-11-20',
    startTime: '09:00',
    endTime: '17:00',
    format: 'Hybrid',
    location: 'AIIMS Convention Center',
    city: 'Delhi',
    venue: 'AIIMS Convention Center',
    seatsLeft: 15,
    coverImage: 'https://images.unsplash.com/photo-1605654580413-5a7f24649936?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcml0aWNhbCUyMGNhcmUlMjBob3NwaXRhbHxlbnwxfHx8fDE3NjMzMTEyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    organizer: {
      name: 'Dr. Rajesh Kumar',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=male-doc-2',
    },
    council: 'DMC',
    status: 'live',
    specialty: 'Critical Care',
    estimatedCredits: 6.0,
    description: 'Comprehensive update on critical care management with hands-on workshops and case discussions.',
    agenda: [
      { id: 'a1', startTime: '09:00', title: 'ARDS Management 2025', speaker: 'Dr. Sharma', duration: 60 },
      { id: 'a2', startTime: '10:15', title: 'Sepsis Protocol Updates', speaker: 'Dr. Verma', duration: 45 },
      { id: 'a3', startTime: '11:15', title: 'Ventilator Strategies', speaker: 'Dr. Kumar', duration: 60 },
    ],
    faculty: [
      { id: 'f1', name: 'Dr. Anjali Sharma', role: 'Speaker', affiliation: 'AIIMS Delhi', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=female-doc-1' },
      { id: 'f2', name: 'Dr. Vikram Verma', role: 'Speaker', affiliation: 'PGIMER Chandigarh', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=male-doc-1' },
      { id: 'f3', name: 'Dr. Rajesh Kumar', role: 'Chair', affiliation: 'AIIMS Delhi', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=male-doc-2' },
    ],
    streamingLink: 'https://zoom.us/j/123456789',
  },
  {
    id: '2',
    title: 'Airway Workshop — Hands-on',
    subtitle: 'Practical skills in difficult airway management',
    date: '2025-11-22',
    startTime: '08:00',
    endTime: '16:00',
    format: 'Online',
    location: '',
    city: '',
    venue: '',
    seatsLeft: 3,
    coverImage: 'https://images.unsplash.com/photo-1637743408313-c9d5e869d9db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwd29ya3Nob3AlMjB0cmFpbmluZ3xlbnwxfHx8fDE3NjMzMTExOTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    organizer: {
      name: 'Dr. Priya Singh',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=female-doc-2',
    },
    council: 'DMC',
    status: 'new',
    specialty: 'Anesthesiology',
    estimatedCredits: 5.0,
    description: 'Intensive hands-on workshop focusing on difficult airway management techniques.',
    agenda: [
      { id: 'a1', startTime: '08:00', title: 'Introduction to Difficult Airway', speaker: 'Dr. Singh', duration: 30 },
      { id: 'a2', startTime: '09:00', title: 'Hands-on: Video Laryngoscopy', speaker: 'Dr. Malhotra', duration: 120 },
      { id: 'a3', startTime: '11:30', title: 'Fiber-optic Intubation', speaker: 'Dr. Gupta', duration: 90 },
    ],
    faculty: [
      { id: 'f1', name: 'Dr. Priya Singh', role: 'Chair', affiliation: 'SMS Medical College', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=female-doc-2' },
      { id: 'f2', name: 'Dr. Amit Malhotra', role: 'Speaker', affiliation: 'AIIMS Jodhpur', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=male-doc-3' },
      { id: 'f3', name: 'Dr. Neha Gupta', role: 'Speaker', affiliation: 'RML Hospital', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=female-doc-3' },
    ],
  },
  {
    id: '3',
    title: 'ECMO Basics',
    subtitle: 'Understanding extracorporeal membrane oxygenation',
    date: '2025-11-25',
    startTime: '14:00',
    endTime: '18:00',
    format: 'Online',
    seatsLeft: 50,
    coverImage: 'https://images.unsplash.com/photo-1759270463144-02b90c57135d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVjaG5vbG9neSUyMGFic3RyYWN0fGVufDF8fHx8MTc2MzIyNDE4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    organizer: {
      name: 'Dr. Suresh Menon',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=male-doc-4',
    },
    council: 'DMC',
    specialty: 'Critical Care',
    estimatedCredits: 3.0,
    description: 'Introduction to ECMO technology, indications, and patient management.',
    streamingLink: 'https://zoom.us/j/987654321',
  },
  {
    id: '4',
    title: 'Cardio Summit Jaipur',
    subtitle: 'Latest advances in cardiovascular medicine',
    date: '2025-11-28',
    startTime: '09:00',
    endTime: '18:00',
    format: 'In-person',
    location: 'Fortis Escorts Hospital',
    city: 'Jaipur',
    venue: 'ITC Rajputana',
    seatsLeft: 25,
    coverImage: 'https://images.unsplash.com/photo-1715111965882-bbdf35de510c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJkaW9sb2d5JTIwbWVkaWNhbCUyMGltYWdpbmd8ZW58MXx8fHwxNzYzMzExMjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    organizer: {
      name: 'Dr. Anil Kapoor',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=male-doc-5',
    },
    council: 'DMC',
    specialty: 'Cardiology',
    estimatedCredits: 7.0,
    description: 'Full-day summit covering the latest developments in cardiology and interventional procedures.',
  },
  {
    id: '5',
    title: 'Neuro Imaging Pearls',
    subtitle: 'Advanced neuroimaging techniques and interpretation',
    date: '2025-12-01',
    startTime: '15:00',
    endTime: '17:30',
    format: 'Online',
    seatsLeft: 100,
    coverImage: 'https://images.unsplash.com/photo-1758691463165-ca9b5bc2b28a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXVyb2xvZ3klMjBicmFpbiUyMHNjYW58ZW58MXx8fHwxNzYzMzExMjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    organizer: {
      name: 'Dr. Meera Iyer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=meera',
    },
    council: 'RMC',
    status: 'pending',
    specialty: 'Neurology',
    estimatedCredits: 2.0,
    description: 'Learn to interpret complex neuroimaging findings with expert radiologists.',
    streamingLink: 'https://meet.google.com/abc-defg-hij',
  },
  {
    id: '6',
    title: 'Sepsis Review 2025',
    subtitle: 'Evidence-based management of sepsis and septic shock',
    date: '2025-12-03',
    startTime: '10:00',
    endTime: '16:00',
    format: 'Hybrid',
    location: 'KEM Hospital',
    city: 'Mumbai',
    venue: 'Taj Lands End',
    seatsLeft: 12,
    coverImage: 'https://images.unsplash.com/photo-1718224326658-489bbfbeb2ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY29uZmVyZW5jZSUyMGF1ZGl0b3JpdW18ZW58MXx8fHwxNzYzMzExMTk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    organizer: {
      name: 'Dr. Sanjay Desai',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sanjay',
    },
    council: 'DMC',
    specialty: 'Critical Care',
    estimatedCredits: 5.0,
    description: 'Comprehensive review of sepsis management based on latest guidelines.',
    streamingLink: 'https://zoom.us/j/456789123',
  },
  {
    id: '7',
    title: 'Pediatric Emergency Care',
    subtitle: 'Managing critically ill children',
    date: '2025-12-05',
    startTime: '09:00',
    endTime: '13:00',
    format: 'Online',
    seatsLeft: 75,
    coverImage: 'https://images.unsplash.com/photo-1758204054548-2d2bb32831c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMG1lZGljYWwlMjBldmVudHxlbnwxfHx8fDE3NjMzMTExOTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    organizer: {
      name: 'Dr. Kavita Reddy',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kavita',
    },
    council: 'DMC',
    specialty: 'Pediatrics',
    estimatedCredits: 3.5,
    description: 'Focused session on pediatric emergency scenarios and management protocols.',
    streamingLink: 'https://zoom.us/j/789123456',
  },
  {
    id: '8',
    title: 'Trauma Life Support Workshop',
    subtitle: 'ATLS principles and practice',
    date: '2025-12-08',
    startTime: '08:00',
    endTime: '17:00',
    format: 'In-person',
    location: 'Trauma Center, KGMU',
    city: 'Lucknow',
    venue: 'Renaissance Lucknow Hotel',
    seatsLeft: 20,
    coverImage: 'https://images.unsplash.com/photo-1659353888338-ce940a0f252f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZWR1Y2F0aW9uJTIwbGVjdHVyZXxlbnwxfHx8fDE3NjMzMTEyMDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    organizer: {
      name: 'Dr. Ravi Shankar',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ravi',
    },
    council: 'DMC',
    specialty: 'Emergency Medicine',
    estimatedCredits: 8.0,
    description: 'Comprehensive trauma management workshop following ATLS guidelines.',
  },
  {
    id: '9',
    title: 'Obstetric Emergencies Online',
    subtitle: 'Managing critical obstetric situations',
    date: '2025-12-10',
    startTime: '16:00',
    endTime: '19:00',
    format: 'Online',
    seatsLeft: 60,
    coverImage: 'https://images.unsplash.com/photo-1762784574791-ded574c44c1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJpbmFyJTIwb25saW5lJTIwbWVldGluZ3xlbnwxfHx8fDE3NjMyMTM1NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    organizer: {
      name: 'Dr. Lakshmi Narayanan',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lakshmi',
    },
    council: 'RMC',
    specialty: 'Obstetrics',
    estimatedCredits: 2.5,
    description: 'Case-based learning for managing obstetric emergencies.',
    streamingLink: 'https://teams.microsoft.com/l/meetup-join/xxx',
  },
  {
    id: '10',
    title: 'Geriatric Care Symposium',
    subtitle: 'Comprehensive care for elderly patients',
    date: '2025-12-12',
    startTime: '09:30',
    endTime: '16:30',
    format: 'Hybrid',
    location: 'Max Hospital',
    city: 'Delhi',
    venue: 'The Leela Ambience',
    seatsLeft: 4,
    coverImage: 'https://images.unsplash.com/photo-1733222765056-b0790217baa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc2VtaW5hciUyMHByZXNlbnRhdGlvbnxlbnwxfHx8fDE3NjMzMTExOTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    organizer: {
      name: 'Dr. Ashok Mehta',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ashok',
    },
    council: 'DMC',
    specialty: 'Geriatrics',
    estimatedCredits: 5.5,
    description: 'Multi-disciplinary approach to geriatric patient care.',
    streamingLink: 'https://zoom.us/j/321654987',
  },
  {
    id: '11',
    title: 'Radiology Update 2025',
    subtitle: 'Latest imaging techniques and AI applications',
    date: '2025-12-15',
    startTime: '10:00',
    endTime: '17:00',
    format: 'In-person',
    city: 'Mumbai',
    location: 'Tata Memorial Hospital',
    venue: 'Grand Hyatt Mumbai',
    seatsLeft: 30,
    coverImage: 'https://images.unsplash.com/photo-1758691462620-9018c602ed3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwcmVzZW50YXRpb24lMjBob3NwaXRhbHxlbnwxfHx8fDE3NjMzMTEyMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    organizer: {
      name: 'Dr. Pooja Patel',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pooja',
    },
    council: 'RMC',
    specialty: 'Radiology',
    estimatedCredits: 6.0,
    description: 'Explore the latest advancements in medical imaging and AI integration.',
  },
  {
    id: '12',
    title: 'Pain Management Masterclass',
    subtitle: 'Multimodal approaches to chronic pain',
    date: '2025-12-18',
    startTime: '09:00',
    endTime: '15:00',
    format: 'Online',
    seatsLeft: 40,
    coverImage: 'https://images.unsplash.com/photo-1694787590597-ba49c7cdc2cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY29uZmVyZW5jZSUyMGhhbGx8ZW58MXx8fHwxNzYzMzExMjAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    organizer: {
      name: 'Dr. Arjun Nair',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun',
    },
    council: 'DMC',
    specialty: 'Pain Medicine',
    estimatedCredits: 4.5,
    description: 'Advanced pain management techniques and interventional procedures.',
    streamingLink: 'https://zoom.us/j/654987321',
  },
];