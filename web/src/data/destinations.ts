/**
 * Destinations Data File
 * Contains data for all Panama DMC destinations and related structures
 */

import { Destination, DestinationCombination } from '../types/destination';

/**
 * Array containing all available destinations for the Panama DMC
 * Will be populated with data for: Bocas del Toro, Chiriquí, Las Perlas, Guna Yala, Panama Ciudad
 */
export const destinations: Destination[] = [
  // Bocas del Toro - Caribbean coast, primary DMC expertise
  {
    id: 'bocas-del-toro',
    name: 'Bocas del Toro',
    description: 'Your trusted local gateway to the Caribbean paradise of Bocas del Toro. Experience authentic adventures with our expert local knowledge. From pristine beaches and crystal-clear waters to vibrant coral reefs and diverse wildlife, Bocas offers the perfect blend of relaxation and adventure in Panama\'s most beautiful Caribbean archipelago.',
    shortDescription: 'Caribbean paradise with pristine beaches, coral reefs, and authentic island adventures.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop&crop=center', // Bocas del Toro Caribbean paradise
    mobileImage: '/destinations/bocas-mobile.jpg',
    theme: 'Caribbean',
    primaryActivities: [
      'Island hopping',
      'Snorkeling and diving',
      'Wildlife watching',
      'Beach relaxation',
      'Water sports',
      'Dolphin tours'
    ],
    targetDuration: '3-5 days',
    keyHighlights: [
      'Red Frog Beach',
      'Bastimentos National Park',
      'Dolphin Bay',
      'Starfish Beach',
      'Coral reefs diving',
      'Local Ngöbe culture'
    ]
  },

  // Chiriquí - Mountain region, coffee and adventure
  {
    id: 'chiriqui',
    name: 'Chiriquí',
    description: 'Discover Panama\'s highland paradise where coffee plantations meet cloud forests and volcanic peaks. Chiriquí offers the perfect escape for adventure seekers and culture enthusiasts, with world-renowned coffee tours, challenging hikes, and breathtaking mountain landscapes that showcase Panama\'s incredible biodiversity.',
    shortDescription: 'Mountain paradise with coffee plantations, volcano hiking, and cloud forest adventures.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&crop=center', // Chiriquí mountains
    mobileImage: '/destinations/chiriqui-mobile.jpg',
    theme: 'Mountain',
    primaryActivities: [
      'Coffee plantation tours',
      'Volcano hiking',
      'Hot springs relaxation',
      'Birdwatching',
      'Cloud forest trekking',
      'Cultural experiences'
    ],
    targetDuration: '2-4 days',
    keyHighlights: [
      'Volcán Barú summit',
      'Boquete coffee farms',
      'Caldera Hot Springs',
      'Quetzal trail',
      'Cloud forest canopy',
      'Indigenous communities'
    ]
  },

  // Las Perlas - Pacific islands, luxury and exclusivity
  {
    id: 'las-perlas',
    name: 'Las Perlas',
    description: 'Escape to the exclusive Pacific paradise of Las Perlas archipelago, where pristine beaches meet luxury accommodations and world-class fishing. This collection of 90+ islands offers unparalleled tranquility, crystal-clear Pacific waters, and the rich history of Panama\'s pearl diving heritage in an intimate, sophisticated setting.',
    shortDescription: 'Exclusive Pacific islands with luxury resorts, pristine beaches, and pearl diving history.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop&crop=center', // Pacific island paradise
    mobileImage: '/destinations/perlas-mobile.jpg',
    theme: 'Pacific Islands',
    primaryActivities: [
      'Luxury island hopping',
      'Deep sea fishing',
      'Scuba diving',
      'Beach relaxation',
      'Pearl farm tours',
      'Yacht charters'
    ],
    targetDuration: '3-5 days',
    keyHighlights: [
      'Contadora Island',
      'Pearl diving history',
      'Luxury resorts',
      'Private beaches',
      'World-class fishing',
      'Pacific sunset views'
    ]
    },

  // Guna Yala - Indigenous culture and San Blas islands
  {
    id: 'guna-yala',
    name: 'Guna Yala',
    description: 'Experience authentic indigenous culture in the pristine San Blas islands of Guna Yala, an autonomous Guna territory offering unique insights into traditional Caribbean coast life. This untouched paradise features crystal-clear waters, traditional sailing vessels, and the opportunity to connect with the vibrant Guna people and their ancient customs.',
    shortDescription: 'Authentic indigenous culture, traditional island life, and pristine San Blas archipelago.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&crop=top', // Traditional San Blas sailing
    mobileImage: '/destinations/guna-yala-mobile.jpg',
    theme: 'Indigenous Culture',
    primaryActivities: [
      'Cultural immersion',
      'Traditional sailing',
      'Island exploration',
      'Artisan workshops',
      'Community visits',
      'Traditional fishing'
    ],
    targetDuration: '2-3 days',
    keyHighlights: [
      'San Blas islands',
      'Guna traditional culture',
      'Mola textile art',
      'Traditional sailing boats',
      'Pristine Caribbean waters',
      'Authentic community experiences'
    ]
  },

  // Panama Ciudad - Urban center, history and modernity
  {
    id: 'panama-ciudad',
    name: 'Panama Ciudad',
    description: 'Discover the cosmopolitan heart of Panama where historic colonial charm meets modern urban sophistication. Panama City offers world-class dining, impressive skyline views, and the engineering marvel of the Panama Canal, making it the perfect gateway for business travelers and culture enthusiasts exploring Panama\'s rich heritage.',
    shortDescription: 'Cosmopolitan capital with historic charm, Panama Canal, and modern urban experiences.',
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1200&h=800&fit=crop&crop=center', // Panama City skyline
    mobileImage: '/destinations/panama-ciudad-mobile.jpg',
    theme: 'Urban',
    primaryActivities: [
      'Historic district tours',
      'Panama Canal visits',
      'Culinary experiences',
      'Museum visits',
      'Shopping districts',
      'Rooftop experiences'
    ],
    targetDuration: '2-3 days',
    keyHighlights: [
      'Casco Viejo historic quarter',
      'Panama Canal observation',
      'Modern financial district',
      'Metropolitan Cathedral',
      'Local markets',
      'Fine dining scene'
    ]
  }
];

/**
 * Placeholder for destination combinations
 * Will contain pre-generated combinations for common destination pairings
 */
export const destinationCombinations: DestinationCombination[] = [
  // TODO: Implement combination logic in later phases
];

/**
 * Default destination ID for initial page load
 * Bocas del Toro as the primary expertise area
 */
export const DEFAULT_DESTINATION_ID = 'bocas-del-toro';

/**
 * Maximum number of destinations that can be combined
 * No limit - users can select as many destinations as they want
 */
export const MAX_DESTINATIONS = Infinity;

/**
 * Minimum number of destinations required for combinations
 */
export const MIN_DESTINATIONS = 1;

/**
 * Re-export utility functions for easy access
 */
export {
  getDestinationById,
  getDestinationsByTheme,
  filterDestinationsByActivity,
  getDestinationsByIds,
  combineDestinations,
  isValidDestinationCombination,
  getAllDestinationThemes,
  getAllActivities
} from '../utils/destinationUtils'; 