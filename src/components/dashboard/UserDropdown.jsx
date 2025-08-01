import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center ms-3">
      <div>
        <button
          type="button"
          className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
          aria-expanded="false"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="w-8 h-8 rounded-full"
            src="https://avatar.iran.liara.run/public/boy"
            alt="user photo"
          />
        </button>
      </div>
      <div
        className={`z-50 absolute right-2 top-14 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-md ${
          isOpen ? 'block' : 'hidden'
        }`}
        id="dropdown-user"
      >
        <div className="px-4 py-3" role="none">
          <p className="text-sm text-gray-900" role="none">
            John Doe
          </p>
          <p className="text-sm font-medium text-gray-900 truncate" role="none">
            john.doe@example.com
          </p>
        </div>
        <ul className="py-1" role="none">
          <li>
            <Link
              to="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
              role="menuitem"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
              role="menuitem"
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              to="/logout"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
              role="menuitem"
            >
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDropdown;