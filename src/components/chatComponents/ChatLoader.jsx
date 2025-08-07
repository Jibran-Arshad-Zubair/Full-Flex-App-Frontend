import { FiMessageSquare, FiLoader } from 'react-icons/fi';

const ChatLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      
      <div className="relative mb-8 w-24 h-24">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <FiMessageSquare className="text-blue-400 text-5xl animate-pulse" />
            <FiLoader className="absolute -bottom-2 -right-2 text-blue-500 text-xl animate-spin" />
          </div>
        </div>
      </div>

    
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
        Loading Conversation
        <span className="typing-dots">
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </span>
      </h2>

     
      <div className="w-48 bg-gray-200 rounded-full h-1.5 mt-6 overflow-hidden">
        <div className="bg-blue-500 h-1.5 rounded-full animate-progress"></div>
      </div>


      <p className="text-gray-500 text-sm mt-6">
        Preparing your chat history...
      </p>
    </div>
  );
};

export default ChatLoader;