import Chat from "./Chat.jsx";
import ChatRoomNav from "./ChatRoomNav.jsx";
import styled from "styled-components";
import { Redirect } from "react-router";
import { useState } from "react";
import SendMessage from "./SendMessage.jsx";

const StyledChatPage = styled.div`
  width: 98.5vw;
  height: 87vh;
  display: grid;
  grid-template:
    "nav chat chat" auto
    "nav chat chat" auto
    "nav send send" 5% / 10vw auto;
  & > :nth-child(1) {
    grid-area: nav;
  }
  & > :nth-child(2) {
    grid-area: chat;
  }
  & > :nth-child(3) {
    grid-area: send;
  }
`;

const ChatPage = ({
  msg,
  modifyMessages,
  isAuthentified,
  currentUser,
  users,
  chatRooms,
  changeChatRoom,
}) => {
  const [showEmojis, setShowEmojis] = useState({ show: false, input: "" });

  if (!isAuthentified) {
    return <Redirect to="/sign" />;
  }

  return (
    <StyledChatPage>
      <ChatRoomNav chatRooms={chatRooms} changeChatRoom={changeChatRoom} />
      <Chat
        users={users}
        messages={msg}
        modifyMessages={modifyMessages}
        currentUser={currentUser}
        showEmojis={showEmojis}
        switchShowEmojis={(e) => setShowEmojis(e)}
      />
      <SendMessage
        messages={msg}
        currentUser={currentUser}
        modifyMessages={modifyMessages}
        showEmojis={showEmojis}
        switchShowEmojis={(e) => setShowEmojis(e)}
      />
    </StyledChatPage>
  );
};

export default ChatPage;
