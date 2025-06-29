'use client';

import React, { useState, useEffect, useMemo, useCallback, forwardRef, memo } from 'react';
import Image from 'next/image';
import { MapPin, Calendar, Search } from 'lucide-react';
import { usePrimaryDestination, useDestination } from '@/contexts/DestinationContext';
import { useDestinationContent, useDestinationImages, usePerformance } from '@/hooks';
import { destinations } from '@/data/destinations';
import DestinationDropdown from './DestinationDropdown';
import DestinationSlice from './DestinationSlice';
import { getPathD, getCenterPoint } from '@/utils/path';

interface PathInfo {
  d: string;
}

const Hero = memo(forwardRef<HTMLDivElement>((props, ref) => {
  usePerformance('Hero');
  const { primaryDestination } = usePrimaryDestination();
  const { selectedDestinations } = useDestination();
  const { combinedDescription, suggestedDuration } = useDestinationContent();
  const { getImageProps, shouldHavePriority } = useDestinationImages();
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [paths, setPaths] = useState<PathInfo[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState<boolean | null>(null);
  const [peopleCount, setPeopleCount] = useState('2');
  const [checkInDate, setCheckInDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [totalNightsValue, setTotalNightsValue] = useState(suggestedDuration);
  const [animateModal, setAnimateModal] = useState(false);
  
  const currentDestination = primaryDestination || destinations.find(d => d.id === 'bocas-del-toro') || destinations[0];
  
  // Memoize destinationsToShow to prevent infinite re-renders in useEffect
  const destinationsToShow = useMemo(() => {
    return selectedDestinations.length > 0 ? selectedDestinations : [currentDestination];
  }, [selectedDestinations, currentDestination]);

  // Optimized event handlers with useCallback
  const handleMouseEnter = useCallback((index: number, numDestinations: number) => {
    if (numDestinations > 1) {
      setHoveredIndex(index);
    }
  }, []);

  const handleMouseLeave = useCallback((numDestinations: number) => {
    if (numDestinations > 1) {
      setHoveredIndex(null);
    }
  }, []);

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

  // Handler to send booking request
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const res = await fetch('/api/sendBooking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locations: destinationsToShow.map(d => d.name),
          checkIn: checkInDate,
          totalNights: totalNightsValue,
          people: peopleCount,
          name: customerName,
          email: customerEmail,
          notes,
        }),
      });
      const data = await res.json();
      setSendSuccess(data.success);
    } catch (err) {
      console.error(err);
      setSendSuccess(false);
    } finally {
      setIsSending(false);
    }
  };

  // Recalculate default total travel days when destinations change
  useEffect(() => {
    setTotalNightsValue((destinationsToShow.length * 4).toString());
  }, [destinationsToShow]);

  // Close modal with exit animation
  const closeModal = () => {
    setAnimateModal(false);
    setTimeout(() => {
      setIsModalOpen(false);
      setSendSuccess(null);
    }, 300); // match transition duration
  };

  // Trigger enter animation when modal opens
  useEffect(() => {
    if (isModalOpen) {
      // allow mount before animating
      setTimeout(() => setAnimateModal(true), 10);
    }
  }, [isModalOpen]);

  // Auto-close modal 2s after successful send
  useEffect(() => {
    if (sendSuccess === true) {
      const timer = setTimeout(() => {
        closeModal();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [sendSuccess]);

  return (
    <div className="bg-transparent" ref={ref}>
      <div className="max-w-7xl mx-auto mobile-container pt-0 pb-64 sm:pb-48 md:pb-64 lg:pb-0 relative">
        {/* Top Section: Title and Description */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 mt-0 mb-4 sm:mb-6">
          <div className="w-full lg:w-[55%]">
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
          <div className="w-full lg:w-[45%] flex flex-col justify-end">
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
                  <DestinationSlice
                    key={`slice-${destination.id}`}
                    destination={destination}
                    index={index}
                    isHovered={isHovered}
                    hasHover={hasHover}
                    numDestinations={numDestinations}
                    width={width}
                    primaryDestinationId={primaryDestination?.id}
                    onMouseEnter={() => handleMouseEnter(index, numDestinations)}
                    onMouseLeave={() => handleMouseLeave(numDestinations)}
                  />
                );
              })}
            </div>

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
          </div>

          {/* Responsive Search Widget */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-[70%] lg:top-auto lg:bottom-[-40px] lg:left-6 lg:right-6 lg:transform-none lg:translate-x-0 z-20 w-[75%] lg:w-auto">
            <div className="search-card bg-white/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl py-3 px-4 sm:py-4 sm:px-6 shadow-lg max-w-6xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center lg:justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-4 col-span-1 sm:col-span-2 lg:col-span-1 lg:flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center touch-target">
                      <MapPin size={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gray-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                      Locations
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
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={e => setCheckInDate(e.target.value)}
                      className="w-full text-sm sm:text-base font-semibold text-gray-900 focus:outline-none focus:ring-0"
                    />
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
                      Total travel days
                    </div>
                    <input
                      type="number"
                      min={1}
                      value={totalNightsValue}
                      onChange={e => setTotalNightsValue(e.target.value)}
                      className="w-full text-sm sm:text-base font-semibold text-gray-900 focus:outline-none focus:ring-0"
                    />
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
                    <input
                      type="number"
                      min={1}
                      className="w-full text-sm sm:text-base font-semibold text-gray-900 focus:outline-none focus:ring-0"
                      value={peopleCount}
                      onChange={e => setPeopleCount(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-span-1 sm:col-span-2 lg:col-span-1 lg:flex-shrink-0 mt-2 sm:mt-4 lg:mt-0">
                  <button className="w-full lg:w-16 lg:h-16 h-12 sm:h-14 bg-gradient-to-r from-coral-pink to-coral-pink/90 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-coral-pink/50 transition-all duration-300 flex items-center justify-center group touch-target-comfort" onClick={() => setIsModalOpen(true)}>
                    <Search size={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7 group-hover:scale-110 transition-transform duration-300" />
                    <span className="ml-2 lg:hidden font-semibold">Search</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className={`fixed inset-0 bg-transparent backdrop-blur-xs sm:backdrop-blur-sm z-50 flex justify-center items-center transition-opacity duration-300 ${animateModal ? 'opacity-100' : 'opacity-0'}`}>
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={closeModal}></div>
          {/* Modal Card */}
          <div className={`bg-white/90 rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg w-full max-w-lg sm:max-w-xl md:max-w-4xl max-h-[80vh] overflow-y-auto transform transition-transform duration-300 ${animateModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}> 
            {/* Drag handle (mobile only) */}
            <div className="w-12 h-1 bg-gray-300 rounded mx-auto mb-4 md:hidden"></div>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Summary Section */}
              <div className="md:w-1/3">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Trip Summary</h2>
                <p className="text-base sm:text-sm text-gray-700 mb-4">
                  Imagine waking up in {destinationsToShow.map(d => d.name).join(', ')} over the next {totalNightsValue} days—sunrise to sunset adventures await! Share a bit about yourself below, and we&apos;ll craft a personalized journey you&apos;ll never forget.
                </p>
                <div className="space-y-4">
                  {['Locations', 'Check In Date', 'Total travel days', 'People'].map((label, idx) => (
                    <div key={idx}>
                      <div className="text-sm font-medium text-gray-600">{label}</div>
                      <div className="text-base font-semibold text-gray-900">
                        {label === 'Locations'
                          ? destinationsToShow.map(d => d.name).join(', ')
                          : label === 'Check In Date'
                          ? checkInDate
                          : label === 'Total travel days'
                          ? totalNightsValue
                          : peopleCount
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Form Section */}
              <form onSubmit={handleSubmit} className="md:w-2/3 flex flex-col space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-driftwood-brown">Name</label>
                  <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-driftwood-brown">Email</label>
                  <input type="email" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-driftwood-brown">Notes</label>
                  <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0" />
                </div>
                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4 border-t border-gray-200">
                  <button type="button" onClick={closeModal} className="px-4 py-2 text-driftwood-brown">Cancel</button>
                  <button type="submit" disabled={isSending} className="px-4 py-2 bg-coral-pink text-white rounded-lg shadow hover:shadow-md transition">{isSending ? 'Sending...' : 'Send'}</button>
                </div>
                {sendSuccess === true && <p className="text-sm text-green-600">Your request has been sent!</p>}
                {sendSuccess === false && <p className="text-sm text-red-600">Something went wrong. Please try again.</p>}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}));

Hero.displayName = 'Hero';

export default Hero;