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

const ChatPage = ({ isAuthentified, userLoggedId }) => {
  const dispatch = useDispatch();
  const [showEmojis, setShowEmojis] = useState({ show: false, input: "" });

  const chatrooms = useSelector(getChatrooms(userLoggedId));

  const [currentChatroomId, setCurrentChatroomId] = useState(
    chatrooms.length > 0 ? chatrooms[0].id : null
  );

  const handleChangeChatroom = (chatroomId) => {
    setCurrentChatroomId(chatroomId);
  };

  const handleCreateChatroom = (friendsSelected) => {
    dispatch({
      type: "CREATE_CHATROOM",
      payload: { members: [userLoggedId, ...friendsSelected] },
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
      payload: { chatroomId, userLeaving: userLoggedId },
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
          currentChatroomId={currentChatroomId}
          userLoggedId={userLoggedId}
        />
      )}
      <ChatRoomNav
        chatrooms={chatrooms}
        userLoggedId={userLoggedId}
        changeChatRoom={handleChangeChatroom}
        currentChatroomId={currentChatroomId}
        createChatRoom={handleCreateChatroom}
        leaveChatroom={handleLeaveChatroom}
      />
      {chatrooms.length > 0 && (
        <Chat
          showEmojis={showEmojis}
          switchShowEmojis={(e) => setShowEmojis(e)}
          currentChatroomId={currentChatroomId}
          userLoggedId={userLoggedId}
        />
      )}
      {chatrooms.length > 0 && (
        <SendMessage
          userLoggedId={userLoggedId}
          showEmojis={showEmojis}
          switchShowEmojis={(e) => setShowEmojis(e)}
          currentChatroomId={currentChatroomId}
        />
      )}
      <MembersSidebar
        userLoggedId={userLoggedId}
        currentChatroomId={currentChatroomId}
      />
    </StyledChatPage>
  );
};

ChatPage.defaultProps = { chatRooms: [] };

ChatPage.propTypes = {
  isAuthentified: PropTypes.bool,
  userLoggedId: PropTypes.number,
};

export default ChatPage;
