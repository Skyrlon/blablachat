import { useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUserFriends,
  getUserName,
  getChatroomsWhoUserIsOwner,
  getChatroomsNames,
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

  const chatroomsWhoUserIsOwner = useSelector(
    getChatroomsWhoUserIsOwner(userLoggedId)
  );

  const chatroomsNames = useSelector(
    getChatroomsNames(chatroomsWhoUserIsOwner, userLoggedId)
  );

  const [showMenu, setShowMenu] = useState(false);

  const [positionData, setPositionData] = useState(null);

  const onContextMenu = (e) => {
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
          >
            {!friends.map((friend) => friend.id).includes(userId) &&
              !(userId === userLoggedId) && (
                <MenuItem
                  onClick={() => {
                    sendFriendRequest(userId);
                    setShowMenu(false);
                  }}
                >
                  Request to be friend
                </MenuItem>
              )}
            {friends.map((friend) => friend.id).includes(userId) && (
              <MenuItem
                onClick={() => {
                  removeFriend(userId);
                  setShowMenu(false);
                }}
              >
                Unfriend
              </MenuItem>
            )}
            {userId === userLoggedId && (
              <MenuItem>Can't unfriend or be friend with yourself</MenuItem>
            )}
            {chatroomsWhoUserIsOwner.length > 0 && userId !== userLoggedId && (
              <NestedMenuItem label="Give ownership to chatroom :" left={true}>
                {chatroomsWhoUserIsOwner.map(
                  (chatroom) =>
                    chatroom.membersID.includes(userId) && (
                      <MenuItem
                        onClick={() => giveChatroomOwnership(chatroom.id)}
                        key={chatroom.id}
                      >
                        {
                          chatroomsNames.find(
                            (chatroomName) => chatroomName.id === chatroom.id
                          ).name
                        }
                      </MenuItem>
                    )
                )}
              </NestedMenuItem>
            )}
            {chatroomsWhoUserIsOwner.length > 0 && userId !== userLoggedId && (
              <NestedMenuItem label="Eject user from chatroom :" left={true}>
                {chatroomsWhoUserIsOwner.map(
                  (chatroom) =>
                    chatroom.membersID.includes(userId) && (
                      <MenuItem
                        onClick={() => ejectMember(chatroom.id)}
                        key={chatroom.id}
                      >
                        {
                          chatroomsNames.find(
                            (chatroomName) => chatroomName.id === chatroom.id
                          ).name
                        }
                      </MenuItem>
                    )
                )}
              </NestedMenuItem>
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
