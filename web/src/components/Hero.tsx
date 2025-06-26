'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Calendar, Search } from 'lucide-react';
import { usePrimaryDestination } from '@/contexts/DestinationContext';
import { destinations } from '@/data/destinations';

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
                className="bg-coral-pink text-white font-semibold py-4 px-8 text-lg rounded-full shadow-lg hover:opacity-90 transition-all"
              >
                Plan Your Trip
              </button>
            </div>
          </div>
        </div>

        {/* Hero Image with Search Widget */}
        <div className="relative">
          <div className="h-96 lg:h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl">
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
          </div>

          {/* Search Widget Overlay */}
          <div className="absolute bottom-3 left-6 right-6 z-10">
            <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                {/* Location */}
                <div>
                  <div className="flex items-center text-sm mb-3 text-driftwood-brown">
                    <MapPin size={16} className="mr-2 text-ocean-blue" />
                    Destination
                  </div>
                  <div className="text-lg font-semibold text-deep-cacao">
                    {currentDestination.name}
                  </div>
                  <div className="text-sm text-driftwood-brown mt-1">
                    {currentDestination.theme}
                  </div>
                </div>

                {/* Check In */}
                <div>
                  <div className="flex items-center text-sm mb-3 text-driftwood-brown">
                    <Calendar size={16} className="mr-2 text-ocean-blue" />
                    Arrival Date
                  </div>
                  <div className="text-lg font-semibold text-deep-cacao">
                    Select Date
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <div className="flex items-center text-sm mb-3 text-driftwood-brown">
                    <Calendar size={16} className="mr-2 text-ocean-blue" />
                    Duration
                  </div>
                  <div className="text-lg font-semibold text-deep-cacao">
                    {currentDestination.targetDuration}
                  </div>
                </div>

                {/* Search Button */}
                <div>
                  <button 
                    className="w-full bg-coral-pink text-white p-4 rounded-2xl font-semibold text-lg shadow-lg hover:opacity-90 transition-all flex items-center justify-center"
                  >
                    <Search size={20} className="mr-2" />
                    Inquire
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