import React from 'react';
import { X, Download, Calendar, Share2, FileText } from 'lucide-react';

interface ExportOptionsProps {
  onClose: () => void;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({ onClose }) => {
  const exportOptions = [
    {
      icon: FileText,
      title: 'PDF Itinerary',
      description: 'Download a detailed PDF with all your trip information',
      action: 'pdf'
    },
    {
      icon: Calendar,
      title: 'Calendar Events',
      description: 'Add all activities to your calendar app',
      action: 'calendar'
    },
    {
      icon: Share2,
      title: 'Share Link',
      description: 'Create a shareable link for friends and family',
      action: 'share'
    }
  ];

  const handleExport = (action: string) => {
    console.log(`Exporting as: ${action}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Export Options
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="space-y-3">
          {exportOptions.map((option) => (
            <button
              key={option.action}
              onClick={() => handleExport(option.action)}
              className="w-full flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left group"
            >
              <div className="p-2 bg-blue-100 dark:bg-blue-950/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/40 transition-colors">
                <option.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {option.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {option.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;