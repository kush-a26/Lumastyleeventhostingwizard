import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ChevronRowProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export function ChevronRow({ title, subtitle, children, defaultExpanded = false }: ChevronRowProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="border-b border-[#E2E8F0] last:border-b-0">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-4 hover:bg-[#F7F9FC] transition-colors duration-200 px-4"
      >
        <div className="flex flex-col items-start gap-1">
          <span className="text-[16px] font-medium text-[#1E1E1E]">{title}</span>
          {subtitle && <span className="text-[14px] text-[#64748B]">{subtitle}</span>}
        </div>
        <ChevronDown
          className={`w-5 h-5 text-[#64748B] transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4">{children}</div>
      </div>
    </div>
  );
}
