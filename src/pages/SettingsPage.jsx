import React, { useState } from "react";
import { Formik, Form } from "formik";
import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
import InputField from "../components/ui/InputField";
import SelectField from "../components/ui/SelectField";
import Button from "../components/ui/Button";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiEdit2,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import defaultLoginProfile from "../assets/loginUserProfile.png";
import { useResetPasswordMutation, useUpdateUserMutation } from "../Redux/queries/user/authApi";
import toast from "react-hot-toast";

const SettingsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const authUser = useSelector((state) => state.user.authUser);
 const [updateUser] = useUpdateUserMutation();
  const [resetPassword] = useResetPasswordMutation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const profileInitialValues = {
    fullName: authUser?.user?.fullName || "",
    userName: authUser?.user?.userName || "",
    email: authUser?.user?.email || "",
    phoneNumber: authUser?.user?.phoneNumber || "",
    gender: authUser?.user?.gender || "male",

  };

  const passwordInitialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleProfileSubmit = async (values, { setSubmitting }) => {
    try {
     const res = await updateUser({
        _id: authUser?.user?._id,
        fullName: values.fullName,
        userName: values.userName,
        phoneNumber: values.phoneNumber,
        gender: values.gender,
        // profilePhoto: authUser?.user?.profilePhoto,
      }).unwrap();
      console.log("Profile updated", res);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error while updating profile", error);
      toast.error(error?.data?.message || "Failed to update profile");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (values, { setSubmitting, resetForm }) => {
    if (values.newPassword !== values.confirmPassword) {
      toast.error("New password and confirm password do not match");
      setSubmitting(false);
      return;
    }

    try {
      await resetPassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      }).unwrap();

      toast.success("Password reset successfully!");
      resetForm();
    } catch (err) {
      console.error("Error while resetting password", err);
      toast.error(err?.data?.message || "Failed to reset password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen dark:bg-gray-900">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />

      <div
        className={`p-4 mt-10 sm:ml-64 transition-all duration-200 ${
          sidebarOpen ? "ml-64" : ""
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 mt-10">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Account Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your profile and security settings
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md mb-8">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === "profile"
                    ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                Edit Profile
              </button>
              <button
                onClick={() => setActiveTab("password")}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === "password"
                    ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                Change Password
              </button>
            </div>

            <div className="p-6">
              {activeTab === "profile" ? (
                <EditProfileTab
                  initialValues={profileInitialValues}
                  onSubmit={handleProfileSubmit}
                  authUser={authUser}
                />
              ) : (
                <ChangePasswordTab
                  initialValues={passwordInitialValues}
                  onSubmit={handlePasswordSubmit}
                  showOldPassword={showOldPassword}
                  setShowOldPassword={setShowOldPassword}
                  showNewPassword={showNewPassword}
                  setShowNewPassword={setShowNewPassword}
                  showConfirmPassword={showConfirmPassword}
                  setShowConfirmPassword={setShowConfirmPassword}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EditProfileTab = ({ initialValues, onSubmit, authUser }) => (
  <div className="flex flex-col lg:flex-row gap-8">
    <div className="w-full lg:w-1/3 flex flex-col items-center">
      <div className="relative group mb-4">
        <img
          className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-gray-800 shadow-lg object-cover"
          src={authUser?.user?.profilePhoto || defaultLoginProfile}
          alt="Profile"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultLoginProfile;
          }}
        />
        <label className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors shadow-md">
          <FiEdit2 className="w-4 h-4 md:w-5 md:h-5" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={() => {}}
          />
        </label>
      </div>

      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {authUser?.user?.fullName}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-2">
          @{authUser?.user?.userName}
        </p>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            authUser?.user?.status === "active"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
          }`}
        >
          {authUser?.user?.status === "active" ? "Active" : "Inactive"}
        </span>
      </div>
    </div>

    <div className="w-full lg:w-2/3">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Full Name"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                icon={<FiUser className="text-gray-400" />}
              />
              <InputField
                label="Username"
                name="userName"
                type="text"
                placeholder="Enter your username"
                icon={<FiUser className="text-gray-400" />}
              />
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                icon={<FiMail className="text-gray-400" />}
                disabled
              />
              <InputField
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                placeholder="Enter your phone number"
                icon={<FiPhone className="text-gray-400" />}
              />
              <SelectField
                label="Gender"
                name="gender"
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "other", label: "Other" },
                ]}
                icon={<FiUser className="text-gray-400" />}
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 px-8 py-3"
              >
                {isSubmitting ? "Updating..." : "Update Profile"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  </div>
);

const ChangePasswordTab = ({
  initialValues,
  onSubmit,
  showOldPassword,
  setShowOldPassword,
  showNewPassword,
  setShowNewPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}) => (
  <div className="max-w-md mx-auto">
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <InputField
            label="Old Password"
            name="oldPassword"
            type={showOldPassword ? "text" : "password"}
            placeholder="Enter your current password"
            icon={<FiLock className="text-gray-400" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="text-gray-400 hover:text-gray-600"
              >
                {showOldPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            }
          />

          <InputField
            label="New Password"
            name="newPassword"
            type={showNewPassword ? "text" : "password"}
            placeholder="Enter your new password"
            icon={<FiLock className="text-gray-400" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            }
          />

          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your new password"
            icon={<FiLock className="text-gray-400" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            }
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3"
            >
              {isSubmitting ? "Changing..." : "Change Password"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  </div>
);

export default SettingsPage;
