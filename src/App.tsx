import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          TravelPlanner
        </h1>
        
        <div className="bg-gray-50 rounded-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            AI Travel Assistant
          </h2>
          <p className="text-gray-600">
            Hello! I'm your travel planning assistant. Tell me where you want to go!
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;