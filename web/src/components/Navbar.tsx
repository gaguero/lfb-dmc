'use client';

import React, { useState, useEffect, memo } from 'react';
import Image from 'next/image';
import { User, Menu, X } from 'lucide-react';
import { usePrimaryDestination } from '@/contexts/DestinationContext';
import { destinations } from '@/data/destinations';

const Navbar = memo(() => {
  const { primaryDestination, setPrimaryDestinationOnly } = usePrimaryDestination();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close mobile menu when screen becomes desktop
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('scroll-locked');
    } else {
      document.body.classList.remove('scroll-locked');
    }

    return () => document.body.classList.remove('scroll-locked');
  }, [isMobileMenuOpen]);

  const handleDestinationSelect = (destination: typeof destinations[0]) => {
    setPrimaryDestinationOnly(destination);
    setIsMobileMenuOpen(false); // Close mobile menu after selection
  };

  return (
    <>
      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-backdrop active"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <header className="relative z-50 bg-sand-ivory">
        <div className="max-w-7xl mx-auto mobile-container mt-4 sm:mt-6 lg:mt-8 pt-0 pb-4 sm:pb-8 lg:pb-15">
          <div className="flex items-center justify-between w-full">
            {/* Logo - Responsive sizing */}
            <div className="flex-shrink-0">
              <Image 
                src="/logo-color.png" 
                alt="Local From Bocas" 
                width={140}
                height={40}
                className="h-4 sm:h-5 w-auto" 
                priority={true}
              />
            </div>
            
            {/* Desktop Navigation - Hidden on mobile */}
            <nav className="hidden md:flex flex-1 justify-center pt-1">
              <div className="flex items-center bg-white rounded-full px-4 lg:px-6 py-2 lg:py-3 shadow-lg">
                <div className="flex items-center space-x-2 lg:space-x-4 text-sm font-medium">
                  {destinations.map((destination) => (
                    <button
                      key={destination.id}
                      onClick={() => setPrimaryDestinationOnly(destination)}
                      className={`px-2 lg:px-3 py-2 rounded-full transition-all text-center whitespace-nowrap leading-tight text-xs touch-target ${
                        primaryDestination?.id === destination.id
                          ? 'bg-ocean-blue text-white font-semibold shadow-md'
                          : 'text-driftwood-brown hover:text-coral-pink hover:bg-gray-50'
                      }`}
                    >
                      {destination.name}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
            
            {/* Mobile Navigation Button & Profile */}
            <div className="flex items-center space-x-2">
              {/* Mobile Menu Button - Only visible on mobile */}
              <button 
                className="md:hidden p-2 hover:bg-gray-50 rounded-full transition-all touch-target"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X size={20} className="text-driftwood-brown" />
                ) : (
                  <Menu size={20} className="text-driftwood-brown" />
                )}
              </button>

              {/* Profile Icon */}
              <button className="p-2 hover:bg-gray-50 rounded-full transition-all touch-target">
                <User size={20} className="text-driftwood-brown" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 z-40 md:hidden animate-in slide-in-from-top-2 duration-300">
            <div className="mobile-container py-4">
              <div className="space-y-2">
                {destinations.map((destination) => (
                  <button
                    key={destination.id}
                    onClick={() => handleDestinationSelect(destination)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all touch-target-comfort ${
                      primaryDestination?.id === destination.id
                        ? 'bg-ocean-blue/10 text-ocean-blue font-semibold border border-ocean-blue/20'
                        : 'text-driftwood-brown hover:bg-gray-50 active:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium">{destination.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{destination.theme}</div>
                  </button>
                ))}
              </div>
              
              {/* Mobile Menu Footer */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500 text-center">
                  Tap to select your destination
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar; 