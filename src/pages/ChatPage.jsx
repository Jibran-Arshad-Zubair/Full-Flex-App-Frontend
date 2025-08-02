
import Sidebar from "../components/chatComponents/Sidebar";

import ChatArea from "../components/chatComponents/ChatArea";

const ChatPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <ChatArea />
    </div>
  );
};

export default ChatPage;
