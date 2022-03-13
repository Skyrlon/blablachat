import styled from "styled-components";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCurrentUserId,
  getChatroomName,
  getCurrentChatroomId,
} from "../store/Selectors.jsx";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ContextMenu from "./ContextMenu";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { Link } from "react-router-dom";

const StyledChatRoomNavItems = styled(ListItemButton)`
  position: relative;
  width: 100%;
  padding: 1em;
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

const ChatRoomNavItems = ({ chatroomId, chatroomOwnerId }) => {
  const dispatch = useDispatch();

  const currentChatroomId = useSelector(getCurrentChatroomId());

  const currentUserId = useSelector(getCurrentUserId());

  const chatroomName = useSelector(getChatroomName(chatroomId));

  const [showMenu, setShowMenu] = useState(false);

  const [showRenameInput, setShowRenameInput] = useState(false);

  const [newChatroomName, setNewChatroomName] = useState(null);

  const chatroomItemRef = useRef(null);

  const [mousePosition, setMousePosition] = useState(null);

  const contextMenuContent = useRef(null);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setShowMenu((v) => !v);
    setMousePosition({ x: e.pageX, y: e.pageY });
    fillContextMenu();
  };

  const fillContextMenu = () => {
    const leaveChatroom = {
      available: true,
      clickEvent: () => onClickLeaveChatroom(),
      label: "Leave this chatroom",
      children: null,
    };
    const renameChatroom = {
      available: chatroomOwnerId === currentUserId,
      clickEvent: () => onClickRenameChatroom(),
      label: "Rename chatroom",
      children: null,
    };
    contextMenuContent.current = [leaveChatroom, renameChatroom];
  };

  const onClickLeaveChatroom = () => {
    setShowMenu(false);
    dispatch({
      type: "LEAVE_CHATROOM",
      payload: { chatroomId },
    });
    if (chatroomId === currentChatroomId)
      dispatch({ type: "LEAVE_CURRENT_CHATROOM" });
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
    setNewChatroomName(chatroomName);
    setShowMenu(false);
    setShowRenameInput(true);
  };

  const handleClickOutside = () => {
    setShowMenu(false);
    setShowRenameInput(false);
  };

  const onClickChatroomItem = (chatroomId) => {
    dispatch({ type: "CHANGE_CURRENT_CHATROOM", payload: { id: chatroomId } });
  };

  const renameFormRef = useRef(null);

  return (
    <>
      <StyledChatRoomNavItems
        ref={chatroomItemRef}
        selected={chatroomId === currentChatroomId}
        key={chatroomId}
        onClick={() => onClickChatroomItem(chatroomId)}
        onContextMenu={(e) => handleContextMenu(e, chatroomId)}
      >
        <ListItemText>
          <Link to={`/chatrooms/${chatroomId}`}>{chatroomName}</Link>
        </ListItemText>
      </StyledChatRoomNavItems>
      {showMenu && (
        <ContextMenu
          showMenu={showMenu}
          anchorEl={chatroomItemRef.current}
          position={mousePosition}
          closeMenu={() => setShowMenu(false)}
          menuContent={contextMenuContent.current}
          menuEvent={(menuEvent) => menuEvent}
        />
      )}
      {showRenameInput && (
        <ClickAwayListener
          mouseEvent="onMouseDown"
          onClickAway={handleClickOutside}
        >
          <form
            ref={renameFormRef}
            onSubmit={renameChatroomName}
            className="rename-chatroom"
          >
            <TextField
              className="rename-chatroom-input"
              value={newChatroomName}
              onChange={(e) => setNewChatroomName(e.target.value)}
              variant="outlined"
            />
            <Button onClick={cancelRenameChatroom}>Cancel</Button>
            <Button onClick={renameChatroomName}>Rename</Button>
          </form>
        </ClickAwayListener>
      )}
    </>
  );
};

ChatRoomNavItems.propTypes = {
  chatroomId: PropTypes.number,
  chatroomOwnerId: PropTypes.number,
};

export default ChatRoomNavItems;
