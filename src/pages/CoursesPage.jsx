import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
import CoursesTable from "../components/course/CourseTable";
import { FiBookOpen } from "react-icons/fi";
import CreateCourseModal from "../components/course/CreateEditCourseModal";
import Button from "../components/ui/Button";

const CoursesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Advanced React with Hooks",

      category: "Web Development",
      price: 2999,
      students: 45,
      createdAt: "2025-08-10",
    },
    {
      id: 2,
      title: "Node.js Fundamentals",

      category: "Backend",
      price: 2499,
      students: 32,
      createdAt: "2025-07-15",
    },
    {
      id: 3,
      title: "UI/UX Design Principles",

      category: "Design",
      price: 1999,
      students: 28,
      createdAt: "2025-08-05",
    },
    {
      id: 4,
      title: "Python for Data Science",

      category: "Data Science",
      price: 3499,
      students: 56,
      createdAt: "2025-07-22",
    },
  ]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Handle form submission (upload thumbnail, create course, etc.)
      console.log("Form values:", values);
      // Add your API call here
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating course:", error);
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
      setCourses(courses.filter((course) => course.id !== courseId));
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
          <div className="flex flex-col md:flex-row justify-between mt-8 items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Course Management
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Manage all your courses in one place.
              </p>
            </div>
            <Button onClick={() => setIsModalOpen(true)}>Create Course</Button>
          </div>

          {courses.length > 0 ? (
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
