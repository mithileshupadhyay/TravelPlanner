import React from 'react';
import { ArrowLeft, Bot } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import PlanningStep1 from './planning/PlanningStep1';
import PlanningStep2 from './planning/PlanningStep2';
import PlanningStep3 from './planning/PlanningStep3';
import PlanningStep4 from './planning/PlanningStep4';
import ProgressBar from './planning/ProgressBar';
import StickyBottomCTA from './planning/StickyBottomCTA';

const TripPlanning: React.FC = () => {
  const { setCurrentView, planningData } = useApp();

  const renderCurrentStep = () => {
    switch (planningData.currentStep) {
      case 1:
        return <PlanningStep1 />;
      case 2:
        return <PlanningStep2 />;
      case 3:
        return <PlanningStep3 />;
      case 4:
        return <PlanningStep4 />;
      default:
        return <PlanningStep1 />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div>
              <h1 className="text-xxlarge font-bold font-headline text-gray-900 dark:text-gray-100">
                Plan Your Trip
              </h1>
              <p className="text-medium text-gray-600 dark:text-gray-400">
                Step {planningData.currentStep} of 4
              </p>
            </div>
          </div>
          <ProgressBar />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
        {planningData.currentStep === 1 && (
          <div className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 font-headline">
                  Welcome to TravelYatri! 👋
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  I'm your personal travel expert with years of experience planning unforgettable trips. 
                  I'm here to help you create the perfect itinerary based on your preferences, budget, and travel style. 
                  Let's start by finding your ideal destination!
                </p>
              </div>
            </div>
          </div>
        )}
        {renderCurrentStep()}
      </div>

      <StickyBottomCTA />
    </div>
  );
};

export default TripPlanning;