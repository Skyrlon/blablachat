import styled from "styled-components";
import { useState, useRef } from "react";
import { Button, TextField } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getChatroomName } from "../store/Selectors.jsx";
import PropTypes from "prop-types";
import ClickOutsideListener from "./ClickOutsideListener.jsx";

const StyledChatRoomNavItems = styled.div`
  background-color: ${(props) => (props.isActive ? "lightblue" : "")};
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
  leaveCurrentChatroom,
}) => {
  const dispatch = useDispatch();

  const chatroomRef = useRef(null);

  const chatroomName = useSelector(getChatroomName(chatroomId, userLoggedId));

  const [showDropdown, setShowDropdown] = useState(false);

  const [showRenameInput, setShowRenameInput] = useState(false);

  const [newChatroomName, setNewChatroomName] = useState(null);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setShowDropdown((v) => !v);
  };

  const onClickLeaveChatroom = (e) => {
    e.stopPropagation();
    setShowDropdown(false);
    dispatch({
      type: "LEAVE_CHATROOM",
      payload: { chatroomId, userLeaving: userLoggedId },
    });
    if (chatroomId === currentChatroomId) leaveCurrentChatroom(chatroomId);
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

  const onClickRenameChatroom = (e) => {
    e.stopPropagation();
    setNewChatroomName(chatroomName);
    setShowDropdown(false);
    setShowRenameInput(true);
  };

  const handleClickOutside = () => {
    setShowDropdown(false);
    setShowRenameInput(false);
  };

  return (
    <ClickOutsideListener
      nodeRef={chatroomRef}
      clickedOutside={handleClickOutside}
    >
      <StyledChatRoomNavItems
        isActive={chatroomId === currentChatroomId}
        key={chatroomId}
        onClick={() => changeChatRoom(chatroomId)}
        onContextMenu={(e) => handleContextMenu(e, chatroomId)}
      >
        <span className="chatroom-name">{chatroomName}</span>

        {(showDropdown || showRenameInput) && (
          <div className="menu" ref={chatroomRef}>
            {showDropdown && (
              <ul className="dropdown">
                <li onClick={onClickLeaveChatroom}>Leave this chatroom</li>
                {chatroomOwnerId === userLoggedId && (
                  <li onClick={onClickRenameChatroom}>Change Chatroom name</li>
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
          </div>
        )}
      </StyledChatRoomNavItems>
    </ClickOutsideListener>
  );
};

ChatRoomNavItems.propTypes = {
  chatroomId: PropTypes.number,
  chatroomOwnerId: PropTypes.number,
  userLoggedId: PropTypes.number,
  changeChatRoom: PropTypes.func,
  currentChatroomId: PropTypes.number,
  leaveCurrentChatroom: PropTypes.func,
};

export default ChatRoomNavItems;
