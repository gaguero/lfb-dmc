'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { useDestinationImages } from '@/hooks';
import { Destination } from '@/types/destination';

interface DestinationSliceProps {
  destination: Destination;
  index: number;
  isHovered: boolean;
  hasHover: boolean;
  numDestinations: number;
  width: string;
  primaryDestinationId?: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

/**
 * Memoized destination slice component for optimal performance.
 * Only re-renders when props actually change.
 */
const DestinationSlice = memo<DestinationSliceProps>(({
  destination,
  index,
  isHovered,
  hasHover,
  numDestinations,
  width,
  primaryDestinationId,
  onMouseEnter,
  onMouseLeave
}) => {
  const { getImageProps } = useDestinationImages();

  return (
    <div
      key={`slice-${destination.id}`}
      data-slice-id={`slice-${destination.id}`}
      className="relative h-full overflow-hidden transition-all duration-350 ease-in-out group"
      style={{
        width: width,
        filter: hasHover && !isHovered ? 'blur(4px) brightness(0.7)' : 'blur(0px) brightness(1)',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Image
        {...getImageProps(destination, index)}
        className="transition-transform duration-350 ease-in-out object-cover w-full h-full"
        style={{
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          objectPosition: `${(index / Math.max(1, numDestinations - 1)) * 100}% center`,
        }}
      />
    </div>
  );
});

DestinationSlice.displayName = 'DestinationSlice';

export default DestinationSlice; 