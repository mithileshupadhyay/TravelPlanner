import { Trip, Destination } from '../types/Trip';

export const mockTrips: Trip[] = [
  {
    id: '1',
    title: 'Tokyo Adventure',
    destination: 'Tokyo, Japan',
    startDate: '2024-03-15',
    endDate: '2024-03-22',
    budget: 2500,
    preferences: ['Culture', 'Food', 'Adventure'],
    status: 'planned',
    coverImage: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800',
    days: [
      {
        day: 1,
        date: '2024-03-15',
        activities: [
          {
            id: '1',
            time: '09:00',
            title: 'Arrive at Tokyo Station',
            location: 'Tokyo Station',
            duration: '1 hour',
            category: 'sightseeing',
            icon: '🚄'
          },
          {
            id: '2',
            time: '11:00',
            title: 'Explore Shibuya Crossing',
            location: 'Shibuya',
            duration: '2 hours',
            category: 'sightseeing',
            icon: '🏙️'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Paris Romance',
    destination: 'Paris, France',
    startDate: '2024-04-10',
    endDate: '2024-04-17',
    budget: 3200,
    preferences: ['Culture', 'Food', 'Relaxation'],
    status: 'completed',
    coverImage: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
    days: []
  }
];

export const trendingDestinations: Destination[] = [
  {
    id: '1',
    name: 'Santorini',
    country: 'Greece',
    description: 'Stunning sunsets and white-washed buildings',
    image: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=400',
    trending: true
  },
  {
    id: '2',
    name: 'Bali',
    country: 'Indonesia',
    description: 'Tropical paradise with rich culture',
    image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=400',
    trending: true
  },
  {
    id: '3',
    name: 'Swiss Alps',
    country: 'Switzerland',
    description: 'Majestic mountains and pristine nature',
    image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400',
    trending: true
  },
  {
    id: '4',
    name: 'Dubai',
    country: 'UAE',
    description: 'Modern marvels and luxury experiences',
    image: 'https://images.pexels.com/photos/1172253/pexels-photo-1172253.jpeg?auto=compress&cs=tinysrgb&w=400',
    trending: true
  },
  {
    id: '5',
    name: 'Iceland',
    country: 'Iceland',
    description: 'Land of fire and ice',
    image: 'https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg?auto=compress&cs=tinysrgb&w=400',
    trending: true
  }
];

export const destinationSuggestions = [
  'Tokyo, Japan', 'Paris, France', 'London, UK', 'New York, USA', 'Bangkok, Thailand',
  'Rome, Italy', 'Barcelona, Spain', 'Sydney, Australia', 'Dubai, UAE', 'Singapore',
  'Istanbul, Turkey', 'Amsterdam, Netherlands', 'Berlin, Germany', 'Seoul, South Korea',
  'Mumbai, India', 'Cairo, Egypt', 'Rio de Janeiro, Brazil', 'Los Angeles, USA'
];

export const travelPreferences = [
  { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦', count: 245 },
  { id: 'adventure', label: 'Adventure', icon: '🏔️', count: 189 },
  { id: 'food', label: 'Food', icon: '🍜', count: 312 },
  { id: 'culture', label: 'Culture', icon: '🏛️', count: 156 },
  { id: 'relaxation', label: 'Relaxation', icon: '🌴', count: 98 },
  { id: 'shopping', label: 'Shopping', icon: '🛍️', count: 87 },
  { id: 'nightlife', label: 'Nightlife', icon: '🌃', count: 123 },
  { id: 'nature', label: 'Nature', icon: '🌿', count: 234 }
];