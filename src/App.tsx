import React from 'react';
import { Plane, Bot, Send } from 'lucide-react';

function App() {
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState([
    {
      id: '1',
      text: "Hello! I'm your travel planning assistant. Tell me where you want to go and for how many days!",
      sender: 'assistant'
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const userMessage = {
        id: Date.now().toString(),
        text: message,
        sender: 'user'
      };
      
      setMessages(prev => [...prev, userMessage]);
      setMessage('');
      
      // Simple response
      setTimeout(() => {
        const response = {
          id: (Date.now() + 1).toString(),
          text: "I'd be happy to help you plan your trip! Please tell me your destination and number of days.",
          sender: 'assistant'
        };
        setMessages(prev => [...prev, response]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Plane className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900">TravelPlanner</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Plan Your Perfect Trip
          </h2>
          <p className="text-lg text-gray-600">
            Get personalized travel itineraries with our AI assistant
          </p>
        </div>

        {/* AI Assistant Card */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 max-w-2xl mx-auto">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bot className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">AI Travel Assistant</h3>
                <p className="text-sm text-gray-600">Plan your perfect trip</p>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="p-4">
            <div className="bg-white rounded-lg border border-gray-200 h-80 flex flex-col">
              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about destinations, itineraries..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;