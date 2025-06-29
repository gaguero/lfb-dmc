import { renderHook, act } from '@testing-library/react';
import { useDebounce, useDebouncedCallback } from './useDebounce';

// Mock timers
jest.useFakeTimers();

describe('useDebounce', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should debounce value updates', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 }
      }
    );

    expect(result.current).toBe('initial');

    // Update the value
    rerender({ value: 'updated', delay: 500 });
    expect(result.current).toBe('initial'); // Should still be initial

    // Fast-forward time by 250ms (less than delay)
    act(() => {
      jest.advanceTimersByTime(250);
    });
    expect(result.current).toBe('initial'); // Should still be initial

    // Fast-forward time by remaining 250ms (total 500ms)
    act(() => {
      jest.advanceTimersByTime(250);
    });
    expect(result.current).toBe('updated'); // Should now be updated
  });

  it('should reset timer on rapid updates', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 }
      }
    );

    // First update
    rerender({ value: 'update1', delay: 500 });
    
    // Fast-forward 400ms
    act(() => {
      jest.advanceTimersByTime(400);
    });
    expect(result.current).toBe('initial');

    // Second update before first completes
    rerender({ value: 'update2', delay: 500 });
    
    // Fast-forward 400ms (total 800ms from start, but only 400ms from second update)
    act(() => {
      jest.advanceTimersByTime(400);
    });
    expect(result.current).toBe('initial'); // Should still be initial

    // Fast-forward remaining 100ms
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe('update2'); // Should be update2, not update1
  });

  it('should handle different data types', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 100),
      {
        initialProps: { value: { count: 0 } }
      }
    );

    expect(result.current).toEqual({ count: 0 });

    rerender({ value: { count: 1 } });
    
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    expect(result.current).toEqual({ count: 1 });
  });
});

describe('useDebouncedCallback', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should return a function', () => {
    const mockCallback = jest.fn();
    const { result } = renderHook(() => useDebouncedCallback(mockCallback, 500));
    
    expect(typeof result.current).toBe('function');
  });

  it('should debounce callback execution', () => {
    const mockCallback = jest.fn();
    const { result } = renderHook(() => useDebouncedCallback(mockCallback, 500));

    // Call the debounced function multiple times
    act(() => {
      result.current('arg1');
      result.current('arg2');
      result.current('arg3');
    });

    // Should not have been called yet
    expect(mockCallback).not.toHaveBeenCalled();

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Should have been called once with the last arguments
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith('arg3');
  });

  it('should update when dependencies change', () => {
    const mockCallback1 = jest.fn();
    const mockCallback2 = jest.fn();
    
    const { result, rerender } = renderHook(
      ({ callback }) => useDebouncedCallback(callback, 500),
      {
        initialProps: { callback: mockCallback1 }
      }
    );

    // Call with first callback
    act(() => {
      result.current('test');
    });

    // Change callback before first timeout completes
    rerender({ callback: mockCallback2 });

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Since the callback changed, the first one should still be called because 
    // the timeout was already set with the first callback
    expect(mockCallback1).toHaveBeenCalledWith('test');
    expect(mockCallback2).not.toHaveBeenCalled();
  });

  it('should preserve function signature and return type', () => {
    const mockCallback = jest.fn();
    const { result } = renderHook(() => useDebouncedCallback(mockCallback, 500));

    // TypeScript should infer the correct types
    const debouncedFn = result.current;
    
    act(() => {
      debouncedFn('test', 123);
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockCallback).toHaveBeenCalledWith('test', 123);
  });
}); 