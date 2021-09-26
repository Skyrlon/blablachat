import PropTypes from "prop-types";
import styled from "styled-components";
import { Redirect } from "react-router";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Chat from "../components/Chat.jsx";
import ChatRoomNav from "../components/ChatRoomNav.jsx";
import SendMessage from "../components/SendMessage.jsx";
import MembersSidebar from "../components/MembersSidebar.jsx";
import AddMember from "../components/AddMember.jsx";
import { getChatrooms } from "../store/Selectors.jsx";

const StyledChatPage = styled.div`
  position: relative;
  width: 98.5vw;
  height: 87vh;
  display: grid;
  grid-template:
    "nav chat members" auto
    "nav chat members" auto
    "nav send members" 5% / 10vw auto 7vw;
`;

const ChatPage = ({ isAuthentified, currentUser, users }) => {
  const dispatch = useDispatch();
  const [showEmojis, setShowEmojis] = useState({ show: false, input: "" });

  const chatrooms = useSelector(getChatrooms(currentUser.id));

  const [currentChatroomId, setCurrentChatroomId] = useState(
    chatrooms.length > 0 ? chatrooms[0].id : null
  );

  const handleChangeChatroom = (chatroomId) => {
    setCurrentChatroomId(chatroomId);
  };

  const handleCreateChatroom = (friendsSelected) => {
    dispatch({
      type: "CREATE_CHATROOM",
      payload: { members: [currentUser.id, ...friendsSelected] },
    });
  };

  const handleAddMember = (chatroomId, friendsSelected) => {
    dispatch({
      type: "ADD_MEMBER",
      payload: { newMember: friendsSelected, chatroomId: chatroomId },
    });
  };

  const handleLeaveChatroom = (chatroomId) => {
    dispatch({
      type: "LEAVE_CHATROOM",
      payload: { chatroomId, userLeaving: currentUser.id },
    });
    if (chatroomId === currentChatroomId)
      setCurrentChatroomId(
        chatrooms.filter((chatroom) => chatroom.id !== chatroomId)[0].id
      );
  };

  if (!isAuthentified) {
    return <Redirect to="/sign" />;
  }

  return (
    <StyledChatPage>
      {chatrooms.length > 0 && (
        <AddMember
          addMember={(ids) => handleAddMember(currentChatroomId, ids)}
          friends={currentUser.friendsID}
          currentChatroomId={currentChatroomId}
          users={users}
        />
      )}
      <ChatRoomNav
        chatrooms={chatrooms}
        friends={currentUser.friendsID}
        currentUser={currentUser}
        users={users}
        chatRooms={chatrooms}
        changeChatRoom={handleChangeChatroom}
        currentChatroomId={currentChatroomId}
        createChatRoom={handleCreateChatroom}
        leaveChatroom={handleLeaveChatroom}
      />
      {chatrooms.length > 0 && (
        <Chat
          users={users}
          currentUser={currentUser}
          showEmojis={showEmojis}
          switchShowEmojis={(e) => setShowEmojis(e)}
          friends={currentUser.friendsID}
          currentChatroomId={currentChatroomId}
        />
      )}
      {chatrooms.length > 0 && (
        <SendMessage
          currentUser={currentUser}
          showEmojis={showEmojis}
          switchShowEmojis={(e) => setShowEmojis(e)}
          currentChatroomId={currentChatroomId}
        />
      )}
      <MembersSidebar
        users={users}
        currentUser={currentUser}
        friends={currentUser.friendsID}
        currentChatroomId={currentChatroomId}
      />
    </StyledChatPage>
  );
};

ChatPage.defaultProps = { chatRooms: [] };

ChatPage.propTypes = {
  isAuthentified: PropTypes.bool,
  currentUser: PropTypes.object,
  users: PropTypes.array,
};

export default ChatPage;
