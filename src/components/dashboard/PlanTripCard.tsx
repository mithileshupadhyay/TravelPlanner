import React from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const PlanTripCard: React.FC = () => {
  const { setCurrentView, setPlanningData } = useApp();

  const handlePlanNewTrip = () => {
    setPlanningData({
      destination: '',
      startDate: '',
      endDate: '',
      preferences: [],
      budget: 1000,
      currentStep: 1
    });
    setCurrentView('planning');
  };

  return (
    <div className="mb-12">
      <div 
        onClick={handlePlanNewTrip}
        className="group relative bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-8 cursor-pointer overflow-hidden hover:scale-[1.02] transition-transform duration-300"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 text-6xl">✈️</div>
          <div className="absolute bottom-8 left-8 text-4xl">🗺️</div>
          <div className="absolute top-1/2 right-1/3 text-3xl">🌟</div>
        </div>

        <div className="relative z-10 text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xxlarge font-bold font-headline">Plan a New Trip</h2>
            <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
              <Plus className="h-6 w-6" />
            </div>
          </div>
          <p className="text-white/90 mb-6 text-large line-height-loose">
            Let our AI assistant create a personalized itinerary based on your preferences, budget, and travel style.
          </p>
          <div className="flex items-center space-x-2 text-white/80">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Powered by AI</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanTripCard;