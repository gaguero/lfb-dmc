/**
 * TypeScript interfaces for the Multi-Destination DMC System
 * Defines data structures for Panama destinations and related functionality
 */

/**
 * Represents a single destination with all required properties
 */
export interface Destination {
  /** Unique identifier for the destination */
  id: string;
  /** Full display name of the destination */
  name: string;
  /** Detailed description for use in hero section and content areas */
  description: string;
  /** Short description for cards and compact displays */
  shortDescription: string;
  /** Main hero image URL for desktop displays */
  image: string;
  /** Optimized image URL for mobile displays */
  mobileImage: string;
  /** Thematic category (e.g., "Caribbean", "Mountain", "Urban") */
  theme: string;
  /** List of primary activities available at this destination */
  primaryActivities: string[];
  /** Suggested duration for visiting this destination */
  targetDuration: string;
  /** Key highlights and attractions for this destination */
  keyHighlights: string[];
}

/**
 * Represents a combination of destinations selected by the user
 */
export interface DestinationCombination {
  /** The primary destination selected from navbar */
  primaryDestination: string;
  /** Array of destination IDs selected by the user (including primary) */
  selectedDestinations: string[];
  /** Generated description that combines multiple destinations */
  combinedDescription: string;
  /** Suggested total duration for the combined experience */
  suggestedDuration: string;
  /** Combined activities from all selected destinations */
  combinedActivities?: string[];
  /** Combined highlights from all selected destinations */
  combinedHighlights?: string[];
}

/**
 * Context state interface for destination management
 */
export interface DestinationState {
  /** Currently selected primary destination */
  primaryDestination: Destination | null;
  /** Array of all selected destinations (including primary) */
  selectedDestinations: Destination[];
  /** Current combination data */
  currentCombination: DestinationCombination | null;
  /** Loading state for async operations */
  isLoading: boolean;
  /** Error state for error handling */
  error: string | null;
}

/**
 * Action types for destination state management
 */
export type DestinationAction =
  | { type: 'SET_PRIMARY_DESTINATION'; payload: Destination }
  | { type: 'ADD_DESTINATION'; payload: Destination }
  | { type: 'REMOVE_DESTINATION'; payload: string }
  | { type: 'CLEAR_DESTINATIONS' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_COMBINATION'; payload: DestinationCombination };

/**
 * Content template for generating dynamic descriptions
 */
export interface ContentTemplate {
  /** Template for single destination */
  single: string;
  /** Template for two destinations */
  dual: string;
  /** Template for three destinations */
  triple: string;
  /** Template for four or more destinations */
  multiple: string;
} 