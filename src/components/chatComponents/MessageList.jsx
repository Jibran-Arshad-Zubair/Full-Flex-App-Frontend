import { useGetMessageQuery } from "../../Redux/queries/message/userMessages";
import { useSelector } from "react-redux";

const MessageList = () => {
   const authUser = useSelector((state) => state.user.authUser);
  const selectedUser = useSelector((state) => state.chat.selectedUser);
 

  const receiverId = selectedUser?._id;
  console.log("receiverId", receiverId);
  const senderId = authUser?.user?._id;
 

  const {
    data: messageData,
    isLoading,
    isError,
  } = useGetMessageQuery(receiverId, {
    skip: !receiverId,
  });

  console.log("messageData", messageData);

  if (!receiverId) {
    return <p className="p-4 text-gray-500">Please select a user to start chat.</p>;
  }

  if (isLoading) {
    return <p className="p-4 text-gray-500">Loading messages...</p>;
  }

  if (isError) {
    return <p className="p-4 text-red-500">Failed to load messages.</p>;
  }

  const messages = messageData?.data || [];

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <p className="text-gray-500">No messages yet.</p>
      ) : (
        messages.map((message) => {
          const isMe = message.senderId === senderId;
          console.log("isMe", isMe);
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
