import { useNavigate } from "react-router-dom";
import UserItem from "./UserItem";
import SearchBar from "./SearchBar";
import { FiArrowLeft } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useGetOtherUsersQuery } from "../../Redux/queries/user/authApi";

const Sidebar = () => {
  const navigate = useNavigate();

   const { user } = useSelector((state) => state.user?.authUser);
 
  const { data, isLoading, isError } = useGetOtherUsersQuery(user?._id, {
    skip: !user?._id,
  });
 

  const users = data?.data || [];
  return (
    <div className="w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-blue-500 flex">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center focus:outline-none group"
          aria-label="Back to dashboard"
        >
          <FiArrowLeft className="h-5 w-5 text-gray-600 group-hover:text-blue-500 transition-colors mr-4" />
          <h1 className="group-hover:text-blue-500 transition-colors text-xl font-bold text-gray-800">
            Dashboard
          </h1>
        </button>
      </div>

      <SearchBar />

      <div className="flex-1 overflow-y-auto">
        {isLoading && (
          <p className="p-4 text-sm text-gray-500">Loading users...</p>
        )}
        {isError && (
          <p className="p-4 text-sm text-red-500">Failed to load users.</p>
        )}

        {!isLoading && !isError && users.length === 0 && (
          <p className="p-4 text-sm text-gray-500 text-center">No users found.</p>
        )}

        {!isLoading &&
          !isError &&
          users.map((user) => (
            <UserItem
              key={user._id}
              name={user.fullName || user.userName}
              lastMessage={"Start chatting..."} 
              time={""} //  can pass time if available
              unread={false} 
              isTyping={false}
              profilePhoto={user.profilePhoto}
            />
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
