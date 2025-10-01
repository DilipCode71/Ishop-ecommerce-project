import React, { useState, useRef, useEffect, useContext } from "react";
import { RiRobot2Fill } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import axios from 'axios';
import { MainContext } from "../../Context/Context";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const {API_BASE_URL}=useContext(MainContext)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      // Add welcome message only on first open
      setMessages([{ from: "bot", text: "Hello! How can I assist you today?" }]);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { from: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await axios.post(API_BASE_URL+`/gemini/chat`, {
        message: input
      });
      const aiReply = { from: "bot", text: res.data.reply };
      setMessages(prev => [...prev, aiReply]);
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, { from: "bot", text: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-35 right-6 z-50">
      <button
        onClick={toggleChatbot}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center cursor-pointer"
        title="Ask our AI Bot"
      >
        {isOpen ? <MdClose className="h-6 w-6" /> : <RiRobot2Fill className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="mt-3 w-80 h-[400px] bg-white rounded-lg shadow-xl border border-gray-300 flex flex-col">
          <div className="bg-blue-600 text-white p-3 rounded-t-lg font-semibold text-center">
            🤖 AI Chat Assistant
          </div>

          <div className="flex-1 p-4 overflow-y-auto text-sm text-gray-700 space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-md ${
                  msg.from === "user" ? "bg-gray-100 text-right" : "bg-blue-100 text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* Typing indicator (shows only when waiting for AI response) */}
            {isTyping && (
              <div className="p-2 rounded-md bg-blue-100 text-left">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} /> {/* Auto-scroll anchor */}
          </div>

          <div className="p-2 border-t flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-l-md outline-none"
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 py-2 text-sm rounded-r-md"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
