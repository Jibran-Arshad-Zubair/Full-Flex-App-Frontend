import { FiUsers, FiSearch, FiArrowRight } from 'react-icons/fi';

const NoUserSelectedComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
     
      <div className="relative mb-8">
        <div className="w-40 h-40 md:w-48 md:h-48 bg-purple-50 rounded-full flex items-center justify-center">
          <FiUsers className="text-purple-400 text-6xl" />
        </div>
       
      </div>

     
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
        No User Selected
      </h2>
      <p className="text-gray-600 mb-6 max-w-md">
        Choose a user from your contacts to start a conversation. 
        Your messages will appear here once you select someone.
      </p>

     
      <div className="flex items-center justify-center mb-8">
        <div className="relative w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-purple-400 animate-progress"></div>
        </div>
        <FiArrowRight className="text-purple-500 ml-2 animate-bounce-horizontal" />
      </div>

 
      <div className="flex flex-col items-center">
        <div className="text-sm text-gray-500 flex items-center">
          <span className="hidden sm:inline">←</span>
          <span className="mx-2">Select from sidebar</span>
          <span className="hidden sm:inline">→</span>
        </div>
       
      </div>
    </div>
  );
};

export default NoUserSelectedComponent;