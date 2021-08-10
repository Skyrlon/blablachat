import { useState } from "react";
import styled from "styled-components";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { Scrollbars } from "react-custom-scrollbars";

import Linkify from "react-linkify";

import TextBox from "./TextBox.jsx";

const StyledChat = styled.div`
  height: 100%;
  grid-area: chat;

  & .historic {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    width: 100%;
    height: 100%;
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

const Chat = ({
  messages,
  modifyMessages,
  users,
  showEmojis,
  switchShowEmojis,
}) => {
  const [isEditingMessage, setIsEditingMessage] = useState(false);
  const [textToEdit, setTextToEdit] = useState("");
  const [idMessageToEdit, setIdMessageToEdit] = useState(undefined);

  const handleOneDigitNumber = (number) => {
    return number < 10 ? `0${number}` : number;
  };

  const onEditMessage = (id) => {
    setIsEditingMessage(true);
    setIdMessageToEdit(id);
    setTextToEdit(messages.filter((msg) => msg.id === id)[0].text);
    switchShowEmojis({ show: false, input: "" });
  };

  const handleCancelEdit = () => {
    setIsEditingMessage(false);
    setIdMessageToEdit(undefined);
    setTextToEdit("");
    switchShowEmojis({ show: false, input: "" });
  };

  const handleEditedMessage = (message) => {
    let newMsgArray = messages;
    newMsgArray.splice(idMessageToEdit, 1, {
      id: idMessageToEdit,
      writerID: messages[idMessageToEdit].writerID,
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
      writerID: messages[idMsgToDelete].writerID,
      time: messages[idMsgToDelete].time,
      text: messages[idMsgToDelete].text,
      modified: messages[idMsgToDelete].modified,
      deleted: true,
    });
    modifyMessages([...newMsgArray]);
  };

  const formatMessageDate = (time) => {
    const date = new Date(time);
    const currentDate = new Date(Date.now());
    if (
      date.getDate() === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    ) {
      return `Today at ${handleOneDigitNumber(
        date.getHours()
      )}:${handleOneDigitNumber(date.getMinutes())}`;
    } else if (
      date.getDate() === currentDate.getDate() - 1 &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    ) {
      return `Yesterday at ${handleOneDigitNumber(
        date.getHours()
      )}:${handleOneDigitNumber(date.getMinutes())}`;
    } else {
      return `${handleOneDigitNumber(date.getDate())}/${handleOneDigitNumber(
        date.getMonth() + 1
      )}/${handleOneDigitNumber(date.getFullYear())} at ${handleOneDigitNumber(
        date.getHours()
      )}:${handleOneDigitNumber(date.getMinutes())}`;
    }
  };

  return (
    <StyledChat>
      <div className="historic">
        <Scrollbars style={{ width: "99%", height: "100%" }}>
          {messages &&
            messages.map((message) => (
              <div className="message" key={message.id}>
                <div className="message-user">
                  {users.filter((user) => user.id === message.writerID)[0].name}
                </div>
                <div className="message-date">
                  {formatMessageDate(message.time)}
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
                    onEmojiButtonClick={switchShowEmojis}
                    onEmojiClickAway={switchShowEmojis}
                    submitMessage={handleEditedMessage}
                    text={textToEdit}
                    cancelEdit={handleCancelEdit}
                  />
                )}
              </div>
            ))}
        </Scrollbars>
      </div>
    </StyledChat>
  );
};

Chat.defaultProps = {
  messages: [],
};

export default Chat;
