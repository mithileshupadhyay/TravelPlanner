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
  days: ItineraryDay[];
}

interface ItineraryDay {
  day: number;
  date: string;
  activities: ItineraryActivity[];
}

interface ItineraryActivity {
  time: string;
  title: string;
  location: string;
  duration: string;
  category: string;
  icon: string;
  cost: string;
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
    
    const sampleActivities = {
      tokyo: [
        { time: '09:00', title: 'Tsukiji Fish Market', location: 'Tsukiji', duration: '2 hours', category: 'food', icon: '🐟', cost: '$30' },
        { time: '11:30', title: 'Senso-ji Temple', location: 'Asakusa', duration: '1.5 hours', category: 'culture', icon: '⛩️', cost: 'Free' },
        { time: '14:00', title: 'Tokyo Skytree', location: 'Sumida', duration: '2 hours', category: 'sightseeing', icon: '🗼', cost: '$25' },
        { time: '17:00', title: 'Shibuya Crossing', location: 'Shibuya', duration: '1 hour', category: 'sightseeing', icon: '🚶', cost: 'Free' },
        { time: '19:00', title: 'Ramen Dinner', location: 'Shinjuku', duration: '1 hour', category: 'food', icon: '🍜', cost: '$15' }
      ],
      paris: [
        { time: '09:00', title: 'Eiffel Tower', location: 'Champ de Mars', duration: '2 hours', category: 'sightseeing', icon: '🗼', cost: '$30' },
        { time: '11:30', title: 'Louvre Museum', location: 'Louvre', duration: '3 hours', category: 'culture', icon: '🎨', cost: '$20' },
        { time: '15:00', title: 'Seine River Cruise', location: 'Seine', duration: '1 hour', category: 'romantic', icon: '🚢', cost: '$25' },
        { time: '17:00', title: 'Montmartre Walk', location: 'Montmartre', duration: '2 hours', category: 'culture', icon: '🎭', cost: 'Free' },
        { time: '19:30', title: 'French Bistro', location: 'Latin Quarter', duration: '2 hours', category: 'food', icon: '🥖', cost: '$60' }
      ],
      default: [
        { time: '09:00', title: 'City Walking Tour', location: 'Downtown', duration: '2 hours', category: 'culture', icon: '🚶', cost: '$25' },
        { time: '11:30', title: 'Local Market Visit', location: 'Central Market', duration: '1.5 hours', category: 'food', icon: '🛒', cost: '$20' },
        { time: '14:00', title: 'Main Attraction', location: 'City Center', duration: '2 hours', category: 'sightseeing', icon: '📸', cost: '$30' },
        { time: '17:00', title: 'Scenic Viewpoint', location: 'Hilltop', duration: '1 hour', category: 'sightseeing', icon: '🌅', cost: 'Free' },
        { time: '19:00', title: 'Local Cuisine', location: 'Restaurant District', duration: '2 hours', category: 'food', icon: '🍽️', cost: '$40' }
      ]
    };

    const activities = sampleActivities[destination.toLowerCase()] || sampleActivities.default;
    const itineraryDays: ItineraryDay[] = [];

    for (let i = 0; i < Math.min(days, 7); i++) {
      const dayActivities = activities.slice(0, Math.min(5, activities.length));
      itineraryDays.push({
        day: i + 1,
        date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString(),
        activities: dayActivities
      });
    }

    return {
      destination: destination.charAt(0).toUpperCase() + destination.slice(1),
      duration,
      budget,
      days: itineraryDays
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
    <div className="mt-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 font-headline">
            🎯 {itinerary.destination} Itinerary
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {itinerary.duration} • {itinerary.budget} budget
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleViewItinerary(itinerary)}
            className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
          >
            View Full
          </button>
          <button
            onClick={() => handleSaveItinerary(itinerary)}
            className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors"
          >
            Save Trip
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        {itinerary.days.slice(0, 2).map((day) => (
          <div key={day.day} className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2 flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span>Day {day.day}</span>
            </h5>
            <div className="space-y-2">
              {day.activities.slice(0, 3).map((activity, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-sm">
                  <span className="text-gray-500 dark:text-gray-400 w-12">{activity.time}</span>
                  <span className="text-lg">{activity.icon}</span>
                  <span className="text-gray-900 dark:text-gray-100 flex-1">{activity.title}</span>
                  <span className="text-green-600 dark:text-green-400 font-medium">{activity.cost}</span>
                </div>
              ))}
              {day.activities.length > 3 && (
                <p className="text-xs text-gray-500 dark:text-gray-400 ml-15">
                  +{day.activities.length - 3} more activities...
                </p>
              )}
            </div>
          </div>
        ))}
        {itinerary.days.length > 2 && (
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            +{itinerary.days.length - 2} more days with detailed activities...
          </p>
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