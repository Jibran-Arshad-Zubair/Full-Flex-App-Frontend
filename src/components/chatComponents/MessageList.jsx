import { useGetMessageQuery } from "../../Redux/queries/message/userMessages";
import { useSelector , useDispatch} from "react-redux";
import NoConversationComponent from "./NoConversation";
import NoUserSelectedComponent from "./NoUserSelected";
import ChatLoader from "./ChatLoader";
import defaultProfile from "../../assets/defaultProfile.png";
import defaultLoginProfile from "../../assets/loginUserProfile.png";
import { useEffect, useRef } from "react";
import { setSelectedUser } from "../../Redux/reduxSlices/chatSlice";
const MessageList = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user.authUser);
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const receiverId = selectedUser?._id;

  const senderId = authUser?.user?._id;
  const {
    data: messageData,
    isLoading,
    isError,
  } = useGetMessageQuery(receiverId, { skip: !receiverId });

   const messagesEndRef = useRef(null); 

  const messages = messageData?.data || [];

 useEffect(() => {
    return () => dispatch(setSelectedUser(null));
  }, []);


  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
  return (
    <>
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
                  {isMe ? (
                    <img alt="User avatar" 
                    src={authUser?.user?.profilePhoto || defaultLoginProfile}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultLoginProfile;
                    }}
                    />
                  ) : (
                    <img
                      alt="User avatar"
                      src={selectedUser?.profilePhoto || defaultProfile}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultProfile;
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="chat-header">
                {isMe ? "You" : selectedUser?.fullName}
                <time className="text-xs opacity-50 ml-2">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </time>
              </div>

              <div
                className={`chat-bubble ${isMe ? "chat-bubble-primary" : ""}`}
              >
                {message.message}
              </div>
            </div>
          );
        })
      )}
     <div ref={messagesEndRef} />
    </div>
    </>
  );
};

export default MessageList;
