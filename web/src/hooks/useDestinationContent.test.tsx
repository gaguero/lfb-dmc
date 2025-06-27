import { renderHook } from '@testing-library/react';
import { useDestinationContent } from './useDestinationContent';
import * as DestinationContext from '../contexts/DestinationContext';
import { destinations } from '../data/destinations';
import { ReactNode } from 'react';

const mockDestinations = destinations;

// Mock the entire context module
jest.mock('../contexts/DestinationContext', () => ({
  __esModule: true,
  ...jest.requireActual('../contexts/DestinationContext'), // import and retain default exports
  useDestinations: jest.fn(),
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <DestinationContext.DestinationProvider>
    {children}
  </DestinationContext.DestinationProvider>
);

describe('useDestinationContent', () => {
  const mockedUseDestinations = DestinationContext.useDestinations as jest.Mock;

  beforeEach(() => {
    // Reset mocks before each test
    mockedUseDestinations.mockClear();
  });

  it('should return default content when no destination is selected', () => {
    mockedUseDestinations.mockReturnValue({
      primaryDestination: mockDestinations[0],
      selectedDestinations: [],
    });

    const { result } = renderHook(() => useDestinationContent(), { wrapper });

    expect(result.current.combinedDescription).toBe(mockDestinations[0].description);
    expect(result.current.suggestedDuration).toBe(mockDestinations[0].targetDuration);
  });

  it('should return content for a single selected destination', () => {
    mockedUseDestinations.mockReturnValue({
      primaryDestination: mockDestinations[0],
      selectedDestinations: [mockDestinations[0]],
    });

    const { result } = renderHook(() => useDestinationContent(), { wrapper });

    expect(result.current.combinedDescription).toBe(mockDestinations[0].description);
  });

  it('should generate combined content for multiple destinations', () => {
    const selected = [mockDestinations[0], mockDestinations[1]];
    mockedUseDestinations.mockReturnValue({
      primaryDestination: mockDestinations[0],
      selectedDestinations: selected,
    });

    const { result } = renderHook(() => useDestinationContent(), { wrapper });

    expect(result.current.combinedDescription).toContain(mockDestinations[0].name);
    expect(result.current.combinedDescription).toContain(mockDestinations[1].name);
    expect(result.current.combinedDescription).toContain('unforgettable journey');
  });

  it('should calculate suggested duration correctly for multiple destinations', () => {
    const selected = [mockDestinations[0], mockDestinations[1]]; // Eg: 3-4 days and 2-3 days
    mockedUseDestinations.mockReturnValue({
      primaryDestination: mockDestinations[0],
      selectedDestinations: selected,
    });

    const { result } = renderHook(() => useDestinationContent(), { wrapper });

    const firstDuration = parseInt(mockDestinations[0].targetDuration.split('-')[0]);
    const secondDuration = parseInt(mockDestinations[1].targetDuration.split('-')[0]);
    const expectedMin = firstDuration + secondDuration;
    const expectedMax = expectedMin + selected.length;

    expect(result.current.suggestedDuration).toBe(`${expectedMin}-${expectedMax} days`);
  });
}); 