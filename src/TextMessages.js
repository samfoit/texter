import React, { useEffect, useRef, useState } from "react";
import "./TextMessages.css";
import Text from "./Text";
import useSound from "use-sound";
import MessageSentSound from "./message_sent.mp3";

const TextMessages = ({ messages, setLoadingText }) => {
  const messagesEnd = useRef();
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [sendTextSound] = useSound(MessageSentSound);
  const messageDelay = 25;

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    let isCancelled = false;

    console.log(messages);

    const showMessage = async (msg, delay) => {
      await new Promise((resolve) => setTimeout(resolve, delay));
      if (!isCancelled && displayDoesNotContain(msg)) {
        setDisplayedMessages((prevMessages) => [...prevMessages, msg]);
        if (msg.contact !== "me") {
          sendTextSound();
        }
      }
    };

    const displayMessages = async () => {
      let latestMeShowCount = -100000;

      for (const msg of messages) {
        if (msg.contact === "me") {
          latestMeShowCount = msg.showCount;
        }

        if (
          msg.contact !== "me" &&
          msg.showCount <= latestMeShowCount &&
          msg.display === false
        ) {
          msg.display = true;
          setLoadingText(true);
          await showMessage(msg, msg.message.length * messageDelay);
          setLoadingText(false);
        } else if (msg.contact === "me") {
          await showMessage(msg, 0);
        }
      }
    };

    displayMessages();

    return () => {
      isCancelled = true;
    };
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [displayedMessages]);

  const displayDoesNotContain = (msg) => {
    return !displayedMessages.some(
      (displayMsg) =>
        displayMsg.contact === msg.contact &&
        displayMsg.message === msg.message &&
        displayMsg.showCount === msg.showCount
    );
  };

  return (
    <div className="messages-container">
      {displayedMessages.map((msg, index) => (
        <Text key={index} contact={msg.contact} message={msg.message} />
      ))}
      <div style={{ float: "left", clear: "both" }} ref={messagesEnd}></div>
    </div>
  );
};

export default TextMessages;
