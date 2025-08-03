const ChatHeader = () => {
  
  return (
    <div className="p-4 border-b border-gray-500 bg-white flex items-center">
      <div className="flex-shrink-0 mr-3">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src="https://i.pravatar.cc/100" alt="User Avatar" />
          </div>
        </div>
      </div>
      <div>
        <h2 className="font-semibold text-gray-800">Hassan Nawaaz</h2>
        <p className="text-xs text-gray-500">Online</p>
      </div>
    </div>
  );
};

export default ChatHeader;
