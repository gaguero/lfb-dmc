import { renderHook, act } from '@testing-library/react';
import { useDestinationNavigation } from './useDestinationNavigation';
import { OptimizedDestinationProvider } from '../contexts/OptimizedDestinationProvider';
import { destinations } from '../data/destinations';
import { ReactNode } from 'react';

// Use real destinations data for testing
const realDestinations = destinations;

const wrapper = ({ children }: { children: ReactNode }) => (
  <OptimizedDestinationProvider>
    {children}
  </OptimizedDestinationProvider>
);

describe('useDestinationNavigation', () => {
  beforeEach(() => {
    // No mocking needed - using real provider
  });

  it('should return navigation utilities', () => {
    const { result } = renderHook(() => useDestinationNavigation(), { wrapper });

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
      const { result } = renderHook(() => useDestinationNavigation(), { wrapper });
      
      act(() => {
        result.current.navigateToDestination('chiriqui');
      });
      
      expect(result.current.currentDestination?.id).toBe('chiriqui');
    });

    it('should not change destination for invalid ID', () => {
      const { result } = renderHook(() => useDestinationNavigation(), { wrapper });
      const initialDestination = result.current.currentDestination;
      
      act(() => {
        result.current.navigateToDestination('invalid-id');
      });
      
      expect(result.current.currentDestination).toBe(initialDestination);
    });
  });

  describe('navigateToDestinationOnly', () => {
    it('should navigate to destination exclusively by ID', () => {
      const { result } = renderHook(() => useDestinationNavigation(), { wrapper });
      
      act(() => {
        result.current.navigateToDestinationOnly('las-perlas');
      });
      
      expect(result.current.currentDestination?.id).toBe('las-perlas');
    });

    it('should not change destination for invalid ID', () => {
      const { result } = renderHook(() => useDestinationNavigation(), { wrapper });
      const initialDestination = result.current.currentDestination;
      
      act(() => {
        result.current.navigateToDestinationOnly('invalid-id');
      });
      
      expect(result.current.currentDestination).toBe(initialDestination);
    });
  });

  describe('navigateToDestinationDirect', () => {
    it('should navigate to destination object directly', () => {
      const { result } = renderHook(() => useDestinationNavigation(), { wrapper });
      const targetDestination = realDestinations[2];
      
      act(() => {
        result.current.navigateToDestinationDirect(targetDestination);
      });
      
      expect(result.current.currentDestination?.id).toBe(targetDestination.id);
    });
  });

  describe('navigateToDestinationOnlyDirect', () => {
    it('should navigate to destination exclusively with object', () => {
      const { result } = renderHook(() => useDestinationNavigation(), { wrapper });
      const targetDestination = realDestinations[1];
      
      act(() => {
        result.current.navigateToDestinationOnlyDirect(targetDestination);
      });
      
      expect(result.current.currentDestination?.id).toBe(targetDestination.id);
    });
  });

  describe('getNavigationState', () => {
    it('should return correct navigation state', () => {
      const { result } = renderHook(() => useDestinationNavigation(), { wrapper });
      
      const state = result.current.getNavigationState();
      
      expect(state).toEqual({
        currentDestination: realDestinations[0], // Bocas del Toro is the default
        hasMultipleDestinations: false,
        destinationCount: 1,
        canNavigateBack: true,
        availableDestinations: realDestinations
      });
    });
  });

  describe('isDestinationActive', () => {
    it('should return true for active destination', () => {
      const { result } = renderHook(() => useDestinationNavigation(), { wrapper });
      
      act(() => {
        result.current.navigateToDestination('bocas-del-toro');
      });
      
      expect(result.current.isDestinationActive('bocas-del-toro')).toBe(true);
    });

    it('should return false for inactive destination', () => {
      const { result } = renderHook(() => useDestinationNavigation(), { wrapper });
      
      act(() => {
        result.current.navigateToDestination('bocas-del-toro');
      });
      
      expect(result.current.isDestinationActive('chiriqui')).toBe(false);
    });
  });

  describe('getNextDestination', () => {
    it('should return next destination when current is set', () => {
      const { result } = renderHook(() => useDestinationNavigation(), { wrapper });
      
      act(() => {
        result.current.navigateToDestination(realDestinations[0].id);
      });
      
      const nextDestination = result.current.getNextDestination();
      expect(nextDestination?.id).toBe(realDestinations[1].id);
    });

    it('should wrap around to first destination when at end', () => {
      const { result } = renderHook(() => useDestinationNavigation(), { wrapper });
      const lastDestination = realDestinations[realDestinations.length - 1];
      
      act(() => {
        result.current.navigateToDestination(lastDestination.id);
      });
      
      const nextDestination = result.current.getNextDestination();
      expect(nextDestination?.id).toBe(realDestinations[0].id);
    });
  });

  describe('getPreviousDestination', () => {
    it('should return previous destination when current is set', () => {
      const { result } = renderHook(() => useDestinationNavigation(), { wrapper });
      
      act(() => {
        result.current.navigateToDestination(realDestinations[1].id);
      });
      
      const prevDestination = result.current.getPreviousDestination();
      expect(prevDestination?.id).toBe(realDestinations[0].id);
    });

    it('should wrap around to last destination when at beginning', () => {
      const { result } = renderHook(() => useDestinationNavigation(), { wrapper });
      
      act(() => {
        result.current.navigateToDestination(realDestinations[0].id);
      });
      
      const prevDestination = result.current.getPreviousDestination();
      expect(prevDestination?.id).toBe(realDestinations[realDestinations.length - 1].id);
    });
  });

  describe('convenience properties', () => {
    it('should provide currentDestination', () => {
      const { result } = renderHook(() => useDestinationNavigation(), { wrapper });
      
      act(() => {
        result.current.navigateToDestination(realDestinations[0].id);
      });
      
      expect(result.current.currentDestination?.id).toBe(realDestinations[0].id);
    });

    it('should provide hasMultipleDestinations when multiple destinations are selected', () => {
      const { result } = renderHook(() => useDestinationNavigation(), { wrapper });
      
      act(() => {
        result.current.navigateToDestination('bocas-del-toro');
        result.current.navigateToDestination('chiriqui'); // This should add to selection
      });
      
      // Should be true when multiple destinations are selected
      expect(result.current.hasMultipleDestinations).toBe(true);
    });

    it('should return false for hasMultipleDestinations when only one selected', () => {
      const { result } = renderHook(() => useDestinationNavigation(), { wrapper });
      
      act(() => {
        result.current.navigateToDestination(realDestinations[0].id);
      });
      
      expect(result.current.hasMultipleDestinations).toBe(false);
    });
  });
}); 