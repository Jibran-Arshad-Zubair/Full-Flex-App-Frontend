import React from 'react';

const MessageList = () => {

  const messages = [
    { 
      id: 1, 
      sender: "other", 
      name: "Fikri Ruslandi",
      text: "Kaniti kita technical meeting (sonka juga)", 
      time: "10:30 AM",
      avatar: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp",
      status: "Delivered"
    },
    { 
      id: 2, 
      sender: "other", 
      name: "Fikri Ruslandi",
      text: "Somua satu toana itsana yang berangkat ke jugja?", 
      time: "10:31 AM",
      avatar: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp",
      status: "Delivered"
    },
    { 
      id: 3, 
      sender: "me", 
      name: "You",
      text: "Ivy semua kita berangkat pulse pesawat kbar cepet dari jakarta berangkat, teruu dari sani kita malk kereta ke jakarta", 
      time: "10:33 AM",
      avatar: "https://img.daisyui.com/images/profile/demo/anakeen@192.webp",
      status: "Seen at 10:33 AM"
    },
    { 
      id: 4, 
      sender: "me", 
      name: "You",
      text: "Ok Jeremi kita beberpa hari disazuo", 
      time: "10:34 AM",
      avatar: "https://img.daisyui.com/images/profile/demo/anakeen@192.webp",
      status: "Seen at 10:34 AM"
    },
    { 
      id: 5, 
      sender: "other", 
      name: "Fikri Ruslandi",
      text: "Yalyalah teenage kita tidak di hotel ko", 
      time: "10:35 AM",
      avatar: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp",
      status: "Delivered"
    },
    { 
      id: 6, 
      sender: "other", 
      name: "Fikri Ruslandi",
      text: "Sej humayan sakkira jakara jakie, kemege kiri kita bisa pesawat.", 
      time: "10:36 AM",
      avatar: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp",
      status: "Delivered"
    },
    { 
      id: 7, 
      sender: "other", 
      name: "Fikri Ruslandi",
      text: "Yalyalah teenage kita tidak di hotel ko", 
      time: "10:37 AM",
      avatar: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp",
      status: "Delivered"
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={`chat ${message.sender === "me" ? "chat-end" : "chat-start"}`}
        >
         
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User avatar"
                src={message.avatar}
              />
            </div>
          </div>
          
         
          <div className="chat-header">
            {message.sender === "me" ? "You" : message.name}
            <time className="text-xs opacity-50 ml-2">{message.time}</time>
          </div>
       
          <div className={`chat-bubble ${message.sender === "me" ? "chat-bubble-primary" : ""}`}>
            {message.text}
          </div>
          
         
          {/* <div className="chat-footer opacity-50">
            {message.status}
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default MessageList;