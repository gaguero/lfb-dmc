import { renderHook } from '@testing-library/react';
import { useDestinationNavigation } from './useDestinationNavigation';
import { useDestination } from '../contexts/DestinationContext';
import { Destination } from '../types/destination';

// Mock the context
jest.mock('../contexts/DestinationContext');

const mockDestinations: Destination[] = [
  {
    id: 'dest-1',
    name: 'Destination 1',
    image: '/dest1.jpg',
    description: 'First destination',
    features: ['feature1'],
    suggestedDuration: '2-3 days'
  },
  {
    id: 'dest-2',
    name: 'Destination 2',
    image: '/dest2.jpg',
    description: 'Second destination',
    features: ['feature2'],
    suggestedDuration: '3-4 days'
  },
  {
    id: 'dest-3',
    name: 'Destination 3',
    image: '/dest3.jpg',
    description: 'Third destination',
    features: ['feature3'],
    suggestedDuration: '4-5 days'
  }
];

const mockUseDestination = useDestination as jest.MockedFunction<typeof useDestination>;

describe('useDestinationNavigation', () => {
  const mockSetPrimaryDestination = jest.fn();
  const mockSetPrimaryDestinationOnly = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDestination.mockReturnValue({
      destinations: mockDestinations,
      setPrimaryDestination: mockSetPrimaryDestination,
      setPrimaryDestinationOnly: mockSetPrimaryDestinationOnly,
      primaryDestination: mockDestinations[0],
      selectedDestinations: [mockDestinations[0], mockDestinations[1]],
      currentDestination: mockDestinations[0],
      selectDestination: jest.fn(),
      deselectDestination: jest.fn(),
      toggleDestination: jest.fn(),
      clearSelections: jest.fn(),
      isDestinationSelected: jest.fn()
    });
  });

  it('should return navigation utilities', () => {
    const { result } = renderHook(() => useDestinationNavigation());

    expect(result.current).toHaveProperty('navigateToDestination');
    expect(result.current).toHaveProperty('navigateToDestinationOnly');
    expect(result.current).toHaveProperty('navigateToDestinationDirect');
    expect(result.current).toHaveProperty('navigateToDestinationOnlyDirect');
    expect(result.current).toHaveProperty('getNavigationState');
    expect(result.current).toHaveProperty('isDestinationActive');
    expect(result.current).toHaveProperty('getNextDestination');
    expect(result.current).toHaveProperty('getPreviousDestination');
    expect(result.current).toHaveProperty('currentDestination');
    expect(result.current).toHaveProperty('hasMultipleDestinations');
  });

  describe('navigateToDestination', () => {
    it('should navigate to destination by ID', () => {
      const { result } = renderHook(() => useDestinationNavigation());
      
      result.current.navigateToDestination('dest-2');
      
      expect(mockSetPrimaryDestination).toHaveBeenCalledWith(mockDestinations[1]);
    });

    it('should not call setPrimaryDestination for invalid ID', () => {
      const { result } = renderHook(() => useDestinationNavigation());
      
      result.current.navigateToDestination('invalid-id');
      
      expect(mockSetPrimaryDestination).not.toHaveBeenCalled();
    });
  });

  describe('navigateToDestinationOnly', () => {
    it('should navigate to destination exclusively by ID', () => {
      const { result } = renderHook(() => useDestinationNavigation());
      
      result.current.navigateToDestinationOnly('dest-3');
      
      expect(mockSetPrimaryDestinationOnly).toHaveBeenCalledWith(mockDestinations[2]);
    });

    it('should not call setPrimaryDestinationOnly for invalid ID', () => {
      const { result } = renderHook(() => useDestinationNavigation());
      
      result.current.navigateToDestinationOnly('invalid-id');
      
      expect(mockSetPrimaryDestinationOnly).not.toHaveBeenCalled();
    });
  });

  describe('navigateToDestinationDirect', () => {
    it('should navigate to destination object directly', () => {
      const { result } = renderHook(() => useDestinationNavigation());
      
      result.current.navigateToDestinationDirect(mockDestinations[2]);
      
      expect(mockSetPrimaryDestination).toHaveBeenCalledWith(mockDestinations[2]);
    });
  });

  describe('navigateToDestinationOnlyDirect', () => {
    it('should navigate to destination exclusively with object', () => {
      const { result } = renderHook(() => useDestinationNavigation());
      
      result.current.navigateToDestinationOnlyDirect(mockDestinations[1]);
      
      expect(mockSetPrimaryDestinationOnly).toHaveBeenCalledWith(mockDestinations[1]);
    });
  });

  describe('getNavigationState', () => {
    it('should return correct navigation state', () => {
      const { result } = renderHook(() => useDestinationNavigation());
      
      const state = result.current.getNavigationState();
      
      expect(state).toEqual({
        currentDestination: mockDestinations[0],
        hasMultipleDestinations: true,
        destinationCount: 2,
        canNavigateBack: true,
        availableDestinations: mockDestinations
      });
    });
  });

  describe('isDestinationActive', () => {
    it('should return true for active destination', () => {
      const { result } = renderHook(() => useDestinationNavigation());
      
      expect(result.current.isDestinationActive('dest-1')).toBe(true);
    });

    it('should return false for inactive destination', () => {
      const { result } = renderHook(() => useDestinationNavigation());
      
      expect(result.current.isDestinationActive('dest-2')).toBe(false);
    });
  });

  describe('getNextDestination', () => {
    it('should return next destination in list', () => {
      const { result } = renderHook(() => useDestinationNavigation());
      
      const nextDestination = result.current.getNextDestination();
      
      expect(nextDestination).toEqual(mockDestinations[1]);
    });

    it('should wrap around to first destination when at end', () => {
      mockUseDestination.mockReturnValue({
        destinations: mockDestinations,
        setPrimaryDestination: mockSetPrimaryDestination,
        setPrimaryDestinationOnly: mockSetPrimaryDestinationOnly,
        primaryDestination: mockDestinations[2], // Last destination
        selectedDestinations: [mockDestinations[2]],
        currentDestination: mockDestinations[2],
        selectDestination: jest.fn(),
        deselectDestination: jest.fn(),
        toggleDestination: jest.fn(),
        clearSelections: jest.fn(),
        isDestinationSelected: jest.fn()
      });

      const { result } = renderHook(() => useDestinationNavigation());
      
      const nextDestination = result.current.getNextDestination();
      
      expect(nextDestination).toEqual(mockDestinations[0]);
    });
  });

  describe('getPreviousDestination', () => {
    it('should return previous destination in list', () => {
      mockUseDestination.mockReturnValue({
        destinations: mockDestinations,
        setPrimaryDestination: mockSetPrimaryDestination,
        setPrimaryDestinationOnly: mockSetPrimaryDestinationOnly,
        primaryDestination: mockDestinations[1], // Middle destination
        selectedDestinations: [mockDestinations[1]],
        currentDestination: mockDestinations[1],
        selectDestination: jest.fn(),
        deselectDestination: jest.fn(),
        toggleDestination: jest.fn(),
        clearSelections: jest.fn(),
        isDestinationSelected: jest.fn()
      });

      const { result } = renderHook(() => useDestinationNavigation());
      
      const prevDestination = result.current.getPreviousDestination();
      
      expect(prevDestination).toEqual(mockDestinations[0]);
    });

    it('should wrap around to last destination when at beginning', () => {
      const { result } = renderHook(() => useDestinationNavigation());
      
      const prevDestination = result.current.getPreviousDestination();
      
      expect(prevDestination).toEqual(mockDestinations[2]);
    });
  });

  describe('convenience properties', () => {
    it('should provide currentDestination', () => {
      const { result } = renderHook(() => useDestinationNavigation());
      
      expect(result.current.currentDestination).toEqual(mockDestinations[0]);
    });

    it('should provide hasMultipleDestinations', () => {
      const { result } = renderHook(() => useDestinationNavigation());
      
      expect(result.current.hasMultipleDestinations).toBe(true);
    });

    it('should return false for hasMultipleDestinations when only one selected', () => {
      mockUseDestination.mockReturnValue({
        destinations: mockDestinations,
        setPrimaryDestination: mockSetPrimaryDestination,
        setPrimaryDestinationOnly: mockSetPrimaryDestinationOnly,
        primaryDestination: mockDestinations[0],
        selectedDestinations: [mockDestinations[0]], // Only one selected
        currentDestination: mockDestinations[0],
        selectDestination: jest.fn(),
        deselectDestination: jest.fn(),
        toggleDestination: jest.fn(),
        clearSelections: jest.fn(),
        isDestinationSelected: jest.fn()
      });

      const { result } = renderHook(() => useDestinationNavigation());
      
      expect(result.current.hasMultipleDestinations).toBe(false);
    });
  });
}); 