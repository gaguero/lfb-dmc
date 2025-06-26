'use client';

import React from 'react';
import { User } from 'lucide-react';
import { usePrimaryDestination } from '@/contexts/DestinationContext';
import { destinations } from '@/data/destinations';

const Navbar = () => {
  const { primaryDestination, setPrimaryDestination } = usePrimaryDestination();

  return (
    <header className="relative z-50 bg-sand-ivory">
      <div className="max-w-7xl mx-auto mt-8 px-6 pt-0 pb-15">
        <div className="flex items-center justify-between w-full">
          {/* Logo - Izquierda */}
          <div className="flex-shrink-0">
            <img src="/lfb-logo recortado.png" alt="Local From Bocas" className="h-5 w-40" />
          </div>
          
          {/* Navegación Central - Destinos */}
          <nav className="flex-1 flex justify-center pt-6">
            <div className="flex items-center bg-white rounded-full px-6 py-3 shadow-lg">
              <div className="flex items-center space-x-4 text-sm font-medium">
                {destinations.map((destination) => (
                  <button
                    key={destination.id}
                    onClick={() => setPrimaryDestination(destination)}
                    className={`px-3 py-2 rounded-full transition-all text-center whitespace-nowrap leading-tight text-xs ${
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
          
          {/* Icono de Perfil - Derecha */}
          <div className="flex-shrink-0 pt-6">
            <button className="p-2 hover:bg-gray-50 rounded-full transition-all">
              <User size={20} className="text-driftwood-brown" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 