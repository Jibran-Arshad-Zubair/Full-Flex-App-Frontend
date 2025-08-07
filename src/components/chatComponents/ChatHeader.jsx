import { useSelector } from "react-redux";

const ChatHeader = () => {
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  return (
    <div className="p-4 border-b border-gray-500 bg-white flex items-center">
      <div className="flex-shrink-0 mr-3">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src={selectedUser?.profilePhoto} alt="User Avatar" />
          </div>
        </div>
      </div>
      <div>
        <h2 className="font-semibold text-gray-800">{selectedUser?.fullName}</h2>
        <p className="text-xs text-gray-500">Online</p>
      </div>
    </div>
  );
};

export default ChatHeader;
