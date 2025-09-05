import React from 'react';

interface DayTabsProps {
  tripDuration: number;
  selectedDay: number;
  onDaySelect: (day: number) => void;
}

const DayTabs: React.FC<DayTabsProps> = ({ tripDuration, selectedDay, onDaySelect }) => {
  const days = Array.from({ length: tripDuration }, (_, i) => i + 1);

  return (
    <div className="mb-8">
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => onDaySelect(day)}
            className={`flex-shrink-0 px-6 py-3 rounded-xl font-medium transition-all ${
              selectedDay === day
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            Day {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DayTabs;