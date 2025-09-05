import React from 'react';
import { Heart, Activity } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { travelPreferences } from '../../data/mockData';

const PlanningStep3: React.FC = () => {
  const { planningData, setPlanningData } = useApp();

  const togglePreference = (preferenceId: string) => {
    const currentPrefs = planningData.preferences;
    const isSelected = currentPrefs.includes(preferenceId);
    
    if (isSelected) {
      setPlanningData({
        ...planningData,
        preferences: currentPrefs.filter(p => p !== preferenceId)
      });
    } else {
      setPlanningData({
        ...planningData,
        preferences: [...currentPrefs, preferenceId]
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-6">
          <Heart className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-xxxlarge font-bold font-headline text-gray-900 dark:text-gray-100 mb-4">
          What interests you?
        </h2>
        <p className="text-large text-gray-600 dark:text-gray-400">
          Select your travel preferences to get personalized recommendations
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {travelPreferences.map((preference) => (
          <button
            key={preference.id}
            onClick={() => togglePreference(preference.id)}
            className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 ${
              planningData.preferences.includes(preference.id)
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-lg scale-105'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md'
            }`}
          >
            <div className="text-center">
              <div className="text-3xl mb-3">{preference.icon}</div>
              <div className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                {preference.label}
              </div>
              <div className="flex items-center justify-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <Activity className="h-3 w-3" />
                <span>{preference.count}</span>
              </div>
            </div>
            
            {planningData.preferences.includes(preference.id) && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {planningData.preferences.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Your Selected Preferences:
          </h3>
          <div className="flex flex-wrap gap-2">
            {planningData.preferences.map((prefId) => {
              const pref = travelPreferences.find(p => p.id === prefId);
              return pref ? (
                <span
                  key={prefId}
                  className="inline-flex items-center space-x-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg text-sm font-medium"
                >
                  <span>{pref.icon}</span>
                  <span>{pref.label}</span>
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanningStep3;