import React, { useState } from "react";
import AutoResizingTextArea from "./AutoResizingTextArea";
import "./App.css";
import MobileKeyboard from "./MobileKeyboard";
import ProfileIcon from "./ProfileIcon";
import FacetimeIcon from "./facetime_icon.png";
import TextMessages from "./TextMessages";
import { useNavigate } from "react-router-dom";

const Test = ({ messages, setMessages }) => {
  const [sharedString, setSharedString] = useState("");

  const [loadingText, setLoadingText] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <div className="header">
        {/* '<' symbol */}
        <div
          style={{ fontSize: 25 }}
          onClick={() => {
            navigate("/config");
            console.log("Go to menu");
          }}
        >
          {"\u003C"}
        </div>
        <ProfileIcon />
        <img src={FacetimeIcon} alt="facetime" height={20} />
      </div>
      <TextMessages messages={messages} setLoadingText={setLoadingText} />
      <div className="keyboard-container">
        {loadingText && (
          <img
            style={{ marginBottom: 20, height: 50, width: 100 }}
            alt="gif"
            src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHBvYTU5NWZ6aGlyb2l2ZWZ4ZDZ6amc0a3d4dDU4cGhjZ2Z5bmw4MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VeerK4hE9sjoB8e6OQ/giphy.gif"
          />
        )}

        <AutoResizingTextArea
          sharedString={sharedString}
          setSharedString={setSharedString}
          messages={messages}
          setMessages={setMessages}
        />
        <div className="keyboard-placeholder">
          <MobileKeyboard
            sharedString={sharedString}
            setSharedString={setSharedString}
          />
        </div>
      </div>
    </>
  );
};

export default Test;
