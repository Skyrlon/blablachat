import { useState } from "react";
import styled from "styled-components";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { Scrollbars } from "react-custom-scrollbars";

import Linkify from "react-linkify";

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
      white-space: pre-line;
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
    &-edit {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }
`;

const Chat = ({ messages, modifyMessages }) => {
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

  const handleOneDigitNumber = (number) => {
    return number < 10 ? `0${number}` : number;
  };

  const currentDate = `${new Date(
    Date.now()
  ).getFullYear()}-${handleOneDigitNumber(
    new Date(Date.now()).getMonth() + 1
  )}-${handleOneDigitNumber(new Date(Date.now()).getDate())}`;

  const submitNewMessage = (message) => {
    const newMessageDate = new Date(Date.now());

    let newMessage = {
      id: messages.length,
      date: `${handleOneDigitNumber(
        newMessageDate.getFullYear()
      )}-${handleOneDigitNumber(
        newMessageDate.getMonth() + 1
      )}-${handleOneDigitNumber(newMessageDate.getDate())}`,
      time: `${handleOneDigitNumber(
        newMessageDate.getHours()
      )}:${handleOneDigitNumber(
        newMessageDate.getMinutes()
      )}:${handleOneDigitNumber(newMessageDate.getSeconds())}`,
      text: message,
      modified: false,
      deleted: false,
    };

    modifyMessages([...messages, newMessage]);
  };

  const onEditMessage = (id) => {
    setIsEditingMessage(true);
    setIdMessageToEdit(id);
    setTextToEdit(messages.filter((msg) => msg.id === id)[0].text);
  };

  const handleCancelEdit = () => {
    setIsEditingMessage(false);
    setIdMessageToEdit(undefined);
    setTextToEdit("");
  };

  const submitEditedMessage = (message) => {
    let newMsgArray = messages;
    newMsgArray.splice(idMessageToEdit, 1, {
      id: idMessageToEdit,
      date: messages[idMessageToEdit].date,
      time: messages[idMessageToEdit].time,
      text: message,
      modified:
        message !== messages[idMessageToEdit].text ||
        messages[idMessageToEdit].modified,
      deleted: false,
    });
    modifyMessages([...newMsgArray]);
    setIsEditingMessage(false);
    setIdMessageToEdit(undefined);
    setTextToEdit("");
  };

  const deleteMessage = (idMsgToDelete) => {
    let newMsgArray = messages;
    newMsgArray.splice(idMsgToDelete, 1, {
      id: idMsgToDelete,
      date: messages[idMsgToDelete].date,
      time: messages[idMsgToDelete].time,
      text: messages[idMsgToDelete].text,
      modified: messages[idMsgToDelete].modified,
      deleted: true,
    });
    modifyMessages([...newMsgArray]);
  };

  return (
    <StyledChat>
      <div className="historic">
        <Scrollbars style={{ width: "99%", height: "100%" }}>
          {messages.map((message) => (
            <div className="message" key={message.id}>
              <div className="message-date">
                {message.date !== currentDate && `${message.date} `}
                {message.time}
              </div>
              {!(isEditingMessage && message.id === idMessageToEdit) && (
                <div className="message-text-container">
                  {!message.deleted && (
                    <span className="message-text">
                      <Linkify>{message.text}</Linkify>
                    </span>
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
                  cancelEdit={handleCancelEdit}
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
  );
};

export default Chat;