import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";

const CoursesTable = ({ courses, onView, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 hidden md:table-cell">
                Category
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                Price
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                Students
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {courses.map((course) => (
              <tr
                key={course._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
              
                <td className="px-6 py-4 align-middle">
                  <div className="font-medium text-gray-900 dark:text-white capitalize">
                    {course.title}
                  </div>
                </td>

          
                <td className="px-6 py-4 align-middle hidden md:table-cell">
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 capitalize">
                    {course.category || "N/A"}
                  </span>
                </td>

               
                <td className="px-6 py-4 align-middle text-right font-semibold text-gray-800 dark:text-gray-200">
                  {course.price?.toLocaleString("ur-PK", {
                    style: "currency",
                    currency: "PKR",
                  })}
                </td>

             
                <td className="px-6 py-4 align-middle text-right text-gray-600 dark:text-gray-300">
                  {course.students?.length || 0}
                </td>

           
                <td className="px-6 py-4 align-middle">
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={() => onView(course._id)}
                      className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-400"
                      aria-label="View"
                    >
                      <FiEye className="text-lg" />
                    </button>
                    <button
                      onClick={() => onEdit(course._id)}
                      className="p-2 rounded-full hover:bg-green-100 dark:hover:bg-green-800 text-green-600 dark:text-green-400"
                      aria-label="Edit"
                    >
                      <FiEdit2 className="text-lg" />
                    </button>
                    <button
                      onClick={() => onDelete(course._id)}
                      className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-800 text-red-600 dark:text-red-400"
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
