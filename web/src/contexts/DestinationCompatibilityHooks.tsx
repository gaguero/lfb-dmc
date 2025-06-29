'use client';

/**
 * DestinationCompatibilityHooks - Backward Compatibility Layer
 * Provides the same API as the original DestinationContext while using
 * the optimized context splitting system underneath
 */

import { useCallback, useMemo } from 'react';
import { Destination } from '../types/destination';
import { useDestinationState } from './DestinationStateContext';
import { useDestinationActions } from './DestinationActionsContext';
import { MAX_DESTINATIONS } from '../data/destinations';

/**
 * Original context type interface for backward compatibility
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
 * Compatibility hook that provides the same API as the original useDestination
 * Uses the optimized context system underneath
 * @throws Error if used outside of OptimizedDestinationProvider
 */
export function useDestination(): DestinationContextType {
  const state = useDestinationState();
  const actions = useDestinationActions();
  
  // Combine state and actions to match the original API
  const compatibilityContext: DestinationContextType = useMemo(() => ({
    ...state,
    ...actions
  }), [state, actions]);
  
  return compatibilityContext;
}

/**
 * Compatibility hook for destination selection management
 * Provides simplified interface for components that only need selection functionality
 * @returns Object with selection state and management functions
 */
export function useDestinationSelection() {
  const { selectedDestinations, selectedCount, isMaxDestinationsReached } = useDestinationState();
  const {
    addDestination,
    removeDestination,
    clearDestinations,
    isDestinationSelected,
    toggleDestination,
    canAddDestination
  } = useDestinationActions();

  /**
   * Check if a destination can be added (not at max capacity and not already selected)
   */
  const canSelectMore = !isMaxDestinationsReached;

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
    canSelectMore
  };
}

/**
 * Compatibility hook for accessing primary destination state and management
 * Useful for components that only need to work with the primary destination
 */
export function usePrimaryDestination() {
  const { primaryDestination } = useDestinationState();
  const { setPrimaryDestination, setPrimaryDestinationOnly } = useDestinationActions();
  
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