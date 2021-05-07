import { useState } from "react";
import "./App.css";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const App = () => {
  const [typedMessage, setTypedMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEmojis, setShowEmojis] = useState(false);

  const submitNewMessage = (e) => {
    e.preventDefault();
    setMessages([...messages, typedMessage]);
    setTypedMessage("");
  };

  const addEmoji = (emoji) => {
    setTypedMessage(typedMessage + emoji.native);
  };

  return (
    <div className="App">
      <header className="App-header">BlaBlaChat</header>
      <div className="chat-history">
        {messages.map((message) => (
          <div>{message}</div>
        ))}
      </div>
      <form className="writing-form" onSubmit={submitNewMessage}>
        <div className="writing-field">
          <textarea
            value={typedMessage}
            onChange={(e) => setTypedMessage(e.target.value)}
          />
          <div onClick={() => setShowEmojis(!showEmojis)}>Emoji</div>
          {showEmojis && <Picker onSelect={addEmoji} />}
        </div>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default App;
