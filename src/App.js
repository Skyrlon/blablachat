import { useState, createRef, useRef } from "react";
import "./App.css";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import ContentEditable from "react-contenteditable";
import ClickAwayListener from "react-click-away-listener";

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

  const handleChange = (e) => {
    const hyperlinkRegex =
      /(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()[\]{};:'".,<>?«»“”‘’]))?/gi;
    if (hyperlinkRegex.test(e.target.value)) {
      typedMessage.current = e.target.value.replace(
        hyperlinkRegex,
        function (match) {
          return `<a href="${match}">${match}</a>`;
        }
      );
    } else {
      typedMessage.current = e.target.value;
    }
  };

  return (
    <div className="App">
      <header className="App-header">BlaBlaChat</header>
      <div className="chat-history">
        {messages.map((message) => (
          <div className="message" key={message.date}>
            <div>{message.date + " : "}</div>
            <div
              className="message-text"
              dangerouslySetInnerHTML={{
                __html: message.text,
              }}
            ></div>
          </div>
        ))}
      </div>
      <form className="writing-form" onSubmit={submitNewMessage}>
        <div className="writing-field">
          <ContentEditable
            innerRef={contentEditable}
            className="writing-input"
            html={typedMessage.current}
            disabled={false}
            onChange={handleChange}
          />

          <div onClick={() => setShowEmojis(!showEmojis)}>Emoji</div>

          {showEmojis && (
            <ClickAwayListener onClickAway={() => setShowEmojis(false)}>
              <div>
                <Picker onSelect={addEmoji} emojiTooltip={true} />
              </div>
            </ClickAwayListener>
          )}
        </div>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default App;
