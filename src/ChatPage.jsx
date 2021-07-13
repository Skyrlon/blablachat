import Chat from "./Chat.jsx";
import styled from "styled-components";

const StyledChatPage = styled.div`
  height: 90vh;
`;

const ChatPage = ({ msg, modifyMessages }) => {
  return (
    <StyledChatPage>
      <Chat messages={msg} modifyMessages={modifyMessages} />
    </StyledChatPage>
  );
};

export default ChatPage;
