import React from 'react';

const ReviewCard = ({ rating }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
      <div className="flex items-center mb-2">
        <div className="flex text-yellow-400">
          {'★'.repeat(rating.rating)}{'☆'.repeat(5 - rating.rating)}
        </div>
        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
          ({rating.rating}/5)
        </span>
      </div>
      <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
        {rating.review}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        - {rating.user?.fullName || 'Anonymous'}
      </p>
    </div>
  );
};

export default ReviewCard;