import React, { useState } from "react";
import AutoResizingTextArea from "./AutoResizingTextArea";
import "./App.css";
import MobileKeyboard from "./MobileKeyboard";
import ProfileIcon from "./ProfileIcon";
import FacetimeIcon from "./facetime_icon.png";
import TextMessages from "./TextMessages";

const App = () => {
  const [sharedString, setSharedString] = useState("");
  const [messages, setMessages] = useState([]);

  return (
    <div className="App">
      <div className="header">
        {/* '<' symbol */}
        <div
          style={{ fontSize: 25 }}
          onClick={() => {
            console.log("Go to menu");
          }}
        >
          {"\u003C"}
        </div>
        <ProfileIcon />
        <img src={FacetimeIcon} alt="facetime" height={20} />
      </div>
      <TextMessages messages={messages} />
      <div className="keyboard-container">
        <AutoResizingTextArea
          sharedString={sharedString}
          setSharedString={setSharedString}
          setMessages={setMessages}
        />
        <div className="keyboard-placeholder">
          <MobileKeyboard
            sharedString={sharedString}
            setSharedString={setSharedString}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
