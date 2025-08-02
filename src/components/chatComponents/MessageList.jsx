
const MessageList = () => {

  const messages = [
    { id: 1, sender: "other", text: "Kaniti kita technical meeting (sonka juga)", time: "10:30 AM" },
    { id: 2, sender: "other", text: "Somua satu toana itsana yang berangkat ke jugja?", time: "10:31 AM" },
    { id: 3, sender: "me", text: "Ivy semua kita berangkat pulse pesawat kbar cepet dari jakarta berangkat, teruu dari sani kita malk kereta ke jakarta", time: "10:33 AM" },
    { id: 4, sender: "me", text: "Ok Jeremi kita beberpa hari disazuo", time: "10:34 AM" },
    { id: 5, sender: "other", text: "Yalyalah teenage kita tidak di hotel ko", time: "10:35 AM" },
    { id: 6, sender: "other", text: "Sej humayan sakkira jakara jakie, kemege kiri kita bisa pesawat.", time: "10:36 AM" },
    { id: 7, sender: "other", text: "Yalyalah teenage kita tidak di hotel ko", time: "10:37 AM" },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${
              message.sender === "me"
                ? "bg-blue-500 text-white rounded-br-none"
                : "bg-white border border-gray-200 rounded-bl-none"
            }`}
          >
            <p>{message.text}</p>
            <p
              className={`text-xs mt-1 text-right ${
                message.sender === "me" ? "text-blue-100" : "text-gray-500"
              }`}
            >
              {message.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;