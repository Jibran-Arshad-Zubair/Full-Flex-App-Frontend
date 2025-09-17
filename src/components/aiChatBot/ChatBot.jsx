import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, X, Loader2, Paperclip } from "lucide-react";
import { useAskChatBotMutation } from "../../Redux/queries/chatBot/chatBotApi";

const MessageRenderer = ({ content }) => {
  if (typeof content !== "string" || !content.trim()) {
    return <p className="text-red-500 text-sm">Invalid message content</p>;
  }

  const paragraphs = content.split("\n").filter((p) => p.trim());

  if (paragraphs.length === 0) {
    return <p className="text-red-500 text-sm">Empty message</p>;
  }

  return (
    <div className="message-content">
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className="mb-2 last:mb-0"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [askChatBot] = useAskChatBotMutation();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your LearnHub assistant. How can I help you with your courses today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedText, setUploadedText] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  
  const extractTextFromPDF = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target.result;
          
         
          const pdfjsLib = await import('pdfjs-dist');
          
         
          pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
            'pdfjs-dist/build/pdf.worker.min.mjs',
            import.meta.url
          ).toString();

          const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          let textContent = "";
          
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const text = await page.getTextContent();
            text.items.forEach((item) => {
              textContent += item.str + " ";
            });
            textContent += "\n"; 
          }
          
          resolve(textContent);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    e.target.value = '';
    
    try {
     
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "📄 Uploading and processing your file...",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);

      const text = await extractTextFromPDF(file);
      setUploadedText(text);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: `File uploaded successfully! I've extracted the text content. You can now ask questions about this document.`,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } catch (err) {
      console.error("File processing error:", err);
      setMessages((prev) => [
        ...prev,
        { 
          id: Date.now(), 
          text: "Failed to process the file. Please make sure it's a valid PDF or text file.", 
          sender: "bot", 
          timestamp: new Date() 
        },
      ]);
    }
  };

  const quickReplies = [
    { text: "📚 Course recommendations", prompt: "Can you recommend courses based on my interests?" },
    { text: "🎓 Enrollment help", prompt: "How do I enroll in a course?" },
    { text: "💳 Payment issues", prompt: "I'm having trouble with payment processing" },
    { text: "📹 Video problems", prompt: "The course videos aren't loading properly" },
  ];

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const res = await askChatBot({
        message: inputText,
        fileText: uploadedText,
      }).unwrap();

      let botText = "Sorry, I couldn't process that request.";

      if (res && typeof res === "object") {
        if (res.reply && typeof res.reply === "string") {
          botText = res.reply;
        } else if (typeof res === "string") {
          botText = res;
        } else if (res.message && typeof res.message === "string") {
          botText = res.message;
        } else {
          try {
            botText = JSON.stringify(res);
          } catch {
            botText = "Received an unexpected response format.";
          }
        }
      } else if (typeof res === "string") {
        botText = res;
      }

      const botResponse = {
        id: Date.now() + 1,
        text: botText,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (err) {
      console.error("ChatBot API Error:", err);
      const botResponse = {
        id: Date.now() + 1,
        text: "⚠️ Sorry, I'm having trouble connecting right now. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (prompt) => {
    setInputText(prompt);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group z-50"
          aria-label="Open chat"
        >
          <Bot className="w-8 h-8" />
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-xs rounded-full flex items-center justify-center animate-pulse">
            💬
          </span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-96 md:w-[450px] md:h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col z-50">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">LearnHub Assistant</h3>
                <p className="text-xs opacity-90">Online • Ready to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md p-3 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none border border-gray-200 dark:border-gray-600"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === "bot" && <Bot className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />}
                    <div className="flex-1">
                      <MessageRenderer content={message.text} />
                    </div>
                    {message.sender === "user" && <User className="w-5 h-5 text-blue-200 flex-shrink-0 mt-0.5" />}
                  </div>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp instanceof Date
                      ? message.timestamp.toLocaleTimeString()
                      : new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-700 p-3 rounded-2xl rounded-bl-none border border-gray-200 dark:border-gray-600 flex items-center">
                  <Loader2 className="w-5 h-5 text-blue-500 animate-spin mr-2" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 2 && (
            <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply.prompt)}
                    className="px-3 py-1.5 bg-white dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-300 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex space-x-2 items-center">
             
              <label className="cursor-pointer p-3 bg-gray-200 dark:bg-gray-700 rounded-2xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all flex items-center justify-center">
                <Paperclip className="w-4 h-4" />
                <input
                  type="file"
                  accept=".pdf,.txt,.docx,.doc"
                  className="hidden"
                  onChange={handleFileUpload}
                  disabled={isLoading}
                />
              </label>

            
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about courses, enrollment, or support..."
                className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                disabled={isLoading}
              />

           
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
                className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            {uploadedText && (
              <div className="mt-2 text-xs text-gray-500">
                📄 Document loaded: {uploadedText.length} characters extracted
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;