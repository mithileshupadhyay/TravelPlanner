import React, { useState } from 'react';
import { Bot, Send, Sparkles, Clock, DollarSign, MapPin, Mic, MicOff } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm TravelYatri, your personal travel expert. I'm here to help you refine your itinerary, suggest alternatives, or answer any questions about your destination. What would you like to explore today?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const quickActions = [
    { icon: Clock, label: 'Adjust timing', action: 'adjust-timing', prompt: 'Can you help me adjust the timing of my activities for better flow?' },
    { icon: DollarSign, label: 'Budget options', action: 'budget-options', prompt: 'I\'d like to explore budget-friendly alternatives for my trip.' },
    { icon: MapPin, label: 'Add attractions', action: 'add-attractions', prompt: 'What are some must-see attractions I might have missed?' },
    { icon: Sparkles, label: 'Optimize route', action: 'optimize-route', prompt: 'Can you help optimize my daily routes to save time and energy?' }
  ];

  const travelYatriResponses = {
    'adjust-timing': "Absolutely! Let me help you create a better flow for your daily activities. I notice some potential timing improvements we could make... For instance, visiting popular attractions early morning or late afternoon often means fewer crowds and better lighting for photos. Would you like me to suggest specific time adjustments for any particular day?",
    
    'budget-options': "That's a great idea to explore budget-friendly options! I can definitely help you stretch your travel budget without compromising the experience. There are several ways we can optimize costs - from choosing local eateries over tourist restaurants to finding free cultural activities. What aspect of your budget would you like to focus on first?",
    
    'add-attractions': "I'd love to help you discover some hidden gems! Based on your current itinerary, I can see you're interested in cultural experiences. There are some wonderful local spots that many travelers miss... Are you looking for more cultural sites, natural attractions, or perhaps some unique local experiences that aren't in the typical guidebooks?",
    
    'optimize-route': "Excellent question! Route optimization can really enhance your travel experience and save you valuable time. Looking at your current plan, I can suggest some strategic reordering that would minimize travel time between locations... Does that sound like the kind of efficiency you're looking for? I can walk you through the optimized daily routes."
  };

  const handleQuickAction = (action: string, prompt: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: prompt,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Simulate TravelYatri response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: travelYatriResponses[action as keyof typeof travelYatriResponses] || "I'd be happy to help with that! Let me provide you with some personalized recommendations based on your travel style and preferences.",
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 2000);
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
      
      // Generate TravelYatri-style response
      setTimeout(() => {
        const responses = [
          "That's a wonderful question! As a seasoned travel expert, I'd recommend... Let me share some insights based on my experience with similar trips. Does that sound like the kind of experience you're looking for?",
          "Absolutely! I see what you're looking for. Based on your travel style, I have some great suggestions that many of my travelers have loved... Are we on the right track with this approach?",
          "Great point! Let me help you with that. From my years of planning trips, I've found that... This should give you exactly what you're hoping for. How does this sound?",
          "I love that you're thinking about this! Here's what I typically recommend for travelers in your situation... This approach has worked wonderfully for families and solo travelers alike. What do you think?"
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          sender: 'assistant',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
      }, 2500);
    }
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input functionality would be implemented here
    if (!isListening) {
      setTimeout(() => setIsListening(false), 3000); // Auto-stop after 3 seconds for demo
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 sticky top-24 max-h-[600px] flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 font-headline">TravelYatri</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Your Personal Travel Expert</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 font-headline">Quick Assistance</h4>
        <div className="space-y-2">
          {quickActions.map((action) => (
            <button
              key={action.action}
              onClick={() => handleQuickAction(action.action, action.prompt)}
              className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left group"
            >
              <action.icon className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-6 overflow-hidden flex flex-col">
        <div className="flex-1 space-y-4 mb-4 overflow-y-auto">
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
            placeholder="Ask TravelYatri anything..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
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

export default AIAssistant;