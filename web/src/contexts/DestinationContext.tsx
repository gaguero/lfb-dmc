'use client';

/**
 * DestinationContext - React Context for Global Destination State Management
 * Manages primary destination selection and multi-destination combinations
 */

import { createContext, useState, useCallback, useContext, useMemo, useEffect } from 'react';
import { Destination } from '../types/destination';
import { MAX_DESTINATIONS, destinations, DEFAULT_DESTINATION_ID } from '../data/destinations';

/**
 * Context type interface defining all available destination management functions
 * and state properties for the global destination context
 */
export interface DestinationContextType {
  /** Currently selected primary destination (from navbar) */
  primaryDestination: Destination | null;
  
  /** Array of all selected destinations (including primary) - unlimited */
  selectedDestinations: Destination[];
  
  /** Set the primary destination (main destination context) */
  setPrimaryDestination: (destination: Destination) => void;
  
  /** Set only this destination as selected (clear all others) - for navbar use */
  setPrimaryDestinationOnly: (destination: Destination) => void;
  
  /** Add a destination to the selection (unlimited) */
  addDestination: (destination: Destination) => void;
  
  /** Remove a destination from the selection by ID */
  removeDestination: (destinationId: string) => void;
  
  /** Clear all destination selections */
  clearDestinations: () => void;
  
  /** Check if a specific destination is currently selected */
  isDestinationSelected: (destinationId: string) => boolean;
  
  /** Check if maximum destinations have been selected (always false now - no limit) */
  isMaxDestinationsReached: boolean;
  
  /** Get the count of currently selected destinations */
  selectedCount: number;
}

/**
 * Create the React Context for destination management
 * Initial value is undefined to force proper provider wrapping
 */
export const DestinationContext = createContext<DestinationContextType | undefined>(undefined);

/**
 * Display name for React DevTools debugging
 */
DestinationContext.displayName = 'DestinationContext';

/**
 * Props interface for the DestinationProvider component
 */
interface DestinationProviderProps {
  children: React.ReactNode;
}

/**
 * DestinationProvider Component
 * Provides global destination state management to the entire application
 * Implements all destination selection logic and validation rules
 */
export function DestinationProvider({ children }: DestinationProviderProps) {
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
      
      // No limit - just add to the beginning
      
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
      // Access current primary destination through state updater
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
  }, []); // Remove primaryDestination from dependencies to prevent infinite loop
  
  /**
   * Clear all destination selections
   */
  const clearDestinations = useCallback(() => {
    setSelectedDestinations([]);
    setPrimaryDestinationState(null);
  }, []);
  
  /**
   * Check if a specific destination is currently selected
   * @param destinationId - The ID of the destination to check
   * @returns boolean indicating if destination is selected
   */
  const isDestinationSelected = useCallback((destinationId: string): boolean => {
    return selectedDestinations.some(dest => dest.id === destinationId);
  }, [selectedDestinations]);
  
  // Computed values for UI logic
  const isMaxDestinationsReached = false; // No limit anymore
  const selectedCount = selectedDestinations.length;
  
  // Context value object containing all state and functions - memoized to prevent infinite re-renders
  // Only include state values in dependencies, not memoized functions
  const contextValue: DestinationContextType = useMemo(() => ({
    primaryDestination,
    selectedDestinations,
    setPrimaryDestination,
    setPrimaryDestinationOnly,
    addDestination,
    removeDestination,
    clearDestinations,
    isDestinationSelected,
    isMaxDestinationsReached,
    selectedCount
  }), [
    primaryDestination,
    selectedDestinations,
    selectedCount
  ]);
  
  return (
    <DestinationContext.Provider value={contextValue}>
      {children}
    </DestinationContext.Provider>
  );
}

/**
 * Custom Hooks for Easy Context Consumption
 */

/**
 * Primary hook for accessing destination context
 * Provides access to all destination state and management functions
 * @throws Error if used outside of DestinationProvider
 */
export function useDestination(): DestinationContextType {
  const context = useContext(DestinationContext);
  
  if (context === undefined) {
    throw new Error(
      'useDestination must be used within a DestinationProvider. ' +
      'Make sure your component is wrapped with <DestinationProvider>.'
    );
  }
  
  return context;
}

/**
 * Specialized hook for destination selection management
 * Provides simplified interface for components that only need selection functionality
 * @returns Object with selection state and management functions
 */
export function useDestinationSelection() {
  const {
    selectedDestinations,
    addDestination,
    removeDestination,
    clearDestinations,
    isDestinationSelected,
    isMaxDestinationsReached,
    selectedCount
  } = useDestination();

  /**
   * Toggle a destination's selection status
   * Adds if not selected, removes if selected
   */
  const toggleDestination = useCallback((destination: Destination) => {
    if (isDestinationSelected(destination.id)) {
      removeDestination(destination.id);
    } else {
      addDestination(destination);
    }
  }, [isDestinationSelected, removeDestination, addDestination]);

  /**
   * Check if a destination can be added (not at max capacity and not already selected)
   */
  const canAddDestination = useCallback((destinationId: string) => {
    return !isMaxDestinationsReached && !isDestinationSelected(destinationId);
  }, [isMaxDestinationsReached, isDestinationSelected]);

  /**
   * Get the selection status for UI display
   */
  const getSelectionStatus = useCallback(() => {
    const count = selectedCount;
    const max = MAX_DESTINATIONS;
    
    return {
      count,
      max,
      isAtCapacity: count >= max,
      canSelectMore: count < max,
      percentage: Math.round((count / max) * 100)
    };
  }, [selectedCount]);

  return {
    // State
    selectedDestinations,
    selectedCount,
    
    // Actions
    addDestination,
    removeDestination,
    clearDestinations,
    toggleDestination,
    
    // Helpers
    isDestinationSelected,
    canAddDestination,
    getSelectionStatus,
    
    // Status
    isMaxDestinationsReached,
    canSelectMore: !isMaxDestinationsReached
  };
}

/**
 * Hook for accessing primary destination state and management
 * Useful for components that only need to work with the primary destination
 */
export function usePrimaryDestination() {
  const { primaryDestination, setPrimaryDestination, setPrimaryDestinationOnly } = useDestination();
  
  /**
   * Check if a specific destination is the primary destination
   */
  const isPrimaryDestination = useCallback((destinationId: string) => {
    return primaryDestination?.id === destinationId;
  }, [primaryDestination]);

  return {
    primaryDestination,
    setPrimaryDestination,
    setPrimaryDestinationOnly,
    isPrimaryDestination,
    hasPrimaryDestination: primaryDestination !== null
  };
}