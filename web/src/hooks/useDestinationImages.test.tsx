import { renderHook } from '@testing-library/react';
import { useDestinationImages } from './useDestinationImages';
import { Destination } from '../types/destination';

// Mock destination for testing - Updated to match the current Destination type
const mockDestination: Destination = {
  id: 'test-dest',
  name: 'Test Destination',
  description: 'A place for testing.',
  shortDescription: 'A short description.',
  image: '/test-image.jpg',
  mobileImage: '/test-image-mobile.jpg',
  theme: 'Test',
  primaryActivities: ['testing', 'asserting'],
  targetDuration: '1 day',
  keyHighlights: ['Correct types', 'Passing tests'],
};

const mockDestinationWithoutImage: Destination = {
  ...mockDestination,
  id: 'no-image-dest',
  image: '',
  mobileImage: '',
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
    it('should return correct optimized image URLs', () => {
      const { result } = renderHook(() => useDestinationImages());
      const imageUrl = result.current.getOptimizedImageUrl(mockDestination);

      // Currently, it just returns the original image string
      expect(imageUrl).toBe(mockDestination.image);
    });

    it('should handle destinations without a valid imageUrl', () => {
      const { result } = renderHook(() => useDestinationImages());
      const imageUrl = result.current.getOptimizedImageUrl(mockDestinationWithoutImage);

      expect(imageUrl).toBe('');
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