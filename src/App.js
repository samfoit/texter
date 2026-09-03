import React, { createContext, useState } from "react";
import "./App.css";
import Config from "./Config";
import { Routes, Route } from "react-router-dom";
import Test from "./Test";

export const AppContext = createContext();

const App = () => {
  const [messages, setMessages] = useState([
    { showCount: 0, contact: "me", message: "ay therr we go lol", display: true },
    { showCount: 1, contact: "me", message: "ok so we def need to fix the formatting", display: true },
    { showCount: 2, contact: "Mom", message: "yeah it looked pretty broken on my phone honestly", display: true },
    { showCount: 3, contact: "me", message: "should be responsive now", display: true },
  ]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Test messages={messages} setMessages={setMessages} />}
        />
        <Route
          path="/config"
          element={<Config messages={messages} setMessages={setMessages} />}
        />
      </Routes>
    </div>
  );
};

export default App;
