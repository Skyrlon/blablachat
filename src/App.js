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
    const newMessageDate = new Date(Date.now());
    const newMessageHours =
      newMessageDate.getHours() < 10
        ? `0${newMessageDate.getHours()}`
        : newMessageDate.getHours();
    const newMessageMinutes =
      newMessageDate.getMinutes() < 10
        ? `0${newMessageDate.getMinutes()}`
        : newMessageDate.getMinutes();
    const newMessageSeconds =
      newMessageDate.getSeconds() < 10
        ? `0${newMessageDate.getSeconds()}`
        : newMessageDate.getSeconds();

    let newMessage = {
      date: `${newMessageHours}:${newMessageMinutes}:${newMessageSeconds}`,
      text: typedMessage,
    };
    setMessages([...messages, newMessage]);
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
          <div
            key={message.date}
            dangerouslySetInnerHTML={{
              __html: message.date + " : " + message.text,
            }}
          ></div>
        ))}
      </div>
      <form className="writing-form" onSubmit={submitNewMessage}>
        <div className="writing-field">
          <div
            className="writing-input"
            contentEditable="true"
            onInput={(e) => setTypedMessage(e.target.innerHTML)}
          ></div>
          <div onClick={() => setShowEmojis(!showEmojis)}>Emoji</div>
          {showEmojis && <Picker onSelect={addEmoji} emojiTooltip={true} />}
        </div>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default App;
