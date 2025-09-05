import React, { useState } from 'react';
import { Search, MapPin, Sparkles } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { destinationSuggestions } from '../../data/mockData';

const PlanningStep1: React.FC = () => {
  const { planningData, setPlanningData } = useApp();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(destinationSuggestions);

  const handleDestinationChange = (value: string) => {
    setPlanningData({ ...planningData, destination: value });
    const filtered = destinationSuggestions.filter(dest =>
      dest.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setShowSuggestions(value.length > 0);
  };

  const selectDestination = (destination: string) => {
    setPlanningData({ ...planningData, destination });
    setShowSuggestions(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
          <MapPin className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-xxxlarge font-bold font-headline text-gray-900 dark:text-gray-100 mb-4">
          Where do you want to go?
        </h2>
        <p className="text-large text-gray-600 dark:text-gray-400">
          Tell us your dream destination and we'll help you plan the perfect trip
        </p>
      </div>

      <div className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search destinations..."
            value={planningData.destination}
            onChange={(e) => handleDestinationChange(e.target.value)}
            onFocus={() => setShowSuggestions(planningData.destination.length > 0)}
            className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* AI Suggestions */}
        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 max-h-64 overflow-y-auto z-10">
            <div className="p-3 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Sparkles className="h-4 w-4 text-purple-500" />
                <span>TravelYatri Suggestions</span>
              </div>
            </div>
            {filteredSuggestions.slice(0, 8).map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => selectDestination(suggestion)}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-50 dark:border-gray-700 last:border-b-0"
              >
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-900 dark:text-gray-100">{suggestion}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Popular Destinations */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Popular Destinations
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {destinationSuggestions.slice(0, 6).map((destination) => (
            <button
              key={destination}
              onClick={() => selectDestination(destination)}
              className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all text-left group"
            >
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {destination}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanningStep1;