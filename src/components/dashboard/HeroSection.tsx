import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="text-center py-12">
      <div>
        <h1 className="text-4xl font-light text-gray-900 dark:text-white mb-4">
          Plan Your Perfect Trip
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Create detailed itineraries and discover amazing destinations with our intelligent travel planning assistant.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;