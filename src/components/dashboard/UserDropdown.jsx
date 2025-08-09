import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiUser, FiSettings, FiLogOut, FiChevronDown } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import defaultLoginProfile from "../../assets/loginUserProfile.png";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "../../Redux/reduxSlices/userSlice";

const UserDropdown = () => {
  const authUser = useSelector((state) => state.user.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleLogout = () => {
  
  dispatch(setAuthUser(null));
  
  localStorage.removeItem("token");

  navigate("/");
};
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center space-x-2 focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="relative">
          <img
            className="w-9 h-9 rounded-full border-2 border-white shadow-sm group-hover:border-indigo-100 transition-colors"
            src={authUser?.user?.profilePhoto || defaultLoginProfile}
            alt="User profile"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultLoginProfile;
            }}
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
        </div>
        <div className="hidden md:flex flex-col items-start">
          <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
            {authUser?.user?.userName}
          </span>
        </div>
        <FiChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50 transition-all duration-200 ease-out ${
          isOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-2 invisible"
        }`}
      >
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-medium text-gray-900 truncate">
            {authUser?.user?.fullName}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {authUser?.user?.email}
          </p>
        </div>
        <div className="py-1">
          <Link
            to="/profile"
            className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <FiUser className="mr-3 w-4 h-4 text-indigo-500" />
            Profile
          </Link>
          <Link
            to="/settings"
            className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <FiSettings className="mr-3 w-4 h-4 text-indigo-500" />
            Settings
          </Link>
        </div>
        <div className="py-1 border-t border-gray-100">
          <button
            className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
          >
            <FiLogOut className="mr-3 w-4 h-4 text-indigo-500" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
