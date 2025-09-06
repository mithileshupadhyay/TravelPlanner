import React from 'react';
import { MapPin, Calendar, Star, ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="text-center py-20 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-800/50 dark:via-slate-900 dark:to-blue-950/30 rounded-3xl"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.08),transparent_70%)]"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-6">
            ✈️ Your Journey Starts Here
          </span>
        </div>
        <h1 className="text-largedisplay font-bold font-headline mb-8 text-slate-900 dark:text-white leading-tight">
          Plan Your Perfect
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Travel Experience
          </span>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-headline mb-8 text-slate-900 dark:text-white leading-tight">
            Plan Your Perfect
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Adventure
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Create personalized itineraries, discover hidden gems, and make every journey 
            <br className="hidden md:block" />
            unforgettable with our intelligent travel assistant.
        <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Create personalized itineraries, discover hidden gems, and make every journey unforgettable with our intelligent travel planning platform.
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
        {/* CTA Button */}
        <div className="mb-16">
          <button className="group inline-flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-1">
            <span>Start Planning Now</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
            <button className="group inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 hover:-translate-y-1 transform">
export default HeroSection;
  )
}