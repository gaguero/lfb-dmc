import { renderHook, act } from '@testing-library/react';
import { useDestinationContent } from './useDestinationContent';
import { OptimizedDestinationProvider } from '../contexts/OptimizedDestinationProvider';
import { useDestinationActions } from '../contexts/DestinationActionsContext';
import { Destination } from '../types/destination';
import { destinations } from '../data/destinations';

const chiriqui = destinations.find(d => d.id === 'chiriqui') as Destination;
const panamaCity = destinations.find(d => d.id === 'panama-city') as Destination;
const bocasDelToro = destinations.find(d => d.id === 'bocas-del-toro') as Destination;

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <OptimizedDestinationProvider>{children}</OptimizedDestinationProvider>
);

// A custom hook for testing that combines content and actions
const useTestHook = () => {
  const content = useDestinationContent();
  const actions = useDestinationActions();
  return { content, actions };
};

describe('useDestinationContent with Real Provider', () => {
  it('should return default content for the initial destination', () => {
    const { result } = renderHook(() => useDestinationContent(), { wrapper });
    
    expect(result.current.combinedDescription).toBe(bocasDelToro.description);
    expect(result.current.suggestedDuration).toBe('3-5 days');
  });

  it('should return combined content when a second destination is added', () => {
    const { result } = renderHook(useTestHook, { wrapper });

    act(() => {
      result.current.actions.addDestination(chiriqui);
    });

    expect(result.current.content.combinedDescription).toContain('Experience the best of Bocas del Toro and Chiriqui.');
    expect(result.current.content.suggestedDuration).toBe('5-7 days');
  });

  it('should return combined content when a third destination is added', () => {
    const { result } = renderHook(useTestHook, { wrapper });

    act(() => {
      result.current.actions.addDestination(chiriqui);
    });
    
    act(() => {
      result.current.actions.addDestination(panamaCity);
    });

    expect(result.current.content.combinedDescription).toContain('Discover Bocas del Toro, Chiriqui, and Panama City.');
    expect(result.current.content.suggestedDuration).toBe('7-10 days');
  });

  it('should revert to single destination content when one is removed', () => {
    const { result } = renderHook(useTestHook, { wrapper });

    act(() => {
      result.current.actions.addDestination(chiriqui);
    });
    
    expect(result.current.content.suggestedDuration).toBe('5-7 days');

    act(() => {
      result.current.actions.removeDestination(chiriqui.id);
    });
    
    expect(result.current.content.combinedDescription).toBe(bocasDelToro.description);
    expect(result.current.content.suggestedDuration).toBe('3-5 days');
  });
}); 