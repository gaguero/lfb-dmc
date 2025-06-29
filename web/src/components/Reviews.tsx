'use client';

import React, { memo } from 'react';
import { Star, Quote, MessageCircle } from 'lucide-react';

const Reviews = memo(() => {
  const reviews = [
    {
      id: 1,
      name: "María González",
      location: "Panama City",
      rating: 5,
      text: "An incredible experience with Local From Bocas. The local guides know every secret corner of the archipelago. Totally recommended!",
      avatar: "MG"
    },
    {
      id: 2,
      name: "James Wilson",
      location: "United States",
      rating: 5,
      text: "The authentic local experience we were looking for! From hidden beaches to traditional cuisine, everything was perfectly organized.",
      avatar: "JW"
    },
    {
      id: 3,
      name: "Carlos Mendoza",
      location: "Costa Rica",
      rating: 5,
      text: "The inter-island transport was excellent and staying in traditional cabins connected us with the local culture. A unique adventure.",
      avatar: "CM"
    },
    {
      id: 4,
      name: "Sophie Laurent",
      location: "France",
      rating: 5,
      text: "Bocas del Toro revealed by passionate locals. The ecological tours and Caribbean gastronomy exceeded our expectations!",
      avatar: "SL"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={`${
          index < rating
            ? 'text-coral-pink fill-coral-pink'
            : 'text-sand-ivory/30'
        }`}
      />
    ));
  };

  return (
    <section className="bg-sand-ivory py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-driftwood-brown mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-driftwood-brown/80 text-lg max-w-2xl mx-auto">
            Authentic experiences shared by those who have discovered the real Bocas del Toro
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-coral-pink rounded-full flex items-center justify-center">
                <Quote size={16} className="text-white" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {renderStars(review.rating)}
              </div>

              {/* Review Text */}
              <p className="text-driftwood-brown/90 text-sm leading-relaxed mb-6 line-clamp-4">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Reviewer Info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-coral-pink/10 rounded-full flex items-center justify-center">
                  <span className="text-coral-pink font-semibold text-sm">
                    {review.avatar}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-driftwood-brown text-sm">
                    {review.name}
                  </h4>
                  <p className="text-driftwood-brown/60 text-xs">
                    {review.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-driftwood-brown/80 mb-6">
            Ready to create your own story in Bocas del Toro?
          </p>
          <a href="https://wa.me/50769545262" className="inline-flex items-center gap-2 bg-coral-pink text-white px-8 py-3 rounded-full font-semibold hover:bg-coral-pink/90 transition-colors">
            <MessageCircle size={18} />
            Contact us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
});

Reviews.displayName = 'Reviews';

export default Reviews; 