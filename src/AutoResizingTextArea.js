import React, { useState, useRef, useEffect } from "react";
import "./AutoResizingTextArea.css";

const AutoResizingTextArea = ({ sharedString, setSharedString }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset the height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to match the scrollHeight
      const parentHeight = textarea.parentElement.clientHeight;
      const newTop = parentHeight - textarea.scrollHeight;
      textarea.style.top = `${newTop}px`; // Adjust the top position
    }
  }, [sharedString]);

  const handleChange = (event) => {
    setSharedString(event.target.value);
  };

  return (
    <div className="textarea-container">
      <textarea
        ref={textareaRef}
        value={sharedString}
        onChange={handleChange}
        rows="1"
        placeholder="Type a message..."
        className="auto-resizing-textarea"
      />
    </div>
  );
};

export default AutoResizingTextArea;
