import { renderHook, act } from '@testing-library/react';
import { usePerformance } from './usePerformance';

describe('usePerformance', () => {
  beforeEach(() => {
    // Mock performance.now() for predictable measurements
    let time = 0;
    performance.now = jest.fn(() => {
      time += 5; // Increment time on each call
      return time;
    });

    // Mock console.log to spy on outputs
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return the correct API shape', () => {
    const { result } = renderHook(() => usePerformance('TestComponent'));
    expect(result.current).toHaveProperty('memoize');
    expect(result.current).toHaveProperty('stableCallback');
    expect(result.current).toHaveProperty('measurePerformance');
    expect(result.current).toHaveProperty('getRenderInfo');
    expect(result.current).toHaveProperty('shallowEqual');
    expect(result.current).toHaveProperty('renderCount');
  });

  it('should increment renderCount on each render', () => {
    const { result, rerender } = renderHook(() => usePerformance('TestComponent'));
    expect(result.current.renderCount).toBe(1);
    rerender();
    expect(result.current.renderCount).toBe(2);
    rerender();
    expect(result.current.renderCount).toBe(3);
  });

  it('getRenderInfo should return render count and time since last render', () => {
    const { result, rerender } = renderHook(() => usePerformance('TestComponent'));
    
    act(() => {
      const info = result.current.getRenderInfo();
      expect(info.renderCount).toBe(2); // rerender + getRenderInfo call
      expect(info.timeSinceLastRender).toBeGreaterThan(0);
    });

    rerender();

    act(() => {
      const info = result.current.getRenderInfo();
      expect(info.renderCount).toBe(4);
    });
  });

  it('measurePerformance should log the execution time of a function', () => {
    const { result } = renderHook(() => usePerformance('TestComponent'));
    const testFn = () => { /* simulate some work */ };

    result.current.measurePerformance('test function', testFn);

    expect(console.log).toHaveBeenCalledWith('[Performance] test function: 5ms');
  });

  describe('shallowEqual', () => {
    it('should return true for equal objects', () => {
      const { result } = renderHook(() => usePerformance('TestComponent'));
      const obj1 = { a: 1, b: 'hello' };
      const obj2 = { a: 1, b: 'hello' };
      expect(result.current.shallowEqual(obj1, obj2)).toBe(true);
    });

    it('should return false for objects with different values', () => {
      const { result } = renderHook(() => usePerformance('TestComponent'));
      const obj1 = { a: 1, b: 'hello' };
      const obj2 = { a: 1, b: 'world' };
      expect(result.current.shallowEqual(obj1, obj2)).toBe(false);
    });

    it('should return false for objects with different keys', () => {
      const { result } = renderHook(() => usePerformance('TestComponent'));
      const obj1 = { a: 1, b: 'hello' };
      const obj2 = { a: 1, c: 'hello' };
      expect(result.current.shallowEqual(obj1, obj2)).toBe(false);
    });

    it('should return false for objects with different number of keys', () => {
      const { result } = renderHook(() => usePerformance('TestComponent'));
      const obj1 = { a: 1, b: 'hello' };
      const obj2 = { a: 1 };
      expect(result.current.shallowEqual(obj1, obj2)).toBe(false);
    });
  });
});