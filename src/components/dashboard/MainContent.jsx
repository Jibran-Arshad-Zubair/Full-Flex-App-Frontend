import { useSelector } from 'react-redux';
import DashboardChart from './DashboardGraph';
import NotificationsPanel from './Notifications';
import RecentActivities from './RecentActivities';
import StatsCard from './StatsCard';
import {  FaUserGraduate, FaHourglassHalf, FaCheckCircle, FaBook  } from 'react-icons/fa';
import { useGetAllCoursesQuery } from '../../Redux/queries/course/courseApi';

const MainContent = () => {
const {
  data: allCourses,
} = useGetAllCoursesQuery(undefined, {
  refetchOnMountOrArgChange: true,  
});

const authUser = useSelector((state) => state.user.authUser);
const userId = authUser?.user?._id;

const myCourses = allCourses?.data?.filter(
  (course) => course.teacher._id === userId
) || [];

const totalCourses = myCourses.length;

const activeCourses = myCourses.filter(c => c.status === "active").length;
// const inactiveCourses = myCourses.filter(c => c.status === "inactive").length;
const pendingCourses = myCourses.filter(c => c.status === "pending").length;
const enrolledStudents = myCourses.reduce(
  (acc, course) => acc + (course.students?.length || 0),
  0
);
  const stats = [
  {
    title: 'Total Courses',
    value: totalCourses,
    icon: <FaBook className="w-5 h-5 text-indigo-500" />, 
    color: 'indigo',
  },
  {
    title: 'Enrolled Students',
    value: enrolledStudents,
    icon: <FaUserGraduate className="w-5 h-5 text-blue-500" />, 
    color: 'blue',
  },
  {
    title: 'Pending Courses',
    value: pendingCourses,
    icon: <FaHourglassHalf className="w-5 h-5 text-green-500" />, 
    color: 'green',
  },
  {
    title: 'Active Courses',
    value: activeCourses,
    icon: <FaCheckCircle className="w-5 h-5 text-yellow-500" />, 
    color: 'yellow',
  },
];

  return (
    <div className="p-4 sm:ml-64">
  
      <div className="p-6 border-2 border-gray-200 border-dashed rounded-2xl mt-20 bg-gray-50/50">
      
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              trend={stat.trend}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-full">
            <RecentActivities />
          </div>
          <div className="h-full">
            <NotificationsPanel />
          </div>
        </div>
         <div className="mb-4 mt-8">
          <DashboardChart />
        </div>
      </div>
    </div>
  );
};

export default MainContent;