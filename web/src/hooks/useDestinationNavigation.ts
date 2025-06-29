import { useCallback } from 'react';
import { useDestination } from '../contexts/DestinationCompatibilityHooks';
import { Destination } from '../types/destination';
import { destinations } from '../data/destinations';

/**
 * A custom hook for handling destination navigation and routing logic.
 * Provides utilities for navigating between destinations and managing navigation state.
 *
 * @returns {object} An object containing navigation utilities and state.
 */
export const useDestinationNavigation = () => {
  const { 
    setPrimaryDestination, 
    setPrimaryDestinationOnly,
    primaryDestination,
    selectedDestinations 
  } = useDestination();

  /**
   * Navigate to a specific destination by ID
   * Sets it as the primary destination and includes it in selections
   * @param destinationId - The ID of the destination to navigate to
   */
  const navigateToDestination = useCallback((destinationId: string) => {
    const destination = destinations.find(d => d.id === destinationId);
    if (destination) {
      setPrimaryDestination(destination);
    }
  }, [setPrimaryDestination]);

  /**
   * Navigate to a destination and make it the only selection (navbar behavior)
   * Clears all other selections and sets this as the only destination
   * @param destinationId - The ID of the destination to navigate to exclusively
   */
  const navigateToDestinationOnly = useCallback((destinationId: string) => {
    const destination = destinations.find(d => d.id === destinationId);
    if (destination) {
      setPrimaryDestinationOnly(destination);
    }
  }, [setPrimaryDestinationOnly]);

  /**
   * Navigate to a destination object directly
   * @param destination - The destination object to navigate to
   */
  const navigateToDestinationDirect = useCallback((destination: Destination) => {
    setPrimaryDestination(destination);
  }, [setPrimaryDestination]);

  /**
   * Navigate to a destination and make it the only selection
   * @param destination - The destination object to navigate to exclusively
   */
  const navigateToDestinationOnlyDirect = useCallback((destination: Destination) => {
    setPrimaryDestinationOnly(destination);
  }, [setPrimaryDestinationOnly]);

  /**
   * Get navigation state information
   * @returns Object with current navigation state
   */
  const getNavigationState = useCallback(() => {
    return {
      currentDestination: primaryDestination,
      hasMultipleDestinations: selectedDestinations.length > 1,
      destinationCount: selectedDestinations.length,
      canNavigateBack: selectedDestinations.length > 0,
      availableDestinations: destinations
    };
  }, [primaryDestination, selectedDestinations]);

  /**
   * Check if a destination is currently active (primary)
   * @param destinationId - The ID to check
   * @returns Boolean indicating if the destination is currently primary
   */
  const isDestinationActive = useCallback((destinationId: string) => {
    return primaryDestination?.id === destinationId;
  }, [primaryDestination]);

  /**
   * Get the next destination in the list (for navigation controls)
   * @returns The next destination object or null if at the end
   */
  const getNextDestination = useCallback(() => {
    if (!primaryDestination) return destinations[0] || null;
    
    const currentIndex = destinations.findIndex(d => d.id === primaryDestination.id);
    const nextIndex = (currentIndex + 1) % destinations.length;
    return destinations[nextIndex];
  }, [primaryDestination]);

  /**
   * Get the previous destination in the list (for navigation controls)
   * @returns The previous destination object or null if at the beginning
   */
  const getPreviousDestination = useCallback(() => {
    if (!primaryDestination) return destinations[destinations.length - 1] || null;
    
    const currentIndex = destinations.findIndex(d => d.id === primaryDestination.id);
    const prevIndex = currentIndex === 0 ? destinations.length - 1 : currentIndex - 1;
    return destinations[prevIndex];
  }, [primaryDestination]);

  return {
    // Navigation actions
    navigateToDestination,
    navigateToDestinationOnly,
    navigateToDestinationDirect,
    navigateToDestinationOnlyDirect,
    
    // Navigation state
    getNavigationState,
    isDestinationActive,
    
    // Navigation controls
    getNextDestination,
    getPreviousDestination,
    
    // Convenience properties
    currentDestination: primaryDestination,
    hasMultipleDestinations: selectedDestinations.length > 1
  };
}; 