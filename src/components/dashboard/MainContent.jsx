import StatsCard from './StatsCard';
import {FaMoneyBillWave,FaUsers,FaEnvelopeOpenText,FaShoppingCart,} from 'react-icons/fa';

const MainContent = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      icon: <FaMoneyBillWave className="w-5 h-5 text-indigo-500" />,
      color: 'indigo',
    },
    {
      title: 'Active Users',
      value: '2,453',
      icon: <FaUsers className="w-5 h-5 text-blue-500" />,
      color: 'blue',
    },
    {
      title: 'New Messages',
      value: '12',
      icon: <FaEnvelopeOpenText className="w-5 h-5 text-green-500" />,
      color: 'green',
    },
    {
      title: 'Pending Orders',
      value: '5',
      icon: <FaShoppingCart className="w-5 h-5 text-yellow-500" />,
      color: 'yellow',
    },
  ];

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg mt-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>

        <div className="flex items-center justify-center h-48 mb-4 rounded bg-white border border-gray-200">
          <p className="text-2xl text-gray-400">📈 Main Chart Area</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center justify-center rounded bg-white border border-gray-200 h-48">
            <p className="text-2xl text-gray-400">🕒 Recent Activities</p>
          </div>
          <div className="flex items-center justify-center rounded bg-white border border-gray-200 h-48">
            <p className="text-2xl text-gray-400">🔔 Notifications</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
