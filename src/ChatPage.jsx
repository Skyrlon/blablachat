import Chat from "./Chat.jsx";
import styled from "styled-components";
import { Redirect } from "react-router";

const StyledChatPage = styled.div`
  height: 90vh;
`;

const ChatPage = ({ msg, modifyMessages, isAuthentified, currentUser }) => {
  if (!isAuthentified) {
    return <Redirect to="/sign" />;
  }
  return (
    <StyledChatPage>
      <Chat
        messages={msg}
        modifyMessages={modifyMessages}
        currentUser={currentUser}
      />
    </StyledChatPage>
  );
};

export default ChatPage;
