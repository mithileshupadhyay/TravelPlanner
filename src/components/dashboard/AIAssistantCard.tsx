import React, { useState } from 'react';
import { Bot, Send, Sparkles, MessageCircle, Mic, MicOff } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const AIAssistantCard: React.FC = () => {
  const { setCurrentView, setPlanningData } = useApp();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your travel planning assistant. I can help you create detailed itineraries for any destination. Just tell me where you want to go and for how many days!",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const destinationActivities = {
    tokyo: {
      1: [
        { time: '09:00', activity: 'Visit Senso-ji Temple in Asakusa', cost: '₹800' },
        { time: '12:00', activity: 'Authentic ramen lunch at Ichiran', cost: '₹1,200' },
        { time: '15:00', activity: 'Explore Shibuya Crossing', cost: '₹0' },
        { time: '18:00', activity: 'Dinner in Golden Gai', cost: '₹2,500' }
      ],
      2: [
        { time: '09:00', activity: 'Tokyo Skytree observation deck', cost: '₹2,000' },
        { time: '12:00', activity: 'Tsukiji Outer Market food tour', cost: '₹1,800' },
        { time: '15:00', activity: 'Meiji Shrine visit', cost: '₹0' },
        { time: '18:00', activity: 'Harajuku street fashion tour', cost: '₹1,000' }
      ],
      3: [
        { time: '09:00', activity: 'Imperial Palace East Gardens', cost: '₹0' },
        { time: '12:00', activity: 'Sushi lunch at Ginza', cost: '₹3,500' },
        { time: '15:00', activity: 'TeamLab Borderless digital art', cost: '₹2,800' },
        { time: '18:00', activity: 'Roppongi nightlife experience', cost: '₹2,000' }
      ]
    },
    paris: {
      1: [
        { time: '09:00', activity: 'Eiffel Tower visit and photos', cost: '₹2,200' },
        { time: '12:00', activity: 'Seine River cruise with lunch', cost: '₹2,800' },
        { time: '15:00', activity: 'Louvre Museum highlights tour', cost: '₹1,600' },
        { time: '18:00', activity: 'Dinner at traditional bistro', cost: '₹4,000' }
      ],
      2: [
        { time: '09:00', activity: 'Montmartre and Sacré-Cœur', cost: '₹800' },
        { time: '12:00', activity: 'Artist quarter walking tour', cost: '₹1,200' },
        { time: '15:00', activity: 'Champs-Élysées shopping', cost: '₹2,000' },
        { time: '18:00', activity: 'Moulin Rouge show', cost: '₹6,000' }
      ],
      3: [
        { time: '09:00', activity: 'Versailles Palace day trip', cost: '₹3,200' },
        { time: '14:00', activity: 'Palace gardens exploration', cost: '₹800' },
        { time: '17:00', activity: 'Wine tasting in Montparnasse', cost: '₹2,400' },
        { time: '19:00', activity: 'French cooking class', cost: '₹3,600' }
      ]
    },
    london: {
      1: [
        { time: '09:00', activity: 'Tower of London and Crown Jewels', cost: '₹2,400' },
        { time: '12:00', activity: 'Traditional pub lunch', cost: '₹1,600' },
        { time: '15:00', activity: 'Westminster Abbey tour', cost: '₹2,000' },
        { time: '18:00', activity: 'Thames evening cruise', cost: '₹1,800' }
      ],
      2: [
        { time: '09:00', activity: 'British Museum highlights', cost: '₹0' },
        { time: '12:00', activity: 'Covent Garden market lunch', cost: '₹1,200' },
        { time: '15:00', activity: 'Buckingham Palace tour', cost: '₹2,800' },
        { time: '18:00', activity: 'West End theater show', cost: '₹4,000' }
      ]
    },
    bali: {
      1: [
        { time: '08:00', activity: 'Tegallalang Rice Terraces sunrise', cost: '₹600' },
        { time: '11:00', activity: 'Traditional Balinese breakfast', cost: '₹400' },
        { time: '14:00', activity: 'Ubud Monkey Forest visit', cost: '₹300' },
        { time: '17:00', activity: 'Sunset dinner at rice fields', cost: '₹1,200' }
      ],
      2: [
        { time: '09:00', activity: 'Tanah Lot temple visit', cost: '₹400' },
        { time: '12:00', activity: 'Beachside seafood lunch', cost: '₹800' },
        { time: '15:00', activity: 'Seminyak beach relaxation', cost: '₹0' },
        { time: '18:00', activity: 'Beach club sunset drinks', cost: '₹1,600' }
      ]
    }
  };

  const generateItinerary = (destination: string, days: number) => {
    const destKey = destination.toLowerCase().replace(/[^a-z]/g, '');
    const activities = destinationActivities[destKey as keyof typeof destinationActivities];
    
    if (!activities) {
      return `I'd love to help you plan a ${days}-day trip to ${destination}! While I don't have specific activities for this destination in my database yet, I recommend exploring local attractions, trying authentic cuisine, and experiencing the culture. Would you like me to help you with a different destination like Tokyo, Paris, London, or Bali?`;
    }

    let itinerary = `Here's your ${days}-day ${destination} itinerary:\n\n`;
    
    for (let day = 1; day <= days; day++) {
      const dayActivities = activities[day as keyof typeof activities] || activities[1];
      itinerary += `**Day ${day}:**\n`;
      
      dayActivities.forEach(item => {
        itinerary += `${item.time} - ${item.activity} (${item.cost})\n`;
      });
      itinerary += '\n';
    }

    const totalCost = Object.values(activities)
      .flat()
      .reduce((sum, item) => sum + parseInt(item.cost.replace('₹', '').replace(',', '') || '0'), 0);
    
    itinerary += `**Estimated total cost: ₹${totalCost.toLocaleString()}**\n\n`;
    itinerary += `This itinerary includes authentic experiences and local favorites. Would you like me to adjust anything or plan for a different destination?`;
    
    return itinerary;
  };

  const handleSendMessage = () => {
    if (message.trim() && !isTyping) {
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
        let response = '';
        const userText = message.toLowerCase();
        
        // Check for destination and days
        const destinations = ['tokyo', 'paris', 'london', 'bali', 'new york', 'mumbai'];
        const foundDestination = destinations.find(dest => userText.includes(dest));
        
        const dayMatch = userText.match(/(\d+)\s*days?/);
        const days = dayMatch ? parseInt(dayMatch[1]) : 1;
        
        if (foundDestination) {
          response = generateItinerary(foundDestination.charAt(0).toUpperCase() + foundDestination.slice(1), days);
        } else if (userText.includes('plan') || userText.includes('trip') || userText.includes('travel')) {
          response = "I'd be happy to help you plan your trip! Please tell me:\n\n1. Which destination would you like to visit?\n2. How many days will you be traveling?\n\nI can create detailed itineraries for Tokyo, Paris, London, Bali, and many other destinations!";
        } else if (userText.includes('budget') || userText.includes('cost')) {
          response = "I can help you plan trips for different budgets:\n\n• Budget trips: ₹40,000-80,000\n• Mid-range: ₹80,000-1,60,000\n• Luxury: ₹1,60,000+\n\nWhich destination and budget range interests you?";
        } else {
          response = "I'm here to help you plan amazing trips! You can ask me about:\n\n• Specific destinations (Tokyo, Paris, London, Bali, etc.)\n• Trip duration and itineraries\n• Budget planning\n• Travel recommendations\n\nWhat would you like to explore?";
        }
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response,
          sender: 'assistant',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => setIsListening(false), 3000);
    }
  };

  const handlePlanTrip = () => {
    setPlanningData({
      destination: '',
      startDate: '',
      endDate: '',
      preferences: [],
      budget: 120000,
      currentStep: 1
    });
    setCurrentView('planning');
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Bot className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                AI Travel Assistant
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Plan your perfect trip
              </p>
            </div>
          </div>
          <button
            onClick={handlePlanTrip}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <Sparkles className="h-4 w-4" />
            <span>Plan Trip</span>
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="p-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 h-80 flex flex-col">
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about destinations, itineraries, or travel tips..."
                disabled={isTyping}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                onClick={toggleVoiceInput}
                disabled={isTyping}
                className={`p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  isListening 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                }`}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!message.trim() || isTyping}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantCard;