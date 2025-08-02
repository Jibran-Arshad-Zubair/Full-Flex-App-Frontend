
const ChatHeader = () => {
  return (
    <div className="p-4 border-b border-gray-200 bg-white flex items-center">
      <div className="flex-shrink-0 mr-3">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
          A
        </div>
      </div>
      <div>
        <h2 className="font-semibold text-gray-800">Abu Abdullah Nugraha</h2>
        <p className="text-xs text-gray-500">Online</p>
      </div>
    </div>
  );
};

export default ChatHeader;