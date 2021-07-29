import Chat from "./Chat.jsx";
import ChatRoomNav from "./ChatRoomNav.jsx";
import styled from "styled-components";
import { Redirect } from "react-router";

const StyledChatPage = styled.div`
  height: 90vh;
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
      />
    </StyledChatPage>
  );
};

export default ChatPage;
