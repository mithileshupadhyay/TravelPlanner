import React from 'react';
import { DollarSign, Info } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const PlanningStep4: React.FC = () => {
  const { planningData, setPlanningData } = useApp();

  const budgetRanges = [
    { min: 0, max: 500, label: 'Budget', description: 'Hostels, street food, public transport' },
    { min: 500, max: 1500, label: 'Moderate', description: '3-star hotels, local restaurants, some tours' },
    { min: 1500, max: 3000, label: 'Comfortable', description: '4-star hotels, nice dining, private tours' },
    { min: 3000, max: 5000, label: 'Luxury', description: '5-star hotels, fine dining, exclusive experiences' },
    { min: 5000, max: 10000, label: 'Ultra Luxury', description: 'Premium everything, private jets, concierge' }
  ];

  const getCurrentRange = () => {
    return budgetRanges.find(range => 
      planningData.budget >= range.min && planningData.budget < range.max
    ) || budgetRanges[budgetRanges.length - 1];
  };

  const handleBudgetChange = (value: number) => {
    setPlanningData({ ...planningData, budget: value });
  };

  const currentRange = getCurrentRange();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6">
          <DollarSign className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-xxxlarge font-bold font-headline text-gray-900 dark:text-gray-100 mb-4">
          What's your budget?
        </h2>
        <p className="text-large text-gray-600 dark:text-gray-400">
          Help us customize your trip to fit your budget perfectly
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Current Budget Display */}
        <div className="text-center mb-8">
          <div className="text-4xl font-bold font-poppins text-gray-900 dark:text-gray-100 mb-2">
            ${planningData.budget.toLocaleString()}
          </div>
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-950/30 dark:to-purple-950/30 rounded-full">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {currentRange.label} Range
            </span>
          </div>
        </div>

        {/* Budget Slider */}
        <div className="mb-8">
          <input
            type="range"
            min="200"
            max="10000"
            step="100"
            value={planningData.budget}
            onChange={(e) => handleBudgetChange(Number(e.target.value))}
            className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
            <span>$200</span>
            <span>$10,000+</span>
          </div>
        </div>

        {/* Current Range Info */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {currentRange.label} Travel Style
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {currentRange.description}
              </p>
            </div>
          </div>
        </div>

        {/* Budget Breakdown Preview */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl">
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              ${Math.round(planningData.budget * 0.4)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Accommodation</div>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-950/30 rounded-xl">
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              ${Math.round(planningData.budget * 0.3)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Activities</div>
          </div>
          <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/30 rounded-xl">
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              ${Math.round(planningData.budget * 0.3)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Food & Other</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanningStep4;