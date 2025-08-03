import ChatArea from "../components/chatComponents/ChatArea";
import Sidebar from "../components/chatComponents/sidebar";
import { useSelector } from "react-redux";
import { useGetOtherUsersQuery } from "../Redux/queries/user/authApi";


const ChatPage = () => {
  const { user } = useSelector((state) => state.user?.authUser);
   const { data} = useGetOtherUsersQuery(user?._id, {skip: !user?._id});

   console.log("getOtherUsers", data);


  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <ChatArea />
    </div>
  );
};

export default ChatPage;
