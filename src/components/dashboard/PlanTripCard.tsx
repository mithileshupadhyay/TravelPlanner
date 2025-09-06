import React from 'react';
import { MapPin, Calendar, Star, ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="text-center py-20 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-800/50 dark:via-slate-900 dark:to-blue-950/30 rounded-3xl"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      
      <div className="relative z-10">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-6">
            ✈️ Your Journey Starts Here
          </span>
        </div>
        <h1 className="text-largedisplay font-bold font-headline mb-8 text-slate-900 dark:text-white leading-tight">
          Plan Your Perfect
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Travel Experience
          </span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Create personalized itineraries, discover hidden gems, and make every journey unforgettable with our intelligent travel planning platform.
        </p>
        
        {/* CTA Button */}
        <div className="mb-16">
          <button className="group inline-flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-1">
            <span>Start Planning Now</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <MapPin className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-slate-900 dark:text-white">150+</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Destinations</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-slate-900 dark:text-white">1,200+</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Trips Planned</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-slate-900 dark:text-white">4.8</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">User Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;