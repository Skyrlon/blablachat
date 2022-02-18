import { useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUserFriends,
  getUserName,
  getChatroomsToModifyMembers,
} from "../store/Selectors";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import NestedMenuItem from "./NestedMenuItem";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  contextMenu: { pointerEvents: "none" },
  contextMenuPaper: { pointerEvents: "auto" },
});

const StyledUserPseudo = styled.div``;

const UserPseudo = ({ userId, userLoggedId }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const userPseudoRef = useRef(null);

  const userName = useSelector(getUserName(userId));

  const friends = useSelector(getCurrentUserFriends(userLoggedId));

  const chatroomsToModifyMembers = useSelector(
    getChatroomsToModifyMembers(userLoggedId, userId)
  );

  const [showMenu, setShowMenu] = useState(false);

  const [positionData, setPositionData] = useState(null);

  const contextMenuContent = useRef(null);

  const onContextMenu = (e) => {
    fillContextMenu();
    e.preventDefault();
    setShowMenu((v) => !v);
    setPositionData({ x: e.pageX, y: e.pageY });
  };

  const sendFriendRequest = (friendIdToSendRequest) => {
    dispatch({
      type: "SEND_FRIEND_REQUEST",
      payload: { receiverId: friendIdToSendRequest, senderId: userLoggedId },
    });
    setShowMenu(false);
  };

  const removeFriend = (friendId) => {
    dispatch({
      type: "REMOVE_FRIEND",
      payload: { formerFriends: [userLoggedId, friendId] },
    });
    setShowMenu(false);
  };

  const giveChatroomOwnership = (chatroomId) => {
    dispatch({
      type: "SWITCH_CHATROOM_OWNER",
      payload: { chatroomId, userId },
    });
    setShowMenu(false);
  };

  const ejectMember = (chatroomId) => {
    dispatch({
      type: "EJECT_MEMBER",
      payload: { chatroomId, userId },
    });
    setShowMenu(false);
  };

  const fillContextMenu = () => {
    const requestFriend = {
      available:
        !friends.map((friend) => friend.id).includes(userId) &&
        !(userId === userLoggedId),
      clickEvent: () => sendFriendRequest(userId),
      label: "Request to be friend",
      children: null,
    };
    const unfriend = {
      available: friends.map((friend) => friend.id).includes(userId),
      clickEvent: () => removeFriend(userId),
      label: "Unfriend",
      children: null,
    };
    const actualUserPseudo = {
      available: userId === userLoggedId,
      clickEvent: null,
      label: "Can't unfriend or be friend with yourself",
      children: null,
    };
    const giveOwnership = {
      available: chatroomsToModifyMembers.length > 0 && userId !== userLoggedId,
      clickEvent: null,
      label: "Give ownership to chatroom :",
      children: chatroomsToModifyMembers.map((chatroom) => ({
        id: chatroom.id,
        label: chatroom.name,
        clickEvent: () => giveChatroomOwnership(chatroom.id),
      })),
    };
    const ejectUser = {
      available: chatroomsToModifyMembers.length > 0 && userId !== userLoggedId,
      clickEvent: null,
      label: "Eject user from chatroom :",
      children: chatroomsToModifyMembers.map((chatroom) => ({
        id: chatroom.id,
        label: chatroom.name,
        clickEvent: () => ejectMember(chatroom.id),
      })),
    };
    contextMenuContent.current = [
      requestFriend,
      unfriend,
      actualUserPseudo,
      giveOwnership,
      ejectUser,
    ];
  };

  return (
    <>
      <StyledUserPseudo onContextMenu={onContextMenu} ref={userPseudoRef}>
        {userName}
      </StyledUserPseudo>
      {showMenu && (
        <ClickAwayListener
          mouseEvent="onMouseDown"
          onClickAway={() => setShowMenu(false)}
        >
          <Menu
            PopoverClasses={{
              root: classes.contextMenu,
              paper: classes.contextMenuPaper,
            }}
            onContextMenu={(e) => {
              setShowMenu(false);
              e.preventDefault();
            }}
            anchorEl={userPseudoRef.current}
            anchorReference="anchorPosition"
            open={showMenu}
            onClose={() => setShowMenu(false)}
            anchorPosition={{ top: positionData.y, left: positionData.x }}
            autoFocus={false}
          >
            {contextMenuContent.current.map(
              (content) =>
                (content.available && !content.children && (
                  <MenuItem
                    key={content.label}
                    onClick={() =>
                      content.clickEvent && content.clickEvent(userId)
                    }
                    autoFocus={false}
                  >
                    {content.label}
                  </MenuItem>
                )) ||
                (content.available && content.children && (
                  <NestedMenuItem
                    key={content.label}
                    label={content.label}
                    left={true}
                    autoFocus={false}
                  >
                    {content.children.map((child) => (
                      <MenuItem
                        onClick={() => child.clickEvent(child.id)}
                        key={child.id}
                        autoFocus={false}
                      >
                        {child.label}
                      </MenuItem>
                    ))}
                  </NestedMenuItem>
                ))
            )}
          </Menu>
        </ClickAwayListener>
      )}
    </>
  );
};

UserPseudo.propTypes = {
  userLoggedId: PropTypes.number,
  writerID: PropTypes.number,
};

export default UserPseudo;
