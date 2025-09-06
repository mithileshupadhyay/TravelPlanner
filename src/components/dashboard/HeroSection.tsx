import React from 'react';
import { MapPin, Calendar, Star } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="text-center py-16 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-slate-800/50 rounded-2xl"></div>
      
      <div className="relative z-10">
        <h1 className="text-largedisplay font-bold font-headline mb-6 text-slate-900 dark:text-white">
          Plan Your Perfect
          <br />
          <span className="text-blue-600">
            Adventure
          </span>
        </h1>
        <p className="text-large text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto line-height-loose">
          Create detailed itineraries, discover amazing destinations, and make every trip unforgettable with our AI-powered travel planning assistant.
        </p>
        
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