import React from 'react';
import { Plus } from 'lucide-react';
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
    <div className="mb-8">
      <div 
        onClick={handlePlanNewTrip}
        className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 cursor-pointer hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Plan a New Trip</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Create a personalized itinerary based on your preferences
            </p>
          </div>
          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors">
            <Plus className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanTripCard;