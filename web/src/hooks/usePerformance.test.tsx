import { renderHook, act } from '@testing-library/react';
import { usePerformance } from './usePerformance';

// Mock performance.now()
const mockPerformanceNow = jest.fn();
Object.defineProperty(global, 'performance', {
  value: {
    now: mockPerformanceNow,
  },
  writable: true,
});

// Mock console.log
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

// Use fake timers
jest.useFakeTimers();

describe('usePerformance', () => {
  beforeEach(() => {
    mockPerformanceNow.mockReset();
    mockConsoleLog.mockClear();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
    jest.useRealTimers();
  });

  it('should track render count', () => {
    const { result, rerender } = renderHook(() => usePerformance());
    
    expect(result.current.renderCount).toBe(1);
    
    rerender();
    expect(result.current.renderCount).toBe(2);
    
    rerender();
    expect(result.current.renderCount).toBe(3);
  });

  it('should provide memoization helper', () => {
    const { result } = renderHook(() => usePerformance());
    
    const computation = jest.fn(() => 'computed value');
    const deps = ['dep1', 'dep2'];
    
    const memoHelper = result.current.memoize(computation, deps);
    
    expect(memoHelper).toHaveProperty('computation');
    expect(memoHelper).toHaveProperty('deps');
    expect(memoHelper.computation).toBe(computation);
    expect(memoHelper.deps).toEqual(deps);
  });

  it('should provide stable callback helper', () => {
    const { result } = renderHook(() => usePerformance());
    
    const callback = jest.fn();
    const deps = ['dep1'];
    
    const callbackHelper = result.current.stableCallback(callback, deps);
    
    expect(callbackHelper).toHaveProperty('callback');
    expect(callbackHelper).toHaveProperty('deps');
    expect(callbackHelper.callback).toBe(callback);
    expect(callbackHelper.deps).toEqual(deps);
  });

  it('should measure performance', () => {
    const { result } = renderHook(() => usePerformance());
    
    const mockFn = jest.fn();
    
    act(() => {
      result.current.measurePerformance('test operation', mockFn);
    });
    
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockConsoleLog).toHaveBeenCalledWith(
      expect.stringMatching(/^\[Performance\] test operation: \d+(\.\d+)?ms$/)
    );
  });

  it('should provide render info', () => {
    const { result, rerender } = renderHook(() => usePerformance());
    
    const renderInfo1 = result.current.getRenderInfo();
    expect(renderInfo1.renderCount).toBe(1);
    expect(typeof renderInfo1.timeSinceLastRender).toBe('number');
    expect(typeof renderInfo1.isFrequentlyRendering).toBe('boolean');
    
    // Wait a bit and rerender
    jest.advanceTimersByTime(50);
    rerender();
    
    const renderInfo2 = result.current.getRenderInfo();
    expect(renderInfo2.renderCount).toBe(2);
    expect(renderInfo2.timeSinceLastRender).toBeGreaterThan(0);
  });

  it('should detect frequent rendering', () => {
    const { result, rerender } = renderHook(() => usePerformance());
    
    // First render
    result.current.getRenderInfo();
    
    // Quick rerender (simulate frequent rendering)
    jest.advanceTimersByTime(50); // Less than 100ms threshold
    rerender();
    
    const renderInfo = result.current.getRenderInfo();
    expect(renderInfo.isFrequentlyRendering).toBe(true);
  });

  it('should perform shallow equality check', () => {
    const { result } = renderHook(() => usePerformance());
    
    const obj1 = { a: 1, b: 'test' };
    const obj2 = { a: 1, b: 'test' };
    const obj3 = { a: 1, b: 'different' };
    const obj4 = { a: 1, b: 'test', c: 'extra' };
    
    expect(result.current.shallowEqual(obj1, obj2)).toBe(true);
    expect(result.current.shallowEqual(obj1, obj3)).toBe(false);
    expect(result.current.shallowEqual(obj1, obj4)).toBe(false);
    expect(result.current.shallowEqual(obj4, obj1)).toBe(false);
  });

  it('should handle empty objects in shallow equality', () => {
    const { result } = renderHook(() => usePerformance());
    
    expect(result.current.shallowEqual({}, {})).toBe(true);
    expect(result.current.shallowEqual({}, { a: 1 })).toBe(false);
    expect(result.current.shallowEqual({ a: 1 }, {})).toBe(false);
  });

  it('should handle null and undefined in shallow equality', () => {
    const { result } = renderHook(() => usePerformance());
    
    const obj = { a: null, b: undefined };
    const obj2 = { a: null, b: undefined };
    const obj3 = { a: null, b: null };
    
    expect(result.current.shallowEqual(obj, obj2)).toBe(true);
    expect(result.current.shallowEqual(obj, obj3)).toBe(false);
  });

  it('should provide consistent API across rerenders', () => {
    const { result, rerender } = renderHook(() => usePerformance());
    
    const firstAPI = result.current;
    
    rerender();
    
    const secondAPI = result.current;
    
    // Functions should be stable (same reference)
    expect(firstAPI.measurePerformance).toBe(secondAPI.measurePerformance);
    expect(firstAPI.getRenderInfo).toBe(secondAPI.getRenderInfo);
    expect(firstAPI.shallowEqual).toBe(secondAPI.shallowEqual);
    
    // Render count should update
    expect(secondAPI.renderCount).toBe(firstAPI.renderCount + 1);
  });
}); 