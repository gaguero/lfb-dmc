import { useMemo } from 'react';
import { useDestination } from '../contexts/DestinationContext';

/**
 * A custom hook to generate dynamic content based on selected destinations.
 * It provides a combined description and a suggested trip duration.
 *
 * @returns {object} An object containing the combinedDescription and suggestedDuration.
 * @property {string} combinedDescription - A dynamically generated description based on the selected destinations.
 * @property {string} suggestedDuration - A dynamically calculated trip duration based on the selected destinations.
 */
export const useDestinationContent = () => {
  const { primaryDestination, selectedDestinations } = useDestination();

  /**
   * Generates a combined description for the selected destinations.
   * - If no primary destination, returns an empty string.
   * - If one destination is selected, returns its description.
   * - If multiple destinations are selected, combines their descriptions intelligently.
   */
  const combinedDescription = useMemo(() => {
    if (!primaryDestination) return '';
    
    if (selectedDestinations.length === 1) {
      return primaryDestination.description;
    }
    
    if (selectedDestinations.length > 1) {
      const otherDestinations = selectedDestinations
        .filter(dest => dest.id !== primaryDestination.id)
        .map(dest => dest.name);
      
      if (otherDestinations.length === 1) {
        return `Experience the best of ${primaryDestination.name} and ${otherDestinations[0]}. ${primaryDestination.description}`;
      } else if (otherDestinations.length > 1) {
        const lastDestination = otherDestinations.pop();
        return `Discover ${primaryDestination.name}, ${otherDestinations.join(', ')}, and ${lastDestination}. ${primaryDestination.description}`;
      }
    }
    
    return primaryDestination.description;
  }, [primaryDestination, selectedDestinations]);

  /**
   * Calculates a suggested trip duration based on the number of selected destinations.
   * - 1 destination: 3-5 days
   * - 2 destinations: 5-7 days
   * - 3+ destinations: 7-10 days
   */
  const suggestedDuration = useMemo(() => {
    const count = selectedDestinations.length;
    
    if (count === 1) return '3-5 days';
    if (count === 2) return '5-7 days';
    if (count >= 3) return '7-10 days';
    
    return '3-5 days'; // fallback
  }, [selectedDestinations.length]);

  return {
    combinedDescription,
    suggestedDuration
  };
}; 