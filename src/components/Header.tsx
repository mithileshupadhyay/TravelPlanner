import React from 'react';
import { Moon, Sun, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useApp } from '../contexts/AppContext';

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { setCurrentView } = useApp();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div 
            className="cursor-pointer"
            onClick={() => setCurrentView('dashboard')}
          >
            <span className="text-xl font-semibold text-gray-900 dark:text-white">
              TravelPlanner
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => setCurrentView('map')}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Explore
            </button>
            <button
              onClick={() => setCurrentView('profile')}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              My Trips
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDark ? <Sun className="h-4 w-4 text-gray-600 dark:text-gray-400" /> : <Moon className="h-4 w-4 text-gray-600 dark:text-gray-400" />}
            </button>
            <button
              onClick={() => setCurrentView('profile')}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;