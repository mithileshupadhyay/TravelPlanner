import React from 'react';
import { useApp } from '../../contexts/AppContext';

const ProgressBar: React.FC = () => {
  const { planningData } = useApp();
  const progress = (planningData.currentStep / 4) * 100;

  return (
    <div className="mt-6">
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;