import { useMemo } from 'react';
import { useDestinations } from '../contexts/DestinationContext';

/**
 * A custom hook to generate dynamic content based on selected destinations.
 * It provides a combined description and a suggested trip duration.
 *
 * @returns {object} An object containing the combinedDescription and suggestedDuration.
 * @property {string} combinedDescription - A dynamically generated description based on the selected destinations.
 * @property {string} suggestedDuration - A dynamically calculated trip duration based on the selected destinations.
 */
export const useDestinationContent = () => {
  const { primaryDestination, selectedDestinations } = useDestinations();

  /**
   * Generates a combined description for the selected destinations.
   * - If no primary destination, returns an empty string.
   * - If one destination is selected, returns its description.
   * - If multiple destinations are selected, creates a narrative combining them.
   */
  const combinedDescription = useMemo(() => {
    if (!primaryDestination) return '';
    if (selectedDestinations.length === 0) return primaryDestination.description;
    if (selectedDestinations.length === 1) {
        const singleDest = selectedDestinations[0];
        return singleDest ? singleDest.description : primaryDestination.description;
    }

    const destinationNames = selectedDestinations.map(d => d.name).join(', ');
    const primaryTheme = primaryDestination.theme;
    const activities = selectedDestinations
      .flatMap(d => d.primaryActivities)
      .filter((v, i, a) => a.indexOf(v) === i)
      .slice(0, 3)
      .join(', ');

    return `Experience the best of ${destinationNames} in one unforgettable journey. From ${primaryTheme} to diverse adventures including ${activities}, this multi-destination experience showcases Panama's incredible diversity.`;
  }, [primaryDestination, selectedDestinations]);

  /**
   * Calculates the suggested trip duration based on the selected destinations.
   * - If no destinations are selected, it defaults to the primary destination's duration.
   * - It sums the minimum duration of each selected destination.
   */
  const suggestedDuration = useMemo(() => {
    if (selectedDestinations.length === 0) return primaryDestination?.targetDuration || '3-4 days';
    
    const totalDays = selectedDestinations.reduce((sum, dest) => {
      const days = parseInt(dest.targetDuration.split('-')[0]);
      return sum + days;
    }, 0);

    return `${totalDays}-${totalDays + selectedDestinations.length} days`;
  }, [selectedDestinations, primaryDestination]);

  return { combinedDescription, suggestedDuration };
}; 