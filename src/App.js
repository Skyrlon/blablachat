import { useState } from "react";
import "./App.css";

const App = () => {
  const [typedMessage, setTypedMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const submitNewMessage = (e) => {
    e.preventDefault();
    setMessages([...messages, typedMessage]);
    setTypedMessage("");
  };
  return (
    <div className="App">
      <header className="App-header">BlaBlaChat</header>
      <div className="chat-history">
        {messages.map((message) => (
          <div>{message}</div>
        ))}
      </div>
      <form onSubmit={submitNewMessage}>
        <textarea
          value={typedMessage}
          onChange={(e) => setTypedMessage(e.target.value)}
        />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default App;
