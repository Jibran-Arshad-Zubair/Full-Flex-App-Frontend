import DashboardChart from './DashboardGraph';
import NotificationsPanel from './Notifications';
import RecentActivities from './RecentActivities';
import StatsCard from './StatsCard';
import { FaMoneyBillWave, FaUsers, FaEnvelopeOpenText,FaBookOpen  } from 'react-icons/fa';

const MainContent = () => {
  const stats = [
  {
    title: 'Total Earnings',
    value: '$45,231',
    icon: <FaMoneyBillWave className="w-5 h-5 text-indigo-500" />,
    color: 'indigo',
  },
  {
    title: 'Enrolled Students',
    value: '2,453',
    icon: <FaUsers className="w-5 h-5 text-blue-500" />,
    color: 'blue',
  },
  {
    title: 'Unread Messages',
    value: '12',
    icon: <FaEnvelopeOpenText className="w-5 h-5 text-green-500" />,
    color: 'green',
  },
  {
    title: 'Active Courses',
    value: '5',
    icon: <FaBookOpen className="w-5 h-5 text-yellow-500" />,
    color: 'yellow',
  },
];


  return (
    <div className="p-4 sm:ml-64">
  
      <div className="p-6 border-2 border-gray-200 border-dashed rounded-2xl mt-14 bg-gray-50/50">
      
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

        <div className="mb-8">
          <DashboardChart />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-full">
            <RecentActivities />
          </div>
          <div className="h-full">
            <NotificationsPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;