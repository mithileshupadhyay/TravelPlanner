import React from 'react';
import { AppProvider } from './contexts/AppContext';
import { ThemeProvider } from './contexts/ThemeContext';
import AppRouter from './components/AppRouter';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <AppRouter />
        </div>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;