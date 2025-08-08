import { FiClock, FiUser, FiFileText, FiDownload, FiCheckCircle } from 'react-icons/fi';
const RecentActivities = () => {
  const activities = [
    {
      id: 1,
      user: "Moch Ramdhani",
      action: "submitted assignment",
      course: "Advanced React",
      time: "10 mins ago",
      icon: <FiFileText className="text-blue-500" />,
      status: "graded"
    },
    {
      id: 2,
      user: "Fikri Ruslandi",
      action: "uploaded new material",
      course: "Tailwind CSS",
      time: "45 mins ago",
      icon: <FiDownload className="text-purple-500" />,
      status: "new"
    },
    {
      id: 3,
      user: "Abu Abdullah",
      action: "completed quiz",
      course: "Node.js Fundamentals",
      time: "2 hours ago",
      icon: <FiCheckCircle className="text-green-500" />,
      status: "perfect-score"
    },
    {
      id: 4,
      user: "Saepul Rohman",
      action: "asked a question",
      course: "MERN Stack",
      time: "5 hours ago",
      icon: <FiUser className="text-amber-500" />,
      status: "unanswered"
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
 
      <div className="px-6 py-4 border-b border-gray-200/50 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <FiClock className="mr-2 text-indigo-600" />
          Recent Activities
        </h3>
        <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
          Live Updates
        </span>
      </div>

    
      <div className="divide-y divide-gray-200/50">
        {activities.map((activity) => (
          <div key={activity.id} className="p-4 hover:bg-gray-50/50 transition-colors group">
            <div className="flex items-start">
           
              <div className="relative mt-1">
                <div className="p-2 rounded-lg bg-white border border-gray-200 shadow-xs group-hover:shadow-sm transition-shadow">
                  {activity.icon}
                </div>
                {activity.status === "graded" && (
                  <div className="absolute -right-1 -bottom-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                )}
              </div>

       
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-800">
                    {activity.user} <span className="text-gray-500 font-normal">{activity.action}</span>
                  </p>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{activity.course}</p>
                
                
                {activity.status === "perfect-score" && (
                  <span className="inline-flex items-center mt-2 text-xs font-medium py-0.5 px-2 rounded-full bg-green-100 text-green-800">
                    <FiCheckCircle className="mr-1" /> Perfect Score!
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    
      <div className="px-6 py-3 border-t border-gray-200/50 text-center">
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
          View All Activities →
        </button>
      </div>
    </div>
  );
};

export default RecentActivities;