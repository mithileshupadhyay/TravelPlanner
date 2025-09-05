import React from 'react';
import { useApp } from '../contexts/AppContext';
import Header from './Header';
import Dashboard from './Dashboard';
import TripPlanning from './TripPlanning';
import ItineraryView from './ItineraryView';
import MapView from './MapView';
import ProfileSettings from './ProfileSettings';
import MobileNav from './MobileNav';

const AppRouter: React.FC = () => {
  const { currentView } = useApp();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'planning':
        return <TripPlanning />;
      case 'itinerary':
        return <ItineraryView />;
      case 'map':
        return <MapView />;
      case 'profile':
        return <ProfileSettings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        {renderCurrentView()}
      </main>
      <MobileNav />
    </div>
  );
};

export default AppRouter;