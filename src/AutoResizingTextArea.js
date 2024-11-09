import React, { useRef, useEffect } from "react";
import "./AutoResizingTextArea.css";
import TextIcon from "./text_icon.png";
import useSound from "use-sound";
import MessageSentSound from "./message_sent.mp3";

const AutoResizingTextArea = ({
  sharedString,
  setSharedString,
  messages,
  setMessages,
}) => {
  const textareaRef = useRef(null);
  const [sendTextSound] = useSound(MessageSentSound);

  const [textCount, setTextCount] = React.useState(0);

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

  const sendText = () => {
    const newMessage = {
      showCount: textCount,
      contact: "me",
      message: sharedString,
      display: true,
    };
    setTextCount(textCount + 1);
    const newMessages = [];

    let newMessageAdded = false;
    for (let i = 0; i < messages.length; i++) {
      if (messages[i].contact === "me" && messages[i].showCount >= textCount) {
        setTextCount(messages[i].showCount + 1);
        newMessage.showCount = textCount;
      }

      if (messages[i].showCount < newMessage.showCount) {
        newMessages.push(messages[i]);
      } else if (messages[i].showCount === newMessage.showCount) {
        if (newMessageAdded === false) {
          newMessages.push(newMessage);
          newMessageAdded = true;
          newMessages.push(messages[i]);
        } else {
          newMessages.push(messages[i]);
        }
      } else {
        newMessages.push(messages[i]);
      }
    }

    if (newMessageAdded === false) {
      newMessages.push(newMessage);
      setMessages(newMessages);
    }

    setMessages(newMessages);
    setSharedString("");
    sendTextSound();
  };

  return (
    <div className="textarea-container">
      <textarea
        ref={textareaRef}
        value={sharedString}
        onChange={handleChange}
        rows="1"
        placeholder="Text Message"
        className="auto-resizing-textarea"
        disabled={true}
      />
      <img
        className="text-button"
        src={TextIcon}
        alt="send-text"
        onClick={() => sendText()}
      />
    </div>
  );
};

export default AutoResizingTextArea;
