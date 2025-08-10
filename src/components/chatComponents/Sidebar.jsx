import { useNavigate } from "react-router-dom";
import UserItem from "./UserItem";
import SearchBar from "./SearchBar";
import { FiArrowLeft } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useGetOtherUsersQuery } from "../../Redux/queries/user/authApi";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "../../Redux/reduxSlices/chatSlice";
const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 2000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);
  const authUser = useSelector((state) => state.user.authUser);
  const { data, isLoading, isError } = useGetOtherUsersQuery(authUser?.user?._id,{skip: !authUser?.user?._id,});
  const users = data?.data || [];
  const filteredUsers = users.filter((user) =>
    (user.fullName || user.userName)
      .toLowerCase()
      .includes(debouncedSearchTerm.toLowerCase())
  );

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

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="flex-1 overflow-y-auto">
        {isLoading && (
          <p className="p-4 text-sm  text-gray-500 text-center">Loading users...</p>
        )}
        {isError && (
          <p className="p-4 text-sm text-red-500 text-center">Failed to load users.</p>
        )}

        {!isLoading && !isError && filteredUsers.length === 0 && (
          <p className="p-4 text-sm text-gray-600 text-center">
            No user found.
          </p>
        )}

        {!isLoading &&
          !isError &&
          filteredUsers.map((user) => (
            <UserItem
              key={user._id}
              name={user.fullName || user.userName}
              lastMessage={"Start chatting..."}
              time={""}
              unread={false}
              isTyping={false}
              profilePhoto={user.profilePhoto}
              onClick={() => {
                dispatch(setSelectedUser(user));
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
