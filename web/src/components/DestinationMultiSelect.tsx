'use client';

import React from 'react';
import { MapPin, Check } from 'lucide-react';
import { destinations } from '@/data/destinations';
import { useDestination } from '@/contexts/DestinationContext';

/**
 * DestinationMultiSelect Component
 * Allows users to select up to 4 destinations for combination packages
 */
const DestinationMultiSelect: React.FC = () => {
  const { 
    selectedDestinations, 
    addDestination, 
    removeDestination, 
    isDestinationSelected,
    isMaxDestinationsReached,
    selectedCount 
  } = useDestination();

  const handleToggleDestination = (destinationId: string) => {
    const destination = destinations.find(d => d.id === destinationId);
    if (!destination) return;

    if (isDestinationSelected(destinationId)) {
      removeDestination(destinationId);
    } else if (!isMaxDestinationsReached) {
      addDestination(destination);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center text-sm mb-3 text-driftwood-brown">
        <MapPin size={16} className="mr-2 text-ocean-blue" />
        Combine Destinations
      </div>
      
      <div className="text-xs text-driftwood-brown/70 mb-3">
        Select up to 4 destinations for your multi-destination package
      </div>

      <div className="space-y-2">
        {destinations.map((destination) => {
          const isSelected = isDestinationSelected(destination.id);
          const isDisabled = !isSelected && isMaxDestinationsReached;
          
          return (
            <label 
              key={destination.id}
              className={`
                flex items-center space-x-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200
                ${isSelected 
                  ? 'border-ocean-blue bg-ocean-blue/5 shadow-sm' 
                  : isDisabled
                    ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                    : 'border-gray-200 hover:border-ocean-blue/50 hover:bg-ocean-blue/5'
                }
              `}
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleToggleDestination(destination.id)}
                  disabled={isDisabled}
                  className="sr-only"
                />
                <div className={`
                  w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200
                  ${isSelected 
                    ? 'border-ocean-blue bg-ocean-blue' 
                    : isDisabled
                      ? 'border-gray-300 bg-gray-100'
                      : 'border-gray-300 hover:border-ocean-blue'
                  }
                `}>
                  {isSelected && (
                    <Check size={12} className="text-white" />
                  )}
                </div>
              </div>
              
              <div className="flex-1">
                <div className={`
                  font-semibold text-sm
                  ${isSelected ? 'text-ocean-blue' : isDisabled ? 'text-gray-400' : 'text-deep-cacao'}
                `}>
                  {destination.name}
                </div>
                <div className={`
                  text-xs mt-1
                  ${isSelected ? 'text-ocean-blue/70' : isDisabled ? 'text-gray-400' : 'text-driftwood-brown/70'}
                `}>
                  {destination.theme} • {destination.targetDuration}
                </div>
              </div>
            </label>
          );
        })}
      </div>

      {/* Selection Counter */}
      <div className="mt-3 text-xs text-driftwood-brown/70 text-center">
        {selectedCount}/4 destinations selected
      </div>
    </div>
  );
};

export default DestinationMultiSelect; 