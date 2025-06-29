import { renderHook } from '@testing-library/react';
import { useDestinationImages } from './useDestinationImages';
import { Destination } from '../types/destination';

// Mock destination for testing
const mockDestination: Destination = {
  id: 'test-destination',
  name: 'Test Destination',
  image: '/test-image.jpg',
  description: 'A test destination',
  features: ['feature1', 'feature2'],
  suggestedDuration: '3-4 days'
};

describe('useDestinationImages', () => {
  it('should return image handling utilities', () => {
    const { result } = renderHook(() => useDestinationImages());

    expect(result.current).toHaveProperty('getImageProps');
    expect(result.current).toHaveProperty('getOptimizedImageUrl');
    expect(result.current).toHaveProperty('getResponsiveSizes');
    expect(result.current).toHaveProperty('shouldHavePriority');
  });

  describe('getImageProps', () => {
    it('should generate correct image properties', () => {
      const { result } = renderHook(() => useDestinationImages());
      const imageProps = result.current.getImageProps(mockDestination, 0);

      expect(imageProps).toEqual({
        src: '/test-image.jpg',
        alt: 'Test Destination - Panama destination',
        priority: true, // index 0 < 3
        sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
        className: "object-cover w-full h-full",
        fill: true
      });
    });

    it('should set priority to false for images with index >= 3', () => {
      const { result } = renderHook(() => useDestinationImages());
      const imageProps = result.current.getImageProps(mockDestination, 3);

      expect(imageProps.priority).toBe(false);
    });

    it('should set priority to true for images with index < 3', () => {
      const { result } = renderHook(() => useDestinationImages());
      const imageProps1 = result.current.getImageProps(mockDestination, 0);
      const imageProps2 = result.current.getImageProps(mockDestination, 2);

      expect(imageProps1.priority).toBe(true);
      expect(imageProps2.priority).toBe(true);
    });
  });

  describe('getOptimizedImageUrl', () => {
    it('should return the original image URL', () => {
      const { result } = renderHook(() => useDestinationImages());
      const url = result.current.getOptimizedImageUrl(mockDestination);

      expect(url).toBe('/test-image.jpg');
    });

    it('should handle different size parameters', () => {
      const { result } = renderHook(() => useDestinationImages());
      
      const smallUrl = result.current.getOptimizedImageUrl(mockDestination, 'small');
      const mediumUrl = result.current.getOptimizedImageUrl(mockDestination, 'medium');
      const largeUrl = result.current.getOptimizedImageUrl(mockDestination, 'large');

      // Currently returns original URL regardless of size
      expect(smallUrl).toBe('/test-image.jpg');
      expect(mediumUrl).toBe('/test-image.jpg');
      expect(largeUrl).toBe('/test-image.jpg');
    });
  });

  describe('getResponsiveSizes', () => {
    it('should return correct sizes for hero context', () => {
      const { result } = renderHook(() => useDestinationImages());
      const sizes = result.current.getResponsiveSizes('hero');

      expect(sizes).toBe("(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw");
    });

    it('should return correct sizes for card context', () => {
      const { result } = renderHook(() => useDestinationImages());
      const sizes = result.current.getResponsiveSizes('card');

      expect(sizes).toBe("(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw");
    });

    it('should return correct sizes for thumbnail context', () => {
      const { result } = renderHook(() => useDestinationImages());
      const sizes = result.current.getResponsiveSizes('thumbnail');

      expect(sizes).toBe("(max-width: 768px) 50vw, 200px");
    });

    it('should default to card context when no parameter provided', () => {
      const { result } = renderHook(() => useDestinationImages());
      const sizes = result.current.getResponsiveSizes();

      expect(sizes).toBe("(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw");
    });
  });

  describe('shouldHavePriority', () => {
    it('should return true for indices below threshold', () => {
      const { result } = renderHook(() => useDestinationImages());
      
      expect(result.current.shouldHavePriority(0)).toBe(true);
      expect(result.current.shouldHavePriority(2)).toBe(true);
    });

    it('should return false for indices at or above threshold', () => {
      const { result } = renderHook(() => useDestinationImages());
      
      expect(result.current.shouldHavePriority(3)).toBe(false);
      expect(result.current.shouldHavePriority(5)).toBe(false);
    });

    it('should respect custom threshold', () => {
      const { result } = renderHook(() => useDestinationImages());
      
      expect(result.current.shouldHavePriority(4, 5)).toBe(true);
      expect(result.current.shouldHavePriority(5, 5)).toBe(false);
    });
  });
}); 