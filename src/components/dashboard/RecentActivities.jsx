
import { FiClock, FiUser, FiFileText, FiDownload, FiCheckCircle } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useGetAllCoursesQuery } from '../../Redux/queries/course/courseApi';
import React from 'react';

const RecentActivities = () => {
  const { data: allCourses, isLoading } = useGetAllCoursesQuery();
  const authUser = useSelector((state) => state.user.authUser);
  const userId = authUser?.user?._id;

  
  const myCourses = allCourses?.data?.filter(
    (course) => course.teacher._id === userId
  ) || [];

  
  let activities = [];
  myCourses.forEach((course) => {
    
    activities.push({
      id: `created-${course._id}`,
      user: course.teacher.name || 'You',
      action: 'created the course',
      course: course.title,
      time: new Date(course.createdAt).toLocaleString(),
      icon: <FiFileText className="text-blue-500" />, 
      status: 'created',
      timestamp: new Date(course.createdAt).getTime(),
    });
    
    if (course.status === 'active') {
      activities.push({
        id: `active-${course._id}`,
        user: course.teacher.name || 'You',
        action: 'activated the course',
        course: course.title,
        time: new Date(course.updatedAt).toLocaleString(),
        icon: <FiCheckCircle className="text-green-500" />, 
        status: 'active',
        timestamp: new Date(course.updatedAt).getTime(),
      });
    } else if (course.status === 'pending') {
      activities.push({
        id: `pending-${course._id}`,
        user: course.teacher.name || 'You',
        action: 'set course as pending',
        course: course.title,
        time: new Date(course.updatedAt).toLocaleString(),
  icon: <FiClock className="text-yellow-500" />, // pending
        status: 'pending',
        timestamp: new Date(course.updatedAt).getTime(),
      });
    }
   
    if (Array.isArray(course.students)) {
      course.students.slice(-3).forEach((student) => {
        activities.push({
          id: `enroll-${course._id}-${student._id}`,
          user: student.name || 'Student',
          action: 'enrolled in',
          course: course.title,
          time: student.enrolledAt ? new Date(student.enrolledAt).toLocaleString() : 'Recently',
          icon: <FiUser className="text-indigo-500" />, 
          status: 'enrolled',
          timestamp: student.enrolledAt ? new Date(student.enrolledAt).getTime() : Date.now(),
        });
      });
    }
  });


  activities = activities.sort((a, b) => b.timestamp - a.timestamp).slice(0, 6);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
      <div className="px-6 py-4 border-b border-gray-200/50 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <FiClock className="mr-2 text-indigo-600" />
          Recent Activities
        </h3>
        <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
          Live Updates
        </span>
      </div>
      <div className="divide-y divide-gray-200/50 min-h-[200px]">
        {isLoading ? (
          <div className="p-4 text-center text-gray-400">Loading...</div>
        ) : activities.length === 0 ? (
          <div className="p-4 text-center text-gray-400">No recent activities found.</div>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="p-4 hover:bg-gray-50/50 transition-colors group">
              <div className="flex items-start">
                <div className="relative mt-1">
                  <div className="p-2 rounded-lg bg-white border border-gray-200 shadow-xs group-hover:shadow-sm transition-shadow">
                    {activity.icon}
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-800">
                      {activity.user} <span className="text-gray-500 font-normal">{activity.action}</span>
                    </p>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{activity.course}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    
    </div>
  );
};

export default RecentActivities;