import React from 'react';
import { Plane, Moon, Sun, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useApp } from '../contexts/AppContext';

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { setCurrentView } = useApp();

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setCurrentView('dashboard')}
          >
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl group-hover:scale-105 transition-transform duration-200">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <span className="text-xlarge font-bold font-headline bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TravelPlanner
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => setCurrentView('map')}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            >
              Explore
            </button>
            <button
              onClick={() => setCurrentView('profile')}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            >
              My Trips
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setCurrentView('profile')}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;