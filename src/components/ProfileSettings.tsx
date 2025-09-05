import React, { useState } from 'react';
import { User, Globe, DollarSign, Download, Heart, Settings, Bell, Shield } from 'lucide-react';

const ProfileSettings: React.FC = () => {
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('English');
  const [travelStyle, setTravelStyle] = useState(['Adventure', 'Culture']);

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'INR'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Japanese'];
  const styles = [
    { id: 'adventure', label: 'Adventure', icon: '🏔️' },
    { id: 'culture', label: 'Culture', icon: '🏛️' },
    { id: 'food', label: 'Food', icon: '🍜' },
    { id: 'relaxation', label: 'Relaxation', icon: '🌴' },
    { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
    { id: 'budget', label: 'Budget', icon: '💰' }
  ];

  const toggleTravelStyle = (styleId: string) => {
    if (travelStyle.includes(styleId)) {
      setTravelStyle(travelStyle.filter(s => s !== styleId));
    } else {
      setTravelStyle([...travelStyle, styleId]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-xxxlarge font-bold font-headline text-gray-900 dark:text-gray-100 mb-2">
          Profile & Settings
        </h1>
        <p className="text-medium text-gray-600 dark:text-gray-400">
          Customize your travel planning experience
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Travel Explorer
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Member since January 2024
              </p>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                Edit Profile
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">12</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Trips Planned</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">8</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Preferences */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Travel Preferences</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Globe className="h-4 w-4 inline mr-2" />
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <DollarSign className="h-4 w-4 inline mr-2" />
                  Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {currencies.map(curr => (
                    <option key={curr} value={curr}>{curr}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Travel Style */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center space-x-2">
              <Heart className="h-5 w-5" />
              <span>Default Travel Style</span>
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {styles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => toggleTravelStyle(style.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    travelStyle.includes(style.id)
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{style.icon}</div>
                    <div className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                      {style.label}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Export History */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center space-x-2">
              <Download className="h-5 w-5" />
              <span>Export & Sharing</span>
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">Tokyo Adventure - PDF</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Exported 2 days ago</div>
                </div>
                <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/30 rounded-lg transition-colors">
                  <Download className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">Paris Romance - Calendar</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Exported 1 week ago</div>
                </div>
                <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/30 rounded-lg transition-colors">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">Trip reminders</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Get notified before your trips</div>
                </div>
                <button className="w-12 h-6 bg-blue-600 rounded-full relative transition-colors">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 transition-transform"></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">Travel deals</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Receive offers for your favorite destinations</div>
                </div>
                <button className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative transition-colors">
                  <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 transition-transform"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;