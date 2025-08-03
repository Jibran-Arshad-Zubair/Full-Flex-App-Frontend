import { Link } from 'react-router-dom';
import { HiOutlineViewGrid, HiOutlineChatAlt2, HiOutlineUserGroup, HiOutlineCreditCard } from 'react-icons/hi';

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    {
      name: 'Dashboard',
      icon: <HiOutlineViewGrid className="w-5 h-5 text-gray-500 group-hover:text-indigo-600 " />,
      path: '/dashboard',
    },
    {
      name: 'Chat',
      icon: <HiOutlineChatAlt2 className="w-5 h-5 text-gray-500 group-hover:text-indigo-600" />,
      path: '/chat',
      badge: 3,
    },
    {
      name: 'Users',
      icon: <HiOutlineUserGroup className="w-5 h-5 text-gray-500 group-hover:text-indigo-600" />,
      path: '/users',
    },
    {
      name: 'Payments',
      icon: <HiOutlineCreditCard className="w-5 h-5 text-gray-500 group-hover:text-indigo-600" />,
      path: '/payments',
    },
  ];

  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } sm:translate-x-0`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
        <ul className="space-y-2 font-medium">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-indigo-50 group border-b-2"
              >
                {item.icon}
                <span className="ms-3">{item.name}</span>
                {item.badge && (
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
