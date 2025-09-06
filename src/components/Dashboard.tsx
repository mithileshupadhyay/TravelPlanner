import React from 'react';
import HeroSection from './dashboard/HeroSection';
import PlanTripCard from './dashboard/PlanTripCard';
import MyTrips from './dashboard/MyTrips';
import TrendingDestinations from './dashboard/TrendingDestinations';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <HeroSection />
            <div className="grid md:grid-cols-2 gap-8">
              <PlanTripCard />
              <MyTrips />
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <TrendingDestinations />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;