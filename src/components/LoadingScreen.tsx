import React from 'react';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-[#F7F9FC] z-[100] flex flex-col items-center justify-center">
      {/* Pulsing Logo */}
      <div className="mb-8 animate-pulse-scale">
        <h1 className="font-semibold text-[#1E1E1E] animate-text-pulse">
          Sahaj<span className="text-[#767DFF]">CME</span>
        </h1>
      </div>

      {/* Bouncing Dots */}
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-[#767DFF] rounded-full animate-bounce-dot" style={{ animationDelay: '0ms' }} />
        <div className="w-3 h-3 bg-[#767DFF] rounded-full animate-bounce-dot" style={{ animationDelay: '150ms' }} />
        <div className="w-3 h-3 bg-[#767DFF] rounded-full animate-bounce-dot" style={{ animationDelay: '300ms' }} />
      </div>

      {/* Progress Bar */}
      <div className="mt-8 w-48 h-1 bg-[#E2E8F0] rounded-full overflow-hidden">
        <div className="h-full bg-[#767DFF] animate-progress-bar rounded-full" />
      </div>

      <style>{`
        @keyframes pulse-scale {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }

        @keyframes text-pulse {
          0%, 100% {
            opacity: 1;
            font-size: 32px;
          }
          50% {
            opacity: 0.7;
            font-size: 36px;
          }
        }

        @keyframes bounce-dot {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes progress-bar {
          0% {
            width: 0%;
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
          100% {
            width: 100%;
            opacity: 0.6;
          }
        }

        .animate-pulse-scale {
          animation: pulse-scale 2s ease-in-out infinite;
        }

        .animate-text-pulse h1 {
          animation: text-pulse 2s ease-in-out infinite;
        }

        .animate-bounce-dot {
          animation: bounce-dot 1s ease-in-out infinite;
        }

        .animate-progress-bar {
          animation: progress-bar 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
