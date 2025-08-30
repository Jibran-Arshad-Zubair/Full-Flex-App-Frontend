import React from 'react'; 
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineViewGrid, HiOutlineChatAlt2, HiOutlineUserGroup, HiOutlineCreditCard } from 'react-icons/hi';
import { FaBookOpen } from 'react-icons/fa';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  
  const menuItems = [
    {
      name: 'Dashboard',
      icon: <HiOutlineViewGrid className="w-5 h-5" />,
      path: '/dashboard',
      gradient: 'from-blue-400 to-blue-500'
    },
    {
      name: 'Chat',
      icon: <HiOutlineChatAlt2 className="w-5 h-5" />,
      path: '/chat',
      badge: 3,
      gradient: 'from-blue-400 to-blue-500'
    },
    {
      name: 'Courses',
      icon: <FaBookOpen className="w-5 h-5" />,
      path: '/course',
      gradient: 'from-blue-400 to-blue-500'
    },
    {
      name: 'Payments',
      icon: <HiOutlineCreditCard className="w-5 h-5" />,
      path: '/payments',
      gradient: 'from-blue-400 to-blue-500'
    },
  ];

  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-all duration-300 ease-in-out bg-gradient-to-b from-slate-50 via-white to-slate-50 border-r border-slate-200/60 shadow-xl ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } sm:translate-x-0`}
      aria-label="Sidebar"
    >
    
      <div className="h-full px-4 pb-4 overflow-y-auto">
        <nav className="space-y-2 mt-4">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`group relative flex items-center p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${
                  isActive
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-purple-500/25`
                    : 'text-slate-700 hover:bg-gradient-to-r hover:from-slate-50 hover:to-purple-50 hover:text-slate-900'
                }`}
              >
             
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-white/20 backdrop-blur-sm' 
                    : `bg-gradient-to-br ${item.gradient} text-white group-hover:scale-110 shadow-md`
                }`}>
                  {React.cloneElement(item.icon, {
                    className: `w-5 h-5 ${isActive ? 'text-white' : 'text-white'}`
                  })}
                </div>

             
                <span className="ml-3 font-medium text-sm tracking-wide">
                  {item.name}
                </span>

              
                {item.badge && (
                  <span className={`ml-auto inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 text-xs font-bold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-white/20 text-white backdrop-blur-sm'
                      : 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-sm animate-pulse'
                  }`}>
                    {item.badge}
                  </span>
                )}

          
                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full shadow-sm"></div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;