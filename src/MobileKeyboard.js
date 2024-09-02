import React, { useState } from "react";
import ShiftButton from "./shift_button.png";
import "./MobileKeyboard.css";

const mobileKeyboardLayouts = {
  qwerty: [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["⬆", "z", "x", "c", "v", "b", "n", "m", "⌫"],
    ["123", "space", "return"],
  ],
  specialCharacters: [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["-", "/", ":", ";", "(", ")", "$", "&", "@", '"'],
    ["#+=", ".", ",", "?", "!", "'", "⌫"],
    ["ABC", "space", "return"],
  ],
};

const MobileKeyboard = ({ sharedString, setSharedString }) => {
  const [layout, setLayout] = useState("qwerty");

  const handleKeyPress = (key) => {
    if (key === "123") {
      setLayout("specialCharacters");
    } else if (key === "ABC") {
      setLayout("qwerty");
    } else if (key === "⌫") {
      // Handle backspace
      sharedString = sharedString.slice(0, -1);
      setSharedString(sharedString);
    } else if (key === "space") {
      sharedString += " ";
      setSharedString(sharedString);
    } else if (key === "return") {
      sharedString += "\n";
      setSharedString(sharedString);
    } else {
      // Handle other key presses
      sharedString += key;
      setSharedString(sharedString);
    }
  };

  return (
    <div className="keyboard">
      {mobileKeyboardLayouts[layout].map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={
            rowIndex === 1 && layout === "qwerty"
              ? "keyboard-row middle-row"
              : "keyboard-row"
          }
        >
          {row.map((key, keyIndex) => (
            <button
              key={keyIndex}
              className={
                key.includes("space") ||
                key.includes("return") ||
                key.includes("123") ||
                key.includes("ABC") ||
                key.includes("#+=") ||
                key.includes("⌫") ||
                key.includes("⬆")
                  ? `keyboard-key key-${key} imessage-button`
                  : "keyboard-key imessage-button"
              }
              style={
                key.includes(".") ||
                key.includes(",") ||
                key.includes("?") ||
                key.includes("!") ||
                key.includes("'")
                  ? { width: "45px" }
                  : {}
              }
              onClick={() => handleKeyPress(key)}
            >
              {key.includes("⬆") ? (
                <img
                  src={ShiftButton}
                  alt="shift-button"
                  style={{ height: 25 }}
                />
              ) : (
                key
              )}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MobileKeyboard;
