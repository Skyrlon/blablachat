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
import ListItemButton from "@mui/material/ListItemButton";
import { Link } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TextsmsIcon from "@mui/icons-material/Textsms";
import { Box } from "@mui/material";

const StyledChatRoomNavItems = styled(ListItemButton)`
  position: relative;
  width: 100%;

  & .rename-chatroom {
    position: absolute;
    background-color: white;
    box-sizing: border-box;
    border: 1px solid grey;
    z-index: 100;
    top: 0%;
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

  return (
    <>
      <StyledChatRoomNavItems
        ref={chatroomItemRef}
        selected={chatroomId === currentChatroomId}
        key={chatroomId}
        onClick={() => onClickChatroomItem(chatroomId)}
        onContextMenu={(e) => handleContextMenu(e, chatroomId)}
        component={Link}
        to={`chatrooms/${chatroomId}`}
      >
        <ListItemIcon>
          <TextsmsIcon />
        </ListItemIcon>
        <ListItemText primary={chatroomName} />
        {showRenameInput && (
          <ClickAwayListener
            mouseEvent="onMouseDown"
            onClickAway={handleClickOutside}
          >
            <Box
              component="form"
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
            </Box>
          </ClickAwayListener>
        )}
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
    </>
  );
};

ChatRoomNavItems.propTypes = {
  chatroomId: PropTypes.number,
  chatroomOwnerId: PropTypes.number,
};

export default ChatRoomNavItems;
