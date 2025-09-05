import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const PlanningStep2: React.FC = () => {
  const { planningData, setPlanningData } = useApp();

  const quickPresets = [
    { label: 'Weekend', days: 2, icon: '🎯' },
    { label: '3 Days', days: 3, icon: '⚡' },
    { label: 'Week', days: 7, icon: '🌟' },
    { label: '2 Weeks', days: 14, icon: '🚀' }
  ];

  const handleDateChange = (field: 'startDate' | 'endDate', value: string) => {
    setPlanningData({ ...planningData, [field]: value });
  };

  const handleQuickPreset = (days: number) => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + days);
    
    setPlanningData({
      ...planningData,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl mb-6">
          <Calendar className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-xxxlarge font-bold font-headline text-gray-900 dark:text-gray-100 mb-4">
          When are you traveling?
        </h2>
        <p className="text-large text-gray-600 dark:text-gray-400">
          Choose your travel dates to get the best recommendations
        </p>
      </div>

      {/* Quick Presets */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Quick Presets
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickPresets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => handleQuickPreset(preset.days)}
              className="group p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">{preset.icon}</div>
                <div className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {preset.label}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {preset.days} {preset.days === 1 ? 'day' : 'days'}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Date Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={planningData.startDate}
              onChange={(e) => handleDateChange('startDate', e.target.value)}
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {planningData.startDate && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {formatDate(planningData.startDate)}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={planningData.endDate}
              onChange={(e) => handleDateChange('endDate', e.target.value)}
              min={planningData.startDate}
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {planningData.endDate && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {formatDate(planningData.endDate)}
              </p>
            )}
          </div>
        </div>

        {planningData.startDate && planningData.endDate && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl">
            <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
              <Clock className="h-4 w-4" />
              <span className="font-medium">
                {Math.ceil((new Date(planningData.endDate).getTime() - new Date(planningData.startDate).getTime()) / (1000 * 60 * 60 * 24))} days trip
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanningStep2;