import React from 'react';
import { TrendingUp } from 'lucide-react';
import { trendingDestinations } from '../../data/mockData';

const TrendingDestinations: React.FC = () => {
  return (
    <section className="sticky top-20">
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Trending Now
            </h3>
          </div>
          <button className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            View All
          </button>
        </div>

        <div className="space-y-3">
          {trendingDestinations.map((destination) => (
            <div
              key={destination.id}
              className="group flex items-center space-x-3 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
            >
              <div className="relative w-10 h-10 rounded overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                  {destination.name}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                  {destination.country}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingDestinations;