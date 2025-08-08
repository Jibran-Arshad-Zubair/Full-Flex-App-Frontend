import { FiBell, FiAlertCircle, FiMessageSquare, FiAward, FiX } from 'react-icons/fi';
const NotificationsPanel = () => {
  const notifications = [
    {
      id: 1,
      title: "New Announcement",
      message: "Weekend workshop on Advanced React Patterns",
      time: "Just now",
      icon: <FiBell className="text-blue-500" />,
      priority: "high",
      unread: true
    },
    {
      id: 2,
      title: "System Alert",
      message: "Scheduled maintenance tonight at 11 PM",
      time: "30 mins ago",
      icon: <FiAlertCircle className="text-amber-500" />,
      priority: "medium",
      unread: true
    },
    {
      id: 3,
      title: "New Message",
      message: "You have 3 unread messages in the group chat",
      time: "2 hours ago",
      icon: <FiMessageSquare className="text-indigo-500" />,
      priority: "low",
      unread: false
    },
    {
      id: 4,
      title: "Achievement Unlocked",
      message: "Completed all Node.js modules with distinction",
      time: "1 day ago",
      icon: <FiAward className="text-green-500" />,
      priority: "info",
      unread: false
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200  overflow-hidden shadow-lg ">

      <div className="px-6 py-4 border-b border-gray-200/50 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <FiBell className="mr-2 text-indigo-600 animate-pulse" />
          Notifications
          <span className="ml-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            2 new
          </span>
        </h3>
        <button className="text-gray-400 hover:text-gray-600">
          <FiX />
        </button>
      </div>

  
      <div className="divide-y divide-gray-200/50 max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`p-4 ${notification.unread ? 'bg-blue-50/50' : 'bg-white'} hover:bg-gray-50 transition-colors relative`}
          >
        
            {notification.priority === "high" && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-r"></div>
            )}
            
            <div className="flex items-start">
           
              <div className="p-2 rounded-lg bg-white border border-gray-200 shadow-xs mr-3">
                {notification.icon}
              </div>

         
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h4 className="font-medium text-gray-800">
                    {notification.title}
                    {notification.unread && (
                      <span className="ml-2 w-2 h-2 inline-block bg-red-500 rounded-full"></span>
                    )}
                  </h4>
                  <span className="text-xs text-gray-400">{notification.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className="px-6 py-3 border-t border-gray-200/50 flex justify-between items-center bg-gray-50">
        <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
          Mark all as read
        </button>
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
          Notification Settings
        </button>
      </div>
    </div>
  );
};

export default NotificationsPanel;