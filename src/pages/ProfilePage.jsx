import React, { useState } from "react";
import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
import { FiUser, FiMail, FiPhone } from "react-icons/fi";
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
        <div className="p-6 border-2 border-gray-200 border-dashed rounded-2xl mt-14 bg-white">
          <div className="flex flex-col mb-8 sm:ml-6 md:ml-24 lg:ml-14">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center sm:text-left">
              Personal Information
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/3 flex flex-col items-center">
              <div className="relative group mb-4">
                <img
                  className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
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
              <div className="bg-white rounded-lg shadow p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <FiUser className="mr-2" />
                      <span className="font-medium">Full Name:</span>
                    </div>
                    <p className="text-gray-800">{authUser?.user?.fullName}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <FiUser className="mr-2" />
                      <span className="font-medium">Username:</span>
                    </div>
                    <p className="text-gray-800">{authUser?.user?.userName}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <FiMail className="mr-2" />
                      <span className="font-medium">Email:</span>
                    </div>
                    <p className="text-gray-800">{authUser?.user?.email}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <FiPhone className="mr-2" />
                      <span className="font-medium">Phone Number:</span>
                    </div>
                    <p className="text-gray-800">
                      {authUser?.user?.phoneNumber || "Not provided"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <FiUser className="mr-2" />
                      <span className="font-medium">Gender:</span>
                    </div>
                    <p className="text-gray-800 capitalize">
                      {authUser?.user?.gender || "Not specified"}
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
