import { useEffect, useState } from "react";
import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
import CoursesTable from "../components/course/CourseTable";
import { FiBookOpen } from "react-icons/fi";
import CreateCourseModal from "../components/course/CreateEditCourseModal";
import Button from "../components/ui/Button";
import {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
} from "../Redux/queries/course/courseApi";
import toast from "react-hot-toast";

const CoursesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [createCourse] = useCreateCourseMutation();

  const { data: allCourses, error, isLoading } = useGetAllCoursesQuery();
  useEffect(() => {
    if (allCourses?.data) {
      setCourses(allCourses.data);
    }
  }, [allCourses]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("price", values.price);
      if (values.category) {
        formData.append("category", values.category);
      }

      formData.append("thumbnail", values.thumbnail);

      values.videos.forEach((video, index) => {
        formData.append(`videos[${index}][title]`, video.title);
        formData.append(`videos[${index}][url]`, video.url);
      });

      const res = await createCourse(formData).unwrap();
      setCourses((prev) => [...prev, res?.course || res?.data?.course]);
      toast.success("Course created successfully");
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Failed to create course");
    } finally {
      setSubmitting(false);
    }
  };

  const handleView = (courseId) => {
    console.log("View course:", courseId);
  };

  const handleEdit = (courseId) => {
    console.log("Edit course:", courseId);
  };

  const handleDelete = (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((course) => course._id !== courseId));
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
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-8 border-b border-gray-300 dark:border-gray-700 pb-6">
            <div className="text-center md:text-left">
              <h1 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">
                Course Management
              </h1>
              <p className="mt-2 text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto md:mx-0">
                Manage all your courses in one place.
              </p>
            </div>

            <div className="flex justify-center md:justify-end">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-2.5 text-sm sm:text-base rounded-lg shadow-md bg-blue-600 hover:bg-blue-700 text-white transition-all"
              >
                Create Course
              </Button>
            </div>
          </div>

          {isLoading ? (
            <p className="text-center mt-6">Loading courses...</p>
          ) : error ? (
            <p className="text-center mt-6 text-red-500">
              Failed to load courses
            </p>
          ) : courses.length > 0 ? (
            <CoursesTable
              courses={courses}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <FiBookOpen className="mx-auto text-4xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                No courses yet
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Get started by creating a new course.
              </p>
            </div>
          )}
        </div>
      </div>
      <CreateCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CoursesPage;
