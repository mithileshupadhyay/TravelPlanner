import React from 'react';
import { Clock, MapPin, Plus } from 'lucide-react';
import { Trip } from '../../types/Trip';

interface ActivityCardsProps {
  selectedDay: number;
  trip: Trip;
}

const ActivityCards: React.FC<ActivityCardsProps> = ({ selectedDay, trip }) => {
  // Sample activities for demonstration
  const sampleActivities = [
    {
      id: '1',
      time: '09:00',
      title: 'Breakfast at Local Café',
      location: 'Downtown Area',
      duration: '1 hour',
      category: 'food' as const,
      icon: '☕'
    },
    {
      id: '2',
      time: '10:30',
      title: 'Historic City Tour',
      location: 'Old Town',
      duration: '3 hours',
      category: 'culture' as const,
      icon: '🏛️'
    },
    {
      id: '3',
      time: '14:00',
      title: 'Lunch at Traditional Restaurant',
      location: 'City Center',
      duration: '1.5 hours',
      category: 'food' as const,
      icon: '🍽️'
    },
    {
      id: '4',
      time: '16:00',
      title: 'Museum Visit',
      location: 'Arts District',
      duration: '2 hours',
      category: 'culture' as const,
      icon: '🎨'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'food':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-950/30 dark:text-orange-300';
      case 'culture':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950/30 dark:text-purple-300';
      case 'adventure':
        return 'bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300';
      case 'sightseeing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xxlarge font-bold font-headline text-gray-900 dark:text-gray-100">
          Day {selectedDay} Schedule
        </h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add Activity</span>
        </button>
      </div>

      <div className="space-y-4">
        {sampleActivities.map((activity, index) => (
          <div
            key={activity.id}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-start space-x-4">
              {/* Time */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold">
                  {activity.time}
                </div>
              </div>

              {/* Activity Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {activity.icon} {activity.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{activity.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{activity.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getCategoryColor(activity.category)}`}>
                    {activity.category}
                  </span>
                </div>

                {/* Connection line to next activity */}
                {index < sampleActivities.length - 1 && (
                  <div className="absolute left-8 mt-4 w-px h-6 bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-600"></div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add activity prompt */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border-2 border-dashed border-gray-200 dark:border-gray-700 text-center hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer group">
        <Plus className="h-8 w-8 text-gray-400 group-hover:text-blue-500 mx-auto mb-3 transition-colors" />
        <p className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          Add more activities to your day
        </p>
      </div>
    </div>
  );
};

export default ActivityCards;