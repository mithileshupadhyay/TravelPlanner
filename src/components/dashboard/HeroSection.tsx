import React from 'react';
import { MapPin, Calendar, Star } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="text-center py-16 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/50 dark:via-purple-950/50 dark:to-pink-950/50 rounded-3xl"></div>
      
      <div className="relative z-10">
        <h1 className="text-largedisplay font-bold font-headline mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-gray-100 dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
          Plan Your Perfect
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Adventure
          </span>
        </h1>
        <p className="text-large text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto line-height-loose">
          Create detailed itineraries, discover amazing destinations, and make every trip unforgettable with our AI-powered travel planning assistant.
        </p>
        
        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <MapPin className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">150+</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Destinations</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="h-5 w-5 text-purple-600 mr-2" />
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">1,200+</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Trips Planned</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-5 w-5 text-yellow-600 mr-2" />
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">4.8</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">User Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;