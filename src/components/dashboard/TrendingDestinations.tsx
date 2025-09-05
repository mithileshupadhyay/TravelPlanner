import React from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { trendingDestinations } from '../../data/mockData';

const TrendingDestinations: React.FC = () => {
  return (
    <section className="sticky top-24">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-orange-500" />
            <h3 className="text-xlarge font-semibold font-headline text-gray-900 dark:text-gray-100">
              Trending Now
            </h3>
          </div>
          <button className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {trendingDestinations.map((destination) => (
            <div
              key={destination.id}
              className="group flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
            >
              <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {destination.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {destination.country}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingDestinations;