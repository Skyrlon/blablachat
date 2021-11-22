import styled from "styled-components";
import { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getChatroomName } from "../store/Selectors.jsx";
import PropTypes from "prop-types";

const StyledChatRoomNavItems = styled.div`
  background-color: ${(props) => (props.active ? "lightblue" : "")};
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 1em;
  border: 1px solid;
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

const ChatRoomNavItems = ({
  chatroomId,
  chatroomOwnerId,
  userLoggedId,
  changeChatRoom,
  currentChatroomId,
  leaveChatroom,
}) => {
  const dispatch = useDispatch();

  const chatroomName = useSelector(getChatroomName(chatroomId, userLoggedId));

  const [showDropdown, setShowDropdown] = useState(false);

  const [showRenameInput, setShowRenameInput] = useState(false);

  const [newChatroomName, setNewChatroomName] = useState(null);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setShowDropdown((v) => !v);
  };

  const renameChatroomName = () => {
    dispatch({
      type: "RENAME_CHATROOM",
      payload: { newName: newChatroomName, chatroomId: chatroomId },
    });
    setNewChatroomName(null);
    setShowRenameInput(false);
  };

  const cancelRenameChatroom = () => {
    setNewChatroomName(null);
    setShowRenameInput(false);
  };

  const onClickRenameChatroom = (e, chatroomId) => {
    e.stopPropagation();
    setNewChatroomName(chatroomName);
    setShowDropdown(false);
    setShowRenameInput(true);
  };

  return (
    <StyledChatRoomNavItems
      active={!!(chatroomId === currentChatroomId)}
      key={chatroomId}
      onClick={() => changeChatRoom(chatroomId)}
      onContextMenu={(e) => handleContextMenu(e, chatroomId)}
    >
      <div className="chatroom-name">{chatroomName}</div>
      {showDropdown && (
        <ul className="dropdown">
          <li
            onClick={(e) => {
              e.stopPropagation();
              leaveChatroom(chatroomId);
              setShowDropdown(false);
            }}
          >
            Leave this chatroom
          </li>
          {chatroomOwnerId === userLoggedId && (
            <li onClick={(e) => onClickRenameChatroom(e, chatroomId)}>
              Change Chatroom name
            </li>
          )}
        </ul>
      )}
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
    </StyledChatRoomNavItems>
  );
};

ChatRoomNavItems.propTypes = {
  chatroomId: PropTypes.number,
  chatroomOwnerId: PropTypes.number,
  userLoggedId: PropTypes.number,
  changeChatRoom: PropTypes.func,
  currentChatroomId: PropTypes.number,
  leaveChatroom: PropTypes.func,
};

export default ChatRoomNavItems;
