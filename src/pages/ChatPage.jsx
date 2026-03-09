import ChatArea from "../components/chatComponents/ChatArea";
import Sidebar from "../components/chatComponents/sidebar";
const ChatPage = () => {
 
  return (
    <div className="p-4 h-screen bg-gray-100 dark:bg-gray-900">
  <div className="flex h-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
    <Sidebar />
    <ChatArea />
  </div>
</div>
  );
};

export default ChatPage;
