import React, { useState } from 'react';
import { ArrowLeft, Share2, Download, Calendar, MapPin, DollarSign } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import DayTabs from './itinerary/DayTabs';
import ActivityCards from './itinerary/ActivityCards';
import AIAssistant from './itinerary/AIAssistant';
import ExportOptions from './itinerary/ExportOptions';

const ItineraryView: React.FC = () => {
  const { currentTrip, setCurrentView } = useApp();
  const [selectedDay, setSelectedDay] = useState(1);
  const [showExportOptions, setShowExportOptions] = useState(false);

  if (!currentTrip) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No Trip Selected
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Please select a trip from your dashboard to view the itinerary
          </p>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const tripDuration = Math.ceil(
    (new Date(currentTrip.endDate).getTime() - new Date(currentTrip.startDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('dashboard')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div>
                <h1 className="text-xxlarge font-bold font-headline text-gray-900 dark:text-gray-100">
                  {currentTrip.title}
                </h1>
                <div className="flex items-center space-x-6 mt-2 text-medium text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{currentTrip.destination}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(currentTrip.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4" />
                    <span>${currentTrip.budget}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowExportOptions(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span className="hidden md:inline">Export</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                <Share2 className="h-4 w-4" />
                <span className="hidden md:inline">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <DayTabs 
              tripDuration={tripDuration}
              selectedDay={selectedDay}
              onDaySelect={setSelectedDay}
            />
            <ActivityCards 
              selectedDay={selectedDay}
              trip={currentTrip}
            />
          </div>
          <div className="lg:col-span-1">
            <AIAssistant />
          </div>
        </div>
      </div>

      {showExportOptions && (
        <ExportOptions onClose={() => setShowExportOptions(false)} />
      )}
    </div>
  );
};

export default ItineraryView;