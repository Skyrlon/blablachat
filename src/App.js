import { useState } from "react";
import "./App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import TextBox from "./TextBox.jsx";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [showEmojis, setShowEmojis] = useState({ show: false, input: "" });
  const [isEditingMessage, setIsEditingMessage] = useState(false);
  const [textToEdit, setTextToEdit] = useState("");
  const [idMessageToEdit, setIdMessageToEdit] = useState(undefined);

  const handleSubmitMessage = (type, message) => {
    if (type === "new") {
      submitNewMessage(message);
    } else if (type === "edit") {
      submitEditedMessage(message);
    }
  };

  const submitNewMessage = (message) => {
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
      text: message,
    };
    setMessages([...messages, newMessage]);
  };

  const onEditMessage = (id) => {
    setIsEditingMessage(true);
    setIdMessageToEdit(id);
    setTextToEdit(messages.filter((msg) => msg.id === id)[0].text);
  };

  const submitEditedMessage = (message) => {
    let newMsgArray = messages;
    newMsgArray.splice(idMessageToEdit, 1, {
      id: idMessageToEdit,
      date: messages[idMessageToEdit].date,
      text: message,
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
              <TextBox
                type="edit"
                showEmojis={showEmojis}
                onEmojiButtonClick={(e) => setShowEmojis(e)}
                onEmojiClickAway={(e) => setShowEmojis(e)}
                submitMessage={handleSubmitMessage}
                text={textToEdit}
              />
            )}
          </div>
        ))}
      </div>
      <TextBox
        type="new"
        showEmojis={showEmojis}
        onEmojiButtonClick={(e) => setShowEmojis(e)}
        onEmojiClickAway={(e) => setShowEmojis(e)}
        submitMessage={handleSubmitMessage}
        text={textToEdit}
      />
    </div>
  );
};

export default App;
