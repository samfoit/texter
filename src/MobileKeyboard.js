import React, { useState } from "react";
import ShiftButton from "./shift_button.png";
import "./MobileKeyboard.css";
import useSound from "use-sound";
import BackspaceSound from "./backspace.mp3";
import TypingSound from "./typing.mp3";

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
  const [playBackspaceSound] = useSound(BackspaceSound);
  const [playTypingSound] = useSound(TypingSound);

  const handleKeyPress = (key) => {
    if (key === "123") {
      setLayout("specialCharacters");
      playTypingSound();
    } else if (key === "ABC") {
      setLayout("qwerty");
    } else if (key === "⌫") {
      // Handle backspace
      sharedString = sharedString.slice(0, -1);
      playBackspaceSound();
      setSharedString(sharedString);
    } else if (key === "space") {
      sharedString += " ";
      playTypingSound();
      setSharedString(sharedString);
    } else if (key === "return") {
      sharedString += "\n";
      playTypingSound();
      setSharedString(sharedString);
    } else {
      // Handle other key presses
      sharedString += key;
      playTypingSound();
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
