import React from 'react';

export type UserRole = 'doctor' | 'organizer';

interface RoleSwitcherProps {
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export function RoleSwitcher({ role, onRoleChange }: RoleSwitcherProps) {
  return (
    <div className="inline-flex items-center gap-0 bg-[#E2E8F0] p-1 rounded-full">
      <button
        onClick={() => onRoleChange('doctor')}
        className={`px-4 py-1.5 rounded-full transition-all duration-250 ${
          role === 'doctor'
            ? 'bg-[#767DFF] text-white shadow-sm'
            : 'text-[#64748B] hover:text-[#1E1E1E]'
        }`}
      >
        Doctor
      </button>
      <button
        onClick={() => onRoleChange('organizer')}
        className={`px-4 py-1.5 rounded-full transition-all duration-250 ${
          role === 'organizer'
            ? 'bg-[#767DFF] text-white shadow-sm'
            : 'text-[#64748B] hover:text-[#1E1E1E]'
        }`}
      >
        Organizer
      </button>
    </div>
  );
}
