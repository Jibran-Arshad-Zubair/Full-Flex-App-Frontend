import { useGetMessageQuery } from "../../Redux/queries/message/userMessages";
import { useSelector } from "react-redux";
import NoConversationComponent from "./NoConversation";
import NoUserSelectedComponent from "./NoUserSelected";
import ChatLoader from "./ChatLoader";

const MessageList = () => {
   const authUser = useSelector((state) => state.user.authUser);
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const receiverId = selectedUser?._id;

  const senderId = authUser?.user?._id;
  const {data: messageData,isLoading,isError,} = useGetMessageQuery(receiverId, {skip: !receiverId});

  if (!receiverId) {
    return <NoUserSelectedComponent />;
  }
  if (isLoading) {
     return (
      <div className="flex-1 flex items-center justify-center p-4">
        <ChatLoader />
      </div>
    );
  }

if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <NoConversationComponent selectedUser={selectedUser} />
      </div>
    );
  }
  const messages = messageData?.data || [];
return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <p className="text-gray-500">No messages yet.</p>
      ) : (
        messages.map((message) => {
          const isMe = message.senderId === senderId;
         
          return (
            <div
              key={message._id}
              className={`chat ${isMe ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User avatar"
                    src={isMe ? authUser?.user?.profilePhoto : selectedUser?.profilePhoto}
                  />
                </div>
              </div>

              <div className="chat-header">
                {isMe ? "You" : selectedUser?.fullName}
                <time className="text-xs opacity-50 ml-2">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </time>
              </div>

              <div className={`chat-bubble ${isMe ? "chat-bubble-primary" : ""}`}>
                {message.message}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MessageList;
