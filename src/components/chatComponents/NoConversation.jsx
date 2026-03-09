import { FiMessageSquare, FiUserPlus, FiSend } from 'react-icons/fi';

const NoConversationComponent = ({ selectedUser }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-gray-50 dark:bg-gray-800">
     
      <div className="relative mb-8">
        <div className="w-40 h-40 md:w-48 md:h-48 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
          <FiMessageSquare className="text-blue-400 dark:text-blue-300 text-6xl" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-900 p-3 rounded-full shadow-md">
          <FiUserPlus className="text-blue-500 dark:text-blue-400 text-xl" />
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        No Conversation Yet
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
        You haven't chatted with {selectedUser?.fullName || 'this user'} before. 
        Send your first message to start the conversation!
      </p>

      <div className="relative mb-8 w-24 h-2">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-blue-400 dark:bg-blue-300 rounded-full animate-bounce mx-1"></div>
          <div className="w-2 h-2 bg-blue-400 dark:bg-blue-300 rounded-full animate-bounce mx-1 delay-100"></div>
          <div className="w-2 h-2 bg-blue-400 dark:bg-blue-300 rounded-full animate-bounce mx-1 delay-200"></div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <FiSend className="text-blue-500 dark:text-blue-400 text-2xl mb-2" />
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Type your message below to get started
        </p>
      </div>
    </div>
  );
};

export default NoConversationComponent;