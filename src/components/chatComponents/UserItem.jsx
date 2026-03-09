import defaultProfile from "../../assets/defaultProfile.png";

const UserItem = ({
  name,
  // lastMessage,
  time,
  unread,
  // isTyping,
  profilePhoto,
  onClick,
}) => {
  return (
  <div
  onClick={onClick}
  className="flex items-center p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
>
  <div className="flex-shrink-0">
    <div className="avatar avatar-online">
      <div className="w-12 rounded-full">
        {profilePhoto ? (
          <img
            src={profilePhoto}
            alt={name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultProfile;
            }}
          />
        ) : (
          <div className="bg-gray-300 dark:bg-gray-600 flex items-center justify-center w-12 h-12 text-gray-600 dark:text-gray-300 font-semibold rounded-full">
            {name.charAt(0)}
          </div>
        )}
      </div>
    </div>
  </div>
  <div className="ml-3 flex-1 min-w-0">
    <div className="flex justify-between items-center">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate capitalize">
        {name}
      </h3>
      <span
        className={`text-xs ${
          unread ? "text-blue-500 font-bold" : "text-gray-500 dark:text-gray-300"
        }`}
      >
        {time}
      </span>
    </div>
  </div>
  {unread && <div className="ml-2 w-2 h-2 rounded-full bg-blue-500"></div>}
</div>
  );
};

export default UserItem;
