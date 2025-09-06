import React from 'react';
import { Bot } from 'lucide-react';

const AIAssistantCard: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <div className="flex items-start space-x-4">
        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
          <Bot className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            AI Travel Assistant
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Get personalized recommendations and instant answers to your travel questions.
          </p>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              Plan itinerary
            </button>
            <button className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              Find destinations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantCard;