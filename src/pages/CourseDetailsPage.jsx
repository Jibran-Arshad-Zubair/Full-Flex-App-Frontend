import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
import {FiArrowLeft,FiClock,FiUsers,FiDollarSign,FiBook,FiStar,FiPlay,FiUser,} from "react-icons/fi";
import toast from "react-hot-toast";
import { useGetSingleCourseQuery } from "../Redux/queries/course/courseApi";
import LoadingSpinner from "../components/course/LoadingSpinner";
import StatCard from "../components/course/StatCard";
import SectionCard from "../components/course/SectionCard";
import ReviewCard from "../components/course/ReviewCard";
import { useSelector } from "react-redux";
import defaultLoginProfile from "../assets/loginUserProfile.png";
const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {data: courseData,error, isLoading} = useGetSingleCourseQuery(courseId);
  const [course, setCourse] = useState(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const authUser = useSelector((state) => state.user.authUser);
  
  useEffect(() => {
    if (courseData?.data) {
      setCourse(courseData.data);
    }
  }, [courseData]);

  useEffect(() => {
    if (error) {
      toast.error("Course not found");
      setShouldRedirect(true);
    }
  }, [error]);

  useEffect(() => {
    if (shouldRedirect) {
      navigate("/courses");
    }
  }, [shouldRedirect, navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleWatchVideo = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleBackToCourses = () => {
    navigate("/courses");
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen dark:bg-gray-900">
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={sidebarOpen} />
        <div className={`p-4 mt-10 sm:ml-64 ${sidebarOpen ? "ml-64" : ""}`}>
          <div className="flex justify-center items-center min-h-screen">
            <LoadingSpinner size="large" text="Loading course details..." />
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="bg-gray-50 min-h-screen dark:bg-gray-900">
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={sidebarOpen} />
        <div className={`p-4 mt-10 sm:ml-64 ${sidebarOpen ? "ml-64" : ""}`}>
          <div className="flex justify-center items-center min-h-screen">
            <p className="text-gray-500 dark:text-gray-400">Course not found</p>
          </div>
        </div>
      </div>
    );
  }

  const averageRating = course.ratings?.length
    ? (
        course.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
        course.ratings.length
      ).toFixed(1)
    : null;

  return (
    <div className="bg-gray-50 min-h-screen dark:bg-gray-900">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />

      <div
        className={`p-4 mt-10 sm:ml-64 transition-all duration-200 ${
          sidebarOpen ? "ml-64" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToCourses}
              className="flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors group"
            >
              <FiArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
              Back to Courses
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="relative">
              {course.thumbnail ? (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-72 object-cover"
                />
              ) : (
                <div className="w-full h-72 bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center">
                  <FiBook className="text-white text-8xl opacity-80" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    {course.title}
                  </h1>
                  <p className="text-lg opacity-90 max-w-3xl">
                    {course.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  icon={<FiDollarSign />}
                  label="Price"
                  value={course.price?.toLocaleString("en-PK", {
                    style: "currency",
                    currency: "PKR",
                  })}
                  color="green"
                />
                <StatCard
                  icon={<FiUsers />}
                  label="Students"
                  value={`${course.students?.length || 0} enrolled`}
                  color="blue"
                />
                <StatCard
                  icon={<FiBook />}
                  label="Category"
                  value={
                    course.category?.charAt(0).toUpperCase() +
                    course.category?.slice(1)
                  }
                  color="purple"
                />
                <StatCard
                  icon={<FiStar />}
                  label="Rating"
                  value={averageRating ? `${averageRating}/5` : "No ratings"}
                  color="yellow"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <SectionCard
                title={`Course Videos (${course.videos?.length || 0})`}
                icon={<FiPlay className="text-blue-600" />}
              >
                {course.videos?.length > 0 ? (
                  <div className="space-y-4">
                    {course.videos.map((video, index) => (
                      <VideoCard
                        key={index}
                        video={video}
                        index={index}
                        onWatch={handleWatchVideo}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <FiBook className="mx-auto text-4xl mb-4 opacity-50" />
                    <p>No videos available for this course</p>
                  </div>
                )}
              </SectionCard>
            </div>

            <div className="space-y-6">
              <SectionCard
                title="Instructor"
                icon={<FiUser className="text-blue-600" />}
              >
                <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:shadow-md transition-all duration-300 group">
                  <div className="relative">
                    <img
                      className="w-16 h-16 rounded-full border-4 border-white dark:border-gray-800 shadow-lg group-hover:scale-105 transition-transform duration-300"
                      src={authUser?.user?.profilePhoto || defaultLoginProfile}
                      alt={course.teacher?.fullName || "Instructor"}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultLoginProfile;
                      }}
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                      <FiUser className="text-white text-xs" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900 dark:text-white text-lg">
                      {course.teacher?.fullName || "Unknown Teacher"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {course.teacher?.email}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        <FiBook className="mr-1 w-3 h-3" />
                        Instructor
                      </span>
                    </div>
                  </div>
                </div>
              </SectionCard>

              <SectionCard
                title="Course Details"
                icon={<FiBook className="text-blue-600" />}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Created
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {new Date(course.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Last Updated
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white ">
                      {new Date(course.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Total Videos
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {course.videos?.length || 0}
                    </span>
                  </div>
                </div>
              </SectionCard>

              {course.ratings?.length > 0 && (
                <SectionCard
                  title="Student Reviews"
                  icon={<FiStar className="text-yellow-500" />}
                >
                  <div className="space-y-4">
                    {course.ratings.slice(0, 3).map((rating, index) => (
                      <ReviewCard key={index} rating={rating} />
                    ))}
                  </div>
                </SectionCard>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
