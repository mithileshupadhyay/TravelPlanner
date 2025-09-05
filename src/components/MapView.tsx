import React, { useState } from 'react';
import { Filter, Layers, Route, Navigation, MapPin } from 'lucide-react';

const MapView: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const dayOptions = [
    { value: 'all', label: 'All Days' },
    { value: '1', label: 'Day 1' },
    { value: '2', label: 'Day 2' },
    { value: '3', label: 'Day 3' }
  ];

  const categories = [
    { id: 'food', label: 'Food', color: 'bg-orange-500', count: 8 },
    { id: 'sightseeing', label: 'Sightseeing', color: 'bg-blue-500', count: 12 },
    { id: 'culture', label: 'Culture', color: 'bg-purple-500', count: 6 },
    { id: 'adventure', label: 'Adventure', color: 'bg-green-500', count: 4 }
  ];

  return (
    <div className="h-screen relative bg-gray-100 dark:bg-gray-900">
      {/* Map Controls */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="flex items-center justify-between">
          {/* Day Filter */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2">
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="bg-transparent text-gray-900 dark:text-gray-100 font-medium focus:outline-none cursor-pointer"
            >
              {dayOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Filter className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>
            <button className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Layers className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>
            <button className="p-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-colors">
              <Navigation className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-10">
        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center space-x-2">
          <Layers className="h-4 w-4" />
          <span>Legend</span>
        </h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">{category.label}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">({category.count})</span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Route className="h-4 w-4" />
            <span>Optimized route shown</span>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="absolute top-20 left-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-10 w-64">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Filter by Category</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">{category.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Map Placeholder */}
      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
            <MapPin className="h-12 w-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold font-poppins text-gray-700 dark:text-gray-300 mb-2">
            Interactive Map
          </h3>
          <p className="text-medium text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
            Explore your trip route, discover nearby attractions, and visualize your daily activities on an interactive map.
          </p>
          <div className="mt-6 flex items-center justify-center space-x-4 text-small text-gray-500 dark:text-gray-500">
            <span>🗺️ Route visualization</span>
            <span>📍 Activity pins</span>
            <span>🎯 Distance tracking</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;