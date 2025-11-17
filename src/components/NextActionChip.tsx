import React from 'react';
import { ArrowRight } from 'lucide-react';

interface NextActionChipProps {
  text: string;
  onClick?: () => void;
}

export function NextActionChip({ text, onClick }: NextActionChipProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E2E8F0] rounded-full text-[#1E1E1E] hover:border-[#767DFF] hover:text-[#767DFF] transition-all duration-200 group"
    >
      <span className="text-[14px]">{text}</span>
      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
    </button>
  );
}
