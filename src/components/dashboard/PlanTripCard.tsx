import React from 'react';
import { Plus, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const PlanTripCard: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white relative overflow-hidden group hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      <div className="absolute top-4 right-4 opacity-20">
        <Sparkles className="h-16 w-16" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center space-x-2 mb-4">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Plus className="h-5 w-5" />
          </div>
          <span className="text-sm font-medium opacity-90">New Trip</span>
        </div>
        
        <h3 className="text-xxlarge font-bold font-headline mb-4 leading-tight">
          Plan Your Next
          <br />
          Adventure
        </h3>
        
        <p className="text-blue-100 mb-6 leading-relaxed">
          Create personalized itineraries with AI assistance. Get recommendations for destinations, activities, and accommodations.
        </p>
        
        <div className="space-y-3 mb-8">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="text-blue-100">AI-Powered Recommendations</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="text-blue-100">Personalized Itineraries</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="text-blue-100">Budget Optimization</span>
          </div>
        </div>
        
        <button
          onClick={() => setCurrentView('planning')}
          className="group/btn inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 hover:shadow-lg"
        >
          <span>Start Planning</span>
          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default PlanTripCard;