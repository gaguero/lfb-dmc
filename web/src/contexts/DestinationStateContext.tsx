'use client';

/**
 * DestinationStateContext - Read-only Destination State Management
 * Part of the Context Splitting pattern to optimize performance
 * This context provides read-only access to destination state
 */

import { createContext, useContext, ReactNode } from 'react';
import { Destination } from '../types/destination';

/**
 * Interface for read-only destination state
 */
export interface DestinationState {
  /** Currently selected primary destination (from navbar) */
  primaryDestination: Destination | null;
  
  /** Array of all selected destinations (including primary) */
  selectedDestinations: Destination[];
  
  /** Check if maximum destinations have been selected (always false now - no limit) */
  isMaxDestinationsReached: boolean;
  
  /** Get the count of currently selected destinations */
  selectedCount: number;
}

/**
 * Create the React Context for destination state (read-only)
 * Initial value is null to force proper provider wrapping
 */
export const DestinationStateContext = createContext<DestinationState | null>(null);

/**
 * Display name for React DevTools debugging
 */
DestinationStateContext.displayName = 'DestinationStateContext';

/**
 * Props interface for the DestinationStateProvider component
 */
interface DestinationStateProviderProps {
  children: ReactNode;
  value: DestinationState;
}

/**
 * DestinationStateProvider Component
 * Provides read-only destination state to the application
 * This provider should be wrapped by DestinationActionsProvider
 */
export function DestinationStateProvider({ children, value }: DestinationStateProviderProps) {
  return (
    <DestinationStateContext.Provider value={value}>
      {children}
    </DestinationStateContext.Provider>
  );
}

/**
 * Hook for accessing destination state (read-only)
 * @throws Error if used outside of DestinationStateProvider
 */
export function useDestinationState(): DestinationState {
  const context = useContext(DestinationStateContext);
  
  if (context === null) {
    throw new Error(
      'useDestinationState must be used within a DestinationStateProvider. ' +
      'Make sure your component is wrapped with the destination providers.'
    );
  }
  
  return context;
}

/**
 * Selector hook for accessing only the primary destination
 * Optimized for components that only need primary destination
 */
export function usePrimaryDestinationState() {
  const { primaryDestination } = useDestinationState();
  return primaryDestination;
}

/**
 * Selector hook for accessing only the selected destinations array
 * Optimized for components that only need the destinations list
 */
export function useSelectedDestinations() {
  const { selectedDestinations } = useDestinationState();
  return selectedDestinations;
}

/**
 * Selector hook for accessing only the selection count
 * Optimized for components that only need count information
 */
export function useDestinationCount() {
  const { selectedCount, isMaxDestinationsReached } = useDestinationState();
  return { selectedCount, isMaxDestinationsReached };
} 