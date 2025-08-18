import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";

const CoursesTable = ({ courses, onView, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">Title</th>

              <th className="py-3 px-4 text-left hidden md:table-cell">
                Category
              </th>
              <th className="py-3 px-4 text-right">Price</th>
              <th className="py-3 px-4 text-right ">Students</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {courses.map((course) => (
              <tr
                key={course.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="py-4 px-4">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {course.title}
                  </div>
                </td>

                <td className="py-4 px-4 hidden md:table-cell">
                  <span className="px-2 py-1 text-sm font-semibold  text-blue-800 ">
                    {course.category}
                  </span>
                </td>
                <td className="py-4 px-4 text-right font-medium">
                  ${course.price.toLocaleString()}
                </td>
                <td className="py-4 px-4 text-right ">{course.students}</td>
                <td className="py-4 px-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => onView(course.id)}
                      className="btn btn-ghost btn-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      aria-label="View"
                    >
                      <FiEye className="text-lg" />
                    </button>
                    <button
                      onClick={() => onEdit(course.id)}
                      className="btn btn-ghost btn-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                      aria-label="Edit"
                    >
                      <FiEdit2 className="text-lg" />
                    </button>
                    <button
                      onClick={() => onDelete(course.id)}
                      className="btn btn-ghost btn-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      aria-label="Delete"
                    >
                      <FiTrash2 className="text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursesTable;
