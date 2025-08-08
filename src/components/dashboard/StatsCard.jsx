import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon, color }) => {

  const colorClasses = {
    indigo: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-600',
      border: 'border-indigo-100',
      iconBg: 'bg-indigo-100',
    },
    blue: {
      bg: 'bg-green-50',
      text: 'text-green-600',
      border: 'border-green-100',
      iconBg: 'bg-green-100',
    },
    green: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-100',
      iconBg: 'bg-blue-100',
    },
    yellow: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-600',
      border: 'border-yellow-100',
      iconBg: 'bg-yellow-100',
    },
  };

  const colors = colorClasses[color] || colorClasses.indigo;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`relative overflow-hidden rounded-xl border ${colors.border} ${colors.bg} p-6 shadow-sm transition-all duration-300 hover:shadow-md`}
    >
  
      <div className={`absolute -right-6 -top-6 h-16 w-16 rounded-full ${colors.iconBg} opacity-20`}></div>
      
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        
        <div className={`rounded-lg p-3 ${colors.iconBg} ${colors.text}`}>
          {React.cloneElement(icon, { className: "w-6 h-6" })}
        </div>
      </div>
      
      
      <div className="mt-4 flex items-center">
        <span className={`inline-flex items-center text-xs font-medium ${colors.text}`}>
          <svg
            className="mr-1 h-3 w-3"
            fill="currentColor"
            viewBox="0 0 12 12"
          >
            <path d="M5.707 2.293a1 1 0 00-1.414 0L1 5.586V4a1 1 0 00-2 0v4a1 1 0 001 1h4a1 1 0 000-2H2.414l3.293-3.293a1 1 0 000-1.414zM9 8a1 1 0 002 0V4a1 1 0 00-1-1h-4a1 1 0 100 2h1.586l-3.293 3.293a1 1 0 000 1.414l3.293 3.293H7a1 1 0 100 2h4a1 1 0 001-1V8z" />
          </svg>
          {Math.floor(Math.random() * 12) + 5}% from last month
        </span>
      </div>
    </motion.div>
  );
};

export default StatsCard;