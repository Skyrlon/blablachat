import { useState, createRef, useRef } from "react";
import "./App.css";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import ContentEditable from "react-contenteditable";

const App = () => {
  const contentEditable = createRef();
  const typedMessage = useRef("");
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
      text: typedMessage.current,
    };
    setMessages([...messages, newMessage]);
    typedMessage.current = "";
  };

  const addEmoji = (emoji) => {
    typedMessage.current = `${contentEditable.current.innerHTML} ${emoji.native}`;
    contentEditable.current.innerHTML = `${contentEditable.current.innerHTML} ${emoji.native}`;
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
          <ContentEditable
            innerRef={contentEditable}
            className="writing-input"
            html={typedMessage.current}
            disabled={false}
            onChange={(e) => (typedMessage.current = e.target.value)}
          />

          <div onClick={() => setShowEmojis(!showEmojis)}>Emoji</div>

          {showEmojis && <Picker onSelect={addEmoji} emojiTooltip={true} />}
        </div>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default App;
