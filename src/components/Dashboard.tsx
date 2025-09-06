import React from 'react';
import AIAssistantCard from './dashboard/AIAssistantCard';

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          Plan Your Perfect
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Adventure
          </span>
        </h1>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Create detailed itineraries, discover amazing destinations, and make every trip unforgettable with our AI-powered travel planning assistant.
        </p>
      </section>
      
      {/* AI Assistant Section */}
      <div className="mt-8">
        <AIAssistantCard />
      </div>
    </div>
  );
};

export default Dashboard;