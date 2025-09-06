import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppProvider } from './contexts/AppContext';
import AppRouter from './components/AppRouter';

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <AppRouter />
        </div>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;