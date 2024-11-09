import React, { useState } from "react";
import { Link } from "react-router-dom";

const Config = ({ messages, setMessages }) => {
  const [editMade, setEditMade] = useState(false);
  const [editableMessages, setEditableMessages] = useState(messages);

  const handleInputChange = (index, field, value) => {
    const updatedMessages = editableMessages.map((message, i) =>
      i === index ? { ...message, [field]: value } : message
    );
    setEditableMessages(updatedMessages);
    setEditMade(true);
  };

  const handleSave = () => {
    for (let i = 0; i < editableMessages.length; i++) {
      editableMessages[i].showCount = isNaN(
        parseInt(editableMessages[i].showCount)
      )
        ? 0
        : parseInt(editableMessages[i].showCount);
    }
    setMessages(editableMessages);
    setEditMade(false);
  };

  const handleAddMessage = () => {
    let newEditMessage = {
      contact: "",
      message: "",
      showCount: 0,
      display: false,
    };

    if (editableMessages.length > 0) {
      newEditMessage.showCount =
        editableMessages[editableMessages.length - 1].showCount + 1;
    }

    setEditableMessages([...editableMessages, newEditMessage]);
    setEditMade(true);
  };

  const clear = () => {
    setMessages([]);
    setEditableMessages([]);
  };

  const handleDeleteMessage = (index) => {
    const updatedMessages = editableMessages.filter((_, i) => i !== index);
    setEditableMessages(updatedMessages);
    setEditMade(true);
  };

  return (
    <div>
      <h4>Config</h4>
      <div>This is all the texts we got going</div>
      <ul style={{ padding: 0 }}>
        {editableMessages.map((message, index) => (
          <li
            key={index}
            style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
          >
            <input
              type="text"
              value={message.contact}
              onChange={(e) =>
                handleInputChange(index, "contact", e.target.value)
              }
              placeholder="Contact"
              style={{ width: 50 }}
            />
            :
            <input
              type="text"
              value={message.message}
              onChange={(e) =>
                handleInputChange(index, "message", e.target.value)
              }
              placeholder="Message"
            />
            :
            <input
              type="number"
              value={message.showCount}
              onChange={(e) =>
                handleInputChange(index, "showCount", e.target.value)
              }
              placeholder="Show Count"
              style={{ width: 20, marginRight: 10 }}
            />
            <button onClick={() => handleDeleteMessage(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          maxWidth: 250,
        }}
      >
        <button onClick={handleAddMessage}>Add Message</button>
        <br />
        <button
          onClick={handleSave}
          style={{ backgroundColor: editMade ? "lightGreen" : "" }}
        >
          Save Changes
        </button>
        <br />
        <button onClick={() => clear()}>Clear All</button>
        <br />
        <Link to="/">Start</Link>
      </div>
    </div>
  );
};

export default Config;
