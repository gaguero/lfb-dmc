"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

const Reviews = dynamic(() => import('@/components/Reviews'), {
  loading: () => <p className="text-center py-24">Loading reviews...</p>,
  ssr: false,
});

export default function Home() {
  return (
    <main className="bg-sand-ivory">
      <Navbar />
      <Hero />
      <Reviews />
      <Footer />
    </main>
  );
}
