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

const ChatPage = ({ isAuthentified }) => {
  const dispatch = useDispatch();

  const [showEmojis, setShowEmojis] = useState({ show: false, input: "" });

  const chatrooms = useSelector(getChatrooms());

  const [currentChatroomId, setCurrentChatroomId] = useState(
    chatrooms.length > 0 ? chatrooms[0].id : null
  );

  const handleChangeCurrentChatroom = (chatroomId) => {
    setCurrentChatroomId(chatroomId);
  };

  const handleAddMember = (chatroomId, friendsSelected) => {
    dispatch({
      type: "ADD_MEMBER",
      payload: { newMember: friendsSelected, chatroomId: chatroomId },
    });
  };

  const handleLeaveCurrentChatroom = (chatroomId) => {
    setCurrentChatroomId(
      chatrooms.find((chatroom) => chatroom.id !== chatroomId).id
    );
  };

  if (!isAuthentified) {
    return <Redirect to="/connexion" />;
  }

  return (
    <StyledChatPage>
      {chatrooms.length > 0 && (
        <AddMember
          addMember={(ids) => handleAddMember(currentChatroomId, ids)}
          currentChatroomId={currentChatroomId}
        />
      )}
      {chatrooms.length > 0 && (
        <ChatRoomNav
          chatrooms={chatrooms}
          changeCurrentChatroom={handleChangeCurrentChatroom}
          currentChatroomId={currentChatroomId}
          leaveCurrentChatroom={handleLeaveCurrentChatroom}
        />
      )}
      {chatrooms.length > 0 && (
        <Chat
          showEmojis={showEmojis}
          switchShowEmojis={(e) => setShowEmojis(e)}
          currentChatroomId={currentChatroomId}
        />
      )}
      {chatrooms.length > 0 && (
        <SendMessage
          showEmojis={showEmojis}
          switchShowEmojis={(e) => setShowEmojis(e)}
          currentChatroomId={currentChatroomId}
        />
      )}
      {chatrooms.length > 0 && (
        <MembersSidebar currentChatroomId={currentChatroomId} />
      )}
    </StyledChatPage>
  );
};

ChatPage.defaultProps = { chatRooms: [] };

ChatPage.propTypes = {
  isAuthentified: PropTypes.bool,
};

export default ChatPage;
