'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { destinations } from '@/data/destinations';
import { useDestination, usePrimaryDestination } from '@/contexts/DestinationContext';

/**
 * DestinationDropdown Component
 * Mobile-first dropdown with touch interactions:
 * - Click to toggle on mobile/touch devices
 * - Hover on desktop
 * - WCAG AAA compliant touch targets (44px minimum)
 */
const DestinationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { primaryDestination } = usePrimaryDestination();
  const { 
    selectedDestinations, 
    addDestination, 
    removeDestination, 
    isDestinationSelected,
    selectedCount 
  } = useDestination();

  // Detect mobile device and handle resize
  useEffect(() => {
    const checkDevice = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isTouchDevice || isSmallScreen);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Handle click outside to close on mobile
  useEffect(() => {
    if (!isMobile || !isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, isMobile]);

  // Use default destination (Bocas del Toro) if none selected
  const currentDestination = primaryDestination || destinations.find(d => d.id === 'bocas-del-toro') || destinations[0];

  const handleToggleDestination = (destinationId: string) => {
    const destination = destinations.find(d => d.id === destinationId);
    if (!destination) return;

    if (isDestinationSelected(destinationId)) {
      removeDestination(destinationId);
    } else {
      addDestination(destination);
    }
  };

  const getDisplayText = () => {
    if (selectedCount === 0) {
      return currentDestination.name;
    } else if (selectedCount === 1) {
      return selectedDestinations[0].name;
    } else {
      // Show first selected destination + count of others
      return `${selectedDestinations[0].name} +${selectedCount - 1} more`;
    }
  };

  const handleTriggerInteraction = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTriggerInteraction();
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobile && isOpen && (
        <div 
          className="mobile-backdrop active"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div 
        ref={dropdownRef}
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Trigger Area - Touch-optimized */}
        <div 
          className={`cursor-pointer touch-target-comfort flex items-center justify-center ${isMobile ? 'touch-manipulation' : ''}`}
          onClick={handleTriggerInteraction}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label="Select destinations"
        >
          <div className="text-base font-semibold text-gray-900 flex items-center truncate w-full">
            <span className="truncate flex-1">{getDisplayText()}</span>
            <ChevronDown 
              size={16} 
              className={`ml-2 text-gray-600 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
            />
          </div>
        </div>

        {/* Dropdown Menu - Mobile-optimized positioning */}
        {isOpen && (
          <div className={`
            absolute left-0 right-0 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-white/30 p-3 z-50 min-w-[300px] animate-in fade-in-0 zoom-in-95 duration-200
            ${isMobile 
              ? 'top-full mt-2 max-w-[90vw] mx-auto' 
              : 'bottom-full mb-0'
            }
          `}>
            <div className={`space-y-2 ${isMobile ? 'max-h-[50vh]' : 'max-h-64'} overflow-y-auto hide-scrollbar`}>
              {destinations.map((destination) => {
                const isSelected = isDestinationSelected(destination.id);
                
                return (
                  <label 
                    key={destination.id}
                    className={`
                      flex items-center space-x-3 p-4 rounded-lg cursor-pointer transition-all duration-200 touch-target
                      ${isSelected 
                        ? 'bg-ocean-blue/5 border border-ocean-blue/10' 
                        : 'hover:bg-white/50 active:bg-white/70 border border-transparent'
                      }
                    `}
                  >
                    <div className="relative flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleDestination(destination.id)}
                        className="sr-only"
                      />
                      <div className={`
                        w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 touch-target
                        ${isSelected 
                          ? 'border-ocean-blue bg-ocean-blue' 
                          : 'border-gray-300 hover:border-ocean-blue'
                        }
                      `}>
                        {isSelected && (
                          <Check size={12} className="text-white" />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className={`
                        font-medium text-sm truncate
                        ${isSelected ? 'text-ocean-blue' : 'text-deep-cacao'}
                      `}>
                        {destination.name}
                      </div>
                      <div className="text-xs text-driftwood-brown/70 mt-1 truncate">
                        {destination.theme} • {destination.targetDuration}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Selection Summary - Enhanced for mobile */}
            {selectedCount > 0 && (
              <div className="mt-3 pt-3 border-t border-white/30">
                <div className={`text-xs text-driftwood-brown/60 text-center ${isMobile ? 'py-1' : ''}`}>
                  {selectedCount} destination{selectedCount > 1 ? 's' : ''} selected
                </div>
              </div>
            )}

            {/* Mobile Close Hint */}
            {isMobile && (
              <div className="mt-2 pt-2 border-t border-white/20">
                <div className="text-xs text-driftwood-brown/50 text-center">
                  Tap outside to close
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default DestinationDropdown; 