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
        className="group relative bg-blue-600 hover:bg-blue-700 rounded-2xl p-8 cursor-pointer overflow-hidden transition-colors duration-300"
      >
        <div className="relative z-10 text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xxlarge font-bold font-headline">Plan a New Trip</h2>
            <div className="p-3 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
              <Plus className="h-6 w-6" />
            </div>
          </div>
          <p className="text-white/90 mb-6 text-large line-height-loose">
            Let our AI assistant create a personalized itinerary based on your preferences, budget, and travel style.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlanTripCard;