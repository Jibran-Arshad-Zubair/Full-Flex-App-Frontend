import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import InputField from '../components/ui/InputField';
import SelectField from '../components/ui/SelectField';
import Button from '../components/ui/Button';
import { FiUser, FiMail, FiPhone, FiEdit2, FiSave, FiLock } from 'react-icons/fi';
import defaultLoginProfile from '../assets/loginUserProfile.png';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const authUser = useSelector((state) => state.user.authUser);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const initialValues = {
    fullName: authUser?.user?.fullName || '',
    userName: authUser?.user?.userName || '',
    email: authUser?.user?.email || '',
    phoneNumber: authUser?.user?.phoneNumber || '',
    gender: authUser?.user?.gender || 'male',
    status: authUser?.user?.status || 'active',
  };

  const handleSubmit = (values) => {
    console.log('Profile updated:', values);
    setIsEditing(false);
   
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      

      <div className={`p-4 mt-10 sm:ml-64 transition-all duration-200 ${sidebarOpen ? 'ml-64' : ''}`}>
        <div className="p-6 border-2 border-gray-200 border-dashed rounded-2xl mt-14 bg-white">
        
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>
            <p className="text-gray-600">Manage your personal information</p>
          </div>

         
          <div className="flex flex-col lg:flex-row gap-8">
          
            <div className="w-full lg:w-1/3 flex flex-col items-center">
              <div className="relative group mb-4">
                <img
                  className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
                  src={profileImage || authUser?.user?.profilePhoto || defaultLoginProfile}
                  alt="Profile"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultLoginProfile;
                  }}
                />
                {isEditing && (
                  <label className="absolute bottom-2 right-2 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-colors shadow-md">
                    <FiEdit2 className="w-5 h-5" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
              
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800">{authUser?.user?.fullName}</h2>
                <p className="text-gray-500 mb-2">@{authUser?.user?.userName}</p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  authUser?.user?.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {authUser?.user?.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

        
            <div className="w-full lg:w-2/3">
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                  <Form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField
                        label="Full Name"
                        name="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        icon={<FiUser className="text-gray-400" />}
                        disabled={!isEditing}
                      />
                      <InputField
                        label="Username"
                        name="userName"
                        type="text"
                        placeholder="Enter your username"
                        icon={<FiUser className="text-gray-400" />}
                        disabled={!isEditing}
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
                        disabled={!isEditing}
                      />
                      <SelectField
                        label="Gender"
                        name="gender"
                        options={[
                          { value: 'male', label: 'Male' },
                          { value: 'female', label: 'Female' },
                        ]}
                        icon={<FiUser className="text-gray-400" />}
                        disabled={!isEditing}
                      />
                    </div>

                  
                    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
                      {!isEditing ? (
                        <>
                          <Button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700"
                          >
                            <FiEdit2 className="w-4 h-4" />
                            Edit Profile
                          </Button>
                          <Button
                            type="button"
                            className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700"
                          >
                            <FiLock className="w-4 h-4" />
                            Change Password
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            type="button"
                            onClick={() => {
                              setIsEditing(false);
                              setProfileImage(null);
                            }}
                            className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700"
                            disabled={isSubmitting}
                          >
                            <FiSave className="w-4 h-4" />
                            Save Changes
                          </Button>
                        </>
                      )}
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;