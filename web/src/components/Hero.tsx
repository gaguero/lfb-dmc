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
      <div className="max-w-7xl mx-auto px-6 pt-0 pb-0">
        {/* Top Section: Title and Description */}
        <div className="flex gap-8 mt-0 mb-4">
          {/* Left: Large Title - 70% width */}
          <div className="w-[70%]">
            <h1 className="font-display text-4xl lg:text-6xl font-bold leading-none tracking-tight text-driftwood-brown">
              Discover<br />
              {currentDestination.name}
            </h1>
          </div>
          
          {/* Right: Description and CTA - 30% width */}
          <div className="w-[30%] flex flex-col justify-end">
            <p className="text-xl leading-relaxed mb-8 text-driftwood-brown">
              {currentDestination.shortDescription}
            </p>
            <div>
              <button 
                className="bg-gradient-to-r from-coral-pink to-coral-pink/90 text-white font-semibold py-4 px-8 text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-[1.05] transition-all duration-300"
              >
                Plan Your Trip
              </button>
            </div>
          </div>
        </div>

        {/* Hero Image with Search Widget */}
        <div className="relative">
          <div className="h-96 lg:h-[400px] w-full rounded-3xl overflow-hidden shadow-xl">
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

          {/* Modern Search Widget */}
          <div className="absolute bottom-[-40px] left-6 right-6 z-20">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/20 max-w-6xl mx-auto">
              <div className="flex items-center justify-between gap-6">
                {/* Location with Dropdown */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center">
                      <MapPin size={28} className="text-gray-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-600 mb-1">
                      Location
                    </div>
                    <DestinationDropdown />
                  </div>
                </div>

                {/* Divider */}
                <div className="h-16 w-px bg-gray-200"></div>

                {/* Check In */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center">
                      <Calendar size={28} className="text-gray-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-600 mb-1">
                      Check In
                    </div>
                    <div className="text-base font-semibold text-gray-900 truncate">
                      Select Date
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-16 w-px bg-gray-200"></div>

                {/* Check Out */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center">
                      <Calendar size={28} className="text-gray-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-600 mb-1">
                      Check Out
                    </div>
                    <div className="text-base font-semibold text-gray-900 truncate">
                      {currentDestination.targetDuration}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-16 w-px bg-gray-200"></div>

                {/* People */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center">
                      <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-600 mb-1">
                      People
                    </div>
                    <div className="text-base font-semibold text-gray-900 truncate">
                      2 Adults
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <div className="flex-shrink-0">
                  <button 
                    className="w-16 h-16 bg-gradient-to-r from-coral-pink to-coral-pink/90 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center group"
                  >
                    <Search size={28} className="group-hover:scale-110 transition-transform duration-300" />
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