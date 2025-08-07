import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
const ChatArea = () => {
  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <ChatHeader />
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default ChatArea;