import React from 'react';
import { Calendar, MapPin, DollarSign } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const MyTrips: React.FC = () => {
  const { trips, setCurrentTrip, setCurrentView } = useApp();

  const handleTripClick = (trip: any) => {
    setCurrentTrip(trip);
    setCurrentView('itinerary');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'ongoing':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300';
    }
  };

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          My Trips
        </h2>
        <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          View All
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {trips.map((trip) => (
          <div
            key={trip.id}
            onClick={() => handleTripClick(trip)}
            className="group bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
          >
            {/* Trip Image */}
            <div className="relative h-40 overflow-hidden">
              <img
                src={trip.coverImage}
                alt={trip.destination}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getStatusColor(trip.status)}`}>
                  {trip.status}
                </span>
              </div>
            </div>

            {/* Trip Details */}
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {trip.destination}
              </h3>
              
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{new Date(trip.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-3 w-3 mr-1" />
                  <span>${trip.budget}</span>
                </div>
              </div>

              {/* Preferences */}
              <div className="flex flex-wrap gap-1">
                {trip.preferences.slice(0, 3).map((pref) => (
                  <span
                    key={pref}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                  >
                    {pref}
                  </span>
                ))}
                {trip.preferences.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium">
                    +{trip.preferences.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyTrips;