'use client';

import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { destinations } from '@/data/destinations';
import { useDestination, usePrimaryDestination } from '@/contexts/DestinationContext';

/**
 * DestinationDropdown Component
 * Shows on hover over the destination field in the search widget
 * Allows multi-selection of destinations with a clean dropdown interface
 */
const DestinationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { primaryDestination } = usePrimaryDestination();
  const { 
    selectedDestinations, 
    addDestination, 
    removeDestination, 
    isDestinationSelected,
    selectedCount 
  } = useDestination();

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

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger Area - modern horizontal design */}
      <div className="cursor-pointer">
        <div className="text-base font-semibold text-gray-900 flex items-center truncate">
          {getDisplayText()}
          <ChevronDown size={16} className="ml-2 text-gray-600 flex-shrink-0" />
        </div>
      </div>

      {/* Dropdown Menu - positioned above the trigger */}
      {isOpen && (
        <div className="absolute bottom-full left-0 right-0 mb-0 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-white/30 p-3 z-40 min-w-[300px] animate-in fade-in-0 zoom-in-95 duration-200">
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {destinations.map((destination) => {
              const isSelected = isDestinationSelected(destination.id);
              
              return (
                <label 
                  key={destination.id}
                  className={`
                    flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200
                    ${isSelected 
                      ? 'bg-ocean-blue/5 border border-ocean-blue/10' 
                      : 'hover:bg-white/50 border border-transparent'
                    }
                  `}
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleDestination(destination.id)}
                      className="sr-only"
                    />
                    <div className={`
                      w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200
                      ${isSelected 
                        ? 'border-ocean-blue bg-ocean-blue' 
                        : 'border-gray-300 hover:border-ocean-blue'
                      }
                    `}>
                      {isSelected && (
                        <Check size={10} className="text-white" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className={`
                      font-medium text-sm
                      ${isSelected ? 'text-ocean-blue' : 'text-deep-cacao'}
                    `}>
                      {destination.name}
                    </div>
                    <div className="text-xs text-driftwood-brown/70 mt-1">
                      {destination.theme} • {destination.targetDuration}
                    </div>
                  </div>
                </label>
              );
            })}
          </div>

          {/* Selection Summary */}
          {selectedCount > 0 && (
            <div className="mt-3 pt-3 border-t border-white/30">
              <div className="text-xs text-driftwood-brown/60 text-center">
                {selectedCount} destination{selectedCount > 1 ? 's' : ''} selected
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DestinationDropdown; 