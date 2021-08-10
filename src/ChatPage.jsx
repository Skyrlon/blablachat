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
`;

const ChatPage = ({
  currentChatRoom,
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
      {chatRooms.length > 0 && (
        <Chat
          messages={chatRooms.filter(
            (chatroom) => chatroom.id === currentChatRoom
          )}
          users={users}
          modifyMessages={modifyMessages}
          currentUser={currentUser}
          showEmojis={showEmojis}
          switchShowEmojis={(e) => setShowEmojis(e)}
        />
      )}
      {chatRooms.length > 0 && (
        <SendMessage
          messages={chatRooms.filter(
            (chatroom) => chatroom.id === currentChatRoom
          )}
          currentUser={currentUser}
          modifyMessages={modifyMessages}
          showEmojis={showEmojis}
          switchShowEmojis={(e) => setShowEmojis(e)}
        />
      )}
    </StyledChatPage>
  );
};

ChatPage.defaultProps = { chatRooms: [] };

export default ChatPage;
