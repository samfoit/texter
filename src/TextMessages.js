import React, { useEffect, useRef } from "react";
import "./TextMessages.css";

const TextMessages = () => {
  const messagesEnd = useRef();
  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div className="messages-container">
      <div className="message other">
        <span className="message-content">Hey! How are you?</span>
      </div>
      <div style={{ float: "left", clear: "both" }} ref={messagesEnd}></div>
    </div>
  );
};

export default TextMessages;
