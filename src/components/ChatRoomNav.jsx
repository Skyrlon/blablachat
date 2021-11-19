import styled from "styled-components";
import PropTypes from "prop-types";
import AddChatRoom from "./AddChatRoom";
import { useState } from "react";
import { getChatroomsNames } from "../store/Selectors.jsx";
import { useSelector, useDispatch } from "react-redux";
import { Button, TextField } from "@material-ui/core";

const StyledChatRoomNav = styled.div`
  grid-area: nav;
  position: relative;
  margin: 0;
  padding: 0;
  border: 1px solid black;
  & > div {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    padding: 1em;
    border: 1px solid;
    &.active {
      background-color: lightblue;
    }
  }

  & .chatroom-name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
  }

  & .dropdown {
    position: absolute;
    margin: 0;
    list-style: none;
    background-color: blue;
    z-index: 100;
    border: 1px solid;
    left: 100%;
    top: 0;
  }
  & .rename-chatroom {
    position: absolute;
    z-index: 100;
    background-color: lightcoral;
    left: 100%;
    width: 15rem;
    &-input {
      width: 100%;
    }
  }
`;

const ChatRoomNav = ({
  chatrooms,
  userLoggedId,
  changeChatRoom,
  currentChatroomId,
  createChatRoom,
  leaveChatroom,
}) => {
  const dispatch = useDispatch();

  const [showDropdown, setShowDropdown] = useState(false);

  const [chatroomIdDropdown, setChatroomIdDropdown] = useState(null);

  const [showRenameInput, setShowRenameInput] = useState(false);

  const [chatroomToEdit, setChatroomToEdit] = useState({
    id: null,
    name: null,
  });

  const [newChatroomName, setNewChatroomName] = useState(null);

  const chatroomsNames = useSelector(
    getChatroomsNames(chatrooms, userLoggedId)
  );

  const handleContextMenu = (e, id) => {
    e.preventDefault();
    setShowDropdown((v) => !v);
    setChatroomIdDropdown(id);
  };

  const renameChatroomName = () => {
    dispatch({
      type: "RENAME_CHATROOM",
      payload: { newName: newChatroomName, chatroomId: chatroomToEdit.id },
    });
    setChatroomToEdit({
      id: null,
      name: null,
    });
    setNewChatroomName(null);
    setShowRenameInput(false);
  };

  const cancelRenameChatroom = () => {
    setChatroomToEdit({
      id: null,
      name: null,
    });
    setNewChatroomName(null);
    setShowRenameInput(false);
  };

  const onClickRenameChatroom = (e, chatroomId) => {
    e.stopPropagation();
    setChatroomToEdit({
      id: chatroomId,
      name: chatroomsNames.find(
        (chatroomName) => chatroomName.id === chatroomId
      ).name,
    });
    setNewChatroomName(
      chatroomsNames.find((chatroomName) => chatroomName.id === chatroomId).name
    );
    setShowDropdown(false);
    setShowRenameInput(true);
  };

  return (
    <StyledChatRoomNav>
      {showRenameInput && (
        <form onSubmit={renameChatroomName} className="rename-chatroom">
          <TextField
            className="rename-chatroom-input"
            value={newChatroomName}
            onChange={(e) => setNewChatroomName(e.target.value)}
            variant="outlined"
          />
          <Button onClick={cancelRenameChatroom}>Cancel</Button>
          <Button onClick={renameChatroomName}>Rename</Button>
        </form>
      )}

      <AddChatRoom
        userLoggedId={userLoggedId}
        createChatRoom={createChatRoom}
      />

      {chatrooms.map((chatroom) => (
        <div
          className={`${chatroom.id === currentChatroomId && "active"}`}
          key={chatroom.id}
          onClick={(e) => {
            if (e.buttons !== 2) changeChatRoom(chatroom.id);
          }}
          onContextMenu={(e) => handleContextMenu(e, chatroom.id)}
        >
          <div className="chatroom-name">
            {
              chatroomsNames.find(
                (chatroomName) => chatroomName.id === chatroom.id
              ).name
            }
          </div>
          {showDropdown && chatroomIdDropdown === chatroom.id && (
            <ul className="dropdown">
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  leaveChatroom(chatroom.id);
                  setShowDropdown(false);
                }}
              >
                Leave this chatroom
              </li>
              {chatroom.ownerID === userLoggedId && (
                <li onClick={(e) => onClickRenameChatroom(e, chatroom.id)}>
                  Change Chatroom name
                </li>
              )}
            </ul>
          )}
        </div>
      ))}
    </StyledChatRoomNav>
  );
};

ChatRoomNav.propTypes = {
  chatrooms: PropTypes.array,
  userLoggedId: PropTypes.number,
  changeChatRoom: PropTypes.func,
  currentChatroomId: PropTypes.number,
  createChatRoom: PropTypes.func,
  leaveChatroom: PropTypes.func,
};

export default ChatRoomNav;
