import React, { useState } from "react";
import SendMessage from "./SendMessage";
import ReceiveMessages from "./ReceiveMessages";
import "../styles/Chat.css";

const Chat = ({ credentials }) => {
  const [messages, setMessages] = useState([]);

  return (
    <div className="chat">
      <h2>Чат</h2>

      {/* Display Messages */}
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      {/* Components for Sending and Receiving */}
      <ReceiveMessages credentials={credentials} setMessages={setMessages} />
      <SendMessage credentials={credentials} setMessages={setMessages} />
    </div>
  );
};

export default Chat;
