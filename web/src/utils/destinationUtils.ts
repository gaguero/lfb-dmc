/**
 * Destination Utility Functions
 * Helper functions for manipulating and accessing destination data
 */

import { Destination, DestinationCombination } from '../types/destination';
import { destinations } from '../data/destinations';

/**
 * Get a destination by its unique ID
 * @param id - The destination ID to search for
 * @returns The destination object or null if not found
 */
export function getDestinationById(id: string): Destination | null {
  const destination = destinations.find(dest => dest.id === id);
  return destination || null;
}

/**
 * Get all destinations that match a specific theme
 * @param theme - The theme to filter by (e.g., 'Caribbean', 'Mountain', etc.)
 * @returns Array of destinations matching the theme
 */
export function getDestinationsByTheme(theme: string): Destination[] {
  return destinations.filter(dest => 
    dest.theme.toLowerCase() === theme.toLowerCase()
  );
}

/**
 * Get destinations that offer a specific activity
 * @param activity - The activity to search for in primaryActivities
 * @returns Array of destinations that offer the specified activity
 */
export function filterDestinationsByActivity(activity: string): Destination[] {
  return destinations.filter(dest =>
    dest.primaryActivities.some(act => 
      act.toLowerCase().includes(activity.toLowerCase())
    )
  );
}

/**
 * Get multiple destinations by their IDs
 * @param ids - Array of destination IDs to retrieve
 * @returns Array of found destinations (excludes any not found)
 */
export function getDestinationsByIds(ids: string[]): Destination[] {
  return ids
    .map(id => getDestinationById(id))
    .filter((dest): dest is Destination => dest !== null);
}

/**
 * Create a destination combination from selected destination IDs
 * @param destinationIds - Array of destination IDs to combine (1-4 destinations)
 * @param primaryDestinationId - Optional primary destination ID (defaults to first ID)
 * @returns DestinationCombination object or null if invalid input
 */
export function combineDestinations(
  destinationIds: string[], 
  primaryDestinationId?: string
): DestinationCombination | null {
  // Validate input
  if (!destinationIds || destinationIds.length === 0 || destinationIds.length > 4) {
    return null;
  }

  // Get destination objects to validate they exist
  const selectedDestinations = getDestinationsByIds(destinationIds);
  
  // Ensure all destinations were found
  if (selectedDestinations.length !== destinationIds.length) {
    return null;
  }

  // Determine primary destination
  const primary = primaryDestinationId || destinationIds[0];
  if (!destinationIds.includes(primary)) {
    return null;
  }

  // Combine descriptions
  const combinedDescription = generateCombinedDescription(selectedDestinations);

  // Merge activities (unique only)
  const allActivities = selectedDestinations.flatMap(dest => dest.primaryActivities);
  const uniqueActivities = [...new Set(allActivities)];

  // Merge highlights (unique only)
  const allHighlights = selectedDestinations.flatMap(dest => dest.keyHighlights);
  const uniqueHighlights = [...new Set(allHighlights)];

  // Calculate suggested duration
  const suggestedDuration = calculateCombinedDuration(selectedDestinations);

  return {
    primaryDestination: primary,
    selectedDestinations: destinationIds,
    combinedDescription,
    suggestedDuration,
    combinedActivities: uniqueActivities,
    combinedHighlights: uniqueHighlights
  };
}



/**
 * Generate a combined description for multiple destinations
 * @param destinations - Array of destination objects
 * @returns Combined description text
 */
function generateCombinedDescription(destinations: Destination[]): string {
  if (destinations.length === 1) {
    return destinations[0].description;
  }

  const themes = destinations.map(d => d.theme).join(', ');
  const destinationNames = destinations.map(d => d.name);
  
  let description = `Experience the best of Panama with this incredible journey combining ${themes.toLowerCase()} adventures. `;
  
  description += `Discover ${destinationNames.slice(0, -1).join(', ')}`;
  if (destinationNames.length > 1) {
    description += ` and ${destinationNames[destinationNames.length - 1]}`;
  }
  
  description += ` in one unforgettable multi-destination experience that showcases Panama's incredible diversity.`;
  
  return description;
}

/**
 * Calculate suggested duration for combined destinations
 * @param destinations - Array of destination objects
 * @returns Suggested duration string
 */
function calculateCombinedDuration(destinations: Destination[]): string {
  if (destinations.length === 1) {
    return destinations[0].targetDuration;
  }

  // Extract minimum days from each destination
  const totalMinDays = destinations.reduce((total, dest) => {
    const match = dest.targetDuration.match(/(\d+)-?/);
    const minDays = match ? parseInt(match[1]) : 2;
    return total + minDays;
  }, 0);

  // Add buffer day for combinations of 3+ destinations
  const bufferDays = destinations.length >= 3 ? 1 : 0;
  const totalDays = totalMinDays + bufferDays;

  return `${totalDays}-${totalDays + 2} days`;
}

/**
 * Check if a destination combination is valid
 * @param destinationIds - Array of destination IDs
 * @returns Boolean indicating if combination is valid
 */
export function isValidDestinationCombination(destinationIds: string[]): boolean {
  return destinationIds.length > 0 && 
         destinationIds.length <= 4 && 
         getDestinationsByIds(destinationIds).length === destinationIds.length;
}

/**
 * Get all available destination themes
 * @returns Array of unique themes
 */
export function getAllDestinationThemes(): string[] {
  const themes = destinations.map(dest => dest.theme);
  return [...new Set(themes)];
}

/**
 * Get all available activities across all destinations
 * @returns Array of unique activities
 */
export function getAllActivities(): string[] {
  const activities = destinations.flatMap(dest => dest.primaryActivities);
  return [...new Set(activities)];
} 