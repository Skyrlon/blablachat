import { useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { Scrollbars } from "react-custom-scrollbars";

import Linkify from "react-linkify";

import TextBox from "./TextBox.jsx";
import UserPseudo from "./UserPseudo.jsx";
import { useSelector } from "react-redux";
import {
  getCurrentUserId,
  getMessages,
  getChatroomName,
  getCurrentChatroomId,
} from "../store/Selectors.jsx";
import { useEffect } from "react";

import SendMessage from "../components/SendMessage.jsx";
import { Typography, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import AddMember from "../components/AddMember.jsx";

const StyledChat = styled.div`
  width: 80%;
  height: 100%;

  & .historic {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 84%;
    overflow-y: auto;
  }

  & .historic > div {
    margin-left: 0.5em;
  }

  & .message {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 98%;
    margin: 1rem;

    &-user {
      font-weight: bold;
    }

    &-data {
      display: flex;
      flex-direction: row;
    }

    &-date {
      white-space: nowrap;
      margin-left: 0.5rem;
      font-style: italic;
      font-size: 0.75rem;
      padding-top: 0.25rem;
    }

    &-text {
      word-wrap: break-word;
      white-space: pre-line;
      &-container {
        max-width: 85%;
      }
    }

    &-buttons {
      position: absolute;
      top: 0;
      right: 0;
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
    &-editing {
      width: 100%;
    }
  }
`;

const Chat = ({ showEmojis, switchShowEmojis }) => {
  const dispatch = useDispatch();

  const currentChatroomId = useSelector(getCurrentChatroomId());

  const chatroomName = useSelector(getChatroomName(currentChatroomId));

  const [isEditingMessage, setIsEditingMessage] = useState(false);

  const [textToEdit, setTextToEdit] = useState("");

  const [idMessageToEdit, setIdMessageToEdit] = useState(undefined);

  const messages = useSelector(getMessages(currentChatroomId));

  const currentUserId = useSelector(getCurrentUserId());

  const scrollbar = useRef(null);

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

  const handleAddMember = (chatroomId, friendsSelected) => {
    dispatch({
      type: "ADD_MEMBER",
      payload: { newMember: friendsSelected, chatroomId: chatroomId },
    });
  };

  useEffect(() => {
    scrollbar.current.scrollToBottom();
  }, []);

  useEffect(
    () => {
      if (messages[messages.length - 1].writerID === currentUserId)
        scrollbar.current.scrollToBottom();
    },
    // eslint-disable-next-line
    [messages]
  );

  return (
    <StyledChat>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ padding: "1rem" }}>{chatroomName}</Typography>
        <IconButton>
          <AddMember
            addMember={(ids) => handleAddMember(currentChatroomId, ids)}
            currentChatroomId={currentChatroomId}
          />
        </IconButton>
      </Box>
      <Divider />

      <div className="historic">
        <Scrollbars ref={scrollbar} style={{ width: "99%", height: "100%" }}>
          {messages.length > 0 &&
            messages.map((message) => (
              <div className="message" key={message.id}>
                <div className="message-data">
                  <div className="message-user">
                    <UserPseudo userId={message.writerID} />
                  </div>
                  <div className="message-date">
                    {formatMessageDate(message.time)}
                  </div>
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
                  !message.deleted &&
                  message.writerID === currentUserId && (
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
                  <div className="message-editing">
                    <TextBox
                      type="edit"
                      showEmojis={showEmojis}
                      onEmojiButtonClick={switchShowEmojis}
                      onEmojiClickAway={switchShowEmojis}
                      submitMessage={handleEditedMessage}
                      text={textToEdit}
                      cancelEdit={handleCancelEdit}
                    />
                  </div>
                )}
              </div>
            ))}
        </Scrollbars>
      </div>
      <SendMessage
        showEmojis={showEmojis}
        switchShowEmojis={switchShowEmojis}
        currentChatroomId={currentChatroomId}
      />
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
};

export default Chat;
