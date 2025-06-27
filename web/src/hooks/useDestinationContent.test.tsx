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
  useDestination: jest.fn(),
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <DestinationContext.DestinationProvider>
    {children}
  </DestinationContext.DestinationProvider>
);

describe('useDestinationContent', () => {
  let mockUseDestination: jest.MockedFunction<typeof DestinationContext.useDestination>;

  beforeEach(() => {
    mockUseDestination = DestinationContext.useDestination as jest.MockedFunction<typeof DestinationContext.useDestination>;
  });

  it('should return default content when no destination is selected', () => {
    mockUseDestination.mockReturnValue({
      primaryDestination: null,
      selectedDestinations: [],
      setPrimaryDestination: jest.fn(),
      addDestination: jest.fn(),
      removeDestination: jest.fn(),
      clearDestinations: jest.fn(),
      isDestinationSelected: jest.fn(),
      isMaxDestinationsReached: false,
      selectedCount: 0,
    });

    const { result } = renderHook(() => useDestinationContent(), { wrapper });
    
    expect(result.current.combinedDescription).toBe('');
    expect(result.current.suggestedDuration).toBe('3-5 days');
  });

  it('should return single destination content when one destination is selected', () => {
    const bocasDelToro = mockDestinations[0];
    
    mockUseDestination.mockReturnValue({
      primaryDestination: bocasDelToro,
      selectedDestinations: [bocasDelToro],
      setPrimaryDestination: jest.fn(),
      addDestination: jest.fn(),
      removeDestination: jest.fn(),
      clearDestinations: jest.fn(),
      isDestinationSelected: jest.fn(),
      isMaxDestinationsReached: false,
      selectedCount: 1,
    });

    const { result } = renderHook(() => useDestinationContent(), { wrapper });
    
    expect(result.current.combinedDescription).toBe(bocasDelToro.description);
    expect(result.current.suggestedDuration).toBe('3-5 days');
  });

  it('should return combined content when multiple destinations are selected', () => {
    const bocasDelToro = mockDestinations[0];
    const sanBlas = mockDestinations[1];
    
    mockUseDestination.mockReturnValue({
      primaryDestination: bocasDelToro,
      selectedDestinations: [bocasDelToro, sanBlas],
      setPrimaryDestination: jest.fn(),
      addDestination: jest.fn(),
      removeDestination: jest.fn(),
      clearDestinations: jest.fn(),
      isDestinationSelected: jest.fn(),
      isMaxDestinationsReached: false,
      selectedCount: 2,
    });

    const { result } = renderHook(() => useDestinationContent(), { wrapper });
    
    expect(result.current.combinedDescription).toContain(bocasDelToro.name);
    expect(result.current.combinedDescription).toContain(sanBlas.name);
    expect(result.current.suggestedDuration).toBe('5-7 days');
  });

  it('should return appropriate duration for 3+ destinations', () => {
    const bocasDelToro = mockDestinations[0];
    const sanBlas = mockDestinations[1];
    const mountainsAndVolcanoes = mockDestinations[2];
    
    mockUseDestination.mockReturnValue({
      primaryDestination: bocasDelToro,
      selectedDestinations: [bocasDelToro, sanBlas, mountainsAndVolcanoes],
      setPrimaryDestination: jest.fn(),
      addDestination: jest.fn(),
      removeDestination: jest.fn(),
      clearDestinations: jest.fn(),
      isDestinationSelected: jest.fn(),
      isMaxDestinationsReached: false,
      selectedCount: 3,
    });

    const { result } = renderHook(() => useDestinationContent(), { wrapper });
    
    expect(result.current.suggestedDuration).toBe('7-10 days');
  });
}); 