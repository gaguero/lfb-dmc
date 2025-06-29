'use client';

/**
 * DestinationActionsContext - Destination State Actions
 * Part of the Context Splitting pattern to optimize performance
 * This context provides state-modifying actions for destination management
 */

import { createContext, useContext, ReactNode, useCallback, useMemo } from 'react';
import { Destination } from '../types/destination';

/**
 * Interface for destination management actions
 */
export interface DestinationActions {
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
  
  /** Toggle a destination's selection status */
  toggleDestination: (destination: Destination) => void;
  
  /** Check if a destination can be added */
  canAddDestination: (destinationId: string) => boolean;
}

/**
 * Create the React Context for destination actions
 * Initial value is null to force proper provider wrapping
 */
export const DestinationActionsContext = createContext<DestinationActions | null>(null);

/**
 * Display name for React DevTools debugging
 */
DestinationActionsContext.displayName = 'DestinationActionsContext';

/**
 * Props interface for the DestinationActionsProvider component
 */
interface DestinationActionsProviderProps {
  children: ReactNode;
  selectedDestinations: Destination[];
  setPrimaryDestination: (destination: Destination) => void;
  setPrimaryDestinationOnly: (destination: Destination) => void;
  addDestination: (destination: Destination) => void;
  removeDestination: (destinationId: string) => void;
  clearDestinations: () => void;
}

/**
 * DestinationActionsProvider Component
 * Provides destination management actions to the application
 * Actions are memoized to prevent unnecessary re-renders
 */
export function DestinationActionsProvider({
  children,
  selectedDestinations,
  setPrimaryDestination,
  setPrimaryDestinationOnly,
  addDestination,
  removeDestination,
  clearDestinations
}: DestinationActionsProviderProps) {
  
  /**
   * Check if a specific destination is currently selected
   * Memoized to prevent recreation on every render
   */
  const isDestinationSelected = useCallback((destinationId: string): boolean => {
    return selectedDestinations.some(dest => dest.id === destinationId);
  }, [selectedDestinations]);
  
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
   * Check if a destination can be added (not already selected)
   * No limit anymore, so only check if already selected
   */
  const canAddDestination = useCallback((destinationId: string) => {
    return !isDestinationSelected(destinationId);
  }, [isDestinationSelected]);
  
  // Memoize the actions object to prevent unnecessary re-renders
  // Only recreate when the underlying functions change
  const actions: DestinationActions = useMemo(() => ({
    setPrimaryDestination,
    setPrimaryDestinationOnly,
    addDestination,
    removeDestination,
    clearDestinations,
    isDestinationSelected,
    toggleDestination,
    canAddDestination
  }), [
    setPrimaryDestination,
    setPrimaryDestinationOnly,
    addDestination,
    removeDestination,
    clearDestinations,
    isDestinationSelected,
    toggleDestination,
    canAddDestination
  ]);
  
  return (
    <DestinationActionsContext.Provider value={actions}>
      {children}
    </DestinationActionsContext.Provider>
  );
}

/**
 * Hook for accessing destination actions
 * @throws Error if used outside of DestinationActionsProvider
 */
export function useDestinationActions(): DestinationActions {
  const context = useContext(DestinationActionsContext);
  
  if (context === null) {
    throw new Error(
      'useDestinationActions must be used within a DestinationActionsProvider. ' +
      'Make sure your component is wrapped with the destination providers.'
    );
  }
  
  return context;
}

/**
 * Selector hook for accessing only selection-related actions
 * Optimized for components that only need selection management
 */
export function useDestinationSelectionActions() {
  const {
    addDestination,
    removeDestination,
    clearDestinations,
    isDestinationSelected,
    toggleDestination,
    canAddDestination
  } = useDestinationActions();
  
  return {
    addDestination,
    removeDestination,
    clearDestinations,
    isDestinationSelected,
    toggleDestination,
    canAddDestination
  };
}

/**
 * Selector hook for accessing only primary destination actions
 * Optimized for components that only need primary destination management
 */
export function usePrimaryDestinationActions() {
  const { setPrimaryDestination, setPrimaryDestinationOnly } = useDestinationActions();
  
  return {
    setPrimaryDestination,
    setPrimaryDestinationOnly
  };
} 