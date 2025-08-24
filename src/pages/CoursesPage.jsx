import { useEffect, useState } from "react";
import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
import CoursesTable from "../components/course/CourseTable";
import { FiBookOpen } from "react-icons/fi";
import CreateCourseModal from "../components/course/CreateEditCourseModal";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/course/LoadingSpinner";
import {useCreateCourseMutation,useDeleteCourseMutation,useGetAllCoursesQuery,useUpdateCourseMutation,} from "../Redux/queries/course/courseApi";
import toast from "react-hot-toast";
import ConfirmationModal from "../components/ui/ConfirmationModal";

const CoursesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [createCourse] = useCreateCourseMutation();
  const [deleteCourse] = useDeleteCourseMutation();
  const [isDeleting, setIsDeleting] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();
  const {data: allCourses,error,isLoading} = useGetAllCoursesQuery(undefined, { refetchOnMountOrArgChange: true});
  useEffect(() => {
    if (allCourses?.data) {
      setCourses(allCourses.data);
    }
  }, [allCourses]);

  const [updateCourse] = useUpdateCourseMutation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleCreateSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("price", values.price);
      if (values.category) {
        formData.append("category", values.category);
      }

      formData.append("thumbnail", values.thumbnail);

      formData.append("videos", JSON.stringify(values.videos));

      const res = await createCourse(formData).unwrap();
      setCourses((prev) => [...prev, res?.course || res?.data?.course]);
      toast.success("Course created successfully");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Failed to create course");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("price", values.price);
      if (values.category) {
        formData.append("category", values.category);
      }
      if (values.thumbnail) {
        formData.append("thumbnail", values.thumbnail);
      }
      formData.append("videos", JSON.stringify(values.videos));

      const res = await updateCourse({
        id: selectedCourse._id,
        data: formData,
      }).unwrap();

      setCourses((prev) =>
        prev.map((course) =>
          course._id === selectedCourse._id
            ? res?.course || res?.data?.course
            : course
        )
      );
      toast.success("Course updated successfully");
      setIsModalOpen(false);
      setSelectedCourse(null);
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Failed to update course");
    } finally {
      setSubmitting(false);
    }
  };

  const handleView = (courseId) => {
    navigate(`/course-details/${courseId}`);
  };

  const handleEdit = (courseId) => {
    const course = courses.find((c) => c._id === courseId);
    setSelectedCourse(course);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setSelectedCourse(null);
    setModalMode("create");
    setIsModalOpen(true);
  };

  const handleDeleteClick = (courseId) => {
    const course = courses.find((c) => c._id === courseId);
    setCourseToDelete(course);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!courseToDelete) return;

    setIsDeleting(true);
    try {
      await deleteCourse(courseToDelete._id).unwrap();
      setCourses((prev) =>
        prev.filter((course) => course._id !== courseToDelete._id)
      );
      toast.success("Course deleted successfully");
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Failed to delete course");
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setCourseToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setCourseToDelete(null);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

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
                onClick={openCreateModal}
                className="px-5 py-2.5 text-sm sm:text-base rounded-lg shadow-md bg-blue-600 hover:bg-blue-700 text-white transition-all"
              >
                Create Course
              </Button>
            </div>
          </div>

          {isLoading ? (
            <LoadingSpinner
              size="large"
              className="mt-8"
              text="Loading courses..."
            />
          ) : error ? (
            <p className="text-center mt-6 text-red-500">
              Failed to load courses
            </p>
          ) : courses.length > 0 ? (
            <CoursesTable
              courses={courses}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
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
        onSubmit={modalMode === "edit" ? handleUpdateSubmit : handleCreateSubmit}
        mode={modalMode}
        course={selectedCourse}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Course"
        message={`Are you sure you want to delete "${courseToDelete?.title}"? This action cannot be undone and all course data will be permanently removed.`}
        confirmText="Delete Course"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default CoursesPage;
