import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUserFriends,
  getUserName,
  getChatroomsWhoUserIsOwner,
  getChatroomsNames,
} from "../store/Selectors";

const StyledUserPseudo = styled.div`
  position: relative;
  & .tooltip {
    position: absolute;
    border: 1px solid black;
    background-color: grey;
    z-index: 100;
  }
  & .chatrooms-owned {
    position: relative;
    &-list {
      display: none;
      position: absolute;
      background-color: pink;
      right: 100%;
      top: 0;
      margin: 0;
      list-style: none;
    }
    &:hover {
      & .chatrooms-owned-list {
        display: block;
      }
    }
  }
`;

const UserPseudo = ({ userId, userLoggedId }) => {
  const dispatch = useDispatch();

  const userName = useSelector(getUserName(userId));

  const friends = useSelector(getCurrentUserFriends(userLoggedId));

  const chatroomsWhoUserIsOwner = useSelector(
    getChatroomsWhoUserIsOwner(userLoggedId)
  );

  const chatroomsNames = useSelector(
    getChatroomsNames(chatroomsWhoUserIsOwner, userLoggedId)
  );

  const [showMenu, setShowMenu] = useState(false);

  const contextMenu = (e) => {
    e.preventDefault();
    setShowMenu((v) => !v);
  };

  const sendFriendRequest = (friendIdToSendRequest) => {
    dispatch({
      type: "SEND_FRIEND_REQUEST",
      payload: { receiverId: friendIdToSendRequest, senderId: userLoggedId },
    });
  };

  const removeFriend = (friendId) => {
    dispatch({
      type: "REMOVE_FRIEND",
      payload: { formerFriends: [userLoggedId, friendId] },
    });
  };

  const handleClickAwayMenu = () => {
    setShowMenu(false);
  };

  const giveChatroomOwnership = (chatroomId) => {
    dispatch({
      type: "SWITCH_CHATROOM_OWNER",
      payload: { chatroomId, userId },
    });
  };

  const ejectMember = (chatroomId) => {
    dispatch({
      type: "EJECT_MEMBER",
      payload: { chatroomId, userId },
    });
  };

  return (
    <ClickAwayListener onClickAway={handleClickAwayMenu}>
      <StyledUserPseudo>
        <div onContextMenu={contextMenu}>{userName}</div>

        {showMenu && (
          <div className="tooltip">
            {!friends.map((friend) => friend.id).includes(userId) &&
              !(userId === userLoggedId) && (
                <div
                  onClick={() => {
                    sendFriendRequest(userId);
                    setShowMenu(false);
                  }}
                >
                  Request to be friend
                </div>
              )}

            {friends.map((friend) => friend.id).includes(userId) && (
              <div
                onClick={() => {
                  removeFriend(userId);
                  setShowMenu(false);
                }}
              >
                Unfriend
              </div>
            )}

            {userId === userLoggedId && (
              <div>Can't unfriend or be friend with yourself</div>
            )}

            {chatroomsWhoUserIsOwner.length > 0 && userId !== userLoggedId && (
              <>
                <div className="chatrooms-owned">
                  <span>Give ownership to chatroom :</span>
                  <ul className="chatrooms-owned-list">
                    {chatroomsWhoUserIsOwner.map(
                      (chatroom) =>
                        chatroom.membersID.includes(userId) && (
                          <li
                            onClick={() => giveChatroomOwnership(chatroom.id)}
                            key={chatroom.id}
                          >
                            {
                              chatroomsNames.find(
                                (chatroomName) =>
                                  chatroomName.id === chatroom.id
                              ).name
                            }
                          </li>
                        )
                    )}
                  </ul>
                </div>
                <div className="chatrooms-owned">
                  <span>Eject user from chatroom :</span>
                  <ul className="chatrooms-owned-list">
                    {chatroomsWhoUserIsOwner.map(
                      (chatroom) =>
                        chatroom.membersID.includes(userId) && (
                          <li
                            onClick={() => ejectMember(chatroom.id)}
                            key={chatroom.id}
                          >
                            {
                              chatroomsNames.find(
                                (chatroomName) =>
                                  chatroomName.id === chatroom.id
                              ).name
                            }
                          </li>
                        )
                    )}
                  </ul>
                </div>
              </>
            )}
          </div>
        )}
      </StyledUserPseudo>
    </ClickAwayListener>
  );
};

UserPseudo.propTypes = {
  userLoggedId: PropTypes.number,
  writerID: PropTypes.number,
};

export default UserPseudo;
