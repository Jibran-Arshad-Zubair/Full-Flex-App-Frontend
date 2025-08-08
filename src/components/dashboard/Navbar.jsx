import UserDropdown from "./UserDropdown";
import { HiMenu } from "react-icons/hi";
import Logo from "../../assets/e-learning-logo.png";
import { FiSearch } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="px-4 py-3 lg:px-6 lg:pl-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start space-x-4">
            <button
              onClick={toggleSidebar}
              className="inline-flex items-center p-2 rounded-lg sm:hidden text-gray-600 hover:bg-indigo-50 focus:outline-none transition-colors duration-200"
            >
              <span className="sr-only">Open sidebar</span>
              <HiMenu className="w-6 h-6" />
            </button>
            <a href="/dashboard" className="flex ms-2 md:me-24 items-center group">
              <div className="relative p-1.5 bg-gradient-to-br from-green-400 to-blue-400 rounded-xl shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-105">
                <img
                  src={Logo}
                  alt="E-Learning Logo"
                  className="h-10 w-10 object-contain rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="ml-3 hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  EduPlatform
                </h1>
                <p className="text-xs text-blue-600/70">Learning Hub</p>
              </div>
            </a>
          </div>
          
          <div className="flex-1 max-w-xl mx-4 hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5"
                placeholder="Search..."
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-600 hover:bg-indigo-50 relative">
              <IoMdNotificationsOutline className="w-6 h-6" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <UserDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;