import UserDropdown from "./UserDropdown";
import { HiMenu } from "react-icons/hi";
import Logo from "../../assets/e-learning-logo.png";

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
            <a href="/dashboard" className="flex ms-2 md:me-24 items-center">
              <img
                src={Logo}
                alt="E-Learning Logo"
                className="h-12 w-12 object-contain rounded-lg"
              />

              <span className="sr-only">E-Learning Platform</span>
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
