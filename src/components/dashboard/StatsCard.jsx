import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon, color }) => {

  const colorClasses = {
    indigo: {
      bg: 'bg-indigo-50 dark:bg-indigo-900/20',
      text: 'text-indigo-600 dark:text-indigo-400',
      border: 'border-indigo-100 dark:border-indigo-800',
      iconBg: 'bg-indigo-100 dark:bg-indigo-800/40',
    },
    blue: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      text: 'text-green-600 dark:text-green-400',
      border: 'border-green-100 dark:border-green-800',
      iconBg: 'bg-green-100 dark:bg-green-800/40',
    },
    green: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-100 dark:border-blue-800',
      iconBg: 'bg-blue-100 dark:bg-blue-800/40',
    },
    yellow: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      text: 'text-yellow-600 dark:text-yellow-400',
      border: 'border-yellow-100 dark:border-yellow-800',
      iconBg: 'bg-yellow-100 dark:bg-yellow-800/40',
    },
  };

  const colors = colorClasses[color] || colorClasses.indigo;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`relative overflow-hidden rounded-xl border ${colors.border} ${colors.bg} p-6 shadow-sm transition-all duration-300 hover:shadow-md`}
    >
      {/* Background circle */}
      <div className={`absolute -right-6 -top-6 h-16 w-16 rounded-full ${colors.iconBg} opacity-20`} />

      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </h3>

          <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
            {value}
          </p>
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