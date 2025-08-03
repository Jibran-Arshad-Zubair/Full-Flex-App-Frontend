import ChatArea from "../components/chatComponents/ChatArea";
import Sidebar from "../components/chatComponents/sidebar";

const ChatPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <ChatArea />
    </div>
  );
};

export default ChatPage;
