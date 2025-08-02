import { useNavigate } from "react-router-dom";
import UserItem from "./UserItem";
import SearchBar from "./SearchBar";
import { FiArrowLeft } from "react-icons/fi";

const Sidebar = () => {
  const navigate = useNavigate();

  const users = [
    {
      id: 1,
      name: "Fikri Ruslandi",
      lastMessage: "No. Nurmada Project asu eta...",
      time: "1 min",
      unread: true,
    },
    {
      id: 2,
      name: "Moch Ramdhani",
      lastMessage: "Ave mensang contes $1000...",
      time: "2 min",
      unread: true,
    },
    {
      id: 3,
      name: "Muhammad Fauzi",
      lastMessage: "No. Mungan sapatu basket ja...",
      time: "9 min",
      unread: false,
    },
    {
      id: 4,
      name: "Nurman Tri Gumelar",
      lastMessage: "Tournad meret ngkando joa...",
      time: "9 min",
      unread: false,
    },
    {
      id: 5,
      name: "Bagas Rhafi",
      lastMessage: "Hatju pansil jalan vee dank...",
      time: "45 min",
      unread: false,
    },
    {
      id: 6,
      name: "Saepul Rohman",
      lastMessage: "Saepul Rohman",
      time: "10 min",
      unread: false,
    },
    {
      id: 7,
      name: "Muhamad Aldianyah",
      lastMessage: "Balsa tahka bidi diestrum...",
      time: "21 hrs",
      unread: false,
    },
  ];

  return (
    <div className="w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center focus:outline-none group"
          aria-label="Back to dashboard"
        >
          <FiArrowLeft className="h-5 w-5 text-gray-600 group-hover:text-blue-500 transition-colors mr-2" />
          <h1 className="group-hover:text-blue-500 transition-colors text-xl font-bold text-gray-800">Dashboard</h1>
        </button>
      </div>

      <SearchBar />

      <div className="flex-1 overflow-y-auto">
        {users.map((user) => (
          <UserItem
            key={user.id}
            name={user.name}
            lastMessage={user.lastMessage}
            time={user.time}
            unread={user.unread}
            isTyping={user.id === 1} // Abu Abdullah is typing
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
