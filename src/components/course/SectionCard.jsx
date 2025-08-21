import React from 'react';

const SectionCard = ({ title, icon, children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        {icon && <span className="mr-3">{icon}</span>}
        {title}
      </h2>
      {children}
    </div>
  );
};

export default SectionCard;