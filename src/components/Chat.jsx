import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { Scrollbars } from "react-custom-scrollbars";

import Linkify from "react-linkify";

import TextBox from "./TextBox.jsx";
import UserPseudo from "./UserPseudo.jsx";
import { useSelector } from "react-redux";
import { getMessages } from "../store/Selectors.jsx";

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
  users,
  showEmojis,
  switchShowEmojis,
  currentUser,
  friends,
  currentChatroomId,
}) => {
  const dispatch = useDispatch();

  const [isEditingMessage, setIsEditingMessage] = useState(false);
  const [textToEdit, setTextToEdit] = useState("");
  const [idMessageToEdit, setIdMessageToEdit] = useState(undefined);
  const messages = useSelector(getMessages(currentChatroomId));

  const handleOneDigitNumber = (number) => {
    return number < 10 ? `0${number}` : number;
  };

  const onEditMessage = (id) => {
    setIsEditingMessage(true);
    setIdMessageToEdit(id);
    setTextToEdit(messages.find((msg) => msg.id === id).text);
    switchShowEmojis({ show: false, input: "" });
  };

  const handleCancelEdit = () => {
    setIsEditingMessage(false);
    setIdMessageToEdit(undefined);
    setTextToEdit("");
    switchShowEmojis({ show: false, input: "" });
  };

  const handleEditedMessage = (textEdited) => {
    setIsEditingMessage(false);
    setIdMessageToEdit(undefined);
    setTextToEdit("");
    if (textEdited !== textToEdit)
      dispatch({
        type: "EDIT_MESSAGE",
        payload: {
          id: idMessageToEdit,
          message: textEdited,
          chatroomId: currentChatroomId,
        },
      });
  };

  const deleteMessage = (idMsgToDelete) => {
    dispatch({
      type: "DELETE_MESSAGE",
      payload: { id: idMsgToDelete, chatroomId: currentChatroomId },
    });
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
          {messages.length > 0 &&
            messages.map((message) => (
              <div className="message" key={message.id}>
                <UserPseudo
                  className="message-user"
                  currentUser={currentUser}
                  friends={friends}
                  users={users}
                >
                  {users.filter((user) => user.id === message.writerID)[0].name}
                </UserPseudo>
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

Chat.propTypes = {
  users: PropTypes.array,
  showEmojis: PropTypes.object,
  switchShowEmojis: PropTypes.func,
  currentUser: PropTypes.object,
  friends: PropTypes.array,
  currentChatroomId: PropTypes.number,
};

export default Chat;
