import { useState } from "react";
import "./App.css";
import ChatPage from "./ChatPage.jsx";

const App = () => {
  const [messages, setMessages] = useState([
    {
      id: 0,
      date: "2021-01-01",
      time: "11:11",
      text: "Message for test",
      modified: false,
      deleted: false,
    },
  ]);

  const handleModifyMessages = (newMessages) => {
    setMessages(newMessages);
  };

  return (
    <div className="App">
      <header className="App-header">BlaBlaChat</header>
      <ChatPage msg={messages} modifyMessages={handleModifyMessages} />
    </div>
  );
};

export default App;
