import {  FaSmile } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';

const MessageInput = () => {
  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      <div className="flex items-center gap-2">
        <button className="text-gray-500 hover:text-blue-500">
          <FaSmile className="h-6 w-6" />
        </button>
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <IoSend className="h-5 w-5 " />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
