import React from "react";
import "./Text.css";

const Text = ({ contact, message }) => {
  return (
    <div className={contact === "me" ? "text me" : "text"}>
      {contact && contact !== "me" && (
        <span className="contact-name">{contact}</span>
      )}
      <div className={contact === "me" ? "message self" : "message other"}>
        <span className="message-content">{message}</span>
      </div>
    </div>
  );
};

export default Text;
