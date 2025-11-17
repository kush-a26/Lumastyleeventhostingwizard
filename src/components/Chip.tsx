import React from 'react';
import { cn } from './ui/utils';

export interface ChipProps {
  children: React.ReactNode;
  variant?: 'default' | 'format' | 'badge' | 'pill' | 'new' | 'live';
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Chip({ children, variant = 'default', selected = false, onClick, className }: ChipProps) {
  const baseStyles = "inline-flex items-center justify-center transition-all duration-200";
  
  const variants = {
    default: cn(
      "px-3 py-1.5 rounded-full border",
      onClick && "cursor-pointer hover:border-[var(--primary)]",
      selected 
        ? "bg-[var(--primary)] text-white border-[var(--primary)]" 
        : "bg-white border-[var(--stroke)] text-[var(--ink)] hover:bg-[var(--bg)]"
    ),
    format: cn(
      "px-4 py-2 rounded-lg border",
      onClick && "cursor-pointer",
      selected 
        ? "bg-[var(--primary)] text-white border-[var(--primary)]" 
        : "bg-white border-[var(--stroke)] text-[var(--ink)] hover:border-[var(--primary)] hover:bg-[var(--bg)]"
    ),
    badge: "px-2.5 py-1 rounded-md bg-[var(--bg)] text-[var(--muted)] border border-[var(--stroke)]",
    pill: "px-2.5 py-1 rounded-full bg-white/90 text-[var(--ink)] backdrop-blur-sm shadow-sm border border-white/20",
    new: "px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 border border-blue-200",
    live: "px-2.5 py-1 rounded-md bg-red-50 text-red-600 border border-red-200 flex items-center gap-1.5",
  };

  return (
    <span 
      className={cn(baseStyles, variants[variant], className)}
      onClick={onClick}
    >
      {variant === 'live' && <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />}
      {children}
    </span>
  );
}