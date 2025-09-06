import React, { useState } from 'react';
import { Bot, Send, Sparkles, MapPin, Calendar, DollarSign, Users, Mic, MicOff } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const AITravelAssistant: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your friendly Travel Planner AI Assistant. I'm here to help you design personalized travel plans, suggest amazing destinations, and create detailed itineraries just for you! 🌍✈️\n\nTo get started, you can tell me:\n• Where you'd like to go\n• How long you're planning to travel\n• Your budget range\n• What type of experience you're looking for\n\nWhat destination has caught your eye lately?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const quickPrompts = [
    { icon: MapPin, text: "Plan a 5-day trip to Paris", category: "destination" },
    { icon: Calendar, text: "Weekend getaway ideas", category: "duration" },
    { icon: DollarSign, text: "Budget-friendly European cities", category: "budget" },
    { icon: Users, text: "Family vacation suggestions", category: "style" }
  ];

  const generateAIResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check if user provided minimal information
    if (lowerMessage.includes('paris') && !lowerMessage.includes('day') && !lowerMessage.includes('budget')) {
      return "Paris is an amazing choice! 🇫🇷 To create the perfect itinerary for you, I'd love to know more:\n\n• **How many days** will you be staying?\n• **What's your budget range** (budget-friendly, mid-range, or luxury)?\n• **What interests you most?** (art & culture, food & wine, romance, history, or nightlife)\n• **What type of accommodation** do you prefer?\n\nOnce I have these details, I can create a detailed day-by-day plan with the best hotels, restaurants, and experiences tailored just for you!";
    }
    
    if (lowerMessage.includes('5 day') && lowerMessage.includes('paris')) {
      return "Wonderful! A 5-day Paris adventure! 🗼 Here's what I need to create your perfect itinerary:\n\n**Quick Questions:**\n• **Budget range?** ($100-150/day, $150-300/day, or $300+/day)\n• **Travel style?** (Cultural explorer, foodie, romantic getaway, or mix of everything)\n• **Accommodation preference?** (Budget hotel, boutique hotel, or luxury)\n\n**Here's a preview of what your 5-day Paris plan could include:**\n\n**Day 1:** Arrival + Eiffel Tower area\n**Day 2:** Louvre Museum + Seine River cruise\n**Day 3:** Montmartre + Sacré-Cœur\n**Day 4:** Versailles day trip\n**Day 5:** Shopping + departure prep\n\nLet me know your preferences and I'll create a detailed itinerary with specific recommendations!";
    }
    
    if (lowerMessage.includes('weekend') || lowerMessage.includes('2 day')) {
      return "Perfect for a quick escape! 🎒 Weekend getaways are my specialty. To suggest the best destinations:\n\n• **Where are you traveling from?** (so I can suggest nearby gems)\n• **What's your vibe?** (city exploration, nature retreat, beach relaxation, or cultural immersion)\n• **Budget range?** (budget-conscious, moderate, or splurge-worthy)\n\n**Popular weekend destinations I often recommend:**\n• **City breaks:** Amsterdam, Prague, Barcelona\n• **Nature escapes:** Swiss Alps, Scottish Highlands\n• **Beach vibes:** Nice, Santorini, Lisbon\n• **Cultural gems:** Florence, Vienna, Bruges\n\nWhat sounds most appealing to you?";
    }
    
    if (lowerMessage.includes('budget') || lowerMessage.includes('cheap') || lowerMessage.includes('affordable')) {
      return "Smart traveler! 💰 Budget-friendly doesn't mean compromising on amazing experiences. Here are some fantastic affordable destinations:\n\n**Eastern Europe Gems:**\n• **Prague, Czech Republic** - $50-70/day\n• **Budapest, Hungary** - $45-65/day\n• **Krakow, Poland** - $40-60/day\n\n**Southern Europe Values:**\n• **Porto, Portugal** - $55-75/day\n• **Valencia, Spain** - $60-80/day\n• **Athens, Greece** - $50-70/day\n\n**Money-saving tips I always share:**\n• Stay in hostels or budget hotels\n• Use public transport\n• Eat at local markets and street food\n• Look for free walking tours\n\nWhich region interests you most? I can create a detailed budget itinerary!";
    }
    
    if (lowerMessage.includes('family') || lowerMessage.includes('kids') || lowerMessage.includes('children')) {
      return "Family adventures are the best! 👨‍👩‍👧‍👦 I love helping families create unforgettable memories. Let me know:\n\n• **Ages of your children?** (helps me suggest age-appropriate activities)\n• **How many days** are you planning?\n• **Preferred destination type?** (theme parks, beach, cultural cities, nature)\n• **Budget considerations?**\n\n**Family-friendly destinations I highly recommend:**\n• **Orlando, Florida** - Theme park paradise\n• **London, UK** - Museums, parks, and Harry Potter!\n• **Barcelona, Spain** - Beaches, parks, and Gaudí\n• **Amsterdam, Netherlands** - Canals, bikes, and kid-friendly museums\n• **Tokyo, Japan** - Disney, technology, and unique culture\n\nWhat type of family adventure are you dreaming of?";
    }
    
    // Default response for other queries
    return "That sounds like an exciting travel idea! 🌟 I'm here to help you plan every detail. To create the most personalized recommendations for you:\n\n**Tell me about your dream trip:**\n• **Destination** (or if you need suggestions, let me know your interests!)\n• **Duration** (weekend, week, or longer?)\n• **Budget range** (so I can tailor recommendations)\n• **Travel style** (adventure, relaxation, culture, food, etc.)\n• **Special occasions?** (honeymoon, anniversary, family trip)\n\nThe more details you share, the better I can customize your perfect itinerary with specific hotels, restaurants, activities, and insider tips! What aspect of your trip would you like to start planning first?";
  };

  const handleQuickPrompt = (promptText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: promptText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(promptText),
        sender: 'assistant',
        timestamp: new Date()
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
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: generateAIResponse(message),
          sender: 'assistant',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
      }, 2000);
    }
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => setIsListening(false), 3000);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 h-[600px] flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 font-headline">AI Travel Assistant</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Your personal travel planning expert</p>
          </div>
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Start</h4>
        <div className="grid grid-cols-2 gap-2">
          {quickPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handleQuickPrompt(prompt.text)}
              className="flex items-center space-x-2 p-2 text-xs rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left group"
            >
              <prompt.icon className="h-3 w-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                {prompt.text}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-hidden flex flex-col">
        <div className="flex-1 space-y-4 mb-4 overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {msg.sender === 'assistant' && (
                <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
                  <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
              )}
              {msg.sender === 'user' && (
                <div className="p-1 bg-gray-100 dark:bg-gray-700 rounded-lg flex-shrink-0">
                  <div className="h-4 w-4 bg-gray-600 dark:bg-gray-400 rounded-full"></div>
                </div>
              )}
              <div className={`flex-1 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block p-3 rounded-xl max-w-full ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me about your dream destination..."
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
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
            className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AITravelAssistant;