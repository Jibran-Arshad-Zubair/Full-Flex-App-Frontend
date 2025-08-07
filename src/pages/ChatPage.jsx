import ChatArea from "../components/chatComponents/ChatArea";
import Sidebar from "../components/chatComponents/sidebar";
const ChatPage = () => {
 
  return (
    <div className="p-4 h-screen bg-gray-100">
      <div className="flex h-full bg-white rounded-lg shadow-md overflow-hidden">
        <Sidebar />
        <ChatArea />
      </div>
    </div>
  );
};

export default ChatPage;
