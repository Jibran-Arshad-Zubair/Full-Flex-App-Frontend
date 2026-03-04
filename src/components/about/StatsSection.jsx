import React from 'react';
import Card from '../ui/Card';

export default function StatsSection({ stats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16 animate-slide-up">
      {stats.map((stat, index) => (
        <Card 
          key={index}
          className="p-6 text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 group"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            {stat.value}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {stat.label}
          </p>
          <span className="inline-block px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded-full">
            {stat.change}
          </span>
        </Card>
      ))}
    </div>
  );
}