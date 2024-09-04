import React, { useEffect, useRef } from "react";
import "./TextMessages.css";
import Text from "./Text";

const TextMessages = ({ messages }) => {
  const messagesEnd = useRef();
  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div className="messages-container">
      {messages.map((msg, index) => (
        <Text key={index} contact={msg.contact} message={msg.message} />
      ))}
      <div style={{ float: "left", clear: "both" }} ref={messagesEnd}></div>
    </div>
  );
};

export default TextMessages;
