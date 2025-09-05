import React, { createContext, useContext, useState } from 'react';
import { Trip, TripPlanningData } from '../types/Trip';
import { mockTrips } from '../data/mockData';

interface AppContextType {
  currentView: string;
  setCurrentView: (view: string) => void;
  trips: Trip[];
  setTrips: (trips: Trip[]) => void;
  currentTrip: Trip | null;
  setCurrentTrip: (trip: Trip | null) => void;
  planningData: TripPlanningData;
  setPlanningData: (data: TripPlanningData) => void;
  addTrip: (trip: Trip) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [trips, setTrips] = useState<Trip[]>(mockTrips);
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
  const [planningData, setPlanningData] = useState<TripPlanningData>({
    destination: '',
    startDate: '',
    endDate: '',
    preferences: [],
    budget: 1000,
    currentStep: 1
  });

  const addTrip = (trip: Trip) => {
    setTrips(prev => [...prev, trip]);
  };

  return (
    <AppContext.Provider value={{
      currentView,
      setCurrentView,
      trips,
      setTrips,
      currentTrip,
      setCurrentTrip,
      planningData,
      setPlanningData,
      addTrip
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};