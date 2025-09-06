import React from 'react';
import { Calendar, MapPin, ArrowRight, Clock } from 'lucide-react';
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
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-300';
      case 'ongoing':
        return 'bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300';
      case 'completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getTripDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          <h3 className="text-xlarge font-semibold font-headline text-gray-900 dark:text-gray-100">
            My Trips
          </h3>
        </div>
        <button
          onClick={() => setCurrentView('profile')}
          className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline"
        >
          View All
        </button>
      </div>

      <div className="space-y-4">
        {trips.slice(0, 3).map((trip) => (
          <div
            key={trip.id}
            onClick={() => handleTripClick(trip)}
            className="group relative bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                    {trip.title}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(trip.status)}`}>
                    {trip.status}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{trip.destination}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{getTripDuration(trip.startDate, trip.endDate)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    ${trip.budget.toLocaleString()}
                  </div>
                </div>

                {trip.preferences.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {trip.preferences.slice(0, 2).map((pref) => (
                      <span
                        key={pref}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 rounded-md text-xs font-medium"
                      >
                        {pref}
                      </span>
                    ))}
                    {trip.preferences.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md text-xs">
                        +{trip.preferences.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all ml-2 flex-shrink-0" />
            </div>
          </div>
        ))}
      </div>

      {trips.length === 0 && (
        <div className="text-center py-8">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 mb-4">No trips planned yet</p>
          <button
            onClick={() => setCurrentView('planning')}
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Plan your first trip
          </button>
        </div>
      )}
    </div>
  );
};

export default MyTrips;