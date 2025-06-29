/**
 * Not Found Page (404)
 * This page is shown when a requested route is not found
 * It's a Next.js App Router convention file
 */

import React from 'react';
import Link from 'next/link';
import { Home, Search, MapPin } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-sand-ivory flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* 404 Illustration */}
          <div className="mx-auto w-24 h-24 bg-coral-pink/10 rounded-full flex items-center justify-center mb-6">
            <MapPin className="w-12 h-12 text-coral-pink" />
          </div>

          {/* Error Message */}
          <h1 className="text-6xl font-bold text-driftwood-brown mb-4">
            404
          </h1>
          
          <h2 className="text-2xl font-semibold text-driftwood-brown mb-4">
            Destination Not Found
          </h2>
          
          <p className="text-gray-600 mb-8">
            Looks like this page wandered off the beaten path. Let's get you back to exploring Panama's beautiful destinations!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-coral-pink text-white px-6 py-3 rounded-lg hover:bg-coral-pink/90 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            
            <Link
              href="/"
              className="bg-white border-2 border-coral-pink text-coral-pink px-6 py-3 rounded-lg hover:bg-coral-pink/5 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              Explore Destinations
            </Link>
          </div>

          {/* Additional Help */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Looking for something specific? Try starting from our{' '}
              <Link href="/" className="text-coral-pink hover:text-coral-pink/80 underline">
                homepage
              </Link>
              {' '}to find your perfect Panama adventure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 