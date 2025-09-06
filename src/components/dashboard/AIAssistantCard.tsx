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
    
    const detailedItineraries = {
      tokyo: [
        {
          title: 'Tokyo Adventure: 5-Day Cultural & Culinary Journey',
          description: 'Experience the perfect blend of traditional culture and modern marvels in Japan\'s vibrant capital',
          days: [
            {
              day: 1,
              title: 'Welcome to Tokyo!',
              theme: 'Arrival, settling in, and a taste of local life',
              activities: [
                { period: 'morning', time: '09:00', title: 'Arrive in Tokyo', location: 'Narita Airport', duration: '2 hours', category: 'travel', icon: '✈️', cost: '$60', description: 'Land at Narita Airport → Take Airport Express to city center', tips: 'Get a JR Pass for unlimited train travel' },
                { period: 'afternoon', time: '14:00', title: 'Explore Asakusa District', location: 'Asakusa', duration: '3 hours', category: 'culture', icon: '⛩️', cost: 'Free', description: 'Visit Senso-ji Temple → Walk through Nakamise Shopping Street → Try traditional snacks', tips: 'Best time for photos is late afternoon with golden light' },
                { period: 'evening', time: '19:00', title: 'Authentic Ramen Experience', location: 'Shibuya', duration: '1.5 hours', category: 'food', icon: '🍜', cost: '$25', description: 'Dinner at famous ramen shop → Experience Tokyo nightlife', tips: 'Try tonkotsu ramen - it\'s a local favorite' }
              ]
            },
            {
              day: 2,
              title: 'Modern Tokyo & Sky Views',
              theme: 'Skyscrapers, technology, and panoramic city views',
              activities: [
                { period: 'morning', time: '09:00', title: 'Tokyo Skytree Experience', location: 'Sumida', duration: '2.5 hours', category: 'sightseeing', icon: '🗼', cost: '$30', description: 'Ascend Tokyo\'s tallest tower → 360° city views → Visit Skytree Town shopping', tips: 'Book tickets online to skip queues' },
                { period: 'afternoon', time: '13:00', title: 'Tsukiji Outer Market Food Tour', location: 'Tsukiji', duration: '2 hours', category: 'food', icon: '🐟', cost: '$40', description: 'Fresh sushi breakfast → Street food sampling → Learn about Japanese culinary culture', tips: 'Go early for the freshest selections' },
                { period: 'evening', time: '18:00', title: 'Shibuya Crossing & Shopping', location: 'Shibuya', duration: '2 hours', category: 'sightseeing', icon: '🚶', cost: '$20', description: 'Experience world\'s busiest crossing → Shopping at Shibuya 109 → Hachiko statue visit', tips: 'Best crossing views from Starbucks overlooking the intersection' }
              ]
            }
          ]
        }
      ],
      mumbai: [
        {
          title: 'Mumbai with Family: 5-Day Budget-Friendly Itinerary',
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
        }
      ],
      paris: [
        {
          title: 'Paris Romance: 5-Day Enchanting Journey',
          description: 'Fall in love with the City of Light through art, cuisine, and timeless romance',
          days: [
            {
              day: 1,
              title: 'Iconic Paris Welcome',
              theme: 'Classic landmarks and Seine river magic',
              activities: [
                { period: 'morning', time: '09:00', title: 'Eiffel Tower Experience', location: 'Champ de Mars', duration: '2.5 hours', category: 'sightseeing', icon: '🗼', cost: '$35', description: 'Ascend the Iron Lady → Panoramic Paris views → Photo session at Trocadéro', tips: 'Visit early to avoid crowds and get the best photos' },
                { period: 'afternoon', time: '14:00', title: 'Seine River Cruise', location: 'Seine River', duration: '1.5 hours', category: 'romantic', icon: '🚢', cost: '$28', description: 'Romantic boat ride → See Paris from the water → Pass Notre-Dame and Louvre', tips: 'Choose a sunset cruise for the most romantic experience' },
                { period: 'evening', time: '19:30', title: 'French Bistro Dinner', location: 'Latin Quarter', duration: '2 hours', category: 'food', icon: '🥖', cost: '$75', description: 'Authentic French cuisine → Wine pairing → Candlelit atmosphere', tips: 'Try coq au vin or bouillabaisse for a true French experience' }
              ]
            }
          ]
        }
      ]
    };

    const selectedItinerary = detailedItineraries[destination.toLowerCase()] || detailedItineraries.mumbai;
    const itineraryTemplate = selectedItinerary[0];

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
      title: itineraryTemplate.title.replace(/\d+-Day/, duration),
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
      const userMessage: Message = {
        id: Date.now().toString(),
        text: message,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setMessage('');
      setIsTyping(true);
      
      setTimeout(() => {
        const tripInfo = extractTripInfo(message);
        const itinerary = generateItinerary(tripInfo);
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `Excellent choice! I've crafted a personalized ${itinerary.duration} itinerary for ${itinerary.destination} that fits your ${itinerary.budget} budget perfectly. Each day is optimized for the best experience with a mix of must-see attractions, local experiences, and great dining options.`,
          sender: 'assistant',
          timestamp: new Date(),
          itinerary
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
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
            </h5>
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
        <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
          {messages.slice(-2).map((msg) => (
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
          />
          <button
            onClick={toggleVoiceInput}
            className={`p-2 rounded-xl transition-colors ${
              isListening 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
            }`}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="p-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantCard;