import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
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

  let userPseudoRef = useRef(null);

  const contextMenu = (e) => {
    e.preventDefault();
    setShowMenu((v) => !v);
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

  const handleClickOutside = (e) => {
    if (userPseudoRef.current && !userPseudoRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  useEffect(
    () => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, // eslint-disable-next-line
    [userPseudoRef]
  );

  return (
    <StyledUserPseudo ref={userPseudoRef} onContextMenu={contextMenu}>
      {userName}

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
                              (chatroomName) => chatroomName.id === chatroom.id
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
                              (chatroomName) => chatroomName.id === chatroom.id
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
  );
};

UserPseudo.propTypes = {
  userLoggedId: PropTypes.number,
  writerID: PropTypes.number,
};

export default UserPseudo;
