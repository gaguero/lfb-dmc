'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { MapPin, Calendar, Search } from 'lucide-react';
import { usePrimaryDestination, useDestination } from '@/contexts/DestinationContext';
import { useDestinationContent } from '@/hooks/useDestinationContent';
import { destinations } from '@/data/destinations';
import DestinationDropdown from './DestinationDropdown';

interface PathInfo {
  d: string;
}

const Hero = () => {
  const { primaryDestination } = usePrimaryDestination();
  const { selectedDestinations } = useDestination();
  const { combinedDescription, suggestedDuration } = useDestinationContent();
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [paths, setPaths] = useState<PathInfo[]>([]);
  const [mounted, setMounted] = useState(false);
  
  const currentDestination = primaryDestination || destinations.find(d => d.id === 'bocas-del-toro') || destinations[0];
  
  // Memoize destinationsToShow to prevent infinite re-renders in useEffect
  const destinationsToShow = useMemo(() => {
    return selectedDestinations.length > 0 ? selectedDestinations : [currentDestination];
  }, [selectedDestinations, currentDestination]);

  // Set mounted to true after component mounts on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Only calculate paths if component is mounted (client-side)
    if (!mounted) return;
    
    const calculatePaths = () => {
      if (destinationsToShow.length <= 1) {
        setPaths([]);
        return;
      }
      const newPaths = destinationsToShow.slice(0, -1).map((_, index) => {
        const startElement = document.querySelector<HTMLDivElement>(`[data-slice-id='slice-${destinationsToShow[index].id}']`);
        const endElement = document.querySelector<HTMLDivElement>(`[data-slice-id='slice-${destinationsToShow[index + 1].id}']`);
        
        if (!startElement || !endElement) return null;

        const containerRect = startElement.closest('.flex')?.parentElement?.getBoundingClientRect();
        if(!containerRect) return null;

        const startRect = startElement.getBoundingClientRect();
        const endRect = endElement.getBoundingClientRect();

        const startX = startRect.left - containerRect.left + startRect.width / 2;
        const startY = startRect.bottom - containerRect.top - 30; // 30px from bottom of the image slice
        const endX = endRect.left - containerRect.left + endRect.width / 2;
        const endY = endRect.bottom - containerRect.top - 30;
        
        const controlX1 = startX + (endX - startX) * 0.3;
        const controlY1 = startY - 50;
        const controlX2 = startX + (endX - startX) * 0.7;
        const controlY2 = endY - 50;

        return {
          d: `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`
        };
      }).filter((path): path is PathInfo => path !== null);
      
      setPaths(newPaths);
    }
    
    // Calculate paths on mount and whenever the hover state or destinations change.
    calculatePaths();
    
    // Recalculate on window resize
    window.addEventListener('resize', calculatePaths);
    return () => window.removeEventListener('resize', calculatePaths);

  }, [mounted, destinationsToShow, hoveredIndex]); // Added mounted as dependency

  return (
    <div className="bg-sand-ivory">
      <div className="max-w-7xl mx-auto mobile-container pt-0 pb-0">
        {/* Top Section: Title and Description */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 mt-0 mb-4 sm:mb-6">
          <div className="w-full lg:w-[70%]">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight lg:leading-none tracking-tight text-driftwood-brown transition-all duration-300 ease-out">
              Discover<br />
              <span className="block">
                {destinationsToShow.length > 1 
                  ? `${destinationsToShow.length} Destinations` 
                  : currentDestination.name
                }
              </span>
            </h1>
          </div>
          <div className="w-full lg:w-[30%] flex flex-col justify-end">
            <p className="text-lg sm:text-xl leading-relaxed mb-6 sm:mb-8 text-driftwood-brown transition-all duration-300 ease-out">
              {combinedDescription}
            </p>
            <div>
              <button className="w-full sm:w-auto bg-gradient-to-r from-coral-pink to-coral-pink/90 text-white font-semibold py-4 px-8 text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 touch-target-comfort">
                Plan Your Trip
              </button>
            </div>
          </div>
        </div>

        {/* Cinematic Destination Viewport System */}
        <div className="relative">
          <div className="h-72 sm:h-80 md:h-96 lg:h-[400px] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
            <div className="relative h-full w-full overflow-hidden flex">
              {destinationsToShow.map((destination, index) => {
                const isHovered = hoveredIndex === index;
                const hasHover = hoveredIndex !== null;
                const numDestinations = destinationsToShow.length;

                let width;
                if (numDestinations <= 1) {
                  width = '100%';
                } else if (hasHover) {
                  width = isHovered ? '60%' : `${40 / (numDestinations - 1)}%`;
                } else {
                  width = `${100 / numDestinations}%`;
                }

                return (
                  <div
                    key={`slice-${destination.id}`}
                    data-slice-id={`slice-${destination.id}`}
                    className="relative h-full overflow-hidden transition-all duration-350 ease-in-out group"
                    style={{
                      width: width,
                      filter: hasHover && !isHovered ? 'blur(4px) brightness(0.7)' : 'blur(0px) brightness(1)',
                    }}
                    onMouseEnter={() => numDestinations > 1 && setHoveredIndex(index)}
                    onMouseLeave={() => numDestinations > 1 && setHoveredIndex(null)}
                  >
                    <Image
                      src={destination.image}
                      alt={`View for ${destination.name}`}
                      layout="fill"
                      objectFit="cover"
                      objectPosition={`${(index / Math.max(1, numDestinations - 1)) * 100}% center`}
                      priority={index < 3}
                      className="transition-transform duration-350 ease-in-out"
                      style={{
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                      }}
                    />
                    <div className={`absolute bottom-3 left-3 bg-black/80 text-white px-3 py-2 rounded-xl text-xs sm:text-sm font-medium backdrop-blur-md border border-white/20 transition-all duration-200 ease-out z-20 ${
                      numDestinations > 1 ? 'opacity-100' : 'opacity-0'
                    } group-hover:scale-105`}>
                      <div className="flex items-center gap-2">
                        {primaryDestination?.id === destination.id && <div className="w-2 h-2 bg-coral-pink rounded-full animate-pulse" />}
                        <span>{destination.name}</span>
                        {numDestinations > 1 && <div className="text-xs opacity-70">{index + 1}/{numDestinations}</div>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Path visualization for multi-destination */}
            {mounted && paths.length > 0 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor: 'rgba(255,255,255,0.7)', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: 'rgba(240,142,128,0.8)', stopOpacity: 1}} />
                  </linearGradient>
                </defs>
                {paths.map((path, index) => (
                  <path
                    key={`path-${index}`}
                    d={path.d}
                    stroke="url(#pathGradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5, 5"
                    className="transition-all duration-350 ease-in-out"
                  />
                ))}
              </svg>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none z-5"></div>
            {destinationsToShow.length > 1 && (
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-semibold shadow-xl border border-white/20 z-30">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {destinationsToShow.slice(0, 6).map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          i === 0 ? 'bg-coral-pink animate-pulse' : 'bg-white/60'
                        }`} 
                      />
                    ))}
                    {destinationsToShow.length > 6 && (
                      <span className="text-xs text-coral-pink font-bold ml-1">+{destinationsToShow.length - 6}</span>
                    )}
                  </div>
                  <span className="text-white/90">{destinationsToShow.length} destinations</span>
                </div>
              </div>
            )}
            {destinationsToShow.length > 2 && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-coral-pink via-white/30 to-coral-pink opacity-60 z-30"></div>
            )}
          </div>

          {/* Responsive Search Widget */}
          <div className="absolute bottom-[-60px] sm:bottom-[-180px] lg:bottom-[-40px] left-1/2 transform -translate-x-1/2 lg:left-6 lg:right-6 lg:transform-none lg:translate-x-0 z-20 w-[75%] lg:w-auto">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/30 max-w-6xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center lg:justify-between gap-4 sm:gap-6">
                <div className="flex items-center gap-3 sm:gap-4 col-span-1 sm:col-span-2 lg:col-span-1 lg:flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center touch-target">
                      <MapPin size={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gray-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                      Location
                    </div>
                    <DestinationDropdown />
                  </div>
                </div>
                <div className="hidden lg:block h-12 sm:h-14 lg:h-16 w-px bg-gray-200"></div>
                <div className="flex items-center gap-3 sm:gap-4 lg:flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center touch-target">
                      <Calendar size={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gray-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                      Check In
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                      Select Date
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block h-12 sm:h-14 lg:h-16 w-px bg-gray-200"></div>
                <div className="flex items-center gap-3 sm:gap-4 lg:flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center touch-target">
                      <Calendar size={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gray-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                      Check Out
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                      {suggestedDuration}
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block h-12 sm:h-14 lg:h-16 w-px bg-gray-200"></div>
                <div className="flex items-center gap-3 sm:gap-4 lg:flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center touch-target">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                      People
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                      2 Adults
                    </div>
                  </div>
                </div>
                <div className="col-span-1 sm:col-span-2 lg:col-span-1 lg:flex-shrink-0 mt-2 sm:mt-4 lg:mt-0">
                  <button className="w-full lg:w-16 lg:h-16 h-12 sm:h-14 bg-gradient-to-r from-coral-pink to-coral-pink/90 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center group touch-target-comfort">
                    <Search size={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7 group-hover:scale-110 transition-transform duration-300" />
                    <span className="ml-2 lg:hidden font-semibold">Search</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;