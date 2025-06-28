import { useCallback } from 'react';
import { Destination } from '../types/destination';

/**
 * A custom hook for handling destination image optimization and properties.
 * Provides utilities for generating optimized image URLs and Next.js Image props.
 *
 * @returns {object} An object containing image handling utilities.
 */
export const useDestinationImages = () => {
  /**
   * Generates optimized image properties for Next.js Image component
   * @param destination - The destination object containing image data
   * @param index - The index of the image (used for priority loading)
   * @returns Object with src, priority, sizes, and other image props
   */
  const getImageProps = useCallback((destination: Destination, index: number = 0) => {
    return {
      src: destination.image,
      alt: `${destination.name} - Panama destination`,
      priority: index < 3, // Priority loading for first 3 images
      sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
      className: "object-cover w-full h-full",
      fill: true
    };
  }, []);

  /**
   * Generates an optimized image URL for different sizes
   * @param destination - The destination object
   * @param size - The desired image size
   * @returns Optimized image URL string
   */
  const getOptimizedImageUrl = useCallback((destination: Destination, size: 'small' | 'medium' | 'large' = 'medium') => {
    const sizeMap = {
      small: '400w',
      medium: '800w',
      large: '1200w'
    };
    
    // For now, return the original image URL
    // In the future, this could be enhanced to generate different sized URLs
    // if the backend supports dynamic image resizing
    return destination.image;
  }, []);

  /**
   * Gets responsive sizes string for different breakpoints
   * @param context - The context where the image is used ('hero', 'card', 'thumbnail')
   * @returns Responsive sizes string for Next.js Image
   */
  const getResponsiveSizes = useCallback((context: 'hero' | 'card' | 'thumbnail' = 'card') => {
    const sizeMap = {
      hero: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
      card: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw",
      thumbnail: "(max-width: 768px) 50vw, 200px"
    };
    
    return sizeMap[context];
  }, []);

  /**
   * Determines if an image should have priority loading
   * @param index - The index of the image in a list
   * @param threshold - The threshold for priority loading (default: 3)
   * @returns Boolean indicating if image should have priority
   */
  const shouldHavePriority = useCallback((index: number, threshold: number = 3) => {
    return index < threshold;
  }, []);

  return {
    getImageProps,
    getOptimizedImageUrl,
    getResponsiveSizes,
    shouldHavePriority
  };
}; 