import React, { useState } from 'react';
import { Bot, Send, Sparkles, MapPin, Calendar, DollarSign, Heart, Mic, MicOff, Clock, Utensils, Camera, Star } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  itinerary?: GeneratedItinerary;
}

interface GeneratedItinerary {
  destination: string;
  duration: string;
  budget: string;
  title: string;
  description: string;
  days: ItineraryDay[];
}

interface ItineraryDay {
  day: number;
  date: string;
  title: string;
  theme: string;
  activities: ItineraryActivity[];
}

interface ItineraryActivity {
  period: 'morning' | 'afternoon' | 'evening';
  time: string;
  title: string;
  location: string;
  duration: string;
  category: string;
  icon: string;
  cost: string;
  description: string;
  tips?: string;
}

const AIAssistantCard: React.FC = () => {
  const { setCurrentView, setPlanningData, addTrip, setCurrentTrip } = useApp();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm TravelYatri, your personal travel expert. Just tell me where you want to go, when, and your budget - I'll create a complete itinerary for you instantly! For example: 'Plan a 5-day trip to Tokyo in March with a $2000 budget' or 'Weekend getaway to Paris, romantic, $800 budget'.",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const quickSuggestions = [
    { icon: MapPin, text: '3-day Tokyo adventure', prompt: 'Plan a 3-day adventure trip to Tokyo with a $1500 budget' },
    { icon: Calendar, text: 'Week in Paris', prompt: 'Create a 7-day romantic itinerary for Paris with $2500 budget' },
    { icon: DollarSign, text: 'Budget Bali trip', prompt: 'Plan a 5-day budget trip to Bali for $800' },
    { icon: Heart, text: 'Weekend in NYC', prompt: 'Plan a weekend cultural trip to New York City with $1200 budget' }
  ];

  const extractTripInfo = (text: string) => {
    const lowerText = text.toLowerCase();
    
    // Extract destination
    const destinations = ['tokyo', 'paris', 'london', 'new york', 'nyc', 'bali', 'rome', 'barcelona', 'dubai', 'singapore', 'bangkok', 'amsterdam', 'berlin', 'sydney', 'mumbai', 'delhi'];
    const destination = destinations.find(dest => lowerText.includes(dest)) || 'Amazing Destination';
    
    // Extract duration
    const durationMatch = text.match(/(\d+)[\s-]*(day|week)/i);
    let duration = '3 days';
    if (durationMatch) {
      const num = parseInt(durationMatch[1]);
      const unit = durationMatch[2].toLowerCase();
      duration = unit === 'week' ? `${num * 7} days` : `${num} days`;
    } else if (lowerText.includes('weekend')) {
      duration = '2 days';
    }
    
    // Extract budget
    const budgetMatch = text.match(/\$(\d+)/);
    const budget = budgetMatch ? `$${budgetMatch[1]}` : '$1500';
    
    // Extract preferences
    const preferences = [];
    if (lowerText.includes('romantic') || lowerText.includes('romance')) preferences.push('romantic');
    if (lowerText.includes('adventure')) preferences.push('adventure');
    if (lowerText.includes('culture') || lowerText.includes('cultural')) preferences.push('culture');
    if (lowerText.includes('food') || lowerText.includes('culinary')) preferences.push('food');
    if (lowerText.includes('budget')) preferences.push('budget');
    if (lowerText.includes('luxury')) preferences.push('luxury');
    
    return { destination, duration, budget, preferences };
  };

  const generateItinerary = (tripInfo: any): GeneratedItinerary => {
    const { destination, duration, budget, preferences } = tripInfo;
    const days = parseInt(duration.split(' ')[0]);
    
    const getDestinationItinerary = (dest: string, days: number, budget: string, preferences: string[]) => {
      const destLower = dest.toLowerCase();
      
      // Tokyo Itineraries
      if (destLower.includes('tokyo') || destLower.includes('japan')) {
        return {
          title: `Tokyo Adventure: ${days}-Day Cultural & Culinary Journey`,
          description: 'Experience the perfect blend of traditional culture and modern marvels in Japan\'s vibrant capital',
          days: [
            {
              day: 1,
              title: 'Welcome to Tokyo!',
              theme: 'Arrival, traditional culture, and modern city vibes',
              activities: [
                { period: 'morning', time: '09:00', title: 'Arrive in Tokyo', location: 'Narita Airport', duration: '2 hours', category: 'travel', icon: '✈️', cost: '$60', description: 'Land at Narita Airport → Take Airport Express to city center → Check into hotel', tips: 'Get a JR Pass for unlimited train travel throughout Japan' },
                { period: 'afternoon', time: '14:00', title: 'Explore Asakusa District', location: 'Asakusa', duration: '3 hours', category: 'culture', icon: '⛩️', cost: 'Free', description: 'Visit ancient Senso-ji Temple → Walk through traditional Nakamise Shopping Street → Try taiyaki and ningyo-yaki snacks', tips: 'Best time for photos is late afternoon with golden light on the temple' },
                { period: 'evening', time: '19:00', title: 'Authentic Ramen Experience', location: 'Shibuya', duration: '1.5 hours', category: 'food', icon: '🍜', cost: '$25', description: 'Dinner at famous Ichiran or Ippudo ramen shop → Experience Tokyo nightlife in Shibuya', tips: 'Try tonkotsu ramen - it\'s a local favorite, and don\'t be shy about slurping!' }
              ]
            },
            {
              day: 2,
              title: 'Modern Tokyo & Sky Views',
              theme: 'Skyscrapers, technology, and panoramic city views',
              activities: [
                { period: 'morning', time: '09:00', title: 'Tokyo Skytree Experience', location: 'Sumida', duration: '2.5 hours', category: 'sightseeing', icon: '🗼', cost: '$30', description: 'Ascend Tokyo\'s tallest tower → 360° city views → Visit Skytree Town shopping complex', tips: 'Book tickets online to skip long queues, especially on weekends' },
                { period: 'afternoon', time: '13:00', title: 'Tsukiji Outer Market Food Tour', location: 'Tsukiji', duration: '2 hours', category: 'food', icon: '🐟', cost: '$40', description: 'Fresh sushi breakfast → Street food sampling → Learn about Japanese culinary culture', tips: 'Go early for the freshest selections and try the famous tuna sashimi' },
                { period: 'evening', time: '18:00', title: 'Shibuya Crossing & Shopping', location: 'Shibuya', duration: '2 hours', category: 'sightseeing', icon: '🚶', cost: '$20', description: 'Experience world\'s busiest crossing → Shopping at Shibuya 109 → Visit Hachiko statue', tips: 'Best crossing views from Starbucks overlooking the intersection' }
              ]
            }
          ]
        };
      }
      
      // Paris Itineraries
      if (destLower.includes('paris') || destLower.includes('france')) {
        return {
          title: `Paris Romance: ${days}-Day Enchanting Journey`,
          description: 'Fall in love with the City of Light through art, cuisine, and timeless romance',
          days: [
            {
              day: 1,
              title: 'Iconic Paris Welcome',
              theme: 'Classic landmarks and Seine river magic',
              activities: [
                { period: 'morning', time: '09:00', title: 'Eiffel Tower Experience', location: 'Champ de Mars', duration: '2.5 hours', category: 'sightseeing', icon: '🗼', cost: '$35', description: 'Ascend the Iron Lady → Panoramic Paris views → Photo session at Trocadéro Gardens', tips: 'Visit early morning to avoid crowds and get the best photos' },
                { period: 'afternoon', time: '14:00', title: 'Seine River Cruise', location: 'Seine River', duration: '1.5 hours', category: 'romantic', icon: '🚢', cost: '$28', description: 'Romantic boat ride → See Paris from the water → Pass Notre-Dame and Louvre', tips: 'Choose a sunset cruise for the most romantic experience with champagne' },
                { period: 'evening', time: '19:30', title: 'French Bistro Dinner', location: 'Latin Quarter', duration: '2 hours', category: 'food', icon: '🥖', cost: '$75', description: 'Authentic French cuisine → Wine pairing → Candlelit atmosphere at Le Procope', tips: 'Try coq au vin or bouillabaisse for a true French culinary experience' }
              ]
            },
            {
              day: 2,
              title: 'Art & Culture Immersion',
              theme: 'World-class museums and Parisian elegance',
              activities: [
                { period: 'morning', time: '09:00', title: 'Louvre Museum Tour', location: 'Louvre', duration: '3 hours', category: 'culture', icon: '🎨', cost: '$20', description: 'See Mona Lisa → Venus de Milo → Egyptian antiquities → Skip-the-line access', tips: 'Book timed entry tickets online and focus on 2-3 wings to avoid overwhelm' },
                { period: 'afternoon', time: '14:00', title: 'Champs-Élysées Stroll', location: 'Champs-Élysées', duration: '2 hours', category: 'shopping', icon: '🛍️', cost: '$50', description: 'Window shopping → Arc de Triomphe → Café culture experience', tips: 'Perfect for people-watching and enjoying French café culture' },
                { period: 'evening', time: '19:00', title: 'Montmartre Evening', location: 'Montmartre', duration: '2.5 hours', category: 'culture', icon: '🎭', cost: '$30', description: 'Sacré-Cœur Basilica → Artist squares → Sunset views over Paris', tips: 'Take the funicular up the hill and stay for the magical sunset views' }
              ]
            }
          ]
        };
      }
      
      // London Itineraries
      if (destLower.includes('london') || destLower.includes('uk') || destLower.includes('england')) {
        return {
          title: `London Explorer: ${days}-Day Royal & Cultural Adventure`,
          description: 'Discover royal palaces, world-class museums, and quintessential British culture',
          days: [
            {
              day: 1,
              title: 'Royal London',
              theme: 'Palaces, guards, and British traditions',
              activities: [
                { period: 'morning', time: '09:00', title: 'Buckingham Palace & Changing of Guard', location: 'Westminster', duration: '2 hours', category: 'culture', icon: '👑', cost: 'Free', description: 'Watch the famous ceremony → Explore St. James\'s Park → Royal photo opportunities', tips: 'Arrive early for the best viewing spots, ceremony happens at 11:00 AM' },
                { period: 'afternoon', time: '13:00', title: 'Westminster Abbey & Big Ben', location: 'Westminster', duration: '2.5 hours', category: 'culture', icon: '⛪', cost: '$25', description: 'Royal wedding venue → Poets\' Corner → Crown Jewels nearby → Thames walk', tips: 'Audio guide included - don\'t miss the Coronation Chair' },
                { period: 'evening', time: '18:00', title: 'Traditional Pub Experience', location: 'Covent Garden', duration: '2 hours', category: 'food', icon: '🍺', cost: '$40', description: 'Fish & chips → Local ales → Live music → British pub culture', tips: 'Try a proper pint of bitter and don\'t forget mushy peas with your fish & chips' }
              ]
            }
          ]
        };
      }
      
      // New York Itineraries
      if (destLower.includes('new york') || destLower.includes('nyc') || destLower.includes('manhattan')) {
        return {
          title: `New York City: ${days}-Day Urban Adventure`,
          description: 'Experience the city that never sleeps through iconic landmarks and cultural hotspots',
          days: [
            {
              day: 1,
              title: 'Manhattan Highlights',
              theme: 'Iconic skylines and urban energy',
              activities: [
                { period: 'morning', time: '09:00', title: 'Statue of Liberty & Ellis Island', location: 'Liberty Island', duration: '3 hours', category: 'sightseeing', icon: '🗽', cost: '$25', description: 'Ferry ride → Crown access → Immigration museum → Harbor views', tips: 'Book crown access tickets well in advance - they sell out quickly' },
                { period: 'afternoon', time: '14:00', title: 'Central Park Exploration', location: 'Central Park', duration: '2 hours', category: 'nature', icon: '🌳', cost: 'Free', description: 'Bethesda Fountain → Bow Bridge → Strawberry Fields → People watching', tips: 'Rent a bike to cover more ground or enjoy a picnic lunch' },
                { period: 'evening', time: '19:00', title: 'Times Square & Broadway', location: 'Times Square', duration: '2.5 hours', category: 'entertainment', icon: '🎭', cost: '$80', description: 'Bright lights → Street performers → Broadway show → NYC energy', tips: 'Book Broadway shows in advance or try same-day lottery tickets' }
              ]
            }
          ]
        };
      }
      
      // Bali Itineraries
      if (destLower.includes('bali') || destLower.includes('indonesia')) {
        return {
          title: `Bali Paradise: ${days}-Day Tropical & Cultural Journey`,
          description: 'Discover tropical beaches, ancient temples, and Balinese culture',
          days: [
            {
              day: 1,
              title: 'Ubud Cultural Immersion',
              theme: 'Rice terraces, temples, and traditional arts',
              activities: [
                { period: 'morning', time: '08:00', title: 'Tegallalang Rice Terraces', location: 'Ubud', duration: '2 hours', category: 'nature', icon: '🌾', cost: '$10', description: 'Stunning terraced landscapes → Traditional farming → Instagram-worthy photos', tips: 'Visit early morning for best lighting and fewer crowds' },
                { period: 'afternoon', time: '13:00', title: 'Sacred Monkey Forest & Ubud Palace', location: 'Ubud Center', duration: '2.5 hours', category: 'culture', icon: '🐒', cost: '$5', description: 'Ancient temple complex → Playful monkeys → Royal palace architecture', tips: 'Keep bags closed - monkeys are very curious about food and shiny objects' },
                { period: 'evening', time: '18:00', title: 'Traditional Balinese Dinner', location: 'Ubud', duration: '2 hours', category: 'food', icon: '🍛', cost: '$20', description: 'Nasi goreng → Satay → Tropical fruits → Cultural performance', tips: 'Try gado-gado and don\'t miss the traditional kecak fire dance' }
              ]
            }
          ]
        };
      }
      
      // Mumbai Itineraries (keep existing)
      if (destLower.includes('mumbai') || destLower.includes('bombay') || destLower.includes('india')) {
        return {
          title: `Mumbai with Family: ${days}-Day Budget-Friendly Itinerary`,
          description: 'Blend of city sights, local flavors, and quality time together for every generation',
          days: [
            {
              day: 1,
              title: 'Welcome to Mumbai!',
              theme: 'Arrival, settling in, and a taste of local life',
              activities: [
                { period: 'morning', time: '09:00', title: 'Arrive in Mumbai', location: 'Mumbai Airport', duration: '2 hours', category: 'travel', icon: '✈️', cost: '$40', description: 'Check in at YMCA International House (affordable, family-friendly)', tips: 'YMCA offers clean, safe accommodation perfect for families' },
                { period: 'afternoon', time: '14:00', title: 'Walk around Crawford Market', location: 'Crawford Market', duration: '2 hours', category: 'culture', icon: '🏪', cost: '$10', description: 'Try street snacks like vada pav and bhel puri → Explore local spices and fruits', tips: 'Bargain for better prices and try fresh fruit juices' },
                { period: 'evening', time: '19:00', title: 'Dinner at Sukh Sagar', location: 'Marine Drive', duration: '1.5 hours', category: 'food', icon: '🍽️', cost: '$25', description: 'Vegetarian, family favorite → Stroll along Marine Drive for sunset', tips: 'Marine Drive is perfect for evening walks with kids' }
              ]
            },
            {
              day: 2,
              title: 'Museums & Iconic Landmarks',
              theme: 'History, culture, and seaside fun',
              activities: [
                { period: 'morning', time: '09:00', title: 'Visit Chhatrapati Shivaji Maharaj Vastu Sangrahalaya', location: 'Fort District', duration: '2.5 hours', category: 'culture', icon: '🏛️', cost: '$8', description: 'Prince of Wales Museum for an educational start → Ancient artifacts and art collections', tips: 'Great for kids to learn about Indian history and culture' },
                { period: 'afternoon', time: '13:00', title: 'Gateway of India & Boat Ride', location: 'Colaba', duration: '2 hours', category: 'sightseeing', icon: '⛵', cost: '$15', description: 'Iconic monument → Optional boat ride to Elephanta Caves', tips: 'Take photos at the Gateway - it\'s Mumbai\'s most famous landmark' },
                { period: 'evening', time: '17:00', title: 'Juhu Beach Family Time', location: 'Juhu', duration: '2 hours', category: 'relaxation', icon: '🏖️', cost: '$12', description: 'Beach activities → Street food → Watch sunset with family', tips: 'Try bhel puri and pav bhaji from beach vendors' }
              ]
            }
          ]
        };
      }
      
      // Default/Generic Itinerary for other destinations
      return {
        title: `${destination} Adventure: ${days}-Day Discovery Journey`,
        description: `Explore the best of ${destination} with a perfect mix of culture, cuisine, and unforgettable experiences`,
        days: [
          {
            day: 1,
            title: `Welcome to ${destination}!`,
            theme: 'Arrival and first taste of local culture',
            activities: [
              { period: 'morning', time: '09:00', title: `Arrive in ${destination}`, location: 'City Center', duration: '2 hours', category: 'travel', icon: '✈️', cost: '$50', description: `Check into accommodation → Get oriented with ${destination} → Local transportation setup`, tips: 'Research local transportation options and get a city map or app' },
              { period: 'afternoon', time: '14:00', title: 'Historic City Center Tour', location: 'Old Town', duration: '3 hours', category: 'culture', icon: '🏛️', cost: '$25', description: 'Explore main historical sites → Local architecture → Cultural landmarks', tips: 'Join a free walking tour to get oriented and meet other travelers' },
              { period: 'evening', time: '19:00', title: 'Traditional Local Dinner', location: 'Local Restaurant', duration: '1.5 hours', category: 'food', icon: '🍽️', cost: '$35', description: 'Authentic local cuisine → Regional specialties → Cultural dining experience', tips: 'Ask locals for restaurant recommendations for the most authentic experience' }
            ]
          },
          {
            day: 2,
            title: 'Cultural Immersion',
            theme: 'Museums, art, and local traditions',
            activities: [
              { period: 'morning', time: '09:00', title: 'Main Museum Visit', location: 'Cultural District', duration: '2.5 hours', category: 'culture', icon: '🎨', cost: '$20', description: 'Local history and art → Cultural exhibitions → Educational experience', tips: 'Check for free museum days or student discounts' },
              { period: 'afternoon', time: '13:00', title: 'Local Market Exploration', location: 'Central Market', duration: '2 hours', category: 'shopping', icon: '🛍️', cost: '$30', description: 'Local crafts → Street food → Cultural shopping experience', tips: 'Bring cash and be prepared to bargain for better prices' },
              { period: 'evening', time: '18:00', title: 'Scenic Viewpoint', location: 'City Overlook', duration: '2 hours', category: 'sightseeing', icon: '🌅', cost: '$15', description: 'Panoramic city views → Sunset photography → Relaxing evening', tips: 'Arrive 30 minutes before sunset for the best lighting' }
            ]
          }
        ]
      };
    };

    const itineraryTemplate = getDestinationItinerary(destination, days, budget, preferences);

    // Adapt the template to requested duration
    const adaptedDays = itineraryTemplate.days.slice(0, Math.min(days, itineraryTemplate.days.length));
    
    // If user requested more days than template, repeat pattern
    while (adaptedDays.length < days && adaptedDays.length < 7) {
      const templateDay = itineraryTemplate.days[adaptedDays.length % itineraryTemplate.days.length];
      adaptedDays.push({
        ...templateDay,
        day: adaptedDays.length + 1,
        date: new Date(Date.now() + adaptedDays.length * 24 * 60 * 60 * 1000).toLocaleDateString()
      });
    }

    return {
      destination: destination.charAt(0).toUpperCase() + destination.slice(1),
      duration,
      budget,
      title: itineraryTemplate.title,
      description: itineraryTemplate.description,
      days: adaptedDays.map((day, index) => ({
        ...day,
        day: index + 1,
        date: new Date(Date.now() + index * 24 * 60 * 60 * 1000).toLocaleDateString()
      }))
    };
  };

  const createTripFromItinerary = (itinerary: GeneratedItinerary) => {
    const newTrip = {
      id: Date.now().toString(),
      title: `${itinerary.duration} in ${itinerary.destination}`,
      destination: itinerary.destination,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + parseInt(itinerary.duration) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      budget: parseInt(itinerary.budget.replace('$', '')),
      preferences: ['AI Generated'],
      status: 'planned' as const,
      coverImage: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800',
      days: itinerary.days.map(day => ({
        day: day.day,
        date: day.date,
        activities: day.activities.map(activity => ({
          id: Math.random().toString(),
          time: activity.time,
          title: activity.title,
          location: activity.location,
          duration: activity.duration,
          category: activity.category as any,
          icon: activity.icon
        }))
      }))
    };
    
    addTrip(newTrip);
    setCurrentTrip(newTrip);
    return newTrip;
  };

  const handleQuickSuggestion = (prompt: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: prompt,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    setTimeout(() => {
      const tripInfo = extractTripInfo(prompt);
      const itinerary = generateItinerary(tripInfo);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Perfect! I've created a complete ${itinerary.duration} itinerary for ${itinerary.destination} within your ${itinerary.budget} budget. This includes carefully selected activities, optimal timing, and cost estimates. You can save this itinerary to your trips or view the full details!`,
        sender: 'assistant',
        timestamp: new Date(),
        itinerary
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const currentMessage = message.trim();
      const userMessage: Message = {
        id: Date.now().toString(),
        text: currentMessage,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setMessage('');
      setIsTyping(true);
      
      // Scroll to bottom after adding message
      setTimeout(() => {
        const chatContainer = document.getElementById('chat-messages');
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, 100);
      
      setTimeout(() => {
        const tripInfo = extractTripInfo(currentMessage);
        
        // Check if user is asking for an itinerary or just general travel question
        const isItineraryRequest = currentMessage.toLowerCase().includes('plan') || 
                                 currentMessage.toLowerCase().includes('trip') || 
                                 currentMessage.toLowerCase().includes('itinerary') ||
                                 currentMessage.toLowerCase().includes('day') ||
                                 /\$\d+/.test(currentMessage) || // Contains budget
                                 /(tokyo|paris|mumbai|delhi|london|new york|bali|dubai|singapore|bangkok|rome|barcelona)/i.test(currentMessage);
        
        let assistantMessage: Message;
        
        if (isItineraryRequest) {
          const itinerary = generateItinerary(tripInfo);
          assistantMessage = {
            id: (Date.now() + 1).toString(),
            text: `Excellent choice! I've crafted a personalized ${itinerary.duration} itinerary for ${itinerary.destination} that fits your ${itinerary.budget} budget perfectly. Each day is optimized for the best experience with a mix of must-see attractions, local experiences, and great dining options.`,
            sender: 'assistant',
            timestamp: new Date(),
            itinerary
          };
        } else {
          // Generate general travel advice responses
          const generalResponses = [
            "That's a great question! As your travel expert, I'd recommend considering the local culture and customs when planning your activities. What specific aspect would you like me to help you with?",
            "Absolutely! Based on my experience helping travelers, I can share some insights about that. Are you looking for recommendations for a specific destination or general travel tips?",
            "Great point! I love helping with travel planning details. From my years of experience, I've found that preparation makes all the difference. What would you like to know more about?",
            "That's something many travelers ask about! I'm here to help you make the most of your trip. Would you like me to create a detailed itinerary for a specific destination?",
            "Excellent question! Travel planning can seem overwhelming, but I'm here to make it easy for you. Just tell me your destination, dates, and budget, and I'll create a complete itinerary!"
          ];
          
          const randomResponse = generalResponses[Math.floor(Math.random() * generalResponses.length)];
          
          assistantMessage = {
            id: (Date.now() + 1).toString(),
            text: randomResponse,
            sender: 'assistant',
            timestamp: new Date()
          };
        }
        
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
        
        // Scroll to bottom after AI response
        setTimeout(() => {
          const chatContainer = document.getElementById('chat-messages');
          if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
          }
        }, 100);
      }, 2000);
    }
  };

  const handleSaveItinerary = (itinerary: GeneratedItinerary) => {
    const trip = createTripFromItinerary(itinerary);
    setCurrentView('itinerary');
  };

  const handleViewItinerary = (itinerary: GeneratedItinerary) => {
    const trip = createTripFromItinerary(itinerary);
    setCurrentView('itinerary');
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => setIsListening(false), 3000);
    }
  };

  const ItineraryPreview: React.FC<{ itinerary: GeneratedItinerary }> = ({ itinerary }) => (
    <div className="mt-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800 max-w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 font-headline mb-1">
            🎯 {itinerary.title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-2">
            {itinerary.description}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            {itinerary.duration} • {itinerary.budget} budget • {itinerary.days.length} days planned
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleViewItinerary(itinerary)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors font-medium"
          >
            View Full
          </button>
          <button
            onClick={() => handleSaveItinerary(itinerary)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors font-medium"
          >
            Save Trip
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        {itinerary.days.slice(0, Math.min(2, itinerary.days.length)).map((day) => (
          <div key={day.day} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
            <div className="mb-3">
              <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 flex items-center space-x-2">
                <span className="text-lg">🏛️</span>
                <span>Day {day.day} - {day.title}</span>
              </h5>
              <p className="text-sm text-gray-600 dark:text-gray-400 italic">{day.theme}</p>
            </div>
            
            <div className="space-y-3">
              {day.activities.slice(0, 3).map((activity, idx) => (
                <div key={idx} className="border-l-3 border-blue-200 dark:border-blue-800 pl-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm">
                        {activity.period === 'morning' ? '🌅' : activity.period === 'afternoon' ? '☀️' : '🌆'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                          {activity.period}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
                      </div>
                      <h6 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-1 flex items-center space-x-2">
                        <span className="text-base">{activity.icon}</span>
                        <span>{activity.title}</span>
                      </h6>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        📍 {activity.location} • ⏱️ {activity.duration}
                      </p>
                      <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed mb-1">
                        {activity.description}
                      </p>
                      {activity.tips && (
                        <p className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20 rounded px-2 py-1 mb-1">
                          💡 {activity.tips}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                          {activity.category}
                        </span>
                        <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                          {activity.cost}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {day.activities.length > 3 && (
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center py-2 bg-gray-50 dark:bg-gray-700/30 rounded">
                  +{day.activities.length - 3} more detailed activities...
                </p>
              )}
            </div>
          </div>
        ))}
        {itinerary.days.length > 2 && (
          <div className="text-center py-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg border border-dashed border-blue-200 dark:border-blue-800">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              📅 {itinerary.days.length - 2} More Amazing Days Planned!
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Complete itinerary with detailed activities, timings, and insider tips
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-white/20 rounded-xl">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-headline">TravelYatri</h3>
            <p className="text-purple-100">Your Personal Travel Expert</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-purple-100">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm">Instant Itinerary Generation • No Follow-ups Needed</span>
        </div>
      </div>

      {/* Quick Suggestions */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 font-headline">
          Quick Itinerary Examples
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleQuickSuggestion(suggestion.prompt)}
              className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left group"
            >
              <suggestion.icon className="h-4 w-4 text-gray-400 group-hover:text-purple-500 transition-colors flex-shrink-0" />
              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {suggestion.text}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="p-6">
        <div className="space-y-4 mb-4 max-h-96 overflow-y-auto" id="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {msg.sender === 'assistant' && (
                <div className="p-1 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex-shrink-0">
                  <Bot className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
              )}
              {msg.sender === 'user' && (
                <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
                  <div className="h-4 w-4 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                </div>
              )}
              <div className={`flex-1 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block p-3 rounded-xl max-w-full ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                {msg.itinerary && <ItineraryPreview itinerary={msg.itinerary} />}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Bot className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          )}
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="e.g., '5-day trip to Bali, $1200 budget, adventure'"
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            disabled={isTyping}
          />
          <button
            onClick={toggleVoiceInput}
            disabled={isTyping}
            className={`p-2 rounded-xl transition-colors ${
              isListening 
                ? 'bg-red-600 text-white' 
                : isTyping
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
            }`}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || isTyping}
            className={`p-2 rounded-xl transition-colors ${
              !message.trim() || isTyping
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantCard;