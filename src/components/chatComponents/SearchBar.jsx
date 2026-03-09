import { FiSearch } from "react-icons/fi";
const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="p-3 border-b border-blue-500 dark:border-blue-600">
  <div className="relative">
    <input
      type="text"
      placeholder="Search users..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
    <FiSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-300" />
  </div>
</div>
  );
};

export default SearchBar;
