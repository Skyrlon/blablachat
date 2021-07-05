import { useState } from "react";
import "./App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import { TextareaAutosize } from "@material-ui/core";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import ClickAwayListener from "react-click-away-listener";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [msgEdited, setMsgEdited] = useState();
  const [msgTyped, setMsgTyped] = useState();
  const [showEmojis, setShowEmojis] = useState({ show: false, input: "" });
  const [isEditingMessage, setIsEditingMessage] = useState(false);
  const [idMessageToEdit, setIdMessageToEdit] = useState(undefined);

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
      id: messages.length,
      date: `${newMessageHours}:${newMessageMinutes}:${newMessageSeconds}`,
      text: msgTyped,
    };
    setMessages([...messages, newMessage]);
    setMsgTyped("");
  };

  const addEmoji = (emoji) => {
    setMsgTyped(`${msgTyped} ${emoji.native}`);
  };

  const handleChange = (e, type) => {
    let value;
    const hyperlinkRegex =
      /(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()[\]{};:'".,<>?«»“”‘’]))?/gi;
    if (hyperlinkRegex.test(e.target.value)) {
      value = e.target.value.replace(hyperlinkRegex, function (match) {
        return `<a href="${match}">${match}</a>`;
      });
    } else {
      value = e.target.value;
    }
    if (type === "new") {
      setMsgTyped(value);
    } else if (type === "edit") {
      setMsgEdited(value);
    }
  };

  const onEditMessage = (id) => {
    setIsEditingMessage(true);
    setIdMessageToEdit(id);
    setMsgEdited(messages.filter((msg) => msg.id === id)[0].text);
  };

  const submitEditedMessage = (e, msgToEdit) => {
    e.preventDefault();
    let idMsgToEdit = messages.indexOf(msgToEdit);
    let newMsgArray = messages;
    newMsgArray.splice(idMsgToEdit, 1, {
      id: msgToEdit.id,
      date: msgToEdit.date,
      text: msgEdited,
    });
    setMessages([...newMsgArray]);
    setIsEditingMessage(false);
    setIdMessageToEdit(undefined);
  };

  return (
    <div className="App">
      <header className="App-header">BlaBlaChat</header>
      <div className="chat-history">
        {messages.map((message) => (
          <div className="message" key={message.id}>
            <div>{message.date + " : "}</div>
            {!(isEditingMessage && message.id === idMessageToEdit) && (
              <div
                className="message-text"
                dangerouslySetInnerHTML={{
                  __html: message.text,
                }}
              ></div>
            )}
            {!(isEditingMessage && message.id === idMessageToEdit) && (
              <div className="edit-icon">
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={() => onEditMessage(message.id)}
                />
              </div>
            )}
            {isEditingMessage && message.id === idMessageToEdit && (
              <form
                className="writing-form"
                onSubmit={(e) => submitEditedMessage(e, message)}
              >
                <div className="writing-field">
                  <TextareaAutosize
                    className="writing-input"
                    rowsMin={1}
                    value={msgEdited}
                    onChange={(e) => handleChange(e, "edit")}
                  />

                  <div
                    className="emoji-button"
                    onClick={() => {
                      setShowEmojis({
                        show:
                          showEmojis.input !== "edit" ||
                          (showEmojis.input === "edit" && !showEmojis.show),
                        input: "edit",
                      });
                    }}
                  >
                    Emoji
                  </div>

                  {showEmojis.show && showEmojis.input === "edit" && (
                    <ClickAwayListener
                      onClickAway={(e) => {
                        if (e.target.className !== "emoji-button")
                          setShowEmojis({ show: false, input: "" });
                      }}
                    >
                      <div>
                        <Picker onSelect={addEmoji} emojiTooltip={true} />
                      </div>
                    </ClickAwayListener>
                  )}
                </div>
                <input type="submit" value="Send" />
              </form>
            )}
          </div>
        ))}
      </div>
      <form className="writing-form" onSubmit={submitNewMessage}>
        <div className="writing-field">
          <TextareaAutosize
            className="writing-input"
            rowsMin={1}
            value={msgTyped}
            onChange={(e) => handleChange(e, "new")}
          />

          <div
            className="emoji-button"
            onClick={() => {
              setShowEmojis({
                show:
                  showEmojis.input !== "type" ||
                  (showEmojis.input === "type" && !showEmojis.show),
                input: "type",
              });
            }}
          >
            Emoji
          </div>

          {showEmojis.show && showEmojis.input === "type" && (
            <ClickAwayListener
              onClickAway={(e) => {
                if (e.target.className !== "emoji-button")
                  setShowEmojis({ show: false, input: "" });
              }}
            >
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
