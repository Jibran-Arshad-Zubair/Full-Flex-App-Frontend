import { useGetMessageQuery } from "../../Redux/queries/message/userMessages";
import { useSelector, useDispatch } from "react-redux";
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
  
  const { data: messageData, isLoading, isError } = useGetMessageQuery(receiverId, { 
    skip: !receiverId 
  });

  const messagesEndRef = useRef(null);
  const messages = messageData?.data || [];

  useEffect(() => {
    return () => dispatch(setSelectedUser(null));
  }, [dispatch]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

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
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No messages yet. Start the conversation!
          </p>
        </div>
      ) : (
        <>
          {messages.map((message) => {
            const isMe = message.senderId === senderId;
            
            return (
              <div
                key={message._id}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div className={`flex max-w-[70%] ${isMe ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-sm">
                      {isMe ? (
                        <img
                          alt="Your avatar"
                          src={authUser?.user?.profilePhoto || defaultLoginProfile}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = defaultLoginProfile;
                          }}
                        />
                      ) : (
                        <img
                          alt={`${selectedUser?.fullName}'s avatar`}
                          src={selectedUser?.profilePhoto || defaultProfile}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = defaultProfile;
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    {/* Sender Name & Time */}
                    <div className="flex items-center gap-2 mb-1 px-1">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                        {isMe ? 'You' : selectedUser?.fullName?.split(' ')[0]}
                      </span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500">
                        {formatMessageTime(message.createdAt)}
                      </span>
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`relative rounded-2xl px-4 py-2 break-words shadow-sm ${
                        isMe
                          ? 'bg-blue-500 text-white rounded-br-none'
                          : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none border border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.message}</p>
                      
                      {/* Message status (optional - for future implementation) */}
                      {/* {isMe && (
                        <div className="absolute -bottom-4 right-0 text-[10px] text-gray-400 dark:text-gray-500">
                          {message.read ? '✓✓' : '✓'}
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
};

export default MessageList;