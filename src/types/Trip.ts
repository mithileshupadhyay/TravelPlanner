export interface Activity {
  id: string;
  time: string;
  title: string;
  location: string;
  duration: string;
  category: 'food' | 'sightseeing' | 'adventure' | 'culture' | 'shopping' | 'relaxation';
  icon: string;
  cost?: number;
}

export interface DayPlan {
  day: number;
  date: string;
  activities: Activity[];
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  preferences: string[];
  days: DayPlan[];
  status: 'planned' | 'ongoing' | 'completed';
  coverImage: string;
}

export interface TripPlanningData {
  destination: string;
  startDate: string;
  endDate: string;
  preferences: string[];
  budget: number;
  currentStep: number;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  trending: boolean;
}