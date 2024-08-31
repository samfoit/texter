import React, { useState } from "react";
import AutoResizingTextArea from "./AutoResizingTextArea";
import "./App.css";
import MobileKeyboard from "./MobileKeyboard";

const App = () => {
  const [sharedString, setSharedString] = useState("");

  return (
    <div className="App">
      <h1>Auto-Resizing Textarea</h1>
      <div className="keyboard-container">
        <AutoResizingTextArea
          sharedString={sharedString}
          setSharedString={setSharedString}
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
