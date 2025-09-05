import React from 'react';
import { Calendar, MapPin, DollarSign, MoreHorizontal } from 'lucide-react';
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
    <section className="mt-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xxxlarge font-bold font-headline text-gray-900 dark:text-gray-100">
          My Trips
        </h2>
        <button className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
          View All
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {trips.map((trip) => (
          <div
            key={trip.id}
            onClick={() => handleTripClick(trip)}
            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]"
          >
            {/* Trip Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={trip.coverImage}
                alt={trip.destination}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(trip.status)}`}>
                  {trip.status}
                </span>
              </div>
              <button className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/30 rounded-full text-white transition-colors">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>

            {/* Trip Details */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {trip.title}
              </h3>
              
              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">{trip.destination}</span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{new Date(trip.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span>${trip.budget}</span>
                </div>
              </div>

              {/* Preferences */}
              <div className="flex flex-wrap gap-2 mt-4">
                {trip.preferences.slice(0, 3).map((pref) => (
                  <span
                    key={pref}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium"
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