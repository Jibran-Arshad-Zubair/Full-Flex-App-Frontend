import { useSelector } from "react-redux";
import defaultProfile from '../../assets/defaultProfile.png';

const ChatHeader = () => {
  const selectedUser = useSelector((state) => state.chat.selectedUser);

if (!selectedUser) {
  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center justify-center">
      <p className="text-gray-500 dark:text-gray-400 text-sm">Please select a user to start chat.</p>
    </div>
  );
}

  return (
  <div className="p-4 border-b border-gray-500 dark:border-gray-600 bg-white dark:bg-gray-900 flex items-center">
    <div className="flex-shrink-0 mr-3">
      <div className="avatar">
        <div className="w-10 rounded-full">
          <img
            src={selectedUser.profilePhoto || defaultProfile}
            alt={selectedUser.fullName}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultProfile;
            }}
          />
        </div>
      </div>
    </div>
    <div>
      <h2 className="font-semibold text-gray-800 dark:text-gray-100">{selectedUser.fullName}</h2>
      <p className="text-xs text-gray-500 dark:text-gray-400">Online</p>
    </div>
  </div>
);
};

export default ChatHeader;
