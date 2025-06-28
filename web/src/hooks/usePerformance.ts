import { useMemo, useCallback, useRef, useEffect } from 'react';

/**
 * A custom hook that provides performance optimization utilities.
 * Includes memoization helpers and performance measurement tools.
 */
export const usePerformance = (componentName: string) => {
  const renderCount = useRef(0);
  const startTime = useRef(performance.now());

  useEffect(() => {
    renderCount.current += 1;
    const endTime = performance.now();
    const duration = endTime - startTime.current;

    console.log(
      `%c[Perf] %c${componentName} %crendered %c(${renderCount.current}x) %cin %c${duration.toFixed(2)}ms`,
      'color: #f0f;',
      'color: #1f75d5; font-weight: bold;',
      'color: #333;',
      'color: #999; font-style: italic;',
      'color: #333;',
      `color: ${duration > 16 ? '#f55' : '#0a0'}; font-weight: bold;`
    );

    startTime.current = performance.now();
  });

  const renderCountRef = useRef(0);
  const lastRenderTimeRef = useRef<number>(Date.now());

  // Track render count for debugging
  renderCountRef.current += 1;

  /**
   * Memoized computation helper that only recalculates when dependencies change
   * Note: This returns a function that can be used with useMemo
   */
  const memoize = useCallback(<T>(
    computation: () => T,
    deps: React.DependencyList
  ) => {
    // This is a helper that returns the computation function and deps
    // The actual memoization should be done by the caller using useMemo
    return { computation, deps };
  }, []);

  /**
   * Stable callback helper that can be used with useCallback
   * Note: This returns a function that can be used with useCallback
   */
  const stableCallback = useCallback(<T extends (...args: any[]) => any>(
    callback: T,
    deps: React.DependencyList
  ) => {
    // This is a helper that returns the callback and deps
    // The actual memoization should be done by the caller using useCallback
    return { callback, deps };
  }, []);

  /**
   * Performance measurement utilities
   */
  const measurePerformance = useCallback((label: string, fn: () => void) => {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`[Performance] ${label}: ${end - start}ms`);
  }, []);

  /**
   * Check if component is re-rendering frequently
   */
  const getRenderInfo = useCallback(() => {
    const now = Date.now();
    const timeSinceLastRender = now - lastRenderTimeRef.current;
    lastRenderTimeRef.current = now;

    return {
      renderCount: renderCountRef.current,
      timeSinceLastRender,
      isFrequentlyRendering: timeSinceLastRender < 100 // Less than 100ms between renders
    };
  }, []);

  /**
   * Shallow comparison for object dependencies
   */
  const shallowEqual = useCallback((obj1: any, obj2: any): boolean => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }

    return true;
  }, []);

  return {
    memoize,
    stableCallback,
    measurePerformance,
    getRenderInfo,
    shallowEqual,
    renderCount: renderCountRef.current
  };
}; 