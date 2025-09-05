import React from 'react';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const StickyBottomCTA: React.FC = () => {
  const { planningData, setPlanningData, setCurrentView, addTrip, setCurrentTrip } = useApp();

  const canProceed = () => {
    switch (planningData.currentStep) {
      case 1:
        return planningData.destination.length > 0;
      case 2:
        return planningData.startDate && planningData.endDate;
      case 3:
        return planningData.preferences.length > 0;
      case 4:
        return planningData.budget > 0;
      default:
        return false;
    }
  };

  const getButtonText = () => {
    if (planningData.currentStep === 4) {
      return 'Generate Itinerary';
    }
    return 'Continue';
  };

  const handleNext = () => {
    if (planningData.currentStep === 4) {
      // Generate and save the trip
      const newTrip = {
        id: Date.now().toString(),
        title: `Trip to ${planningData.destination}`,
        destination: planningData.destination,
        startDate: planningData.startDate,
        endDate: planningData.endDate,
        budget: planningData.budget,
        preferences: planningData.preferences,
        status: 'planned' as const,
        coverImage: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800',
        days: []
      };
      
      addTrip(newTrip);
      setCurrentTrip(newTrip);
      setCurrentView('itinerary');
    } else {
      setPlanningData({
        ...planningData,
        currentStep: planningData.currentStep + 1
      });
    }
  };

  const handleBack = () => {
    if (planningData.currentStep > 1) {
      setPlanningData({
        ...planningData,
        currentStep: planningData.currentStep - 1
      });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 p-4 md:p-6 z-40">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <button
          onClick={handleBack}
          disabled={planningData.currentStep === 1}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
            planningData.currentStep === 1
              ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>

        <div className="text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Step {planningData.currentStep} of 4
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500">
            {canProceed() ? 'Ready to continue' : 'Complete this step to continue'}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition-all transform ${
            canProceed()
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:scale-105 active:scale-95'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>{getButtonText()}</span>
          {planningData.currentStep === 4 ? (
            <Check className="h-4 w-4" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default StickyBottomCTA;