import { useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUserFriends,
  getUserName,
  getChatroomsToModifyMembers,
  getCurrentUserId,
} from "../store/Selectors";
import ContextMenu from "./ContextMenu";

const StyledUserPseudo = styled.div``;

const UserPseudo = ({ userId }) => {
  const dispatch = useDispatch();

  const currentUserId = useSelector(getCurrentUserId());

  const userPseudoRef = useRef(null);

  const userName = useSelector(getUserName(userId));

  const friends = useSelector(getCurrentUserFriends());

  const chatroomsToModifyMembers = useSelector(
    getChatroomsToModifyMembers(userId)
  );

  const [showMenu, setShowMenu] = useState(false);

  const [mousePosition, setMousePosition] = useState(null);

  const contextMenuContent = useRef(null);

  const onContextMenu = (e) => {
    fillContextMenu();
    e.preventDefault();
    setShowMenu((v) => !v);
    setMousePosition({ x: e.pageX, y: e.pageY });
  };

  const sendFriendRequest = (friendIdToSendRequest) => {
    dispatch({
      type: "SEND_FRIEND_REQUEST",
      payload: { receiverId: friendIdToSendRequest, senderId: currentUserId },
    });
    setShowMenu(false);
  };

  const removeFriend = (friendId) => {
    dispatch({
      type: "REMOVE_FRIEND",
      payload: { formerFriends: [currentUserId, friendId] },
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
        !(userId === currentUserId),
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
      available: userId === currentUserId,
      clickEvent: null,
      label: "Can't unfriend or be friend with yourself",
      children: null,
    };
    const giveOwnership = {
      available:
        chatroomsToModifyMembers.length > 0 && userId !== currentUserId,
      clickEvent: null,
      label: "Give ownership to chatroom :",
      children: chatroomsToModifyMembers.map((chatroom) => ({
        id: chatroom.id,
        label: chatroom.name,
        clickEvent: () => giveChatroomOwnership(chatroom.id),
      })),
    };
    const ejectUser = {
      available:
        chatroomsToModifyMembers.length > 0 && userId !== currentUserId,
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
        <ContextMenu
          showMenu={showMenu}
          anchorEl={userPseudoRef.current}
          position={mousePosition}
          closeMenu={() => setShowMenu(false)}
          menuContent={contextMenuContent.current}
          menuEvent={(menuEvent) => menuEvent}
        />
      )}
    </>
  );
};

UserPseudo.propTypes = {
  writerID: PropTypes.number,
};

export default UserPseudo;
