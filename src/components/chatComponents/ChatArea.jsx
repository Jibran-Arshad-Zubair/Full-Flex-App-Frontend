import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
const ChatArea = () => {
  return (
    <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-800 h-full overflow-hidden">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto">
        <MessageList />
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatArea;