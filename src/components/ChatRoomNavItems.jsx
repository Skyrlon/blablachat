import styled from "styled-components";
import { useState, useRef } from "react";
import { Button, TextField } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getChatroomName } from "../store/Selectors.jsx";
import PropTypes from "prop-types";
import {
  Menu,
  MenuItem,
  ClickAwayListener,
  makeStyles,
} from "@material-ui/core";

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

const useStyles = makeStyles({
  contextMenu: { pointerEvents: "none" },
  contextMenuPaper: { pointerEvents: "auto" },
});

const ChatRoomNavItems = ({
  chatroomId,
  chatroomOwnerId,
  userLoggedId,
  changeChatRoom,
  currentChatroomId,
  leaveCurrentChatroom,
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const chatroomName = useSelector(getChatroomName(chatroomId, userLoggedId));

  const [showMenu, setShowMenu] = useState(false);

  const [showRenameInput, setShowRenameInput] = useState(false);

  const [newChatroomName, setNewChatroomName] = useState(null);

  const chatroomItemRef = useRef(null);

  const [positionData, setPositionData] = useState(null);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setShowMenu((v) => !v);
    setPositionData({ x: e.pageX, y: e.pageY });
  };

  const onClickLeaveChatroom = (e) => {
    e.stopPropagation();
    setShowMenu(false);
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
    setShowMenu(false);
    setShowRenameInput(true);
  };

  const handleClickOutside = () => {
    setShowMenu(false);
    setShowRenameInput(false);
  };

  const renameFormRef = useRef(null);

  return (
    <>
      <StyledChatRoomNavItems
        ref={chatroomItemRef}
        isActive={chatroomId === currentChatroomId}
        key={chatroomId}
        onClick={() => changeChatRoom(chatroomId)}
        onContextMenu={(e) => handleContextMenu(e, chatroomId)}
      >
        <span className="chatroom-name">{chatroomName}</span>
      </StyledChatRoomNavItems>
      {showMenu && (
        <ClickAwayListener
          mouseEvent="onMouseDown"
          onClickAway={handleClickOutside}
        >
          <Menu
            PopoverClasses={{
              root: classes.contextMenu,
              paper: classes.contextMenuPaper,
            }}
            anchorEl={chatroomItemRef.current}
            anchorReference="anchorPosition"
            open={showMenu}
            anchorPosition={{ top: positionData.y, left: positionData.x }}
            onClose={() => setShowMenu(false)}
          >
            <MenuItem onClick={onClickLeaveChatroom}>
              Leave this chatroom
            </MenuItem>
            {chatroomOwnerId === userLoggedId && (
              <MenuItem onClick={onClickRenameChatroom}>
                Change Chatroom name
              </MenuItem>
            )}
          </Menu>
        </ClickAwayListener>
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
  userLoggedId: PropTypes.number,
  changeChatRoom: PropTypes.func,
  currentChatroomId: PropTypes.number,
  leaveCurrentChatroom: PropTypes.func,
};

export default ChatRoomNavItems;
