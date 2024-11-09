import React, { createContext, useState } from "react";
import "./App.css";
import Config from "./Config";
import { Routes, Route } from "react-router-dom";
import Test from "./Test";

export const AppContext = createContext();

const App = () => {
  const [messages, setMessages] = useState([]);

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
