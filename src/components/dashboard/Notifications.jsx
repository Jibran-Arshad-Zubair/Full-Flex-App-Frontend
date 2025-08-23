import { FiBell,  FiUserPlus,  FiAward, FiCheckCircle, FiClock} from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useGetAllCoursesQuery } from '../../Redux/queries/course/courseApi';
import { useState, useMemo } from 'react';

const NotificationsPanel = () => {
  const [readNotifications, setReadNotifications] = useState(new Set());
  const { data: allCourses, isLoading } = useGetAllCoursesQuery();
  const authUser = useSelector((state) => state.user.authUser);
  const userId = authUser?.user?._id;

  const myCourses = useMemo(() => {
    return allCourses?.data?.filter(
      (course) => course.teacher._id === userId
    ) || [];
  }, [allCourses?.data, userId]);

  const notifications = useMemo(() => {
    let notifs = [];
    

    myCourses.forEach((course) => {
     
      if (Array.isArray(course.students)) {
        course.students.slice(-3).forEach((student) => {
          notifs.push({
            id: `enroll-${course._id}-${student._id}`,
            title: "New Student Enrolled",
            message: `${student.name || 'A new student'} enrolled in "${course.title}"`,
            time: student.enrolledAt ? new Date(student.enrolledAt).toLocaleString() : 'Recently',
            icon: <FiUserPlus className="text-blue-500" />,
            priority: "high",
            timestamp: student.enrolledAt ? new Date(student.enrolledAt).getTime() : Date.now(),
          });
        });
      }

    
      if (course.status === 'active') {
        notifs.push({
          id: `status-${course._id}`,
          title: "Course Activated",
          message: `"${course.title}" is now live and visible to students`,
          time: new Date(course.updatedAt).toLocaleString(),
          icon: <FiCheckCircle className="text-green-500" />,
          priority: "medium",
          timestamp: new Date(course.updatedAt).getTime(),
        });
      } else if (course.status === 'pending') {
        notifs.push({
          id: `status-${course._id}`,
          title: "Course Pending Review",
          message: `"${course.title}" is awaiting approval`,
          time: new Date(course.updatedAt).toLocaleString(),
          icon: <FiClock className="text-amber-500" />,
          priority: "medium",
          timestamp: new Date(course.updatedAt).getTime(),
        });
      }

    
      const createdDate = new Date(course.createdAt);
      const now = new Date();
      const daysDiff = (now - createdDate) / (1000 * 60 * 60 * 24);
      
      if (daysDiff <= 7) {
        notifs.push({
          id: `new-${course._id}`,
          title: "New Course Created",
          message: `You created "${course.title}"`,
          time: createdDate.toLocaleString(),
          icon: <FiAward className="text-indigo-500" />,
          priority: "info",
          timestamp: createdDate.getTime(),
        });
      }
    });


    return notifs
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 10)
      .map(notif => ({
        ...notif,
        unread: !readNotifications.has(notif.id)
      }));
  }, [myCourses, readNotifications]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleMarkAllAsRead = () => {
    const newReadNotifications = new Set(readNotifications);
    notifications.forEach(notif => {
      newReadNotifications.add(notif.id);
    });
    setReadNotifications(newReadNotifications);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
      <div className="px-6 py-4 border-b border-gray-200/50 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <FiBell className={`mr-2 text-indigo-600 ${unreadCount > 0 ? 'animate-pulse' : ''}`} />
          Notifications
          {unreadCount > 0 && (
            <span className="ml-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {unreadCount} new
            </span>
          )}
        </h3>
      </div>

      <div className="divide-y divide-gray-200/50 max-h-96 overflow-y-auto">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">
            <FiClock className="w-6 h-6 mx-auto mb-2 animate-spin" />
            Loading notifications...
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <FiBell className="w-6 h-6 mx-auto mb-2" />
            No notifications yet
          </div>
        ) : (
          notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-4 ${notification.unread ? 'bg-blue-50/50' : 'bg-white'} hover:bg-gray-50 transition-colors relative group`}
              onClick={() => {
                if (notification.unread) {
                  setReadNotifications(prev => new Set([...prev, notification.id]));
                }
              }}
            >
              {notification.priority === "high" && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-r"></div>
              )}
              
              <div className="flex items-start">
                <div className="p-2 rounded-lg bg-white border border-gray-200 shadow-xs mr-3 group-hover:shadow-md transition-shadow">
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
          ))
        )}
      </div>

      <div className="px-6 py-3 border-t border-gray-200/50 flex justify-between items-center bg-gray-50">
        <button 
          className={`text-sm ${unreadCount > 0 ? 'text-indigo-600 hover:text-indigo-800' : 'text-gray-400 cursor-not-allowed'} transition-colors`}
          onClick={handleMarkAllAsRead}
          disabled={unreadCount === 0}
        >
          Mark all as read
        </button>
       
      </div>
    </div>
  );
};

export default NotificationsPanel;