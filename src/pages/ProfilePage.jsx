import React, { useState } from "react";
import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
import { FiUser, FiMail, FiPhone } from "react-icons/fi";
import defaultLoginProfile from "../assets/loginUserProfile.png";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const authUser = useSelector((state) => state.user.authUser);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />

      <div className={`p-4 mt-10 sm:ml-64 transition-all duration-200 ${sidebarOpen ? "ml-64" : ""}`}>
        <div className="p-4 md:p-6 border-2 border-gray-200 dark:border-gray-700 border-dashed rounded-2xl mt-14 bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex flex-col mb-6 sm:ml-6 md:ml-24 lg:ml-14">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 text-center sm:text-left">
              Personal Information
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/3 flex flex-col items-center">
              <div className="relative group mb-4">
                <img
                  className="w-40 h-40 rounded-full border-4 border-white dark:border-gray-700 shadow-lg object-cover transition-all duration-300 group-hover:shadow-xl"
                  src={authUser?.user?.profilePhoto || defaultLoginProfile}
                  alt="Profile"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultLoginProfile;
                  }}
                />
              </div>

              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{authUser?.user?.fullName}</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-2">@{authUser?.user?.userName}</p>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    authUser?.user?.status === "active"
                      ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                  }`}
                >
                  {authUser?.user?.status === "active" ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            <div className="w-full lg:w-2/3">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Personal Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      label: "Full Name",
                      iconBg: "bg-blue-100 dark:bg-blue-900/30",
                      iconColor: "text-blue-500 dark:text-blue-300",
                      value: authUser?.user?.fullName || "Not provided",
                    },
                    {
                      label: "Username",
                      iconBg: "bg-purple-100 dark:bg-purple-900/30",
                      iconColor: "text-purple-500 dark:text-purple-300",
                      value: authUser?.user?.userName || "Not provided",
                    },
                    {
                      label: "Email",
                      iconBg: "bg-red-100 dark:bg-red-900/30",
                      iconColor: "text-red-500 dark:text-red-300",
                      value: authUser?.user?.email?.toLowerCase() || "Not provided",
                    },
                    {
                      label: "Phone Number",
                      iconBg: "bg-green-100 dark:bg-green-900/30",
                      iconColor: "text-green-500 dark:text-green-300",
                      value: authUser?.user?.phoneNumber || "Not provided",
                    },
                    {
                      label: "Gender",
                      iconBg: "bg-pink-100 dark:bg-pink-900/30",
                      iconColor: "text-pink-500 dark:text-pink-300",
                      value: authUser?.user?.gender || "Not specified",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <div className="flex items-center text-gray-500 dark:text-gray-300 mb-2">
                        <div className={`${item.iconBg} p-2 rounded-full mr-3`}>
                          {item.label === "Email" && (
                            <FiMail
                              className={item.iconColor}
                              size={16}
                            />
                          )}
                          {item.label === "Phone Number" && (
                            <FiPhone
                              className={item.iconColor}
                              size={16}
                            />
                          )}
                          {item.label === "Full Name" || item.label === "Username" || item.label === "Gender" ? (
                            <FiUser
                              className={item.iconColor}
                              size={16}
                            />
                          ) : null}
                        </div>
                        <span className="font-medium text-sm">{item.label}</span>
                      </div>
                      <p
                        className={`text-gray-800 dark:text-gray-100 font-medium pl-11 truncate ${
                          item.label !== "Email" ? "capitalize" : ""
                        }`}
                      >
                        {item.label === "Email" ? item.value.toLowerCase() : item.value}
                      </p>
                    </div>
                  ))}
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
