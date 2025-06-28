'use client';

import React from 'react';
import { MapPin, MessageCircle, Mail, FileText, Download, Cloud, BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-driftwood-brown text-sand-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Logo & Tagline */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-coral-pink rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-sand-ivory rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-coral-pink rounded-full"></div>
                </div>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">LOCAL FROM BOCAS</h3>
                <p className="text-sm text-sand-ivory/80">Locals Know Best</p>
              </div>
            </div>
            <p className="text-sand-ivory/90 text-sm leading-relaxed">
              Discover the authentic Panamanian Caribbean experience with local guides who know every corner of this paradise.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-coral-pink">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-coral-pink flex-shrink-0" />
                <span className="text-sm">Bocas del Toro, Panama</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle size={18} className="text-coral-pink flex-shrink-0" />
                <a href="https://wa.me/50769545262" className="text-sm hover:text-coral-pink transition-colors">
                  +507 6954-5262
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-coral-pink flex-shrink-0" />
                <a href="mailto:hello@localfrombocas.com" className="text-sm hover:text-coral-pink transition-colors">
                  hello@localfrombocas.com
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-coral-pink">Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-coral-pink transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-coral-pink rounded-full"></span>
                  Cultural Experiences
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-coral-pink transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-coral-pink rounded-full"></span>
                  Eco-Tours
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-coral-pink transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-coral-pink rounded-full"></span>
                  Local Accommodation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-coral-pink transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-coral-pink rounded-full"></span>
                  Transportation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-coral-pink transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-coral-pink rounded-full"></span>
                  Gastronomy
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-coral-pink">Resources</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-coral-pink flex-shrink-0" />
                <div>
                  <a href="#" className="text-sm hover:text-coral-pink transition-colors block">Newsletter</a>
                  <span className="text-xs text-sand-ivory/70">"Local Secrets"</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Download size={18} className="text-coral-pink flex-shrink-0" />
                <div>
                  <a href="#" className="text-sm hover:text-coral-pink transition-colors block">PDF Guides</a>
                  <span className="text-xs text-sand-ivory/70">Free download</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Cloud size={18} className="text-coral-pink flex-shrink-0" />
                <div>
                  <span className="text-sm">Current Weather</span>
                  <span className="text-xs text-sand-ivory/70 block">28°C, Sunny</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BookOpen size={18} className="text-coral-pink flex-shrink-0" />
                <a href="#" className="text-sm hover:text-coral-pink transition-colors">
                  Local Blog
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-sand-ivory/20">
          <div className="max-w-md mx-auto text-center lg:text-left lg:max-w-none lg:flex lg:items-center lg:justify-between">
            <div className="lg:flex-1">
              <h5 className="font-semibold text-lg mb-2">Stay Connected</h5>
              <p className="text-sm text-sand-ivory/80 mb-4 lg:mb-0">
                Receive exclusive tips and special offers from our local guides
              </p>
            </div>
            <div className="lg:flex-shrink-0 lg:ml-8">
              <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto lg:max-w-none">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-full text-driftwood-brown text-sm focus:outline-none focus:ring-2 focus:ring-coral-pink"
                />
                <button className="px-6 py-2 bg-coral-pink text-white rounded-full text-sm font-semibold hover:bg-coral-pink/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-sand-ivory/20 flex flex-col sm:flex-row justify-between items-center text-sm text-sand-ivory/70">
          <p>&copy; 2024 Local From Bocas. Todos los derechos reservados.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-coral-pink transition-colors">Privacidad</a>
            <a href="#" className="hover:text-coral-pink transition-colors">Términos</a>
            <a href="#" className="hover:text-coral-pink transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 