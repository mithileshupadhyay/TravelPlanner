import React, { useState } from 'react';
import { Bot, Send, Sparkles, MapPin, Calendar, DollarSign, Heart, Mic, MicOff } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const AIAssistantCard: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm TravelYatri, your personal travel expert. I'm here to help you discover amazing destinations, plan perfect itineraries, and answer any travel questions you might have. What adventure are you dreaming of today?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const quickSuggestions = [
    { icon: MapPin, text: 'Suggest a weekend getaway', prompt: 'Can you suggest some great weekend getaway destinations within a few hours of travel?' },
    { icon: Calendar, text: 'Plan a 7-day trip', prompt: 'I want to plan a 7-day vacation. What are some popular destinations and what should I consider?' },
    { icon: DollarSign, text: 'Budget travel tips', prompt: 'What are your best tips for traveling on a budget without compromising the experience?' },
    { icon: Heart, text: 'Romantic destinations', prompt: 'What are some of the most romantic destinations for couples?' }
  ];

  const travelYatriResponses = [
    "That's a fantastic question! As someone who's helped plan thousands of trips, I'd recommend... Based on your interests, I think you'd absolutely love these options. What type of experience are you most drawn to?",
    "Wonderful choice! I've seen so many travelers fall in love with destinations like this. Let me share some insider tips that most guidebooks don't mention... Does this sound like the kind of adventure you're looking for?",
    "Great thinking! Budget travel is one of my favorite topics because you can have incredible experiences without breaking the bank. Here are some proven strategies I always recommend... Which of these approaches interests you most?",
    "I love helping with romantic getaways! There's something magical about discovering new places with someone special. Based on my experience, these destinations create the most unforgettable moments... What's your ideal romantic setting?"
  ];

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
      const randomResponse = travelYatriResponses[Math.floor(Math.random() * travelYatriResponses.length)];
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
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
      
      setTimeout(() => {
        const randomResponse = travelYatriResponses[Math.floor(Math.random() * travelYatriResponses.length)];
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
    if (!isListening) {
      setTimeout(() => setIsListening(false), 3000);
    }
  };

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
          <span className="text-sm">Powered by AI • Available 24/7</span>
        </div>
      </div>

      {/* Quick Suggestions */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 font-headline">
          Popular Questions
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
        <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
          {messages.slice(-3).map((msg) => (
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
            placeholder="Ask me anything about travel..."
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