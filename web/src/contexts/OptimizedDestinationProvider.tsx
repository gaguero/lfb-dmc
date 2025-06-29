'use client';

/**
 * OptimizedDestinationProvider - Main Provider for Optimized Context System
 * Combines DestinationStateContext and DestinationActionsContext
 * Implements the Context Splitting pattern for better performance
 */

import { useState, useCallback, useEffect, useMemo, ReactNode } from 'react';
import { Destination } from '../types/destination';
import { destinations, DEFAULT_DESTINATION_ID } from '../data/destinations';
import { DestinationStateProvider, DestinationState } from './DestinationStateContext';
import { DestinationActionsProvider } from './DestinationActionsContext';

/**
 * Props interface for the OptimizedDestinationProvider component
 */
interface OptimizedDestinationProviderProps {
  children: ReactNode;
}

/**
 * OptimizedDestinationProvider Component
 * Manages the actual destination state and provides it to both contexts
 * Implements performance optimizations through context splitting
 */
export function OptimizedDestinationProvider({ children }: OptimizedDestinationProviderProps) {
  // Core state for destination management
  const [primaryDestination, setPrimaryDestinationState] = useState<Destination | null>(null);
  const [selectedDestinations, setSelectedDestinations] = useState<Destination[]>([]);
  
  // Initialize with default destination (Bocas del Toro) on mount
  useEffect(() => {
    const defaultDestination = destinations.find(dest => dest.id === DEFAULT_DESTINATION_ID);
    if (defaultDestination && !primaryDestination && selectedDestinations.length === 0) {
      setPrimaryDestinationState(defaultDestination);
      setSelectedDestinations([defaultDestination]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once on mount
  
  /**
   * Set the primary destination and ensure it's included in selected destinations
   * @param destination - The destination to set as primary
   */
  const setPrimaryDestination = useCallback((destination: Destination) => {
    setPrimaryDestinationState(destination);
    
    // Ensure primary destination is in the selected destinations
    setSelectedDestinations(current => {
      // If destination is already selected, just return current array
      if (current.some(dest => dest.id === destination.id)) {
        return current;
      }
      
      // Add destination to the beginning of the array
      return [destination, ...current];
    });
  }, []);
  
  /**
   * Set only this destination as selected (clear all others) - for navbar use
   * @param destination - The destination to set as the only selected destination
   */
  const setPrimaryDestinationOnly = useCallback((destination: Destination) => {
    setPrimaryDestinationState(destination);
    // Clear all selections and set only this destination
    setSelectedDestinations([destination]);
  }, []);
  
  /**
   * Add a destination to the selection (unlimited)
   * @param destination - The destination to add
   */
  const addDestination = useCallback((destination: Destination) => {
    setSelectedDestinations(current => {
      // Check if destination is already selected
      if (current.some(dest => dest.id === destination.id)) {
        return current;
      }
      
      // Add destination to selection (no limit)
      return [...current, destination];
    });
  }, []);
  
  /**
   * Remove a destination from the selection by ID
   * @param destinationId - The ID of the destination to remove
   */
  const removeDestination = useCallback((destinationId: string) => {
    setSelectedDestinations(current => {
      const filtered = current.filter(dest => dest.id !== destinationId);
      
      // If we removed the primary destination, clear it or set a new one
      setPrimaryDestinationState(currentPrimary => {
        if (currentPrimary?.id === destinationId) {
          // If we removed the primary destination
          if (filtered.length > 0) {
            return filtered[0]; // Set first remaining as primary
          } else {
            return null; // No destinations left
          }
        }
        return currentPrimary; // Keep current primary unchanged
      });
      
      return filtered;
    });
  }, []);
  
  /**
   * Clear all destination selections
   */
  const clearDestinations = useCallback(() => {
    setSelectedDestinations([]);
    setPrimaryDestinationState(null);
  }, []);
  
  // Computed values for UI logic - memoized to prevent unnecessary recalculations
  const selectedCount = selectedDestinations.length;
  const isMaxDestinationsReached = false; // No limit anymore
  
  // Memoize the state object to prevent unnecessary re-renders of state consumers
  const destinationState: DestinationState = useMemo(() => ({
    primaryDestination,
    selectedDestinations,
    isMaxDestinationsReached,
    selectedCount
  }), [primaryDestination, selectedDestinations, selectedCount]);
  
  return (
    <DestinationStateProvider value={destinationState}>
      <DestinationActionsProvider
        selectedDestinations={selectedDestinations}
        setPrimaryDestination={setPrimaryDestination}
        setPrimaryDestinationOnly={setPrimaryDestinationOnly}
        addDestination={addDestination}
        removeDestination={removeDestination}
        clearDestinations={clearDestinations}
      >
        {children}
      </DestinationActionsProvider>
    </DestinationStateProvider>
  );
} 