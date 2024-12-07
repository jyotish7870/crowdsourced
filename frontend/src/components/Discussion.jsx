import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import service from "../http/service";

const socket = io("http://localhost:3000/");

const Discussion = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user.name;
  const userId = user._id;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const response = await service.get("/admin/messages");
      setMessages(response.data.messages);
    } catch (error) {
      console.log("Error fetching messages", error);
    }
  };

  useEffect(() => {
    // Fetch message history
    fetchMessages();

    // Listen for incoming messages from the server
    socket.on("chatMessage", (msg) => {
      setMessages((prevMessages) => {
        // Remove optimistic (pending) message
        const newMessages = prevMessages.filter((m) => m.isPending !== true);
        return [...newMessages, msg];
      });
    });

    return () => {
      socket.off("chatMessage");
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (message.trim()) {
      const msg = {
        text: message,
        senderId: userId,
        sender: username,
        isPending: true, // Mark message as pending
      };

      // Optimistically append the message locally
      setMessages((prevMessages) => [...prevMessages, msg]);

      // Emit the message to the server
      socket.emit("chatMessage", { ...msg, isPending: false });

      // Clear the input field
      setMessage("");
    }
  };

  return (
    <div className="h-[90vh] lg:h-[87vh] w-full sm:w-[80%] md:w-[70%] lg:w-[40%] text-white mx-auto bg-[#1c1a41] shadow-xl rounded-lg overflow-hidden my-2 px-2 md:px-4 md:py-2 flex flex-col">
      <div>
        <h2 className="text-xl font-lora font-semibold mb-4">Discussion</h2>
      </div>

      <div className="flex-grow overflow-y-scroll bg-[#697bc6] text-white px-4 py-2 rounded-lg mb-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex-col mb-2 p-1 px-3 rounded-lg max-w-[70%] ${
              msg.senderId === userId
                ? "ml-auto bg-blue-500 text-gray-50"
                : "mr-auto bg-gray-300 text-black"
            } ${msg.isPending ? "opacity-50" : ""}`} // Add transparency for pending messages
          >
            {msg.senderId !== userId && (
              <span className="text-sm font-semibold text-[#4334c9]">
                {msg.sender}
              </span>
            )}
            <div className="text-base break-words">{msg.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="flex items-center gap-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow px-3 py-1 text-sm bg-[#1e1e1e] border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="px-6 py-1 bg-yellow-500 text-black text-sm font-semibold rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-1 focus:ring-yellow-500"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Discussion;
