import React, { useState } from "react";
import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
import { FiUser, FiMail, FiPhone, FiEdit2 } from "react-icons/fi";
import defaultLoginProfile from "../assets/loginUserProfile.png";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const authUser = useSelector((state) => state.user.authUser);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />

      <div
        className={`p-4 mt-10 sm:ml-64 transition-all duration-200 ${
          sidebarOpen ? "ml-64" : ""
        }`}
      >
        <div className="p-4 md:p-6 border-2 border-gray-200 border-dashed rounded-2xl mt-14 bg-white shadow-sm">
          <div className="flex flex-col mb-6 sm:ml-6 md:ml-24 lg:ml-14">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center sm:text-left">
              Personal Information
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/3 flex flex-col items-center">
              <div className="relative group mb-4">
                <img
                  className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover transition-all duration-300 group-hover:shadow-xl"
                  src={authUser?.user?.profilePhoto || defaultLoginProfile}
                  alt="Profile"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultLoginProfile;
                  }}
                />
              </div>

              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  {authUser?.user?.fullName}
                </h2>
                <p className="text-gray-500 mb-2">
                  @{authUser?.user?.userName}
                </p>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    authUser?.user?.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {authUser?.user?.status === "active" ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Personal Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg transition-colors hover:bg-gray-100">
                    <div className="flex items-center text-gray-500 mb-2">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <FiUser className="text-blue-500" size={16} />
                      </div>
                      <span className="font-medium text-sm">Full Name</span>
                    </div>
                    <p className="text-gray-800 font-medium pl-11">
                      {authUser?.user?.fullName}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg transition-colors hover:bg-gray-100">
                    <div className="flex items-center text-gray-500 mb-2">
                      <div className="bg-purple-100 p-2 rounded-full mr-3">
                        <FiUser className="text-purple-500" size={16} />
                      </div>
                      <span className="font-medium text-sm">Username</span>
                    </div>
                    <p className="text-gray-800 font-medium pl-11">
                      {authUser?.user?.userName}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg transition-colors hover:bg-gray-100">
                    <div className="flex items-center text-gray-500 mb-2">
                      <div className="bg-red-100 p-2 rounded-full mr-3">
                        <FiMail className="text-red-500" size={16} />
                      </div>
                      <span className="font-medium text-sm">Email</span>
                    </div>
                    <p
                      className="text-gray-800 font-medium pl-11 break-words sm:truncate"
                      title={authUser?.user?.email}
                    >
                      {authUser?.user?.email}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg transition-colors hover:bg-gray-100">
                    <div className="flex items-center text-gray-500 mb-2">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <FiPhone className="text-green-500" size={16} />
                      </div>
                      <span className="font-medium text-sm">Phone Number</span>
                    </div>
                    <p className="text-gray-800 font-medium pl-11">
                      {authUser?.user?.phoneNumber || (
                        <span className="text-gray-400">Not provided</span>
                      )}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg transition-colors hover:bg-gray-100">
                    <div className="flex items-center text-gray-500 mb-2">
                      <div className="bg-pink-100 p-2 rounded-full mr-3">
                        <FiUser className="text-pink-500" size={16} />
                      </div>
                      <span className="font-medium text-sm">Gender</span>
                    </div>
                    <p className="text-gray-800 font-medium pl-11 capitalize">
                      {authUser?.user?.gender || (
                        <span className="text-gray-400">Not specified</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
