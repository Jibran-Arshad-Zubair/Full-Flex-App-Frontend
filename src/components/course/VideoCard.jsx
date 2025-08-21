import React from 'react';
import { FiClock, FiPlay } from 'react-icons/fi';

const VideoCard = ({ video, index, onWatch }) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
            {index + 1}. {video.title}
          </h3>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <FiClock className="mr-2" />
            {video.duration}
          </div>
        </div>
        <button
          onClick={() => onWatch(video.url)}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center transform hover:scale-105"
        >
          <FiPlay className="mr-2" />
          Watch
        </button>
      </div>
    </div>
  );
};

export default VideoCard;