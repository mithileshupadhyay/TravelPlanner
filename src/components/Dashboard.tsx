import React from 'react';
import HeroSection from './dashboard/HeroSection';
import PlanTripCard from './dashboard/PlanTripCard';
import MyTrips from './dashboard/MyTrips';
import TrendingDestinations from './dashboard/TrendingDestinations';
import AIAssistantCard from './dashboard/AIAssistantCard';

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <HeroSection />
      
      {/* AI Assistant Section */}
      <div className="mt-12">
        <AIAssistantCard />
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8 mt-12">
        <div className="lg:col-span-2">
          <PlanTripCard />
          <MyTrips />
        </div>
        <div>
          <TrendingDestinations />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;