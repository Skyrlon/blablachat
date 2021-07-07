import { useState } from "react";
import "./App.css";
import styled from "styled-components";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { Scrollbars } from "react-custom-scrollbars";

import TextBox from "./TextBox.jsx";

const StyledChat = styled.div`
  width: 80%;
  height: 90%;
  margin-left: 10%;
  margin-top: 1%;

  & .historic {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    width: 100%;
    height: 90%;
    overflow-y: auto;
  }

  & .historic > div {
    margin-top: 1em;
    margin-left: 0.5em;
  }

  & .message {
    display: flex;
    flex-direction: row;
    width: 99%;

    &-date {
      white-space: nowrap;
      margin-right: 1em;
    }

    &-text {
      word-wrap: break-word;
      &-container {
        max-width: 85%;
      }
    }

    &-buttons {
      display: flex;
      flex-direction: row;
    }

    &-modified {
      font-size: 0.75em;
      font-style: italic;
      color: grey;
    }
  }
`;

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
      modified: false,
      deleted: false,
    };
    setMessages([...messages, newMessage]);
  };

  const onEditMessage = (id) => {
    setIsEditingMessage(true);
    setIdMessageToEdit(id);
    setTextToEdit(
      messages.filter((msg) => msg.id === id)[0].text.replaceAll("<br>", "\n")
    );
  };

  const submitEditedMessage = (message) => {
    let newMsgArray = messages;
    newMsgArray.splice(idMessageToEdit, 1, {
      id: idMessageToEdit,
      date: messages[idMessageToEdit].date,
      text: message,
      modified:
        message !== messages[idMessageToEdit].text ||
        messages[idMessageToEdit].modified,
      deleted: false,
    });
    setMessages([...newMsgArray]);
    setIsEditingMessage(false);
    setIdMessageToEdit(undefined);
  };

  const deleteMessage = (idMsgToDelete) => {
    let newMsgArray = messages;
    newMsgArray.splice(idMsgToDelete, 1, {
      id: idMsgToDelete,
      date: messages[idMsgToDelete].date,
      text: messages[idMsgToDelete].text,
      modified: messages[idMsgToDelete].modified,
      deleted: true,
    });
    setMessages([...newMsgArray]);
  };

  return (
    <div className="App">
      <header className="App-header">BlaBlaChat</header>
      <StyledChat>
        <div className="historic">
          <Scrollbars style={{ width: "99%", height: "100%" }}>
            {messages.map((message) => (
              <div className="message" key={message.id}>
                <div className="message-date">{message.date + " : "}</div>
                {!(isEditingMessage && message.id === idMessageToEdit) && (
                  <div className="message-text-container">
                    {!message.deleted && (
                      <span
                        className="message-text"
                        dangerouslySetInnerHTML={{
                          __html: message.text,
                        }}
                      ></span>
                    )}
                    {(message.modified || message.deleted) === true && (
                      <span className="message-modified">
                        {message.modified && !message.deleted
                          ? "(modified)"
                          : "(deleted)"}
                      </span>
                    )}
                  </div>
                )}

                {!(isEditingMessage && message.id === idMessageToEdit) &&
                  !message.deleted && (
                    <div className="message-buttons">
                      <div
                        className="edit-icon"
                        onClick={() => onEditMessage(message.id)}
                      >
                        <EditIcon />
                      </div>
                      <div
                        className="delete-icon"
                        onClick={() => deleteMessage(message.id)}
                      >
                        <DeleteIcon />
                      </div>
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
          </Scrollbars>
        </div>

        <TextBox
          type="new"
          showEmojis={showEmojis}
          onEmojiButtonClick={(e) => setShowEmojis(e)}
          onEmojiClickAway={(e) => setShowEmojis(e)}
          submitMessage={handleSubmitMessage}
          text={textToEdit}
        />
      </StyledChat>
    </div>
  );
};

export default App;
