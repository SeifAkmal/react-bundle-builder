import React from 'react';
import { Button } from '../ui/Button';

export function AccordionStep({
  stepNumber,
  totalSteps = 4,
  title,
  icon,
  isActive,
  selectedCount = 0,
  onToggle,
  onNext,
  nextText = "Next",
  children
}: {
  stepNumber: number;
  totalSteps?: number;
  title: string;
  icon: React.ReactNode;
  isActive: boolean;
  selectedCount?: number;
  onToggle: () => void;
  onNext?: () => void;
  nextText?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`border-b border-gray-200 last:border-0 ${isActive ? 'bg-[#f8f9fe]' : 'bg-white'} transition-colors duration-300`}>
      {/* Header Area */}
      <div className="pt-6 pb-4 px-2 sm:px-4">
        <div className="text-[10px] tracking-wider text-gray-400 font-bold mb-2 uppercase">
          Step {stepNumber} of {totalSteps}
        </div>
        
        <button 
          onClick={onToggle}
          className="w-full flex items-center justify-between focus:outline-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
              {icon}
            </div>
            <h2 className={`text-xl sm:text-2xl font-bold transition-colors duration-200 ${isActive ? 'text-gray-900' : 'text-gray-900'}`}>
              {title}
            </h2>
          </div>
          
          {/* Right side of header */}
          <div className="flex items-center">
             {isActive ? (
                <span className="text-sm font-semibold text-[#4f46e5] flex items-center gap-1">
                   {selectedCount > 0 ? `${selectedCount} selected` : ''} 
                   <span className="text-[10px] ml-1">▲</span>
                </span>
             ) : (
                <span className="text-[#4f46e5] font-bold text-sm">▼</span>
             )}
          </div>
        </button>
      </div>

      {/* Content Area */}
      {isActive && (
        <div className="pb-8 px-2 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {children}
          </div>
          
          {/* Next Button */}
          {onNext && (
            <div className="mt-8 flex justify-center">
              <Button variant="outline-purple" onClick={onNext}>
                {nextText}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
