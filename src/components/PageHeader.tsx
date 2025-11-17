import React from 'react';
import { Button } from './ui/button';

interface Tab {
  id: string;
  label: string;
  path?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  tabs?: Tab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function PageHeader({ 
  title, 
  subtitle, 
  tabs, 
  activeTab, 
  onTabChange,
  action 
}: PageHeaderProps) {
  return (
    <div className="bg-white border-b border-[#E2E8F0]">
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        {/* Title and Action Row */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-[22px] font-semibold text-[#1E1E1E] mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[14px] text-[#64748B] max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
          {action && (
            <Button
              onClick={action.onClick}
              className="bg-[#767DFF] hover:bg-[#6169E5] text-white rounded-lg px-4 py-2 h-auto"
            >
              {action.label}
            </Button>
          )}
        </div>

        {/* Tabs */}
        {tabs && tabs.length > 0 && (
          <div className="flex items-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange?.(tab.id)}
                className={`px-4 py-2 rounded-full text-[14px] font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-[#767DFF] text-white'
                    : 'bg-[#F7F9FC] text-[#64748B] hover:bg-[#E8EBFF] hover:text-[#767DFF]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
