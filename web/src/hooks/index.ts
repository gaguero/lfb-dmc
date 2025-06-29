/**
 * Custom Hooks Barrel Export
 * 
 * This file exports all custom hooks for easy importing throughout the application.
 * Import hooks like: import { useDestinationContent, useDestinationImages } from '@/hooks';
 */

export { useDestinationContent } from './useDestinationContent';
export { useDestinationImages } from './useDestinationImages';
export { useDestinationNavigation } from './useDestinationNavigation';
export { useDebounce, useDebouncedCallback } from './useDebounce';
export { usePerformance } from './usePerformance';

// Re-export context hooks for convenience
export { 
  useDestination, 
  useDestinationSelection, 
  usePrimaryDestination 
} from '../contexts/DestinationContext'; 