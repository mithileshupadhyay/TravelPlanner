import React from 'react';
import { Home, Map, Plus, User, Calendar } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const MobileNav: React.FC = () => {
  const { currentView, setCurrentView } = useApp();

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'map', icon: Map, label: 'Explore' },
    { id: 'planning', icon: Plus, label: 'Plan' },
    { id: 'itinerary', icon: Calendar, label: 'Trips' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="grid grid-cols-5">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`flex flex-col items-center justify-center py-2 px-1 transition-colors ${
              currentView === item.id
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;