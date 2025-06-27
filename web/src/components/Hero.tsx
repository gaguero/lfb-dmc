'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Calendar, Search } from 'lucide-react';
import { usePrimaryDestination } from '@/contexts/DestinationContext';
import { destinations } from '@/data/destinations';
import DestinationDropdown from './DestinationDropdown';

const Hero = () => {
  const { primaryDestination } = usePrimaryDestination();
  
  // Use default destination (Bocas del Toro) if none selected
  const currentDestination = primaryDestination || destinations.find(d => d.id === 'bocas-del-toro') || destinations[0];

  return (
    <div className="bg-sand-ivory">
      <div className="max-w-7xl mx-auto mobile-container pt-0 pb-0">
        {/* Top Section: Title and Description - Responsive Layout */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 mt-0 mb-4 sm:mb-6">
          {/* Title - Full width on mobile, 70% on desktop */}
          <div className="w-full lg:w-[70%]">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight lg:leading-none tracking-tight text-driftwood-brown">
              Discover<br />
              <span className="block">{currentDestination.name}</span>
            </h1>
          </div>
          
          {/* Description and CTA - Full width on mobile, 30% on desktop */}
          <div className="w-full lg:w-[30%] flex flex-col justify-end">
            <p className="text-lg sm:text-xl leading-relaxed mb-6 sm:mb-8 text-driftwood-brown">
              {currentDestination.shortDescription}
            </p>
            <div>
              <button 
                className="w-full sm:w-auto bg-gradient-to-r from-coral-pink to-coral-pink/90 text-white font-semibold py-4 px-8 text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 touch-target-comfort"
              >
                Plan Your Trip
              </button>
            </div>
          </div>
        </div>

        {/* Hero Image with Search Widget - Responsive Heights */}
        <div className="relative">
          <div className="h-60 sm:h-80 md:h-96 lg:h-[400px] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
            <Image 
              src={currentDestination.image} 
              alt={`${currentDestination.name} - ${currentDestination.theme}`}
              width={1200}
              height={400}
              className="w-full h-full object-cover"
              priority={true}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
            
            {/* Light overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
          </div>

          {/* Responsive Search Widget */}
          <div className="absolute bottom-[-20px] sm:bottom-[-30px] lg:bottom-[-40px] left-2 right-2 sm:left-4 sm:right-4 lg:left-6 lg:right-6 z-20">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/20 max-w-6xl mx-auto">
              
              {/* Mobile Layout: 2x2 Grid for sm screens, then horizontal for lg+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center lg:justify-between gap-4 sm:gap-6">
                
                {/* Location with Dropdown */}
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

                {/* Mobile Divider - Hidden on lg+ */}
                <div className="hidden lg:block h-12 sm:h-14 lg:h-16 w-px bg-gray-200"></div>

                {/* Check In */}
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

                {/* Mobile Divider - Hidden on lg+ */}
                <div className="hidden lg:block h-12 sm:h-14 lg:h-16 w-px bg-gray-200"></div>

                {/* Check Out */}
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
                      {currentDestination.targetDuration}
                    </div>
                  </div>
                </div>

                {/* Mobile Divider - Hidden on lg+ */}
                <div className="hidden lg:block h-12 sm:h-14 lg:h-16 w-px bg-gray-200"></div>

                {/* People */}
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

                {/* Search Button - Full width on mobile, fixed size on desktop */}
                <div className="col-span-1 sm:col-span-2 lg:col-span-1 lg:flex-shrink-0 mt-2 sm:mt-4 lg:mt-0">
                  <button 
                    className="w-full lg:w-16 lg:h-16 h-12 sm:h-14 bg-gradient-to-r from-coral-pink to-coral-pink/90 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center group touch-target-comfort"
                  >
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