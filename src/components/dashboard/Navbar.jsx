import UserDropdown from "./UserDropdown";
import { HiMenu } from "react-icons/hi";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              onClick={toggleSidebar}
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <span className="sr-only">Open sidebar</span>
              <HiMenu className="w-6 h-6" />
            </button>
            <a href="/dashboard" className="flex ms-2 md:me-24">
              <span className="self-center text-xl font-bold sm:text-2xl whitespace-nowrap text-indigo-600">
                E-Learning
              </span>
            </a>
          </div>
          <div className="flex items-center">
            <UserDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
